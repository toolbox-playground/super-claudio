# Text-to-Speech & Voiceover Generation

> **Tool not chosen yet?** Go back to the `media-content-creation` skill — it will invoke
> `find-ai-tools` to search for current free options and let the user pick.
> This file is a workflow guide for *after* a tool has been selected.

## Azure Neural TTS — Free, High Quality, Multilingual

Microsoft Azure Neural TTS produces natural-sounding speech with no cost for moderate usage.

**Use directly from terminal (no API key needed for basic use via edge-tts):**

```bash
pip install edge-tts
```

Generate audio in Portuguese (Francisca Neural — the voice Caio uses):
```bash
edge-tts --voice pt-BR-FranciscaNeural --text "Seu texto aqui" --write-media output.mp3
```

Generate in English:
```bash
edge-tts --voice en-US-JennyNeural --text "Your text here" --write-media output.mp3
```

Generate in Spanish:
```bash
edge-tts --voice es-ES-ElviraNeural --text "Tu texto aquí" --write-media output.mp3
```

**List all available voices:**
```bash
edge-tts --list-voices
```

**Summarize an article as audio (example workflow):**
1. Fetch article text (use WebFetch tool)
2. Summarize to ~200 words using Claude
3. Generate audio: `edge-tts --voice pt-BR-FranciscaNeural --text "..." --write-media summary.mp3`
4. Play or share: `afplay summary.mp3` (macOS) or `mpg123 summary.mp3` (Linux)

## ElevenLabs v3 — Premium Quality, Voice Cloning

ElevenLabs v3 produces studio-quality speech with emotionally nuanced voices, 29 languages, and voice cloning from 1 minute of audio.

**API usage:**
```python
from elevenlabs.client import ElevenLabs

client = ElevenLabs(api_key="your-key")
audio = client.generate(
    text="Hello! This is a test.",
    voice="Rachel",
    model="eleven_v3"  # check elevenlabs.io/docs for latest model ID
)
with open("output.mp3", "wb") as f:
    f.write(audio)
```

**Free tier:** 10,000 characters/month
**Best for:** High-quality voiceovers for ads or professional content
**Voice cloning:** Paid feature; clone any voice from a sample

## ElevenLabs Flash v2 / v2.5 — Ultra-Low-Latency Voice Agents

ElevenLabs Flash is the speed-optimized sibling of Eleven v3, purpose-built for real-time conversational agents where latency matters more than expressiveness. Generates speech in ~75ms TTFA. Recommended by ElevenLabs over the older Turbo models for all low-latency use cases.

- **Model IDs:** `eleven_flash_v2` (English only) · `eleven_flash_v2_5` (32 languages)
- **Released:** December 2024
- **URL:** elevenlabs.io (same API as v3)
- **Latency:** ~75ms TTFA
- **Languages:** Flash v2 — English only; Flash v2.5 — 32 languages
- **Pricing:** same per-character pricing as the rest of the ElevenLabs API (see elevenlabs.io/pricing)
- **Best for:** Voice agents, chatbots, real-time assistants where latency trumps emotional range
- **Not ideal for:** Long-form narration or expressive delivery — use Eleven v3 for those

## Inworld Realtime TTS-2 — Closed-Loop Conversational TTS (NEW May 2026)

Inworld Realtime TTS-2 (launched May 5, 2026) is a fundamentally different architecture from TTS-1.5: it takes the actual audio of prior conversation turns as input — not just text — so it understands tone, pacing, and emotional context from everything that was said before. Ranked alongside TTS-1.5 Max at the top of the Artificial Analysis Speech Arena.

- **URL:** inworld.ai
- **Free tier:** 40 minutes/month (On-Demand plan)
- **Pricing:** $35/1M characters (On-Demand); $25/1M characters (Growth plan)
- **Latency:** <200ms median TTFA; sub-250ms P90
- **Languages:** 100+ with mid-utterance language switching (same voice identity preserved across every language)
- **Voice direction:** Inline bracket tags — `[speak sadly]`, `[excited, fast-paced]` — passed directly in the text at inference time
- **Non-verbal markers:** `[laugh]`, `[sigh]`, `[breathe]`, `[cough]` — drop anywhere for natural-sounding output
- **Conversational awareness:** Takes prior audio turns as input; automatically adapts pacing and tone to match the user's energy
- **Integrations:** Layercode, LiveKit, NLX, Pipecat, Vapi, Voximplant
- **Best for:** Real-time conversational voice agents, customer-facing bots, interactive AI experiences where dialogue context matters
- **Not ideal for:** Offline/on-device deployment or long-form static narration

## Inworld AI TTS-1.5 — High Quality + Low Latency

Inworld TTS-1.5 Max ranks in the top 5 on the Artificial Analysis Speech Arena — wins blind tests for naturalness, emotional range, and conversational flow at sub-200ms streaming latency. TTS-2 (above) is now available for real-time conversational use; TTS-1.5 remains the recommended pick for non-conversational voiceover production.

- URL: inworld.ai
- Free tier: 40 minutes/month
- Latency: <200ms streaming
- Best for: voice agents, interactive AI, professional voiceovers
- Pricing: $15–$25/million characters (standard)

## Gemini 3.1 Flash TTS — Free, 70+ Languages, Style-Controllable (NEW Apr 2026)

Google's Gemini 3.1 Flash TTS (launched April 15, 2026) delivers natural, expressive speech with inline audio tags for style and pacing control — and is currently free in AI Studio during preview. Ranked #1 on the Artificial Analysis TTS Arena (Elo 1,211) as of May 2026.

- **URL:** aistudio.google.com | Vertex AI | cloud.google.com/text-to-speech
- **Free tier:** Yes — free in Google AI Studio (preview; rate limited); also accessible in Google Vids
- **Paid API:** $1.00/1M input tokens (text); $20.00/1M output tokens (audio); batch API: 50% off
- **Also available:** Gemini 3.5 Flash TTS (June 2026) — same API, $6/1M output tokens (70% cheaper than 3.1; feature parity being confirmed)
- **Languages:** 70+ (broadest multilingual coverage among top-ranked models)
- **Multi-speaker:** Up to 2 speakers per generation, each with independent voice and style
- **Audio tags:** Inline delivery control — `<laugh>`, `<whisper>`, `<excited>`, pacing adjustments — via natural markup in the prompt
- **Watermarking:** SynthID — imperceptible watermark embedded in all output audio
- **Elo:** 1,214 on Artificial Analysis TTS Arena — #1 ranked TTS model (June 2026)
- **Best for:** Multilingual voiceovers, free developer experimentation, style-directed narration, Google Cloud / Vertex AI workflows
- **Not ideal for:** Ultra-low-latency real-time voice agents (use Cartesia Sonic 3.5); self-hosted / offline deployment

## Fish Audio S2 Pro — Best Multilingual + Emotion Control

Fish Audio S2 Pro ranks #1 on TTS-Arena2 with 80+ languages and 50+ inline emotion controls. Trained on 10M+ hours of audio.

- URL: fish.audio
- Free tier: 200 minutes/month
- Best for: multilingual content, emotionally nuanced narration, voice cloning
- License: research/non-commercial free; commercial use requires separate license
- Open-source model on HuggingFace: `fishaudio/s2-pro`

## Hume AI TADA — Open-Source, Long-Context, Zero Content Hallucinations

Hume TADA (Text-Acoustic Dual Alignment, March 2026) is Hume's first open-source TTS release: it aligns text tokens directly to audio tokens, achieving zero content hallucinations across 1,000+ test samples and supporting up to 700 seconds of audio (~12 min) in a single pass — 10× longer than most models. 5× faster inference than comparable LLM-based TTS (real-time factor ~0.09).

- **URL / GitHub:** github.com/HumeAI/tada
- **License:** Open-source (Apache 2.0)
- **Languages:** English
- **Duration:** up to 700 seconds in a single pass
- **Latency:** Real-time factor ~0.09
- **Free tier:** Yes (self-host)
- **Best for:** Long-form narration without content hallucinations; research; self-hosted open-source deployment
- **Not ideal for:** Multilingual content or emotionally nuanced delivery (use Chatterbox or Hume Octave 2 for those)

## Hume Octave 2 — Emotional TTS with Acting Instructions

Hume Octave 2 is the first TTS model built on a language model backbone that truly understands the emotional context of what it's saying — not just converting text to speech but interpreting tone, subtext, and dramatic intent. Its "acting instructions" feature lets you direct delivery with plain-language prompts: "whisper fearfully", "sound sarcastic", "say this with nervous energy".

- **URL:** hume.ai
- **Free tier:** 10,000 characters/month (non-commercial only)
- **Paid:** $3/mo Starter (30K chars); $14/mo Creator (140K chars, **commercial license**); half the price of Octave 1
- **Latency:** <200ms (streaming); Instant mode starts audio playback as generation begins
- **Languages:** 11 — Arabic, English, French, German, Hindi, Italian, Japanese, Korean, Portuguese, Russian, Spanish (20+ languages coming)
- **Voice design:** Prompt a custom voice from scratch ("a warm, elderly British narrator") rather than picking from a fixed library
- **Best for:** Dramatic narration, character voices, emotionally nuanced dialogue, marketing voiceovers where delivery matters
- **Not ideal for:** High-volume bulk generation (Kokoro / edge-tts are cheaper at scale); on-device deployment (use NeuTTS Air)

## Cartesia Sonic 3.5 — Real-Time Conversational TTS

Cartesia Sonic 3.5 (upgraded May 2026) is purpose-built for real-time conversational AI with ~40ms time-to-first-audio — the standard pick for voice agents and chatbots. Sonic 3.5 improves on Sonic 3 with noticeably more natural voices, better stability through long calls, and more consistent pronunciation of difficult words and names. The upgrade applies automatically to all existing Cartesia integrations.

- URL: cartesia.ai
- Free tier available
- Latency: ~40ms TTFA (best-in-class for streaming)
- Languages: 42
- Best for: voice agents, live chatbots, real-time assistants
- Not ideal for: long-form content where ElevenLabs, Fish Audio, or Chatterbox are better

## Smallest.ai Lightning V3.1 — Conversational TTS, Beats ElevenLabs on MOS

Smallest.ai Lightning V3.1 (launched March 27, 2026) achieves a 3.89 MOS, outperforming ElevenLabs, OpenAI TTS, and Cartesia on conversational naturalness benchmarks. Sub-100ms TTFA. Voice cloning from 3 seconds of audio.

- URL: smallest.ai
- Free tier: no (pay-as-you-go, no seat licenses, no minimums, non-expiring credits)
- Latency: <100ms TTFA
- Languages: 15 (best in English, Spanish, Hindi, Tamil)
- Voice cloning: 3–15 seconds of audio → production-ready replica
- Best for: voice agents, enterprise conversational AI (banking, BPO, telecom)
- Not ideal for: long-form narration or podcast production (use Chatterbox or VibeVoice)

## Deepgram Aura-2 — Enterprise Production TTS

Deepgram Aura-2 targets enterprises building production voice systems where uptime, transparent pricing, and consistent low latency matter more than theatrical expressiveness. Sub-200ms TTFB (90ms optimized), 40+ English voices, 10+ Spanish voices with regional accents.

- URL: deepgram.com
- Free start: $200 in free credits (no credit card required)
- Pricing: $0.030 per 1,000 characters (~$1.80/hour of audio)
- Languages: 7 (English, Spanish + others)
- Best for: enterprise voice agents, high-volume production systems, call center bots
- Not ideal for: artistic/emotional content where ElevenLabs or Fish Audio excel

## Speechify SIMBA 3.0 — Top-10 Quality at $10/1M Characters (NEW May 2026)

Speechify SIMBA 3.0 (May 2026) broke into the Artificial Analysis TTS global top 10 at #7 (Elo 1,159), ranking above ElevenLabs, OpenAI TTS, and Microsoft at one-tenth their typical price.

- **URL:** speechify.com
- **Free tier:** No API free tier; Speechify consumer app has a limited free plan
- **Pricing:** $10/1M characters — cheapest model in the global top 10 by Elo
- **Latency:** <250ms TTFA (streaming-native architecture)
- **Features:** Zero-shot voice cloning, emotional expression controls, SSML prosody support
- **Best for:** Cost-sensitive high-volume production TTS where top-10 quality matters; enterprises evaluating ElevenLabs at 10× lower price
- **Not ideal for:** Ultra-low-latency (<100ms) conversational agents (use Cartesia Sonic 3.5)

## StepAudio 2.5 TTS (StepFun) — #3 Global Elo, Contextual Performance TTS (NEW May 2026)

StepAudio 2.5 TTS from StepFun (Shanghai) ranks **#3 on the Artificial Analysis Speech Arena** (Elo ~1,187, May 2026) — above every ElevenLabs model including Eleven v3. The key differentiator: it is the first TTS model to integrate full contextual understanding into the generation pipeline, so it doesn't just read text, it *performs* it.

- **URL:** platform.stepfun.ai | **API:** `https://api.stepfun.ai/v1/audio/speech`
- **Model ID:** `step-audio-2.5-tts`
- **Pricing:** Pay-as-you-go API (see platform.stepfun.ai for current rates)
- **Elo:** ~1,187 on Artificial Analysis Speech Arena — #3 globally (May 2026), above ElevenLabs Eleven v3 (1,178)
- **Max input:** 1,000 characters per request
- **Voice control:** Plain natural language — describe delivery in prose: "speak slowly with a warm, reassuring tone" — no tags or preset combos required
- **Context levels:** Global Context (sets the baseline persona/style for the full clip) + Inline Context (overrides delivery moment-to-moment mid-text)
- **Voice cloning:** Zero-shot from a short reference recording — full timbre and emotion control preserved
- **Realtime variant:** StepAudio 2.5 Realtime (May 24, 2026) — end-to-end voice model with roleplay-specific RLHF and paralinguistic comprehension (understanding sighs, hesitations, emphasis); separate endpoint
- **Best for:** Production TTS needing dramatic delivery control without SSML tags; voice agents with nuanced emotional requirements; multilingual content (Chinese + English strong)
- **Not ideal for:** Ultra-low-latency real-time agents (<100ms); long-form narration over 1K chars without chunking

## MiniMax Speech 2.8 HD — Broadcast Quality, 40+ Languages, 7 Emotions (NEW 2026)

MiniMax Speech 2.8 HD is MiniMax's current flagship TTS, replacing Speech 2.6. Broadcast-grade audio quality with 40+ languages, 17+ expressive voice presets, and an expanded emotion set with natural interjection tags.

- **URL:** minimax.io/audio | **API:** replicate.com/minimax/speech-2.8-hd, wavespeed.ai
- **Free tier:** No direct free tier; available via Replicate and WaveSpeedAI (pay-as-you-go)
- **Latency:** <250ms
- **Languages:** 40+ (expanded from ~32 in Speech 2.6)
- **Voices:** 17+ expressive presets spanning gender, age, and speaking style
- **Emotions:** 7 modes (calm, fluent, surprised + 4 more); "auto" matches tone to script context
- **Interjection tags:** `[laugh]`, `[sigh]`, `[gasp]` — natural non-verbals dropped anywhere in text
- **Voice cloning:** Yes — improved tonal nuance and timbre similarity vs. Speech 2.6
- **Architecture:** Autoregressive Transformer + Flow-VAE decoder; models speech in learned latent space for natural cadence and emotional depth
- **Variants:** HD (broadcast-grade fidelity) vs Turbo (2–3× faster, lower cost, same features)
- **Best for:** Multilingual narration, marketing voiceovers, audiobooks needing emotional range and reliable voice cloning
- **Not ideal for:** Ultra-low-latency agents (<100ms) — use Cartesia Sonic 3.5 for those

## Chatterbox — Free & Open-Source, No Usage Caps

Chatterbox by Resemble AI is MIT-licensed and outperformed ElevenLabs in blind listener tests (65.3% preference for Turbo; 63.8% for standard). Zero-shot voice cloning with a few seconds of reference audio.

```bash
pip install chatterbox-tts
```

```python
import torchaudio
from chatterbox.tts import ChatterboxTTS

model = ChatterboxTTS.from_pretrained(device="cuda")
wav = model.generate("Hello, this is a test of Chatterbox TTS.")
torchaudio.save("output.wav", wav, model.sr)
```

**Models:**
- `chatterbox-tts` — English, emotion control, voice cloning
- `chatterbox-tts[multilingual]` — 23+ languages
- `chatterbox-turbo` — 350M params; up to 6× faster than real-time on GPU; sub-200ms latency; paralinguistic prompting tags (`[laugh]`, `[cough]`, `[chuckle]`) for natural-sounding output; MIT license

**Homepage:** resemble.ai/chatterbox | **PyPI:** `pip install chatterbox-tts`

## Mistral Voxtral TTS — Open-Weight, Low-Latency, 9 Languages

Mistral released Voxtral TTS on March 26, 2026: a 4B-parameter open-weight model rivaling ElevenLabs at a lower cost. Hybrid architecture (3.4B autoregressive decoder + 390M acoustic flow-matching + 300M neural codec).

- **URL:** mistral.ai | **HuggingFace:** `mistralai/Voxtral-TTS`
- **Open-weight:** Yes (weights on HuggingFace)
- **API pricing:** $0.016 per 1,000 characters (Mistral Studio)
- **Latency:** ~90ms TTFA (70ms pure model)
- **Languages:** 9 — English, French, German, Spanish, Dutch, Portuguese, Italian, Hindi, Arabic
- **Voice cloning:** 3-second reference audio
- **Best for:** Multilingual production TTS at low cost; EU-language coverage; self-hosted open-weight deployment

## Qwen3-TTS — Open-Source, 10 Languages, 97ms Latency, Apache 2.0

Qwen3-TTS (Alibaba Qwen team, January 22, 2026) is an open-source TTS model family supporting 10 languages with 97ms first-packet streaming latency, voice cloning from 3 seconds of audio, and free-form voice design via natural language description.

```bash
pip install git+https://github.com/QwenLM/Qwen3-TTS
```

- **URL / GitHub:** github.com/QwenLM/Qwen3-TTS | **HuggingFace:** `Qwen/Qwen3-TTS-1.7B`
- **License:** Apache 2.0 (commercial use permitted)
- **Variants:** 1.7B and 0.6B — each available as CustomVoice (voice cloning) and VoiceDesign (natural-language voice creation) flavors; Base models for fine-tuning
- **Languages:** 10 — Chinese, English, Japanese, Korean, German, French, Russian, Portuguese, Spanish, Italian
- **Training data:** 5M+ hours of speech across 10 languages
- **Latency:** 97ms end-to-end first-packet latency (streaming; dual-track hybrid architecture without heavy diffusion transformers)
- **Voice cloning:** 3-second reference audio → production-ready replica
- **Voice design:** Free-form natural language prompting ("a warm, elderly British narrator") — no preset library required
- **Best for:** Open-source multilingual TTS needing commercial use at zero API cost; CJK + EU-language coverage; self-hosted or on-device deployment
- **Not ideal for:** Ultra-low-latency real-time agents where Cartesia Sonic 3.5's 40ms TTFA is needed; theatrical emotional delivery (use Hume Octave 2)

## Sesame CSM-1B — Conversational Naturalness, Apache 2.0

Sesame CSM-1B (Conversational Speech Model) stands out for human-like conversational realism: natural pauses, "umms", breath sounds, and subtle intonation shifts that traditional TTS models miss. Trained on 1M+ hours of English audio; uses a Llama-3.2 backbone + 300M audio decoder.

```bash
pip install git+https://github.com/SesameAILabs/csm
```

- **URL / GitHub:** github.com/SesameAILabs/csm | **HuggingFace:** `sesame/csm-1b`
- **License:** Apache 2.0 (commercial use permitted; impersonation / deceptive content prohibited)
- **Parameters:** 1B backbone + 300M audio decoder
- **Languages:** English primarily (limited other languages via training contamination — not reliable)
- **Context:** up to 2,048 tokens (~2 minutes of audio) in one pass
- **Requirements:** CUDA-compatible GPU, Python 3.10+, ffmpeg
- **Best for:** Conversational AI demos, voice agents needing human-like naturalness, podcast-style dialogue
- **Not ideal for:** Multilingual content or long-form narration (use VibeVoice or Chatterbox for those)

## VibeVoice (Microsoft) — Long-Form Multi-Speaker TTS, MIT License

Microsoft VibeVoice is an open-source family accepted as an Oral at ICLR 2026 — includes TTS (1.5B), a streaming Realtime variant (0.5B), and a long-form ASR model (7B). The TTS model synthesizes up to 90 minutes with up to 4 distinct speakers in one pass — unique among open-source models.

> **Note:** Microsoft explicitly recommends against production/commercial deployment without further testing. Currently best suited for research and development.

- **URL / GitHub:** github.com/microsoft/VibeVoice | **HuggingFace:** `microsoft/VibeVoice-1.5B`
- **License:** MIT (research/development use recommended; commercial deployment not advised by Microsoft yet)
- **Models:** VibeVoice-TTS-1.5B (long-form), VibeVoice-Realtime-0.5B (streaming), VibeVoice-ASR-7B (recognition)
- **Speakers:** up to 4 simultaneous in one generation
- **Duration:** up to 90 minutes in a single pass
- **ASR:** 50+ languages, speaker diarization, timestamps
- **Best for:** Audiobooks, long-form narration, multi-speaker podcast generation, research
- **Not ideal for:** Production voice agents or commercial apps (use Cartesia/ElevenLabs for those)

## Kokoro TTS — Ultra-Lightweight, #1 HuggingFace TTS Arena

Kokoro (82M parameters, Apache 2.0) ranked #1 on the HuggingFace TTS Spaces Arena for single-speaker speech quality, outperforming models 5–15× its size. Runs 96× faster than real-time on a basic cloud GPU. Includes a self-hosted OpenAI-compatible API — a drop-in replacement for OpenAI's TTS endpoint.

```bash
pip install kokoro
```

- **URL:** kokorottsai.com | **HuggingFace:** `hexgrad/Kokoro-82M`
- **License:** Apache 2.0 (commercial use free)
- **Languages:** 8 (American & British English, French, Korean, Japanese, Mandarin, + more); 48 voices
- **Voice cloning:** No (fixed voice library)
- **Latency:** 96× real-time on GPU; runs on CPU
- **Self-hosted API:** OpenAI-compatible TTS endpoint (drop-in replacement)
- **Best for:** Ultra-fast batch generation, lightweight local/edge deployment, replacing OpenAI TTS without changing client code

## NeuTTS Air (Neuphonic) — On-Device, CPU-Capable, Apache 2.0

NeuTTS Air (~360M active params) runs fully on-device with no cloud dependency — including on mid-range mobile CPUs — with instant voice cloning from 3 seconds of audio.

```bash
pip install neutts
```

- **URL:** neutts.com | **HuggingFace:** `neuphonic/neutts-air`
- **License:** Apache 2.0 (full commercial use)
- **Languages:** English
- **Voice cloning:** Instant (3-second mono WAV reference)
- **Performance:** 20 tok/s on mobile CPU; 119 tok/s on Ryzen 9 laptop; 16,000+ tok/s on RTX 4090
- **Watermarking:** Perth watermark embedded in all output audio
- **Best for:** Privacy-first / offline deployment, edge devices, zero API cost in production

## xAI Grok TTS — 5 Voices, 20+ Languages, #5 TTS Arena (April 2026)

xAI launched its Grok Text-to-Speech API in April 2026, built on the same voice stack powering Grok Voice, Tesla vehicles, and Starlink customer support. Ranked #5 on the Artificial Analysis TTS Arena (Elo 1,194, June 2026).

- **URL:** x.ai/api
- **Pricing:** $4.20/1M characters
- **Voices:** Eve, Ara, Leo, Rex, Sal (5 voices with distinct personalities); voice cloning available from a short reference recording
- **Languages:** 20+ with automatic BCP-47 language detection (or specify explicitly)
- **Latency:** <1s average TTFA; streaming supported
- **Output formats:** MP3, WAV, PCM (Linear16), G.711 μ-law, G.711 A-law
- **Expressive tags:** Inline: `[laugh]`, `[sigh]`, `[breath]`; wrapping: `<whisper>text</whisper>`, `<emphasis>text</emphasis>`
- **Best for:** Developers already in the xAI/Grok ecosystem; multilingual voice agents; production pipelines needing format flexibility
- **Not ideal for:** Budget-sensitive high-volume use (use Speechmatics $0.011/1K chars or Kokoro at no cost); theatrical emotional range (use Hume Octave 2)

## Speechmatics TTS — Ultra-Cheap Enterprise TTS, 11–27× Below ElevenLabs

Speechmatics launched its own neural TTS in 2026 alongside its industry-leading STT (55+ languages). At $0.011 per 1,000 characters it is 11–27× cheaper than ElevenLabs while delivering comparable neural quality and sub-150ms streaming latency.

- **URL:** speechmatics.com/text-to-speech
- **Free start:** free tier available
- **Pricing:** $0.011/1,000 characters
- **Languages:** English (US + UK); additional languages in development through 2026
- **Latency:** ~80–100ms TTFA (streaming)
- **Best for:** High-volume English voice agents and production pipelines where cost matters most; single-vendor STT+TTS integration
- **Not ideal for:** Multilingual content or theatrical emotional range (use Fish Audio or ElevenLabs for those)

## Choosing Between Tools

| Need | Tool |
|------|------|
| Quick article summary, personal use | edge-tts (Azure, free) |
| Professional ad voiceover | ElevenLabs v3 or Inworld TTS-1.5 |
| Low-latency voice agent (ElevenLabs ecosystem) | ElevenLabs Flash v2.5 (~75ms, 32 languages) or Flash v2 (English only, ~75ms) |
| Emotional / dramatic narration, acting instructions | Hume Octave 2 (hume.ai, <200ms, 11 languages) |
| Portuguese/Spanish natural voice | edge-tts Francisca / ElevenLabs multilingual |
| 80+ languages, emotion control | Fish Audio S2 Pro |
| Best blind-test naturalness (cloud) | Gemini 3.1 Flash TTS (Elo 1,214, #1 June 2026), Inworld AI TTS-1.5 Max, StepAudio 2.5 TTS (Elo ~1,187, #3 May 2026), or Inworld Realtime TTS-2 |
| Voice cloning, no cost, offline | Chatterbox (open-source) |
| Long-form narration (up to 12 min), zero hallucinations, self-hosted | Hume AI TADA (Apache 2.0, open-source) |
| Voice cloning, cloud, easiest | ElevenLabs (paid) |
| Bulk generation (many files) | edge-tts or Chatterbox (no credit limits) |
| Real-time voice agent / chatbot | Cartesia Sonic 3.5 (~40ms TTFA), Smallest.ai Lightning V3.1 (<100ms), or Inworld Realtime TTS-2 (<200ms, closed-loop, 100+ langs) |
| Enterprise production (uptime + pricing transparency) | Deepgram Aura-2 ($200 free credits to start) |
| Ultra-cheap high-volume English TTS, single-vendor STT+TTS | Speechmatics TTS ($0.011/1K chars, ~80ms TTFA) |
| Open-weight multilingual cloud TTS, low cost | Mistral Voxtral TTS ($0.016/1K chars) |
| Open-source multilingual TTS, 10 languages, self-hosted or commercial | Qwen3-TTS (Apache 2.0, 97ms TTFA, voice cloning + free-form voice design, github.com/QwenLM/Qwen3-TTS) |
| On-device, zero API cost, privacy-first | NeuTTS Air (Apache 2.0, CPU-capable) |
| Ultra-fast batch TTS, drop-in OpenAI TTS replacement | Kokoro TTS (Apache 2.0, 82M params, 96× real-time, fixed voices) |
| Human-like conversational naturalness (pauses, ums, breaths) | Sesame CSM-1B (Apache 2.0, English only, CUDA required) |
| Long-form multi-speaker narration (audiobooks, podcasts) | VibeVoice-TTS-1.5B (MIT, up to 90 min / 4 speakers, research use) |
| Multilingual style-controllable TTS, free for developers | Gemini 3.1 Flash TTS (70+ languages, audio tags, free in AI Studio); Gemini 3.5 Flash TTS ($6/1M output — cheapest option) |
| Top-10 quality at minimum cost | Speechify SIMBA 3.0 ($10/1M chars, Elo 1,159, #7 globally) |
| Conversational AI with tone/context awareness across turns | Inworld Realtime TTS-2 (closed-loop, adapts to prior audio, 100+ langs, May 2026) |
| Grok/xAI ecosystem, 20+ languages, format flexibility | xAI Grok TTS ($4.20/1M chars, Elo 1,194 #5 globally June 2026, voice cloning) |
| Contextual performance TTS, dramatic delivery without tags | StepAudio 2.5 TTS (platform.stepfun.ai, Elo ~1,187 #3 globally, plain-language voice direction) |
| Multilingual broadcast-quality narration, 40+ languages, emotion+interjections | MiniMax Speech 2.8 HD (minimax.io/audio, Replicate, WaveSpeedAI; HD for quality, Turbo for speed) |
