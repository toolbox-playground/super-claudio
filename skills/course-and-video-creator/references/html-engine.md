# HTML Engine — the default: one lesson, one t-page

A lesson is one HTML page in which **every frame is a pure function of time**. The
page exposes `window.seek(t)` and sets `window.__ready = true`.
`scripts/studio/render-tpage.mjs` seeks every frame, screenshots it and encodes the
MP4. Nothing reads the wall clock, so a slow machine renders exactly the same video as a
fast one. Chrome, Node 22+ and ffmpeg are all it needs; there is nothing to
`npm install`.

## Why it is the default

In Nov 2026 lesson 4.1 of the creator's "IA para Dev/Ops" course was rebuilt here. The
original had been rendered in HyperFrames. Everything except the engine stayed the
same: the audio, the script, the 18 scenes cut on the same words, the same web images,
the same real terminal output, the captions and the footer. The creator rated the
HyperFrames version 8 and this one 10, and replaced the published lesson with it.

Both versions were HTML. The difference was what this engine makes cheap to write,
because a scene is plain code over `t`:

- **The camera goes where the narration points.** On a real image found on the web, the
  view moves to each panel as it is named ("taxa", "latência", "tráfego", "recursos"),
  and a chip names the panel.
- **The terminal types the real command, and a diagram answers its output.** This is
  the terminal demo (`references/terminal-demo-and-3d.md`) inside a lesson rather than
  as a separate clip.
- **Things travel.** A CSV file flies from the export button to the agent's chat, and a
  query packet runs from the agent to the data source.
- **Text keeps pace with the voice.** A prompt is written word by word as it is spoken,
  logs stream line by line, and a checklist ticks on the word that names each item.
- **Small proofs.** A timeline shows the same interval in local time and in UTC, and
  the write row of a permissions table is struck when the narration says "leitura".

## Choosing it, and when another engine wins

Ask once per course, at the first render gate:

> "Gero os vídeos com qual motor — HTML (padrão), Manim, Remotion ou HyperFrames?"

If the creator has no preference, use HTML. The other three engines are in
`references/animation-engines.md`. Pick one of them only when:

- the creator asks for it;
- the course already runs on it;
- or the lesson is mostly mathematical animation (curves, transforms, LaTeX), where
  Manim is better.

## Setup

Use the folder layout from Stage 4:

```
~/Movies/video-shorts/<curso>/<aula>/
  index.html            ← copied from templates/lesson-tpage.html
  assets/               ← images found on the web, the creator's own images, logos
  aula.mp3              ← the measured narration
  voice.<name>.json     ← word timings (Stage 4, step 1)
```

Copy `scripts/studio/render-tpage.mjs` into the course studio, or call it from the skill
folder.

## Building a lesson

1. **Copy `templates/lesson-tpage.html`** to `index.html`. Fill in `LESSON`:
   - the title card's kicker and title;
   - the kicker repeated on every page;
   - the footer, which is the creator's brand (or `null` to hide it);
   - whether to show captions.
2. **Write one scene per beat of the script.** A scene starts on a word of the
   narration (`word`, plus `nth` if it repeats) and lasts until the next scene starts.
   Each scene has:
   - `html`, built with the helpers `page()`, `camHTML()` and `win()`;
   - `draw(t, $)`, which sets every moving part for the instant `t`.
3. **Cue every change on a spoken word** with `at('palavra', n)`. Never type seconds by
   hand. A cue word that is not in the narration is reported as a page error, and the
   render exits with code 2. Fix the cue; do not ignore the error.
4. **Use real things**, under the same rules as `references/realistic-visuals.md`:
   - images found on the web, cropped to the diagram, with a credit line naming the
     source and whether its licence was confirmed;
   - terminal output from a real run, never trimmed to fit;
   - for a scene that shows nothing real, a drawn diagram, with the credit line
     saying so.
5. **Follow the motion rules the creator approved:**
   - **One thing moves at a time.** In a terminal scene, the left side causes the
     right.
   - **The camera arrives as the word is spoken.** Start the move about 0.15 s before
     the word, and ease it in and out (`camera(..., dur)` with 0.6–1.1 s).
   - **A ring hands over.** When the next item lights up, the previous ring fades
     (`ring(el, t, a, b)`).
   - **No image holds more than ~15 s without a camera move or a second visual,** and
     none flashes by in under ~3 s (`references/realistic-visuals.md`).

### The kit inside the template

| Helper | What it does |
|---|---|
| `at(word, n)` | Returns the second at which the narration says `word` for the n-th time. Accents and punctuation are ignored. |
| `ease`, `inout`, `lerp`, `clamp` | Easing and interpolation, all as functions of `t`. |
| `show(el, t, a)` / `pop(el, t, a)` | Make an element appear at second `a`: `show` slides it up, `pop` scales it in. |
| `ring(el, t, a, b)` | Turns a highlight ring on at `a` and off at `b`. Omit `b` to keep it on. |
| `camHTML(id, src, ar, style)` + `camera(el, t, keys, dur)` | Places a camera over a real image. `keys` is a list of `[second, {x,y,w,h}]`, with `x,y,w,h` as fractions of the image and `FULL` for the whole image. `ar` is the image's width / height. |
| `win(cls, style, bar)` + `terminal(el, t, session)` | Draws a terminal window and types a session of `{at, cmd, out, cps}` into it. `outAt(step)` returns the second at which a step's output lands, so the diagram reacts on that second. |
| `typed(s, t, a, cps)` / `typeEnd(...)` | Types any string, for example a prompt or a script, and returns when it finishes. |

The assembly at the bottom of the template handles the rest:
- each scene's start, from its word;
- a 0.45 s crossfade between scenes;
- a slow 2.5 % push-in on every scene;
- the title card over the opening;
- four-word captions with the spoken word highlighted;
- the footer.

## Check, render, deliver

**Look before the full render.** Render one still per scene, a moment after each scene
starts, in a single Chrome launch:

```bash
node render-tpage.mjs aula/index.html aula/stills --still 1,8.5,15,22 \
  --voice aula/voice.<name>.json --scene aula
```

Tile the stills into a contact sheet with ffmpeg's `xstack` and look at it. Check for:
- text cut at an edge;
- the title card covering the opening page;
- a camera key that frames empty space;
- a terminal line wider than the window;
- a ring that never lights.

Fix, and render the stills again.

**Render in parallel:**

```bash
node render-tpage.mjs aula/index.html aula/video.mp4 \
  --voice aula/voice.<name>.json --scene aula --workers 4
ffmpeg -i aula/video.mp4 -i aula/aula.mp3 -c:v copy -c:a aac -b:a 192k -shortest aula/aula.mp4
```

`--workers N` splits the frames into N ranges, with one Chrome per range, and joins the
pieces losslessly. The output is identical to a single-worker render. Each Chrome takes
about 300–500 MB. On the creator's 12-core Intel Mac, 4 workers is the sweet spot.

Then verify as for every render:
- extract frames at several timestamps and look at them;
- run `ffprobe` to confirm the duration and that there is an audio stream.

A 1080p file over ~30 MB does not reach the creator's phone. Send a copy re-encoded
at `-crf 22` (about 25 MB for a 2.5 min lesson) and say where the full-quality file is.

## Measured (Nov 2026, lesson 4.1: 140 s, 4211 frames, 18 scenes)

| Render | Time |
|---|---|
| HyperFrames, 5 workers | 5 min 17 s |
| This engine, 1 worker | 26 min 36 s |
| This engine, 4 workers | 18 min 25 s |

Both runs of this engine shared the machine with other heavy jobs (load average
100–600), so read the numbers as an upper bound. The 4-worker output matched the
1-worker output frame for frame (PSNR 54.5 dB, which is encoder noise).

The cost is the screenshot of every frame: about 0.2 s per frame when the machine is
idle, and 1–3 s per frame when other renders or heavy apps compete for it. It is
slower than HyperFrames, and that is the trade the creator accepted for the result.
Render one lesson at a time, and look at the stills before spending the full render.
