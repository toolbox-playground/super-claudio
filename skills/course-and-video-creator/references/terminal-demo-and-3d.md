# Terminal Demo and 3D — the command and its effect in one frame

Two visual routes for technical lessons, both built as a **t-page**: an HTML page where
every frame is a pure function of time, rendered frame-exact by
`scripts/studio/render-tpage.mjs`.

- **In the HTML engine (the default),** the lesson is already a t-page
  (`references/html-engine.md`). A terminal demo is one scene of it: `win()` and
  `terminal()` from `templates/lesson-tpage.html`, with the diagram drawn in the same
  `draw(t)`.
- **In Manim, Remotion or HyperFrames,** the demo is a separate shot: an MP4 clip that
  the lesson's composition places on the timeline. When the whole lesson is one demo,
  the clip is the lesson's video on its own.

The rules below hold either way.

| Route | When | Template |
|---|---|---|
| **Terminal demo** | the lesson teaches something a practitioner **does in a terminal** and that **changes a system**: `kubectl`, `terraform`, `docker`, `git`, `aws`, `systemctl`... | `templates/terminal-demo.html` |
| **3D scene (three.js)** | **when the creator or the script asks for 3D**, or when the idea is genuinely spatial (layers, physical layout) and you propose it at the outline gate | none, written per scene |

## Terminal demo

One window. On the left, a terminal types the real command and prints its real output.
On the right, a diagram of the system **reacts to that output the moment it lands**:
`kubectl run` prints `pod/web created` and the Pod appears on the node; `kubectl get pod`
prints `1/1` and the container is ringed; the IP is printed and the Pod's network line
draws. The viewer sees the command and its effect at once, which is the thing a
terminal-only shot cannot show and a diagram-only shot cannot make real.

The creator approved this format (Nov 2026) over diagram-only and screenshot-only takes
of the same Pod lesson. Use it whenever a lesson has commands that change something;
it does not replace the architecture overview or the image-search figures, it is one
more artefact in the rotation (`references/realistic-visuals.md`).

### Why this split works when the old side-by-side did not

`references/realistic-visuals.md` records a side-by-side layout that was rejected: a
page authored at 1600px squeezed into a 634px pane, two artefacts competing for
attention. The terminal demo avoids both failures, and these are its rules:

- **Authored at the final frame size.** The page is 1920×1080 and is rendered at
  1920×1080. Nothing is scaled down. The terminal font is **22px mono, the floor** —
  never smaller to fit a line.
- **One thing moves at a time, and the left side causes the right.** While a command
  types, the diagram is still. When the output lands, the diagram answers. The eye goes
  left, then right, then left — never two halves animating independently.
- **The diagram only shows what the command changed.** It is a picture of the system
  the command acts on (cluster → node → Pod → container), not a second lecture.
- **The narration names the step as it happens.** Each change is cued on a spoken word.

### Real commands, real output, no trimming

The window is a replica; what is printed inside it is not. The rule from
`references/realistic-visuals.md` applies with one addition that this format makes
tempting to break:

- **Never trim columns or rewrap output to make it fit.** `kubectl get pod -o wide`
  prints `NOMINATED NODE` and `READINESS GATES`. A version without them is invented
  output. If the real output is too wide for ~60 columns, **choose a command whose real
  output is narrow**: `-o jsonpath='{.status.podIP}{"\n"}'`, `-o custom-columns=...`,
  `--no-headers`, a single resource instead of a list.
- Run the commands (a local `kind` or `minikube` cluster is enough for Kubernetes) and
  paste the output, or use the vendor's documented output. Pod IPs and ages from your
  own run are fine; never a real company hostname, account id or token.
- Status sequences must be ones the tool really prints, in its order: a new Pod shows
  `Pending`, then `ContainerCreating`, then `Running`.

### Building one

1. Copy `templates/terminal-demo.html` next to the lesson.
2. Replace `SESSION` with the lesson's commands and their real output.
3. Replace the map's HTML and the lines in `drawMap(t)` that move it. Keep the rule:
   every change waits for the output line that causes it.
4. Set the cues in `C`: each is `cue('palavra', n, draftSecond)`, the n-th time the
   narration says that word. Without a voice file the draft seconds are used, so the
   layout can be reviewed before any audio exists.
5. Render, with the lesson's measured word timings:

   ```bash
   node scripts/studio/render-tpage.mjs aula/terminal-demo.html aula/demo.mp4 \
     --voice voice.aula.json --scene aula
   ```

   The duration comes from the voice file (or `--secs`). Mux the narration as for any
   silent render (`references/animation-engines.md`). A cue word that is not in the
   narration is reported as a page error; fix the cue rather than ignoring it.

6. Extract frames and look at them, as for every render. Check in particular that no
   terminal line is cut at the right edge.

Keep each demo to the commands one beat needs, usually two or three. A ten-command
session on screen is a wall of text again; cut to a new demo for the next beat.

## 3D scenes with three.js — on request, or when the idea is genuinely spatial

3D is not a default. Most technical ideas read better flat, and a 3D scene costs far
more to build and check. Use it in two cases only:

- **The creator or the approved script asks for a 3D picture.**
- **The idea is genuinely spatial**, and a flat drawing would lose the point: layers
  stacked on each other (cluster → nodes → Pods → containers), a physical layout (racks,
  zones, regions), or depth that carries meaning. A box-and-arrow flow is never this
  case. When you decide this on your own, **propose it in the outline** (Stage 1) with
  one line on why, so the creator approves it at the gate like any other artefact.

How to build it, with nothing but the three.js library:

- **Setup.** `npm install three` in the lesson's folder (or the studio). three.js is a
  library, like Remotion or HyperFrames; nothing else is needed.
- **Engine.** Plain three.js on a t-page: the page sets `window.__ready = true` and
  exposes `window.seek(t)`, which positions everything and calls
  `renderer.render(scene, camera)` for that instant. No `requestAnimationFrame` loop,
  no `clock.getDelta()`: the frame must not depend on wall-clock time. Load three.js
  from the local `node_modules` through an import map
  (`"three": "./node_modules/three/build/three.module.js"`,
  `"three/addons/": "./node_modules/three/examples/jsm/"`), and render with
  `render-tpage.mjs --root <folder that contains node_modules>`. That flag is needed
  because Chrome blocks module imports from `file://`.
- **If the course already runs on Remotion**, `@remotion/three` is the other route
  (`references/animation-engines.md`); keep one route per course.
- **Style.** The look the creator approved (Nov 2026):
  - an orthographic isometric camera (elevation 30°, so edges slope 2:1);
  - near-black fills with thin light edges (`Line2` from `three/addons/lines/`, about
    1.3 px), rounded boxes;
  - one element highlighted at a time: white, a thicker line, lifted off its parent,
    with dotted guides down to where it sits.

  Labels are HTML over the canvas, in pt-BR, cued on narration words like everything
  else.

### Optional: chasing a target image

For a hero shot the creator wants at high fidelity, build against a **target image**
instead of by eye. This method is adapted from Dream Loop (achimala, MIT), and
everything needed to run it is below.

1. **Get the target.** This is a picture of exactly the frame you want, at the video's
   size. It can come from:
   - the creator;
   - a frame of an earlier render;
   - an image-generation API the creator connected.

   If you generate it, ask for a real in-engine screenshot, never "concept art", a
   painting or a cinematic shot. If none of these exists, stop and ask; do not invent
   a target. Save it as `.target-loop/target.png` in the lesson folder and gitignore
   that folder.
2. **Fix the contract.** Pick the page path, the viewport, the moment `t` that must
   match the target, and the t-page interface (`seek`, `__ready`, import map). Builders
   never change it.
3. **Run rounds.** Each round:
   1. Start **one fresh subagent**, never a fork, on the strongest model at low
      effort. Give it:
      - the target path;
      - the latest product frames (none on the first round);
      - the code path;
      - the creator's ask, with on-screen text in pt-BR;
      - the contract.

      Tell it to close the gap from the product to the target in composition,
      layout, light, materials, line work, fine details and animation. It should
      implement without testing. Give no specific tasks or opinions: the directive
      is the gap.
   2. **You validate.** Render the target moment with
      `render-tpage.mjs page.html .target-loop/rN.png --still <t>`, plus one or two
      other moments. Look at them next to the target. Fix only bugs (load errors, wrong
      orientation, blank frames); visual gaps are the next round's job.
4. **Stop after 3 rounds** and show the creator the frames and the clip. Offer more
   rounds only if they want them.

Measured on the Pod scene (Nov 2026): round 2 already matched the target almost pixel
for pixel. Each round cost about 100–130k subagent tokens, and the whole loop about 20
minutes. That is why this is for **one hero shot the creator asked for**, never per
lesson.

## Honest limits

- Rendering screenshots every frame. On the creator's Intel Mac that costs about 0.2 s
  per frame when the machine is idle (about 1 minute per 10 s of video at 30 fps). It
  rises to 1–3 s per frame when other renders or heavy apps run at the same time, so
  render clips one at a time.
- Headless Chrome renders WebGL in software (SwiftShader) when it has no GPU access.
  Heavy 3D scenes (shadows, many lights) get slow; keep 3D scenes flat-shaded.
- The diagram is a drawing. Say so in the script if anything could read as a
  screenshot of a real dashboard.
