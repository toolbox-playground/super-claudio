# Realistic AI Video Generation

> **Tool not chosen yet?** Go back to the `media-content-creation` skill — it will invoke
> `find-ai-tools` to search for current free options and let the user pick.
> This file is a workflow guide for *after* a tool has been selected.

## Tool Reference (may be outdated — always verify current pricing)

> Tools below are listed for reference. Free tiers change without notice.
> Use `find-ai-tools` for an up-to-date ranked list with honest free tier info.

| Tool | Input | Best For | Free Tier | URL |
|------|-------|----------|-----------|-----|
| **Hailuo 2.3** (MiniMax) | Text / Image | Cinematic, human motion, product | Limited free | hailuoai.video |
| **Kling 3.0 / O3** (Kuaishou) | Text / Image / Audio | Long clips (up to 2 min), native audio, multi-shot | Limited free | klingai.com |
| **Seedance 2.0** (ByteDance) | Text / Image / Audio | Fast generation, multi-shot, native audio | Limited free | seedance.io |
| **Google Veo 3.1** | Text / Image | 4K upscaling, native audio, First & Last Frame, 60s+ scenes | Via AI Studio | aistudio.google.com |
| **Runway Gen-3** | Text / Image / Video | Professional, fine control | Limited free | runwayml.com |

## Recommended Workflow (Hailuo / Kling)

1. Prepare a reference image if possible — results are significantly better than text-only.
2. Write a descriptive prompt: subject + action + environment + camera movement + style.
   - Good: "A woman in a red dress walks through a rainy Tokyo street at night, cinematic lighting, slow motion, shallow depth of field"
   - Bad: "woman walking"
3. Set aspect ratio to match target platform (9:16 for TikTok/Reels, 16:9 for YouTube).
4. Generate 2-3 variants and pick the best.
5. Download and use directly or pass to an editing tool.

## Prompt Tips for Realism

- Always include lighting description (golden hour, studio lighting, neon reflections)
- Specify camera movement (dolly in, tracking shot, static, handheld)
- Add "photorealistic", "8K", "cinematic" for quality
- For product videos: white/studio background → cleaner results

## Google AI Studio (Veo 3.1) — Free Access

1. Go to aistudio.google.com
2. Create a new prompt → select "Video" model (Veo 3.1)
3. Enter text prompt → generate
4. Free tier available with Google account; Veo 3.1 Lite is the most cost-effective variant; Veo 3.1 Fast for speed

## Notes

- All tools have usage limits on free tiers; paid plans give more credits
- Kling 3.0 / O3 has the longest clip duration (up to 2 minutes); O3 (Omni) is the premium variant with native multilingual audio
- Hailuo 2.3 tends to produce the most cinematic human motion
- Veo 3.1 added First & Last Frame control (define start + end state, AI fills the motion)
- Seedance 2.0 Fast is the most cost-effective option at ~$0.18 per 8-second clip
- For product ads specifically, see `ads.md`
