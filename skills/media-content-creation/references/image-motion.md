# Animating Static Images

Tools that take a still image and add realistic motion to it.

## Figma Weave (formerly Weavy AI) — Motion from Photo

Adds realistic motion to a static photograph (person moves, fabric flows, hair blows). Weavy AI
was acquired by Figma (Oct 2025) and rebranded **Figma Weave** (May 2026) — a node-based canvas
that chains multiple AI models (Kling, Runway, Luma, Wan) for image → video → effects workflows.
The legacy weavy.ai URL still works, but weave.figma.com is now the primary product.

- Great for: fashion images, lifestyle photos, product ads where a model wears/uses the product
- Input: photo + motion direction prompt
- Output: short looping or progressive video clip
- Common use case: animate an ecommerce model photo → use in TikTok Shop
- URL: weave.figma.com (legacy: weavy.ai)

**Workflow:**
1. Prepare a clean product/model photo
2. Upload to Figma Weave
3. Describe the desired motion: "model turns and smiles", "dress flows in wind", "product rotates slowly"
4. Generate and download as MP4

## Kling "Image to Video" — High Quality Motion

Kling's image-to-video mode is also excellent for animating photos. Now on **Kling 3.0** —
native 4K output, native audio, and Elements 3.0 for character consistency from a video reference.

- URL: klingai.com → Image to Video tab
- Higher quality than many tools
- Supports longer clips from a single image

## Runway Act-Two / Gen-4.5

Act-One (facial performance on Gen-3 Alpha) has been superseded by **Act-Two**, Runway's current
motion-capture model — tracks head, face, body, and hands from a plain webcam/phone video and
transfers the full performance onto an animated character or product shot; pairs with **Gen-4.5**
for the underlying image-to-video generation.

- URL: runwayml.com
- Professional-grade animation from images, with true performance-capture control
- More control over motion style and duration than most competitors

## When to Use Which

| Tool | Best For |
|------|---------|
| Figma Weave | Fashion/lifestyle/ecommerce model motion, multi-model node workflows |
| Kling Image-to-Video | General high-quality animation, native audio |
| Runway (Act-Two / Gen-4.5) | Professional production, performance-capture, fine control |
