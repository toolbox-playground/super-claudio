# Video Creation for Ads & Social Commerce

> **Tool not chosen yet?** Go back to the `media-content-creation` skill — it will invoke
> `find-ai-tools` to search for current free options and let the user pick.
> This file is a workflow guide for *after* a tool has been selected.

Workflows for creating video content for TikTok Shop, Instagram Shop, Facebook Ads, and
other performance marketing channels.

## Tool Stack for Realistic Product Ads

### Step 1: Generate product image
- Use image generation tools (see image-generation skill) or photograph your product
- Clean white/studio background works best for product isolation

### Step 2: Animate the image (add motion)
- **Weavy AI** (rebranding to Figma Weave after Figma acquisition, Oct 2025) — takes a static image and adds realistic motion (person walks, model poses, fabric moves)
  - Great for: fashion, lifestyle products, showing a model wearing/using your product
  - URL: weavy.ai (transitioning to weave.figma.com)
- **Kling "Image to Video"** — similar approach, strong motion quality
  - URL: klingai.com → Image to Video

### Step 3: Add audio/voiceover (optional)
- See `audio-creation` skill for TTS options (ElevenLabs, Azure Neural TTS)
- Add background music from royalty-free sources (Pixabay Music, Free Music Archive)

### Step 4: Final edit
- Add captions, product name overlay, CTA ("Shop Now", "Link in Bio")
- Use CapCut (free, mobile/desktop) for quick edits and caption overlay
- Or use the `video-editing` reference for ffmpeg-based automation

## aicreator.co — All-in-One Ad Video

aicreator.co generates complete ad videos for Instagram, TikTok, or general ads from a prompt.
- Input: product description / product image
- Output: short-form video with music, captions, CTA
- Good for: fast iteration, testing creatives at scale

## Nano Banana 2 — Image for Ads

Tool for generating ad-optimized product images:
- Creates lifestyle/context images of products
- Input: product image + scene description
- Output: product placed in realistic scene (kitchen, lifestyle, etc.)
- Then: pass to Weavy AI or Kling to animate

## TikTok Shop Workflow

1. Create product image (real photo or Nano Banana 2 scene)
2. Animate with Weavy AI (model interacts with product)
3. Add music + captions (CapCut or ffmpeg)
4. Upload to TikTok with Shop product tag
5. Add affiliate/shop link in description

## Platform Specs

| Platform | Aspect Ratio | Duration | File |
|---|---|---|---|
| TikTok | 9:16 | 15-60s optimal | MP4 |
| Instagram Reels | 9:16 | Up to 90s | MP4 |
| Facebook Ads | 1:1 or 9:16 | 15-30s optimal | MP4 |
| YouTube Shorts | 9:16 | Up to 60s | MP4 |
| WhatsApp | Any | Up to 90s | MP4 |
