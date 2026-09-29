# Animating Static Images

Tools that take a still image and add realistic motion to it.

## Figma Weave (formerly Weavy AI) — Motion from Photo

Adds realistic motion to a static photograph (person moves, fabric flows, hair blows). **Weavy AI was acquired by Figma (Oct 2025) and rebranded Figma Weave (May 2026)** — a node-based canvas that chains multiple AI models (image → video → effects) in one workflow.

- Great for: fashion images, lifestyle photos, product ads where a model wears/uses the product
- Input: photo + motion direction prompt
- Output: short looping or progressive video clip
- Common use case: animate an ecommerce model photo → use in TikTok Shop
- Free tier: 150 credits/month, up to 5 workflows; Starter 1,500 credits/mo; Professional 4,000 credits/mo (video generation uses ~15x the credits of image generation)

**Workflow:**
1. Prepare a clean product/model photo
2. Upload to Figma Weave
3. Describe the desired motion: "model turns and smiles", "dress flows in wind", "product rotates slowly"
4. Generate and download as MP4

- URL: weave.figma.com (legacy weavy.ai still accessible)

## Kling "Image to Video" — High Quality Motion

Kling's image-to-video mode is also excellent for animating photos.

- URL: klingai.com → Image to Video tab
- Higher quality than many tools
- Supports longer clips from a single image

## Runway "Act One" / Gen-4.5

- URL: runwayml.com
- Professional-grade animation from images; Act One drives a generated character's face/expressions from a webcam performance capture — a capability no competitor matches at the consumer level
- Runway's current model line is **Gen-4.5** (Gen-3 is retired) — more control over motion style and duration, native audio added May 2026

## Luma Ray3.2 — Image to Video with Keyframe Control

Luma's flagship model as of **June 2026**, succeeding Ray3.14.

- URL: lumalabs.ai
- Up to 64 keyframes at arbitrary source-frame indexes for precise motion control from a still image
- HDR video-to-video and EXR export for color grading
- Free tier: 8 draft videos, non-commercial; Plus $30/mo

## When to Use Which

| Tool | Best For |
|------|---------|
| Figma Weave | Fashion/lifestyle/ecommerce model motion |
| Kling Image-to-Video | General high-quality animation |
| Runway (Gen-4.5 / Act One) | Professional production, fine control, face-driven animation |
| Luma Ray3.2 | Precise keyframe-level motion control, HDR/color-grading workflows |
