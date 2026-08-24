# Animating Static Images

Tools that take a still image and add realistic motion to it.

## Weavy AI (now Figma Weave) — Motion from Photo

Adds realistic motion to a static photograph (person moves, fabric flows, hair blows). Figma acquired Weavy (Oct 2025) and relaunched it as **Figma Weave** — a node-based canvas where you chain models (e.g. generate a still with Flux/Ideogram, then animate it with Sora/Veo/Seedance) instead of a single fixed pipeline. The standalone product is still reachable at app.weavy.ai under the Figma Weave name.

- Great for: fashion images, lifestyle photos, product ads where a model wears/uses the product
- Input: photo + motion direction prompt
- Output: short looping or progressive video clip
- Common use case: animate an ecommerce model photo → use in TikTok Shop
- Note: Figma also ships 20+ ready-made "Weave Workflow" templates (image-to-video, image-to-SVG, generative variation) on Figma Community

**Workflow:**
1. Prepare a clean product/model photo
2. Upload to Figma Weave (app.weavy.ai)
3. Describe the desired motion: "model turns and smiles", "dress flows in wind", "product rotates slowly"
4. Generate and download as MP4

## Kling "Image to Video" — High Quality Motion

Kling's image-to-video mode is also excellent for animating photos. Kling 3.0 (2026) raised the ceiling: native 4K at 60fps, clips up to 15s, and native multi-language audio generation.

- URL: klingai.com → Image to Video tab
- Higher quality than many tools
- Supports longer clips from a single image

## Runway Gen-4.5 / Act-Two

- URL: runwayml.com
- Gen-4.5 is Runway's flagship generation model (Dec 2025); Gen-4 handles image-to-video specifically
- Act-Two adds character performance: drive a reference image with a performance video (expressions, head motion, body language) plus lip sync
- Professional-grade animation from images with fine control over motion style and duration

## When to Use Which

| Tool | Best For |
|------|---------|
| Figma Weave (Weavy) | Fashion/lifestyle/ecommerce model motion; chaining multiple AI models on one canvas |
| Kling Image-to-Video | General high-quality animation, native 4K/60fps |
| Runway (Gen-4.5 / Act-Two) | Professional production, fine control, character performance |
