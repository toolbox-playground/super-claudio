# Animation Engines — HTML by default, Manim, Remotion and HyperFrames as alternatives

The skill renders lessons with one of four engines. **Ask the creator which one before
the first render of every course**: "Gero os vídeos com qual motor — HTML (padrão),
Manim, Remotion ou HyperFrames?" If the creator has no preference or says "qualquer
um", **use HTML**. Never re-ask inside the same course; the choice holds until the
creator changes it.

**HTML (the default)** is one t-page per lesson, rendered frame-exact by
`scripts/studio/render-tpage.mjs` from `templates/lesson-tpage.html`. Everything about
it, including why the creator chose it over HyperFrames on the same lesson, is in
`references/html-engine.md`. The rest of this file covers the three alternatives.

Whatever the engine, the core principle is untouched: **every duration comes from the
measured narration audio** (`voice.<name>.json`). The engines differ in how those
timings are injected, not in whether they are.

## The three alternative engines, measured

Same 20-second scene, same script, real logos, rendered back to back on the creator's
Mac (Nov 2026). Numbers are a practical reference for these projects, not a universal
ranking:

| Engine | Render (real) | Peak memory | Scene code | Language |
|---|---:|---:|---:|---|
| **Manim** | 55 s | 407 MB | smallest (~4.7 KB) | Python |
| **Remotion** | 51 s | 809 MB | ~6.2 KB | TypeScript/React |
| **HyperFrames** | 61 s | 381 MB | ~5.2 KB | HTML/CSS + GSAP |

Remotion's first render of a session also pays a bundle step (one-off ~90 s extra);
Manim and HyperFrames have no equivalent. Remotion is the only one that needs ~800 MB+;
on an 8 GB machine under load, prefer Manim or HyperFrames.

## When to pick an alternative

- **Manim** is the best tool for diagram-led conceptual lessons that are mostly
  mathematical animation: curves, transforms, equations. These render leaner in Manim
  than anywhere else.
- **Remotion** is for a course that already runs on it (`ShotPan.tsx`, `revealWord`,
  the caption machinery in `references/video-pipeline.md`). Check its licence: it is
  free for teams of up to 3 people; larger companies need a Company License
  (remotion.dev/license).
- **HyperFrames** is for a course that already runs on it, or for a creator who wants
  its block registry.

If the creator picks Manim or HyperFrames for a lesson built around real images, state
the trade-off in one line before rendering: the camera moves that follow the narration
across an image take far more work there than in the HTML engine.

## Manim

Community edition, in a venv, no LaTeX needed for these lessons:

```bash
python3 -m venv .venv && .venv/bin/pip install manim
.venv/bin/manim render -q h --fps 30 -r 1920,1080 aula.py AulaScene -o aula-video.mp4
```

- **Sync:** generate every `run_time=` and `self.wait()` from the word timings in
  `voice.<name>.json`. The scene file is code you write per lesson; the timings are
  data, never hand-tuned numbers.
- **Real images** (logos, figures found by image search, screenshots): `ImageMobject`,
  framed on a `RoundedRectangle` card. Same sourcing rules as
  `references/realistic-visuals.md`.
- **Audio:** Manim renders silent video; mux at the end —
  `ffmpeg -i aula-video.mp4 -i aula.mp3 -c:v copy -c:a aac -shortest aula.mp4`.
- **Captions:** burn with ffmpeg subtitles from the same timings
  (`scripts/studio/` alignment output converts to SRT), or keep captions off if the
  creator does not use them.
- Verify like every render: extract frames at several timestamps and look at them,
  confirm the audio stream and duration.

## Remotion — the full machinery

The complete pipeline — studio bootstrap, `revealWord`, captions, `ShotPan.tsx`,
alignment scripts — is `references/video-pipeline.md`. Nothing there changed; it is
simply no longer the only route. For 3D stylized scenes (the dark-datacenter look),
`@remotion/three` renders three.js inside a composition — render with `--gl=angle`.

## HyperFrames — HTML in, MP4 out

Open-source (Apache-2.0, HeyGen). A composition is an `index.html`: absolutely
positioned DOM, a paused GSAP timeline registered on `window.__timelines`, and
`data-duration` on the root. The CLI renders it:

```bash
npx --yes hyperframes@latest render   # output lands in renders/
```

- **Sync:** GSAP timeline positions are seconds — place every tween at the second the
  narration says the word, read from `voice.<name>.json`.
- **Real images:** plain `<img>` tags; same card framing and sourcing rules.
- **Audio:** mux with ffmpeg after the render, same command as Manim.
- The upstream project ships its own Claude Code skills
  (`npx skills add heygen-com/hyperframes`) with a registry of ready-made blocks,
  captions and media handling. This skill does not depend on them; if the creator has
  them installed, they can deepen the HyperFrames route, not replace this pipeline.

## What was tested and rejected for this skill

- **p5.js as a lesson engine:** works, but adds nothing over plain HTML. The
  frame-capture harness that came out of these tests became
  `scripts/studio/render-tpage.mjs`, which is now the default engine
  (`references/html-engine.md`). three.js runs on the same harness for 3D shots, only
  when the creator asks for 3D (`references/terminal-demo-and-3d.md`).
- **Motion Canvas:** good output, but rendering drives the editor UI through a
  headless browser; too fragile to automate inside a course loop.
