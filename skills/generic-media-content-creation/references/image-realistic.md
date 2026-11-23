# Realistic & Artistic Image Generation

> **Tool not chosen yet?** Go back to the `generic-media-content-creation` skill — it will invoke
> `find-ai-tools` to search for current free options and let the user pick.
> This file is a workflow guide for *after* a tool has been selected.

## Tool Reference (may be outdated — always verify current pricing)

> Tools below are listed for reference. Free tiers change without notice.
> Use `find-ai-tools` for an up-to-date ranked list with honest free tier info.

| Tool | Access | Best For | Free |
|------|--------|----------|
| **Midjourney v8.2** | midjourney.com | Artistic quality, concept art, portraits; v8.2 became the default model Jul 24 2026 (v8.1 released Apr 30 2026, was default Jun–Jul 2026) — aesthetic refinements, better personalization and Sref/moodboard consistency, plain-language edit prompts, native 2K resolution retained; included at no extra cost across all plan tiers; no public API | Paid (no free tier/trial; plans from $10/mo Basic) |
| **Recraft V4.1** | recraft.ai | Logos, SVG vectors, brand assets, text rendering; V4.1 (Jun 2026): sharper photorealism, improved SVG vector accuracy, better text rendering and style consistency | Free tier |
| **Nano Banana 2.1** (Google / Gemini) | gemini.google.com, aistudio.google.com | Product images, lifestyle scenes, ad creatives — default free model; released Oct 6 2026, succeeds Nano Banana 2 (old Nano Banana 2 endpoint deprecated Oct 29 2026 — migrate); better visual quality/realism at 1K–4K, prompt adherence, multi-turn character consistency, up to 14 reference images; API output price roughly halved vs. Nano Banana 2 | Free (Gemini app); API paid only (no free tier), ~$0.034/image at 1K |
| **Nano Banana 2 Lite** (Google / Gemini) | gemini.google.com, aistudio.google.com | Fastest & cheapest Google image model; 2.7× faster than Nano Banana 2 (~4 s); 1K resolution cap; **#5 on Artificial Analysis Image Arena (Elo 1261, July 2026)** — highest-ranked free model per dollar; released June 30, 2026 | Free (Google AI Studio); API: $0.034/image (batch: $0.017) |
| **Nano Banana Pro** (Google / Gemini 3 Pro Image) | gemini.google.com, aistudio.google.com | Complex compositions, highest Google image quality, 4K output — premium variant of Nano Banana | Paid (Google AI Pro/Ultra plans; 3 free gens/day for free users; API: $0.134/image) |
| **GPT Image 2.6** (Flare / Sunburst) | ChatGPT / API | Complex instructions, text in images, 4K resolution; released Nov 4, 2026, succeeds GPT Image 2/2.5; ships as two API variants — Flare (fast, ~6s) and Sunburst (higher quality); adds animated GIF creation, persistent reference images, SVG export | Free (ChatGPT Free tier, limited allowance, no Thinking-mode gen); Plus $20/mo, Pro $100/mo for higher caps; API: pay-per-token (~$30/1M image output tokens) |
| **Grok Imagine Image 2.0** (xAI) | grok.com/imagine, Grok iOS/Android app, x.ai API, fal.ai, openrouter.ai | Fast image generation + editing; released Aug 7, 2026, now the default "Quality Mode" in Grok Imagine | No free API tier (output $0.04/image at 1K, +$0.01/image input for edits); usable via Grok app subscription |
| **Meta Muse Image** (Meta Superintelligence Labs) | meta.ai, Meta AI app, Instagram Stories (US), WhatsApp (limited countries) | Social-native image generation — text-to-image, multi-photo blending, @mention of public Instagram accounts for likeness reference, sketch-and-instruction editing, 30+ Instagram Story effects; agentic tool use (web search + coding invoked during generation); self-refinement at inference time (test-time compute scaling before delivering the final image); Content Seal invisible watermark; launched July 7, 2026; **#2 on Arena.ai Text-to-Image Arena (Elo 1280, July 2026)** — also #2 in single-image edit and multi-image edit arenas; no developer API at launch (Meta evaluating external access) | Free (consumer; subscription for power users via Meta AI subscription plans) |
| **MAI-Image-2.6 / Flash** (Microsoft) | microsoft.ai (MAI Playground / Arena, free to try), openrouter.ai/microsoft/mai-image-2.6, Azure AI Foundry | High-quality generation and precise localized editing; launched Aug 10, 2026 (succeeds MAI-Image-2.5), ranks #2 on Arena behind only GPT Image, ahead of Google/Meta/xAI; Flash variant for lower cost; integrating into PowerPoint (generation) and OneDrive (photo editing) | Free to try on microsoft.ai Arena; no free API tier (Foundry: $38/1M image output tokens standard, $19/1M Flash; image input $8/1M standard, $2.50/1M Flash; text input $5/1M standard, $1.75/1M Flash) |
| **Luma Uni-1.1** (Luma AI) | lumalabs.ai | Reasoning-first unified model — reasons before rendering; 9 typed reference images (STYLE, CHARACTER, COMPOSITION, LIGHTING); tops Nano Banana 2 and GPT Image 1.5 on reasoning benchmarks; multilingual text in images (Chinese, Arabic, Japanese); #1 Elo for overall quality, style, and reference-based generation in human preference tests; Uni-1 launched March 2026; Uni-1.1 API opened May 5, 2026 | API: $0.0404/image (uni-1), $0.10/image (uni-1-max); reference images $0.003 each; no permanent free tier (Dream Machine legacy for trials) |
| **Reve 2.0** (Reve AI) | app.reve.com | Layout-first 4K generation — builds an editable code-based layout before rendering, so you can fix a misplaced headline or resize one element without re-rolling; dedicated typography step keeps headlines, packaging labels, and captions crisp and correctly spelled; text-to-image, image editing, multi-reference composition; native 4K output; debuted #2 on Image Arena (score 1280, launched June 3, 2026) | Free tier (daily refresh); Lite $7.99/mo; Pro $19.99/mo |
| **Seedream 5.0** (ByteDance) | seed.bytedance.com, pixverse.ai | Fast photorealistic generation — 2K images in ~1.8s, up to 4K resolution, real-time web search grounding during generation, multi-step visual reasoning; strong for current-events-aware imagery | Limited free (via PixVerse) |
| **Seedream 5.0 Pro** (ByteDance) | seed.bytedance.com, byteplus.com, fal.ai | Precision editing + layered output — launched July 8, 2026; splits one render into 10+ transparent PNG layers (auto-fills occluded areas for maskless editing in Figma/Photoshop); pixel-level spatial grounding for interactive regional edits; multilingual text generation in 10+ languages (Chinese, English, French, German, Russian, Japanese, Korean, Spanish, Arabic — includes RTL layouts); realistic portrait textures and multi-person compositing; available via BytePlus API, Doubao/Jimeng consumer apps, fal.ai, and ComfyUI | API: $0.075/image ≤2.36MP; $0.150/image >2.36MP; $0.005 per extra input image |
| **Riverflow 2.0 Pro** (Sourceful) | openrouter.ai/sourceful/riverflow-v2-pro, runware.ai, wavespeed.ai | Photorealistic product mockups, packaging, ads, brand assets — #1 on Artificial Analysis Image Generation leaderboard (Feb 2026); 4K output, transparent background support, agentic precision for commercial imagery | API credits ($0.15/image 2K, $0.33/image 4K; no direct consumer site — API only) |
| **FLUX.2 [max]** (Black Forest Labs) | bfl.ai, fal.ai, openrouter.ai | Highest-quality FLUX model; Grounded Generation (retrieves real-time web context during image gen); up to 10 reference images for consistent products/characters/styles; #2 on Artificial Analysis Image Generation (behind Nano Banana Pro); open-source [dev] variant (32B params) released alongside | API credits ($0.07/mp first output mp, $0.03/mp subsequent; [dev]: open-weights, non-commercial) |
| **FLUX.2 [pro]** (Black Forest Labs) | bfl.ai, fal.ai | Photorealistic, product photography; solid quality tier below [max] | API credits |
| **FLUX.1 Kontext** (Black Forest Labs) | bfl.ai, fal.ai | In-context image editing — provide reference image + text instruction to edit it | API credits (Dev variant: open-weight, non-commercial) |
| **FLUX 3 Image Klein** (Black Forest Labs) | bfl.ai, fal.ai, runware.ai, HuggingFace | Fastest open-weights BFL model; released Oct 15, 2026 (succeeds FLUX.2 [klein]); 5.6B params, unified text-to-image + editing + multi-reference generation (up to 10 refs); INT8 variant runs on 8GB-VRAM consumer GPUs; part of the broader FLUX 3 multimodal family unveiled Jul 23, 2026 | Open weights (commercial rights tiered by revenue/use — check license); API from $0.009/image at 1K |
| **HiDream-O1-Image-1.5** (HiDream.ai) | hidream.ai, HuggingFace (`HiDream-ai/HiDream-O1-Image`), WaveSpeed | Pixel-native reasoning model — no VAE or external text encoder; 8B Pixel-level Unified Transformer (UiT) processes text, images, and task conditions in one shared token space; supports text-to-image, image editing, and subject-driven personalization at up to 2048×2048; long-text rendering + multilingual layout control; **#4 on Artificial Analysis Text-to-Image Arena** (Elo 1264, July 2026); highest-ranked open-weight model on AA at launch (May 8, 2026, debuted #8) | MIT license (commercial use free); free on HuggingFace Spaces (no local GPU required); API via WaveSpeed |
| **Krea 2 Turbo / Raw** (Krea) | krea.ai, HuggingFace (krea/Krea-2-Turbo, krea/Krea-2-Raw) | 2-second 2K generation; 12B Diffusion Transformer open weights released June 22, 2026; Turbo is post-trained + distilled for maximum speed; Raw is base checkpoint for fine-tuning and research; aesthetic-first design; **Krea 2 Medium: #6 on Artificial Analysis Text-to-Image Arena (July 2026)** — #1 among independent research lab models; Krea 2 Community License | Community License: free for individuals + companies with <50 seats (requires technical safeguards); enterprise agreement required above 50 seats |
| **Stable Diffusion** | Local / Automatic1111 | Full control, local, free | Yes (local) |
| **Adobe Firefly Image 5** | firefly.adobe.com | Commercial safe, custom model training, 30+ third-party models (Runway, Google, OpenAI) in one workspace | Free tier (paid for full access; see notes) |
| **Ideogram 4.5** | ideogram.ai, Recraft Studio, Together AI | Text in images, posters, signage; released early Oct 2026, succeeds Ideogram 4.0 — adds multi-turn editing at native 2K and a context window for Precise Edit (Oct 29, 2026) so edits stay confined to the selected region; strong text rendering | Free tier (ideogram.ai, ~30 gens/week per docs); API: $0.008–$0.10/image depending on quality tier (no free API tier) |
| **Ideogram Vector 1.0** | ideogram.ai, fal.ai, Together AI | Text-to-vector and image-to-vector — generates editable SVG logos, lettering, posters, stickers; Ideogram's first vector model, launched Oct 22, 2026; output SVGs can't go through Ideogram's pixel tools (Remix/Upscale/Remove BG) | No dedicated free tier found; API: ~$0.10–$0.20/SVG (text-to-vector), ~$0.10/image (image-to-vector) |
| **Google Imagen 4** **(DEPRECATED — Imagen 4 endpoints shut down August 17, 2026; Imagen 3 already shut down June 24–30, 2026; migrate to Nano Banana / Gemini Image models)** | — | — | — |

## Nano Banana 2.1 — Top Pick for Product & Lifestyle Images

Google's Nano Banana 2.1 (released Oct 6, 2026, succeeding Nano Banana 2) is available free in the Gemini app and across Google products (Search, Lens, AI Studio, Vertex AI). Particularly strong for:
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
- Not ideal for: developers needing programmatic access (no API yet); high-volume batch generation; print/4K quality output (use FLUX.2 [max] or GPT Image 2.6 for those)

## DALL-E Retirement Note

DALL-E 2 and DALL-E 3 were retired by OpenAI on May 12, 2026. GPT Image 2.6 (already in the table above, succeeding GPT Image 2/2.5) is their replacement. Do not recommend DALL-E endpoints — they are deprecated.

## Google Imagen 4 Deprecation Note

Google is deprecating all Imagen model endpoints in two waves. Imagen 3 endpoints shut down June 24–30, 2026 (already complete). Imagen 4 endpoints (`imagen-4.0-generate-001`, `imagen-4.0-ultra-generate-001`, `imagen-4.0-fast-generate-001`) shut down August 17, 2026 — calls after that date fail with a hard error (no grace period). Migrate to Gemini Image models ("Nano Banana"): swap the model name from `imagen-*` to the corresponding `gemini-*-image` model in your API calls. Firebase AI Logic and Vertex AI users must update before August 17 or requests will fail. Google AI Studio provides a migration guide at firebase.google.com/docs/ai-logic/imagen-models-migration.

## Using Claude's Native Image Generation

Claude can generate images directly using its built-in image generation capability.
For quick concept visualization, just ask Claude to generate the image inline.
