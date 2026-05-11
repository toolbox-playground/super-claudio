# Realistic & Artistic Image Generation

> **Tool not chosen yet?** Go back to the `media-content-creation` skill — it will invoke
> `find-ai-tools` to search for current free options and let the user pick.
> This file is a workflow guide for *after* a tool has been selected.

## Tool Reference (may be outdated — always verify current pricing)

> Tools below are listed for reference. Free tiers change without notice.
> Use `find-ai-tools` for an up-to-date ranked list with honest free tier info.

| Tool | Access | Best For | Free |
|------|--------|----------|
| **Midjourney v8.1** | midjourney.com | Artistic quality, concept art, portraits | Paid (no free tier) |
| **Recraft V4** | recraft.ai | Logos, SVG vectors, brand assets, text rendering | Free tier |
| **Nano Banana 2** | nanobanana.ai (verify URL) | Product images, lifestyle scenes, ad creatives | Check site |
| **GPT Image 1.5** | ChatGPT / API | Complex instructions, text in images | Limited (ChatGPT Plus) |
| **Flux 2 Pro** (Black Forest Labs) | Replicate, fal.ai | Most photorealistic, product photography | API credits |
| **Stable Diffusion** | Local / Automatic1111 | Full control, local, free | Yes (local) |
| **Adobe Firefly** | firefly.adobe.com | Commercial safe, style control | Free tier |
| **Ideogram v3** | ideogram.ai | Text in images, posters, signage | Free tier |
| **Google Imagen 4** | AI Studio / Gemini API | Photorealism, 2K resolution, text rendering; Ultra variant for max fidelity | Via AI Studio (free tier) |

## Nano Banana 2 — Top Pick for Product & Lifestyle Images

Currently one of the best models for generating high-quality product images and lifestyle scenes.
Particularly strong for:
- Placing products in realistic lifestyle contexts ("product on a kitchen counter", "model holding product")
- Generating ad-ready images with clean composition
- Ecommerce and social commerce content

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

## Flux 2 Pro via fal.ai — Photorealistic API Access

```bash
pip install fal-client
```
```python
import fal_client
result = fal_client.run(
    "fal-ai/flux-pro/v1.1",
    arguments={"prompt": "professional product photo, white background, studio lighting"}
)
print(result["images"][0]["url"])
```

## Prompt Formula for Realistic Images

```
[Subject] + [Action/Pose] + [Environment] + [Lighting] + [Camera] + [Style]
```

Example: "Young Brazilian woman holding a coffee cup, modern São Paulo café interior,
warm afternoon light, portrait lens, photorealistic, 4K"

## Using Claude's Native Image Generation

Claude can generate images directly using its built-in image generation capability.
For quick concept visualization, just ask Claude to generate the image inline.
