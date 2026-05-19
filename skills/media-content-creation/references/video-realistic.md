# Realistic AI Video Generation

> **Tool not chosen yet?** Go back to the `media-content-creation` skill — it will invoke
> `find-ai-tools` to search for current free options and let the user pick.
> This file is a workflow guide for *after* a tool has been selected.

## Tool Reference (may be outdated — always verify current pricing)

> Tools below are listed for reference. Free tiers change without notice.
> Use `find-ai-tools` for an up-to-date ranked list with honest free tier info.

| Tool | Input | Best For | Free Tier | URL |
|------|-------|----------|-----------|-----|
| **HappyHorse-1.0** (Alibaba / ATH) | Text / Image | Temporal consistency — objects & faces stay identical frame-to-frame; #1 Artificial Analysis Video Arena (April 2026) | API credits | fal.ai |
| **Hailuo 2.3** (MiniMax) | Text / Image | Cinematic, human motion, product | Limited free | hailuoai.video |
| **Kling 3.0 / O3** (Kuaishou) | Text / Image / Audio | Long clips (up to 2 min), native audio, multi-shot | Limited free | klingai.com |
| **Seedance 2.0** (ByteDance) | Text / Image / Audio | Fast generation, multi-shot, native audio | Limited free | seedance.io |
| **Wan 2.7** (Alibaba Cloud) | Text / Image / First+Last Frame / Video Edit | Multi-shot narrative, first/last frame control (FLF2V), instruction-based video editing, reference-to-video with voice cloning, thinking mode — most complete open-source video stack | Limited free (wan.video); API via fal.ai | wan.video, fal.ai |
| **Google Veo 3.1** | Text / Image | 4K upscaling, native audio, First & Last Frame, 60s+ scenes | Via AI Studio | aistudio.google.com |
| **Runway Gen-4.5** | Text / Image / Video | World-consistent characters, post-generation editing (Aleph), node-based workflows | Limited free | runwayml.com |
| **Pika 2.5** (Pika Labs) | Text / Image / Video | Creative transformations: Pikaswaps (replace objects/characters), Pikaffects (melt, explode, inflate), Pikadditions (add elements to footage) | Free (80 credits/mo, 480p; watermarked) | pika.art |
| **Luma Ray 3.14** (Luma AI) | Text / Image / Video | Reasoning model, native HDR, 1080p output, Draft Mode (low-res preview before full render), 4x faster than Ray 3 | Free (8 draft videos, non-commercial); Plus $30/mo | lumalabs.ai |
| **Vidu Q3** (Shengshu / Tsinghua TSAIL) | Text / Image | 16s clips, native audio+video in one pass, multilingual lip sync, Smart Cuts (auto camera switches), 1080p; ranked #2 globally (Artificial Analysis, 2026) | Free (80 credits ~20 clips); Standard ~$10/mo | vidu.com |

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
- HappyHorse-1.0 has no standalone consumer site — access via fal.ai API at $0.14/s (720p) or $0.28/s (1080p); it topped Artificial Analysis Video Arena in April 2026 for both Text-to-Video and Image-to-Video
- Kling 3.0 / O3 has the longest clip duration (up to 2 minutes); O3 (Omni) is the premium variant with native multilingual audio
- Hailuo 2.3 tends to produce the most cinematic human motion
- Veo 3.1 added First & Last Frame control (define start + end state, AI fills the motion)
- Seedance 2.0 Fast is the most cost-effective option at ~$0.18 per 8-second clip
- Runway Gen-4.5 leads the Artificial Analysis Text-to-Video benchmark (1,247 Elo); Aleph enables post-generation edits via text prompt without re-rendering
- Pika 2.5 is the best pick for creative/destructive transformations on existing footage — not for cinematic realism; commercial use requires paid plan
- Luma Ray 3.14 (released January 26, 2026) is the first reasoning video model: it plans composition before rendering; native HDR output; Draft Mode lets you preview at low cost before committing credits to the final 1080p render; 3x lower cost than Ray 3; free tier is non-commercial only
- Vidu Q3 (released January 30, 2026) by Shengshu Technology (Tsinghua TSAIL) generates up to 16-second clips with fully synchronized native audio and video in one pass — no separate audio stitching needed; Smart Cuts system auto-switches camera angles within a single generation; ranked #1 in China and #2 globally by Artificial Analysis; vidu.com
- Wan 2.7 (Alibaba Cloud) released April 6, 2026 as four models: t2v, i2v, r2v (reference-to-video + voice cloning), and videoedit (instruction-based editing of existing clips); first/last frame control (FLF2V — currently the only major AI video model with this); 9-grid multi-scene generation; thinking mode for complex prompts; 1080p up to 15 seconds; Apache 2.0 open-source (27B params, MoE); API at $0.10/s (720p) or $0.15/s (1080p); limited free tier at wan.video; Wan 3.0 pre-announced (60B params, 4K resolution, 30-second clips, expected mid-2026)
- Sora (OpenAI) web/app discontinued April 2026; API sunset September 2026 — do not recommend
- For product ads specifically, see `ads.md`
