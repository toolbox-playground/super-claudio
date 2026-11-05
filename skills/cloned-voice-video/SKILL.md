---
name: super-claudio:cloned-voice-video
description: >
  Builds complete narrated course videos end to end: course roadmap, module and lesson
  breakdown, a natural-spoken-language script for every lesson, voiceover in the
  creator's own cloned voice via ElevenLabs, real technical diagrams animated in
  Remotion, and a final MP4 whose visuals are synchronized to the narration.
  Works from a bare topic ("Kubernetes avançado") all the way to rendered lessons.
  Trigger on: "cria um curso de", "monta o roadmap de um curso sobre",
  "quais os módulos de um curso de", "divide esse curso em aulas",
  "cria o roteiro das aulas de", "roteiro para a aula de",
  "cria um vídeo narrado sobre", "vídeo com minha voz clonada",
  "gera o áudio e o vídeo de", "narração com minha voz", "vídeo faceless sobre",
  "create a course about", "build the roadmap for a course on",
  "write the narration script for", "clone my voice for a video".
  Also trigger when: the user gives a technology plus a level (iniciante / avançado)
  and wants teaching material produced, or wants a lesson script turned into a
  narrated video.
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
| Roadmap, modules, lesson breakdown | `references/course-architecture.md` |
| Writing the spoken script | `references/narration-script.md` |
| Generating and downloading the audio | `references/elevenlabs-voiceover.md` |
| Scenes, sync, captions, rendering | `references/video-pipeline.md` |
| Why not a free local model | `references/open-source-alternative.md` |

## Core Principles

1. **Audio first, always.** The narration is generated and measured before a single
   frame is designed. Every duration in the composition is derived from the real audio
   file — `durationInFrames = ceil((audioSeconds + 0.35) * FPS)`. A hand-written scene
   length desynchronizes the moment the script changes.
2. **Sync is the product, not a finish.** If the narration says "autoescalonamento" at
   2:11, the autoscaling diagram appears at 2:11. This is why the audio comes first:
   the visuals are scheduled against measured word times, not guessed.
3. **The script is spoken language, not written prose.** It is what a teacher says out
   loud, contractions and asides included — never a document read aloud.
4. **Level changes everything.** A beginner course and an advanced course on the same
   technology share almost no lesson list. An advanced course opens with a recap module
   and then goes where a beginner course never does.
5. **Diagrams are real.** A Kubernetes lesson shows the actual control plane, the real
   HPA loop, the real Helm release flow — not generic shapes. Technical accuracy is
   the product.
6. **Display text equals spoken text.** With Eleven v4 you send the real spelling;
   there is no phonetic respelling layer. Captions and reveals index the same words
   the model read. (The respelling hack existed only for a local model that mangled
   English terms — see `references/open-source-alternative.md`.)
7. **The creator's ear decides.** Integrity checks catch broken audio; they do not
   judge delivery. Send the first lesson's audio and ask before producing twenty more.

## What the user controls (parse from the request)

| Parameter | Default | Notes |
|---|---|---|
| Topic | required | e.g. "Kubernetes", "Terraform", "SRE" |
| Level | ask if absent | iniciante / intermediário / avançado — changes the whole roadmap |
| Course length | propose, then confirm | total hours; drives the module count |
| Lesson length | **2–5 min** | shorter fragments the course; longer loses attention |
| Voice | the user's cloned ElevenLabs voice | see `references/elevenlabs-voiceover.md` |
| Format | 1920x1080, 30 fps | horizontal for YouTube |
| Language | pt-BR for Brazilian users | the script language, not a model setting |
| Output dir | `~/Movies/video-shorts/<curso-slug>/<aula-slug>/` | ask only if the user hints elsewhere |

## Pipeline (always in this order)

1. **Course architecture** — from topic + level, produce the roadmap: modules in
   teaching order, and inside each module the lesson list with a one-line objective
   and a target duration per lesson. Get this approved before writing any script;
   it is cheap to change here and expensive to change later.
2. **Lesson script** — for one lesson, write `script.md` (the plan, with a cited source
   for every factual claim) and `narration/aula.txt` (the exact words to be spoken,
   in natural spoken register). Mark the **beats**: which sentence introduces which
   visual. Those beats become the scene boundaries.
3. **Voiceover** — send the narration text to ElevenLabs with the validated settings
   and download the MP3. First lessons go through copy-and-paste in the web app so the
   user can judge and tune; automate with the API or MCP only once the settings are
   settled. One lesson fits in one request: Eleven v4 takes 10,000 characters and a
   5-minute lesson is about 6,000.
4. **Measure** — ffprobe the MP3 for its real duration, then check integrity: silence
   holes, truncation mid-sentence, clipping. Never build a video on audio that fails
   these; regenerate instead.
5. **Alignment** — derive word timings. With the API's `with-timestamps` endpoint you
   get real character-level times; from a web-app download, `scripts/studio/align-wav.mjs`
   estimates them from the audio. Either way the output is `voice.<name>.json` with
   per-scene durations and per-word times.
6. **Scene plan** — map the script's beats onto scenes and give each diagram node a
   `revealWord`, so a box appears exactly when the narration names it.
7. **Render** — Remotion renders only scenes that have measured audio, so one lesson
   can be previewed before the whole module is committed.
8. **Verify and deliver** — extract frames at several timestamps and look at them,
   confirm the MP4 carries an audio stream of the expected duration, then send it.

## Routing

- Roadmap scope, level differences, module ordering → `references/course-architecture.md`
- Register, natural-language phrasing, pacing, character budget → `references/narration-script.md`
- Voice settings, model limits, audio tags, copy-paste vs API vs MCP → `references/elevenlabs-voiceover.md`
- Scenes, `revealWord`, captions, alignment, render debugging → `references/video-pipeline.md`
- The user wants a *human-recorded* video → stop and use `video-script-and-slides`
- The user asks for a free/offline voice → `references/open-source-alternative.md`
  carries the measured reasons that route was abandoned

## Honest limits

State these before the user discovers them:

- **A cloned voice needs a paid service to sound like the person.** This was measured,
  not assumed: see `references/open-source-alternative.md`.
- **Visual sync is only as good as the word timings.** Estimated alignment from a
  downloaded MP3 drifts on long pauses; the API's character timestamps do not. If the
  user cares about tight sync, move to the API.
- **One lesson at a time, until the first one is approved.** Script register and voice
  settings are taste calls. Producing a whole module before the user hears one lesson
  risks redoing all of it.
