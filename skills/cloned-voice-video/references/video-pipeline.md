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

## Project layout

```
studio/
  src/Root.tsx                         compositions, one per lesson
  src/videos/<curso>/<aula>/
    config.ts                          slug, colors, scene definitions
    Main.tsx                           assembles scenes into a Series
    script.md                          the plan: beats, visuals, sources
    narration/aula.txt                 the spoken text (also the caption source)
    voice.<name>.json                  measured durations + word timings
    scenes/                            one component per visual type
  public/<slug>/<voice>/aula.mp3       the audio Remotion loads
  public/<slug>/shots/*.png            screenshots the lesson pans across
<curso>/assets/*.html                  the replicas those screenshots are rendered from
  scripts/                             align, build-voice, timestamps
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

## From beats to scenes

**One lesson is one take, so it is usually one scene.** ElevenLabs returns a single
audio file per lesson, and cutting it at beat boundaries means cutting mid-breath. In
practice the beats become *reveals inside one scene*, staged by word timing, rather
than separate `Series.Sequence` entries. Use several scenes only when the lesson's
audio genuinely arrives as several files.

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
- A full-bleed screenshot of a white UI swallows white captions. The bottom scrim in
  `realistic-visuals.md` is not optional.
- A focus or mark rectangle measured against the *shot* size instead of the *authored
  page* size silently breaks the moment `SHOT_SCALE` changes. Always divide by the page.
- Rendering a lesson built on 4800px screenshots is several times slower than one built
  on shapes. Run it in the background and do not pipe it into `tail`.
