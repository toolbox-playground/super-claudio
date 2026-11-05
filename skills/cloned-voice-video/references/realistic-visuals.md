# Realistic Visuals — screenshots, replicas and when boxes are not enough

A lesson about a real interface has to show that interface. If the lesson is about the
LinkedIn headline, the viewer must see a LinkedIn profile and recognise it the moment
they open their own. A rounded rectangle labelled "headline" teaches the concept and
teaches nothing about where to click.

**The rule: if the thing being taught exists on a screen somewhere, show that screen.
Animate on top of it. Keep Remotion's own shapes for what has no screen.**

This is a mix, not a replacement. Remotion draws the argument — the ring, the arrow, the
red-to-green comparison, the word-by-word captions. The screenshot supplies the thing
the argument is about.

| The beat is about | Use |
|---|---|
| a product's UI (LinkedIn, a cloud console, an IDE, a dashboard) | a screenshot, zoomed and marked |
| a real architecture or topology | a real diagram image, panned across while narrated |
| a command and its output | a terminal replica, screenshot or typed on in Remotion |
| a concept with no screen (a control loop, a trade-off, a comparison) | Remotion shapes — a screenshot would be decoration |
| a list of points, a definition, a summary | Remotion text, as before |

A lesson that is *all* screenshots is as flat as one that is all boxes. Alternate.

## Where the image comes from, in order of preference

### 1. Build an HTML replica and screenshot it — the default

Write the interface as a standalone HTML page, then render it to PNG with headless
Chrome. `scripts/studio/shoot-html.mjs` does this with no new dependency:

```bash
node scripts/studio/shoot-html.mjs <curso>/assets <studio>/public/<slug>/shots
```

Every page declares its own frame: `<meta name="shot-size" content="1600x900">`.

This wins on every axis that matters:

- **You control the content.** The lesson needs the same profile with a bad headline and
  a good one. A real screenshot gives you one; a replica gives you both from one
  template, differing by one line.
- **It is reproducible.** The pages are text in the repo. Re-shoot at any resolution,
  fix a typo, re-render.
- **No licence, no likeness, no personal data.** Nothing is copied from the product and
  nobody real is on screen.
- **It shoots at any size.** A real screenshot is stuck at the resolution it was taken.

Make the replica honest rather than pixel-exact: the real layout, the real hierarchy,
the real colours, drawn from scratch. Use a **fictional person** — a name, a CSS-drawn
initials avatar, invented but plausible data. Never put a real person's profile, photo
or name on screen, your own included.

### 2. A screenshot the creator takes themselves

Correct when the UI is too intricate to rebuild, or when the point is precisely that
*this is what the real thing looks like today*. Ask the creator to take it. Check it for
their own name, email, account id, tokens and open tabs before it goes anywhere near a
frame — a 4K screenshot zoomed to 40% reveals details nobody noticed at full view.

### 3. An image from the internet — last resort

Only with a licence that permits reuse, and attributed on screen. The Kubernetes
documentation diagrams are CC BY 4.0, which is usable with credit; most vendor blog
diagrams are not. Downloading a file is an action to ask the creator about first, not
to assume. Never scrape a real person's profile or a real company's private console.

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

## The shot list — pans land on words, like reveals

`scenes/ShotPan.tsx` plays a list of shots, each one landing on a spoken word, the same
mechanism that stages a diagram reveal:

```ts
{img: 'perfil-1-padrao.png', revealWord: 'padrão',
 focus: {cx: 0.353, cy: 0.456, w: 0.42},
 mark:  {x: 0.158, y: 0.447, w: 0.100, h: 0.031, color: WARN},
 callout: 'o padrão: seu cargo atual'}
```

- `focus` is the rectangle of the page to fill the frame with, in 0..1 page fractions:
  centre and width. The height follows from the aspect ratio.
- `mark` rings a region, in the same fractions. Because the overlay lives in the image's
  own coordinate space, the ring tracks the image through the move for free.
- `callout` is a chip in frame coordinates, so it stays legible at any zoom.
- `endFocus` drifts slowly across the shot. Use it on an establishing shot or a closing
  pull-back. **Never drift a shot where the viewer has to read small text** — motion and
  reading do not combine.
- `nth` picks which occurrence of a repeated word to fire on. "recrutador" said twice in
  one lesson wants two different shots; without `nth` both resolve to the first.

Shots on the **same image** pan and zoom between each other. Shots on **different
images** cross-fade. Both take 700ms, which reads as deliberate rather than nervous.

A workable grammar for one lesson: establish wide → zoom to the element as the narration
names it → cut to a second artefact that proves the claim → back to the element, now
corrected → pull back.

## Measuring focus rectangles

Open the PNG and read the coordinates off it, then divide by the authored page size —
not by the shot size, so the fractions survive a change of `SHOT_SCALE`. Getting this
wrong by a few percent puts the ring beside the thing it should be ringing, and that is
only visible in a rendered frame. Check one.

## White interfaces eat captions

Most real UIs are white or light grey, and white captions vanish into them. Lay a
bottom-up scrim between the screenshot and the captions:

```
linear-gradient(to top, rgba(1,21,38,0.92) 0%, rgba(1,21,38,0.72) 11%, rgba(1,21,38,0) 24%)
```

The brand background colour still frames the video; it is just no longer the whole
canvas. Keep the footer over the scrim, where it stays readable on any shot.
