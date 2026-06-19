# Realistic AI Video Generation

> **Tool not chosen yet?** Go back to the `media-content-creation` skill — it will invoke
> `find-ai-tools` to search for current free options and let the user pick.
> This file is a workflow guide for *after* a tool has been selected.

## Tool Reference (may be outdated — always verify current pricing)

> Tools below are listed for reference. Free tiers change without notice.
> Use `find-ai-tools` for an up-to-date ranked list with honest free tier info.

| Tool | Input | Best For | Free Tier | URL |
|------|-------|----------|-----------|-----|
| **LTX-2 Fast** (Lightricks) | Text / Image / First+Last Frame | Fastest generation; 19B params; native 4K at 50fps; up to 20s; synchronized audio+video in one pass; LTX-2.3 (Mar 2026): sharper VAE + portrait 9:16; #1 llm-stats.com Text-to-Video Arena (May 2026, 2358 Elo) | Free (ltx.studio: 800 one-time credits, personal use; open weights: commercial free for <$10M ARR) | ltx.io, ltx.studio |
| **HappyHorse-1.0** (Alibaba / ATH) | Text / Image | Temporal consistency — objects & faces stay identical frame-to-frame; #1 T2V no-audio (Elo 1359), #1 I2V no-audio (Elo 1392), #1 T2V with-audio (Elo 1213) on Artificial Analysis (June 2026) | API credits | fal.ai |
| **SkyReels V4** (Skywork / Kuaishou) | Text / Image | Native dual-stream audio+video, 1080p/32FPS, 15s clips, 93% character consistency, <120ms audio alignment; #2 Artificial Analysis Text-to-Video+Audio Arena (June 2026, Elo 1110); first open-source model with unified audio+video | Open-source (Apache 2.0); limited free via wavespeed.ai | wavespeed.ai |
| **Hailuo 2.3** (MiniMax) | Text / Image | Cinematic, human motion, product | Limited free | hailuoai.video |
| **Kling 3.0 / O3** (Kuaishou) | Text / Image / Audio | Long clips (up to 2 min), native 4K (not upscaled), native audio, multi-shot | Limited free | klingai.com |
| **Seedance 2.0** (ByteDance) | Text / Image / Audio | Fast generation, multi-shot, native audio; #1 Artificial Analysis T2V with-audio (Elo 1215) and I2V with-audio (Elo 1194); #2 T2V no-audio (Elo 1274) — June 2026 | Limited free | seedance.io |
| **Wan 2.7** (Alibaba Cloud) | Text / Image / First+Last Frame / Video Edit | Multi-shot narrative, first/last frame control (FLF2V), instruction-based video editing, reference-to-video with voice cloning, thinking mode — most complete open-source video stack | Limited free (wan.video); API via fal.ai | wan.video, fal.ai |
| **Google Veo 3.1** | Text / Image | 4K upscaling, native audio, First & Last Frame, 60s+ scenes | Free (Google Vids, any Google account); AI Studio | aistudio.google.com, vids.google.com |
| **Runway Gen-4.5** | Text / Image / Video | World-consistent characters, native audio (added May 2026: dialogue + ambient SFX synthesized per-frame), post-generation editing (Aleph), node-based workflows | Limited free | runwayml.com |
| **Pika 2.5** (Pika Labs) | Text / Image / Video | Creative transformations: Pikaswaps (replace objects/characters), Pikaffects (melt, explode, inflate), Pikadditions (add elements to footage) | Free (80 credits/mo, 480p; watermarked) | pika.art |
| **Luma Ray 3.14** (Luma AI) | Text / Image / Video | Reasoning model, native HDR, 1080p output, Draft Mode (low-res preview before full render), 4x faster than Ray 3 | Free (8 draft videos, non-commercial); Plus $30/mo | lumalabs.ai |
| **Vidu Q3** (Shengshu / Tsinghua TSAIL) | Text / Image | 16s clips, native audio+video in one pass, multilingual lip sync, Smart Cuts (auto camera switches), 1080p | Free (80 credits ~20 clips); Standard ~$10/mo | vidu.com |
| **Grok Imagine Video 1.5** (xAI) | Text / Image / Reference / Extend / Modify | 6 workflows in one: T2V, I2V, reference (up to 3 ref images), extend, modify, edit; native audio with lip-sync, ambient SFX; #2 I2V with-audio (Elo 1110) on Artificial Analysis (June 2026); SuperGrok: 30s at 720p | API: $0.14/s at 720p (1.5 preview); SuperGrok subscription for consumer use | x.ai/api, grok.com/imagine |
| **PixVerse V6** | Text / Image / Multi-Ref | 20+ cinematic camera controls (aperture, DoF, lens distortion, chromatic aberration, crane/dolly, perspective shift); multi-shot engine with native audio in single pass; character consistency across shots via multi-image reference; agentic CLI (Claude Code, Codex, Cursor); #4 I2V no-audio (Elo 1325) on Artificial Analysis (June 2026) | Free tier | pixverse.ai |
| **Gemini Omni Flash** (Google) | Text / Image / Video / Audio | Multimodal conversational video creation — generates up to 10s clips with synchronized audio from any combination of text, images, video clips, and voice inputs; iterative conversational editing ("change lighting to golden hour" → "slow the camera push") without re-rendering from scratch; launched Google I/O May 19, 2026 | Free (YouTube Shorts Remix, YouTube Create for users 18+); Google AI Plus/Pro/Ultra via Gemini app and Google Flow; API access announced for developers post-launch | gemini.google.com, youtube.com/create |

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

## Google AI Studio / Google Vids (Veo 3.1) — Free Access

**Option A — Google Vids (easiest, no code):**
1. Go to vids.google.com — sign in with any Google account
2. Create a new video project → insert an AI-generated clip
3. Enter a text or image prompt → generate using Veo 3.1
4. Free for all Google account holders; AI Pro/Ultra subscribers get up to 1,000 Veo clips/month

**Option B — AI Studio (developer access):**
1. Go to aistudio.google.com
2. Create a new prompt → select "Video" model (Veo 3.1)
3. Enter text prompt → generate
4. Veo 3.1 Lite is the most cost-effective variant (Vertex AI, May 2026: <50% the cost of Veo 3.1 Fast at same quality); Veo 3.1 Fast for speed

## Notes

- All tools have usage limits on free tiers; paid plans give more credits
- HappyHorse-1.0 has no standalone consumer site — access via fal.ai API at $0.14/s (720p) or $0.28/s (1080p); as of June 2026, holds #1 on Artificial Analysis for T2V with-audio (Elo 1213), T2V no-audio (Elo 1359), and I2V no-audio (Elo 1392); 15B unified Transformer with joint audio-video generation; multilingual lip-sync in 7 languages (English, Mandarin, Cantonese, Japanese, Korean, German, French); 4 API endpoints on fal.ai: text-to-video, image-to-video, reference-to-video, and video-edit
- SkyReels V4 (Skywork / Kuaishou, February 25, 2026): first open-source model with native dual-stream audio+video generation (MMDiT architecture); 1080p/32FPS, 15-second clips, 93% character consistency, <120ms audio alignment; #2 on Artificial Analysis Text-to-Video with Audio Arena (June 2026, Elo 1110); available on wavespeed.ai for testing
- Kling 3.0 / O3 has the longest clip duration (up to 2 minutes); native 4K output is pixel-perfect (not upscaled) — launched February 4, 2026; O3 (Omni) is the premium variant with native multilingual audio
- Hailuo 2.3 tends to produce the most cinematic human motion
- Veo 3.1 added First & Last Frame control (define start + end state, AI fills the motion); **Veo 3.1 Lite** (Vertex AI, May 2026) runs at <50% the cost of Veo 3.1 Fast — same quality, optimized for high-volume use; **Google Vids** (vids.google.com) now provides free Veo 3.1 generation to any Google account holder — up to 1,000 videos/month for AI Pro/Ultra subscribers
- Seedance 2.0 Fast is the most cost-effective option at ~$0.18 per 8-second clip; ranked #1 on Artificial Analysis Text-to-Video with Audio Arena (June 2026, Elo 1215) and Image-to-Video with Audio Arena (Elo 1194); #2 T2V no-audio (Elo 1274) — HappyHorse-1.0 leads the no-audio rankings
- Runway Gen-4.5 leads the Artificial Analysis Text-to-Video benchmark (1,247 Elo); Aleph enables post-generation edits via text prompt without re-rendering; native audio added in May 2026 update: dialogue, ambient soundscapes, and environmental SFX are synthesized frame-by-frame in one pass — no separate audio step needed
- Pika 2.5 is the best pick for creative/destructive transformations on existing footage — not for cinematic realism; commercial use requires paid plan
- Luma Ray 3.14 (released January 26, 2026) is the first reasoning video model: it plans composition before rendering; native HDR output; Draft Mode lets you preview at low cost before committing credits to the final 1080p render; 3x lower cost than Ray 3; free tier is non-commercial only
- Vidu Q3 (released January 30, 2026) by Shengshu Technology (Tsinghua TSAIL) generates up to 16-second clips with fully synchronized native audio and video in one pass — no separate audio stitching needed; Smart Cuts system auto-switches camera angles within a single generation; was ranked #1 in China and #2 globally on the Artificial Analysis Video Arena when Sora 2 was active; with Sora 2 shut down (April 2026) and Seedance 2.0 / HappyHorse-1.0 rising, Vidu Q3 is no longer in the AA global top 5 as of June 2026; vidu.com
- Wan 2.7 (Alibaba Cloud) released April 6, 2026 as four models: t2v, i2v, r2v (reference-to-video + voice cloning), and videoedit (instruction-based editing of existing clips); first/last frame control (FLF2V — currently the only major AI video model with this); 9-grid multi-scene generation; thinking mode for complex prompts; 1080p up to 15 seconds; Apache 2.0 open-source (27B params, MoE); API at $0.10/s (720p) or $0.15/s (1080p); limited free tier at wan.video; **Wan 3.0 now available via API (Together AI, April 2026)**: 60B-param MoE diffusion transformer (14B active per pass), native 4K, up to 30-second clips, automated 2–5 minute multi-shot narratives from a single prompt; open weights (Apache 2.0) expected Q3 2026 (not yet released as of June 2026)
- LTX-2 (Lightricks, open-source): 19B-parameter multimodal model ranked #1 on llm-stats.com Text-to-Video Arena (May 2026, 2358 Elo); LTX-2.3 (March 2026) added a new VAE architecture for sharper details, cleaner native audio, and portrait 9:16 support; weights on HuggingFace (Apache 2.0 for companies under $10M ARR, commercial license required above that); LTX Studio at ltx.studio provides a web UI with 800 one-time free credits (personal use only); LTX-2 Fast optimizes for speed, LTX-2.3 Pro for maximum quality
- Sora 2 (OpenAI) — launched September 30, 2025; web/app shut down April 26, 2026; API sunset September 24, 2026 — do not recommend
- Grok Imagine Video (xAI) launched February 3, 2026 (original) as xAI's first video generation model; 1.5 preview API released June 3, 2026 (model alias `grok-imagine-video-1.5-2026-05-30`); supports 6 workflows — Text-to-Video, Image-to-Video, Reference (multi-image guided), Extend (continue existing clip), Modify (edit clip), and full Edit suite; up to 10 seconds standard, 30 seconds with SuperGrok subscription; native audio generation including dialogue with accurate lip-sync, ambient sounds, and SFX in one pass; original pricing: $0.07/s at 720p, $0.05/s at 480p; 1.5 preview: $0.08/s at 480p, $0.14/s at 720p; consumer access: grok.com/imagine; API: x.ai/api; also available via PixVerse (collaboration); ranked #2 I2V with-audio (Elo 1110) on Artificial Analysis (June 2026)
- PixVerse V6 (released March 30, 2026) — achieved unicorn status after Series C in March 2026; 20+ cinematic camera controls beyond basic pan/tilt: focal length, aperture, depth-of-field, lens distortion, chromatic aberration, vignetting, crane/dolly movements, and mid-clip perspective shifts; multi-shot engine manages transitions between camera angles while maintaining environment and character consistency; native audio and video generated simultaneously in a single pass; multi-image reference for character consistency across shots; 1080p / 15-second clips; developer CLI compatible with Claude Code, Codex CLI, Cursor, and other coding agents; ranked #4 I2V no-audio (Elo 1325) on Artificial Analysis (June 2026); pixverse.ai
- Gemini Omni Flash (Google, announced Google I/O May 19, 2026): distinct from Veo 3.1 — accepts text, images, video clips, and voice simultaneously as inputs; generates up to 10-second clips with synchronized audio; key differentiator is conversational editing — generate a clip, then refine iteratively via natural language ("change lighting to golden hour" → done → "add slow camera push" → done) without re-generating from scratch; free via YouTube Shorts Remix and YouTube Create for users 18+; Google AI Plus/Pro/Ultra subscribers access via Gemini app and Google Flow; API access for developers announced post-launch
- For product ads specifically, see `ads.md`
