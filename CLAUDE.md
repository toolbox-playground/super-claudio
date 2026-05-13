# Super Cláudio — Plugin Guide

Super Cláudio is a curated Claude Code plugin with skills for anything Claude can do.
When a user asks to create, generate, build, or automate something, check this guide
to route them to the right skill before responding.

## Skill Map — When to Use What

| User wants to... | Use skill |
|-----------------|-----------|
| Create videos, audio, images, voiceovers, graphics, or animate media | `media-content-creation` |
| Build APIs, databases, automate workflows, write scripts, use free APIs, deploy | `software-development` |
| Turn a PDF or slide deck into a standalone HTML webpage | `webpage-from-slides` |
| Create ads, TikTok Shop content, ecommerce creatives, marketing campaigns | `marketing` |
| Write blog posts, social captions, SEO content, ad copy, email newsletters | `writing` |
| Design a website or app UI, find design inspiration, use design tools | `design` |
| Create documents, presentations, spreadsheets, dashboards, project plans | `productivity` |
| Use the Claude API, build AI apps, create skills/agents/MCP servers, prompt engineering | `ai-and-agents` |
| Find the best AI web tools for any category with honest free-tier info | `find-ai-tools` |
| Find a Claude Code skill or plugin that doesn't exist yet in super-claudio | `discover-skills` |

## Routing Philosophy

Each skill uses a **hybrid routing pattern**:
1. The skill description auto-triggers on matching prompts — no slash command needed
2. The skill body reads user intent and loads only the relevant reference file
3. Reference files contain the deep tool knowledge — workflows, code examples, URLs

This means context stays lean: one category skill body + one reference file per request.

## Fallback

If the user wants to find an **AI web tool** (SaaS product), invoke `find-ai-tools`.
If no **Claude Code skill** matches, invoke `discover-skills` to search community marketplaces.

## Slash Commands

Every skill is automatically a slash command. Type `/super-claudio:` to see the full list.
No separate command files needed — skills cover both AI-triggered and user-triggered invocation.

## Agent Workflows

For complex multi-step content creation, specialized agents are available:
- `ad-creator` — autonomous end-to-end ad creation (image → animate → voiceover → edit)
- `content-pipeline` — draft copy → generate visuals → format for platform

## Spirit

> Super Cláudio exists so the knowledge scattered across paid courses and Instagram videos
> is free, organized, and always up to date. When in doubt, route — don't improvise.
