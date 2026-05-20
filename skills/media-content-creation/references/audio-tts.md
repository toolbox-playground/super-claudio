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
    model="eleven_turbo_v2_5"  # check elevenlabs.io/docs for latest model ID
)
with open("output.mp3", "wb") as f:
    f.write(audio)
```

**Free tier:** 10,000 characters/month
**Best for:** High-quality voiceovers for ads or professional content
**Voice cloning:** Paid feature; clone any voice from a sample

## Inworld AI TTS-1.5 — Best Quality + Low Latency

Inworld TTS-1.5 Max holds the top ELO (~1236) on the Artificial Analysis Speech Arena in 2026 — wins blind tests for naturalness, emotional range, and conversational flow at sub-200ms streaming latency.

- URL: inworld.ai
- Free tier: 40 minutes/month
- Latency: <200ms streaming
- Best for: voice agents, interactive AI, professional voiceovers
- Pricing: $15–$25/million characters (standard)

## Fish Audio S2 Pro — Best Multilingual + Emotion Control

Fish Audio S2 Pro ranks #1 on TTS-Arena2 with 80+ languages and 50+ inline emotion controls. Trained on 10M+ hours of audio.

- URL: fish.audio
- Free tier: 7 minutes/month
- Best for: multilingual content, emotionally nuanced narration, voice cloning
- License: research/non-commercial free; commercial use requires separate license
- Open-source model on HuggingFace: `fishaudio/s2-pro`

## Cartesia Sonic 3 — Real-Time Conversational TTS

Cartesia Sonic 3 is purpose-built for real-time conversational AI with ~40ms time-to-first-audio — the standard pick for voice agents and chatbots.

- URL: cartesia.ai
- Free tier available
- Latency: ~40ms TTFA (best-in-class for streaming)
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

## Chatterbox — Free & Open-Source, No Usage Caps

Chatterbox by Resemble AI is MIT-licensed and outperformed ElevenLabs in blind listener tests (63.8% preference). Zero-shot voice cloning with a few seconds of reference audio.

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
- `chatterbox-turbo` — fastest inference

**Homepage:** resemble.ai/chatterbox | **PyPI:** `pip install chatterbox-tts`

## Choosing Between Tools

| Need | Tool |
|------|------|
| Quick article summary, personal use | edge-tts (Azure, free) |
| Professional ad voiceover | ElevenLabs v3 or Inworld TTS-1.5 |
| Portuguese/Spanish natural voice | edge-tts Francisca / ElevenLabs multilingual |
| 80+ languages, emotion control | Fish Audio S2 Pro |
| Best blind-test naturalness (cloud) | Inworld AI TTS-1.5 Max |
| Voice cloning, no cost, offline | Chatterbox (open-source) |
| Voice cloning, cloud, easiest | ElevenLabs (paid) |
| Bulk generation (many files) | edge-tts or Chatterbox (no credit limits) |
| Real-time voice agent / chatbot | Cartesia Sonic 3 (~40ms TTFA), Smallest.ai Lightning V3.1 (<100ms), or Inworld TTS-1.5 |
| Enterprise production (uptime + pricing transparency) | Deepgram Aura-2 ($200 free credits to start) |
