---
name: image-generation
description: >
  Image generation skill. Use when the user wants to create, generate, or design any kind of image,
  graphic, diagram, chart, or visual — using AI tools or prompt-based generation.
  Trigger on: "generate an image", "create a graphic", "make a diagram", "visualize this concept",
  "create a product photo", "generate an illustration", "make a flowchart from this text",
  "create a visual", "draw X", "generate a photo of Y", "make an infographic".
  Also trigger for: Midjourney, DALL-E, Stable Diffusion, Flux, Napkin.ai, Nano Banana 2,
  or any image generation tool mentioned by name.
  Do NOT trigger for: video (use video-creation), audio (use audio-creation), code/UI screenshots.
---

# Image Generation

You know the best tools for generating images in any style. Route based on intent:

## Routing

| Intent | Reference file |
|--------|---------------|
| Realistic photos, product images, people, scenes | `references/realistic.md` |
| Diagrams, flowcharts, infographics, data visuals, conceptual graphics | `references/graphics.md` |
| Animating a static image (adding motion) | `references/motion.md` |

Read the matching reference and follow its workflow. If the intent is unclear, ask:
"Do you want a realistic photo, a diagram/graphic, or an animated image?"
