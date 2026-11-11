# Video Pipeline — Remotion, synchronized to the narration

Programmatic video: React components rendered frame by frame to MP4. Every timing in
the composition comes from the narration audio that already exists. Nothing is guessed.

## Stack

| Piece | Value |
|---|---|
| Renderer | Remotion 4.0.x + React 19.x |
| Audio input | the MP3 downloaded from ElevenLabs |
| Output | 1920x1080 h264 + aac, 30 fps |
| Render cost | ~20s of video in ~1 min on 6 cores — cheap, unlike the narration |

## Bootstrapping the studio — first run on a new machine

There is **one** studio per creator, reused by every course and every video; the
per-lesson folders live inside it. If `~/Movies/video-shorts/studio` already exists,
skip this section. If it does not — a colleague's first run — build it before anything
else, because nothing renders without it.

**Prerequisites, all of them already on a normal dev Mac:**

| Need | Why | Check |
|---|---|---|
| Node 20+ | Remotion and every script | `node -v` |
| `ffprobe` and `ffmpeg` on PATH | `build-voice.mjs` measures the MP3; `align-wav.mjs` finds the pauses | `ffprobe -version` |
| Chrome or Chromium | `shoot-html.mjs` screenshots the replicas headlessly | it is found automatically at the usual paths, and says so loudly if it is not |
| **No Docker** | nothing in this pipeline uses it | — |

Remotion renders with its own native compositor, installed as a dependency. There is
nothing to compile and no container to build.

```bash
mkdir -p ~/Movies/video-shorts/studio && cd ~/Movies/video-shorts/studio
npm init -y
npm i remotion@^4.0.513 @remotion/cli@^4.0.513 react@^19 react-dom@^19
npm i -D typescript @types/react
mkdir -p src/videos public scripts
```

Four files, once:

- `src/index.ts` — `import {registerRoot} from 'remotion';` plus
  `import {RemotionRoot} from './Root';` and `registerRoot(RemotionRoot);`
- `src/Root.tsx` — an empty `RemotionRoot` returning a fragment; every lesson adds its
  own `<Composition>` to it
- `remotion.config.ts` — `Config.setVideoImageFormat('jpeg')` and
  `Config.setOverwriteOutput(true)`
- `tsconfig.json` — `jsx: "react-jsx"`, `moduleResolution: "Bundler"`,
  `resolveJsonModule: true`, `strict: true`, `noEmit: true`, `include: ["src"]`

Then copy this skill's own assets in — they are not duplicated per lesson:

```bash
cp <skill>/scripts/studio/*.mjs  ~/Movies/video-shorts/studio/scripts/
cp <skill>/templates/ShotPan.tsx ~/Movies/video-shorts/studio/src/
```

`npx remotion compositions` is the check: it prints the (initially empty) list without
error once the studio is sound. Run it before writing a lesson, not after a render
fails.

## Project layout

```
studio/
  src/Root.tsx                         compositions, one per lesson
  src/videos/<curso>/<aula>/
    config.ts                          slug, colors, scene definitions
    Main.tsx                           assembles scenes into a Series
    script.md                          the plan: beats, visuals, sources
    narration/aula.txt                 the spoken text (also the caption source)
    display.json                       spelled-for-the-voice -> shown-on-screen (symbols)
    voice.<name>.json                  measured durations + word timings
    scenes/                            one component per visual type
  public/<slug>/<voice>/aula.mp3       the audio Remotion loads
  public/<slug>/shots/*.png            screenshots the lesson pans across
<curso>/assets/*.html                  the replicas those screenshots are rendered from
  scripts/                             align, build-voice, timestamps, apply-display
```

## Audio drives the video

`build-voice.mjs` measures the audio with ffprobe and writes:

```json
{"voice": "caio", "fps": 30, "durations": {"b02": 600},
 "totalFrames": 600, "captions": {"b02": [{"word": "O", "startMs": 0, "endMs": 108}]}}
```

`durationInFrames = ceil((audioSeconds + 0.35) * 30)`. The 0.35s pad keeps the next
scene from clipping the tail of a sentence.

`Main.tsx` throws `no measured duration for scene <id>` rather than rendering a scene
with a guessed length. Keep that guard — it is what makes a desync impossible rather
than merely unlikely.

## Getting word timings — two paths

**From the API (preferred).** `POST /v1/text-to-speech/{voice_id}/with-timestamps`
returns `alignment.characters` with per-character start and end times. Group characters
into words on whitespace, take each word's first start and last end, and write the
caption array directly. These times are exact, so reveals land on the right frame.
`scripts/studio/timestamps-to-srt.mjs` writes that SRT, which `build-voice.mjs` then reads.

**With no audio at all — drafting the visuals first.** `scripts/studio/draft-timing.mjs`
spreads the narration across the duration the character count implies (934 chars per
minute), weighting words by length and by the pauses punctuation buys. It writes the
same `voice.<name>.json` the renderer reads, so the whole visual layer — shots,
reveals, captions — can be built, rendered and reviewed **before a single credit is
spent on audio**. Use it to settle a layout or compare approaches.

It is a draft, and the file says so: `voice: "draft"`. The moment real audio exists,
re-run the real alignment and re-render. Never deliver a video timed this way as
finished work.

**From a downloaded MP3 (web-app route).** No timings exist, so
`scripts/studio/align-wav.mjs` estimates them:

1. find speech segments with ffmpeg `silencedetect` (noise `-35dB`, min `0.22s`)
2. distribute the known words across cumulative speech time, weighted by `len(word)+1`
3. map speech-time offsets back onto wall-clock across the segments
4. write an SRT that `build-voice.mjs` then parses

It is approximate but stable. It drifts on long pauses and on unusual pacing, so when
sync matters, move to the API path.

**ffmpeg writes `silencedetect` output to stderr.** Use
`spawnSync(..., {encoding:'utf8'})` and read `res.stderr`; `execFileSync` returns only
stdout and yields `null`.

## Showing symbols in captions

The narration spells symbols for the voice (`CLAUDE ponto M D`), and the captions should
show the symbol (`CLAUDE.md`). `scripts/studio/apply-display.mjs` does the swap on the
caption data, **after** alignment, so every timing is the one that was measured:

```bash
node scripts/align-wav.mjs ...                  # or timestamps-to-srt.mjs
node scripts/build-voice.mjs <slug> <voice>     # writes voice.<voice>.json
node scripts/apply-display.mjs src/videos/<slug>/voice.<voice>.json \
                               src/videos/<slug>/display.json
```

`display.json` is a list of `{"say": ..., "show": ...}` (template:
`templates/display.example.json`). The merged word starts where the first spelled word
started and ends where the last one ended; punctuation around the sequence is kept.
Matching ignores case, accents and punctuation, the longest entry wins, and a second run
changes nothing. `--dry` prints the counts without writing; `--selftest` runs the built-in
cases. A line that matched **0 times** and is not marked *(already applied)* means the
entry does not match the narration word for word — fix the entry, not the script.

Two things to keep straight:

- **Order.** `build-voice.mjs` rebuilds `voice.<voice>.json` from the SRT and discards the
  substitutions. Run `apply-display.mjs` after every `build-voice.mjs`.
- **Reveal anchors.** A `revealWord` is matched against the caption words, and after the
  swap `ponto` or `barra` no longer exist. Anchor on the shown text — `revealWord:
  'CLAUDE.md'` matches, because both sides are normalised to letters and digits — or on a
  word next to the sequence.

## From beats to scenes

**One lesson is one take, so it is usually one scene.** ElevenLabs returns a single
audio file per lesson, and cutting it at beat boundaries means cutting mid-breath. In
practice the beats become *reveals inside one scene*, staged by word timing, rather
than separate `Series.Sequence` entries. Use several scenes only when the audio
genuinely arrives as several files.

**A long single video is the case where it does.** A 10-minute video is near the
character ceiling and is often planned as segments anyway. Each segment is its own
audio file, its own scene in the `Series`, and its own measured duration — which is
what this pipeline was built for. Remotion then renders the whole thing as **one MP4**,
with each segment keeping its own word alignment.

**Do not join finished videos by hand.** Exporting three MP4s and stitching them in
QuickTime, iMovie or anything similar throws away the per-segment timing work,
re-encodes everything a second time, and gives you a cut whose position you cannot
adjust without redoing the export. Put the segments in the composition instead and
render once. If audio ever genuinely has to be concatenated outside the pipeline,
ffmpeg's concat demuxer does it without re-encoding — but that is a repair, not the
route.

Name the segments so they sort in play order (`s01`, `s02`, `s03`), because
`build-voice.mjs` reads them from the directory in sorted order.

`script.md` lists the beats; each beat becomes a staged visual. Reference types:
`shot-pan` (a screenshot zoomed and marked — the default whenever the subject exists on
a screen, see `realistic-visuals.md`), `logo-intro`, `bullets`, `statement`, `diagram`,
`code`, `reconcile`, `outro`.

A diagram node carries a `revealWord`:

```ts
{id: 'hpa', label: 'HPA', x: 80, y: 170, w: 360, h: 95, revealWord: 'HPA'}
```

The box appears when the narration reaches that word. `revealMs(words, target, fallback)`
in `scenes/util.ts` resolves it at render time, normalizing with NFD so accents match.
This is what makes the video read as *explained* rather than captioned, and it re-times
itself when the script changes.

Pick distinctive trigger words. A word spoken five times earlier in the lesson fires
the reveal on the first occurrence, which is almost never the intended one — see the
beat guidance in `narration-script.md`. When a repeated word is genuinely the right
trigger for two different moments, `revealMsNth(words, target, nth, fallback)` selects
which occurrence.

Since the spoken text and the display text are now identical, `revealWord` matches the
narration file directly. There is no respelling layer to reconcile.

## Rendering a subset

`Root.tsx` passes `only: Object.keys(data.durations)` and `Main.tsx` filters scenes to
that list. A voice JSON containing one scene renders just that scene — which is how to
preview one beat before rendering a whole lesson.

## Verification before delivery

Rendering silently produces a valid-looking MP4 even when a scene is visually broken.
Always:

- `ffprobe` the output for both streams and the expected duration — it should match the
  narration plus the final pad
- `volumedetect` the MP4 to confirm the audio is not silent
- extract frames at several timestamps and **look at them**; three visual bugs in the
  reference run (an empty half-screen, captions overlapping code, a pod count
  contradicting its own counter) were found only this way
- check a frame mid-narration to confirm reveals are still staged progressively, not
  all visible from frame 0
- spot-check one reveal against the narration: find the second the word is spoken and
  confirm the matching visual is on screen there

## Gotchas that cost time

- `npx remotion still` fails silently when the output file already exists and
  `--log=error` is set. Delete the file first.
- zsh does not word-split unquoted variables: `for spec in "b05 2401"; do set -- $spec`
  leaves `$1` as the whole string. Pass separate arguments to a function instead.
- Guard shell globs that delete: `rm -f "${OUT:?}"/*.mp3`, never `"$OUT"/*.mp3`.
- `volumedetect` and `silencedetect` print at ffmpeg's `info` level. Running with
  `-v error` silently yields no measurements at all.
- `align-wav.mjs` only reads `.wav`. For an ElevenLabs `.mp3`, convert a throwaway WAV
  in a temp directory, align there, then copy the `.srt` next to the MP3 — keeping both
  formats in the public dir makes `build-voice.mjs` see two scenes.
- A long title overlapping a card is the classic render bug: it looks fine in the
  config and only shows up in an extracted frame. Check a frame before delivering.
- A background command piped into `tail` prints nothing until it exits — you lose all
  progress visibility on a long run.
- **zsh aborts a command chain on a glob that matches nothing.** `rm -f "$OUT"/*.mp4`
  in an empty directory does not quietly succeed: it fails with `no matches found` and
  everything after `&&` is skipped. A render loop written that way runs zero renders
  and still reports exit 0, because the last command on the line succeeded. Delete a
  known filename (`rm -f "${OUT:?}/name.mp4"`) rather than globbing.
- **A repeated trigger word fires on the first occurrence, and the first is rarely the
  one you meant.** A 30-second script said "armazenamento" twice — once listing what a
  Pod shares, once opening the section about it — and the reveal landed 7 seconds early,
  on a visual that had not been explained yet. Before wiring a `revealWord`, count its
  occurrences in the narration and pass `nth` when there is more than one. It is a
  one-line check and it is invisible in the config.
- A full-bleed screenshot of a white UI swallows white captions. The bottom scrim in
  `realistic-visuals.md` is not optional.
- A focus or mark rectangle measured against the *shot* size instead of the *authored
  page* size silently breaks the moment `SHOT_SCALE` changes. Always divide by the page.
- Rendering a lesson built on 4800px screenshots is several times slower than one built
  on shapes. Run it in the background and do not pipe it into `tail`.
- `shoot-html.mjs` is given an **absolute** directory. `file://` plus a relative path is
  `ERR_INVALID_URL`; Chrome exits without writing, and if a PNG from a previous run is
  still sitting there, the script used to report success and you would debug CSS that
  was never rendered. It now deletes the output first — the same trap as
  `npx remotion still`. Whenever a screenshot "ignores" an edit, check its mtime before
  blaming the CSS.
- A callout chip at `calloutAt: 'bottom'` can land exactly on the mark it labels. Decide
  per shot and confirm in a frame.
- **Captions showing `CLAUDE ponto M D` instead of `CLAUDE.md`** means `apply-display.mjs`
  did not run after the last `build-voice.mjs`, which rebuilds the JSON from the SRT and
  drops the substitutions.
