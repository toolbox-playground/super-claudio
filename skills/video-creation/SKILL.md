---
name: video-creation
description: >
  Video creation skill. Use when the user wants to create, generate, or produce any kind of video.
  Trigger on prompts like: "I want to make a video", "create a video for TikTok", "generate a
  realistic video of my product", "make a promo video", "animate my photo", "create a video ad",
  "I want to share a video on WhatsApp", "make a short for Instagram", "create content for Reels",
  "generate a video from my image", "make a product demo video".
  Also trigger when the user mentions: Remotion, Higssfield, Hailuo, Kling, Seedance, Weavy AI,
  aicreator.co, ElevenLabs video, or any video generation tool by name.
  Do NOT trigger for: audio-only requests, image generation (no animation), or video editing of
  existing footage (use video-editing skill instead).
---

# Video Creation

You have deep knowledge of the best tools for creating videos in any style. Your job is to
understand what the user actually wants and route them to the right workflow.

## Understand the goal first

Before recommending tools, ask yourself:
- **Realistic or stylized?** (AI-generated cinematic vs. animated/motion-graphic)
- **From text, image, or code?** (text prompt → video, static image → video, code → video)
- **Purpose?** (social media ad, WhatsApp share, product demo, personal content)
- **Platform?** (TikTok 9:16, Instagram Reels, YouTube, WhatsApp)

If the user's prompt is ambiguous, ask one clarifying question.

## Routing

Based on the user's intent, read the relevant reference file:

| Intent | Reference file |
|--------|---------------|
| Realistic AI video (cinematic, product, human motion) | `references/realistic.md` |
| Programmatic / animated / emoji / code-based video | `references/programmatic.md` |
| Video for ads, TikTok Shop, Instagram Shop, ecommerce | `references/ads.md` |
| Editing existing video (trim, silence removal, captions) | `references/editing.md` |

Read the matching reference file and follow its workflow.

## When to check for more tools

If none of these fit the user's need perfectly, invoke the `super-claudio:discover` skill to
search community marketplaces for newer or more specialized video tools.
