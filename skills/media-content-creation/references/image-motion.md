# Animating Static Images

Tools that take a still image and add realistic motion to it.

## Weavy AI — Motion from Photo

Adds realistic motion to a static photograph (person moves, fabric flows, hair blows).

- Great for: fashion images, lifestyle photos, product ads where a model wears/uses the product
- Input: photo + motion direction prompt
- Output: short looping or progressive video clip
- Common use case: animate an ecommerce model photo → use in TikTok Shop

**Workflow:**
1. Prepare a clean product/model photo
2. Upload to Weavy AI
3. Describe the desired motion: "model turns and smiles", "dress flows in wind", "product rotates slowly"
4. Generate and download as MP4

**Note (ongoing since late 2025, expanded July 2026):** Figma acquired Weavy and is folding it in as **Figma Weave**, a node-based canvas for chaining image/video models (Seedance, Sora, Veo, Flux, Ideogram, Seedream, and others). Existing Weavy accounts are unaffected and continue at app.weavy.ai with no action needed. At Config 2026 (July 2026) Figma also shipped Weave tools natively inside the regular Figma design canvas — pick an image, apply a Weave workflow, generate output without leaving Figma — plus 20+ publishable workflow templates and a Figma Community gallery for sharing them; some Figma users get 1,000 free Weave credits to try them. Treat "Weavy AI" and "Figma Weave" as the same underlying product during this transition.

## Kling "Image to Video" — High Quality Motion

Kling's image-to-video mode is also excellent for animating photos.

- URL: klingai.com → Image to Video tab
- Higher quality than many tools
- Supports longer clips from a single image
- Kuaishou's flagship moved to **Kling 4.0** in October 2026 (full launch Oct 15, 2026): single-pass clips up to 30s with up to 10 keyframes and up to 15 reference inputs; the older Kling 3.0/O3/Turbo tier is still live and cheaper — see `video-realistic.md` for details on both

## Runway — Gen-4.5 / Act-Two

- URL: runwayml.com
- Professional-grade animation from images; the current flagship is **Gen-4.5** (see `video-realistic.md`), not the older "Act One"/Gen-3 referenced in some older guides
- **Act-Two** is Runway's purpose-built performance-transfer mode: feed it a driving video (someone acting out the motion) plus a character reference image, and it transfers the performance — face, body gestures, speech — onto your character; a gesture-control slider adjusts how much body/hand motion carries over
- More control over motion style and duration than most single-image animators

## When to Use Which

| Tool | Best For |
|------|---------|
| Weavy AI / Figma Weave | Fashion/lifestyle/ecommerce model motion; node-based multi-model workflows, especially if already in Figma |
| Kling Image-to-Video | General high-quality animation; Kling 4.0 for longer/higher-fidelity clips |
| Runway (Gen-4.5 / Act-Two) | Professional production, fine control; Act-Two specifically for performance/motion transfer onto a character |
