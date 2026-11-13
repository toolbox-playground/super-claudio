# Narration Script — writing words to be spoken

The script is not a document that gets read aloud. It is a transcript of a teacher
talking. Those are different kinds of text, and the difference is audible immediately.

Two files per lesson:

| File | Contents |
|---|---|
| `script.md` | the plan: the beats, the visual per beat, and a cited source per factual claim |
| `narration/aula.txt` | **only** the words to be spoken — nothing else goes in this file |

`narration/aula.txt` is pasted or posted verbatim to the TTS. A stray heading, stage
direction or bracketed note in that file gets read out loud.

## Hand the creator the words, not a description of the words

**When the scripts are presented for approval, the full text of every
`narration/aula.txt` goes into the roadmap, as an appendix at the end.** Not a summary,
not a character count, not a link to a file — the literal text, in a code block, per
lesson, in course order.

This is not optional and it is not a formatting preference. The approval gate before
stage 3 is the last free one, and it is specifically the gate on *the words that will be
spoken*. A creator who is shown "aula 01-1 — boas-vindas — 1.412 caracteres — objetivo:
abrir o curso" has been shown a promise, not a script. They cannot approve delivery,
catch a phrase that does not sound like them, or notice a claim they would not make,
because none of that is on the page. The files exist on disk, but a gate that requires
opening twenty-one files in a terminal is a gate nobody passes through.

So the roadmap carries two things by the end of stage 2: the ementa at the top, and the
scripts in full at the bottom. Per lesson in the appendix:

~~~md
## 01-2-o-recrutador-busca
### O recrutador não navega, ele busca

`01-2-o-recrutador-busca/narration/aula.txt` — 2.328 caracteres · ~2,5 min

```text
<o texto exato, copiado do arquivo>
```
~~~

Three rules for the appendix:

- **It is a copy, never a retelling.** Generate it from the files themselves, so the two
  cannot drift. If the creator edits a line, change the file and regenerate the
  appendix — never only one of them.
- **Say so explicitly:** this is the exact text that goes to the TTS, nothing is added
  or reformulated at generation time. The creator needs to know that editing here
  changes the audio.
- **Count characters, not bytes.** `wc -c` returns *bytes*, and an accented character
  in UTF-8 takes two of them, so in Portuguese it overstates the real count by about 3%.
  **The ~934 per minute rate is characters per minute** — re-measured at 929 on a real
  pt-BR lesson (1,373 characters → 88.64 s). Both the duration estimate and the
  ElevenLabs budget, including its 10,000-per-request limit, are in characters.
  Reporting bytes as if they were characters inflates every duration in the course by
  3% and hides how close a long lesson is to the request limit.

## Delivery mode comes first

The same lesson content becomes three different scripts depending on where it will be
published. Decide the mode before writing, because it changes sentence length, how much
the narration addresses the viewer, and the voice settings used to generate it.

| Mode | Where it goes | Register | What it sounds like |
|---|---|---|---|
| **e-learning** | paid course lessons | structured, signposted, consistent across 60 lessons | a teacher working through a syllabus |
| **conversational** | YouTube, social, free content | loose, asides, humour, direct address | a person talking to you about something they like |
| **how-to** | tutorials, walkthroughs, documentation | neutral, precise, step by step | someone narrating exactly what they are doing |

What actually changes between them:

- **Sentence length.** Conversational runs shortest and most fragmented; e-learning is
  slightly longer and more complete; how-to is short but declarative.
- **Asides.** Conversational welcomes them ("e olha, isso aqui me pegou na primeira
  vez"). E-learning uses them sparingly, because across sixty lessons they wear out.
  How-to avoids them: they break the steps.
- **Signposting.** E-learning uses brief signposts where they help viewers follow the syllabus. Conversational signposts loosely. How-to
  signposts by step number.
- **Repetition.** E-learning recaps only when it adds useful continuity.
  Conversational repeating sounds condescending.
- **Opening.** Conversational earns a greeting. E-learning opens with the question the
  lesson answers. How-to opens with the goal state: "no final disso aqui você vai ter
  um HPA funcionando."

The same beat, in all three modes:

| Mode | How it sounds |
|---|---|
| e-learning | "O HPA não observa o Pod. Ele observa uma métrica. Guarda essa distinção, porque o resto da aula depende dela." |
| conversational | "Olha, o HPA não olha o Pod. Ele olha a métrica. E isso confunde todo mundo no começo, inclusive eu." |
| how-to | "Primeiro entenda o que o HPA observa: a métrica, não o Pod. Isso define o que você vai configurar no próximo passo." |

For a course, default to **e-learning** unless the user says otherwise. For anything
going to YouTube as standalone content, default to **conversational** — and note that a
course lesson republished on YouTube keeps the e-learning register rather than being
rewritten; consistency inside the course matters more.

The voice settings change with the mode too — see the mode table in
`elevenlabs-voiceover.md`.

## Register

The rules below are the baseline for **all** modes: spoken Portuguese rather than
written Portuguese. The mode tunes how loose it gets; it never makes the script sound
like a document read aloud.

Write how a competent instructor actually speaks to a camera: direct, warm, moving.

| Avoid | Prefer |
|---|---|
| "Olá. Meu nome é X. Eu estou aqui para apresentar o conceito de Helm chart." | "E aí, pessoal! Hoje a gente vai falar de Helm chart." |
| "Neste vídeo, será abordado o funcionamento do HPA." | "Nessa aula a gente vai entender como o HPA funciona de verdade." |
| "Conforme supracitado, o objeto em questão..." | "Como eu falei ali atrás, esse objeto..." |
| "É necessário que o usuário configure..." | "Você vai precisar configurar..." |
| "Primeiramente, cumpre destacar que..." | "Primeira coisa:" |

Concrete rules, each one audible when broken:

- **Second person, singular.** Talk to one viewer: "você", not "os alunos".
- **Contract and elide like speech does.** "a gente" over "nós" in most places,
  "pra" over "para" where it is natural, "tá" over "está" in asides.
- **Short sentences.** One idea per sentence. Long subordinate clauses that survive on
  the page fall apart when spoken.
- **Signpost out loud.** "Olha só", "Repara nisso", "Guarda essa ideia", "Agora vem a
  parte importante". These are what make narration followable without a visual.
- **Ask and answer.** "E por que isso importa? Porque..." A rhetorical question is the
  cheapest way to restart attention mid-lesson.
- **Say the number, then the meaning.** "São três escalas diferentes. Três. E a maioria
  das pessoas mistura duas delas."
- **Admit difficulty where it exists.** "Essa parte confunde todo mundo no começo" buys
  more credibility than pretending it is simple.

Do **not** write the instructor's name or a fixed persona into the skill's own
guidance — the register is generic, the identity comes from the user's voice and
whatever they ask to be said.

## Direct technical teaching is the default

For technical content, lead with what the concept is, what the tool does, or the
operation being taught. Then explain the mechanism and give a concrete example.
A definition is a valid opening. A real command or query is also valid when the
intended audience can understand it. Do not make viewers wait through a fictional
incident, an origin story or an analogy before hearing the technical point.

The creator's stated audience and preferred register override generic teaching
patterns. Experienced practitioners generally need technical detail and examples,
not a fresh explanation of why software operations matter.

A useful compact sequence, not a mandatory formula:

1. **Concept or capability.** Name it and explain it precisely.
2. **Mechanism.** Explain how it works or how the viewer uses it.
3. **Example and evidence.** Show a query, command, interface, configuration or result.
4. **Relevant limit.** Include one when it affects correct use.

For example, an MCP lesson can open directly:

> MCP é um protocolo que padroniza a comunicação entre uma aplicação de IA e
> servidores que expõem ferramentas, recursos e prompts. Um servidor pode oferecer
> uma ferramenta pra consultar logs; o agente chama essa ferramenta e recebe o
> resultado. O acesso depende das ferramentas expostas e das permissões concedidas.

An operations lesson can open with the sources and access methods:

> Pra investigar uma falha com IA, forneça logs, métricas, traces e a execução da
> pipeline relacionada. O agente pode consultar essas fontes por ferramentas
> autorizadas, ou analisar arquivos e saídas que você enviar.

These are examples of scope and register, not fixed scripts to copy into every course.

### Storytelling and analogies are optional

Use a short scenario only when it explains a mechanism more efficiently than stating
it directly. Historical context belongs in a history lesson or where it materially
explains a design decision. Do not manufacture pain, suspense or a breaking point.
A request for a conversational YouTube video may justify a narrative opening; it does
not make storytelling mandatory for every video or every concept.

A callback is useful only when an earlier concept is needed now. An analogy helps only
when the technical explanation is otherwise hard to understand. Neither needs to appear
at regular intervals. Natural speech comes from rhythm and clear sentences, not filler.

### Explanation depth and brevity

Use the highest level of detail the audience needs, and omit prerequisites already
established. Moving between overview and implementation is useful when it clarifies
the topic; there is no mandatory sequence of abstraction levels or closing recap.
Do not force every concept through problem, history, mental model, real world and YAML.

For a simple concept, a precise definition and one example can be enough. For a complex
mechanism, explain the parts and failure modes needed for correct use. Do not equate
shortness with superficiality, and do not extend a lesson to meet an arbitrary runtime.
A creator's short lesson budget is a constraint on scope, not a request for rushed speech.

## Shape of a lesson

- **Opening:** state the concept, operation or question directly. Add context only if
  needed to understand it. Avoid repeated welcomes and imaginary incidents.
- **Middle:** explain the mechanism and practical use with relevant examples. Name
  inputs, tools, outputs and constraints when those are the subject of the lesson.
- **Close:** finish when the point is explained. Recap or preview the next lesson only
  when it helps continuity; no mandatory moral, punchline or repeated conclusion.

Keep all technical claims accurate and cited in `script.md`. A hypothetical example
must be identified as illustrative; it is never evidence of an actual execution.

## Beats — where the script meets the video

A beat is one sentence that introduces one visual. Mark them in `script.md`:

```md
## Beats
- b1  statement  "o HPA não olha o Pod, ele olha a métrica"
- b2  diagram    the HPA control loop: metrics server -> HPA -> Deployment -> replicas
- b3  shot       terminal: `kubectl autoscale deploy/api --cpu-percent=70 --min=2 --max=10`
                 then the manifest it produced, zoomed on spec.metrics
- b4  shot       terminal: `kubectl get hpa -w` while the replica count climbs
```

Name the **artefact** on a `shot` beat: which command, file, query, page or result.
Order visuals to match the explanation the audience needs. A terminal can be first
when a command is the subject; a diagram can come first when the mechanism needs it.
Do not add a separate problem visual merely to satisfy a narrative template.
See `realistic-visuals.md` for sourcing, framing and legibility.

Then, in the narration, make sure the word that should trigger each visual is actually
spoken, and spoken once in that position. `revealWord` in the video config matches
against it. A word that appears three times earlier in the lesson is a bad trigger —
pick a distinctive one.

## Sounding human without filler — the house rule

A script read perfectly sounds like a script read perfectly. Real teaching speech has
breaks, restarts and emphasis that written prose does not. The temptation is to add
verbal tics — "sabe?", "né?", "ó", a hesitating "hum". **Do not reach for those first.**

This was tested on a real lesson. A version with three tics and a version with a
hesitating "hum" were generated beside the plain original, and the plain one won on
**clarity** — which is what a course is selling. Filler costs comprehension on every
sentence it touches, and across sixty lessons it accumulates into a mannerism.

Naturalness comes from punctuation and structure instead. Three moves, in order of how
often they apply:

**1. Cut the comma that joins a reversal.** A speaker drops the sentence, breathes, and
restarts on the "mas". A comma there is the clearest tell of reading aloud.

> written: "Parece detalhe, mas é o primeiro elemento que o recrutador lê."
> spoken:  "Parece detalhe. Mas é o primeiro elemento que o recrutador lê."

**2. Break the long tail.** A subordinate clause that survives on the page collapses in
the mouth. Split it where the speaker would take breath.

> written: "...e muitas vezes é o único, antes de decidir se clica no seu perfil."
> spoken:  "...e muitas vezes é o único. Antes de decidir se clica no seu perfil."

**3. Repeat the key word instead of pronominalizing.** Teachers hammer the word they
want remembered. This reads as emphasis, not as a tic, and it costs no clarity.

> written: "Só que recrutador nenhum busca por cargo."
> spoken:  "Só que recrutador nenhum busca por cargo. Nenhum."

Applied together these change no vocabulary at all — the rewritten lesson introduced
**zero** words the original did not have. That is the test: if the "natural" version
needs new words, it is adding filler, not rhythm.

**Verbal tics are opt-in, never default.** If a creator explicitly wants them, place at
most one per rhetorical moment — closing a definition, turning the argument, before the
conclusion — never on a fixed interval, because a fixed interval is audible as a tic.

## Pacing, inside the text

Eleven v4 has no SSML break tags. Pauses come from punctuation and structure:

- A period is a real pause. Use them generously; comma-spliced narration rushes.
- **Ellipses add weight and a longer pause**: "E o resultado disso... é um cluster que
  nunca escala."
- A paragraph break (blank line) gives the longest natural pause. Use one between beats.
- **Capitalization adds emphasis** on a word: "isso NUNCA funciona em produção."
- Audio tags like `[laughs]` or `[whispers]` exist in v4 but are unreliable and can be
  rendered as a sound effect. Do not use them in course narration.

If the delivery rushes or drags, **the punctuation is the only fix**. Eleven v4 has no
Speed slider and no Style slider, and does not support SSML — there is no setting to
reach for. Add periods, split sentences, use a paragraph break between movements.

## Technical terms in English

Write them **in their real spelling**: `Helm chart`, `API server`, `kubelet`, `HPA`,
`requests`, `limits`. Eleven v4 handles English terms inside Portuguese correctly.

Do not phonetically respell them. An earlier version of this skill shipped a respelling
layer (`Êi-pi-ái sârver`) because a local open-source model applied Portuguese
grapheme rules to every word; that model is gone, and respelling now only breaks the
caption alignment, which indexes the words the model was given.

Acronyms read letter by letter in Portuguese are fine as-is (`HPA`, `RBAC`, `CNI`).
If a specific term comes out wrong on the first generation, fix that one term by
spelling it as it should sound and keep a note in `script.md` — do not pre-emptively
rewrite the whole script.

## Symbols, paths and quoted prompts

A symbol is not a word, so there is nothing to "read in its real spelling". A voice model
asked to say `CLAUDE.md` or `/var/log/nginx` guesses, and guesses differently on each
take. **Spell the symbol the way a person would say it aloud**, and let the screen show
the symbol (see *Showing symbols in captions* in `references/video-pipeline.md`).

| On screen | In `narration/aula.txt` |
|---|---|
| `CLAUDE.md`, `AGENTS.md` | `CLAUDE ponto M D`, `AGENTS ponto M D` |
| `/var/log/nginx` | `barra var, barra log, barra nginx` |
| `docs/plans` | `docs barra plans` |

This is the **opposite** of the rule above, and the difference is the point: do not
respell a *word* (`Helm chart`, `kubelet`), because the voice already reads it; do spell
a *symbol*, because it has no reading.

**Put an example prompt or a command the narrator quotes inside quotation marks**, in the
spoken text: `Pedido bom: “O serviço nginx está fora do ar. Veja os logs…”`. The marks
keep Eleven from running the quotation into the sentence around it.

Every spelling you introduce needs a line in the lesson's `display.json` (template:
`templates/display.example.json`), and the creator should see both — the spoken
text *and* the table — when approving the script. A spelling with no table entry shows up
in the captions exactly as spelled.

## Budget

~934 characters per minute of finished audio, measured on Eleven v4.
Check the character count of `narration/aula.txt` before generating:

```bash
python3 -c "import sys; print(len(sys.stdin.read().replace(chr(10), '')))" < narration/aula.txt
```

`wc -c` would return bytes, which in Portuguese runs about 3% above the real character
count. Use it only if you want that as a safety margin, and say which one you measured.

A 2–4 minute lesson is 1,900–3,700 characters; the 10-minute ceiling is ~9,300, which
still fits Eleven v4's 10,000-character request in one go. Past ~9,500, split the
lesson rather than the request — a lesson that needs two requests is a lesson with two
subjects, and two requests are two takes that will not match seamlessly.
