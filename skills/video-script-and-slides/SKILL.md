---
name: super-claudio:video-script-and-slides
description: >
  Creates a spoken video script (roteiro) plus a local HTML slide presentation for a
  self-recorded talking-head video — the creator records themselves; AI prepares the
  material. Researches REAL data and verified sources on the internet for the topic.
  Trigger on: "cria um roteiro sobre", "roteiro para vídeo sobre", "roteiro e apresentação",
  "roteiro e slides", "me ajuda a preparar um vídeo sobre", "apresentação para meu vídeo",
  "slides para o vídeo de", "vou gravar um vídeo sobre", "preparar conteúdo sobre",
  "create a video script about", "script and slides for my video",
  "help me prepare a video about".
  Also trigger when: the user gives a content topic/theme (career tips, free courses,
  certifications, tech questions like "vale a pena X em 2026?") and wants material to
  record a video about it.
  Do NOT trigger for: fully AI-generated videos with narration and rendering (use
  media-content-creation), webpages from existing slide decks (use productivity),
  blog posts without a video (use writing).
---

# Video Script and Slides — Material for Self-Recorded Videos

You prepare everything a person needs to record an authentic talking-head video about a
topic: a natural spoken script and a local HTML presentation to show on screen.
The human records; you research and structure. Warm, direct tone — a creator speaking
to their audience, not a corporate ad.

## Core Principles

1. **Real data only.** Every number, course, price, or claim comes from internet research
   with the source verified NOW (fetch the page; confirm it says what you cite). If you
   can't verify it, don't put it in the material. No invented stats, ever.
2. **The script serves a human speaker.** Talking points and key phrases in natural spoken
   register — not an essay to memorize. The presenter reads it once and talks over the slides.
3. **One slide ≈ one minute.** A 5-minute video = ~5 content slides. Succinct: big type,
   few words, one idea per slide. The speaker delivers the details, not the slide.

## What the user controls (parse from the request)

| Parameter | Default | Notes |
|---|---|---|
| Topic | required | A sentence or theme; may be part of a series ("Dicas de carreira: …") |
| Duration | 5 min | drives slide count: ~1 slide per minute + cover and closing |
| Language | language of the user's request | script and slides |
| Output dir | `~/Movies/video-talks/<slug>/` | ask only if the user hints elsewhere |

## Pipeline (always in this order)

1. **Research** — WebSearch for real facts; WebFetch/verify every source; collect 4–8
   concrete data points with source name + date
2. **Script** — script.md: hook, one section per slide with talking points + timing,
   transitions, closing CTA
3. **Slides** — slides.html: single local file (HTML+CSS+JS inline), keyboard-only
   navigation, real SVG logos, data with cited sources
4. **Publishing kit** — youtube.md (title options, full description with chapters and
   links, hashtags) + capa.html (1–2 thumbnail mockups, 16:9)
5. **Verify + deliver** — open/screenshot slides and thumbnails, check every slide
   renders, deliver all files

## Routing

| Step | Reference file |
|---|---|
| Full workflow: research rules, script format, slide template | `references/workflow.md` |

Always load `references/workflow.md` before starting.

## Hard rules

- Verify every URL you cite or recommend (courses, articles, certifications) by fetching
  it — dead links and paywalled "free" courses destroy the video's credibility.
- Free-course claims need triple-checking: is it free TODAY, does it really give a
  certificate, is the certificate free too? State exactly what you confirmed.
- Real logos from Devicon/SVGL (verify HTTP 200 + `<svg`); trademark use is educational.
- Slides are 16:9, self-contained (no CDN, no internet needed to present), work offline
  by double-clicking the file.
- Sources appear ON the slide (small footer line) — the video gains authority when the
  audience sees where numbers come from.
- Script must sound like a person talking, not text being read: short sentences,
  natural contractions (in pt-BR: "pra", "tá"), direct address to the viewer.
- Prefer data for the user's country/market when it exists; global data is the fallback
  and must be labeled as global. Actively look for official localized versions of every
  platform you recommend (e.g., /pt-BR/ paths); state language availability honestly.
- Slides navigate by keyboard only — clicking must never advance (people click to copy).
- If the user's context (memory/CLAUDE.md) defines a brand identity, apply its colors and
  footer to slides and thumbnails without being asked.
