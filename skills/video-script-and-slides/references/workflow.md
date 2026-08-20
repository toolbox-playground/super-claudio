# Video Script and Slides — Full Workflow

Output goes to `~/Movies/video-talks/<slug>/`:
- `script.md` — the spoken script
- `slides.html` — the presentation (single self-contained file)
- `sources.md` — every source checked, with URL, date checked, and what it confirmed
- `youtube.md` — publishing kit: title options, full description, thumbnail notes
- `capa.html` — 1–2 thumbnail mockups (16:9, self-contained)

Write all three in the language of the user's request. Templates below use pt-BR as the
example language — adapt headings and register to the user's language.

## Phase 1 — Research (the credibility phase)

The topics are usually career/education/tech questions ("vale a pena X em 2026?",
"cursos gratuitos de Y", "do I need English to work in tech?"). Research standards:

1. **Search broadly first**: 2–4 WebSearch queries from different angles (the question
   itself, statistics, official sources, recent-year variants).
2. **Prefer source types in this order**: official platforms (Google/AWS/Microsoft
   training pages, cloud.google.com/learn, aws.amazon.com/training, learn.microsoft.com,
   anthropic.com/learn) → established research (Stack Overflow Survey, DORA Report,
   State of DevOps, LinkedIn/Glassdoor salary data) → reputable tech media. Avoid blogs
   of unknown origin for numbers.
3. **Verify each fact with WebFetch** before using it: fetch the page and confirm it
   states what you'll cite. Record in `sources.md`: URL, what it confirms, date checked.
4. **Course recommendations get the strictest check** — for EACH course confirm on its
   own page: (a) it exists at that URL today, (b) enrollment is free, (c) it issues a
   certificate, (d) whether the certificate itself is free or paid. If a detail can't be
   confirmed, either drop the course or state the limitation explicitly in the script
   ("o certificado pode ser pago, confere lá").
5. Collect **4–8 concrete data points** (numbers, salaries, dates, course workloads,
   survey percentages). These become the spine of the slides.
6. Local-first: when data exists for the user's country/market, prefer it; global data
   is the fallback and must be labeled as global.
7. **Localized versions**: for every platform/course you recommend, actively check for an
   official version in the user's language (try language paths like `/pt-BR/`, `/es/`, or
   the site's language switcher) — a localized link is far more valuable to the audience.
   When only English exists, say so honestly in the script and suggest translating pages
   with the browser/Google Translate extension — noting that videos stay in the original
   language. Never imply a course is localized when it isn't.

## Phase 2 — Script (script.md)

Format — one section per slide, ~1 minute each. For a 5-min video: cover + 4–5 content
sections + closing. Template (pt-BR example):

```markdown
# Roteiro — {Tema}
**Duração alvo:** ~5 min · **Slides:** 6 · **Tom:** conversa direta com a audiência

## Abertura — Slide 1 (0:00–0:40)
**Gancho (fala sugerida):** "{uma frase forte que prende nos 5 primeiros segundos}"
- Apresenta o tema e por que importa AGORA
- {ponto de conexão pessoal — deixar espaço pro apresentador improvisar}

## {Título da seção} — Slide 2 (0:40–1:40)
**Ideia central:** {uma frase}
**Pontos de fala:**
- {ponto 1 — com o dado real e a fonte: "segundo o Stack Overflow Survey 2026..."}
- {ponto 2}
**Transição:** "{deixa pra avançar o slide}"

...

## Encerramento — Slide 6 (4:20–5:00)
- Recap em 1 frase
- CTA: {seguir, comentar, link da comunidade}
```

Script rules:
- Talking points, not paragraphs — the speaker glances and talks. 3–5 bullets per section.
- Spoken register (pt-BR: "pra", "tá", "a real é que..."; adapt to the language). No
  corporate-speak.
- Every number in the script names its source out loud ("segundo a pesquisa X de 2026").
- Mark where the speaker should advance the slide (**Transição**) so recording flows.
- Leave one `{espaço pessoal}` note per script — a spot for the presenter's own story or
  opinion; authenticity is the whole point of recording a human.

## Phase 3 — Slides (slides.html)

Single self-contained file. No CDN, no external requests — logos downloaded and inlined
as data URIs or pasted inline SVG. Must open offline by double-click.

**Structure per slide deck (~5-min video):**
1. **Cover** — title + topic logo; presenter/brand identity only if the user asks
2–5. **Content slides** — one idea each. Layouts to mix: big-number slide (one stat,
   huge), list slide (3–4 items max), comparison slide (two columns), logo-grid slide
   (courses/tools with real logos)
6. **Closing** — recap line + CTA

**Design rules:**
- **Brand identity first**: if the user's context (memory, CLAUDE.md) defines a brand —
  colors, logo, tagline, footer pattern — apply it: brand colors as the palette and the
  brand footer on every slide. Only fall back to topic-derived colors when no brand exists.
- 16:9, dark background, one accent color (from the brand, else the topic's logo color,
  else a neutral accent like `#3B82F6`)
- Huge typography: titles 8–10vh, body 4–5vh (a phone viewer watching the recording must
  read everything); max ~25 words visible per slide
- Real SVG logos: Devicon `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/<name>/<name>-original.svg`,
  SVGL api `https://api.svgl.app?search=<term>`; verify `head -c 200` shows `<svg`;
  embed as data URI (`base64`) or inline `<svg>` — never a remote `<img src="http...">`
- Source footer on every slide that shows data: `Fonte: {nome}, {ano}` in small muted text
- Progress dots + slide counter in a corner

**Navigation JS (include):** arrow keys / space / PageUp-PageDown, `Home`/`End` jump,
URL hash per slide (`#3`) so the presenter can reload mid-recording without losing place.
**Clicking must NOT advance slides** — presenters click to select/copy text while
reviewing; keyboard only. On load, clear the hardcoded `active` class before applying the
hash target, or a direct load of `#3` leaves the cover slide rendered underneath.

**Skeleton:**

```html
<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>{Tema}</title>
<style>
  :root { --bg:#0B1220; --fg:#fff; --accent:#3B82F6; --muted:rgba(255,255,255,.55) }
  * { margin:0; box-sizing:border-box }
  body { background:var(--bg); color:var(--fg); font-family:-apple-system,'Segoe UI',sans-serif; overflow:hidden }
  .slide { position:fixed; inset:0; display:none; flex-direction:column; justify-content:center;
           align-items:center; padding:6vh 8vw; text-align:center; gap:4vh }
  .slide.active { display:flex }
  h1 { font-size:9vh; font-weight:900; line-height:1.1 }
  h2 { font-size:6.5vh; font-weight:800 }
  p, li { font-size:4.5vh; line-height:1.4 }
  .big-number { font-size:22vh; font-weight:900; color:var(--accent); line-height:1 }
  .fonte { position:absolute; bottom:3vh; font-size:2vh; color:var(--muted) }
  .counter { position:fixed; bottom:3vh; right:3vw; font-size:2.2vh; color:var(--muted) }
  ul { list-style:none; display:flex; flex-direction:column; gap:2.5vh; text-align:left }
  li::before { content:'▸ '; color:var(--accent) }
  img.logo { height:18vh }
</style>
</head>
<body>
  <section class="slide active"><!-- cover --></section>
  <section class="slide"><!-- content --></section>
  <div class="counter"><span id="cur">1</span>/<span id="tot"></span></div>
<script>
  const slides=[...document.querySelectorAll('.slide')];
  let i=Math.min(Math.max((+location.hash.slice(1)||1)-1,0),slides.length-1);
  const sync=()=>{document.getElementById('cur').textContent=i+1;location.hash=i+1;};
  const show=n=>{slides[i].classList.remove('active');i=Math.min(Math.max(n,0),slides.length-1);
    slides[i].classList.add('active');sync();};
  slides.forEach(x=>x.classList.remove('active'));slides[i].classList.add('active');
  document.getElementById('tot').textContent=slides.length;sync();
  addEventListener('keydown',e=>{if(['ArrowRight',' ','PageDown'].includes(e.key))show(i+1);
    if(['ArrowLeft','PageUp'].includes(e.key))show(i-1);if(e.key==='Home')show(0);if(e.key==='End')show(slides.length-1);});
</script>
</body>
</html>
```

## Phase 4 — Publishing kit (youtube.md + capa.html)

The video needs packaging, not just content. Produce `youtube.md` with:

1. **Title options (2–3)**: curiosity + concrete benefit, honest (no promise the video
   doesn't keep). Highlight the strongest verified hooks (e.g., "free", "in Portuguese",
   "in 1 hour").
2. **Full description**, ready to paste: one-line hook; chapter timestamps taken from the
   script's timing marks; the verified links (same URLs as sources.md); a transparency
   note when something needs a caveat; the user's site/social links (from their brand
   identity in memory, when available); 5–8 hashtags.
3. **Thumbnail concepts**: build `capa.html` — 1–2 fullscreen 16:9 mockups navigable like
   the slides (same JS), using brand colors, giant text (≤6 words), real platform logos,
   and optionally a dashed placeholder where the presenter's face goes (thumbnails with
   faces perform better). The user opens it fullscreen and screenshots at 1920×1080.

## Phase 5 — Verify + deliver

1. Every cited URL was fetched and confirmed (this happened in Phase 1 — re-check any
   added later).
2. Open `slides.html` in the browser (or screenshot headlessly) and check EVERY slide —
   nothing overflows, logos render, counter works, sources present. Also load a middle
   slide directly by hash (e.g., `#3`) to confirm no slide renders underneath. Check
   `capa.html` the same way.
3. Word-count sanity on the script: ~130–150 spoken words per minute of video; a 5-min
   script ≈ 650–750 words of talking points is the ceiling.
4. Deliver: send `script.md`, `slides.html`, `sources.md`, `youtube.md`, and `capa.html`
   to the user; summarize the slide list,
   total estimated duration, and the strongest data points found. Mention anything you
   could NOT verify so the presenter doesn't repeat it on camera.
