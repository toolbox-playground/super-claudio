---
name: create-tiktok-ad
description: End-to-end TikTok ad creation pipeline — from product image to finished video ad with voiceover and captions
---

# Create TikTok Ad

You are running the end-to-end TikTok ad creation pipeline. Guide the user through each step
in sequence, completing each before moving to the next.

## Step 1: Gather requirements

Ask the user:
1. What is the product? (description + any existing image)
2. Target audience? (age, interest, location)
3. What is the main message or hook?
4. Do they have a product image, or do they need one generated?
5. Language for voiceover? (Portuguese, English, Spanish, etc.)

## Step 2: Product image

If they have an image → proceed to Step 3.
If they need one → use the `image-generation` skill:
- Load `skills/image-generation/references/realistic.md`
- Use Nano Banana 2 or Flux for a lifestyle/product-in-context image
- Generate 2-3 variants, let user pick

## Step 3: Animate the image

Load `skills/video-creation/references/ads.md` → Weavy AI or Kling Image-to-Video section.
- Guide user to animate the chosen image (5-10 second clip)
- Motion prompt: "product displayed prominently, subtle camera movement, clean background"

## Step 4: Voiceover

Load `skills/audio-creation/references/tts.md`.
- Write a 15-20 second script: hook (3s) + product benefit (10s) + CTA (5s)
- Generate with edge-tts:

```bash
edge-tts --voice [language-voice] --text "[script]" --write-media voiceover.mp3
```

Portuguese: `pt-BR-FranciscaNeural`
English: `en-US-JennyNeural`
Spanish: `es-ES-ElviraNeural`

## Step 5: Merge video + audio

```bash
ffmpeg -i product_clip.mp4 -i voiceover.mp3 -c:v copy -c:a aac -shortest ad_with_audio.mp4
```

## Step 6: Final checklist before publishing

- [ ] Video is 9:16 (1080x1920)
- [ ] Duration: 15-30 seconds
- [ ] Captions added (CapCut auto-captions or Whisper)
- [ ] CTA visible on screen ("Shop Now", "Link in Bio")
- [ ] Product tag added if using TikTok Shop

Load `skills/marketing-and-ads/references/ecommerce.md` for TikTok Shop upload instructions.
