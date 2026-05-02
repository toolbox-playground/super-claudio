---
name: summarize-as-audio
description: Summarize any URL or text as a 1-minute audio file using Azure Neural TTS — supports Portuguese, English, Spanish and 100+ languages
---

# Summarize as Audio

Turn any article, URL, or block of text into a concise 1-minute audio summary.

## Step 1: Get the content

If the user provided a URL → use WebFetch to get the article text.
If they pasted text → use it directly.

## Step 2: Summarize

Summarize the content to approximately 150-200 words (about 60 seconds at natural speaking pace).

Guidelines for the summary:
- Lead with the most important point
- Include 3-4 supporting points or key facts
- End with a clear takeaway or conclusion
- Write in spoken language (contractions OK, no bullet points)
- Match the language the user specified (default: Portuguese)

## Step 3: Generate audio

Use edge-tts (no API key required):

```bash
pip install edge-tts  # if not already installed
```

Portuguese (default — Francisca Neural):
```bash
edge-tts --voice pt-BR-FranciscaNeural --text "[summary text]" --write-media summary.mp3
```

English:
```bash
edge-tts --voice en-US-JennyNeural --text "[summary text]" --write-media summary.mp3
```

Spanish:
```bash
edge-tts --voice es-ES-ElviraNeural --text "[summary text]" --write-media summary.mp3
```

Other languages — list all voices:
```bash
edge-tts --list-voices | grep [language-code]
```

## Step 4: Play and share

Play immediately (macOS):
```bash
afplay summary.mp3
```

Play immediately (Linux):
```bash
mpg123 summary.mp3
```

The file is saved as `summary.mp3` in the current directory — ready to share via WhatsApp, Telegram, or any messaging app.
