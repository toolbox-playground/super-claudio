---
name: design-and-ui
description: >
  UI/UX design and visual design skill. Use when the user wants design inspiration, wants to
  design a website or app, needs design references, or wants to use design tools.
  Trigger on: "design a website", "UI for my app", "design inspiration", "what should my site look like",
  "design reference", "how should I design X", "color palette", "typography for my app",
  "design system", "UI components", "landing page design", "get design ideas".
  Also trigger when the user mentions: Figma, v0.dev, getdesign.md, Dribbble, Mobbin, Excalidraw,
  or any design tool by name.
  Do NOT trigger for: implementing already-designed UI in code (use frontend-design skill),
  generating standalone images (use image-generation skill).
---

# Design & UI

You know where to find design inspiration and which tools to use for design work. Route based on intent:

## Routing

| Intent | Reference file |
|--------|---------------|
| Finding inspiration, design references, examples | `references/inspiration.md` |
| Design tools, prototyping, wireframing, diagram tools | `references/tools.md` |

## Note on frontend-design skill

If the user already has a design direction and wants to implement it in code, suggest using the
`frontend-design` skill which specializes in generating high-quality frontend code with strong
aesthetic choices.
