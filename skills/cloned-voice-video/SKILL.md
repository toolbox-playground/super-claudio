---
name: super-claudio:cloned-voice-video
description: >
  Builds complete narrated course videos end to end: course roadmap, module and lesson
  breakdown, a natural-spoken-language script for every lesson, voiceover in the
  creator's own cloned voice via ElevenLabs, and a final MP4 whose visuals are
  synchronized to the narration -- realistic screenshots of the interface being taught,
  zoomed and annotated, mixed with technical diagrams animated in Remotion.
  Works from a bare topic ("Kubernetes avançado") or from material the creator provides
  — a PDF, a slide deck, an article, a repo — all the way to rendered lessons, one
  approved stage at a time.
  Trigger on: "cria um curso de", "monta o roadmap de um curso sobre",
  "quais os módulos de um curso de", "divide esse curso em aulas",
  "cria o roteiro das aulas de", "roteiro para a aula de",
  "cria um vídeo narrado sobre", "vídeo com minha voz clonada",
  "gera o áudio e o vídeo de", "narração com minha voz", "vídeo faceless sobre",
  "create a course about", "build the roadmap for a course on",
  "write the narration script for", "clone my voice for a video".
  Also trigger when: the user gives a technology plus a level (iniciante / avançado)
  and wants teaching material produced, wants a lesson script turned into a narrated
  video, or asks for narrated content in a particular register — an e-learning course
  lesson, a conversational YouTube video, or a how-to tutorial.
  Do NOT trigger for: material a human will record themselves (use
  video-script-and-slides), slide decks or webpages (use productivity),
  DevOps Mentoria PPTX conversion (use carreira-tech-slides), editing existing
  footage, or cinematic/realistic AI video generation.
---

# Cloned Voice Video — AI-Narrated Course Production

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
| Scenes, sync, captions, rendering | `references/video-pipeline.md` |
| The artefact a lesson shows: replicas, screenshots, zoom and pan | `references/realistic-visuals.md` |
| Why not a free local model | `references/open-source-alternative.md` |

## Core Principles

1. **Audio first, always.** The narration is generated and measured before a single
   frame is designed. Every duration in the composition is derived from the real audio
   file — `durationInFrames = ceil((audioSeconds + 0.35) * FPS)`. A hand-written scene
   length desynchronizes the moment the script changes.
2. **Sync is the product, not a finish.** If the narration says "autoescalonamento" at
   2:11, the autoscaling diagram appears at 2:11. This is why the audio comes first:
   the visuals are scheduled against measured word times, not guessed.
3. **The script is spoken language, and it teaches.** It is what a teacher says out
   loud, contractions and asides included — never a document read aloud. And a teacher
   does not open with a definition: they open with the problem the thing exists to
   solve, walk the viewer to the breaking point, and let the definition arrive as the
   answer. Storytelling for an introduction, a one-sentence callback for everything
   built on it, an analogy when the concept is genuinely hard — and verbosity held at
   1–3 on a 0–5 dial. Clear and objective, but explanatory: never a concept dropped in
   ten seconds, never the same idea said three ways. See
   `references/narration-script.md`.
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
   it: the viewer has to recognise the thing when they open their own. Remotion
   supplies the argument on top — the ring, the red-to-green comparison, the captions —
   and keeps its own shapes for what genuinely has no screen: a control loop, a
   trade-off, a summary. **Replicate the frame, never fake the facts:** build the
   chrome in HTML, but the command output, manifests and error messages inside it must
   be real. **And no single visual stays up for more than about 15 seconds:** past that,
   cut to a *different* picture of the same idea — a figure from the paper, the
   creator's deck, a real capture, an image found on the web — because zooming and
   ringing the same drawing is not a change. See `references/realistic-visuals.md`.
6. **Explain from the top down, one level at a time.** Every theme, technology,
   mechanism or concept is presented at the highest useful level of abstraction first —
   the problem, then the mental model, with a visual or an example holding it up — and
   only then descends: the parts and how they relate, then the real world, then the
   command or the YAML that declares it. One rung at a time, never skipping, and the
   script and the visuals descend together: the narration drops a level and the camera
   drops with it, from the whole architecture to a close-up of one box to the terminal.
   Starting at the bottom — a command, a field, a flag — is the fastest way to make a
   correct video that teaches nobody, and never leaving the top is the other half of the
   same failure: a concept lesson ends lower than it started, and climbs back up only
   once, at the close. The ladder is in `references/narration-script.md`; the artefact
   that belongs on each rung is in `references/realistic-visuals.md`.
7. **Display text equals spoken text.** With Eleven v4 you send the real spelling;
   there is no phonetic respelling layer. Captions and reveals index the same words
   the model read. (The respelling hack existed only for a local model that mangled
   English terms — see `references/open-source-alternative.md`.)
8. **One stage at a time, with the creator in the loop.** The ementa is approved before
   a script is written; a script is approved before audio is generated; the audio exists
   before a frame is designed. Integrity checks catch broken audio, but they do not
   judge teaching or delivery — only the creator does. Never run ahead of an approval
   to "save time": redoing twenty lessons costs far more than one question.
9. **ElevenLabs is the voice, and the creator's own voice is the point.** There is no
   engine choice to offer. The local open-source route was measured and abandoned —
   `references/open-source-alternative.md` records why, and exists only so the question
   is not re-opened. Resolve *whose* voice before generating anything.

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

**For a single video: the outline.** One arc, start to finish — the hook, the problem,
the body in its segments, the payoff, the close — with a target duration per segment
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

Write them as a teacher would: open a concept with the problem it solves rather than
its definition, **descend the abstraction ladder one rung at a time** — mental model,
parts, real world, declaration — call back to what earlier lessons established, use an
analogy when a concept is genuinely hard, and keep verbosity at 1–3 on the 0–5 dial.
See `references/narration-script.md`.

Hand the scripts over and wait. This is the last free gate — everything after it costs
credits.

### Stage 3 — the audio, in ElevenLabs. **Always before any video.**

**Ask which voice to use before generating anything** — the skill never guesses one,
and this question comes before the first lesson of every course. Then generate with the
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
it is built on top of finished audio — never the other way round.**

### Stage 4 — the video, synchronized to that audio

**On a machine that has never rendered one of these, build the studio first** — one
Remotion project at `~/Movies/video-shorts/studio`, reused by every course. The exact
dependencies, files and the one command that proves it works are in
`references/video-pipeline.md`. Node, ffmpeg and Chrome, no Docker.

1. **Alignment** — derive word timings. The API's `with-timestamps` gives exact
   character times; from a web-app download, `scripts/studio/align-wav.mjs` estimates
   them. With no audio yet, `scripts/studio/draft-timing.mjs` estimates them from the
   script alone, so a layout can be built and reviewed before any credits are spent —
   a draft, never a deliverable. Either way the output is `voice.<name>.json`.
2. **Artefacts** — build what the lesson shows, before the composition. Research the
   real thing, then build an HTML replica on `templates/replica.css` and shoot it with
   `scripts/studio/shoot-html.mjs`. See `references/realistic-visuals.md`.
3. **Scene plan** — give every shot, node and panel a `revealWord`, so it lands exactly
   when the narration names it.
4. **Render** — Remotion renders only scenes that have measured audio.
5. **Audit the blocks, verify and deliver** — before rendering, measure how long each
   image stays up and give any block over ~15 seconds a second visual
   (`references/realistic-visuals.md`). After rendering, extract frames at several
   timestamps and *look at them*, confirm the MP4 carries an audio stream of the
   expected duration, then send it.

## Routing

- The creator handed over a PDF, deck, article, repo or recording → read it first,
  `references/source-material.md`
- Roadmap scope, level differences, module ordering → `references/course-architecture.md`
- Delivery mode, register, the storytelling arc, callbacks, analogies, the verbosity
  dial, natural phrasing, pacing, character budget → `references/narration-script.md`
- Voice settings per mode, model limits, audio tags, what the recording script does to
  the clone, whose voice to use, and how to connect (web app / hosted MCP / REST API)
  → `references/elevenlabs-voiceover.md`
- Scenes, `revealWord`, captions, alignment, render debugging → `references/video-pipeline.md`
- Which artefact a lesson shows, HTML replicas (`templates/replica.css`), zoom/pan
  shot lists, image sourcing and licensing → `references/realistic-visuals.md`
- The user wants a *human-recorded* video → stop and use `video-script-and-slides`
- The user asks for a free/offline voice → `references/open-source-alternative.md`
  carries the measured reasons that route was abandoned

## Honest limits

State these before the user discovers them:

- **A cloned voice needs a paid service to sound like the person.** This was measured,
  not assumed: see `references/open-source-alternative.md`. There is no free route that
  preserves identity, and offering one wastes the creator's day.
- **The creator needs an ElevenLabs account and their own cloned voice.** Say this at
  the start, not after the ementa is approved. Never create the account, buy the plan
  or clone the voice for them.
- **Visual sync is only as good as the word timings.** Estimated alignment from a
  downloaded MP3 drifts on long pauses; the API's character timestamps do not. If the
  creator cares about tight sync, move to the API.
- **One lesson at a time, until the first one is approved.** Script register and voice
  settings are taste calls. Producing a whole module before the creator hears one lesson
  risks redoing all of it.
- **A replica is only as honest as its content.** The chrome is drawn; the command
  output, manifests and error messages inside it must be real. Invented output is the
  one failure this pipeline can produce that looks authoritative while being wrong.
