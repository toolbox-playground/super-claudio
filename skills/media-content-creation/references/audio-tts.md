# Text-to-Speech & Voiceover Generation

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

## ElevenLabs — Premium Quality, Voice Cloning

ElevenLabs produces studio-quality speech and supports voice cloning.

**API usage:**
```python
from elevenlabs.client import ElevenLabs

client = ElevenLabs(api_key="your-key")
audio = client.generate(
    text="Hello! This is a test.",
    voice="Rachel",
    model="eleven_turbo_v2_5"
)
with open("output.mp3", "wb") as f:
    f.write(audio)
```

**Free tier:** 10,000 characters/month
**Best for:** High-quality voiceovers for ads or professional content
**Voice cloning:** Paid feature; clone any voice from a sample

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
| Professional ad voiceover | ElevenLabs Turbo v2.5 |
| Portuguese/Spanish natural voice | edge-tts Francisca / ElevenLabs multilingual |
| Voice cloning, no cost, offline | Chatterbox (open-source) |
| Voice cloning, cloud, easiest | ElevenLabs (paid) |
| Bulk generation (many files) | edge-tts or Chatterbox (no credit limits) |
