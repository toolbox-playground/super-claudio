---
name: media-content-creation
description: >
  Media content creation skill. Use when the user wants to create, generate, or produce any kind
  of video, audio, or image. This is the main skill for all media generation tasks.
  Trigger on video: "I want to make a video", "create a TikTok video", "generate a realistic video",
  "make a promo video", "animate my photo", "create a video ad", "Remotion", "Higgsfield", "Kling",
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

## Step 1 — Identify the medium and intent

Identify which medium the user needs:
- **Video** — motion, cinematic, animation, or programmatic
- **Audio** — speech, narration, voiceover, or music
- **Image** — photo, graphic, diagram, animated visual

If the user's prompt covers multiple media types (e.g., "a video with voiceover"), start with
video, then handle audio as a second pass.

## Step 2 — Discover tools (ALWAYS do this unless a tool is already chosen)

**Do not assume which tool the user should use.** The AI tools landscape changes weekly —
tools go paid, free tiers shrink, better alternatives emerge. A tool that was free yesterday
may require a credit card today.

**Unless the user has already named the tool they want to use**, invoke the `find-ai-tools`
skill for the relevant category before routing to any reference file:

| Medium | find-ai-tools category to search |
|--------|----------------------------------|
| Realistic AI video | `video generation` |
| Programmatic / animated video | `programmatic video` or `animated video` |
| Video for ads | `AI video ads` |
| Text-to-speech / voiceover | `text to speech` |
| Music / jingles | `AI music generation` |
| Realistic images / product photos | `image generation` |
| Diagrams / infographics | `AI diagram` |
| Animating a static image | `image to video` or `AI animation` |

**What find-ai-tools will return:**
- A ranked top-5 list sorted by free access (Free > Freemium > Free Trial > Paid Only)
- Honest free tier details sourced from community (not vendor marketing)
- Flags when a tool claims "free trial" but requires a credit card from day one

**Present this list to the user and let them choose.** Do not pick for them.

## Step 3 — Execute with the chosen tool

Once the user has selected a tool, route to the matching reference file for the execution
workflow (prompt tips, API code, step-by-step instructions):

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

The reference files contain prompt tips, API code examples, and step-by-step workflows.
They are tool-agnostic where possible — adapt the workflow to whichever tool the user chose.

## When to skip Step 2

Skip the find-ai-tools search only when:
- The user explicitly names the tool ("use Kling", "use ElevenLabs", "use Remotion")
- The user is asking for programmatic/code-based video (Remotion) — no free-tier concern
- The user is using a tool that is genuinely free and local (edge-tts, Stable Diffusion local, FFmpeg)

## When to check for more tools

If find-ai-tools doesn't return enough options or the user's need is very niche,
invoke `super-claudio:discover-skills` to search community marketplaces.
