# Realistic AI Video Generation

Tools that generate photorealistic or cinematic video from text prompts or images.

## Tool Comparison

| Tool | Input | Best For | Free Tier | URL |
|------|-------|----------|-----------|-----|
| **Hailuo AI** (Higssfield) | Text / Image | Cinematic, human motion, product | Limited free | hailuoai.video |
| **Kling 2.x** (Kuaishou) | Text / Image | Long clips (up to 2 min), high quality | Limited free | klingai.com |
| **Seedance** (ByteDance) | Text / Image | Fast generation, social content | Limited free | — |
| **Google Veo 2** | Text / Image | High quality, Google ecosystem | Via AI Studio | aistudio.google.com |
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

## Google AI Studio (Veo 2) — Free Access

1. Go to aistudio.google.com
2. Create a new prompt → select "Video" model (Veo 2)
3. Enter text prompt → generate
4. Free tier available with Google account; high quality results

## Notes

- All tools have usage limits on free tiers; paid plans give more credits
- Kling has the longest clip duration (up to 2 minutes)
- Hailuo/Higssfield tends to produce the most cinematic human motion
- For product ads specifically, see `ads.md`
