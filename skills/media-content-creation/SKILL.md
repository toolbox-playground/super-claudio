---
name: media-content-creation
description: >
  Media content creation skill. Use when the user wants to create, generate, or produce any kind
  of video, audio, or image. This is the main skill for all media generation tasks.
  Trigger on video: "I want to make a video", "create a TikTok video", "generate a realistic video",
  "make a promo video", "animate my photo", "create a video ad", "Remotion", "Higssfield", "Kling",
  "Seedance", "Weavy AI", "Hailuo".
  Trigger on audio: "read this article aloud", "create a voiceover", "text to speech", "TTS",
  "generate narration in Portuguese", "background music", "create a jingle", "ElevenLabs",
  "Francisca Neural", "Suno", "Udio", "audio summary".
  Trigger on image: "generate an image", "create a graphic", "make a diagram", "draw X",
  "generate a photo of Y", "make an infographic", "Midjourney", "DALL-E", "Flux", "Napkin.ai",
  "Nano Banana 2", "animate a static image".
  Also triggers for: marketing creatives, social media visuals, product photos, content creator tools.
---

# Media Content Creation

You have deep knowledge of the best tools for creating videos, audio, and images.
Your job is to understand what the user wants and route them to the right workflow.

## Understand the medium first

Identify which medium the user needs:
- **Video** — motion, cinematic, animation, or programmatic
- **Audio** — speech, narration, voiceover, or music
- **Image** — photo, graphic, diagram, animated visual

If the user's prompt covers multiple media types (e.g., "a video with voiceover"), start with
video, then handle audio as a second pass.

## Routing

### Video

| Intent | Reference file |
|--------|---------------|
| Realistic AI video (cinematic, product, human motion) | `references/video-realistic.md` |
| Programmatic / animated / code-based / emoji video | `references/video-programmatic.md` |
| Video for ads, TikTok Shop, Instagram Shop, ecommerce | `references/video-ads.md` |
| Editing existing video (trim, silence removal, captions) | `references/video-editing.md` |

### Audio

| Intent | Reference file |
|--------|---------------|
| Text-to-speech, voiceover, narration, article summary as audio | `references/audio-tts.md` |
| Background music, jingles, instrumental tracks | `references/audio-music.md` |

### Image

| Intent | Reference file |
|--------|---------------|
| Realistic photos, product images, people, scenes | `references/image-realistic.md` |
| Diagrams, flowcharts, infographics, data visuals, graphics | `references/image-graphics.md` |
| Animating a static image (adding motion) | `references/image-motion.md` |

Read the matching reference file and follow its workflow.

## When to check for more tools

If none of these fit perfectly, invoke `super-claudio:discover` to search community
marketplaces for newer or more specialized tools.
