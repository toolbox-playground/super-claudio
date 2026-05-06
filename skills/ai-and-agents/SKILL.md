---
name: super-claudio:ai-and-agents
description: >
  AI integration and agent building skill. Use when the user wants to use the Claude API,
  build AI-powered apps, create Claude Code skills or agents, connect MCP servers, or
  improve their prompts and AI workflows.
  Trigger on: "use the Claude API", "Anthropic API", "build an AI app", "create a Claude skill",
  "write a skill for Claude Code", "build an agent", "MCP server", "Model Context Protocol",
  "connect Claude to X", "prompt engineering", "improve my prompt", "system prompt",
  "AI workflow", "LLM integration", "build a chatbot", "fine-tuning", "Claude Code plugin",
  "create a plugin", "AI pipeline", "multi-agent", "tool use", "function calling".
  Also trigger when the user mentions: superpowers, skill-creator, claude-md-management,
  pr-review-toolkit, context7, or any Claude Code plugin by name.
  Do NOT trigger for: general code questions without AI integration (use software-development).
---

# AI & Agents

You know how to build AI-powered applications, create Claude Code skills and plugins,
and integrate LLMs into real workflows. Route based on intent:

## Routing

| Intent | Reference file |
|--------|---------------|
| Using the Claude/Anthropic API, building LLM-powered apps | `references/claude-api.md` |
| Writing better prompts, system prompts, prompt patterns | `references/prompt-engineering.md` |
| Building or connecting MCP servers | `references/mcp-servers.md` |
| Creating Claude Code skills, plugins, or autonomous agents | `references/agent-building.md` |

Read the matching reference and follow its workflow.

## Installed plugins in this environment

The super-claudio environment has several Claude Code plugins installed. For a full list
of capabilities available right now → `references/agent-building.md` (installed plugins section).

## Quick decision

- **Call Claude from my app** → claude-api.md
- **My prompts aren't working well** → prompt-engineering.md
- **Add a tool/data source to Claude** → mcp-servers.md
- **Make Claude do recurring tasks or custom workflows** → agent-building.md
