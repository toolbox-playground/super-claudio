# Animating Static Images

Tools that take a still image and add realistic motion to it.

## Figma Weave (formerly Weavy AI) — Motion from Photo

Adds realistic motion to a static photograph (person moves, fabric flows, hair blows). Figma acquired Weavy in October 2025 and rebranded it **Figma Weave**; existing accounts still log in at app.weavy.ai, and the product now also lives at weave.figma.com inside the Figma ecosystem. No pricing changes from the acquisition as of Sept 2026.

- Great for: fashion images, lifestyle photos, product ads where a model wears/uses the product
- Input: photo + motion direction prompt
- Output: short looping or progressive video clip
- Common use case: animate an ecommerce model photo → use in TikTok Shop
- URL: weave.figma.com (or app.weavy.ai for existing accounts)

**Workflow:**
1. Prepare a clean product/model photo
2. Upload to Figma Weave (weave.figma.com)
3. Describe the desired motion: "model turns and smiles", "dress flows in wind", "product rotates slowly"
4. Generate and download as MP4

## Kling "Image to Video" — High Quality Motion

Kling's image-to-video mode is also excellent for animating photos.

- URL: klingai.com → Image to Video tab
- Kling 3.0 (2026): stronger temporal consistency and physical accuracy on complex human motion; free tier gives 66 daily credits (~2 clips at 720p, watermarked)
- Higher quality than many tools
- Supports longer clips from a single image (up to 30s+ on paid tiers)

## Runway Gen-4.5 (formerly "Act One" / Gen-3)

- URL: runwayml.com
- Professional-grade animation from images — Gen-4.5 Image to Video (all paid plans) adds longer coherent clips, precise camera control, and consistent characters across a sequence
- More control over motion style and duration than most competitors

## FLUX 3 Video (Black Forest Labs) — Motion with Native Audio

Announced July 2026: turns a still image into up to 20 seconds of video with native, in-sync audio generated alongside the motion — no separate voiceover/sound-design step.

- URL: fal.ai/flux-3 (also on Krea)
- Free tier: 5 generations/day free in the fal sandbox (720p)
- Best for: creators who want motion + sound in one pass instead of animating then dubbing separately
- Note: this is the video/animation side of FLUX 3 — the text-to-image side is still in early access (see `image-realistic.md`)

## When to Use Which

| Tool | Best For |
|------|---------|
| Figma Weave (Weavy AI) | Fashion/lifestyle/ecommerce model motion |
| Kling Image-to-Video | General high-quality animation, generous free tier |
| Runway Gen-4.5 | Professional production, fine control |
| FLUX 3 Video | Motion + native audio in one generation, free daily tier |
