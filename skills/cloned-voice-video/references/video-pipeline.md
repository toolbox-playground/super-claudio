# Video Pipeline — Remotion, audio-driven

Programmatic video: React components rendered frame by frame to MP4. Every timing in
the composition comes from the measured narration, never from a hand-written number.

## Stack

| Piece | Value |
|---|---|
| Renderer | Remotion 4.0.x + React 19.x |
| Output | 1920x1080 h264 + aac, 30 fps |
| Render cost | ~20s of video in ~1 min on 6 cores (cheap next to TTS) |

## Project layout

```
studio/
  src/Root.tsx                         compositions, one per voice
  src/videos/<slug>/
    config.ts                          SLUG, colors, scene definitions
    Main.tsx                           assembles scenes into a Series
    script.md                          the plan, with sources
    narration/sNN.txt                  DISPLAY text (also the caption source)
    narration-tts/sNN.txt              SPOKEN text (phonetically respelled)
    voice.<name>.json                  measured durations + word timings
    voices.ts                          generated barrel of voice JSONs
    scenes/                            one component per visual type
  public/<slug>/<voice>/sNN.wav        the audio Remotion loads
  scripts/                             respell, align, build-voice
```

## Scene definition

`config.ts` holds one entry per scene with `id`, a `visual` type, and props. Visual
types in the reference implementation: `logo-intro`, `bullets`, `statement`, `diagram`,
`code`, `reconcile`, `outro`.

A diagram node carries a `revealWord`:

```ts
{id: 'api', label: 'API server', x: 80, y: 170, w: 360, h: 95, revealWord: 'API'}
```

The box appears when the narration reaches that word. `revealMs(words, target, fallback)`
in `scenes/util.ts` resolves it at render time, normalizing with NFD so accents match.
This is what makes the video read as *explained* rather than captioned — and it
re-times itself automatically when the narration changes.

Note the `revealWord` matches the **display** text, not the respelled spoken text.

## Audio drives the video

`build-voice.mjs` measures each WAV with ffprobe and writes:

```json
{"voice": "demo", "fps": 30, "durations": {"s04": 600},
 "totalFrames": 600, "captions": {"s04": [{"word": "A", "startMs": 0, "endMs": 108}]}}
```

`durationInFrames = ceil((audioSeconds + 0.35) * 30)`. The 0.35s pad prevents the next
scene from clipping the tail of the sentence.

`Main.tsx` throws `no measured duration for scene <id>` rather than rendering a scene
with a guessed length. Keep that guard.

## Captions without a subtitle track

edge-tts emits SRT; Chatterbox does not. `align-wav.mjs` is a poor-man's forced aligner:

1. find speech segments with ffmpeg `silencedetect` (noise `-35dB`, min `0.22s`)
2. distribute the known words across cumulative speech time, weighted by `len(word)+1`
3. map speech-time offsets back onto wall-clock across the segments
4. write an SRT that `build-voice.mjs` then parses

It is approximate but stable, and it is what gives a Chatterbox render the same
word-by-word captions and narration-synced reveals as an edge-tts render.

**ffmpeg writes `silencedetect` output to stderr.** Use `spawnSync(..., {encoding:'utf8'})`
and read `res.stderr`; `execFileSync` returns only stdout and yields `null`.

## Rendering a subset

`Root.tsx` passes `only: Object.keys(data.durations)` and `Main.tsx` filters scenes to
that list. A voice JSON containing one scene renders just that scene — which is how to
preview a single scene before committing hours of synthesis to a full video. Existing
full voices are unaffected because they list every scene.

## Verification before delivery

Rendering silently produces a valid-looking MP4 even when a scene is visually broken.
Always:

- `ffprobe` the output for both streams and the expected duration
- `volumedetect` the MP4 to confirm the audio is not silent
- extract frames at several timestamps and **look at them** — three visual bugs in the
  reference run (an empty half-screen, captions overlapping code, a pod count
  contradicting its own counter) were found only this way
- check a mid-narration frame to confirm progressive reveals are still staged, not all
  visible from frame 0

## Gotchas that cost time

- `npx remotion still` fails silently when the output file already exists and
  `--log=error` is set. Delete the file first.
- zsh does not word-split unquoted variables: `for spec in "s05 2401"; do set -- $spec`
  leaves `$1` as the whole string. Pass separate arguments to a function instead.
- Guard shell globs that delete: `rm -f "${OUT:?}"/*.mp3`, never `"$OUT"/*.mp3`.
- A background command piped into `tail` prints nothing until it exits — you lose all
  progress visibility on a 40-minute run.
- `docker run ... &` inside a backgrounded shell command kills the container when the
  wrapper returns. Run it in the foreground of the background task.
