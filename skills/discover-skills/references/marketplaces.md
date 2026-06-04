# Skill & Plugin Marketplaces

Sources to search when looking for Claude Code skills and plugins.

## Official Sources

| Source | URL | Notes |
|--------|-----|-------|
| Claude Code Plugins (official) | code.claude.com/docs/en/discover-plugins | Official Claude Code plugin directory |
| Claude.ai Plugins (official) | claude.com/plugins | Claude.ai integrations marketplace |
| **Claude Plugins Official** (Anthropic GitHub) | github.com/anthropics/claude-plugins-official | Anthropic-managed, high-quality plugin directory |

## Community Marketplaces

| Source | URL | Notes |
|--------|-----|-------|
| **Claude Marketplaces** | claudemarketplaces.com | Largest community-curated skills and plugins |
| **There Is A Skill For That** | theresaskillforthat.com | Community directory of Claude skills by use case |
| **AI Templates** | aitmpl.com/plugins | Plugin and skill templates |
| **Awesome Claude** | awesomeclaude.ai/code-cheatsheet | Curated Claude Code resources and cheatsheets |
| **Claude Marketplaces Community** | claudemarketplaces.com/skills | Browse skills by category |
| **GitHub: superpowers** | github.com/obra/superpowers | The superpowers skill collection — meta-skills for Claude Code |
| **SkillsMP** | skillsmp.com | 1.5M+ agent skills indexed from GitHub (public API available); compatible with Claude Code, Codex CLI, ChatGPT, and other agents |
| **Tons of Skills** | tonsofskills.com | 425 plugins, 2,810 skills, 200 agents for Claude Code; `ccpi` CLI package manager; catalog updated daily from GitHub; most comprehensive single-site collection (May 2026) |
| **claude-skills (337+ skills)** | github.com/alirezarezvani/claude-skills | 337+ production-ready skills across 13 AI coding agents (Claude Code, Codex CLI, Cursor, Gemini CLI, and more), spanning engineering, marketing, product, compliance, and C-level advisory domains |
| **claude-code-marketplace (Netresearch)** | github.com/netresearch/claude-code-marketplace | Curated Agent Skills collection for AI-assisted development |
| **claude-code-skills (daymade)** | github.com/daymade/claude-code-skills | Production-ready skills marketplace for enhanced development workflows |
| **claude-skills-marketplace (mhattingpete)** | github.com/mhattingpete/claude-skills-marketplace | Software engineering workflows: git automation, test fixing, code review, feature planning, visual documentation dashboards |
| **wshobson/agents** | github.com/wshobson/agents | Multi-harness marketplace: 83 plugins, 191 agents, 155 skills, 102 commands; native support for Claude Code, Codex CLI, Cursor, OpenCode, Gemini CLI, and GitHub Copilot — each harness gets idiomatic artifacts from one Markdown source |
| **Awesome Claude Plugins** | github.com/Chat2AnyLLM/awesome-claude-plugins | Curated list of Claude marketplaces and plugins — 76 marketplaces, 1,199 plugins indexed; updated daily |
| **There's An AI For That** | theresanaiforthat.com | Broader AI tool discovery (not Claude-specific, but useful for research) |

## How to Search Each Source

When the user needs a skill for something super-claudio doesn't cover:

```
# Search Claude Marketplaces
WebFetch: https://claudemarketplaces.com/skills?q=[topic]

# Search There Is A Skill For That
WebFetch: https://theresaskillforthat.com/search?q=[topic]

# GitHub search
WebSearch: site:github.com "claude code skill" [topic]
WebSearch: site:github.com ".claude-plugin" [topic]

# General search
WebSearch: "claude code skill" [topic] plugin
```

## Key Skills Already Available

Skills that complement super-claudio (already installed or easily installable):

| Skill | What It Does | Source |
|-------|-------------|--------|
| `find-skills` | Searches marketplaces for skills matching a prompt | claudemarketplaces.com |
| `superpowers` | Meta-skills for development workflow (planning, TDD, debugging) | github.com/obra/superpowers |
| `frontend-design` | Production-grade UI code generation with strong aesthetics | claudemarketplaces.com |
| `feature-dev` | Full feature development workflow | claudemarketplaces.com |
| `playground` | Interactive HTML/JS experiments in the browser | claudemarketplaces.com |
| `context7` | Live library and framework documentation lookup | context7.com |
| `skill-creator` | Create and iterate on new skills with evals | claudemarketplaces.com |
| `claude-md-management` | Keep CLAUDE.md files updated | claudemarketplaces.com |
| `pr-review-toolkit` | Multi-agent PR review pipeline | claudemarketplaces.com |
| `code-simplifier` | Refactor and simplify code after writing | claudemarketplaces.com |

## find-skills Integration

The `find-skills` skill from claudemarketplaces.com searches marketplaces automatically.

Install path: claudemarketplaces.com/skills/vercel-labs/skills/find-skills

Usage: once installed, just say "find a skill for [topic]" and it searches for you.

## Staying Current

The AI tools landscape changes weekly. When a super-claudio reference feels outdated:
1. Use WebSearch to check for newer tools in that category
2. Cross-reference with theresanaiforthat.com and theresaskillforthat.com
3. Check claudemarketplaces.com for new skills in that domain
4. Open a PR to update the relevant `references/*.md` file in this repo
