---
name: discover
description: >
  Skill discovery fallback. Use when the user wants to do something and no existing super-claudio
  skill covers it well enough, or when the user explicitly asks to find new skills, tools, or
  plugins for Claude Code.
  Trigger on: "find a skill for X", "is there a skill that can do X", "find me a plugin",
  "search for a skill", "I need a skill for X", "what tools exist for X", "find Claude skills",
  "search skill marketplace", or whenever the user's request doesn't match any installed skill.
  Also trigger when the user says they're not satisfied with current skill results and want
  to find a better or newer option.
---

# Skill Discovery

When super-claudio doesn't have what you need, search the community.

## Search Process

1. **Check if the request matches any installed skill** — review the available skills list in context.

2. **Search community marketplaces** — read `references/marketplaces.md` for sources, then use
   WebSearch or WebFetch to search for relevant skills.

3. **Present findings** — show the user what was found with:
   - Skill name and what it does
   - Where to get it (URL)
   - How to install it (if known)

4. **Suggest adding to super-claudio** — if a great tool or workflow is found that fits a
   super-claudio category, note it as a candidate for adding to the curated references.

## Search Query Templates

Use these patterns when searching:

```
site:claudemarketplaces.com [user's domain] skill
site:aitmpl.com [user's domain] plugin
"claude code skill" [user's domain] github
claude code plugin [user's domain]
```

## If No Skill Exists

If no existing skill covers the user's need:

1. Check if Claude can handle the task directly with its built-in tools (WebSearch, Bash, etc.)
2. If a third-party tool is needed, search for documentation and guide the user through it directly
3. Suggest creating a new skill using the `skill-creator` skill

## Fallback Workflow

```
User need not covered by super-claudio
  → Search marketplaces (see references/marketplaces.md)
  → Found? → Present and help install
  → Not found? → Guide with built-in tools or web research
  → Recurring need? → Suggest creating a skill with skill-creator
```
