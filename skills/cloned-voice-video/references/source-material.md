# Source Material — when the creator hands you something to build on

A course rarely starts from a bare topic. The creator usually has material already: a
PDF, a slide deck, an article they wrote, a recorded talk, internal documentation.
**Read it before proposing anything.** A roadmap written without reading the material
the creator just handed over is the fastest way to lose their trust in the first five
minutes.

## Always read what you are given

If the request arrives with an attachment, a path or a link, open it first — before
the roadmap, before any question about level or length. Then say what you found, in
two or three lines, so the creator can see you actually read it.

| Format | How to read it |
|---|---|
| PDF | the `pdf` skill, or `Read` with `pages` for a long one (20 pages per call) |
| PPTX / DOCX / XLSX | the `pptx` / `docx` / `xlsx` skills |
| Web article, blog post, docs | `WebFetch`; if it 403s, open it in the browser and read the page text |
| Video or audio the creator recorded | ask whether a transcript exists; transcribing is their call, not an assumption |
| Code, repo, manifests | read the files directly — real configuration is the best artefact source there is |
| A link behind a login | ask the creator to export or paste it; never try to get past the login |

If a file will not open or a format is not supported, say so plainly and ask for
another export. Do not quietly proceed on the topic alone and let the creator discover
later that their material was ignored.

## What to extract

Read for four things, in this order:

1. **The spine.** What argument does the material make, start to finish? That spine is
   usually the course's module order, already validated by someone who knows the
   subject.
2. **The claims worth keeping.** Numbers, mechanisms, specific advice. These become the
   lesson content, and each one carries its source into `script.md`.
3. **The artefacts.** Screenshots, diagrams, command output, config samples. Every one
   of these is a visual the lesson can show — and they are *already* the real thing,
   which is exactly what `realistic-visuals.md` asks for.
4. **The gaps.** What the material assumes, skips or dates. A course has room the
   original format did not; the gaps are where the extra lessons come from.

## What the material is, and is not

**It is a source, not a script.** An article is written language; a lesson is spoken
language. Narrating a blog post aloud produces exactly the flat delivery
`narration-script.md` exists to prevent. Take the substance and rewrite it as speech.

**It is the creator's own authority.** When the material states something as fact, it
carries their name, so keep it accurate and attribute it when the lesson quotes it. If
something in it looks wrong or out of date, say so and ask — do not silently correct a
creator's own published position, and do not silently repeat something you believe is
wrong.

**Its length is not the course's length.** A 2,000-word article is not a 20-minute
course by arithmetic. Size the course from the teaching, per `course-architecture.md`.

**Third-party material is not free to reuse.** If the creator hands you someone else's
deck or PDF, it informs the course; its images, wording and diagrams do not travel into
the video without permission. Their own material is theirs to reuse freely.

## Report back before the roadmap

Close the reading with a short summary and a proposal, not with the roadmap itself:

- what the material covers, in a few lines
- which parts become modules, and in what order
- what is missing that the course should add
- which artefacts you can already build from it

Then write the roadmap. The creator corrects the reading far more cheaply than they
correct a finished ementa.
