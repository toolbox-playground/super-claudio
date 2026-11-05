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
- **Signposting.** E-learning signposts heavily, because the viewer is following a
  syllabus and needs to know where they are. Conversational signposts loosely. How-to
  signposts by step number.
- **Repetition.** E-learning repeats the key idea at the end of the lesson on purpose.
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

## Shape of a lesson

- **Open with the question the lesson answers,** not with a greeting ritual. One short
  hook, then straight in. Only the first lesson of a module needs a welcome.
- **Middle: one mechanism, in order.** Follow the beats from `script.md`. When you move
  to a new beat, say so out loud — that sentence is the scene boundary.
- **Close by naming what was learned and what comes next.** Two sentences. No
  "não esqueça de curtir e se inscrever" unless the user asks for it.

## Beats — where the script meets the video

A beat is one sentence that introduces one visual. Mark them in `script.md`:

```md
## Beats
- b1  statement  "o HPA não olha o Pod, ele olha a métrica"
- b2  diagram    the HPA control loop: metrics server -> HPA -> Deployment -> replicas
- b3  code       the kubectl autoscale command, then the YAML it produces
- b4  reconcile  the loop converging after a traffic spike
```

Then, in the narration, make sure the word that should trigger each visual is actually
spoken, and spoken once in that position. `revealWord` in the video config matches
against it. A word that appears three times earlier in the lesson is a bad trigger —
pick a distinctive one.

## Pacing, inside the text

Eleven v4 has no SSML break tags. Pauses come from punctuation and structure:

- A period is a real pause. Use them generously; comma-spliced narration rushes.
- **Ellipses add weight and a longer pause**: "E o resultado disso... é um cluster que
  nunca escala."
- A paragraph break (blank line) gives the longest natural pause. Use one between beats.
- **Capitalization adds emphasis** on a word: "isso NUNCA funciona em produção."
- Audio tags like `[laughs]` or `[whispers]` exist in v4 but are unreliable and can be
  rendered as a sound effect. Do not use them in course narration.

If the delivery still rushes or drags, change the **speed** setting (0.7–1.2, default
1.0) rather than rewriting punctuation — see `elevenlabs-voiceover.md`.

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

## Budget

~1,200 characters per minute of finished audio. Check the character count of
`narration/aula.txt` before generating:

```bash
tr -d '\n' < narration/aula.txt | wc -c
```

A 2–5 minute lesson is 2,400–6,000 characters, comfortably inside Eleven v4's 10,000
character request limit. If a lesson exceeds ~6,500, split the lesson rather than the
request — a lesson that needs two requests is a lesson with two subjects.
