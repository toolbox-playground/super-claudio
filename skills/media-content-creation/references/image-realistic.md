# Realistic & Artistic Image Generation

> **Tool not chosen yet?** Go back to the `media-content-creation` skill — it will invoke
> `find-ai-tools` to search for current free options and let the user pick.
> This file is a workflow guide for *after* a tool has been selected.

## Tool Reference (may be outdated — always verify current pricing)

> Tools below are listed for reference. Free tiers change without notice.
> Use `find-ai-tools` for an up-to-date ranked list with honest free tier info.

| Tool | Access | Best For | Free |
|------|--------|----------|
| **Midjourney v8.2** | midjourney.com | Artistic quality, concept art, portraits; v8.2 became the default version Jul 24 2026 (up from v8.1, default Jun 11–Jul 24 2026) — bolder/more sophisticated aesthetics, deeper Personalization (better reads on profiles with large point pools), Big Batch Draft Mode with `--sref random` for 24× faster style exploration | Paid (no free tier) |
| **Recraft V4.1** | recraft.ai | Logos, SVG vectors, brand assets, text rendering; V4.1 (Jun 2026): sharper photorealism, improved SVG vector accuracy, better text rendering and style consistency | Free tier |
| **Nano Banana 2** (Google / Gemini) | gemini.google.com | Product images, lifestyle scenes, ad creatives — default free model (Gemini 3.1 Flash Image); **#3 on Artificial Analysis Text-to-Image Arena (Elo 1322, Aug 2026)**, up from outside the top 5 in July | Free (Gemini app) |
| **Nano Banana 2 Lite** (Google / Gemini) | gemini.google.com, aistudio.google.com | Fastest & cheapest Google image model; 2.7× faster than Nano Banana 2 (~4 s); 1K resolution cap; **#5 on Artificial Analysis Image Arena (Elo 1261, July 2026)** — highest-ranked free model per dollar; released June 30, 2026 | Free (Google AI Studio); API: $0.034/image (batch: $0.017) |
| **Nano Banana Pro** (Google / Gemini 3 Pro Image) | gemini.google.com, aistudio.google.com | Complex compositions, highest Google image quality, 4K output — premium variant of Nano Banana | Paid (Google AI Pro/Ultra plans; 3 free gens/day for free users; API: $0.134/image) |
| **GPT Image 2** | ChatGPT / API | Complex instructions, text in images (99% accuracy), 4K resolution, 2× faster than predecessor; launched April 21, 2026; **#1 on Artificial Analysis Text-to-Image Arena (Elo ~1370, Aug 2026)** — also #1 in image editing arena, extending its lead since July | Limited (ChatGPT Plus) |
| **Grok Imagine Image 2.0** (xAI) | grok.com/imagine, Grok iOS/Android apps | Precise regional editing (magic-wand tool, segmentation, background removal), multi-reference generation (up to 5 input images), Smart Resize across 9 aspect ratios, sharper dense typography; shipped as new Quality Mode Aug 7, 2026; **#2 on Arena.ai in both text-to-image and image editing (Aug 2026)**, behind only GPT Image 2; API access "coming soon" | No free tier — xAI removed free image/video generation Mar 19, 2026; requires SuperGrok Lite ($10/mo) or higher |
| **Meta Muse Image** (Meta Superintelligence Labs) | meta.ai, Meta AI app, Instagram Stories (US), WhatsApp (limited countries) | Social-native image generation — text-to-image, multi-photo blending, @mention of public Instagram accounts for likeness reference, sketch-and-instruction editing, 30+ Instagram Story effects; agentic tool use (web search + coding invoked during generation); self-refinement at inference time (test-time compute scaling before delivering the final image); Content Seal invisible watermark; launched July 7, 2026; #2 on Arena.ai Text-to-Image Arena at launch (Elo 1280, July 2026) — since passed by Grok Imagine Image 2.0; no developer API at launch (Meta evaluating external access) | Free (consumer; subscription for power users via Meta AI subscription plans) |
| **MAI-Image-2.6** (Microsoft) | microsoft.ai (MAI Playground), Azure AI Foundry, arena.ai | Successor to MAI-Image-2.5/Flash — launched Aug 10, 2026; **#2 on the Arena text-to-image leaderboard (Elo 1336, from 3,488 votes)**, behind only GPT Image 2 and ahead of Google, Meta, and xAI models; +79 Elo over MAI-Image-2.5, biggest single-category gain in text rendering (+91); stronger portraits, 3D imagery, and commercial/photorealistic output; multi-reference support with richer grounding and more control over reasoning/format/resolution; live for blind voting on Arena at launch, with MAI Playground support and a Microsoft Foundry rollout following within days | Pricing not yet published for 2.6 at launch; MAI-Image-2.5 was $47/1M image output tokens standard, $33/1M Flash (no free tier) |
| **Luma Uni-1.1** (Luma AI) | lumalabs.ai | Reasoning-first unified model — reasons before rendering; 9 typed reference images (STYLE, CHARACTER, COMPOSITION, LIGHTING); tops Nano Banana 2 and GPT Image 1.5 on reasoning benchmarks; multilingual text in images (Chinese, Arabic, Japanese); #1 Elo for overall quality, style, and reference-based generation in human preference tests; Uni-1 launched March 2026; Uni-1.1 API opened May 5, 2026 | API: $0.0404/image (uni-1), $0.10/image (uni-1-max); reference images $0.003 each; no permanent free tier (Dream Machine legacy for trials) |
| **Reve 2.1** (Reve AI) | app.reve.com | Layout-first native 4K (true 16MP) generation — builds an editable, hierarchical layout before rendering, so you can fix a misplaced headline or resize one element without re-rolling; dedicated typography step keeps headlines, packaging labels, and captions crisp and correctly spelled; improved prompt understanding, world knowledge, and foreign-text rendering over 2.0; text-to-image, image editing, multi-reference composition; launched July 9, 2026; **#2 on Artificial Analysis Text-to-Image Arena (Elo ~1320s, Aug 2026)** — also #1 on the Image Editing Arena | Free tier (daily refresh); Lite $7.99/mo; Pro $19.99/mo |
| **Seedream 5.0** (ByteDance) | seed.bytedance.com, pixverse.ai | Fast photorealistic generation — 2K images in ~1.8s, up to 4K resolution, real-time web search grounding during generation, multi-step visual reasoning; strong for current-events-aware imagery | Limited free (via PixVerse) |
| **Seedream 5.0 Pro** (ByteDance) | seed.bytedance.com, byteplus.com, fal.ai | Precision editing + layered output — launched July 8, 2026; splits one render into 10+ transparent PNG layers (auto-fills occluded areas for maskless editing in Figma/Photoshop); pixel-level spatial grounding for interactive regional edits; multilingual text generation in 10+ languages (Chinese, English, French, German, Russian, Japanese, Korean, Spanish, Arabic — includes RTL layouts); realistic portrait textures and multi-person compositing; available via BytePlus API, Doubao/Jimeng consumer apps, fal.ai, and ComfyUI | API: $0.075/image ≤2.36MP; $0.150/image >2.36MP; $0.005 per extra input image |
| **Riverflow 2.0 Pro** (Sourceful) | openrouter.ai/sourceful/riverflow-v2-pro, runware.ai, wavespeed.ai | Photorealistic product mockups, packaging, ads, brand assets — #1 on Artificial Analysis Image Generation leaderboard (Feb 2026); 4K output, transparent background support, agentic precision for commercial imagery | API credits ($0.15/image 2K, $0.33/image 4K; no direct consumer site — API only) |
| **FLUX.2 [max]** (Black Forest Labs) | bfl.ai, fal.ai, openrouter.ai | Highest-quality FLUX model; Grounded Generation (retrieves real-time web context during image gen); up to 10 reference images for consistent products/characters/styles; #2 on Artificial Analysis Image Generation (behind Nano Banana Pro); open-source [dev] variant (32B params) released alongside | API credits ($0.07/mp first output mp, $0.03/mp subsequent; [dev]: open-weights, non-commercial) |
| **FLUX.2 [pro]** (Black Forest Labs) | bfl.ai, fal.ai | Photorealistic, product photography; solid quality tier below [max] | API credits |
| **FLUX.1 Kontext** (Black Forest Labs) | bfl.ai, fal.ai | In-context image editing — provide reference image + text instruction to edit it | API credits (Dev variant: open-weight, non-commercial) |
| **FLUX.2 [klein]** (Black Forest Labs) | bfl.ai, fal.ai, HuggingFace | Sub-second generation & editing; unified text-to-image + image editing; 4B and 9B variants; 4-step distilled inference; ~13GB VRAM for 4B — runs on RTX 3090/4070; supports multi-reference composition | 4B: Apache 2.0 (commercial use free); 9B: non-commercial |
| **HiDream-O1-Image-1.5** (HiDream.ai) | hidream.ai, HuggingFace (`HiDream-ai/HiDream-O1-Image`), WaveSpeed | Pixel-native reasoning model — no VAE or external text encoder; 8B Pixel-level Unified Transformer (UiT) processes text, images, and task conditions in one shared token space; supports text-to-image, image editing, and subject-driven personalization at up to 2048×2048; long-text rendering + multilingual layout control; **#4 on Artificial Analysis Text-to-Image Arena** (Elo 1264, July 2026); highest-ranked open-weight model on AA at launch (May 8, 2026, debuted #8) | MIT license (commercial use free); free on HuggingFace Spaces (no local GPU required); API via WaveSpeed |
| **Krea 2 Turbo / Raw** (Krea) | krea.ai, HuggingFace (krea/Krea-2-Turbo, krea/Krea-2-Raw) | 2-second 2K generation; 12B Diffusion Transformer open weights released June 22, 2026; Turbo is post-trained + distilled for maximum speed; Raw is base checkpoint for fine-tuning and research; aesthetic-first design; **Krea 2 Medium: #6 on Artificial Analysis Text-to-Image Arena (July 2026)** — #1 among independent research lab models; Krea 2 Community License | Community License: free for individuals + companies with <50 seats (requires technical safeguards); enterprise agreement required above 50 seats |
| **Stable Diffusion** | Local / Automatic1111 | Full control, local, free | Yes (local) |
| **Adobe Firefly Image 5** | firefly.adobe.com | Commercial safe, custom model training, 30+ third-party models (Runway, Google, OpenAI) in one workspace | Free tier (paid for full access; see notes) |
| **Ideogram 4.0** | ideogram.ai, Together AI | Text in images, posters, signage; first open-weight T2I model from Ideogram (9.3B params, Jun 3 2026); #1 text rendering (0.97 X-Omni OCR — highest among open-weight models); native 2K resolution; bounding-box layout control; color-palette conditioning (up to 16 hex colors); inference code Apache 2.0; model weights: non-commercial license | Free tier (ideogram.ai); API: $0.03 Turbo / $0.06 Default / $0.10 Quality per image |
| **Google Imagen 4** **(DEPRECATED — Imagen 4 endpoints shut down August 17, 2026; Imagen 3 already shut down June 24–30, 2026; migrate to Nano Banana / Gemini Image models)** | — | — | — |

## Nano Banana 2 — Top Pick for Product & Lifestyle Images

Google's Nano Banana 2 (Gemini 3.1 Flash Image) is available free in the Gemini app and across Google products (Search, Lens, AI Studio, Vertex AI). Particularly strong for:
- Placing products in realistic lifestyle contexts ("product on a kitchen counter", "model holding product")
- Generating ad-ready images with clean composition
- Ecommerce and social commerce content

**Access:** gemini.google.com (free) or aistudio.google.com

**Workflow:**
1. Prepare your product image (real photo)
2. Upload + write scene description: "product placed on a marble kitchen counter, morning light, minimalist style"
3. Generate several variants and pick the best
4. Use result directly or pass to Weavy AI / Kling for animation (see motion.md)

## Recraft V4.1 — Logos, Vectors & Brand Assets

Recraft V4.1 (released June 2026; upgrade from V4 released Feb 2026) tops the HuggingFace Text-to-Image Arena leaderboard (2026). V4.1 improvements: sharper photorealism, more accurate SVG vector output, improved text rendering and style consistency. Use it when you need:
- **Logos and icons** — generates editable SVG files (unique among AI image tools)
- **Typography and signage** — reliably renders legible text in designs
- **Brand-consistent visuals** — built-in brand styling with color/style locks

Access: recraft.ai (free tier available)

## FLUX.2 [pro] via fal.ai — Photorealistic API Access

```bash
pip install fal-client
```
```python
import fal_client
result = fal_client.run(
    "fal-ai/flux-pro/v1.1",  # check fal.ai for latest FLUX.2 model ID
    arguments={"prompt": "professional product photo, white background, studio lighting"}
)
print(result["images"][0]["url"])
```

## FLUX.1 Kontext — In-Context Image Editing

FLUX.1 Kontext from Black Forest Labs enables reference-image-guided editing: provide an existing image and a text instruction, and the model performs the edit while preserving context. Unlike inpainting, it understands the full scene. Adobe Photoshop (beta) uses it for generative fill.

- Best for: product image variations, background swaps, style transfer, object replacement
- Dev variant: open-weight, free for non-commercial use (`black-forest-labs/FLUX.1-Kontext-dev` on HuggingFace)
- Pro/Max variants: via bfl.ai API or fal.ai

## Prompt Formula for Realistic Images

```
[Subject] + [Action/Pose] + [Environment] + [Lighting] + [Camera] + [Style]
```

Example: "Young Brazilian woman holding a coffee cup, modern São Paulo café interior,
warm afternoon light, portrait lens, photorealistic, 4K"

## Adobe Firefly Image 5 — 2026 Updates

Firefly Image 5 (March 2026) adds custom model training — brands can train Firefly on their own visual style (stroke weight, color palette, character features) for consistent output. The Firefly web app now hosts 30+ third-party models (Google, Runway, OpenAI) in a single unified workspace. Firefly subscribers got unlimited generations on Adobe's own models in a promo through May 20, 2026; after that, credit-based billing resumes. Commercial use is covered by Adobe's IP indemnity.

## Meta Muse Image — Social-Native Generation (July 7, 2026)

Meta Superintelligence Labs launched Muse Image on July 7, 2026: Meta's first image generation model from MSL. It is deeply embedded in Meta's social graph — you can @mention public Instagram accounts to use them as reference images and compose scenes from your own photo library across Instagram, WhatsApp, and the Meta AI app. Agentic tool use means it can call web search or run code as part of a generation request. Test-time compute scaling refines the output before you see it.

- **Ranked #2** on Arena.ai text-to-image, single-image edit, and multi-image edit leaderboards (Elo 1280, July 2026)
- Available free at meta.ai and in the Meta AI app; Instagram Stories (US); WhatsApp (limited countries); Facebook rollout following
- Subscription plans for power users (Meta AI monthly plans)
- No developer API yet — Meta is still evaluating whether to open external access
- Content Seal invisible watermark embedded in all outputs
- Best for: social-first creators already in the Meta ecosystem; campaigns tapping Instagram social graph for reference imagery; Instagram Story effects workflows
- Not ideal for: developers needing programmatic access (no API yet); high-volume batch generation; print/4K quality output (use FLUX.2 [max] or GPT Image 2 for those)

## Grok Imagine Image 2.0 — Regional Editing & Multi-Reference (Aug 7, 2026)

xAI shipped Grok Imagine Image 2.0 on August 7, 2026 as the new Quality Mode on grok.com/imagine and in the Grok iOS/Android apps. It claims the #2 spot (behind GPT Image 2) on both the Arena.ai text-to-image and image-editing leaderboards as of launch.

- Magic-wand regional editing, segmentation, and background removal with transparency export
- Multi-reference generation from up to 5 input images in one request (no manual compositing)
- Smart Resize across 9 aspect ratios; sharper typography for dense, text-heavy compositions
- API access "coming soon" — currently app/web only
- **No free tier**: xAI removed free image/video generation on March 19, 2026; requires SuperGrok Lite ($10/mo) or higher
- Best for: teams already on X/Grok wanting fast targeted edits without a full re-render

## FLUX 3 — Black Forest Labs' Multimodal Successor (Announced Jul 23, 2026)

Black Forest Labs unveiled FLUX 3, a unified multimodal model spanning image, video (up to 20s with synced audio), and action/robotics prediction — a broader platform than the FLUX.2 line above. FLUX 3 Video reached general availability via API on August 4–5, 2026 ($0.06–$0.54/sec). **FLUX 3 Image is not yet generally available** — early access was described as "coming in the following weeks" as of early August 2026, with pricing not yet published. An open-weight FLUX 3 Dev variant is promised for later in 2026. Until FLUX 3 Image ships, FLUX.2 [max]/[pro] (table above) remain BFL's current production image models.

## DALL-E Retirement Note

DALL-E 2 and DALL-E 3 were retired by OpenAI on May 12, 2026. GPT Image 2 (already in the table above) is their replacement. Do not recommend DALL-E endpoints — they are deprecated.

## Google Imagen 4 Deprecation Note

Google is deprecating all Imagen model endpoints in two waves. Imagen 3 endpoints shut down June 24–30, 2026 (already complete). Imagen 4 endpoints (`imagen-4.0-generate-001`, `imagen-4.0-ultra-generate-001`, `imagen-4.0-fast-generate-001`) shut down August 17, 2026 — calls after that date fail with a hard error (no grace period). Migrate to Gemini Image models ("Nano Banana"): swap the model name from `imagen-*` to the corresponding `gemini-*-image` model in your API calls. Firebase AI Logic and Vertex AI users must update before August 17 or requests will fail. Google AI Studio provides a migration guide at firebase.google.com/docs/ai-logic/imagen-models-migration.

## Using Claude's Native Image Generation

Claude can generate images directly using its built-in image generation capability.
For quick concept visualization, just ask Claude to generate the image inline.
