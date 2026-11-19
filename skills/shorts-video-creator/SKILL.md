---
name: super-claudio:shorts-video-creator
description: >
  Builds animated storytelling shorts end to end — Instagram Reels, TikTok and YouTube
  Shorts (vertical, 1–2 min) or a short horizontal explainer (up to ~5 min) in the same
  style: an everyday analogy told as an SVG cartoon with recurring characters, the
  "X é como se fosse Y" mapping to the technical concept, a visual punch at the turn,
  real terminal output, a healthy meme and a share CTA, narrated in the creator's cloned
  ElevenLabs voice with word-synced captions, rendered to MP4 by the HTML engine. Plans
  a series, writes and self-reviews scripts against a checklist, and can produce a batch
  overnight. Trigger on: "cria um short sobre", "faz um reels explicando", "short com
  desenho animado", "short com analogia", "vídeo curto com storytelling", "próximo short
  da série", "faz os próximos 5 shorts", "planeja mais shorts", "short vertical com minha
  voz", "explica X com uma analogia em vídeo", "make a short explaining", "animated
  explainer short", "reels with a cartoon analogy". Also trigger when the user continues
  a numbered shorts series or asks for a horizontal version of a short. Do NOT trigger
  for: full courses or direct technical lessons without storytelling (use
  course-and-video-creator), talking-head videos the creator records (use
  create-script-and-slides-for-videos), or generic media/AI video generation (use
  generic-media-content-creation).
---

# Shorts Video Creator — animated storytelling shorts

A short is not a small lesson. It is a **story the viewer recognises from daily life,
mapped piece by piece onto a technical concept**, drawn as a cartoon with movement, then
the real thing on screen, a laugh, and a share. Everything in this skill exists because a
creator rated a version 7 and the fixed version 10.

It shares the render engine with `course-and-video-creator` (HTML pages rendered by
`../course-and-video-creator/scripts/studio/render-tpage.mjs`) but has its own script
rules, cartoon library, tools and review checklist. Read only the reference for the stage
you are in:

| Stage | Reference |
|---|---|
| Planning a series or the next N shorts | `references/series-planning.md` |
| Writing the script (hook, de-para, wording, sources, length) | `references/script-rules.md` |
| Audio, alignment, build, render, mux, speed-up, reorder | `references/pipeline.md` |
| Drawing the scenes (characters, props, movement, diagrams, punch, meme) | `references/cartoon-and-scenes.md` |
| Before handing anything over | `references/review-checklist.md` |

## The shape of every short

1. **Hook = the whole analogy first.** Story → de-para → the story's ending, in one block.
   Or, when an analogy would be unclear on first hearing, a sourced factual hook followed
   by the analogy. Never split the de-para from the story.
2. **The turn:** "No desenvolvimento de software é igual." / "Na computação em nuvem é
   igual." — with a ~2 s visual punch: the concept name written big + real logos.
3. **De-para, always with a connector:** "X no [mundo] é como se fosse Y no [código]",
   then explain Y right away. Never "X é Y".
4. **How it works**, technical and correct, with the full name of every term.
5. **The tools that solve it**, introduced from the problem ("as ferramentas de segurança que
   resolvem isso são…"), never a loose "Os nomes reais:"; and **real terminal output** you ran.
6. **CTA:** "Compartilha com aquele colega que…" with a healthy joke, then the creator's
   catalog/site.

Length: 1–2 min vertical, **never over 2:00**. Horizontal versions may go to ~5 min with
the same style (more "how it works", same hook).

## Pipeline per short (details in `references/pipeline.md`)

1. Script: `narration/aula.txt` (spoken words only), `script.md` (scenes + a source per
   claim), `display.json` (spoken → shown substitutions).
2. **Self-review** with `references/review-checklist.md` before showing anyone.
3. Approval gate — skipped only when the creator explicitly asked for an unattended batch.
4. Audio: `scripts/tts.py` (ElevenLabs v4 with-timestamps), then `scripts/voice.py`.
   Over 2:00 → speed up with `atempo` and scale the timestamps; never pay for a re-take.
5. Real demo: run the commands, save outputs in `demo/`, tear down what you started.
6. Scenes: `scenes.js` = `templates/cartoon-header.js` + `templates/cartoon-props.js` +
   `templates/motion-kit.js` + your `scenes-body.js`; `scripts/build.py` writes `index.html`.
7. Stills at every beat → contact sheets → look at them → fix → full render → mux →
   phone copy (crf 24, faststart).

## Batch mode (the creator is away)

When the creator asks for several shorts unattended ("faz os próximos 5, eu reviso
amanhã"): pick them from the approved plan in order, write all scripts first, run the
checklist on each, then produce **one at a time**: audio → check duration → demo → scenes
→ stills reviewed → render. A failed step stops that short, not the batch. Hand over a
summary per short: file, duration, credits, what to look at, any judgement call you made.
Never generate audio for a script that failed the checklist.

**A batch never lowers the visual density.** An overnight batch of ten came back rated 5–6
("parada, tosca, só quadradinhos, parece Remotion") and was redone: every block needs a real
image or a character doing the action, and something moving at every second. Budget the
same scene work per short as for a single one; if time is short, deliver fewer shorts.

## Rules that are never negotiable

- Never a number or percentage without a citable primary source; open the page and quote it.
- Never a photo of a real person; cite name + quote as text.
- Never real games, shows or brands drawn as cartoon characters or imitated; for an
  analogy, make an original one (e.g. the game "Cidade Neon"). But when the short is
  **about** a real product in the news (a game launch, an outage, a leak), show its
  official images (the publisher's site or press kit) with the credit on screen: a news
  short about GTA 6 with no picture of GTA 6 looks broken.
- Terminal output is always real output you produced.
- Never echo or ask for the API key; read it from the OS keychain.
