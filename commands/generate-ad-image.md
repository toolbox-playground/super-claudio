---
name: generate-ad-image
description: Generate a product image ready for ads — uses the best available AI image tools to create lifestyle or studio product photos
---

# Generate Ad Image

Create a high-quality product image optimized for TikTok, Instagram, or Facebook ads.

## Step 1: Understand the need

Ask the user:
1. What is the product? (describe it)
2. Do you have a product photo to use as a base, or starting from scratch?
3. What scene/context? (white studio, kitchen, lifestyle, person holding it, etc.)
4. Target platform? (TikTok, Instagram feed, Instagram Stories, Facebook)
5. Any brand colors or style requirements?

## Step 2: Choose the right tool

Load `skills/image-generation/references/realistic.md` and follow this decision:

| Situation | Tool |
|-----------|------|
| Have product photo + want lifestyle scene | Nano Banana 2 |
| Starting from scratch, need photorealistic | Flux via fal.ai |
| Need text on the image (price, label) | DALL-E 3 or Ideogram |
| Need multiple quick variants | Flux (fast generation) |

## Step 3: Write the generation prompt

Use this formula:
```
Professional product advertisement photo.
[Product name] [position/action] on [background/scene].
[Lighting]: [warm/cool/studio/natural].
[Style]: photorealistic, high resolution, commercial photography.
[Extra context if any].
Leave [space direction] for text overlay.
```

Example:
```
Professional product advertisement photo.
Artisan coffee bag centered on a rustic wooden table in a modern café.
Warm morning light from the left. Photorealistic, high resolution, commercial photography.
Leave top third for headline text overlay.
```

## Step 4: Generate and iterate

Generate 3-4 variants. If none are perfect:
- Adjust the lighting description
- Change the background
- Try "aerial view" or "45-degree angle" for different composition
- Add "shallow depth of field" for professional look

## Step 5: Prepare for ads

For TikTok/Reels (9:16): ensure the image has vertical space or crop accordingly
For Instagram feed (1:1): square crop with product centered
For Facebook (16:9): horizontal orientation works best

Once the image is ready → hand off to `marketing-and-ads` skill or run `/super-claudio:create-tiktok-ad` for the full ad pipeline.
