# Realistic & Artistic Image Generation

> **Tool not chosen yet?** Go back to the `media-content-creation` skill — it will invoke
> `find-ai-tools` to search for current free options and let the user pick.
> This file is a workflow guide for *after* a tool has been selected.

## Tool Reference (may be outdated — always verify current pricing)

> Tools below are listed for reference. Free tiers change without notice.
> Use `find-ai-tools` for an up-to-date ranked list with honest free tier info.

| Tool | Access | Best For | Free |
|------|--------|----------|
| **Midjourney v8.1** | midjourney.com | Artistic quality, concept art, portraits; v8.1 (Apr 30 2026) — 5× faster than v7, native 2K resolution, improved text rendering, HD mode now affordable as default | Paid (no free tier) |
| **Recraft V4** | recraft.ai | Logos, SVG vectors, brand assets, text rendering | Free tier |
| **Nano Banana 2** (Google / Gemini) | gemini.google.com | Product images, lifestyle scenes, ad creatives — default free model (Gemini 3.1 Flash Image) | Free (Gemini app) |
| **Nano Banana Pro** (Google / Gemini 3 Pro Image) | gemini.google.com, aistudio.google.com | Complex compositions, highest Google image quality, 4K output — premium variant of Nano Banana | Paid (Google AI Pro/Ultra plans; 3 free gens/day for free users; API: $0.134/image) |
| **GPT Image 2** | ChatGPT / API | Complex instructions, text in images (99% accuracy), 4K resolution, 2× faster than predecessor; launched April 21, 2026 | Limited (ChatGPT Plus) |
| **Seedream 5.0** (ByteDance) | seed.bytedance.com, pixverse.ai | Fast photorealistic generation — 2K images in ~1.8s, up to 4K resolution, real-time web search grounding during generation, multi-step visual reasoning; strong for current-events-aware imagery | Limited free (via PixVerse) |
| **FLUX.2 [pro]** (Black Forest Labs) | bfl.ai, fal.ai | Most photorealistic, product photography | API credits |
| **FLUX.1 Kontext** (Black Forest Labs) | bfl.ai, fal.ai | In-context image editing — provide reference image + text instruction to edit it | API credits (Dev variant: open-weight, non-commercial) |
| **FLUX.2 [klein]** (Black Forest Labs) | bfl.ai, fal.ai, HuggingFace | Sub-second generation & editing; unified text-to-image + image editing; 4B and 9B variants; 4-step distilled inference; ~13GB VRAM for 4B — runs on RTX 3090/4070; supports multi-reference composition | 4B: Apache 2.0 (commercial use free); 9B: non-commercial |
| **Stable Diffusion** | Local / Automatic1111 | Full control, local, free | Yes (local) |
| **Adobe Firefly Image 5** | firefly.adobe.com | Commercial safe, custom model training, 30+ third-party models (Runway, Google, OpenAI) in one workspace | Free tier (paid for full access; see notes) |
| **Ideogram 4.0** | ideogram.ai, Together AI | Text in images, posters, signage; first open-weight T2I model from Ideogram (9.3B params, Jun 3 2026); #1 text rendering (0.97 X-Omni OCR — highest among open-weight models); native 2K resolution; bounding-box layout control; color-palette conditioning (up to 16 hex colors); inference code Apache 2.0; model weights: non-commercial license | Free tier (ideogram.ai); API: $0.03 Turbo / $0.06 Default / $0.10 Quality per image |
| **Google Imagen 4** **(DEPRECATED — all Imagen endpoints shut down June 24–30, 2026; migrate to Nano Banana / Gemini Image models)** | — | — | — |

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

## Recraft V4 — Logos, Vectors & Brand Assets

Recraft V4 tops the HuggingFace Text-to-Image Arena leaderboard (2026). Use it when you need:
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

## DALL-E Retirement Note

DALL-E 2 and DALL-E 3 were retired by OpenAI on May 12, 2026. GPT Image 2 (already in the table above) is their replacement. Do not recommend DALL-E endpoints — they are deprecated.

## Google Imagen 4 Deprecation Note

All Google Imagen model endpoints (Imagen 3, Imagen 4, Imagen 4 Ultra) will shut down June 24–30, 2026. Migrate to Gemini Image models ("Nano Banana"): swap the model name from `imagen-*` to the corresponding `gemini-*-image` model in your API calls. Firebase AI Logic and Vertex AI users must update before the cutoff or requests will fail. Google AI Studio provides a migration guide at firebase.google.com/docs/ai-logic/imagen-models-migration.

## Using Claude's Native Image Generation

Claude can generate images directly using its built-in image generation capability.
For quick concept visualization, just ask Claude to generate the image inline.
