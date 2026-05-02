# Video Ad Creation

## Fast Workflow: Product Video Ad in Under 30 Minutes

### Tools needed
- Product image (real photo or AI-generated)
- Kling or Higssfield (animation)
- CapCut or ffmpeg (captions/CTA overlay)
- ElevenLabs or edge-tts (optional voiceover)

### Steps

1. **Get or create a product image**
   - Real product photo: best quality
   - AI-generated scene: use Nano Banana 2 or Flux (see image-generation skill)

2. **Animate the image**
   - Go to klingai.com → Image to Video
   - Upload image, describe motion: "product slowly rotates on pedestal", "model holds product and smiles at camera"
   - Generate 5-second clip

3. **Add voiceover (optional)**
   ```bash
   edge-tts --voice pt-BR-FranciscaNeural \
     --text "Apresentando o produto X. Qualidade premium, entrega rápida. Compre agora!" \
     --write-media voiceover.mp3
   ```

4. **Merge video + audio + captions**
   ```bash
   # Add voiceover to video
   ffmpeg -i product_clip.mp4 -i voiceover.mp3 \
     -c:v copy -c:a aac -shortest output_with_audio.mp4
   ```
   Or use CapCut: import video + audio, add auto-captions, add text overlay for CTA.

5. **Add CTA overlay**
   In CapCut: Text → "Shop Now" / "Link in Bio" → style to match brand

6. **Export for platform**
   - TikTok/Reels: 1080x1920, MP4, H.264
   - Facebook: 1080x1080 (square) or 9:16

## aicreator.co — Automated Ad Video

For users who want a single-tool solution:
1. Go to aicreator.co
2. Upload product image + describe the product
3. Select target platform (TikTok, Instagram, general)
4. Generate → download complete ad video with music and captions

## Higssfield (Hailuo) for Premium Ads

When you need the highest realism (luxury products, fashion):
1. Prepare a high-quality product/lifestyle image
2. Upload to hailuoai.video
3. Write a detailed prompt describing the camera movement and mood
4. Generate — Higssfield produces cinematic results that feel like professional ad shoots
