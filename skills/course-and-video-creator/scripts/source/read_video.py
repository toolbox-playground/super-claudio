"""Turn a video link or file into text and pictures an agent can read.

Called by read-video.sh, which owns the venv. Arguments: SRC OUTDIR KEEP.
See read-video.sh for what lands in OUTDIR.
"""
import glob, json, math, os, re, shutil, subprocess, sys, tempfile

src, out, keep = sys.argv[1], sys.argv[2], sys.argv[3] == "1"
PY = sys.executable
YTDLP = [PY, "-m", "yt_dlp", "--no-playlist", "--socket-timeout", "15", "--retries", "2",
         "--js-runtimes", "node", "--remote-components", "ejs:github", "--no-progress"]


def log(*a):
    print("read-video:", *a, file=sys.stderr, flush=True)


def probe_duration(f):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                        "-of", "csv=p=0", f], capture_output=True, text=True)
    return float(r.stdout.strip() or 0)


def mmss(t):
    t = int(t)
    return f"{t // 60}:{t % 60:02d}"


tmp = tempfile.mkdtemp(prefix="read-video-")
try:
    info = {}
    if os.path.isfile(src):
        video = os.path.abspath(src)  # the creator's own file: never deleted
        stem = re.sub(r"[^\w.-]+", "-", os.path.splitext(os.path.basename(src))[0]).strip("-")
        out = out or os.path.join("fontes", stem)
        info = {"title": os.path.basename(src), "source": video}
    else:
        log("downloading", src)
        r = subprocess.run(YTDLP + ["-f", "bv*[height<=720]+ba/b[height<=720]/b",
                                    "--merge-output-format", "mp4", "--write-info-json",
                                    "-o", os.path.join(tmp, "video.%(ext)s"), src],
                           capture_output=True, text=True)
        if r.returncode != 0:
            log("download failed:\n" + r.stderr.strip()[-1500:])
            log("if the post is private or needs a login, ask the creator to download it "
                "and pass the file instead")
            sys.exit(2)
        info = json.load(open(os.path.join(tmp, "video.info.json")))
        video = next(f for f in glob.glob(os.path.join(tmp, "video.*"))
                     if not f.endswith(".json"))
        out = out or os.path.join("fontes", f"{info.get('extractor_key', 'video').lower()}-{info['id']}")

    os.makedirs(out, exist_ok=True)
    dur = probe_duration(video)

    # 1. What is said. YouTube captions first: free and instant. Otherwise Whisper.
    lines, how = [], ""
    if info.get("extractor_key") == "Youtube":
        lang = info.get("language") or ""
        manual = [k for k in info.get("subtitles", {}) if lang and k.split("-")[0] == lang]
        auto = [k for k in info.get("automatic_captions", {}) if k.endswith("-orig")]
        key, flag = (manual[0], "--write-subs") if manual else (auto[0], "--write-auto-subs") if auto else (None, None)
        if key:
            subprocess.run(YTDLP + ["--skip-download", flag, "--sub-langs", key, "--sub-format", "vtt",
                                    "-o", os.path.join(tmp, "subs"), info["webpage_url"]],
                           capture_output=True, text=True)
            vtt = glob.glob(os.path.join(tmp, "subs*.vtt"))
            if vtt:
                last = None
                for cue in open(vtt[0], encoding="utf-8").read().split("\n\n"):
                    m = re.match(r"(\d+):(\d+):([\d.]+) -->", cue.strip())
                    if not m:
                        continue
                    t = int(m[1]) * 3600 + int(m[2]) * 60 + float(m[3])
                    body = [l for l in cue.strip().split("\n")[1:] if l.strip()]
                    # auto captions repeat the previous line; the new words carry <c> tags
                    new = [l for l in body if "<c>" in l] or body
                    for l in new:
                        text = re.sub(r"<[^>]+>", "", l).strip()
                        if text and text != last:
                            lines.append((t, text))
                            last = text
                how = f"legendas do YouTube ({'do autor' if manual else 'automáticas'}, {key})"
            else:
                log("captions did not download (rate limit?); transcribing instead")

    if not lines:
        from faster_whisper import WhisperModel
        model = os.environ.get("READ_VIDEO_MODEL", "small")
        log(f"transcribing {mmss(dur)} with faster-whisper {model} (CPU; a few minutes per minute of video)")
        segs, tinfo = WhisperModel(model, device="cpu", compute_type="int8").transcribe(video, vad_filter=True)
        for s in segs:
            lines.append((s.start, s.text.strip()))
            log(f"  {mmss(s.start)}/{mmss(dur)}")
        how = f"faster-whisper {model}, idioma detectado: {tinfo.language}"

    with open(os.path.join(out, "transcript.txt"), "w", encoding="utf-8") as f:
        f.write(f"# Fonte: {how}. Nomes próprios e números podem vir errados.\n")
        for t, text in lines:
            f.write(f"[{mmss(t)}] {text}\n")

    # 2. What is shown. At most ~45 frames, in sheets of 5x3, read left to right.
    every = max(2, math.ceil(dur / 45)) if dur else 5
    r = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
                        "stream=width,height", "-of", "csv=p=0", video], capture_output=True, text=True)
    w, h = (int(x) for x in r.stdout.strip().split(",")[:2])
    cell = 216 if h > w else 384
    for old in glob.glob(os.path.join(out, "sheet-*.jpg")):
        os.remove(old)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", video, "-vf",
                    f"fps=1/{every},scale={cell}:-2,tile=5x3", "-q:v", "4",
                    os.path.join(out, "sheet-%02d.jpg")], check=True)
    sheets = sorted(glob.glob(os.path.join(out, "sheet-*.jpg")))
    with open(os.path.join(out, "sheets.txt"), "w", encoding="utf-8") as f:
        f.write(f"Um quadro a cada {every} s, 15 por folha, da esquerda para a direita e de cima para baixo.\n")
        for i, s in enumerate(sheets):
            a, b = i * 15 * every, min(dur, (i + 1) * 15 * every)
            f.write(f"{os.path.basename(s)}: {mmss(a)} a {mmss(b)}\n")

    meta = {k: info.get(k) for k in ("title", "uploader", "channel", "webpage_url",
                                       "upload_date", "source") if info.get(k)}
    meta["duration_s"] = round(dur, 1)
    meta["transcript"] = how
    if info.get("description"):
        meta["description"] = info["description"][:600]
    json.dump(meta, open(os.path.join(out, "meta.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=2)

    if keep and video.startswith(tmp):
        shutil.move(video, os.path.join(out, "video" + os.path.splitext(video)[1]))
    print(json.dumps({"outdir": os.path.abspath(out), "sheets": len(sheets),
                      "transcript_lines": len(lines), "transcript": how,
                      "video_kept": keep or not video.startswith(tmp)}, ensure_ascii=False))
finally:
    shutil.rmtree(tmp, ignore_errors=True)
