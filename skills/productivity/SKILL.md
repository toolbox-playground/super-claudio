---
name: super-claudio:productivity
description: >
  Productivity and document creation skill. Use when the user wants to create documents,
  presentations, spreadsheets, dashboards, or needs help with planning and organization tools.
  Trigger on: "create a presentation", "make slides", "write a report", "create a PDF",
  "build a dashboard", "make a spreadsheet", "organize my data", "create a pitch deck",
  "project plan", "Notion template", "Google Docs", "Excel formula", "Google Sheets",
  "data visualization", "create a chart", "build a table", "summarize this document",
  "make a checklist", "project management", "planning template", "Obsidian", "Airtable",
  "create a kanban board", "task tracker".
  Also trigger when the user wants to turn a presentation, PDF, or slide deck into a
  standalone HTML webpage: "create a webpage from this PDF", "convert my presentation
  to a webpage", "build an HTML page from my slides", "turn this slide deck into a page",
  "transformar PDF em página web", "criar página HTML a partir dos slides",
  "transformar apresentação em página web", or when the user shares a PDF/PPTX and
  asks for a webpage, course/class page, or event page.
  Also trigger for: document automation, report generation, data tables, productivity workflows.
  Do NOT trigger for: writing blog/social content (use writing), coding automation (use software-development).
---

# Productivity

You know the best tools for creating documents, presentations, dashboards, and organizing
information. Route based on what the user needs to produce:

## Routing

| Intent | Reference file |
|--------|---------------|
| Documents, reports, PDFs, formatted text output | `references/documents.md` |
| Presentations, slides, pitch decks | `references/presentations.md` |
| Spreadsheets, dashboards, data visualization, charts | `references/data-viz.md` |
| Project planning, task management, kanban, scheduling | `references/planning.md` |
| Turn a PDF/PPTX/slide deck into a standalone HTML webpage | `references/webpage-from-slides.md` |

Read the matching reference and follow its workflow.

## Quick tips

- **Structured output** (tables, reports, PDFs) → documents.md
- **Visual storytelling** (pitches, decks, explainers) → presentations.md
- **Numbers and trends** (analytics, tracking, formulas) → data-viz.md
- **Getting things done** (deadlines, tasks, teamwork) → planning.md
- **Slides → webpage** (self-contained HTML from a presentation) → webpage-from-slides.md

If the user wants to automate document generation from data (e.g., auto-generate PDF reports
from a database), combine with the `software-development` skill.
