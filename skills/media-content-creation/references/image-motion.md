# Animating Static Images

Tools that take a still image and add realistic motion to it.

## Weavy AI — Motion from Photo

Adds realistic motion to a static photograph (person moves, fabric flows, hair blows). Acquired by
Figma (2025) and grown into a broader node-based canvas that routes one image through several
image-to-video models (Kling, Runway, Luma, etc.) side by side — still strong for the simple
single-model motion workflow below, but now also useful when you want to compare motion styles
from multiple models on the same source image.

- Great for: fashion images, lifestyle photos, product ads where a model wears/uses the product
- Input: photo + motion direction prompt
- Output: short looping or progressive video clip
- Common use case: animate an ecommerce model photo → use in TikTok Shop
- Free tier: 150 credits/mo; paid plans scale to $48/user/mo (4,500 credits)

**Workflow:**
1. Prepare a clean product/model photo
2. Upload to Weavy AI
3. Describe the desired motion: "model turns and smiles", "dress flows in wind", "product rotates slowly"
4. Generate and download as MP4

## Kling "Image to Video" — High Quality Motion

Kling's image-to-video mode is also excellent for animating photos.

- URL: klingai.com → Image to Video tab
- Higher quality than many tools
- Supports longer clips from a single image

## Runway Gen-4.5 / Act-Two

- URL: runwayml.com
- Gen-4.5: professional-grade animation from images, more control over motion style and duration
- Act-Two: dedicated character-performance model — drive a character reference image with a
  separate performance video (head, face, body, hand motion) for precise, non-generic motion

## When to Use Which

| Tool | Best For |
|------|---------|
| Weavy AI | Fashion/lifestyle/ecommerce model motion; comparing multiple models on one image |
| Kling Image-to-Video | General high-quality animation |
| Runway Gen-4.5 / Act-Two | Professional production, fine control, precise performance-driven motion |
