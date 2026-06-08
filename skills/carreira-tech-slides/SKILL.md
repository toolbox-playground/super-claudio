---
name: super-claudio:carreira-tech-slides
description: >
  Transforms DevOps Mentoria PPTX slides into Carreira Tech "Do Zero ao Primeiro Emprego"
  beginner-friendly slides, preserving original images at correct aspect ratios and adapting
  all content for an absolute beginner audience using the TBXTech visual identity.
  Trigger on: "transformar slides da mentoria para carreira tech", "adaptar aula devops para iniciante",
  "criar slides do curso carreira tech", "converter pptx mentoria para iniciante",
  "retraduza o ppt", "adaptar aula para público iniciante", "criar nova aula carreira tech",
  "transform mentoria slides", "adapt devops slides for beginners",
  "criar slides TBXTech", "nova aula do curso carreira tech".
  Also trigger when: user shares a PPTX from the DevOps Mentoria and asks to adapt it for
  the Carreira Tech course, or asks to create a new lesson in the TBXTech beginner pattern.
  Do NOT trigger for: creating HTML pages from slides (use webpage-from-slides),
  generic presentation creation (use productivity), video or image generation.
---

# Carreira Tech Slides — DevOps Mentoria → Iniciante

You transform DevOps Mentoria PPTX decks into polished beginner-friendly slides for the
**Carreira Tech — Do Zero ao Primeiro Emprego** course by TBXTech.

## Core Principle

The DevOps Mentoria audience = people already in tech (intern/junior level).
The Carreira Tech audience = **absolute beginners** who have never touched a computer professionally.

Every transformation must:
1. **Extract and reuse** original images at their correct aspect ratio — never stretch
2. **Rewrite** all explanations starting from zero — no assumed knowledge
3. **Add analogies** from everyday life before any technical concept
4. **Follow** the TBXTech visual identity exactly

## Routing

| Intent | Reference file |
|--------|---------------|
| Full step-by-step workflow | `references/workflow.md` |

Always load `references/workflow.md` before starting. It contains the complete build sequence,
TBXTech identity constants, pptxgenjs helpers, image extraction commands, aspect ratio rules,
content adaptation principles, and the full build.js template.
