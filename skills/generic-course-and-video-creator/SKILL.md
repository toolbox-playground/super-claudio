---
name: super-claudio:generic-course-and-video-creator
description: >
  Builds complete narrated course videos end to end: course roadmap, module and lesson
  breakdown, a natural-spoken-language script for every lesson, voiceover in the
  creator's own cloned voice via ElevenLabs (or, with no ElevenLabs account, cloned
  locally for free with OmniVoice), and a final MP4 whose visuals are
  synchronized to the narration -- realistic screenshots of the interface being taught,
  zoomed and annotated, terminal demos where the real command and the system it changes
  share the frame, mixed with technical diagrams animated in the creator's chosen
  engine: HTML by default (a camera following the narration across real images),
  Manim, Remotion or HyperFrames on request.
  Works from a bare topic ("Kubernetes avançado") or from material the creator provides
  — a PDF, a slide deck, an article, a repo — all the way to rendered lessons, one
  approved stage at a time.
  Trigger on: "cria um curso de", "monta o roadmap de um curso sobre",
  "quais os módulos de um curso de", "divide esse curso em aulas",
  "cria o roteiro das aulas de", "roteiro para a aula de",
  "cria um vídeo narrado sobre", "vídeo com minha voz clonada",
  "gera o áudio e o vídeo de", "narração com minha voz", "vídeo faceless sobre",
  "clonar minha voz de graça", "narração sem ElevenLabs",
  "create a course about", "build the roadmap for a course on",
  "write the narration script for", "clone my voice for a video".
  Also trigger when: the user gives a technology plus a level (iniciante / avançado)
  and wants teaching material produced, wants a lesson script turned into a narrated
  video, or asks for narrated content in a particular register — an e-learning course
  lesson, a conversational YouTube video, or a how-to tutorial.
  Do NOT trigger for: material a human will record themselves (use
  create-script-and-slides-for-videos), slide decks or webpages (use productivity),
  DevOps Mentoria PPTX conversion (use carreira-tech-slides), editing existing
  footage, or cinematic/realistic AI video generation.
---

# Course & Video Creator — End-to-End Course and Video Production

You take a topic and a level and produce finished lessons: a course roadmap, a module
and lesson breakdown, the exact words to be spoken, narration in the creator's cloned
voice, and an MP4 whose visuals track what the narration is saying at that second.

Read the reference for the stage you are in. Do not load them all:

| Stage | Reference |
|---|---|
| Material the creator handed over (PDF, deck, article, video) | `references/source-material.md` |
| Roadmap, modules, lesson breakdown | `references/course-architecture.md` |
| Writing the spoken script | `references/narration-script.md` |
| Generating and downloading the audio | `references/elevenlabs-voiceover.md` |
| Choosing the animation engine (HTML by default / Manim / Remotion / HyperFrames) | `references/animation-engines.md` |
| Building and rendering a lesson in the default HTML engine | `references/html-engine.md` |
| Scenes, sync, captions, rendering in Remotion | `references/video-pipeline.md` |
| The artefact a lesson shows: replicas, screenshots, zoom and pan | `references/realistic-visuals.md` |
| Free local voice when there is no ElevenLabs account (OmniVoice) | `references/open-source-alternative.md` |
| Commands that change a system (terminal + reacting diagram), or a 3D shot on request | `references/terminal-demo-and-3d.md` |

## Core Principles

1. **Audio first, always.** The narration is generated and measured before a single
   frame is designed. Every duration in the composition is derived from the real audio
   file — `durationInFrames = ceil((audioSeconds + 0.35) * FPS)`. A hand-written scene
   length desynchronizes the moment the script changes.
2. **Sync is the product, not a finish.** If the narration says "autoescalonamento" at
   2:11, the autoscaling diagram appears at 2:11. This is why the audio comes first:
   the visuals are scheduled against measured word times, not guessed.
3. **Teach directly, in natural spoken language.** For technical lessons, lead with
   the concept, capability or operation, explain how it works, and give a concrete
   example. Opening with a definition or a real command is valid. Storytelling,
   history, analogies and callbacks are optional; use them only when they clarify
   something for this audience, or when the creator requests that style. Never delay
   the technical answer to manufacture a problem or a narrative breaking point.
   Be concise without omitting the mechanism, relevant limits or evidence.
   The creator's requested register takes precedence. See `references/narration-script.md`.
4. **Level and delivery mode change everything.** A beginner course and an advanced
   course on the same technology share almost no lesson list. And the same lesson
   written for a paid course, for YouTube, or as a how-to tutorial is three different
   scripts read three different ways — decide the mode before writing a word, see
   `references/narration-script.md`.
5. **Show the real thing, then draw on it. Every course, every technology.** If what
   the lesson teaches exists on a screen, the video shows that screen — zoomed, marked
   and narrated. A Kubernetes lesson shows a terminal running `kubectl` and a real
   manifest; a Terraform lesson shows the `plan` output; a cloud lesson shows the
   console; a LinkedIn lesson shows a profile. Not a rounded rectangle standing in for
   it: the viewer has to recognise the thing when they open their own. The animation
   engine supplies the argument on top — the ring, the red-to-green comparison, the
   captions — and keeps its own shapes for what genuinely has no screen: a control
   loop, a trade-off, a summary. **When the lesson runs commands that change a system,
   show both at once with the terminal demo:** the real command typing on the left, the
   system's diagram answering its output on the right (`references/terminal-demo-and-3d.md`).
   3D (three.js) only when the creator or the script asks for it, or when the idea is
   genuinely spatial and you proposed it in the outline.
   **Replicate the frame, never fake the facts:** build the
   chrome in HTML, but the command output, manifests and error messages inside it must
   be real. **And no single visual stays up for more than about 15 seconds:** past that,
   cut to a *different* picture of the same idea — a figure from the paper, the
   creator's deck, a real capture, an image found on the web — because zooming and
   ringing the same drawing is not a change. **"Find an image on the web" for a concept
   means the image search** (Google or Bing Images: `<concept> AI agents`), picking a
   simple diagram and cropping to it — **never a screenshot of a documentation page**,
   which is a wall of small English text that stays up for three seconds and teaches
   nothing. And an image should not be a shot of its own for under about three seconds:
   put a quickly-listed set of images on one screen. See `references/realistic-visuals.md`.
6. **Choose the explanation depth for the audience.** Include the prerequisites
   needed to understand the mechanism, without forcing every lesson through a
   problem, history, mental model and implementation ladder. Experienced viewers
   can start with a definition, query, CLI or configuration. Keep narration and
   visuals on the same technical point; explain unfamiliar fields before relying
   on them. Abstraction levels are a planning aid, not mandatory narrative stages.
7. **Display text equals spoken text — with one exception: symbols.** With Eleven v4
   you send the real spelling of words; there is no phonetic respelling layer. Captions
   and reveals index the same words the model read. The same holds for the local
   OmniVoice route. (The respelling hack existed only for an older local model that
   mangled English terms — see `references/open-source-alternative.md`.) A *symbol* is
   different, because there is
   no word to read: `CLAUDE.md` and `/var/log/nginx` come out of a voice model badly.
   Spell it for the voice (`CLAUDE ponto M D`, `barra var, barra log, barra nginx`) and
   show the symbol on screen through a substitution table applied **after** alignment,
   so the timings stay exact — `scripts/studio/apply-display.mjs`. See
   `references/narration-script.md` and `references/video-pipeline.md`.
8. **One stage at a time, with the creator in the loop — and production goes module by
   module.** The ementa is approved before a script is written; a script is approved
   before audio is generated; the audio exists before a frame is designed. Then audio
   and video are produced **one module at a time**, finished lessons handed over at each
   module boundary: never the whole course's audio up front, and never audio running
   ahead of the video it was paid for. Integrity checks catch broken audio, but they do not
   judge teaching or delivery — only the creator does. Never run ahead of an approval
   to "save time": redoing twenty lessons costs far more than one question.
9. **ElevenLabs is the voice, and the creator's own voice is the point.** It is the
   first option, always. **The second option is for a creator with no ElevenLabs account
   or no wish to pay:** clone the voice locally and free with OmniVoice, using the
   recipe the creator approved by ear (`references/open-source-alternative.md`). It is
   close but not identical, and far slower — say both before they choose. Earlier local
   models (Chatterbox, Qwen3-TTS) were measured and rejected; do not offer them. Resolve
   *whose* voice, and which route, before generating anything.

## What the user controls (parse from the request)

| Parameter | Default | Notes |
|---|---|---|
| Topic | required | e.g. "Kubernetes", "Terraform", "SRE" |
| **Output shape** | **ask if ambiguous** | **a course** (many lessons, one video each) or **a single video** (one standalone piece, usually YouTube) — this changes the whole first stage |
| Source material | none | a PDF, deck, article, repo or recording the creator provides — **read it before anything else** |
| Level | ask if absent | iniciante / intermediário / avançado — changes the whole roadmap |
| Delivery mode | **e-learning** for a course | e-learning / conversational (YouTube) / how-to — changes the register and the voice settings |
| Course length | propose, then confirm | total hours; drives the module count. A course only |
| Lesson length | **1–10 min**, usually 2–4 | the teaching decides it, never a target; see `references/course-architecture.md` |
| Single-video length | **5–10 min** | a standalone video is never a one-minute clip; see `references/course-architecture.md` |
| Voice | the creator's own cloned ElevenLabs voice | **ask or look it up — never guess one**; see `references/elevenlabs-voiceover.md` |
| Voice route | **ElevenLabs** | **OmniVoice (local, free)** only when the creator has no ElevenLabs account or does not want to pay; needs a 5–10 s steady recording of their voice — see `references/open-source-alternative.md` |
| **Animation engine** | **ask — HTML when no preference** | HTML (`templates/lesson-tpage.html`) / Manim / Remotion / HyperFrames, once per course; see `references/animation-engines.md` |
| Format | 1920x1080, 30 fps | horizontal for YouTube |
| Language | pt-BR for Brazilian users | the script language, not a model setting |
| Output dir | `~/Movies/video-shorts/<curso-slug>/<aula-slug>/`, or `<video-slug>/` for a single video | ask only if the creator hints elsewhere |

## Pipeline — four stages, and the creator approves the boundaries

Nothing in a later stage begins before the earlier one is agreed. This is the shape of
the work, not a formality: a wrong ementa is a sentence to fix and a wrong course is
sixty lessons to re-record.

### Stage 0 — read what you were given

If the request arrives with a PDF, a deck, an article, a repo or a recording, **open it
before proposing anything** and report what you found. See `references/source-material.md`.

### Stage 1 — the structure  → **approval gate**

First settle **what is being made**, because it changes everything downstream: a
**course** (many lessons, one video each) or a **single video** (one standalone piece,
usually for YouTube). Ask if the request does not say. Settle the delivery mode here
too — a course defaults to e-learning, a standalone video to conversational.

**For a course: the ementa.** Modules in teaching order, and inside each module the
lesson list with, per lesson, a title, a one-line objective, a short summary of what it
covers, a target duration and **the artefact it will show**.

**For a single video: the outline.** One coherent explanation, from the concept or
operation through mechanism, examples and relevant limits, with a target duration per segment
and the artefact each one shows. Not an ementa, and never a list of one-minute clips.

Either way: present it and wait. Expect edits, additions and reordering — that is the
point of the gate. Only move on once the creator says it is final.
See `references/course-architecture.md`.

### Stage 2 — the scripts, written as a batch  → **approval gate**

Write the scripts for the approved lessons **together**, not one at a time: the creator
reads through the course as a whole and catches repetition, gaps and a concept
introduced in the wrong lesson — which only shows up when the scripts sit side by side.
Writing costs no credits, so there is no reason to drip-feed it.

Per lesson, two files: `script.md` (the plan — beats, the artefact per beat, a cited
source per factual claim) and `narration/aula.txt` (the exact words to be spoken, and
nothing else in that file).

Write natural, concise spoken explanations. In technical content, start with the
concept or operation, explain the mechanism and show a relevant example or artefact.
Respect the audience's existing knowledge. A story, analogy, callback or historical
introduction is optional, never a prerequisite for a definition or a command.
See `references/narration-script.md`.

Hand the scripts over and wait. This is the last free gate — everything after it costs
credits.

### Stages 3 and 4 run together, **one module at a time**

Stage 3 is the audio and stage 4 is the video, and they are described separately below
because they are different work. They are not *scheduled* separately.

**The production unit is the module, not the course and not the lesson.** Generate the
audio for one module, render that module's videos, hand the finished lessons over, and
only then start the next module. A course of six modules goes through this loop six
times, with the creator looking at finished lessons each time.

Two failures this prevents, and both are expensive:

- **Generating the whole course's audio up front.** If anything is wrong — the voice
  settings, the register, a term the model mangles, a factual error nobody caught — it
  is wrong in sixty lessons, and every one of them was paid for. The creator finds out
  at the first render, which is after all the money is spent.
- **Audio finished and video not.** Narration sitting in a folder is not a lesson; it
  is credits already spent on something nobody can watch. Keeping the two in step means
  the course is always some number of *finished lessons* plus some number of *not yet
  started* ones — never a pile of orphan MP3s.

Inside a module the order still holds, strictly: every lesson's audio before any of that
module's video, because the frame durations come from the measured audio. The rule is
about the batch size, not about the order.

**Stop at the module boundary and hand the work over.** That is a gate like any other in
this skill: the creator watches the finished lessons and says go, or says fix. Never
roll into the next module to keep momentum — momentum is what spends a course's budget
on something the creator would have rejected after three lessons.

A module that turns out to be very large is still one unit; if a single module would
spend more than roughly a quarter of the creator's monthly quota, say so and offer to
split it in half rather than silently running it.

### Stage 3 — the audio, in ElevenLabs (or OmniVoice). **Always before any video.**

**Ask which voice to use before generating anything** — the skill never guesses one,
and this question comes before the first lesson of every course. In the same question,
ask whether the creator has an ElevenLabs account. If not, or if they do not want to
pay, offer the local OmniVoice route and state its trade-offs: free, close to their
voice but not identical, and roughly 4–15 min of CPU per 20 s of audio on an Intel Mac.
On that route, everything below about ElevenLabs settings is replaced by
`references/open-source-alternative.md`. Choosing the reference clip, the
`scripts/omnivoice/synth.py` recipe and its transcript check all live there. The
serial order, the integrity checks and the first-lesson approval still apply.

On the ElevenLabs route, generate with the
validated settings: Eleven v4, similarity 100%, stability 75%, clone strength 10% for a
Professional Voice Clone, language Auto, MP3 44.1 kHz, no audio effects. There is no
speed or style setting in v4. First lessons
go through copy-and-paste in the web app so the creator can judge and tune; automate
only once the settings are settled. One lesson is one request — Eleven v4 takes 10,000
characters and even a 10-minute lesson is about 9,300.

**One lesson at a time, serially. Never in parallel.** Scripts are written as a batch;
audio is not. A failed or rejected generation still consumes credits, so a parallel
batch can burn a module's worth of credits on takes nobody keeps. Generate one, check
it, keep it — then the next.

Then measure: ffprobe for the real duration, and check integrity — truncation, silence
holes, clipping. A lesson that fails is regenerated, not patched.
See `references/elevenlabs-voiceover.md`.

**The audio is the hard part and the expensive part. The video is cheap and local, so
it is built on top of finished audio — never the other way round.** That is why the
order inside a module is fixed, and why the module is where it stops: see the loop
above.

### Stage 4 — the video, synchronized to that audio

**The engine was chosen at the first render gate**: HTML unless the creator picked
Manim, Remotion or HyperFrames (`references/animation-engines.md`). The HTML engine
needs only Node 22+, Chrome and ffmpeg (`references/html-engine.md`). **On a machine
that has never rendered one of the others, set it up first**:
- Manim: a venv with Manim;
- Remotion: the studio at `~/Movies/video-shorts/studio` (`references/video-pipeline.md`);
- HyperFrames: its CLI.

No engine needs Docker.

1. **Alignment** — derive word timings. The API's `with-timestamps` gives exact
   character times; from a web-app download, `scripts/studio/align-wav.mjs` estimates
   them. With no audio yet, `scripts/studio/draft-timing.mjs` estimates them from the
   script alone, so a layout can be built and reviewed before any credits are spent —
   a draft, never a deliverable. Either way the output is `voice.<name>.json`.
2. **Artefacts** — build what the lesson shows, before the composition. Research the
   real thing, then build an HTML replica on `templates/replica.css` and shoot it with
   `scripts/studio/shoot-html.mjs`. See `references/realistic-visuals.md`. For commands
   that change a system, build a terminal demo (`references/terminal-demo-and-3d.md`):
   in the HTML engine it is a scene of the lesson page (`terminal()` in
   `templates/lesson-tpage.html`); in the other engines it is a clip from
   `templates/terminal-demo.html` rendered with `scripts/studio/render-tpage.mjs --voice`.
3. **Scene plan** — give every shot, node and panel a word it lands on, so it appears
   exactly when the narration names it: `at('palavra', n)` in the HTML engine,
   `revealWord` in Remotion. In the HTML engine, also give every real image the camera
   keys that take it to each part the narration names. Before the full render, check
   one still per scene (`render-tpage.mjs --still`).
4. **Render** — the chosen engine renders only scenes that have measured audio;
   per-engine commands and sync mechanics are in `references/animation-engines.md`.
5. **Audit the blocks, verify and deliver** — before rendering, measure how long each
   image stays up and give any block over ~15 seconds a second visual
   (`references/realistic-visuals.md`), and check that no image is up for under ~3 seconds
   and that no concept is illustrated by a screenshot of a documentation page. After rendering, extract frames at several
   timestamps and *look at them*, confirm the MP4 carries an audio stream of the
   expected duration, then send it.

## Routing

- The creator handed over a PDF, deck, article, repo or recording → read it first,
  `references/source-material.md`
- Roadmap scope, level differences, module ordering → `references/course-architecture.md`
- Delivery mode, register, direct technical explanations, optional analogies, the verbosity
  dial, natural phrasing, pacing, character budget → `references/narration-script.md`
- Voice settings per mode, model limits, audio tags, what the recording script does to
  the clone, whose voice to use, and how to connect (web app / hosted MCP / REST API)
  → `references/elevenlabs-voiceover.md`
- Which engine renders the lesson, per-engine setup, sync and trade-offs
  → `references/animation-engines.md`
- The default HTML engine: the lesson template, the kit (`at`, `camera`, `terminal`,
  `ring`), stills, parallel render with `--workers` → `references/html-engine.md`
- Remotion scenes, `revealWord`, captions, alignment, render debugging → `references/video-pipeline.md`
- Which artefact a lesson shows, HTML replicas (`templates/replica.css`), zoom/pan
  shot lists, image sourcing and licensing → `references/realistic-visuals.md`
- Commands that change a system (`kubectl`, `terraform`, `docker`...) → the terminal demo;
  a 3D picture (asked for, or genuinely spatial and approved in the outline) → three.js on
  a t-page; a hero shot chased against a target image → the target-image loop. All in
  `references/terminal-demo-and-3d.md`, self-contained: no third-party skill needed
- The user wants a *human-recorded* video → stop and use `create-script-and-slides-for-videos`
- No ElevenLabs account, or the user asks for a free/offline voice → OmniVoice, local,
  `references/open-source-alternative.md` (setup, reference clip, approved recipe,
  measured trade-offs, and why Chatterbox and Qwen3-TTS were rejected)

## Honest limits

State these before the user discovers them:

- **The best cloned voice is still the paid one.** ElevenLabs with the creator's own
  cloned voice is the first option. Say at the start that it needs an account, not
  after the ementa is approved. Never create the account, buy the plan or clone the
  voice for them.
- **The free local route is close, not identical, and slow.** OmniVoice reached 0.946
  similarity against a 0.972 real-voice ceiling, and the creator approved it by ear.
  It costs roughly 4–15 min of CPU per 20 s of audio on an Intel Mac. It depends
  entirely on a steady 5–10 s reference clip. See
  `references/open-source-alternative.md`.
- **Visual sync is only as good as the word timings.** Estimated alignment from a
  downloaded MP3 drifts on long pauses; the API's character timestamps do not. If the
  creator cares about tight sync, move to the API.
- **One lesson at a time, until the first one is approved.** Script register and voice
  settings are taste calls. Producing a whole module before the creator hears one lesson
  risks redoing all of it.
- **A replica is only as honest as its content.** The chrome is drawn; the command
  output, manifests and error messages inside it must be real. Invented output is the
  one failure this pipeline can produce that looks authoritative while being wrong.
