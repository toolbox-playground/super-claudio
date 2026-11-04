# Voice Cloning — Chatterbox, measured

Everything here was measured on a real production run (Intel Mac, Docker, pt-BR,
a 2-minute Kubernetes explainer). Numbers are from that run, not from documentation.

## The stack

| Piece | Value |
|---|---|
| Model | Chatterbox Multilingual v3 (Resemble AI, MIT) |
| Class | `ChatterboxMultilingualTTS` from `chatterbox-tts` |
| Base weights | `ResembleAI/chatterbox` (HuggingFace) |
| pt-BR dialect pack | `ResembleAI/Chatterbox-Multilingual-pt-br` |
| Runtime | Docker `linux/amd64`, python 3.11, torch 2.6.0 CPU |

**Why Docker.** `chatterbox-tts` pins `torch==2.6.0`. macOS x86_64 torch wheels stop at
2.2.2, so a native install fails with `ResolutionImpossible`. The image in
`scripts/tts/Dockerfile` builds from the official upstream package — do not substitute a
third-party community image when the user's voice data is involved.

## Resource requirements

| Resource | Minimum | Measured effect |
|---|---|---|
| RAM for the VM | 8 GB | at 2 GB the container paged: 5–26% CPU, i.e. not computing |
| CPU cores | 4+ | 6 cores reached 234–593% utilization |
| Disk | ~6 GB | 2.48 GB image + 2.0 GB t3 + 1.06 GB decoder |
| Speed | ~16x realtime | a 20s scene ≈ 25–40 min; a 2-min video ≈ 4 h |

On Docker Desktop the VM is configured in `settings-store.json`
(`MemoryMiB`, `Cpus`, `SwapMiB`). A starved VM looks like a slow model — check
`docker stats` before blaming the model: low CPU% with high RAM means paging.

Mount a cache at `/root/.pkuseg` or the container re-downloads a 34 MB tokenizer
package on every run.

## The two models, and the trade-off

Generated from the **same** reference clip, measuring the sibilant ratio (energy in
5.5–10 kHz minus energy in 2–4.5 kHz; higher = more [s], lower = more [ʃ]):

| | sibilant ratio | perceived |
|---|---|---|
| reference (real voice) | −1.26 | — |
| generic multilingual output | **−2.97** | amplified the chiado; "European Portuguese" |
| pt-BR V3 output | **+1.67** | corrected the chiado; but muffled |

The generic model **amplifies** palatalized /s/ by 1.7 dB; the pt-BR pack **reduces** it
by 2.9 dB. A 4.6 dB swing from identical input.

**But:** every pt-BR V3 output was rejected by the listener as muffled ("ovo na boca"),
and every generic output was accepted as clear. The two properties could not be
combined, because the pt-BR t3 emits tokens in the V3 decoder's vocabulary — they are a
fixed pair. Mixing the pt-BR t3 with the base decoder produces sluggish, glitchy audio.

If the user needs both a Brazilian accent and crisp articulation, this toolchain does
not deliver it. Recommend a paid cloning service rather than iterating further.

## Assembling the pt-BR checkpoint

The pt-BR repo ships only `t3_pt_br.safetensors`, `s3gen_v3.pt` and the tokenizer JSON.
Build a checkpoint directory with:

| File | Source |
|---|---|
| `t3_mtl23ls_v2.safetensors` | pt-BR repo's `t3_pt_br.safetensors`, renamed |
| `s3gen.pt` | pt-BR repo's **`s3gen_v3.pt`**, renamed |
| `grapheme_mtl_merged_expanded_v1.json` | pt-BR repo |
| `ve.pt`, `conds.pt` | base model snapshot |

`from_local` reads these names literally. **Using the base `s3gen.pt` instead of the V3
decoder is the single most damaging mistake** — the output is slow, repetitive and
glitchy, and the only warning is a `Detected 2x repetition of token` line in the log.

The V3 decoder omits two deterministic buffers (`tokenizer._mel_filters`,
`tokenizer.window`) that the installed code recreates — a mel filterbank and a Hann
window, both computed constants. `scripts/tts/synth-ptbr.py` loads with `strict=False`
but **aborts on any other missing or unexpected key**, so a real mismatch still fails
loudly. Never use a bare `strict=False`.

## Choosing the reference clip

Selection is measurable. Do not pick by ear or by "this part sounds good".

**Sibilant ratio** — rank 20s blocks of the source by `energy(5.5–10 kHz) −
energy(2–4.5 kHz)`. [s] peaks above 5 kHz, [ʃ] between 2 and 4 kHz, so a higher ratio
means less palatalization and less European drift. In the production run the originally
chosen clip scored −2.96 while the best region scored −0.55; the clip had been cut from
one of the chiadest stretches of the whole recording.

**Speech rate** — count word nuclei from the 300–1000 Hz energy envelope: 20 ms blocks,
3-block smoothing, local maxima separated by a 4 dB valley. Calibrate the detector
against audio of known word count before trusting it; tuned this way it counted 59 of
60 words on native audio. It undercounts 8–15% on time-stretched audio, so only apply
it to natural speech.

**Preparation rules, each learned from a failure:**

- Peak **must** stay below −3 dBFS. Resampling 48 kHz → 24 kHz creates inter-sample
  overshoot; a clip peaking at +3.09 dB produced degenerate output at 1.60 words/s. The
  model warns with `Audio values outside normalized range` — read it.
- Use **plain gain**, never `loudnorm`, to set the level. Compression altered the
  spectral balance and dropped the sibilant ratio from +2.85 to +0.75.
- Prefer a **contiguous** 20–30s segment over a splice of "clean" fragments.
- Cut at silence boundaries found with `silencedetect`, not at arbitrary timestamps.
- Longer is not better. Zero-shot cloning needs 20–30s; extra seconds only add more
  surface for defects.

## Parameters

`generate(text, language_id, audio_prompt_path, exaggeration, cfg_weight, ...)`.

Measured reality: **parameters do not fix accent, pacing or clarity.** A full sweep
produced no listener-acceptable option; the two fixes that worked were phonetic
respelling and changing the model. Do not spend hours sweeping.

| Setting | Effect observed |
|---|---|
| `exaggeration=0.7, cfg_weight=0.3` | the configuration the listener preferred |
| `exaggeration=0.3` | model stalls — a 6-second hole mid-narration |
| `exaggeration=0.8` on pt-BR V3 | degenerated to 1.68 words/s |
| `cfg_weight` | does **not** control pace, despite the intuition |

Speaking rate is a property of the model, not a parameter: the same reference gave 2.97
words/s on the generic model and 2.60 on pt-BR V3. All generations run slower than the
speaker's natural rate (~3.5 words/s measured).

## Phonetic respelling

The model applies Portuguese grapheme-to-phoneme rules to **every** word, so English
technical terms come out with Portuguese phonetics. This was the listener's first and
strongest complaint, and respelling fixed it.

`scripts/studio/respell.mjs` maps display text to spoken text:

| displayed | spoken |
|---|---|
| API | Êi-pi-ái |
| server | sârver |
| etcd | ét-ci-di |
| scheduler | skédiuler |
| controllers | controulers |
| node / nodes | nôud / nôuds |
| kubelet | kiubelét |
| YAML | iâmel |

Extend the table for each new domain. The script **throws if a substitution changes the
word count**, because captions and diagram reveals are aligned by word index.

Side effect worth knowing: respelling also removed the `exaggeration=0.3` stall, which
suggests the model was choking on the English tokens themselves.

Respelling does **not** generalize to the accent itself. Forcing Brazilian /s/ by
writing `ç` or `ss` in place of pre-consonantal and final `s` ("eçtado", "oç nôudç")
moved the sibilant ratio from −4.07 to −3.89 (`ç`) and −2.93 (`ss`), against +1.67 for
the pt-BR model. The `ç` gain is inside the noise: the *same* text and parameters
varied by 0.76 dB between two runs, so treat any single-sample comparison below ~1 dB
as meaningless and re-run before concluding. The chiado lives in learned prosody, not
in character-level reading.

## Metrics that misled

Record these so the mistakes are not repeated:

- **LRA (loudness range)** was read as expressiveness. A broken file scored 6.2 LU —
  the variation came from glitches, not delivery. The clip the listener actually liked
  scored 2.2 LU, the flattest of all.
- **Spectral brightness** was read as clarity. The file judged clearest was the
  *dullest* by that measure (−15.41 dB); the files judged muffled were brighter.
- **Crest factor** did catch a real defect: a limiter applied to prevent clipping
  flattened consonant transients from 8.32 to 6.7, dulling articulation. Use plain gain
  instead of a limiter on anything a listener will judge.

Integrity checks (silence holes, truncation, clipping, repetition warnings in the log)
are reliable. Aesthetic metrics are not — send the audio and ask.
