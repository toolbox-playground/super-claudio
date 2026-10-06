---
name: super-claudio:tech-career-mentorship
description: >
  Create or update a concise, evidence-based career mentorship report and PDF from a mentee's
  résumé, LinkedIn profile, and mentoring-session notes. Use for career diagnosis, Cloud,
  DevOps, SRE, or AI learning-gap analysis, verified course recommendations, a staged study
  roadmap, and follow-up advice on résumé, LinkedIn, English, and soft skills. Trigger when
  a mentor wants to prepare the first report or continue an existing mentee report after
  another session. Do not assume a target role, seniority, skill gap, or behavioral trait
  that the provided evidence does not support.
---

# Tech Career Mentorship

Build a useful mentoring document from the evidence the mentor provides. The primary deliverable is one concise PDF, normally two pages and never more than three. Keep it suitable for sharing with the mentee and for the next mentor to continue.

Read `references/pdf-structure.md` before creating or updating the report.

## Inputs and stages

Accept any combination of a résumé or CV (PDF, DOCX, or text), LinkedIn URL/export, session notes or transcript, a previous mentoring PDF/source, a Google Doc, and details the mentee has shared about goals and constraints. Use connected Drive access for a Google Doc when available; otherwise ask for an accessible export or pasted content. If a LinkedIn page requires sign-in or blocks access, ask for a profile export or the relevant sections as text rather than guessing. Inputs may arrive across several sessions. If one important detail is missing, proceed with the supported diagnosis and mark that detail as an open question instead of blocking the report.

Write the report in the user's language; default to concise Brazilian Portuguese when the user writes in Portuguese.

Choose the stage from the available material:

1. **Initial diagnosis:** no prior mentoring report. Summarize the current profile from the CV/LinkedIn and any supplied notes. Offer conditional preliminary development areas for Cloud, DevOps, SRE, and practical AI use only where relevant to the person's experience. If the desired direction is unknown, say so and avoid presenting an individualized roadmap as settled advice.
2. **Mentoring update:** a prior report or new session notes are supplied. Preserve the prior report's useful facts, incorporate new evidence, revise assumptions when needed, and refine priorities and the learning roadmap. Add career and soft-skill guidance only from the mentee's statements or mentor's observations; otherwise leave prompts for the next conversation.
3. **Final or handoff update:** if the user indicates the mentoring cycle is ending or handing off, consolidate decisions, actions, owners, and review dates, while keeping unresolved questions visible.

When the user asks to “redo” or regenerate the PDF, treat it as an update if prior report content is available. Do not silently discard previous mentor decisions.

## Evidence and assessment rules

- Keep four kinds of information distinct: **documented profile** (CV/LinkedIn), **mentee-reported goal or context**, **mentor observation**, and **inference to validate**. Label each clearly in prose or table columns.
- Quote only what is useful; summarize source material and avoid copying whole CV sections.
- Describe seniority as a tentative scope estimate based on responsibilities, autonomy, and impact shown in the material. Never assign a definitive junior/mid/senior level based only on years of experience or a job title.
- A skill absent from a CV is “not evidenced in the material,” not proof that the mentee lacks it. Use “gap to validate” until the mentor or mentee confirms it.
- Do not infer personality, motivation, communication ability, English proficiency, or workplace behavior from writing style or a résumé. Use questions for the mentor when those observations have not been provided.
- Do not promise job offers, recruiter attention, salary outcomes, or a fixed timeline to employment.

## Technical diagnosis and roadmap

Relate the profile to the mentee's stated target. TBX Tech commonly mentors Cloud Computing, DevOps, SRE, and practical AI use, but do not force all four tracks into every report.

For preliminary gaps, consider relevant foundations and role-specific topics such as Linux and operating systems, networking, scripting (often Python), Git and collaboration, CI/CD, containers, cloud fundamentals, Infrastructure as Code, observability and reliability, security, and responsible practical use of AI tools or agent workflows. Select only topics that are relevant and not already evidenced; avoid a generic checklist presented as a diagnosis.

For an individualized roadmap, order a small number of actions by dependency and impact. Give a rough time horizon only when the mentor/mentee has supplied available study time or when the estimate is explicitly labeled as a planning assumption. Prefer weekly effort ranges and milestones over promises such as “master this in three months.” Include hands-on practice and a way to demonstrate progress (lab, project, runbook, portfolio item, or interview explanation) where appropriate.

## Course and resource research

Research current resources when making recommendations. Do not rely on remembered course names or hardcoded course URLs. If browsing is available, search and open the actual catalog/resource pages before recommending them. If browsing is unavailable, mark course research as pending and do not fabricate or guess URLs.

For each priority gap:

1. Check the TBX Tech training catalog first for a directly relevant course. Include it first when it exists and its current page supports the recommendation. TBX is a preferred source for this mentoring workflow, not a reason to invent a matching course.
2. Check official learning portals from the relevant technology provider (for example, AWS Skill Builder, Google Cloud Skills, or Microsoft Learn) and other credible free resources.
3. Verify that each linked page loads, matches the named course or learning path, and states the current access/pricing conditions. Distinguish “free course,” “free learning material,” “free audit,” “trial,” and “paid certification/voucher.” Never describe a provider credential or certification exam as free unless the source confirms it.
4. Recommend up to three options per priority gap, in order, with a short reason each fits. Prefer direct course pages over a platform homepage. Include the source/provider and access note beside each link. Record an “access checked” date in the source notes or PDF footer when practical.

If a catalog page is inaccessible or course availability cannot be verified, say that plainly and provide only alternatives that were checked. Keep source URLs in the PDF clickable.

## Career and soft-skill guidance

Use evidence from mentoring conversations for recommendations about English, communication, collaboration, feedback, stakeholder management, one-on-ones, LinkedIn, and CV positioning. For sessions focused on career and soft skills, leave a short “mentor notes / to discuss” area with neutral prompts, such as asking how the mentee requests feedback or communicates project impact. Do not state that the mentee needs to improve a behavior unless the evidence supports it.

Treat AI as a practical technical capability when the mentee's target makes it relevant: examples include using an assistant to learn, explain code, draft scripts, or develop agent/skill workflows while checking outputs and protecting sensitive data. Do not label AI proficiency as a soft skill by default.

## Create or update the PDF

1. Identify the output path from the user's request. If none is given, save the PDF next to the supplied mentoring material or in a clearly named output folder, using a non-sensitive filename such as `mentoria-plano-de-desenvolvimento.pdf`.
2. If a previous PDF is supplied, inspect it and update that report's content and structure. If an editable source file is also supplied, preserve it. Do not create a competing “final” file without explaining which one is current.
3. Use available document/PDF tools in the environment. Keep text selectable, links clickable, tables readable, typography accessible, and page breaks intentional. Use restrained neutral colors; do not add a logo or imply affiliation for generic reuse.
4. Keep the PDF to two pages where the evidence permits and at most three pages. Remove repeated context before shrinking type. Follow the exact content guidance in `references/pdf-structure.md`.
5. When generating a report that will be revised later, preserve a concise editable source (Markdown, DOCX, or the tool's native source) beside the PDF where practical. Use the source as the working master for later updates, not as an extra deliverable unless it helps continuity.
6. Re-open or render the finished PDF and inspect page count, text clipping, table wrapping, clickable links, and page breaks. Fix visible layout problems before reporting completion.
7. Tell the mentor what files were created/updated, which assumptions remain open, and whether course access was verified. Do not claim a link, course, or PDF layout was checked if it was not.

## Privacy

Treat CVs, LinkedIn material, and meeting notes as sensitive personal data. Use them only for the requested mentoring report. Include only the mentee details needed to identify and support them; omit phone numbers, home addresses, personal email, and other contact details unless the user specifically asks to include them. Do not send or publish source material to external services. Avoid putting sensitive personal details in filenames.
