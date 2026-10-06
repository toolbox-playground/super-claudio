# Realistic & Artistic Image Generation

> **Tool not chosen yet?** Go back to the `media-content-creation` skill — it will invoke
> `find-ai-tools` to search for current free options and let the user pick.
> This file is a workflow guide for *after* a tool has been selected.

## Tool Reference (may be outdated — always verify current pricing)

> Tools below are listed for reference. Free tiers change without notice.
> Use `find-ai-tools` for an up-to-date ranked list with honest free tier info.

| Tool | Access | Best For | Free |
|------|--------|----------|
| **Midjourney v8.2** | midjourney.com | Artistic quality, concept art, portraits; v8.2 became the default Jul 24 2026 (v8.1 retired same day) — bolder default aesthetics, rebuilt personalization engine (adapts more from your ratings), Omni-Reference tool, fewer low-quality misfires; first V8.2 image-editing model (blends up to 4 image references, repaints/extends regions from text instructions) opened public testing Aug 27 2026; v8.1 (Apr 30–Jul 23 2026) was the prior speed update — 5× faster than v7, native 2K resolution, HD mode affordable as default | Paid (no free tier) |
| **Recraft V4.1** | recraft.ai | Logos, SVG vectors, brand assets, text rendering; V4.1 (Jun 2026): sharper photorealism, improved SVG vector accuracy, better text rendering and style consistency | Free tier |
| **Nano Banana 2** (Google / Gemini) | gemini.google.com | Product images, lifestyle scenes, ad creatives — default free model (Gemini 3.1 Flash Image) | Free (Gemini app) |
| **Nano Banana 2 Lite** (Google / Gemini) | gemini.google.com, aistudio.google.com | Fastest & cheapest Google image model; 2.7× faster than Nano Banana 2 (~4 s); 1K resolution cap; **#5 on Artificial Analysis Image Arena (Elo 1261, July 2026)** — highest-ranked free model per dollar; released June 30, 2026 | Free (Google AI Studio); API: $0.034/image (batch: $0.017) |
| **Nano Banana Pro** (Google / Gemini 3 Pro Image) | gemini.google.com, aistudio.google.com | Complex compositions, highest Google image quality, 4K output — premium variant of Nano Banana | Paid (Google AI Pro/Ultra plans; 3 free gens/day for free users; API: $0.134/image) |
| **GPT Image 2.5** (Flare & Sunburst) | ChatGPT / API | Complex instructions, text in images, 4K resolution; replaced GPT Image 2 as ChatGPT's default image model Sep 8, 2026 — Flare is the fast variant (up to 50% lower latency than Images 2.0), Sunburst is the precision/editing variant (better multi-turn edit consistency, stronger subject preservation); Sunburst took #1 on Artificial Analysis Text-to-Image Arena within days of launch, surpassing GPT Image 2's prior #1 (Elo ~1339, July 2026); GPT Image 2 (launched April 21, 2026) remains available in the API with no retirement date announced | Limited (ChatGPT Plus); API: $30/1M output tokens (both variants, same rate as GPT Image 2) |
| **Grok Imagine Image 2.0** (xAI) | grok.com/imagine, Grok apps (iOS/Android) | Text-to-image plus reference-image editing with regional precision edits (modify one area without a full regen), magic-wand background removal, up to 5 reference images; replaced the original Grok Imagine as the default Quality Mode Aug 7–8, 2026; xAI claims #2 worldwide (behind GPT Image 2) on LMArena's text-to-image and image-editing leaderboards | API: $0.04/image; free-tier access via Grok apps |
| **Meta Muse Image** (Meta Superintelligence Labs) | meta.ai, Meta AI app, Instagram Stories (US), WhatsApp (limited countries) | Social-native image generation — text-to-image, multi-photo blending, @mention of public Instagram accounts for likeness reference, sketch-and-instruction editing, 30+ Instagram Story effects; agentic tool use (web search + coding invoked during generation); self-refinement at inference time (test-time compute scaling before delivering the final image); Content Seal invisible watermark; launched July 7, 2026; **#2 on Arena.ai Text-to-Image Arena (Elo 1280, July 2026)** — also #2 in single-image edit and multi-image edit arenas; no developer API at launch (Meta evaluating external access) | Free (consumer; subscription for power users via Meta AI subscription plans) |
| **MAI-Image-2.6 / Flash** (Microsoft) | microsoft.ai (MAI Playground), openrouter.ai/microsoft/mai-image-2.6, Azure AI Foundry | High-quality generation and precise localized editing; announced Aug 10, 2026, reached public preview on Azure AI Foundry Sep 4, 2026 — #2 on Arena text-to-image (Elo 1336, +79 over MAI-Image-2.5), biggest gains in Text Rendering (+91) and 3D/modeling; Flash variant generates 2×+ faster than GPT Image 2 (Medium); rolling out to MAI Playground, Microsoft Foundry, and further Microsoft products | No free tier (API: $38/1M image output tokens standard, down from $47 for 2.5; text input $5/1M, image input $8/1M) |
| **Luma Uni-1.1** (Luma AI) | lumalabs.ai | Reasoning-first unified model — reasons before rendering; 9 typed reference images (STYLE, CHARACTER, COMPOSITION, LIGHTING); tops Nano Banana 2 and GPT Image 1.5 on reasoning benchmarks; multilingual text in images (Chinese, Arabic, Japanese); #1 Elo for overall quality, style, and reference-based generation in human preference tests; Uni-1 launched March 2026; Uni-1.1 API opened May 5, 2026 | API: $0.0404/image (uni-1), $0.10/image (uni-1-max); reference images $0.003 each; no permanent free tier (Dream Machine legacy for trials) |
| **Reve 2.0** (Reve AI) | app.reve.com | Layout-first 4K generation — builds an editable code-based layout before rendering, so you can fix a misplaced headline or resize one element without re-rolling; dedicated typography step keeps headlines, packaging labels, and captions crisp and correctly spelled; text-to-image, image editing, multi-reference composition; native 4K output; debuted #2 on Image Arena (score 1280, launched June 3, 2026) | Free tier (daily refresh); Lite $7.99/mo; Pro $19.99/mo |
| **Seedream 5.0** (ByteDance) | seed.bytedance.com, pixverse.ai | Fast photorealistic generation — 2K images in ~1.8s, up to 4K resolution, real-time web search grounding during generation, multi-step visual reasoning; strong for current-events-aware imagery | Limited free (via PixVerse) |
| **Seedream 5.0 Pro** (ByteDance) | seed.bytedance.com, byteplus.com, fal.ai | Precision editing + layered output — launched July 8, 2026; splits one render into 10+ transparent PNG layers (auto-fills occluded areas for maskless editing in Figma/Photoshop); pixel-level spatial grounding for interactive regional edits; multilingual text generation in 10+ languages (Chinese, English, French, German, Russian, Japanese, Korean, Spanish, Arabic — includes RTL layouts); realistic portrait textures and multi-person compositing; available via BytePlus API, Doubao/Jimeng consumer apps, fal.ai, and ComfyUI | API: $0.075/image ≤2.36MP; $0.150/image >2.36MP; $0.005 per extra input image |
| **Riverflow 2.0 Pro** (Sourceful) | openrouter.ai/sourceful/riverflow-v2-pro, runware.ai, wavespeed.ai | Photorealistic product mockups, packaging, ads, brand assets — #1 on Artificial Analysis Image Generation leaderboard (Feb 2026); 4K output, transparent background support, agentic precision for commercial imagery | API credits ($0.15/image 2K, $0.33/image 4K; no direct consumer site — API only) |
| **FLUX 3 Image** (Black Forest Labs) | bfl.ai (API only) | New flagship FLUX model — bounding-box composition (place named elements on a 0–1000 grid at any aspect ratio), native 4K (~16MP, no separate upscale pass), up to 10 reference images, multi-step local editing; part of the broader FLUX 3 multimodal family (video/action variants, early access) announced Jul 23, 2026; FLUX 3 Image itself released Oct 1, 2026 | API credits ($0.041/image at 768px up to $0.607/image at 4K; 50% launch discount through Oct 8, 2026) |
| **FLUX.2 [max]** (Black Forest Labs) | bfl.ai, fal.ai, openrouter.ai | Highest-quality FLUX model prior to FLUX 3 Image; Grounded Generation (retrieves real-time web context during image gen); up to 10 reference images for consistent products/characters/styles; #2 on Artificial Analysis Image Generation (behind Nano Banana Pro); open-source [dev] variant (32B params) released alongside | API credits ($0.07/mp first output mp, $0.03/mp subsequent; [dev]: open-weights, non-commercial) |
| **FLUX.2 [pro]** (Black Forest Labs) | bfl.ai, fal.ai | Photorealistic, product photography; solid quality tier below [max] | API credits |
| **FLUX.1 Kontext** (Black Forest Labs) | bfl.ai, fal.ai | In-context image editing — provide reference image + text instruction to edit it | API credits (Dev variant: open-weight, non-commercial) |
| **FLUX.2 [klein]** (Black Forest Labs) | bfl.ai, fal.ai, HuggingFace | Sub-second generation & editing; unified text-to-image + image editing; 4B and 9B variants; 4-step distilled inference; ~13GB VRAM for 4B — runs on RTX 3090/4070; supports multi-reference composition | 4B: Apache 2.0 (commercial use free); 9B: non-commercial |
| **HiDream-O1-Image-1.5** (HiDream.ai) | hidream.ai, HuggingFace (`HiDream-ai/HiDream-O1-Image`), WaveSpeed | Pixel-native reasoning model — no VAE or external text encoder; 8B Pixel-level Unified Transformer (UiT) processes text, images, and task conditions in one shared token space; supports text-to-image, image editing, and subject-driven personalization at up to 2048×2048; long-text rendering + multilingual layout control; **#4 on Artificial Analysis Text-to-Image Arena** (Elo 1264, July 2026); highest-ranked open-weight model on AA at launch (May 8, 2026, debuted #8) | MIT license (commercial use free); free on HuggingFace Spaces (no local GPU required); API via WaveSpeed |
| **Krea 2 Turbo / Raw** (Krea) | krea.ai, HuggingFace (krea/Krea-2-Turbo, krea/Krea-2-Raw) | 2-second 2K generation; 12B Diffusion Transformer open weights released June 22, 2026; Turbo is post-trained + distilled for maximum speed; Raw is base checkpoint for fine-tuning and research; aesthetic-first design; **Krea 2 Medium: #6 on Artificial Analysis Text-to-Image Arena (July 2026)** — #1 among independent research lab models; Krea 3 (editing-focused foundation model) and Krea Agents previewed Aug 2026, not yet generally available; Krea 2 Community License | Community License: free for individuals + companies with <50 seats (requires technical safeguards); enterprise agreement required above 50 seats |
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
- Not ideal for: developers needing programmatic access (no API yet); high-volume batch generation; print/4K quality output (use FLUX.2 [max], FLUX 3 Image, or GPT Image 2.5 for those)

## DALL-E Retirement Note

DALL-E 2 and DALL-E 3 were retired by OpenAI on May 12, 2026. GPT Image 2 (already in the table above) is their replacement. Do not recommend DALL-E endpoints — they are deprecated.

## Google Imagen 4 Deprecation Note

Google is deprecating all Imagen model endpoints in two waves. Imagen 3 endpoints shut down June 24–30, 2026 (already complete). Imagen 4 endpoints (`imagen-4.0-generate-001`, `imagen-4.0-ultra-generate-001`, `imagen-4.0-fast-generate-001`) shut down August 17, 2026 — calls after that date fail with a hard error (no grace period). Migrate to Gemini Image models ("Nano Banana"): swap the model name from `imagen-*` to the corresponding `gemini-*-image` model in your API calls. Firebase AI Logic and Vertex AI users must update before August 17 or requests will fail. Google AI Studio provides a migration guide at firebase.google.com/docs/ai-logic/imagen-models-migration.

## Using Claude's Native Image Generation

Claude can generate images directly using its built-in image generation capability.
For quick concept visualization, just ask Claude to generate the image inline.
