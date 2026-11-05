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
| Architecture, trade-offs, mental models | **nothing** — this is where Remotion's own shapes belong |

A lesson that is *all* screenshots is as flat as one that is all boxes. The rhythm is:
artefact for what exists, shapes for what does not, alternating.

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

### 3. An image from the internet — last resort

Only with a licence that permits reuse, and attributed on screen. The Kubernetes
documentation diagrams are CC BY 4.0, usable with credit; most vendor blog diagrams
are not. Downloading a file is an action to ask the creator about first, not to
assume. Never scrape a real person's profile or a real company's private console.

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

**Three to seven shots in a 3-minute lesson.** Fewer and it is a static image with a
voice over it; more and it is a slideshow nobody can follow.

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
