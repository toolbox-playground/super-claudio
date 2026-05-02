# Super Cláudio

> Se Claude tivesse nascido no Brasil, chamaria Cláudio.

A curated Claude Code plugin with skills for **anything Claude can do** — from video creation to
API development to marketing content. No more paid courses. No more scattered Instagram videos.
Everything in one place.

## Skills

| Skill | Triggers on | Key Tools |
|-------|-------------|-----------|
| `video-creation` | "make a video", "create TikTok content" | Kling, Higssfield, Remotion, aicreator.co |
| `audio-creation` | "text to speech", "summarize as audio" | Azure TTS (Francisca Neural), ElevenLabs |
| `image-generation` | "generate an image", "create a diagram" | Nano Banana 2, Flux, Napkin.ai, Weavy AI |
| `marketing-and-ads` | "create an ad", "TikTok Shop content" | Kling, Nano Banana 2, CapCut, aicreator.co |
| `design-and-ui` | "design a website", "UI inspiration" | v0.dev, getdesign.md, Figma, Excalidraw |
| `free-apis` | "free API for X", "build a weather app" | NASA EONET, OpenWeather, Open-Meteo |
| `discover` | "find a skill for X", nothing else matches | claudemarketplaces.com, aitmpl.com |

## Architecture

Each skill uses a **hybrid routing pattern**:
1. **Description-level**: Claude matches your prompt to the right category automatically
2. **Body-level routing**: The skill reads your intent and loads only the relevant reference
3. **Reference files**: Deep knowledge of tools, workflows, and code examples — loaded on demand

This means Claude never loads 10 skill bodies at once. It loads one description → routes to one
reference → gives you exactly what you need.

## Install

```bash
# Clone into your Claude plugins directory
git clone https://github.com/caioroscelly/super-claudio ~/.claude/plugins/super-claudio
```

## Contributing

Skills get outdated fast — the AI tools landscape changes weekly. If you find a better tool,
an updated workflow, or a missing category:

1. Fork the repo
2. Update the relevant `references/*.md` file
3. Open a PR with a brief description of what changed and why

## Philosophy

> "There's a skill for that" — but the knowledge shouldn't be locked behind paid courses or
> scattered across Instagram videos. Super Cláudio is the free, community-maintained answer.
