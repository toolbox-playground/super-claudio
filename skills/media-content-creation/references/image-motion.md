# Animating Static Images

Tools that take a still image and add realistic motion to it.

## Weavy AI (now "Figma Weave") — Node-Based Motion from Photo

Figma acquired Weavy in October 2025 and is folding it into a new product, "Figma Weave"; Weavy continues to run as a standalone tool in the meantime. It's no longer a single proprietary motion model — it's a node-based canvas that routes an image into several different image-to-video models at once (e.g. Kling, others) so you can branch, compare, and remix outputs side by side, plus chain in editing steps (background removal, lighting/color/angle adjustments) before or after animating.

- Great for: fashion images, lifestyle photos, product ads where a model wears/uses the product; comparing motion styles across models without switching tools
- Input: photo + motion direction prompt
- Output: short looping or progressive video clip
- Common use case: animate an ecommerce model photo → use in TikTok Shop

**Workflow:**
1. Prepare a clean product/model photo
2. Upload to Weavy AI
3. Describe the desired motion: "model turns and smiles", "dress flows in wind", "product rotates slowly"
4. Optionally branch the same input into multiple video models to compare results
5. Generate and download as MP4

## Kling 3.0 "Image to Video" — High Quality Motion

Kling 3.0 (released Feb 7, 2026) turns a photo into a moving, speaking video clip with native audio.

- URL: klingai.com / kling.ai → Image to Video tab
- Character consistency lock from a single reference photo (or multiple angles) so faces don't distort during motion
- Native audio and multi-language lip-sync — the image can talk, not just move
- Up to 4K resolution, clips up to ~15 seconds
- Motion Control for directing camera pans/tilts/zooms, or defining exact start/end frames

## Runway Gen-4.5 (image-to-video; "Act One" performance capture folded in)

- URL: runwayml.com
- Professional-grade animation from images; current documented version is Gen-4.5 (marketing pages reference a "Gen-5" name, but Runway's own help docs still describe Gen-4.5 as the shipping image-to-video model)
- Keeps a character's face/hair/clothing/style consistent across shots — useful for recurring brand mascots or series content
- Works from natural-language prompts, keyframes, or both; optimized for fast iteration
- More control over motion style and duration than most competitors

## FLUX 3 Video (Black Forest Labs) — New, Early Access

Black Forest Labs' FLUX 3 (announced Jul 23, 2026) is video-first and does image-to-video with **native synchronized audio** baked in (dialogue lip-syncs, impact sounds match the frame) rather than motion only. It's early access and gated, so treat it as one to watch rather than a default pick yet.

- URL: bfl.ai (gated early-access signup), also available via krea.ai
- Output: up to 20-second clips, native audio, resolutions up to 4K (qhd/uhd added Sep 10, 2026)
- Pricing: $0.17/sec (HD) or $0.29/sec (Full HD) — no free tier
- In BFL's own (vendor-reported, not independently verified) comparisons, testers preferred FLUX 3 over Runway Gen-4.5 77% of the time and over Kling v3 Pro 60% of the time

## When to Use Which

| Tool | Best For |
|------|---------|
| Weavy AI / Figma Weave | Comparing motion across multiple models; fashion/lifestyle/ecommerce workflows with extra editing steps |
| Kling 3.0 Image-to-Video | General high-quality animation, especially with talking/lip-synced characters |
| Runway Gen-4.5 | Professional production, fine control, consistent characters across shots |
| FLUX 3 Video | Image-to-video with native synced audio in one pass (early access, gated) |
