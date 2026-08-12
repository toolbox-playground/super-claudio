# Animating Static Images

Tools that take a still image and add realistic motion to it.

## Weavy AI — Motion from Photo

Adds realistic motion to a static photograph (person moves, fabric flows, hair blows).

- Great for: fashion images, lifestyle photos, product ads where a model wears/uses the product
- Input: photo + motion direction prompt
- Output: short looping or progressive video clip
- Common use case: animate an ecommerce model photo → use in TikTok Shop
- **Status note:** Weavy was acquired by Figma (Oct 30, 2025) and is being folded into "Figma Weave." As of mid-2026 weavy.ai is still live and functional standalone, but expect the product to eventually move fully under the Figma brand — check weavy.ai before relying on it long-term.

**Workflow:**
1. Prepare a clean product/model photo
2. Upload to Weavy AI
3. Describe the desired motion: "model turns and smiles", "dress flows in wind", "product rotates slowly"
4. Generate and download as MP4

## Kling "Image to Video" — High Quality Motion

Kling's image-to-video mode is also excellent for animating photos. Kling 3.0 Turbo/Omni (launched Jun 17, 2026) added 4K editing, longer clips, and the "Elements 3.0" engine — instead of just a photo, you can upload a reference *video* and Kling replicates that subject's 3D structure and motion across new scenes with strong facial/clothing consistency through occlusion (e.g., walking behind an object).

- URL: klingai.com → Image to Video tab
- Higher quality than many tools
- Supports longer clips from a single image; Elements 3.0 for video-reference-driven consistency

## Runway "Act-Two" / Gen-4.5

- URL: runwayml.com
- Gen-4.5 (Dec 2025) is Runway's current flagship video model; a single subscription covers Gen-4, Gen-4 Turbo, Gen-4.5, Aleph, and Act-Two
- **Act-Two** (successor to Act-One) is the character-performance tool for image animation: feed it a driving performance video + a character reference image (generated art, 3D-style portrait, or uploaded photo), and it maps the actor's face, hands, and body language onto your character; an optional voice-control add-on syncs mouth shapes to a separate audio track
- Professional-grade animation from images, more control over motion style and duration than most consumer tools

## Seedance 2.5 (ByteDance) — Long-Form Motion with Native Audio

ByteDance's Seedance 2.5 (the video counterpart to Seedream, built by the TikTok/CapCut team) does native 30-second single-shot image-to-video generation with synced audio (dialogue, SFX, music) in one pass, up to 4K, and accepts up to 50 mixed image/video/text references for consistent characters across a campaign.

- Access: seed.bytedance.com, dreamina.capcut.com, ai.byteplus.com/lumina, replicate.com/bytedance/seedance-2.5
- Best for: longer social/ad clips that need built-in audio without a separate voiceover/SFX pass
- Note: rollout is China-first, with worldwide availability planned shortly after — check regional access before committing a workflow to it

## When to Use Which

| Tool | Best For |
|------|---------|
| Weavy AI | Fashion/lifestyle/ecommerce model motion |
| Kling Image-to-Video | General high-quality animation; video-reference-driven consistency (Elements 3.0) |
| Runway Act-Two / Gen-4.5 | Professional production, fine control, character performance transfer |
| Seedance 2.5 | Long-form (up to 30s) clips with native synced audio |
