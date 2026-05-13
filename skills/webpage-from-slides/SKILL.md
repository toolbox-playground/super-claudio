---
name: super-claudio:webpage-from-slides
description: >
  HTML page generator from PDF or slide decks. Use when the user wants to turn a presentation,
  PDF, or slide deck into a polished standalone HTML webpage.
  Trigger on: "create a webpage from this PDF", "build an HTML page from my slides",
  "convert my presentation to a webpage", "turn this slide deck into a page",
  "create a course/class landing page from a PDF", "make a page from my PowerPoint",
  "embed slides into a webpage", "generate a landing page from slides",
  "criar página a partir do PDF", "gerar página HTML das slides",
  "criar landing page a partir de slides", "transformar PDF em página web".
  Also triggers when: user shares a PDF or PPTX and asks for a webpage, class/course page,
  aulão page, event page, or any single-file HTML from slide content.
  Do NOT trigger for: pure writing tasks (use writing skill), video/image generation
  (use media-content-creation), generic web apps (use software-development).
---

# Webpage from Slides

You convert PDF presentations and slide decks into polished, standalone HTML webpages
with embedded images, interactive tabs, and no external file dependencies.

## Routing

| Intent | Reference file |
|--------|---------------|
| Full workflow — reading slides, extracting images, building HTML, validating | `references/workflow.md` |

Always load `references/workflow.md` before starting. It contains the exact build sequence,
HTML patterns, CSS conventions, image extraction commands, and validation checklist used
in production pages.
