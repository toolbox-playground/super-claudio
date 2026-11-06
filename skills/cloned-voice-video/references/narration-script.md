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

## Act like a teacher, not like a dictionary

This is the single biggest difference between a course and a list of definitions, and
it is where a script most often goes wrong. **Never open a concept with its
definition.** "Kubernetes é uma plataforma de orquestração de containers" is a correct
sentence that teaches nobody anything, because the listener has no hook to hang it on.

Open with the **problem the thing exists to solve**, walk the viewer to the point where
they feel that problem, and let the definition arrive as the answer they were already
waiting for.

### The arc, when introducing a concept

1. **The need.** What was painful before this existed.
2. **The short history.** How we got here, in a few sentences — enough to make the need
   concrete, never a lecture on history for its own sake.
3. **The breaking point.** What stopped working at scale, which is what forced the thing
   into existence.
4. **The name, and only now the definition.** By this point it lands as a conclusion.
5. **The detail**, technical, once the ground is laid.

Worked example — the opening of a "o que é Kubernetes" lesson:

> O Kubernetes nasceu de uma necessidade: gerenciar muito container.
>
> E pra isso fazer sentido, eu preciso te contar uma historinha sobre Docker. O Docker
> empacota o seu código junto com tudo que ele precisa pra rodar. Aí esse pacote roda
> igual em qualquer máquina — e acabou aquele "na minha máquina funciona". Isso pegou.
> Virou padrão da indústria.
>
> Só que as empresas passaram a usar tanto, mas tanto, que viraram dezenas de
> containers. Depois centenas. Depois milhares. E manter todos eles de pé, conversando
> entre si, distribuídos em máquinas diferentes... isso virou um problema maior do que
> o que o Docker tinha resolvido.
>
> Foi daí que nasceu o Kubernetes. E não é à toa que o símbolo dele é um leme de navio:
> o nome vem do grego, e quer dizer piloto, timoneiro. É quem conduz o navio carregado
> de container.
>
> Então o Kubernetes é isso: o maestro que orquestra e gerencia os seus containers.

Notice that the definition is the **last** sentence, and by then it is almost
redundant — which is exactly how it should feel.

The same move outside technology, opening a LinkedIn course:

> Hoje a maior plataforma de recrutamento do mundo é o LinkedIn. No Brasil também.
>
> Quem trabalha com tecnologia precisa de um perfil bem estruturado — não bonito,
> estruturado — pra que o recrutador consiga te achar. Porque existe um mecanismo por
> trás disso. O recrutador não fica passando perfil por perfil: ele busca.
>
> Nesse curso a gente vai te mostrar como esse mecanismo funciona, e como deixar o seu
> perfil do lado certo dele.

Not "nesta aula você vai colocar foto, headline e resumo".

### After the introduction: callbacks, not another story

**Storytelling is for introducing a concept, once.** Once Kubernetes has been
introduced, no later lesson re-tells its origin. What later lessons do instead is
**call back** to what was already established, in one sentence, and build on it:

> Lembra que a gente falou que o Kubernetes orquestra e gerencia os containers? Um dos
> benefícios disso é alta disponibilidade.
>
> E o que é alta disponibilidade? É o sistema ficar de pé. Disponível o tempo todo, ou
> o máximo de tempo possível, sem cair. Imagina você tentar entrar no YouTube e ele
> estar fora do ar. Um sistema que cai é um sistema que ninguém confia.
>
> Um dos mecanismos que o Kubernetes usa pra entregar isso é o HPA, o escalonamento
> horizontal. E ele funciona assim...

Two things are happening there. The callback re-establishes the thread for free, and
the **aside** — "imagina entrar no YouTube e estar fora do ar" — is storytelling in
quotation marks: one sentence, concrete, and it makes an abstract word land. Those
asides belong everywhere. The full arc belongs only at an introduction.

### Analogies, for hard concepts only

When a concept is genuinely difficult, say it twice: once technically, once as an
analogy. "Auto-healing é o Kubernetes recriando sozinho o que morreu — é um poder de
regeneração." Analogies are cheap and they stick.

But **only when the concept is hard.** Explaining an easy idea two different ways
sounds like padding, and a course that does it on every concept teaches the viewer to
stop listening the first time.

### The verbosity dial

Imagine verbosity from 0 to 5, where 5 repeats the same idea in several different
shapes. **Course narration lives at 1 to 3, and never at 4 or 5.**

| Level | When | What it looks like |
|---|---|---|
| **1** | a simple concept, or one already grounded | state it, show it, move on |
| **2** | the default for most lessons | state it, give one concrete example, move on |
| **3** | a hard or counter-intuitive concept | the arc or a callback, an example, and one analogy |
| 4–5 | never | the same idea three ways; the viewer stops listening |

The failure on both sides is real. Compressing the HPA into "HPA é horizontal pod
autoscaling, o escalonamento horizontal de pods" takes ten seconds, is entirely
correct, and teaches nobody. Stretching it to five minutes of restatements loses the
room. The target is the middle: clear, concrete, explained — and then finished.

**Do not rush, and do not pad.** The length of a lesson follows the teaching, never a
number someone picked. `course-architecture.md` has what each duration is actually for.

## Shape of a lesson

- **Open with the problem, or with the callback.** A lesson introducing a concept opens
  with the need, per the arc above. A lesson continuing one opens by calling back to
  what was established, then asks the question this lesson answers. Neither opens with
  a greeting ritual — only the first lesson of a course or a module gets a welcome.
- **Middle: one mechanism, in order.** Follow the beats from `script.md`. When you move
  to a new beat, say so out loud — that sentence is the scene boundary.
- **Close by naming what was learned and what comes next.** Two sentences. No
  "não esqueça de curtir e se inscrever" unless the creator asks for it.

**The facts inside the story must be real.** A narrative arc is a teaching device, not
a licence to invent dates, origins or mechanisms. Verify what the story asserts, and
cite it in `script.md`, exactly as for any other claim.

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

Name the **artefact** on a `shot` beat, not just the idea: which command, which file,
which page. And order them the way the arc runs — the problem drawn, then the
architecture, then the CLI; never the CLI first. `realistic-visuals.md` has the
sequence and why a split screen is the wrong answer to it. That line is what gets built as an HTML replica before the render — see
`realistic-visuals.md`. A beat whose artefact you cannot name is usually a beat that
has not been thought through.

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

## Budget

~934 characters per minute of finished audio, measured on Eleven v4.
Check the character count of `narration/aula.txt` before generating:

```bash
tr -d '\n' < narration/aula.txt | wc -c
```

A 2–4 minute lesson is 1,900–3,700 characters; the 10-minute ceiling is ~9,300, which
still fits Eleven v4's 10,000-character request in one go. Past ~9,500, split the
lesson rather than the request — a lesson that needs two requests is a lesson with two
subjects, and two requests are two takes that will not match seamlessly.
