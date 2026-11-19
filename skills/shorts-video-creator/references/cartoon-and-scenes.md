# Cartoon and scenes

The reason shorts are built in HTML is **movement**. A static slide with zoom scored 7; the
same idea as a continuous SVG cartoon scored 10. `templates/example-scenes.js` is a complete
approved short (monolith × microservices) to copy from.

## The kit (templates/cartoon-header.js + head.html)

- `S.push({id, word, nth | T, html, draw(t, $)})` — a scene starts at `at(word, nth)`; `draw`
  is called every frame with the time `t` and a scoped `$`; `this.$$` selects many; `this.t`
  is the scene start.
- Timing: `at('palavra', n)`, `nthAfter('palavra', seconds)`, `ease`, `inout`, `lerp`,
  `clamp`, `mvk(t, [[t0, x0], [t1, x1, dur], …])` for keyframed walks.
- Reveal: `pop(el, t, t0)`, `fade(el, t, t0, t1)`, `show`, `tag(id, txt, style, 'g'|'y'|'r')`
  for chips, `page(kick, title, body, credit)`, `win(id, title, body, style)` for a terminal,
  `lines([...])`, `camHTML` + `camera()` for a real image with pan/zoom.
- `svgOpen(id, h)` / `svgClose`: a 960×h rounded SVG stage.

## Characters (fixed for the series)

`FIG(id, shirt, extra)` + `posefig(g, {x, f, a1, a2, lean, mood, walk, sit, kneel, dy}, t, ground)`:

| Character | Call |
|---|---|
| dev | `FIG('dv', '#2563EB', HAIR)` |
| ops | `FIG('op', '#F97316', HEADSET)` |
| customer | `FIG('cl', '#16A34A', CAP)` |
| manager (tie) | `FIG('gr', '#475569', HAIR + '<path d="M-6 42 L6 42 L4 52 L8 88 L0 98 L-8 88 L-4 52Z" fill="#dc2626"/>')` |

- Arms `a1/a2 = [shoulderDeg, elbowDeg]` (0 = down, 90 = forward, 170 = up); `walk: t*14`
  animates legs; `mood: ok | happy | angry | oops`; `sit: 1` for a seated pose (a customer at
  a restaurant sits, does not stand).
- Scale a character by wrapping it: `<g transform="scale(.6)">${FIG(...)}</g>` and call
  `posefig` with `x/.6`, `ground/.6`. `posefig` returns `{hand, head}` to attach props.
- **Every mapped role wears a badge**: `badge(id, 'FISCAL')` — white plate, dark text,
  positioned on the chest each frame. Never white text on a light background.
- Crowds: `MINI(cls, i, 'cart' | 'phone')` small people with a cart or a phone; `legs()`
  swings their legs while they move.

## Props (templates/cartoon-props.js)

- `SRV(w, h)` — a drawn rack server (drawers, LEDs, vents) with a `.hot` red overlay;
  `blink(root, t)` blinks its LEDs. **A server is always this, never a grey box.**
- `CITY(id)` + `HERO(id, color)` — the original open-world game "Cidade Neon" for any
  game/TV/monitor screen; `GAMEHUD(id)` for an FPS counter.
- `SMOKE(id, x, y)` + `smoke(g, t, t0)` — something burning/breaking.
- `POST`, `BELTLINE` — a queue with stanchions and belt.
- Draw scene objects so they look like the real object: a supermarket checkout has belt,
  scanner, register, cashier and an ABERTO/FECHADO plate; a notebook has lid, keyboard and a
  board inside; a PC has motherboard, PCIe/DIMM/M.2 slots and parts that slide in and out.

## Motion kit (templates/motion-kit.js)

- `A(word, t)` — start time of the occurrence of `word` nearest after `t - 3` s, minus .25 s.
- Real image with life: `IMG(id, src, style, fit)` + `kb(el, t, t0, t1, z0, z1, x0, y0, x1, y1)`
  (Ken Burns) or `zoomTo(el, t, [[t0, {x, y, z}], …])` to push into the detail being named.
- Entrances: `slideIn(el, t, a, 'left'|'right'|'up'|'down')`, `stamp(el, t, a)` for a slammed
  `STAMP('GOLPE')`, `shake`, `pulse` (share button), `CONF`/`conf` confetti.
- Flows: `DOTS(cls, n)` + `flow(svg, '.cls', t, a, [[x,y],…])` — requests, packets, attackers.
- Mocks: `BROWSER(id, url, body, style, lockId)` (address bar with 🔒 to zoom into),
  `PHONE`, `CLOCK`/`clock(g, hours)`, `SWITCH`/`sw(root, id, on)`, `LOGOCARD`, `CREDIT`.

## Scene patterns

1. **Hook cartoon** — the whole story with continuous action: walks, objects flying, day →
   night (sky + dim overlay + clock), queues growing and shrinking, things breaking (smoke),
   balloons of speech, confetti at the climax. Chips name what is happening ("fila gigante 😫").
2. **Everything named is shown.** "site de e-commerce" → a mock store in HTML (browser bar,
   header, banner, product cards with prices, a cart counter). "chega em casa e abre o app" →
   people walking home, windows lighting up, phones glowing. "jogo pesado" → the game at 5 FPS.
3. **Punch at the turn (~2 s)** — full-stage overlay: big emoji, the concept name, subtitle,
   real logos (on a white plate when the logo is dark). Then back to the drawing.
4. **De-para diagram in its own art** (not drawn over the cartoon): left the story side,
   right the technical side, a "≈" chip per pair lighting on its word, chips under the stage.
5. **Architecture complete**: clients (MINI with phones) → app/front-end mock → load
   balancer/API → services/replicas (SRV or containers), with request dots flowing; failures
   in red ✗, healthy ✓, scaling adds replicas, the orchestrator frame wraps them.
6. **Graphs** have a title saying what they measure ("📈 acessos ao site") and a time axis
   with labels; mark where the peak starts. Example thresholds are labelled "exemplo".
7. **Terminal demo** with the real output (`win` + `lines`), lines revealed on the spoken
   words, credit "Saída real: … dd/mm/aaaa".
8. **Meme for the CTA** — the "colega" doing the silly thing (pushing a giant server through
   a data-center door, a 40-part PC opening the notepad) with 🤡, then a pulsing share button.
9. **Catalog** — the creator's real catalog screenshot with `camera()` pan.

## Movement and time

- No drawing stands still for more than ~15 s: cut to another picture of the same idea
  (a diagram, a real image, the terminal).
- A cartoon scene that is only text typing scored 8: put a character doing the action.
- Real images: Wikimedia logos; simple diagrams from an image search (cropped), never a
  screenshot of an English documentation page; never a photo of a real person.
- News hook about a real product (game, app, service): open on its **official** image
  (cover art or screenshot from the publisher's site or press kit), credited on screen
  ("Imagens oficiais: <empresa>"), with the hook's facts laid over it. Text-only names
  for a product everyone can picture scored as "ridículo".
- Finding real images without Google (its image search answers bots with a CAPTCHA, which
  is never bypassed): DuckDuckGo Images in the built-in browser; click a thumbnail and read
  the `iai` parameter of the page URL for the original file. Download it, credit the page.
- When the narration names something on the internet (a fake site, the browser padlock, an
  app screen), show it: the real screenshot, or an HTML mock with a zoom on the detail.
- The creator's own material first (decks, lessons, meme bank) when the topic matches.
