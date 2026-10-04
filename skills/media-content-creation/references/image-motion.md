# Animating Static Images

Tools that take a still image and add realistic motion to it.

## Figma Weave (formerly Weavy AI) — Motion from Photo

Adds realistic motion to a static photograph (person moves, fabric flows, hair blows). Weavy AI was acquired by Figma (Oct 2025) and rebranded Figma Weave (May 2026); the node-based canvas now chains multiple AI models (image → video → effects) in one workflow, and 20+ Weave tools are also embedded directly in the Figma Design canvas (since Config 2026). No API access yet (Enterprise roadmap lists it as "coming soon," no confirmed date) — web UI only.

- Great for: fashion images, lifestyle photos, product ads where a model wears/uses the product
- Input: photo + motion direction prompt
- Output: short looping or progressive video clip
- Common use case: animate an ecommerce model photo → use in TikTok Shop
- URL: weave.figma.com (legacy weavy.ai still accessible)

**Workflow:**
1. Prepare a clean product/model photo
2. Upload to Figma Weave
3. Describe the desired motion: "model turns and smiles", "dress flows in wind", "product rotates slowly"
4. Generate and download as MP4

## Kling "Image to Video" — High Quality Motion

Kling's image-to-video mode is also excellent for animating photos.

- URL: klingai.com → Image to Video tab
- Higher quality than many tools
- Supports longer clips from a single image

## Runway Act-Two / Gen-4.5

Runway's current image/performance-to-video stack (Gen-3 and Act-One are superseded):

- URL: runwayml.com
- **Act-Two**: generative motion capture — drive a reference image/character with a performance video (head, face, body, and hand motion, with lip-sync) using just a phone or webcam recording, no mocap rig needed
- **Gen-4.5**: current flagship video model — professional-grade animation from images, more control over motion style and duration

## When to Use Which

| Tool | Best For |
|------|---------|
| Figma Weave (formerly Weavy AI) | Fashion/lifestyle/ecommerce model motion |
| Kling Image-to-Video | General high-quality animation |
| Runway (Act-Two / Gen-4.5) | Professional production, fine control |
