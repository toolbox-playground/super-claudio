# Tech Career Mentorship Skill Design

## Goal

Add a reusable Super Cláudio skill that turns a mentee's résumé, LinkedIn profile, and mentor-session notes into a concise career diagnosis and an evolving action plan. Its primary deliverable is one PDF of up to three pages that can be revised after each mentoring session.

The skill should be generic enough for public reuse, with no logo or TBX-only visual identity. When TBX Tech training is relevant, recommend the TBX training catalog first, then include suitable provider or other free learning resources after checking current availability and links.

## Users and inputs

The skill supports a mentor preparing or updating the mentee's document. Inputs may include a PDF, Google Doc, LinkedIn URL or export, mentor notes, the mentee's target role, and constraints such as weekly study time, preferred cloud provider, language, or geography. Inputs can arrive incrementally over a series of sessions.

Do not require all inputs up front. Extract what is supported by the available sources, label estimates and unknowns, and list the questions that would materially change recommendations.

## Workflow

1. Determine whether this is an initial diagnosis or an update to an existing mentoring document. Find and preserve the existing PDF or source document when supplied.
2. Extract evidence from the provided résumé, LinkedIn material, and notes. Distinguish source-backed facts, mentor observations, tentative inferences, and unknowns.
3. For the initial edition, summarize the current career profile and provide conditional preliminary gaps relevant to Cloud, DevOps, SRE, and AI-enabled engineering. Do not prescribe a full individualized roadmap until the mentee's target and constraints are known.
4. For updates, incorporate new session notes, revisit prior assumptions, refine gaps and priorities, and add a practical staged roadmap. Include career, résumé, LinkedIn, English, AI-use, and soft-skill actions only when supported or clearly framed as questions for the mentor.
5. Research learning resources for prioritized gaps. Check the TBX training catalog first for relevant offerings, then search official provider learning portals and other credible free options. Verify each URL and whether access is free/current; state when a detail could not be confirmed. Recommend up to three useful options per priority gap, avoiding link dumps.
6. Create or update the same concise PDF. If PDF tooling is unavailable, create a clean HTML or Markdown source suitable for conversion and explain the limitation.

## PDF structure

Target two pages when the evidence is light and no more than three pages when a roadmap and session notes justify it.

1. **Career snapshot:** mentee identity as provided, target role/status, concise experience summary, evidence-backed strengths, current-scope estimate with caveat, and open questions.
2. **Technical development:** table of priority/gap, evidence or unknown, next learning/practice action, rough time horizon, and up to three verified course/resource links. Initial version labels these as preliminary where career direction is unknown.
3. **Career and follow-up (when useful):** résumé/LinkedIn/English/AI/soft-skill observations, mentor prompts for sessions 4–5, agreed actions, owners, and review dates. Leave unassessed areas open rather than inventing feedback.

Use compact tables, plain language, date/version, discreet neutral styling, and accessible contrast. Do not force all three pages when content does not warrant them.

## Skill files

```text
skills/tech-career-mentorship/
├── SKILL.md
└── references/
    └── pdf-structure.md
```

`SKILL.md` will contain trigger conditions, supported inputs, stage detection, evidence rules, research requirements, and PDF creation/update workflow. `references/pdf-structure.md` will define the page layout, table fields, example wording, and compactness rules.

## Privacy and accuracy

Treat résumé, profile, and meeting notes as sensitive personal information. Use them only to produce the requested mentoring deliverable; do not publish or send them elsewhere. Avoid repeating unnecessary personal contact details in the PDF. Never infer protected traits or make unsupported psychological assessments. Describe seniority as an evidence-based estimate, not an authoritative level. Do not promise employment outcomes.

## Validation and scope

This first version is a local draft for the user to try with an actual mentee résumé. Do not create fictitious sample mentee data, run the skill on real personal data, or commit eval outputs. Keep test/evaluation work for the user's review cycle. The deliverable is the skill folder and any small repository routing/catalog entry needed for it to be discoverable; do not modify the existing `carreira-tech-slides` skill.

The repository checked for this work is `toolbox-playground/super-claudio`, on `main`. Existing untracked root `AGENTS.md` and `.DS_Store` files are user data and must remain unstaged.
