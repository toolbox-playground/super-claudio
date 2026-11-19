# Script rules

Every rule here came from a version the creator rejected. Apply all of them on the first
draft; the review checklist (`review-checklist.md`) re-checks them.

## Files

- `narration/aula.txt` — exactly the words to be spoken, nothing else.
- `script.md` — format, character count, structure, a scene table (fala → o que aparece)
  and a **sources table** (afirmação → fonte com data). Plus "simplificações conscientes".
- `display.json` — spoken form → shown form, applied after alignment:
  `{"treinamentos ponto tbxtech ponto com ponto br": "treinamentos.tbxtech.com.br", "seis da tarde": "18h"}`.

## Structure

1. **Hook — the complete analogy first** (story, de-para, ending), starting with
   "Imagina o seguinte cenário: …" or a sourced fact. A short that opened with only half
   the analogy (the beer, without its software mapping) was rejected angrily.
2. **Turn:** "No desenvolvimento de software é igual." / "Na computação em nuvem é igual." /
   "No mundo da tecnologia, num site de e-commerce na Black Friday, é igual."
3. **De-para:** "Cada caixa é como se fosse um servidor, com uma cópia da aplicação, que a
   gente chama de réplica." Map every role in the story (customer, cashier, inspector,
   manager…). Each mapping explains the technical side in the same sentence.
4. **How it works:** the mechanism, with market vocabulary (commit, git push, build,
   deploy, réplica, contêiner, API, HTTP).
5. **The tools that solve it, connected to the story:** introduce real tools through the
   problem they solve, in the same thread: "Na AWS, quem distribui essa fila de clientes é o
   Elastic Load Balancing, junto com o Auto Scaling. No Kubernetes, é o Service com o
   Horizontal Pod Autoscaler." / "As ferramentas de segurança que fazem essa varredura são…" /
   "Exemplos de bancos de dados que guardam isso…". **Never open the beat with "Os nomes
   reais:"** — it is a label, not a sentence, and it breaks the story the viewer is following.
6. **Na prática:** one sentence that the real terminal demo illustrates.
7. **CTA:** "Compartilha com aquele colega que acha que é só comprar um servidor maior.
   E pra aprender computação em nuvem ou qualquer tema de tecnologia, acessa …"

No short references another short.

## Choosing the analogy

- It must be understood **on first hearing** by someone outside tech and must not insult
  the expert. Rejected: "capô aberto" (Linux), "castelo × bloquinhos", a recipe/kitchen for
  AI agents, Waze. Accepted: phone contacts (DNS), waiter (API), building blueprint (IaC),
  travel agent vs asking directions (AI agent), save game (Git), supermarket checkouts on
  Black Friday (load balancer + auto scaling), notebook vs a PC built part by part
  (monolith × microservices).
- Prefer a story with **roles** (who does what) so the de-para has 3–5 clean pairs.
- If unsure, offer 3–4 options with the reasoning (strength, weakness, how it draws) before
  writing, or go direct with a factual hook.
- Search for how others explain it (articles, docs) and for an authoritative definition
  (AWS/Google/Microsoft docs, the original author) to use in the technical part.

## Wording

- **Full names, never a generic noun on its own.** "No desenvolvimento de software é
  igual" (not "No software é igual"); "computação em nuvem" or "cloud computing" (not "na
  nuvem"); "agente de IA" (not "o agente"); "ambiente de produção"; "testes
  automatizados"; "bug no código"; "placa de vídeo" (not "o vídeo"); "o serviço de
  pagamento" (not "o pagamento"). Re-read sentence by sentence hunting loose nouns.
- **De-para with a connector**, never "X é Y": "Salvar o jogo é como se fosse fazer um
  commit do seu código: uma foto do código naquele exato momento."
- **Every term defined on first appearance**, technically: what it is, then what it is for.
- **Examples as the viewer's action** ("Quando você abre a Netflix e escolhe uma série, o
  seu pedido vai…"), not loose statements.
- No ambiguous pronouns ("Ele fica num data center" → "Esse computador fica…").
- Acronyms spoken as said ("iás, pás e sás"); the screen shows the real spelling via
  `display.json`. Symbols spelled for the voice ("CLAUDE ponto M D").
- "IA" is lowercase in the TTS text ("ia") so it is not spelled "I A"; "CI CD" with a space.
- Healthy jokes only.

## Facts and numbers

- No number or percentage without a primary source. Observations become "a maioria",
  "grande parte".
- Hook facts need a **primary** source: the official blog/doc page, opened, with the exact
  quote and date in `script.md`. Not an e-mail, not Reddit. If you cannot open the source,
  drop the claim and say so.
- News hooks must stay true whenever the video is posted, which may be weeks later. Use the
  absolute date and never a relative one: "No dia 19 de novembro de 2026, saiu o GTA 6",
  never "nesta quinta-feira", "hoje", "ontem" or "esta semana". Before the audio, check the
  date: an event that has already happened by then is told in the past ("saiu"), never as
  a future one ("sai").
- Illustrative numbers on screen (a graph's threshold, a mock store's prices) are labelled
  as examples and are never spoken as facts.

## Length

- 1–2 min, never over 2:00. Budget ≈ 15.8–16.5 characters per second of this voice:
  **aim at 1,850–1,930 characters** for a 2-minute short.
- Over budget: cut an extra analogy beat before cutting technical explanation; never cut a
  full name to save time.
- If the generated audio still exceeds 2:00 by a little, speed it up (see `pipeline.md`).

## The creator edits

When the creator rewrites a sentence, apply exactly what they wrote. When they ask for a
new example, add it — do not replace another one.
