# Review checklist

Run it on every script before audio and on every video before handing it over. In batch
mode it replaces the creator's approval, so be strict: a script that fails is rewritten,
not narrated.

## Script (before spending credits)

- [ ] Opens with the **complete analogy** (story + de-para + ending) or a sourced fact
      followed by it; the de-para is not split from the story.
- [ ] The analogy is understood on first hearing by a non-tech person; an expert would not
      find it forced. Each role in the story maps to one technical piece.
- [ ] The turn sentence uses the full area name: "No desenvolvimento de software é igual",
      "Na computação em nuvem é igual".
- [ ] Every mapping is "X … é como se fosse Y …" followed by what Y is. No "X é Y".
- [ ] No loose generic noun: software, nuvem, agente, produção, testes, sistema, dados,
      vídeo, pagamento… each one has its full name ("placa de vídeo", "o serviço de pagamento").
- [ ] Every technical term is defined on first appearance, technically first.
- [ ] Real names of the tools/services are present (AWS/Google Cloud/Azure, Kubernetes, GitHub…).
- [ ] Every number has a primary source in `script.md`, opened today, with the exact quote.
- [ ] CTA "Compartilha com aquele colega que…" has a healthy joke tied to the topic.
- [ ] No reference to another short. No ambiguous pronoun.
- [ ] Acronyms spoken as said; symbols spelled; `display.json` maps them back.
- [ ] 1,850–1,930 characters (≤ 2:00); count with `len(text.strip())`.
- [ ] `script.md` has the scene table: every noun in the narration has a drawing or mock.

## Video (before handing over)

- [ ] Stills at every beat reviewed as contact sheets — nothing clipped at the edges,
      labels not overlapping, no element hidden behind another.
- [ ] Every role has a readable badge; text contrast is fine on its background.
- [ ] Hook is a moving cartoon; the punch at the turn lasts ~2 s with logos visible.
- [ ] Everything the narration names appears on screen at that word (mock, object, people).
- [ ] Servers are drawn racks; graphs have a title and a time axis.
- [ ] Terminal output is real and dated; demo containers were torn down.
- [ ] No drawing static for more than ~15 s.
- [ ] Final MP4 has audio, duration ≤ 2:00 (vertical), and a phone copy exists.
