# Local Voice — OmniVoice, the Second Option

**ElevenLabs stays the first choice** (`references/elevenlabs-voiceover.md`). This file
covers the second option: **for a creator who has no ElevenLabs account, or does not
want to pay for one.** The voice is cloned and generated on their own machine for
free, with OmniVoice. The creator approved this route by ear in November 2026, after
earlier local models had failed (history at the end).

Offer it inside the voice question at the start of Stage 3: "Você tem conta na
ElevenLabs com a sua voz clonada? Se não tiver ou não quiser pagar, dá para clonar
localmente e de graça com o OmniVoice. Fica um pouco abaixo da ElevenLabs e é bem mais
lento." Never pick this route silently. The creator chooses.

## What it is

| Piece | What it does | License |
|---|---|---|
| **OmniVoice** ([k2-fsa/OmniVoice](https://github.com/k2-fsa/OmniVoice)) | Zero-shot text-to-speech. It is a diffusion language model on a Qwen3-0.6B backbone. It clones a voice from a 3–10 s clip, supports 600+ languages including pt-BR, and outputs 24 kHz audio. The weights are ~3.5 GB on Hugging Face. | Apache-2.0, so commercial use is fine |
| **faster-whisper** (`small`, int8) | Transcribes the reference clip (OmniVoice needs its exact words) and checks every generated take. | MIT |
| **PyTorch 2.6 CPU** in Docker (`python:3.11-slim`) | Runtime on machines without a usable GPU. | — |
| **VoiceStudio** ([debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio)) | Desktop app built on OmniVoice. It is a GUI alternative on Apple Silicon, Windows and Linux. On an Intel Mac it only runs as a UI for a remote backend. Its official Docker image (~6 GB compressed) did not fit Docker Desktop's default disk. | AGPL-3.0 |

The skill uses OmniVoice directly through `scripts/omnivoice/`. The creator gets the
same engine without the app.

**No "Open Higgsfield" for video.** Despite the name, Open-Generative-AI ("Open
Higgsfield") is a UI over the paid MuAPI. Its local video engine (Wan2GP) needs an
NVIDIA or AMD GPU. Video in this skill stays with the animation engines in
`references/animation-engines.md`.

## Say these up front

- **It is slower, much slower.** On an Intel i7 Mac, with Docker Desktop limited to
  2 CPUs, 20 s of audio took **4–15 min**. That makes a 3-minute lesson roughly
  **35 min to 2 h+**. The speed depends on how busy the machine is, not on the settings.
  Raising Docker Desktop's CPUs (Settings → Resources) helps. On Apple Silicon (`mps`)
  or an NVIDIA GPU (`cuda`) it should be far faster, but that was not measured here.
- **It is close to the creator's voice, not identical.** Similarity was 0.946 against
  a ceiling of 0.972, which is the score two real recordings of the creator get against
  each other. The creator's own verdict was that it sounds good. ElevenLabs with a
  Professional Voice Clone remains the reference.
- **There are no character timestamps.** Alignment uses `scripts/studio/align-wav.mjs`,
  the same estimate used for ElevenLabs web-app downloads. It drifts on long pauses.
- **It is free and private after the first download.** No account, no credits, no
  quota, and nothing leaves the machine. A rejected take costs time, not money.

## Setup

**Intel Mac, or any machine without a GPU: Docker.**

```bash
cd <skill>/scripts/omnivoice && docker build -t omnivoice:local .
```

The image is ~2.7 GB. Docker Desktop needs ~7 GB free on its virtual disk for the image
plus the model.

**Apple Silicon or NVIDIA: native.**

```bash
python3 -m venv .venv && .venv/bin/pip install omnivoice faster-whisper
```

Pass `--device mps` or `--device cuda` to the script. This path was not tested on the
creator's machine; check the first take before trusting it.

## The reference clip decides everything

The reference passes **the timbre and the rhythm** to every lesson. The parameters
matter far less than the clip.

- **5–10 s of the creator's real voice, in the lesson's language.** OmniVoice degrades
  with longer clips. Feeding it more audio does not "train" it.
- **A steady reading pace.** The model copies the pace. A clip where the creator speeds
  through one phrase and drags another ("gratuito para vocês…") produced lessons that
  sped up and slowed down mid-sentence. A clip read at an even pace produced steady
  narration.
- **One complete sentence, cut at word boundaries, with no hesitations or stretched
  words.** Transcribe the long recording with word timestamps (faster-whisper,
  `word_timestamps=True`), find an even 5–10 s run, and cut there.
- **The creator's normal microphone.** A dull, band-limited recording gives a dull clone,
  "com ovo na boca".
- **Peak below −3 dBFS, plain gain only.** No `loudnorm`, no limiter (see the lessons at
  the end). The approved clip peaked at −3.6 dBFS.

Pick it once per creator and keep it as `voice-ref/<creator>.wav` next to the course.
Every lesson uses the same clip, so the voice stays identical across the course.

## The approved recipe

```bash
docker run --rm -v "$PWD":/work -v <skill>/scripts/omnivoice:/skill:ro \
  -v ~/.cache/omnivoice-models:/models -w /work omnivoice:local \
  /skill/synth.py --ref voice-ref/<creator>.wav --text-file narration/aula.txt --out audio/aula.wav
```

| Parameter | Value | Why |
|---|---|---|
| `num_step` | **16** | Half the time of the default 32, with the same similarity in the test |
| `guidance_scale` | **3.0** (default 2.0) | Plays the role of ElevenLabs' *similarity*: the output follows the reference more closely. It raised similarity from 0.909 to 0.946 on the same clip |
| everything else | OmniVoice default | Lowering `position_temperature` to 2.0 (a stand-in for *stability*) caused the uneven pace. Leave it at 5.0 |
| `ref_text` | exact words of the clip | `synth.py` transcribes the clip when it is omitted. Correct names Whisper mishears ("SuperCloud" → "Super Cláudio") |

**Guidance 3.0 at 16 steps sometimes garbles a term.** In one take, "MCP" came out as
"ESP" and "GitHub" as gibberish. For this reason `synth.py` transcribes every take and
exits with code 2 when the match with the script falls below 95%. When that happens,
regenerate, or rerun with `--steps 32`. The 32-step take is as good but takes twice as
long.

The text is the same `narration/aula.txt` written for ElevenLabs, with symbols spelled
out the same way (`references/narration-script.md`). OmniVoice splits anything over
~30 s into ~15 s chunks internally, all from the same reference, so a whole lesson goes
in one call.

## Then, exactly as with ElevenLabs

- **One lesson at a time.** The work is CPU-bound, and parallel runs only split the
  CPUs.
- **Integrity:** `ffprobe` duration, silence holes, truncation, clipping. A failing
  lesson is regenerated, not patched.
- **The creator listens to the first lesson** before the module continues. Pace and
  clarity are taste calls. No metric here predicted what the creator heard (see below).
- **Alignment:** `node scripts/studio/align-wav.mjs <audio-dir> <narration-dir>` gives
  `voice.<name>.json`, then Stage 4 runs unchanged.

## What was measured (Nov 2026, Intel i7 Mac, Docker 2 CPUs / 4 GB)

The same 20 s pt-BR text was used throughout. Similarity is the cosine of WavLM-SV
speaker embeddings against two real held-out recordings; the real-vs-real ceiling is
0.972.

| Take | Reference | Settings | Similarity | Words right | Creator's verdict |
|---|---|---|---:|---:|---|
| 1 | steady reading, older mic | default | 0.909 | 94% | great rhythm, muffled voice |
| 2 | conversational clip, uneven pace | default | 0.972 | 93% | "horroroso" |
| 3 | same uneven clip | guidance 3.0, position_temperature 2.0 | 0.972 | 98% | most like him, but pace speeds up and drags |
| 4 | steady 5 s clip | default | 0.944 | 100% | ok |
| 5 | steady 5 s clip | guidance 3.0, 16 steps | 0.925 | 95% | glitchy ("ESP", "Kitrbili") |
| 6 | steady 5 s clip | guidance 3.0, 32 steps | 0.946 | 98% | good |
| **7** | **steady reading** | **guidance 3.0, 16 steps** | **0.946** | **98%** | **good — adopted (half the compute of 6)** |

**A word-level rhythm metric did not track what the creator heard.** It scored take 1,
the steadiest by ear, as the most uneven. Integrity checks and the transcript match are
reliable. For pace and timbre, send the audio and ask.

## History: what failed before OmniVoice

These were measured earlier on the same machine and are kept so the question is not
reopened:

| Model | Result |
|---|---|
| Chatterbox Multilingual v3 (MIT) | a strong European-Portuguese accent on a Brazilian reference |
| Chatterbox pt-BR dialect pack | accent fixed, but always judged muffled |
| Qwen3-TTS 1.7B (GPU) | close to the real voice, but only on a GPU (HF ZeroGPU quota, or ~$0.80/h) |
| Qwen3-TTS 0.6B (CPU) | fluent, but audibly **a different person**; 54x realtime |

**Lessons that generalise to any TTS work:**

- **Aesthetic metrics reward defects.** Loudness range read a glitchy file as
  "expressive". Spectral brightness and word-rate variance misranked takes. Integrity
  checks (silence holes, truncation, clipping, transcript match) are reliable; taste
  metrics are not.
- **Establish the noise floor before comparing.** The same text and parameters varied
  by 0.76 dB between runs. A single-sample comparison below ~1 dB means nothing.
- **Never put a limiter or `loudnorm` on a voice a human will judge.** A limiter
  flattened consonant transients (crest 8.32 → 6.7) and the delivery went muffled.
- **A reference peaking above 0 dBFS breaks cloning.** Resampling 48 → 24 kHz creates
  inter-sample overshoot; a clip at +3.09 dB produced degenerate output. Keep references
  below −3 dBFS.
- **Fine-tuning is a GPU job.** OmniVoice supports LoRA fine-tuning
  (`docs/lora_finetuning.md` upstream). Hours of the creator's recordings would make a
  good dataset, but it needs an NVIDIA GPU (a Colab T4 class card). It is not something
  to run on a CPU.
