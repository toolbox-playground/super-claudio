# The free local route, and why it was abandoned

This is kept so the decision is not re-litigated from scratch, and so the honest answer
is available when a user asks for a free or offline voice. Everything here was measured
on an Intel Mac with Docker, cloning a Brazilian pt-BR voice.

**Verdict: local open-source cloning did not reach usable voice identity.** The paid
route was adopted after the free one was given a full, fair attempt.

## What was tried

| Model | Result |
|---|---|
| Chatterbox Multilingual v3 (Resemble AI, MIT) | clear articulation, but a strong European-Portuguese accent on a Brazilian reference |
| Chatterbox pt-BR dialect pack | corrected the accent, output consistently judged muffled — rejected every time |
| Qwen3-TTS 1.7B (Apache 2.0, on a GPU) | **close to the real voice** — the best free result by a wide margin |
| Qwen3-TTS 0.6B (local CPU) | fluent and natural, but audibly **a different person** |

The decisive finding: **voice identity is the first thing a smaller model loses.** The
0.6B produced convincing speech with good rhythm and intonation, and the listener's
first reaction was "this man is not me". Measured against the real voice, crest factor
fell from 10.5 to 7.2 and loudness range from 5.4 to 1.7 LU.

## Why it was not viable even when it worked

The 1.7B result was good, but it only exists on a GPU:

| | cost |
|---|---|
| Local CPU, 0.6B | **54x realtime** — a 5-minute lesson takes 4.5 hours |
| Local CPU, 1.7B | does not fit; ~6.8 GB in float32 against a 7.8 GB VM |
| Hugging Face ZeroGPU, free | 2 min/day anonymous, 5 min/day signed in |
| Hugging Face PRO, $9/month | 40 min of GPU per day, extensible at $1 per 10 min |
| Dedicated L4 GPU on Spaces | $0.80/hour, no quota |

On price per minute the free route wins by an order of magnitude. It lost on the only
axis that mattered: the voice had to be recognisably the creator's, and a paid service
delivered that immediately where weeks of parameter work had not.

## Lessons that generalise

These cost real time and apply to any TTS work:

- **Aesthetic metrics reward defects.** Loudness range read a glitchy file as
  "expressive" (6.2 LU); spectral brightness ranked the clearest file as the dullest.
  Integrity checks (silence holes, truncation, clipping) are reliable; taste metrics
  are not. Send the audio and ask.
- **Establish the noise floor before comparing.** The same text and parameters varied
  by **0.76 dB** between two runs, which invalidates any single-sample comparison below
  about 1 dB. Re-run before concluding.
- **Never use a limiter or `loudnorm` on a voice a human will judge.** A limiter applied
  to prevent clipping flattened consonant transients from 8.32 to 6.7 crest and the
  delivery went muffled. Plain gain only.
- **A reference clip peaking above 0 dBFS breaks cloning.** Resampling 48 kHz to 24 kHz
  creates inter-sample overshoot; a clip peaking at +3.09 dB produced degenerate output.
  Keep references below −3 dBFS.
- **Parameters do not fix accent, pacing or clarity.** A full sweep produced no
  acceptable option. When the model is wrong, change the model.

## If a user still wants the free route

Point them at **Qwen3-TTS 1.7B on a GPU** — not Chatterbox, and not a CPU. Expect to
build and host it, expect to manage quota or hourly GPU cost, and expect a voice that
is close but not indistinguishable. Say all three up front.
