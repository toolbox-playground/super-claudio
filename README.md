# Super Cláudio

<div align="center">

**A curated Claude Code plugin with skills for anything Claude can do.**

*No more paid courses. No more scattered videos. Everything in one place, free.*

[![Install](https://img.shields.io/badge/Install-Claude_Code_Plugin-6B46C1?style=for-the-badge&logo=claude&logoColor=white)](https://github.com/toolbox-playground/super-claudio)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Skills](https://img.shields.io/badge/Skills-8_categories-blue?style=for-the-badge)](#skills)

[🇧🇷 Ler em Português](README.pt.md)

---

> *If Claude was Brazilian or Hispanic, he would be named Cláudio.*

</div>

---

## Install

One command. Works immediately after.

```bash
claude plugin install github.com/toolbox-playground/super-claudio
```

> **Requirements:** Claude Code CLI installed. Get it at [claude.ai/code](https://claude.ai/code).

---

## How It Works

Just talk to Claude naturally. The right skill activates automatically.

```
"Create a TikTok video for my product"     → media-content-creation
"Build a REST API with authentication"     → software-development
"Write an Instagram caption"               → writing
"Make a pitch deck for investors"          → productivity
"Build a Claude Code skill for X"          → ai-and-agents
```

No slash commands needed (though they work too: `/super-claudio:writing`).

---

## Skills

| Category | What it covers | Example triggers |
|----------|---------------|-----------------|
| [media-content-creation](#media-content-creation) | Video, audio, image generation | "make a video", "text to speech", "generate an image" |
| [software-development](#software-development) | APIs, databases, automation, deployment, free APIs | "build an API", "automate with n8n", "free weather API" |
| [marketing](#marketing) | Ad creatives, TikTok/Instagram Shop, ecommerce | "create a TikTok ad", "Instagram Shop content" |
| [writing](#writing) | Blog, SEO, social captions, copywriting, newsletters | "write a blog post", "TikTok hook", "email newsletter" |
| [design](#design) | UI/UX inspiration, Figma, v0.dev, prototyping | "design a website", "UI inspiration", "wireframe" |
| [productivity](#productivity) | Documents, presentations, dashboards, planning | "create a pitch deck", "project plan", "build a dashboard" |
| [ai-and-agents](#ai-and-agents) | Claude API, prompt engineering, MCP servers, skill creation | "use the Claude API", "build an MCP server", "create a skill" |
| [discover](#discover) | Find skills not in this plugin | "find a skill for X" |

---

### media-content-creation

Everything for creating media content — from a cinematic AI video to a voiceover to an image.

| Sub-skill | Tools |
|-----------|-------|
| Realistic video | Kling, Higssfield, Hailuo, Seedance |
| Programmatic / animated video | Remotion, Weavy AI, aicreator.co |
| Video ads | Kling, CapCut, aicreator.co |
| Video editing | CapCut, FFmpeg |
| Text-to-speech / voiceover | Azure TTS (pt-BR Francisca Neural), ElevenLabs |
| Music / jingles | Suno, Udio |
| Realistic images | Nano Banana 2, Flux, Midjourney, DALL-E |
| Diagrams / infographics | Napkin.ai |
| Animate static images | Weavy AI |

---

### software-development

Backend APIs, databases, automation workflows, deployment, and free public APIs.

| Sub-skill | Tools |
|-----------|-------|
| Database design & ORM | Supabase, PostgreSQL, Prisma, MongoDB |
| REST / GraphQL APIs | FastAPI, Fastify, Express |
| Deployment & CI/CD | Railway, Docker, GitHub Actions |
| Visual workflow automation | n8n (self-hosted) |
| Cloud automation | Make.com, Zapier, IFTTT |
| Python/Bash scripting | APScheduler, watchdog, cron |
| Free public APIs | NASA EONET, Open-Meteo, 50+ catalog |
| Git & GitHub | `gh` CLI, GitHub MCP server, GitHub Actions, commit conventions |
| Testing & security | pytest, Jest, Playwright, OWASP checklist |

---

### marketing

Performance-oriented ad creatives and ecommerce content.

| Sub-skill | Tools |
|-----------|-------|
| Video ads | Kling, aicreator.co, CapCut |
| Image/banner ads | Nano Banana 2, Canva, Adobe Express |
| TikTok Shop / Instagram Shop | Full ecommerce workflow |

---

### writing

Written content for every platform and purpose.

| Sub-skill | Covers |
|-----------|--------|
| SEO & blog | Long-form articles, keyword strategy, meta descriptions |
| Social media | TikTok hooks, Instagram captions, X/Twitter threads |
| Copywriting | Ad copy, email newsletters, landing pages, brand voice |

---

### design

Design inspiration and tooling for websites and apps.

| Sub-skill | Tools |
|-----------|-------|
| Inspiration & references | getdesign.md, Dribbble, Mobbin |
| Design tools | Figma, v0.dev, Excalidraw |

---

### productivity

Create documents, presentations, data visualizations, and project plans.

| Sub-skill | Tools |
|-----------|-------|
| Documents & reports | Pandoc, python-docx, Notion |
| Presentations & slides | Gamma.app, Marp, Beautiful.ai |
| Dashboards & charts | Plotly, Streamlit, Metabase, Chart.js |
| Project planning | Linear, Notion, GitHub Projects |

---

### ai-and-agents

Build AI-powered apps and extend Claude itself.

| Sub-skill | Covers |
|-----------|--------|
| Claude / Anthropic API | SDK usage, tool use, streaming, model selection |
| Prompt engineering | Few-shot, chain-of-thought, structured output, templates |
| MCP servers | Connect Claude to any data source or service |
| Skill & plugin creation | Build, test, and publish Claude Code skills |

---

### discover

When no skill above matches, `discover` searches community marketplaces automatically:
- [claudemarketplaces.com](https://claudemarketplaces.com)
- [theresaskillforthat.com](https://theresaskillforthat.com)
- [aitmpl.com](https://aitmpl.com)
- [github.com/obra/superpowers](https://github.com/obra/superpowers)

---

## Architecture

Each skill uses a **three-level routing pattern** that keeps Claude's context lean:

```
User prompt
    │
    ▼
Skill description   ← always loaded (~100 words), handles category matching
    │
    ▼
SKILL.md body       ← loaded when triggered, routes to the right sub-skill
    │
    ▼
Reference file      ← loaded on demand, contains tools + workflows + code
```

One description → one body → one reference. Never loads everything at once.

---

## Contributing

The AI tools landscape changes weekly. If you find a better tool, an updated workflow, or a
missing category:

1. Fork the repo
2. Update the relevant `skills/<category>/references/*.md` file
3. Open a PR — title: `feat(<category>): <what changed and why>`

---

## License

MIT — free to use, fork, and remix.

---

<div align="center">

*Super Cláudio exists so the knowledge scattered across paid courses and Instagram videos*
*is free, organized, and always up to date.*

</div>
