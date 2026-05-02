# Project Planning & Task Management

## Best Tools

### No-Code / Visual
**Notion** (free tier available)
- URL: notion.so
- Templates: notion.so/templates/project-management
- Good for: wikis, project docs, databases, task boards
- AI features: notion.so/ai

**Linear** (best for dev teams)
- URL: linear.app
- Issue tracking, sprints, cycles
- Free for small teams
- Great keyboard shortcuts, fast UI

**Trello** (Kanban, free)
- URL: trello.com
- Visual boards, drag-and-drop cards
- Free for unlimited personal boards

**Asana** (team projects)
- URL: asana.com
- Timeline view, portfolios, workload management
- Free for up to 15 users

### Code-Based / Scriptable
**GitHub Projects** — built into GitHub repos
- Use for issues + milestones + project boards
- CLI: `gh project list`, `gh issue create`

**todo.md pattern** — simple file-based task tracking:
```markdown
# Project Tasks

## In Progress
- [ ] Build auth API (due: 2026-05-10)
- [ ] Design login page

## Done
- [x] Set up database schema
- [x] Create Docker compose file
```

### AI-Assisted Planning
Claude for project breakdown:
```
Break this project into tasks: [project description]
Output: Markdown checklist with estimated time per task, dependencies noted, and priority (P1/P2/P3).
```

Claude for sprint planning:
```
I have [X hours] available this week.
These are my backlog items: [list]
Create a sprint plan, prioritizing by impact and grouping by context.
```

## Templates

### Project Kickoff Checklist
```markdown
- [ ] Define goal and success metrics
- [ ] Identify stakeholders
- [ ] Create initial backlog
- [ ] Set up repo / workspace
- [ ] Define tech stack
- [ ] First milestone (MVP scope)
- [ ] Communication plan (standups, reviews)
```

### Weekly Review Template
```markdown
# Week of [date]

## What got done
-

## What didn't
-

## Blockers
-

## Next week priorities
1.
2.
3.
```
