# Building Claude Code Skills, Plugins & Agents

## Installed Plugins in This Environment

These plugins are active in super-claudio and their skills can be invoked:

| Plugin | Key Skills | What It Does |
|--------|-----------|-------------|
| **superpowers** | brainstorming, writing-plans, subagent-driven-development, executing-plans, tdd, debugging, finishing-a-development-branch | Meta-workflow skills for the full dev lifecycle |
| **skill-creator** | skill-creator | Create and iterate on new Claude Code skills with evals |
| **pr-review-toolkit** | code-reviewer, code-simplifier, comment-analyzer, pr-test-analyzer, silent-failure-hunter, type-design-analyzer | Multi-agent PR review pipeline |
| **feature-dev** | code-architect, code-explorer, code-reviewer | Full feature development workflow |
| **claude-md-management** | (auto) | Keep CLAUDE.md files up to date |
| **context7** | context7 | Live library documentation lookup |
| **plugin-dev** | agent-creator, plugin-validator, skill-reviewer | Create and validate plugins |

## Creating a New Skill

Skills are Markdown files that guide Claude's behavior. Structure:

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json
└── skills/
    └── my-skill/
        ├── SKILL.md
        └── references/
            └── detail.md
```

### plugin.json
```json
{
  "name": "my-plugin",
  "description": "What this plugin does",
  "author": { "name": "Your Name", "email": "you@email.com" }
}
```

### SKILL.md (minimum)
```markdown
---
name: my-skill
description: >
  When to trigger this skill. Include specific trigger phrases.
  Example: "Use when user says X, Y, or Z."
---

# My Skill

Instructions for Claude when this skill is active.
```

### Use skill-creator to build it
Invoke `skill-creator:skill-creator` and it will:
1. Interview you about the skill's purpose
2. Write a draft SKILL.md
3. Create test cases and run evals
4. Iterate based on your feedback

## Creating an Agent (agents/ directory)

Agents are autonomous worker specs that can be dispatched by Claude:

```markdown
# Agent Name

**Purpose:** What this agent does end-to-end

## Inputs
- input_1: description
- input_2: description

## Phases

### Phase 1: [Name]
Steps the agent takes...

### Phase 2: [Name]
...

## Output
What the agent produces and where it saves it.
```

Place agent specs in `agents/` at the plugin root. Claude can dispatch them as subagents.

## Creating a Scheduled Remote Agent

Remote agents run in Anthropic's cloud on a cron schedule. Use the `/schedule` skill.

Key config:
```json
{
  "name": "my-routine",
  "cron_expression": "0 10 * * *",
  "job_config": {
    "ccr": {
      "environment_id": "env_...",
      "session_context": {
        "model": "claude-sonnet-4-6",
        "sources": [{"git_repository": {"url": "https://github.com/org/repo"}}],
        "allowed_tools": ["Bash", "Read", "Write", "Edit", "Glob", "Grep"]
      },
      "events": [{"data": {"message": {"content": "PROMPT", "role": "user"}}}]
    }
  }
}
```

## Publishing a Plugin

1. Create a GitHub repo with the plugin structure above
2. Users install via: `claude plugin install github.com/username/repo`
3. Submit to claudemarketplaces.com for community discovery

## Resources
- Claude Code plugin docs: docs.anthropic.com/en/docs/claude-code/plugins
- Superpowers repo (meta-skills): github.com/obra/superpowers
- Skill examples: claudemarketplaces.com/skills
