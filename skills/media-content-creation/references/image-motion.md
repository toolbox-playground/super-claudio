# Animating Static Images

Tools that take a still image and add realistic motion to it.

## FLUX 3 Video (Black Forest Labs) — Motion with Native Synced Audio

Black Forest Labs' first multimodal model (launched July 23, 2026; image-to-video reached general availability August 4, 2026). Generates video with audio native to the same generation — dialogue, sound effects, and ambience are produced alongside the motion, not dubbed on afterward.

- Great for: cinematic product shots, talking-photo/dialogue clips, scenes needing synced sound (footsteps, wind, ambient noise) without a separate voiceover pass
- Input: a still image (or first/last frame, keyframes) + text description of motion, sound, and dialogue
- Output: up to 20-second MP4 with baked-in audio
- In human-rater evaluations, ties Seedance 2.0 and beats other SOTA models on image-to-video quality; strong facial expression and physical-motion realism; multilingual dialogue support
- Access: fal.ai (playground, live now), ComfyUI (via Partner Nodes), bfl.ai (early access API — full public pricing/model IDs still rolling out)
- Pricing: from $1.20 per 5–20s clip; cheaper draft tier ($0.06–$0.12/clip) for iterating before a final render

**Workflow:**
1. Upload a static photo (product, portrait, or scene)
2. Describe the motion and any sound/dialogue: "camera pushes in slowly, wind rustles the leaves, she says 'welcome home'"
3. Generate up to 20 seconds with synced audio
4. Download the MP4 — no separate SFX or voiceover pass needed

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

## Kling "Image to Video" — High Quality Motion

Kling's image-to-video mode is also excellent for animating photos.

- URL: klingai.com → Image to Video tab
- Higher quality than many tools
- Supports longer clips from a single image

## Runway "Act One" / Gen-3

- URL: runwayml.com
- Professional-grade animation from images
- More control over motion style and duration

## When to Use Which

| Tool | Best For |
|------|---------|
| FLUX 3 Video | Motion + native synced audio/dialogue from one generation |
| Weavy AI | Fashion/lifestyle/ecommerce model motion |
| Kling Image-to-Video | General high-quality animation |
| Runway | Professional production, fine control |
