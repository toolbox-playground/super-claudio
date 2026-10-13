# Realistic & Artistic Image Generation

> **Tool not chosen yet?** Go back to the `media-content-creation` skill — it will invoke
> `find-ai-tools` to search for current free options and let the user pick.
> This file is a workflow guide for *after* a tool has been selected.

## Tool Reference (may be outdated — always verify current pricing)

> Tools below are listed for reference. Free tiers change without notice.
> Use `find-ai-tools` for an up-to-date ranked list with honest free tier info.

| Tool | Access | Best For | Free |
|------|--------|----------|
| **Midjourney v8.2** | midjourney.com | Artistic quality, concept art, portraits; v8.2 reached GA and became the default model July 24, 2026 (upgrade from v8.1, default Jun 11 2026) — bolder aesthetics, rebuilt personalization engine, dramatically fewer random low-quality outputs, native 2K output carried over from v8.1; still no public API, no open weights | Paid (no free tier) |
| **Recraft V4.1** | recraft.ai | Logos, SVG vectors, brand assets, text rendering; V4.1 (Jun 2026): sharper photorealism, improved SVG vector accuracy, better text rendering and style consistency | Free tier |
| **Nano Banana 2.1** (Google / Gemini) | gemini.google.com | Product images, lifestyle scenes, ad creatives — default free model; reached GA Oct 6, 2026 as the update to Nano Banana 2 (model id `gemini-nano-banana-2.1`); improves prompt adherence, multi-turn character consistency (up to 4 characters, 10 objects across up to 14 reference images), text rendering, and fixes tiling artifacts on wide/panoramic 2K–4K outputs; the older Nano Banana 2 (Gemini 3.1 Flash Image) is being phased out, with some reports citing an end-of-service date around Oct 29, 2026 — re-verify before depending on it | Free (Gemini app) |
| **Nano Banana 2 Lite** (Google / Gemini) | gemini.google.com, aistudio.google.com | Fastest & cheapest Google image model; 2.7× faster than Nano Banana 2 (~4 s); 1K resolution cap; highest-ranked free model per dollar on Artificial Analysis Image Arena as of mid-2026; released June 30, 2026 | Free (Google AI Studio); API: $0.034/image (batch: $0.017) |
| **Nano Banana Pro** (Google / Gemini 3 Pro Image) | gemini.google.com, aistudio.google.com | Complex compositions, highest Google image quality, 4K output — premium variant of Nano Banana | Paid (Google AI Pro/Ultra plans; 3 free gens/day for free users; API: $0.134/image) |
| **GPT Image 2.5** (ChatGPT Images 2.5) | ChatGPT / ChatGPT Work / Codex / API | Complex instructions, text in images, sketch-to-image (new Sketch tool for drawing visual references), in-image comments for targeted edits, prompt sharing, image templates; OpenAI says it improves detail retention, editing precision, and generation speed over GPT Image 2 (launched Sep 8, 2026); API variants **GPT-Image-2.5 Flare** (general-purpose) and **GPT-Image-2.5 Sunburst** (slower, higher-precision); predecessor GPT Image 2 (Apr 21, 2026) had been #1 on Artificial Analysis Text-to-Image Arena at Elo ~1339 — re-check current leaderboard standing, as rankings have been volatile since MAI-Image-2.6, Ideogram 4.5, and Nano Banana 2.1 all shipped in Sep–Oct 2026 | Limited (ChatGPT Plus) |
| **Meta Muse Image** (Meta Superintelligence Labs) | meta.ai, Meta AI app, Instagram Stories (US), WhatsApp (limited countries), fal.ai (developer API) | Social-native image generation — text-to-image, multi-photo blending, @mention of public Instagram accounts for likeness reference, sketch-and-instruction editing, 30+ Instagram Story effects; agentic tool use (web search + coding invoked during generation); self-refinement at inference time (test-time compute scaling before delivering the final image); Content Seal invisible watermark; launched July 7, 2026; had ranked #2 on Arena.ai Text-to-Image Arena (Elo 1280, July 2026) — re-check given the many Sep–Oct 2026 launches; **developer API opened late Aug 2026** via Meta Model API and fal.ai (separate text-to-image and image-editing endpoints, ~$0.01/image) — no longer consumer-only | Free (consumer; subscription for power users via Meta AI subscription plans); API ~$0.01/image |
| **MAI-Image-2.6 / Flash** (Microsoft) | microsoft.ai (MAI Playground), openrouter.ai/microsoft/mai-image-2.6, Azure AI Foundry | High-quality generation and precise localized editing; upgrade from MAI-Image-2.5 — public on Azure AI Foundry Sep 4, 2026 (announced Aug 10, Foundry preview Aug 18); accepts up to 5 reference images per edit request; reportedly debuted around #2 on Arena's text-to-image ranking (preliminary, unreproduced by third parties — Microsoft still trails OpenAI's top model by roughly 45–50 Elo points per early reports); Flash variant for lower cost; integrating into PowerPoint (generation) and OneDrive (photo editing) | No free tier (API: $38/1M image output tokens standard, $19/1M Flash; image input: $8/1M standard, $2.50/1M Flash; text input: $5/1M standard, $1.75/1M Flash) |
| **Luma Uni-1.1** (Luma AI) | lumalabs.ai | Reasoning-first unified model — reasons before rendering; 9 typed reference images (STYLE, CHARACTER, COMPOSITION, LIGHTING); tops Nano Banana 2 and GPT Image 1.5 on reasoning benchmarks; multilingual text in images (Chinese, Arabic, Japanese); #1 Elo for overall quality, style, and reference-based generation in human preference tests; Uni-1 launched March 2026; Uni-1.1 API opened May 5, 2026 | API: $0.0404/image (uni-1), $0.10/image (uni-1-max); reference images $0.003 each; no permanent free tier (Dream Machine legacy for trials) |
| **Reve 2.1** (Reve AI) | app.reve.com | Layout-first 4K generation — builds an editable code-based layout before rendering, so you can fix a misplaced headline or resize one element without re-rolling; dedicated typography step keeps headlines, packaging labels, and captions crisp and correctly spelled; text-to-image, image editing, multi-reference composition; native 4K output; Reve 2.1 (July 2026) adds gains in prompt understanding, world knowledge, and foreign-text rendering over Reve 2.0 (which had debuted top-2 on Image Arena, launched June 3, 2026); closed model, API model id `latest` | Free tier (daily refresh); Lite $7.99/mo; Pro $19.99/mo |
| **Seedream 5.0** (ByteDance) | seed.bytedance.com, pixverse.ai | Fast photorealistic generation — 2K images in ~1.8s, up to 4K resolution, real-time web search grounding during generation, multi-step visual reasoning; strong for current-events-aware imagery | Limited free (via PixVerse) |
| **Seedream 5.0 Pro** (ByteDance) | seed.bytedance.com, byteplus.com, fal.ai | Precision editing + layered output — launched July 8, 2026; splits one render into 10+ transparent PNG layers (auto-fills occluded areas for maskless editing in Figma/Photoshop); pixel-level spatial grounding for interactive regional edits; multilingual text generation in 10+ languages (Chinese, English, French, German, Russian, Japanese, Korean, Spanish, Arabic — includes RTL layouts); realistic portrait textures and multi-person compositing; available via BytePlus API, Doubao/Jimeng consumer apps, fal.ai, and ComfyUI | API: $0.075/image ≤2.36MP; $0.150/image >2.36MP; $0.005 per extra input image |
| **Riverflow 2.5 Pro / Fast** (Sourceful) | openrouter.ai/sourceful/riverflow-v2.5-pro, openrouter.ai/sourceful/riverflow-v2.5-fast, runware.ai, wavespeed.ai | Photorealistic product mockups, packaging, ads, brand assets — upgrade from Riverflow 2.0 Pro (which had hit #1 on Artificial Analysis Image Generation, Feb 2026); 2.5 adds adjustable reasoning effort, 1K/2K/4K output, up to 10 input images for editing; Pro adds custom font rendering, custom scoring rubrics, background controls; Fast variant for latency-sensitive production use | API credits only — no direct consumer site; check openrouter.ai for current per-image pricing |
| **FLUX 3 Image** (Black Forest Labs) | bfl.ai, fal.ai, openrouter.ai, runware.ai | Successor line to FLUX.2 — part of FLUX 3, a multimodal frontier family (Image/Video/Action/Dev) announced Jul 23, 2026; FLUX 3 Video shipped publicly Aug 4, 2026, and some marketplaces (OpenRouter, others) list FLUX 3 Image as live since early Oct 2026, while Black Forest Labs' own site and other resellers (Runware, Muapi) still describe it as "coming soon" as of this writing — **status unconfirmed, verify availability before recommending**; reported features: single endpoint for text-to-image + edits, up to 10 reference images, bounding-box layout control, pixel-exact local edits | API credits — pricing varies by reseller, unconfirmed as GA |
| **FLUX.2 [max]** (Black Forest Labs) | bfl.ai, fal.ai, openrouter.ai | Highest-quality FLUX.2 model (pre-FLUX 3); Grounded Generation (retrieves real-time web context during image gen); up to 10 reference images for consistent products/characters/styles; had been #2 on Artificial Analysis Image Generation (behind Nano Banana Pro) as of mid-2026 — re-check once FLUX 3 Image's status is confirmed; open-source [dev] variant (32B params) released alongside | API credits ($0.07/mp first output mp, $0.03/mp subsequent; [dev]: open-weights, non-commercial) |
| **FLUX.2 [pro]** (Black Forest Labs) | bfl.ai, fal.ai | Photorealistic, product photography; solid quality tier below [max] | API credits |
| **FLUX.1 Kontext** (Black Forest Labs) | bfl.ai, fal.ai | In-context image editing — provide reference image + text instruction to edit it | API credits (Dev variant: open-weight, non-commercial) |
| **FLUX.2 [klein]** (Black Forest Labs) | bfl.ai, fal.ai, HuggingFace | Sub-second generation & editing; unified text-to-image + image editing; 4B and 9B variants; 4-step distilled inference; ~13GB VRAM for 4B — runs on RTX 3090/4070; supports multi-reference composition | 4B: Apache 2.0 (commercial use free); 9B: non-commercial |
| **HiDream-O1-Image-1.5** (HiDream.ai) | hidream.ai, HuggingFace (`HiDream-ai/HiDream-O1-Image`), WaveSpeed | Pixel-native reasoning model — no VAE or external text encoder; 8B Pixel-level Unified Transformer (UiT) processes text, images, and task conditions in one shared token space; supports text-to-image, image editing, and subject-driven personalization at up to 2048×2048; long-text rendering + multilingual layout control; **#4 on Artificial Analysis Text-to-Image Arena** (Elo 1264, July 2026); highest-ranked open-weight model on AA at launch (May 8, 2026, debuted #8) | MIT license (commercial use free); free on HuggingFace Spaces (no local GPU required); API via WaveSpeed |
| **Krea 2 Turbo / Raw** (Krea) | krea.ai, HuggingFace (krea/Krea-2-Turbo, krea/Krea-2-Raw) | 2-second 2K generation; 12B Diffusion Transformer open weights released June 22, 2026; Turbo is post-trained + distilled for maximum speed; Raw is base checkpoint for fine-tuning and research; aesthetic-first design; **Krea 2 Medium: #6 on Artificial Analysis Text-to-Image Arena (July 2026)** — #1 among independent research lab models; Krea 2 Community License | Community License: free for individuals + companies with <50 seats (requires technical safeguards); enterprise agreement required above 50 seats |
| **Stable Diffusion** | Local / Automatic1111 | Full control, local, free | Yes (local) |
| **Adobe Firefly Image 5** | firefly.adobe.com | Commercial safe, custom model training, 30+ third-party models (Runway, Google, OpenAI) in one workspace | Free tier (paid for full access; see notes) |
| **Ideogram 4.5** | ideogram.ai | Precision image editing — "Precise Edit" preserves untouched pixels, supports masks, accepts up to 4 reference images; launched ~Sep 30, 2026 as the update to Ideogram 4.0; API model id `ideogram-4-5`; no open weights for this release (closed, web + API only) | Free tier (ideogram.ai) |
| **Ideogram 4.0** | ideogram.ai, Together AI | Text in images, posters, signage; first open-weight T2I model from Ideogram (9.3B params, Jun 3 2026); strong text rendering (0.97 X-Omni OCR — highest among open-weight models at launch); native 2K resolution; bounding-box layout control; color-palette conditioning (up to 16 hex colors); inference code Apache 2.0; model weights: non-commercial license — still the pick when open weights matter, otherwise prefer 4.5 above | Free tier (ideogram.ai); API: $0.03 Turbo / $0.06 Default / $0.10 Quality per image |
| **Google Imagen 4** **(DEPRECATED — Imagen 4 endpoints shut down August 17, 2026; Imagen 3 already shut down June 24–30, 2026; migrate to Nano Banana / Gemini Image models)** | — | — | — |

## Nano Banana 2.1 — Top Pick for Product & Lifestyle Images

Google's Nano Banana 2.1 (GA Oct 6, 2026; model id `gemini-nano-banana-2.1`) is available free in the Gemini app and across Google products (Search, Lens, AI Studio, Vertex AI). It's the update to Nano Banana 2 (Gemini 3.1 Flash Image), with better prompt adherence and character consistency across edits. Particularly strong for:
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

- **Ranked #2** on Arena.ai text-to-image, single-image edit, and multi-image edit leaderboards at launch (Elo 1280, July 2026) — treat as stale given the MAI-Image-2.6, GPT Image 2.5, Ideogram 4.5, and Nano Banana 2.1 launches since
- Available free at meta.ai and in the Meta AI app; Instagram Stories (US); WhatsApp (limited countries); Facebook rollout following
- Subscription plans for power users (Meta AI monthly plans)
- **Developer API opened late August 2026** via the Meta Model API and fal.ai — separate text-to-image and image-editing endpoints, roughly $0.01/image; no longer consumer-only
- Content Seal invisible watermark embedded in all outputs
- Best for: social-first creators already in the Meta ecosystem; campaigns tapping Instagram social graph for reference imagery; Instagram Story effects workflows; developers wanting cheap API access via fal.ai
- Not ideal for: high-volume batch generation where per-image API cost of competitors is lower; print/4K quality output (use FLUX.2 [max]/FLUX 3 or GPT Image 2.5 for those)

## DALL-E Retirement Note

DALL-E 2 and DALL-E 3 were retired by OpenAI on May 12, 2026. GPT Image 2.5 (already in the table above) is their current replacement. Do not recommend DALL-E endpoints — they are deprecated.

## Google Imagen 4 Deprecation Note

Google is deprecating all Imagen model endpoints in two waves. Imagen 3 endpoints shut down June 24–30, 2026 (already complete). Imagen 4 endpoints (`imagen-4.0-generate-001`, `imagen-4.0-ultra-generate-001`, `imagen-4.0-fast-generate-001`) shut down August 17, 2026 — calls after that date fail with a hard error (no grace period). Migrate to Gemini Image models ("Nano Banana"): swap the model name from `imagen-*` to the corresponding `gemini-*-image` model in your API calls. Firebase AI Logic and Vertex AI users must update before August 17 or requests will fail. Google AI Studio provides a migration guide at firebase.google.com/docs/ai-logic/imagen-models-migration.

## Using Claude's Native Image Generation

Claude can generate images directly using its built-in image generation capability.
For quick concept visualization, just ask Claude to generate the image inline.
