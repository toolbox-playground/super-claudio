# Realistic & Artistic Image Generation

## Tool Comparison

| Tool | Access | Best For | Free |
|------|--------|----------|------|
| **Nano Banana 2** | nanobanana.ai (verify URL) | Product images, lifestyle scenes, ad creatives — currently one of the best models | Check site |
| **DALL-E 3** | ChatGPT / API | Accurate prompt following, text in images | Limited (ChatGPT Plus) |
| **Flux** (Black Forest Labs) | Replicate, fal.ai | Photorealistic, fast | API credits |
| **Stable Diffusion** | Local / Automatic1111 | Full control, local, free | Yes (local) |
| **Adobe Firefly** | firefly.adobe.com | Commercial safe, style control | Free tier |
| **Ideogram** | ideogram.ai | Text in images, posters | Free tier |
| **Google Imagen** | AI Studio | High quality | Via AI Studio |

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

## Flux via fal.ai — Fast API Access

```bash
pip install fal-client
```
```python
import fal_client
result = fal_client.run(
    "fal-ai/flux/schnell",
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
