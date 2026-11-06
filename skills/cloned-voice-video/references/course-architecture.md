# Course Architecture — what is being made, and how it is structured

The input is a topic and a level. The output is an approved structure: modules in
teaching order, and inside each module a lesson list with an objective and a duration.
Nothing downstream is worth writing until this is agreed, because a script is cheap to
write and expensive to re-record.

## First: a course, or a single video?

The same skill makes both, and they are not the same object. Settle this before
anything else; if the request does not say, ask.

| | A course | A single video |
|---|---|---|
| Shape | modules → lessons, one video per lesson | **one video, start to finish** |
| Total | hours, produced over days or weeks | 5–10 minutes, produced in one pass |
| Structure | an ementa | an outline: one arc in segments |
| Register | e-learning by default | conversational by default |
| Opening | only the first lesson welcomes | every video earns the click in its first seconds |
| Repetition | callbacks across lessons | everything it needs, it establishes itself |

**A standalone video is never a one-minute clip.** The 1-minute lesson exists inside a
course, where a module opener can be short because the course around it carries the
context. A video published on its own has no course around it: it has to hook, set up
the problem, teach the thing and land the payoff, all by itself. Under five minutes
that is usually a definition with a soundtrack.

The anti-padding rule still holds, though, and it is the harder half: **do not stretch
a three-minute idea to seven.** If the outline will not honestly fill five minutes,
the topic is too narrow for a standalone video — either widen the frame (teach the
problem around it, not just the answer) or make it part of a course. Padding is more
visible in a single video than anywhere else, because there is no next lesson to carry
the viewer.

### The arc of a single video

```
hook        15–30s   why this matters to you, right now. The click is earned here.
problema    30–60s   the pain, concretely. The viewer should recognise their own week.
corpo       3–7 min  2 to 4 segments, each one mechanism, in order
payoff      30–60s   what is now possible that was not
fecho       15–30s   what was learned, and where to go next
```

The storytelling arc in `narration-script.md` applies in full — a standalone video is
almost always *introducing* a concept, so it is the clearest case for opening with the
problem rather than the definition.

**Segments are a production unit, not a viewing experience.** Planning the body as
`inicio / meio / fim` is useful because it lets the narration be generated and checked
in pieces. The viewer sees one continuous video. `video-pipeline.md` has how the
segments become one MP4 — and why they are not joined by hand.

### When a "video" is really a course

If the outline grows past four body segments, or past about ten minutes, stop and say
so. That is a course, or at least a series, and forcing it into one video produces
something nobody finishes. Splitting it is the creator's call, but the observation is
yours to make.

## The level decides the roadmap, not the topic

The same technology produces almost disjoint lesson lists at different levels. Decide
the level first; if the user did not say, ask — it is the one question worth blocking on.

| | Beginner course | Advanced course |
|---|---|---|
| Opens with | what the thing *is* and the problem it solves | a **recap module** that re-establishes vocabulary, then moves past it |
| Assumes | no prior exposure; explains adjacent concepts (container, YAML, CLI) | the beginner course; names concepts without defining them |
| Lesson shape | one concept per lesson, heavily illustrated | one *mechanism* per lesson, with configuration and failure modes |
| Ends with | a first working deployment | operating it under load, cost, security and scale |
| Typical count | 5–7 modules | 6–9 modules, the first being the recap |

**The recap module is not filler.** An advanced course that skips it loses the viewer
who arrived from somewhere else. Keep it short — 3 or 4 lessons that re-establish the
model and vocabulary the rest of the course will use without explanation.

## Sizing

**Lessons run 1 to 10 minutes, and the length follows the teaching.** There is no
target duration to hit. Picking a number first and then stretching or compressing the
content to reach it is the most common way a course turns boring, and it is visible
immediately.

| Length | What it is for |
|---|---|
| **~1 min** | a welcome, a module opener ("o que a gente vai ver nesse módulo"), or one genuinely narrow point |
| **2–4 min** | the normal lesson: one concept or one mechanism, properly taught |
| **5–7 min** | a concept that needs the full storytelling arc, or a mechanism with configuration and failure modes |
| **8–10 min** | a hard subject that genuinely cannot be split without breaking it |

Two mistakes to avoid in both directions:

- **Do not rush a concept into a minute.** "O que é Kubernetes" in sixty seconds is a
  definition, not a lesson: it has no room for the problem, the history and the
  breaking point that make the definition land. See the storytelling arc in
  `narration-script.md`. Introducing a concept is usually 2–4 minutes at minimum.
- **Do not pad a short answer to look substantial.** "O que é um Helm chart" genuinely
  is a two-minute answer. Uniform lesson lengths are a smell.

A lesson that reuses ground already covered is legitimately shorter than the one that
established it — auto-healing after the HPA lesson needs less than the HPA did, because
the vocabulary is already there.

The conversion from script to runtime, measured on real pt-BR narration:

| | characters | runtime |
|---|---|---|
| measured rate | **~934 characters per minute** of finished audio | — |
| short lesson | ~1,900 | 2 min |
| typical lesson | ~2,800 | 3 min |
| long lesson | ~4,700 | 5 min |
| long lesson | ~5,600 | 6 min |
| the ceiling | ~9,300 | 10 min |

Measured on an ElevenLabs Eleven v4 generation of a real pt-BR lesson.
It is slower than it looks: an earlier estimate of 1,200 characters per minute came
from a different engine and overshot the runtime by 29%. Re-measure after any change
of voice or settings, and treat the number as a budget, not a guarantee.

Use this to budget a script *before* generating. A lesson whose script runs past ~7,000
characters is a lesson that should have been two lessons.

Even at the ceiling — a 10-minute lesson, ~9,300 characters — this stays inside Eleven
v4's 10,000-character request limit, so **one lesson is always one request**. The
headroom at 10 minutes is thin, though: if a script passes ~9,500 characters it is a
lesson that wanted to be two.

Course arithmetic: a 4-hour course is roughly **50 to 70 lessons** at this length.
That is a lot of lessons, so the module boundaries carry real weight — they are what
makes the course navigable.

## Shape of a module

A module is a coherent capability, not a bag of related topics. Test it by asking
what the viewer can *do* at the end that they could not at the start. If the answer is
"know about several things", the module has no spine and needs splitting or merging.

Inside a module, order lessons so each one only depends on lessons before it. Where a
mechanism can be driven more than one way, teach the primitive first and the
abstraction second — the abstraction is only comprehensible as a shortcut for
something the viewer has already seen.

## Worked example — "Kubernetes avançado"

This is the reference decomposition. Note what it does: a recap module, then one
mechanism per module, and a dedicated module for the abstraction (Helm) that later
lessons will lean on.

```
Módulo 1 — Recapitulação
  1.1  O modelo de objetos: o que o cluster realmente guarda          (3 min)
  1.2  Control plane e nodes: quem decide e quem executa              (4 min)
  1.3  O loop de reconciliação, que explica quase tudo                (3 min)

Módulo 2 — Rede
  2.1  O modelo de rede do Kubernetes e suas regras                   (4 min)
  2.2  Service, Endpoint e kube-proxy: como o tráfego acha o Pod      (5 min)
  2.3  Ingress e o controlador que faz o trabalho                     (4 min)
  2.4  CNI: por que existe plugin de rede                             (3 min)
  2.5  NetworkPolicy: negar por padrão                                (4 min)

Módulo 3 — Segurança
  3.1  RBAC: sujeito, verbo, recurso                                  (5 min)
  3.2  ServiceAccount e identidade de workload                        (4 min)
  3.3  securityContext e Pod Security Admission                       (4 min)
  3.4  Secrets: o que eles não protegem                               (3 min)

Módulo 4 — Autoescalonamento
  4.1  As três escalas: Pod, recurso e node                           (3 min)
  4.2  HPA: a métrica, o alvo e o algoritmo                           (5 min)
  4.3  Configurando HPA com kubectl                                   (4 min)
  4.4  requests e limits, que o HPA depende                           (4 min)
  4.5  VPA e quando ele conflita com o HPA                            (4 min)
  4.6  Cluster Autoscaler: escalando a infraestrutura                 (5 min)

Módulo 5 — Helm
  5.1  O que é Helm chart, e qual problema ele resolve                (2 min)
  5.2  Anatomia de um chart: templates e values                       (4 min)
  5.3  Release, revisão e rollback                                    (4 min)
  5.4  Configurando o mesmo HPA via Helm chart                        (5 min)

Módulo 6 — Operação
  6.1  Lendo um Pod que não sobe: o fluxo de diagnóstico              (5 min)
  6.2  Requests mal dimensionados e o custo do cluster                (4 min)
  6.3  Disruption budgets e atualização sem queda                     (4 min)
```

Three decisions in there are worth copying:

- **4.3 teaches `kubectl` before 5.4 teaches the same thing in Helm.** The viewer sees
  the primitive, then sees Helm as a way to package it. The reverse order teaches
  cargo cult.
- **4.4 sits between the HPA lessons** because the HPA reads `requests`; teaching the
  HPA without it produces a viewer who cannot explain why their autoscaler does
  nothing.
- **5.1 is only 2 minutes.** "What is a Helm chart" genuinely is a two-minute answer.
  Padding a lesson to hit a uniform length is how courses get boring.

## Deliverable

Write the structure to `<curso-slug>/roadmap.md` with, per lesson: an id, the title,
the one-line objective, the target duration and — this column is not optional — **the
artefact the lesson shows**.

The same file grows an appendix at the end of stage 2, carrying the full text of every
`narration/aula.txt`. That appendix is what the creator actually approves before any
credit is spent — see `narration-script.md`.

The artefact is the thing a practitioner actually looks at when they do this: a
terminal running a specific command, a manifest, a console page, a dashboard panel, a
PR page. Naming it in the roadmap is what stops a course drifting into sixty lessons
of animated bullet points. Write `nenhum` only for lessons that genuinely teach
something with no screen — a mental model, a trade-off, a comparison — and expect
those to be the minority. `references/realistic-visuals.md` lists the usual artefact
per domain.

A lesson that *introduces* a concept also names the **rungs it covers** — where on the
abstraction ladder it starts and where it ends (`narration-script.md`). This is what
makes a drift visible at the gate instead of at the render: a lesson whose rungs begin
at 3 opens on a command, and a module where every lesson stops at rung 1 never gets the
viewer to anything they can do.

Add a two-line **summary** of what the lesson covers, so the creator can judge the
teaching from the ementa alone rather than from a title.

```
4.4  requests e limits, que o HPA depende   (4 min)
     objetivo: por que o HPA não escala sem requests definidos
     resumo:   o HPA calcula utilização sobre o requests do container. Sem requests,
               não há denominador, e o autoscaler fica parado reportando <unknown>.
     artefato: terminal com `kubectl describe hpa` mostrando FailedGetResourceMetric,
               e o trecho de resources do deployment.yaml
```

**This is an approval gate, not a status update.** Present the ementa and stop. Expect
the creator to cut lessons, add lessons, reorder modules and change the level — that is
what the gate is for, and all of it is free here and expensive later. Do not start
writing scripts on a "looks good" for part of it; wait for the whole structure to be
settled, and say back what changed before moving on. The ids become
directory names, so keep them stable — `04-3-hpa-kubectl`, not a number that
renumbers when a lesson is inserted.
