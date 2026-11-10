# Realistic Visuals — show the artefact, then draw on it

**The standard, for every course and every technology: if what the lesson teaches
exists on a screen somewhere, the video shows that screen — zoomed, marked and
narrated. Not a rounded rectangle standing in for it.**

A lesson about the LinkedIn headline shows a LinkedIn profile. A lesson about the HPA
shows a terminal with `kubectl get hpa` and a real manifest. A lesson about a
`terraform plan` shows the plan output, with the `-/+ destroy and then create` line
ringed in red. The viewer has to recognise the thing the moment they open their own.

A box labelled "HPA" teaches the concept and teaches nothing about where to look.

This is a mix, not a replacement. Remotion draws the **argument** — the ring, the
arrow, the red-to-green comparison, the word-by-word captions. The artefact supplies
the **thing** the argument is about.

## Every lesson names its artefact

Decide this when the roadmap is written, not when the render fails. For each lesson,
ask: *what does a practitioner actually look at when they do this?* That is the shot.

| Domain | The artefact the practitioner looks at |
|---|---|
| Kubernetes | a terminal running `kubectl`, a YAML manifest in an editor, the control-plane diagram, a dashboard panel |
| Terraform / IaC | `terraform plan` output, the `.tf` file, the state/dependency graph |
| AWS / Azure / GCP | the console page for that service, plus the CLI command that does the same thing |
| Linux / SRE | `systemctl status`, `journalctl` output, `htop`, a flame graph |
| CI/CD | the GitHub Actions run page, the pipeline YAML, a failing job's log |
| Git | the PR page, `git log --graph`, a diff |
| Databases | a `psql` session, an `EXPLAIN ANALYZE` plan, a schema diagram |
| Observability | a Grafana panel, a PromQL query and its graph, a trace waterfall |
| Programming | the editor with real syntax highlighting, a REPL, a traceback |
| Networking | `tcpdump`/`dig` output, a topology diagram |
| Career / soft skills | the product UI being taught — LinkedIn, a job board, a CV |
| Architecture, topology | a **rebuilt** reference architecture in HTML — see below, not Remotion boxes |
| Trade-offs, mental models, one mechanism in close-up | **nothing** — this is where Remotion's own shapes belong |

A lesson that is *all* screenshots is as flat as one that is all boxes. The rhythm is:
artefact for what exists, shapes for what does not, alternating.

## The artefact order follows the abstraction ladder

`narration-script.md` says a concept opens with the problem, not the definition, and
then descends one level of abstraction at a time. **The visuals ride the same ladder,
rung for rung.** Getting this wrong is the most common way a technical video ends up
factually correct and unteachable.

**Never open a concept on a terminal.** A CLI answers *where do I see this*, which is a
question the viewer does not have yet. It is the payoff, not the premise.

Each rung of the script has an artefact that belongs on screen for it:

| Rung | Artefact | What it does |
|---|---|---|
| **0 — the problem** | a diagram of the pain, built as its own page | makes the viewer feel the gap before the thing fills it |
| **1 — the mental model** | the rebuilt architecture, **pulled all the way back** | one picture, whole, so the shape lands before the parts |
| **2 — the parts** | the same architecture, in close-ups | each part ringed as the narration names it |
| **3 — the real world** | the terminal, the console, the dashboard | the same thing where the viewer will meet it |
| **4 — declaring it** | the manifest or config in an editor | the fields, highlighted one at a time |

Two consequences worth stating, because both were learned the hard way:

**The camera descends with the ladder.** Rung 1 is a wide shot of the entire diagram;
rung 2 crops into it. Reuse one artefact across both rather than drawing two — the pan
from whole to part *is* the descent, and the viewer keeps their bearings because it is
visibly the same picture. The arithmetic for how tight a crop can go is under *Shooting
for a zoom* below.

**Never skip an artefact to save work.** A video that jumps from the architecture
straight to the manifest leaves the viewer holding syntax for a thing they never saw
running. If a rung has no artefact yet, build it — that is cheaper than the lesson
failing.

**The problem deserves its own artefact.** This is the step most often skipped, and
rung 0 has no equivalent in any vendor's documentation, so it always has to be built. A
Pods lesson that opens on the Pod diagram has already given away the answer; one that
opens on *two loose containers, each with its own IP and its own disk, and a red line
where the sharing should be* makes the viewer feel the gap the Pod fills. Same replica
technique, pointed at the "before".

**Mark the turn into rung 3.** Cutting straight from a diagram to a terminal reads as a
glitch. A held card — one line of kicker, one word of title, about a second and a half
over the incoming artefact — tells the viewer the register is changing. Land it on the
sentence that says so ("agora vamos ver isso no mundo real").

## One artefact on screen at a time

A layout showing the diagram and the terminal side by side was built and **rejected**,
and the reason generalises: a page authored at 1600px rendered into a 634px pane is
unreadable, and even when it is legible the viewer does not know which half to read.
Splitting the frame halves both artefacts and doubles the decision.

Show one, fill the frame with it, then cut. The connection between the diagram and the
terminal is made by the narration and by **showing them in sequence on the same point**
— the two containers in the drawing, then `READY 2/2` in the output — not by putting
them side by side and hoping.

The exception is a genuine before/after of the *same* artefact, where the comparison
is the content.

## Research the real thing before drawing anything

Before building any visual, **look at how the real one looks.** Search for the product's
own screenshots, the vendor's reference architectures, the documentation's diagrams.
Two or three references are enough. You are not collecting images to paste — you are
learning the layout, the hierarchy, the colours and the vocabulary the real artefact
uses, so the replica reads as *that thing* instead of as generic shapes.

Skipping this step is how a replica ends up looking like a wireframe of itself.

## Architecture diagrams: research, then rebuild in HTML

This is where the temptation to fall back on Remotion boxes is strongest, and where
giving in costs the most. A cluster architecture drawn as five rounded rectangles
teaches nothing the narration did not already say.

The sequence that works:

1. **Find two or three real reference architectures** for the thing being taught — the
   vendor's own, the documentation's, a well-regarded one from a conference talk.
2. **Rebuild one in HTML**, at the fidelity of the references: real component names,
   the real grouping (control plane vs. nodes, VPC vs. subnet, region boundaries), real
   iconography drawn in CSS, the dashed boundary boxes and the labelled arrows that
   real diagrams use. Shoot it with `shoot-html.mjs`.
3. **Then simplify with Remotion** when the lesson drills into one part of it.

Rebuilding beats copying an image off the internet for the same reasons the UI replica
does: no licence question, your own brand palette, any resolution you want, and — the
one that matters most here — **you control which parts exist**. A reference diagram
shows everything at once; your rebuild can ship as three variants of the same layout,
each with one more layer present, so the architecture assembles itself as the narration
explains it.

**Realistic overview, simplified detail.** Establish with the full, real-looking
architecture so the viewer sees the real shape of the system. Then, when the lesson
zooms into one mechanism — the reconciliation loop, the request path, one failure mode
— switch to Remotion's own shapes, because at that depth the simplification *is* the
teaching. Going the other way round, simple first and real later, leaves the viewer
unable to place what they learned.

## Replicate the frame. Never fake the facts.

This is the line that keeps the technique honest, and it is not optional.

- **The chrome is a replica.** The terminal window, the console sidebar, the editor
  tab bar, the profile layout — build those from scratch in HTML. They are visual
  furniture.
- **The content inside is real.** Run the real command and paste its real output. Use
  the real manifest, the real error message, the real plan diff, the real field names.
  If you have not run it, say so and ask the creator to run it, or use the vendor's
  own documented output.

Invented output is the one failure mode this whole technique can produce that boxes
never could: it *looks* authoritative. A fabricated `kubectl describe` with a field
that does not exist teaches a wrong thing very convincingly, and the viewer will
believe it over their own terminal. Never do it.

Where a value must be invented because the real one is private, use a documented
placeholder, not a plausible-looking fake:

| Kind | Use |
|---|---|
| Domains / emails | `example.com`, `example.org` (RFC 2606) |
| IPv4 | `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24` (RFC 5737) |
| AWS account id | `123456789012` |
| People | a fictional name with a CSS-drawn initials avatar |
| Tokens, keys, ARNs of real accounts | never on screen, redacted or regenerated |

Never put a real person's profile, photo or name on screen — the creator's own
included — and never a real account id, hostname, internal URL or token.

## Where the image comes from, in order of preference

### 1. Build an HTML replica and screenshot it — the default

`templates/replica.css` is the stylesheet that draws the chrome, and
`templates/example-page.html` is a worked page using it — a real `kubectl get hpa`
session above the manifest that explains it. Copy the example next to the lesson's
pages and replace the content; it is faster than starting from a blank file, and it
shows the markup conventions (`shot-size`, the inline `.ln` spans) in use.

Write the artefact as a standalone HTML page, then render it to PNG with headless
Chrome. `scripts/studio/shoot-html.mjs` does this with no new dependency:

```bash
node scripts/studio/shoot-html.mjs <curso>/assets <studio>/public/<slug>/shots
```

Every page declares its own frame: `<meta name="shot-size" content="1600x900">`.

`templates/replica.css` ships the chrome for the common artefacts — a terminal window,
a code editor, a browser frame, a console app shell, a dashboard panel — so a new
lesson is usually one short HTML file with real content pasted into it.

This wins on every axis that matters:

- **You control the content.** A lesson needs the same manifest before and after the
  fix, the same profile with a bad headline and a good one, the same dashboard
  healthy and on fire. A real screenshot gives you one state; a replica gives you
  every state from one template, differing by a line.
- **It is reproducible.** The pages are text in the repo. Fix a typo, re-shoot, re-render.
- **No licence, no likeness, no leaked data.** Nothing is copied from the product and
  nothing private is on screen.
- **It shoots at any size.** A real screenshot is stuck at the resolution it was taken,
  which decides how far you can zoom.
- **It ages well.** When the vendor reskins their console, you edit CSS instead of
  re-recording.

Make the replica honest rather than pixel-exact: the real layout, the real hierarchy,
the real colours, drawn from scratch. Nobody is fooled into thinking it is a
screenshot, and nobody needs to be — it reads as *that product* at a glance, which is
the entire job.

### 2. A screenshot the creator takes themselves

Correct when the UI is too intricate to rebuild, or when the point is precisely that
*this is what the real thing looks like today*. Ask the creator to take it. Check it
for their name, email, account id, tokens, internal hostnames and open tabs before it
goes near a frame — a 4K screenshot zoomed to 40% reveals details nobody noticed at
full view.

### 3. An image from the internet — go and find it

Two jobs, and the second is the one that gets forgotten: for what you cannot build
(a paper's own figure, a vendor's product screenshot), **and to give a long visual a
second angle** — see the next section. Searching for these is the default for a lesson,
not something to wait to be asked.

- **Prefer sources you can credit by name.** A figure from the paper that introduced the
  idea, an official docs diagram, an engineering blog's own illustration. Put the author
  and the address on screen. The Kubernetes documentation diagrams are CC BY 4.0; most
  vendor blog diagrams carry no licence, so credit them and say so in the delivery.
- **Search engines may block you.** An image search will often answer with a captcha.
  Do not try to solve it: go to the source pages directly (the paper, the docs, the
  blog) and read the image URLs off them.
- **Tell the creator what you took.** Downloading these images for the lesson is
  expected, so it is not a question per file — but the delivery message lists each one
  and where it came from, so the creator can veto any of them. Images the creator sends
  themselves are theirs to place; credit them on screen the same way.
- **Check it before it goes in a frame.** Many web images arrive cropped (a title cut off,
  half an icon), watermarked, or tiny. Crop to the clean region, and never display one
  larger than its native pixels allow.
- Never scrape a real person's profile or a real company's private console.
- **Never use the creator's own promotional art as an illustration of something else.**
  A thumbnail of one of their YouTube videos is a poster, not a picture of a product.
  When a lesson names a tool, show the tool: a screenshot of the CLI, the IDE or the
  site.

## Shooting for a zoom

A shot that will be zoomed into must be shot larger than the frame, or the zoom is a
blur. The arithmetic is one line:

```
shotWidthPx * focus.w  >=  1920
```

`focus.w` is the fraction of the page width the tightest shot fills. A page authored at
1600x900 and shot at 3x is 4800px wide; a zoom to 40% shows 1920 native pixels across a
1920px frame — exactly native. That is why `shoot-html.mjs` defaults to `SHOT_SCALE=3`.

**Author the pages at the frame's aspect ratio** (1600x900 for a 16:9 video). Then the
establishing shot fills the frame with no letterbox and no crop, and focus fractions
stay valid when the page is re-shot at another scale.

**Author at the size a human reads it at**, then zoom. A terminal at 13px with 80
columns, zoomed to 40%, is comfortably readable. A terminal authored at 40px to "make
it legible" looks like a toy and cannot be zoomed into at all.

## No single visual stays up for more than about 15 seconds

A lesson that holds one drawing, one slide or one screenshot for 25 or 30 seconds,
with nothing to do but zoom in, zoom out and ring a corner, reads as a slide with a
voice over it — **even when every shot is on a spoken word and every zoom is correct.**
The creator rated exactly such a lesson 7 out of 10 and named the cause: the visual
never changed, only its framing did.

**The rule.** Whatever the visual is — a Remotion composition, an HTML page you built,
a slide from the creator's deck, a screenshot, an image from the internet — once it has
been up for about **15 seconds** (the creator's tolerance runs from 10 to 20), the next
shot is a **different visual**, not another crop of the same one.

**What does not count as a change:** zooming, zooming out, panning, a `mark` ring, a
`callout` chip. Those are the same picture. A new picture does.

**What to do instead.** Go and find a second visual that explains the same concept a
different way and spend the last few seconds on it: 15 seconds on yours, 5 on the one
you found. Good places to look, in order:

1. the creator's own deck, if they handed one over (`references/source-material.md`);
2. a figure from the primary source — the paper, the official docs, an engineering post;
3. a real capture of the thing itself (a terminal, a CLI, a console);
4. an image the creator sent in the conversation.

Two different drawings of the *same* idea are the point — a loop drawn as a row of
boxes, then the same loop drawn as a cycle with a robot in it. Do not rebuild what you
already built; do not fill the gap with something that merely looks busy.

**Audit before rendering, not after.** Group consecutive shots that share an image into
blocks and print each block's duration; anything over about 15 seconds gets a second
visual. It is a few lines over the shot list and the `voice.<name>.json` that
`check-reveals.mjs` already reads:

```js
// blocks.mjs — node blocks.mjs <slug>
import {readFileSync} from 'node:fs';
const dir = `src/videos/${process.argv[2]}`;
const voice = JSON.parse(readFileSync(`${dir}/voice.caio.json`, 'utf8'));
const words = voice.captions.aula, total = voice.totalFrames / voice.fps;
const norm = (w) => w.toLowerCase().replace(/[.,!?;:"“”]/g, '');
const src = readFileSync(`${dir}/config.ts`, 'utf8');
const shots = [...src.matchAll(/\{img:\s*'([^']+)'(?:,\s*revealWord:\s*'([^']+)')?(?:,\s*nth:\s*(\d+))?/g)]
  .map((m) => ({img: m[1], word: m[2], nth: m[3] ? +m[3] : 1}));
const at = (s) => s.word
  ? words.filter((w) => norm(w.word) === norm(s.word))[s.nth - 1].startMs / 1000 : 0;
const blocks = []; let cur = {img: shots[0].img, start: 0, shots: 1};
shots.slice(1).forEach((s) => {
  if (s.img === cur.img) { cur.shots++; return; }
  cur.end = at(s); blocks.push(cur); cur = {img: s.img, start: at(s), shots: 1};
});
cur.end = total; blocks.push(cur);
blocks.forEach((b) => console.log(b.img.padEnd(30), (b.end - b.start).toFixed(1).padStart(6) + 's',
  String(b.shots).padStart(3), b.end - b.start > 15 ? '  <<< needs a second visual' : ''));
```

**A softer limit for the real thing.** A slide from the creator's deck, or a real
terminal capture the narration walks through line by line, can hold a little longer than
a drawing you made: the viewer is reading something real. Still look for a second angle,
but it is a judgement call, not a defect.

**This is a video fix, never an audio fix.** Adding visuals touches the shot list only.
The audio is already paid for — do not regenerate it to make room for an image.

## The shot list — pans land on words, like reveals

`templates/ShotPan.tsx` plays a list of shots, each one landing on a spoken word, the
same mechanism that stages a diagram reveal:

```ts
{img: 'plan-destroy.png', revealWord: 'destruir',
 focus: {cx: 0.40, cy: 0.52, w: 0.46},
 mark:  {x: 0.09, y: 0.49, w: 0.42, h: 0.035, color: WARN},
 callout: '-/+ destroy and then create'}
```

- `focus` is the rectangle of the page to fill the frame with, in 0..1 page fractions:
  centre and width. The height follows from the aspect ratio.
- `mark` rings a region, in the same fractions. Because the overlay lives in the
  image's own coordinate space, the ring tracks the image through the move for free.
- `callout` is a chip in frame coordinates, so it stays legible at any zoom.
  `calloutAt: 'bottom'` moves it when the top of that shot is busy — **check it against
  the mark**, because a chip that covers the very thing it labels is the easiest
  mistake here to ship.
- `endFocus` drifts slowly across the shot. Use it on an establishing shot or a closing
  pull-back. **Never drift a shot where the viewer has to read small text** — motion
  and reading do not combine.
- `nth` picks which occurrence of a repeated word to fire on. A word said twice in one
  lesson wants two different shots; without `nth`, both resolve to the first.

Shots on the **same image** pan and zoom between each other. Shots on **different
images** cross-fade. Both take 700ms, which reads as deliberate rather than nervous.

A workable grammar for one lesson: establish wide → zoom to the element as the
narration names it → cut to a second artefact that proves the claim → back to the
element, now corrected → pull back.

**One shot every 4 to 6 seconds is a healthy rhythm; a block of one image longer than
about 15 seconds is not** — see the previous section. (Earlier versions of this skill
said three to seven shots per three minutes. A lesson built that way was rated 7 out
of 10: too few changes of picture. A four-minute lesson with 59 shots across 32 blocks
of image was rated well.) More shots is not the failure it looks like, as long as each
cut is onto something new and lands on a spoken word.

## Measuring focus rectangles

Open the PNG and read the coordinates off it, then divide by the **authored page size**
— not by the shot size, so the fractions survive a change of `SHOT_SCALE`. Getting this
wrong by a few percent puts the ring beside the thing it should be ringing, and that is
only visible in a rendered frame. Check one.

## White interfaces eat captions

Most real UIs are white or light grey, and white captions vanish into them. Lay a
bottom-up scrim between the screenshot and the captions:

```
linear-gradient(to top, rgba(1,21,38,0.94) 0%, rgba(1,21,38,0.80) 7%,
                        rgba(1,21,38,0.22) 15%, rgba(1,21,38,0) 20%)
```

The brand background colour still frames the video; it is just no longer the whole
canvas. Keep the footer over the scrim, where it stays readable on any shot.
