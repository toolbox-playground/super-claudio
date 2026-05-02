# Super Cláudio — Plugin Guide

Super Cláudio is a curated Claude Code plugin with skills for anything Claude can do.
When a user asks to create, generate, build, or automate something, check this guide
to route them to the right skill before responding.

## Skill Map — When to Use What

| User wants to... | Use skill |
|-----------------|-----------|
| Create any kind of video (TikTok, Instagram, realistic, animated, WhatsApp) | `video-creation` |
| Generate speech, voiceover, narration, article summary as audio | `audio-creation` |
| Generate an image, diagram, graphic, infographic, or animate a photo | `image-generation` |
| Create ad content, TikTok Shop videos, Instagram ads, ecommerce creatives | `marketing-and-ads` |
| Design a website or app UI, find design inspiration, use design tools | `design-and-ui` |
| Write blog posts, social captions, SEO content, ad copy, email newsletters | `content-writing` |
| Automate workflows, connect apps with n8n/Make/Zapier, schedule scripts | `automation-and-workflows` |
| Build a backend API, set up a database, deploy a server | `backend-development` |
| Find a free public API to use in a project | `free-apis` |
| Find a skill or plugin that doesn't exist yet in super-claudio | `discover` |

## Routing Philosophy

Each skill uses a **hybrid routing pattern**:
1. The skill description auto-triggers on matching prompts — no slash command needed
2. The skill body reads user intent and loads only the relevant reference file
3. Reference files contain the deep tool knowledge — workflows, code examples, URLs

This means context stays lean: one category skill body + one reference file per request.

## Fallback

If no skill matches well, **always invoke `discover`** before answering from general knowledge.
The discover skill searches community marketplaces for newer, more specialized skills.

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
