# Image Ad Creatives

## Static Image Ads

### Tools

| Tool | Use | Free |
|------|-----|------|
| **Canva** | Banners, carousels, social posts | Yes (free tier) |
| **Adobe Express** | Quick resizing, brand kits | Free tier |
| **Nano Banana 2** | Product in lifestyle scene | Check site |
| **Flux via fal.ai** | AI-generated product images | API credits |

### Canva Ad Creation Workflow

1. canva.com → Create Design → choose format (Instagram Post, Facebook Ad, etc.)
2. Search templates for "ad" or "product"
3. Replace placeholder image with product photo
4. Edit text: headline, subheadline, CTA button
5. Resize for all platforms in one click (Canva Magic Resize)
6. Export as PNG/JPG

### Meta Advantage+ Creative — Automatic Headline Rewrites on Ad Images (Jul–Aug 2026)

As of late July 2026, Meta Advantage+ Creative can rewrite the headline text baked into an uploaded ad image itself — not just the ad copy field — while preserving the original font, colors, banner, and layout, then generating multiple variants automatically (8 pre-selected by default). This is **on by default** for eligible accounts.

- If your ad images carry baked-in text (headline on a banner, price callout, etc.), fill out Branding under account Identity (logo, fonts, colors, tone, restricted words) so Meta rewrites within your rules instead of freeform
- Turn it off per-creative if you don't want Meta editing text baked into a specific image
- Relevant when designing image ads for Meta: leave clean space/simple typography if you want predictable rewrite results, since Meta is now editing pixels on your uploaded image, not just overlaying new copy

### Prompt for AI-generated ad image (Flux/GPT Image 2)

```
Professional product advertisement photo. [Product] centered on [background].
[Lifestyle context]. Clean composition. Brand color [color]. High resolution.
Text space on [left/right/top/bottom] for headline.
```

## Carousel Ads (Instagram/Facebook)

- 3-10 images telling a story about the product
- Frame 1: hook (problem or bold visual)
- Frames 2-4: features or benefits
- Final frame: CTA + price/offer

Canva has carousel templates — use "Instagram Carousel" template.

## Ad Copy Formula

Use Claude to generate ad copy with this prompt:
```
Write [platform] ad copy for [product]. Target: [audience]. Tone: [tone].
Include: headline (max 40 chars), body (max 125 chars), CTA.
```
