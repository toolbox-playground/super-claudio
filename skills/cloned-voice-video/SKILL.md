---
name: super-claudio:cloned-voice-video
description: >
  Produces complete narrated educational videos end to end — script, cloned-voice
  voiceover, real architecture diagrams animated in Remotion, word-by-word captions
  timed to the narration, and a final MP4. The AI generates everything; nobody records.
  Built for course theory segments (DevOps, SRE, Kubernetes, Terraform, cloud) in
  horizontal YouTube format, 1–10 minutes.
  Trigger on: "cria um vídeo narrado sobre", "vídeo com minha voz clonada",
  "vídeo canal dark sobre", "clonar minha voz para vídeo", "vídeo de aula sobre",
  "gera o áudio e o vídeo de", "narração com minha voz", "vídeo faceless sobre",
  "create a narrated video about", "clone my voice for a video",
  "faceless video about", "generate narration and video for".
  Also trigger when: the user wants a video whose narration is synthesized rather than
  recorded, or asks to turn course material into a narrated video.
  Do NOT trigger for: material a human will record themselves (use
  video-script-and-slides), slide decks or webpages (use productivity),
  editing existing footage, or cinematic/realistic AI video generation.
---

# Cloned Voice Video — AI-Narrated Educational Videos

You produce a finished MP4: written script, synthesized narration in the user's own
cloned voice, programmatic visuals with real technical diagrams, captions synchronized
word by word, and reveals timed to the narration. Nothing is filmed.

Read `references/voice-cloning.md` before touching audio and
`references/video-pipeline.md` before touching visuals. Both carry measured numbers
from a production run — use them instead of guessing.

## Core Principles

1. **Audio drives the video.** Never hardcode a scene duration. Synthesize the
   narration first, measure each file with ffprobe, and derive
   `durationInFrames = ceil((audioSeconds + 0.35) * FPS)`. A scene whose duration was
   written by hand will desynchronize the moment the narration changes.
2. **Spoken text and displayed text are different layers.** The TTS model reads
   phonetically respelled text ("Êi-pi-ái sârver"); captions show the real spelling
   ("API server"). Word counts must match exactly or the alignment breaks.
3. **Diagrams are real.** A Kubernetes video shows the actual control plane and nodes,
   not generic shapes. Technical accuracy is the product.
4. **Measure before claiming.** Every generated audio file is checked for silence
   holes, truncation and clipping before it reaches the user. A metric can reward a
   defect — see the "metrics that misled" section in `references/voice-cloning.md`.
5. **The user's ear decides.** Integrity checks catch broken audio; they do not judge
   accent, pacing or clarity. Send samples and ask what specifically sounds wrong.

## What the user controls (parse from the request)

| Parameter | Default | Notes |
|---|---|---|
| Topic | required | drives the script and the diagram |
| Duration | 2 min | ~140 spoken words per minute |
| Format | 1920x1080 | horizontal for YouTube; 1080x1920 for Reels/Shorts |
| Voice | cloned from the user's reference clip | falls back to a stock voice — see routing |
| Language | language of the request | pt-BR assumed for Brazilian users |
| Output dir | `~/Movies/video-shorts/<slug>/` | ask only if the user hints elsewhere |

## Pipeline (always in this order)

1. **Script** — `script.md` with one block per scene, the visual type for each, and a
   cited source for every factual claim. Then `narration/sNN.txt`, the display text.
2. **Phonetic layer** — run `scripts/studio/respell.mjs` to produce
   `narration-tts/sNN.txt`. It aborts if a substitution changes the word count.
3. **Reference clip** — cut 20–30s of the user's own speech. Selection is measured,
   not eyeballed: see "choosing the reference clip" in `references/voice-cloning.md`.
   Peak must stay under −3 dBFS or the model degenerates.
4. **Synthesis** — run the Docker image over `narration-tts/`. Budget ~16x realtime
   per core-starved CPU run; check the resource table before promising a deadline.
5. **Integrity check** — duration, words/second, silence holes, truncation, peak.
   Never deliver audio that fails these; diagnose instead.
6. **Alignment** — `scripts/studio/align-wav.mjs` derives word timings from the audio,
   then `build-voice.mjs` writes `voice.<name>.json` with durations and captions.
7. **Render** — Remotion renders only the scenes that have measured audio, so a single
   scene can be previewed before committing to the full video.
8. **Verify + deliver** — extract frames at several timestamps and confirm the visuals,
   confirm the MP4 carries an audio stream, then send the file.

## Routing

- Voice work, model choice, parameters, accent problems, reference-clip selection,
  resource requirements → `references/voice-cloning.md`
- Scene definitions, diagram components, captions, alignment, rendering, debugging a
  broken frame → `references/video-pipeline.md`
- The user wants a *human-recorded* video → stop and use `video-script-and-slides`
- The user wants a stock voice instead of their own → say so plainly; cloning and a
  neutral accent are in tension, and `references/voice-cloning.md` explains why

## Honest limits

State these up front rather than letting the user discover them after hours of waiting:

- **Local open-source cloning reproduces the speaker's accent, including regional
  traits.** It cannot be asked for a "neutral" accent — the accent is part of what is
  cloned. A carioca reference produces carioca-or-worse output.
- **Hardware buys speed, not quality.** A bigger machine shortens a 40-minute scene to
  a few minutes; it does not change how the model sounds.
- **The free route has a quality ceiling.** When voice fidelity is the blocker rather
  than throughput, a paid cloning service is the honest recommendation. Say it instead
  of burning days on parameters.
