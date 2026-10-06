# Tech Career Mentorship Skill Implementation Plan

> **For agentic workers:** Execute this plan inline, one task at a time.

**Goal:** Add a reusable mentorship skill that creates and progressively updates a concise, evidence-based career development PDF.

**Architecture:** A focused `SKILL.md` defines triggers, stages, research, and update behavior. A reference file defines the compact PDF content. Repository routing docs and plugin metadata make the new skill discoverable as a new plugin version.

**Tech Stack:** Markdown skill instructions, repository Markdown and JSON metadata; PDF generation is performed by the consuming assistant using available document tooling.

**Spec:** `docs/superpowers/specs/2026-10-06-tech-career-mentorship-design.md`

## Global Constraints

- Keep the document to two pages when possible and no more than three pages.
- Separate source-backed facts, mentor observations, tentative inferences, and unknowns.
- Recommend TBX training first when relevant, then verified official or credible free resources.
- Do not include a TBX logo or alter the existing `carreira-tech-slides` skill.
- Do not stage existing untracked `AGENTS.md` or `.DS_Store` files.
- Do not add or run tests for this documentation-only request.

## Review Focus

- Initial input lacks a target career: the skill must keep gaps preliminary and defer a detailed roadmap.
- Notes contain unsupported soft-skill judgments: the skill must label observations and avoid inventing traits.
- External course URLs or free access have changed: the skill must verify and report uncertainty.
- Later sessions provide a prior PDF: the skill must preserve and update it rather than restart.
- Sensitive CV data includes contact information: the skill must minimize unnecessary personal data in output.

---

### Task 1: Create the mentorship skill and register it

**Files:**
- Create `skills/tech-career-mentorship/SKILL.md`
- Create `skills/tech-career-mentorship/references/pdf-structure.md`
- Modify `README.pt.md` and `README.md` to list the new skill.
- Modify `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json` to describe the new skill and release version 1.2.4.

- [ ] Write the workflow covering initial diagnosis, iterative updates, evidence labels, dynamic course research, PDF creation, and privacy.
- [ ] Write the two-to-three-page PDF layout, including conditional preliminary gaps and mentor-owned soft-skill notes.
- [ ] Add a concise entry to both repository skill indexes and update plugin version metadata.
- [ ] Inspect the changed Markdown and JSON for consistency and run `git diff --check`.

### Task 2: Review and commit the deliverable

**Files:**
- Review only the files from Task 1 and this plan/spec.

- [ ] Review `git diff` against the design spec; confirm no user-owned untracked files are staged.
- [ ] Stage only the skill, references, documentation, metadata, plan, and design spec.
- [ ] Commit directly on `main` with message `feat: add tech career mentorship skill`.
- [ ] Confirm commit hash and final worktree status.
