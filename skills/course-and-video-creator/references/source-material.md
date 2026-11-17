# Source Material — when the creator hands you something to build on

A course rarely starts from a bare topic. The creator usually has material already: a
PDF, a slide deck, an article they wrote, a recorded talk, internal documentation.
**Read it before proposing anything.** A roadmap written without reading the material
the creator just handed over is the fastest way to lose their trust in the first five
minutes.

## Always read what you are given

If the request arrives with an attachment, a path or a link, open it first — before
the roadmap, before any question about level or length. Then say what you found, in
two or three lines, so the creator can see you actually read it.

| Format | How to read it |
|---|---|
| PDF | the `pdf` skill, or `Read` with `pages` for a long one (20 pages per call) |
| PPTX / DOCX / XLSX | the `pptx` / `docx` / `xlsx` skills |
| Web article, blog post, docs | `WebFetch`; if it 403s, open it in the browser and read the page text |
| Video: a YouTube, Instagram, TikTok or X link, or a video file | `scripts/source/read-video.sh` (see "A video as source" below) |
| Audio only (podcast, voice memo) | the same script: it transcribes any file ffmpeg can open |
| Code, repo, manifests | read the files directly — real configuration is the best artefact source there is |
| A link behind a login | ask the creator to export or paste it; never try to get past the login |

If a file will not open or a format is not supported, say so plainly and ask for
another export. Do not quietly proceed on the topic alone and let the creator discover
later that their material was ignored.

## A video as source

The creator often hands over a video: a Reel whose format they want to copy, a YouTube
lesson to build on, a talk they gave. `WebFetch` cannot watch a video, and a page's
text says almost nothing about one. Read it with the script:

```bash
skills/course-and-video-creator/scripts/source/read-video.sh '<link or file>' [outdir] [--keep]
```

It writes into `outdir` (default `fontes/<site>-<id>/` in the current folder):

| File | What it holds |
|---|---|
| `transcript.txt` | what is said, one `[m:ss]` line per phrase |
| `sheet-01.jpg`... | contact sheets of 15 frames each, at most ~45 frames for the whole video |
| `sheets.txt` | which moments each sheet covers |
| `meta.json` | title, author, link, date, duration, the post's description |

**How it reads.**
- **Download:** yt-dlp, which handles YouTube, Instagram, TikTok, X and hundreds of
  other sites. For YouTube it also needs Node, to solve YouTube's JavaScript check.
- **Speech:** YouTube's own captions when the video has them, because they are instant.
  The author's captions are preferred; otherwise the automatic captions in the video's
  language are used. Every other video is transcribed locally with faster-whisper
  (`small` model, CPU). Expect a few minutes per minute of video on an Intel Mac under
  load; set `READ_VIDEO_MODEL=base` for a faster, rougher pass.
- **Cleanup:** the downloaded video is deleted at the end, so only text and pictures
  stay on disk. Pass `--keep` when the creator wants the file.

The first run installs yt-dlp and faster-whisper into a private venv under
`~/.cache/super-claudio/read-video`. It needs Python 3.10–3.13, because faster-whisper
has no build for 3.14 yet. After that, yt-dlp updates itself once a week; sites change
how they serve video often, and a stale yt-dlp is the usual cause of a failed download.

**Then read it like any other source:**
1. Read `meta.json` and `transcript.txt`.
2. Look at every sheet with `Read`.
3. Tell the creator what you found, as for any material:
   - what the video says;
   - how it is built: the hook, the pace, how often the picture changes, the on-screen
     text, the visual style.

The second point is usually why a creator sends someone else's Reel.

**When it fails, say so.** A private post, a post behind a login, or one that was
removed does not download. Ask the creator to download it themselves and pass the
file. Never use their browser cookies or log in to get past it.

**Someone else's video is a reference, not footage.** It informs the course: its
structure, its pace, what it explains. Its frames, voice, music and wording never go
into the lesson. The creator's own videos are theirs to reuse.

## What to extract

Read for four things, in this order:

1. **The spine.** What argument does the material make, start to finish? That spine is
   usually the course's module order, already validated by someone who knows the
   subject.
2. **The claims worth keeping.** Numbers, mechanisms, specific advice. These become the
   lesson content, and each one carries its source into `script.md`.
3. **The artefacts.** Screenshots, diagrams, command output, config samples. Every one
   of these is a visual the lesson can show — and they are *already* the real thing,
   which is exactly what `realistic-visuals.md` asks for.
4. **The gaps.** What the material assumes, skips or dates. A course has room the
   original format did not; the gaps are where the extra lessons come from.

## What the material is, and is not

**It is a source, not a script.** An article is written language; a lesson is spoken
language. Narrating a blog post aloud produces exactly the flat delivery
`narration-script.md` exists to prevent. Take the substance and rewrite it as speech.

**It is the creator's own authority.** When the material states something as fact, it
carries their name, so keep it accurate and attribute it when the lesson quotes it. If
something in it looks wrong or out of date, say so and ask — do not silently correct a
creator's own published position, and do not silently repeat something you believe is
wrong.

**Its length is not the course's length.** A 2,000-word article is not a 20-minute
course by arithmetic. Size the course from the teaching, per `course-architecture.md`.

**Third-party material is not free to reuse.** If the creator hands you someone else's
deck or PDF, it informs the course; its images, wording and diagrams do not travel into
the video without permission. Their own material is theirs to reuse freely.

## Report back before the roadmap

Close the reading with a short summary and a proposal, not with the roadmap itself:

- what the material covers, in a few lines
- which parts become modules, and in what order
- what is missing that the course should add
- which artefacts you can already build from it

Then write the roadmap. The creator corrects the reading far more cheaply than they
correct a finished ementa.
