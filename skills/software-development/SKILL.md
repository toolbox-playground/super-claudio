---
name: super-claudio:software-development
description: >
  Software development skill. Use when the user wants to build, code, automate, or deploy anything
  technical. Covers backend APIs, databases, workflow automation, scripts, free public APIs,
  and hosting/deployment.
  Trigger on backend: "build an API", "REST API", "database schema", "Supabase", "Firebase",
  "PostgreSQL", "MongoDB", "FastAPI", "Express", "Fastify", "GraphQL", "Node.js server",
  "Python API", "Prisma", "ORM", "authentication backend", "serverless functions".
  Trigger on automation: "automate this", "connect these apps", "n8n", "Make.com", "Zapier",
  "when X happens do Y", "no-code automation", "schedule a script", "webhook", "automate posting",
  "IFTTT", "auto-post to Instagram", "batch processing", "automate email".
  Trigger on free APIs: "free API for X", "public API", "build a weather app", "NASA API",
  "real-time data", "open data", "free data source", "API without credit card", "government API".
  Trigger on deployment: "deploy my app", "Docker", "Railway", "GitHub Actions", "CI/CD",
  "hosting", "go live", "containerize", "VPS setup".
  Trigger on git/GitHub: "create a PR", "open a pull request", "GitHub CLI", "gh pr", "gh issue",
  "connect Claude to GitHub", "GitHub MCP", "commit message", "git workflow", "manage issues",
  "review a PR", "GitHub Actions workflow", "release on GitHub".
  Do NOT trigger for: frontend/UI design (use design skill), media generation (use media-content-creation).
---

# Software Development

You are an expert developer. Route based on what the user needs to build or automate:

## Routing

### Backend Development

| Intent | Reference file |
|--------|---------------|
| Database setup, schema design, ORM, queries | `references/databases.md` |
| API design, REST/GraphQL, framework selection, endpoints | `references/apis.md` |
| Deployment, hosting, Docker, CI/CD, going live | `references/deployment.md` |

For full-stack features: start with `databases.md` (schema), then `apis.md` (endpoints), then `deployment.md` (go live).

### Workflow Automation

| Intent | Reference file |
|--------|---------------|
| Visual workflow builder, n8n self-hosted, app integrations | `references/automation-n8n.md` |
| Cloud-based no-code automation (Make.com, Zapier) | `references/automation-cloud.md` |
| Python/Bash scripting, file processing, cron jobs | `references/automation-scripting.md` |

**Quick decision:**
- Free + self-hosted + powerful → n8n
- Fast setup + no server → Make.com or Zapier
- Technical user + full control → Python scripting

### Free Public APIs

| Domain | Reference file |
|--------|---------------|
| Geography, weather, climate, natural events | `references/free-apis-geo.md` |
| Finance, space, sports, news, and all other domains | `references/free-apis-catalog.md` |

### Git & GitHub

| Intent | Reference file |
|--------|---------------|
| Git workflow, branches, commits, undoing changes | `references/git-and-github.md` |
| GitHub CLI (`gh pr`, `gh issue`, `gh release`) | `references/git-and-github.md` |
| GitHub MCP server (Claude reads/writes GitHub directly) | `references/git-and-github.md` |
| GitHub Actions, CI/CD workflows | `references/git-and-github.md` |

### Testing & Security

| Intent | Reference file |
|--------|---------------|
| Unit/integration/E2E tests (pytest, Jest, Playwright) | `references/testing-and-security.md` |
| Security checklist, OWASP, secrets detection, dependency scanning | `references/testing-and-security.md` |

### Installed Plugins Reference

For Claude Code plugins already installed that extend development capabilities:
→ `references/plugins.md`

## When to check for more tools

If none of these fit, invoke `super-claudio:discover` to search community marketplaces for
newer or more specialized development tools.
