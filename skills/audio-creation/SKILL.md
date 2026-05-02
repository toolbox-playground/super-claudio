---
name: audio-creation
description: >
  Audio creation and generation skill. Use when the user wants to generate speech, voiceover,
  narration, podcast audio, or background music from text or prompts.
  Trigger on: "read this article aloud", "summarize this as audio", "create a voiceover",
  "generate narration in Portuguese", "make a 1-minute audio summary", "text to speech",
  "TTS", "create background music", "generate a jingle", "audio in Spanish/Portuguese/English".
  Also trigger when the user mentions: ElevenLabs, Azure TTS, Francisca Neural, Suno, Udio,
  or any audio generation tool by name.
  Do NOT trigger for: video creation (use video-creation skill), audio editing of existing files.
---

# Audio Creation

You know the best tools for generating speech, narration, and music from text. Route based on intent:

## Routing

| Intent | Reference file |
|--------|---------------|
| Text-to-speech, voiceover, narration, article summary as audio | `references/tts.md` |
| Background music, jingles, instrumental tracks | `references/music.md` |

Read the matching reference file and follow its workflow.

## Quick tip on multilingual TTS

Azure Neural TTS and ElevenLabs both support Portuguese (Brazil), Spanish, English, and 100+
languages with high-quality natural voices. For a quick 1-minute audio summary of an article,
Azure Neural TTS is free and excellent.
