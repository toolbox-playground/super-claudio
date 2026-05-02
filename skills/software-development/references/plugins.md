# Installed Claude Code Development Plugins

These plugins are active in the super-claudio environment and extend development capabilities.

## Active Plugins

| Plugin | Skill(s) | Best For |
|--------|---------|---------|
| **superpowers** | brainstorming, writing-plans, subagent-driven-development, tdd, debugging | Full dev workflow orchestration |
| **feature-dev** | code-architect, code-explorer, code-reviewer | Feature design and deep codebase analysis |
| **pr-review-toolkit** | code-reviewer, code-simplifier, pr-test-analyzer, silent-failure-hunter | Before merging any PR |
| **skill-creator** | skill-creator | Build and test new Claude Code skills |
| **plugin-dev** | agent-creator, plugin-validator, skill-reviewer | Build and validate plugins |
| **context7** | context7 | Live docs for any library/framework |
| **code-simplifier** | code-simplifier | Refactor code after writing |
| **claude-md-management** | (auto) | Keep CLAUDE.md files current |

## When to Use Which

### Starting a new feature
→ `superpowers:brainstorming` → `superpowers:writing-plans` → `superpowers:subagent-driven-development`

### Understanding existing code
→ `feature-dev:code-explorer` (traces execution paths) → `feature-dev:code-architect` (for extension)

### Before merging
→ `pr-review-toolkit:code-reviewer` → `pr-review-toolkit:pr-test-analyzer` → `pr-review-toolkit:silent-failure-hunter`

### Writing tests
→ `superpowers:test-driven-development` (TDD workflow with failing tests first)

### Checking library docs
→ `context7` ("use context7 to look up [library] [feature]")

### Debugging
→ `superpowers:debugging` (systematic root cause analysis)

## How to Invoke

Type the skill name directly or use slash commands:
```
/superpowers:brainstorming
/feature-dev:code-explorer
/pr-review-toolkit:code-reviewer
```

Or describe what you need and the skill auto-triggers from description matching.
