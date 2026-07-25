# Image Ad Creatives

## Static Image Ads

### Tools

| Tool | Use | Free |
|------|-----|------|
| **Canva** | Banners, carousels, social posts | Yes (free tier) |
| **Adobe Express** | Quick resizing, brand kits | Free tier |
| **Nano Banana 2** | Product in lifestyle scene | Check site |
| **Flux via fal.ai** | AI-generated product images | API credits |
| **Meta Advantage+ Creative (Muse Image)** | Native in-Ads-Manager image gen/editing for Meta campaigns | Included with Meta Ads account |

### Canva Ad Creation Workflow

1. canva.com → Create Design → choose format (Instagram Post, Facebook Ad, etc.)
2. Search templates for "ad" or "product"
3. Replace placeholder image with product photo
4. Edit text: headline, subheadline, CTA button
5. Resize for all platforms in one click (Canva Magic Resize)
6. Export as PNG/JPG

### Prompt for AI-generated ad image (Flux/GPT Image 2)

```
Professional product advertisement photo. [Product] centered on [background].
[Lifestyle context]. Clean composition. Brand color [color]. High resolution.
Text space on [left/right/top/bottom] for headline.
```

## Meta Advantage+ Creative — Native Image Gen Inside Meta Ads Manager (Muse Image, Q3 2026)

Meta is rolling Muse Image (announced July 7, 2026) into Advantage+ Creative across Q3 2026 for all 8M+ Advantage+ advertisers — no separate tool or upload needed.

1. Open Ads Manager → Advantage+ Creative on any campaign
2. Describe the edit or scene conversationally ("place this product on a marble counter in morning light")
3. Blend multiple visual references, generate lifestyle variations, or create new backgrounds around an existing product shot
4. Can also pull static images directly out of video creative you've already uploaded

**Access:** Included with any Meta Ads account, rolling out through Q3 2026 — no extra cost.
**Best for:** Meta-first advertisers who want image variation testing without leaving Ads Manager.
**Not ideal for:** Cross-platform creative (use Nano Banana 2 or Flux and export manually); note a related @-mention-a-public-account personalization feature was pulled July 10, 2026 after privacy concerns — the core image-gen rollout is unaffected.

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
