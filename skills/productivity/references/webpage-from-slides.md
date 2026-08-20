# Webpage from Slides — Full Workflow

Convert any presentation (PDF, PPTX, exported Google Slides) into a standalone,
self-contained HTML page — embedded images, tabbed navigation, zero external file
dependencies (Google Fonts CDN is the only allowed exception).

**Core principle: the page inherits its identity from the presentation, not from any
brand or template.** Title, color palette, tone, structure, and sections all come from
what the deck actually contains. A tech class, a quarterly results deck, and a concept
talk all produce different pages — because the content decides, not a fixed layout.

---

## Phase 0 — Prerequisites

```bash
# Python libs for image extraction and palette sampling
pip3 install pymupdf Pillow --break-system-packages

# HTML validation (works in any project, no devDependency required)
npx html-validate --version
```

The `generate-image-base64` skill script must be available at:
`~/.claude/skills/generate-image-base64/scripts/extract_and_encode.py`

**PPTX input?** Convert to PDF first so slides can be read and rendered:

```bash
soffice --headless --convert-to pdf "deck.pptx" --outdir /tmp/
```

**Output location:** ask the user where the page should live (or infer from the project).
Default pattern: `{output-dir}/{topic-slug}/index.html`. Never assume a specific
site structure.

---

## Phase 1 — Read the entire deck

Read in batches of 10 pages. The Read tool renders each slide as an image automatically.

```
Read PDF: pages 1-10, then 11-20, then 21-30 (until end)
```

For each batch, note:
- Slide number (1-based)
- Content type: content | data/results | quiz | hands-on/exercise | section divider | presenter/company slide
- **The deck's own title** (usually slide 1) — the page `<title>` and hero heading MUST
  match it. Never invent a different title.
- The deck's language — the page `lang` attribute and all UI text follow it
  (`pt-BR`, `en`, `es`…).

The goal of this phase is genuine understanding: what is this presentation teaching or
reporting, to whom, and what are its major topic clusters? Everything downstream
(tabs, sections, tone) is derived from this reading.

---

## Phase 2 — Content Audit (what to SKIP)

**Always skip these slide types — never render their content in the page:**

| Slide type | Examples | Reason |
|---|---|---|
| Presenter bio | "About me", "Sobre o apresentador" | Bloats page, rarely useful to readers |
| Company pitch / logo-only | "About us", "Sobre a empresa", brand slides | Not the content itself |
| Agenda / table of contents | Bullet list of topics | Redundant — the tabs ARE the agenda |
| Contact-only | Final slide with phone/social/logo only | Use a links section instead, if needed |
| Section dividers | "Part 2", "Hands-on", empty slides | Just visual separators |

**Always include (when present in the deck):**
- Definition/concept slides
- Data, metrics, and results slides → cards, tables, or highlight stats
- Diagram/visual slides → embed image
- How-it-works / comparison slides
- Quiz or question slides → interactive quiz widget (Phase 7)
- Hands-on / exercise / lab slides → resources section (Phase 8)
- Tips, best practices, trends/outlook slides

---

## Phase 3 — Extract the Presentation's Visual Identity

The page's palette comes from the deck itself. Sample it before writing any CSS:

```python
from PIL import Image
from collections import Counter
import subprocess

# Render 3-4 representative slides (title slide + content slides) at low DPI
subprocess.run([
    'python3',
    '/Users/USER/.claude/skills/generate-image-base64/scripts/extract_and_encode.py',
    '/path/to/deck.pdf', '--page', '0', '--render-slide',
    '--dpi', '72', '--max-width', '400', '--save-to', '/tmp/palette_sample.jpg'
], check=True)

img = Image.open('/tmp/palette_sample.jpg').convert('RGB')
# Quantize to find dominant colors
small = img.resize((80, 45))
colors = Counter(small.getdata()).most_common(12)
for rgb, count in colors:
    print(f'#{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}  ({count})')
```

From the samples, decide:
- **`--bg`**: the deck's dominant background. Light deck → light page, dark deck → dark page.
- **`--accent`**: the deck's strongest recurring highlight color (headings, shapes, logo).
- **`--text` / `--muted`**: pick for WCAG-readable contrast against `--bg`.

**Fallbacks:**
- Deck is plain black-on-white with no distinctive color → ask the user for a preferred
  accent, or use a restrained neutral palette (slate surfaces + one accent).
- Multiple candidate accents → show the user 2-3 hex options extracted from the deck
  and let them pick.

A logo or distinctive mark on the title slide can be cropped (Phase 5) and reused as
favicon/navbar brand. If there is none, use an inline emoji SVG favicon:

```html
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📊</text></svg>">
```

---

## Phase 4 — Plan Structure from Content

**Tabs:** 3–5 is ideal — one per major topic cluster identified in Phase 1. The clusters
come from the deck, not from a template. Examples of how different decks map:

```
Tech class deck      → Concept | Deep dive | Architecture | Exercises
Quarterly results    → Highlights | Revenue | Operations | Next quarter
Concept talk         → The problem | The idea | In practice | Takeaways
```

**Conditional sections — include ONLY if the deck has matching content:**

| Deck contains | Page gets |
|---|---|
| Quiz/question slides | Interactive quiz widget (Phase 7) |
| Hands-on, exercises, labs, repos | Resources/labs section with verified links (Phase 8) |
| External references, further reading | Links grid |
| Heavy data/metrics | Stat cards and comparison tables |

No quiz slides → no quiz. No exercises → no labs section. Never pad the page with
sections the presentation doesn't support.

**Images to embed (pick 2–4 per page):**
- A memorable visual from the opening → hero area of the first tab
- The main diagram (architecture, pipeline, chart) → its relevant tab
- A humorous/striking visual that reinforces a concept → next to that concept
- Avoid: presenter photos, logo-only slides, text-heavy slides with no visual value

---

## Phase 5 — Extract and Embed Images

Use the `generate-image-base64` skill script. Always use `--render-slide` to capture the
full slide layout (text + graphics), not just embedded images.

```bash
# Render a full slide to base64 (0-indexed page number)
python3 ~/.claude/skills/generate-image-base64/scripts/extract_and_encode.py \
  "/path/to/deck.pdf" \
  --page 0 \
  --render-slide \
  --dpi 120 \
  --max-width 900 \
  --save-to /tmp/preview.jpg \
  > /tmp/slide_b64.txt 2>/tmp/err.txt

echo "Size: $(wc -c < /tmp/slide_b64.txt) bytes"
```

**Cropping to remove title bar / footer / unwanted region:**

When you only want part of a slide (e.g., just the right-side image, strip the title row),
use Pillow directly — the script doesn't support crop:

```python
from PIL import Image
import base64, io, subprocess

# 1. Render the slide to a temp file
subprocess.run([
    'python3',
    '/Users/USER/.claude/skills/generate-image-base64/scripts/extract_and_encode.py',
    '/path/to/deck.pdf',
    '--page', '5',         # 0-indexed
    '--render-slide',
    '--dpi', '150',
    '--max-width', '1200',
    '--save-to', '/tmp/raw_slide.jpg'
], check=True)

# 2. Crop
img = Image.open('/tmp/raw_slide.jpg')
w, h = img.size
# Example: right half of slide (strip text on left)
cropped = img.crop((w // 2, 0, w, h))
# Example: strip title (top 18%) and footer (bottom 17%)
# cropped = img.crop((0, int(h*0.18), w, int(h*0.83)))

cropped = cropped.resize((900, int(900 * cropped.height / cropped.width)), Image.LANCZOS)

buf = io.BytesIO()
cropped.save(buf, format='JPEG', quality=82)
b64 = base64.b64encode(buf.getvalue()).decode()
data_uri = f'data:image/jpeg;base64,{b64}'

with open('/tmp/cropped_b64.txt', 'w') as f:
    f.write(data_uri)
print(f'Done: {len(data_uri)} chars')
```

**Size targets:**
- Hero visual: 50–80KB base64 text → `--max-width 900 --quality 80`
- Diagram: 60–100KB → `--max-width 800 --quality 82`
- Full-slide image: 100–180KB is fine → `--max-width 900 --quality 80`

**Build the HTML via Python script** (never paste base64 into the Edit tool — too large):

```python
with open('/tmp/slide1_b64.txt') as f: b64_hero = f.read().strip()
with open('/tmp/slide2_b64.txt') as f: b64_diagram = f.read().strip()

HTML = r"""...page content with __HERO__ and __DIAGRAM__ placeholders..."""

HTML = HTML.replace('__HERO__', b64_hero)
HTML = HTML.replace('__DIAGRAM__', b64_diagram)

with open('{output-dir}/{topic-slug}/index.html', 'w') as f:
    f.write(HTML)
print(f'{len(HTML):,} chars')
```

Use `r"""..."""` (raw string) to avoid issues with backslashes in CSS. Never use `%s` or
`.format()` — the HTML contains `%` characters in CSS rules that will break those methods.
Use `.replace('__PLACEHOLDER__', value)` exclusively.

---

## Phase 6 — HTML Structure

### CSS Architecture

**Color scheme** — CSS custom properties populated with the palette extracted in Phase 3,
never hardcoded brand values:

```css
:root {
  --bg: /* deck background family */;
  --surface: /* slightly offset from --bg */;
  --surface2: /* second elevation step */;
  --border: rgba(ACCENT_RGB, 0.22);
  --accent: /* deck's primary highlight color */;
  --accent2: /* lighter variant of accent */;
  --accent3: /* secondary highlight (warm) */;
  --accent4: /* success/positive (used by quiz) */;
  --text: /* readable on --bg */;
  --muted: /* secondary text */;
  --nav-h: 64px;
}
html.light { /* or html.dark — overrides for the opposite theme toggle */ }
```

Default theme follows the deck (dark deck → dark default); a theme toggle covers the rest.

**Utility class prefix** — use a 2–3 letter prefix derived from the topic slug to avoid
collisions (e.g., `qr-*` for a quarterly-results page, `k8s-*` for a Kubernetes class).

**Essential utility classes** (define all of these):
```css
.{prefix}-mt8  { margin-top: 8px; }
.{prefix}-mt12 { margin-top: 12px; }
.{prefix}-mt16 { margin-top: 16px; }
.{prefix}-mt20 { margin-top: 20px; }
.{prefix}-mt24 { margin-top: 24px; }
.{prefix}-mt32 { margin-top: 32px; }
.{prefix}-mt40 { margin-top: 40px; }
.{prefix}-mb16 { margin-bottom: 16px; }
.{prefix}-mb24 { margin-bottom: 24px; }
.{prefix}-img-full { max-width: 100%; border-radius: 12px; display: block; margin: 0 auto; }
.{prefix}-mw700 { max-width: 700px; }
.{prefix}-mw900 { max-width: 900px; }
```

### Standard components

- **Navbar** — brand (deck logo crop or emoji) + page name + theme toggle. Add a CTA
  button only if the user asks for one (registration link, contact, etc.).
- **Tab navigation** — `.tabnav`, `.tab-btn`, `.tab-btn.active`
- **Panel hero** — radial gradient built from `--accent`, badge, heading matching the deck title
- **Cards** — `.card`, `.two-col`, `.grid-3`, definition/term grids, stat cards
- **Quiz widget** — only when Phase 7 applies
- **Links grid** — only when Phase 8 applies

### HTML Skeleton

```html
<!DOCTYPE html>
<html lang="{deck language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{Deck title — verbatim from slide 1}</title>
  <meta name="description" content="{one-line summary of the deck}">
  <link rel="icon" href="{deck logo data URI or emoji SVG data URI}">
  <style>/* all CSS here — no external stylesheets */</style>
</head>
<body>
  <nav class="navbar">...</nav>
  <div class="tabnav">
    <button type="button" class="tab-btn active" onclick="showTab('tab1',this)">{emoji} {Cluster 1}</button>
    <!-- more tabs -->
  </div>
  <div class="content">
    <div id="tab-tab1" class="tab-panel active">...</div>
    <!-- more panels -->
  </div>
  <script>/* theme toggle + showTab (+ quiz functions if used) */</script>
</body>
</html>
```

### Hard Rules — Validated by html-validate

| Rule | Correct | Wrong |
|------|---------|-------|
| No inline styles | `<div class="qr-mt20">` | `<div style="margin-top:20px">` |
| Button type required | `<button type="button">` | `<button>` |
| No duplicate class attrs | `class="grid-3 qr-mt16"` | `class="grid-3" class="qr-mt16"` |
| No % widths inline | use a CSS class | `style="width:31%"` |

Always validate after writing the file — zero errors required:

```bash
npx html-validate "{output-dir}/{topic-slug}/index.html"
# or, if the project defines its own script: npm run validate
```

---

## Phase 7 — Interactive Quiz (only if the deck has quiz slides)

Use a game-show-style widget for each question slide in the deck. Skip this phase
entirely if the presentation has no questions.

Each widget needs **unique element IDs** (q1-timer, q1-ans, q2-timer, q2-ans…).

```html
<div class="quiz-show">
  <div class="qshow-top">
    <div class="qshow-logo">
      <span class="{prefix}-quiz-icon">{emoji}</span>
      <span class="qshow-logo-text">{Quiz name from the deck, or "Quiz"}</span>
    </div>
    <span class="qshow-edition">{TOPIC}</span>
    <div class="qshow-countdown" id="q1-timer">30</div>
  </div>
  <div class="qshow-body">
    <div class="qshow-main">
      <div class="qshow-prize-label">{Round label}</div>
      <div class="qshow-question">{Question text here?}</div>
      <div class="qshow-options" id="q1-opts">
        <!-- isCorrect=false for wrong answers, true for correct -->
        <div class="qshow-opt" onclick="selectShow(this,false)"><span class="qshow-opt-letter">A</span>Wrong option</div>
        <div class="qshow-opt" onclick="selectShow(this,true)"><span class="qshow-opt-letter">B</span>Correct option</div>
        <div class="qshow-opt" onclick="selectShow(this,false)"><span class="qshow-opt-letter">C</span>Wrong option</div>
        <div class="qshow-opt" onclick="selectShow(this,false)"><span class="qshow-opt-letter">D</span>Wrong option</div>
      </div>
    </div>
    <div class="qshow-ladder">
      <div class="qshow-rung safe">🏆 {Top level}</div>
      <div class="qshow-rung">{Level 4}</div>
      <div class="qshow-rung active">{Current level}</div>
      <div class="qshow-rung">{Level 2}</div>
      <div class="qshow-rung safe">{Base level}</div>
    </div>
  </div>
  <div class="qshow-footer">
    <button type="button" class="qshow-reveal-btn"
      onclick="document.getElementById('q1-ans').classList.add('shown')">{Reveal label} →</button>
  </div>
  <div class="qshow-answer" id="q1-ans">
    ✅ <strong>B — {Correct answer}</strong> {Explanation in the deck's language.}
  </div>
</div>
```

**JavaScript for multiple timers** — add at end of `<script>` block:

```javascript
function startQuizTimer(id) {
  var t = 30;
  var el = document.getElementById(id);
  if (!el) return;
  var iv = setInterval(function() {
    t--;
    if (t <= 0) { el.textContent = '⏰'; clearInterval(iv); return; }
    el.textContent = t;
    if (t <= 10) el.style.color = '#f87171';
  }, 1000);
}
['q1-timer','q2-timer'].forEach(startQuizTimer);
```

---

## Phase 8 — Resources / Labs Section (only if the deck references hands-on material)

If the presentation points to exercises, labs, repositories, or external materials,
build a resources section. **Always verify every link before writing it** — never
invent repo names, lab titles, or URLs.

```bash
# For GitHub-hosted material: list what actually exists
gh api repos/{org}/{repo}/contents/{path} --jq '.[].name'

# Read a README to get the accurate title and description
gh api repos/{org}/{repo}/contents/{path}/README.md --jq '.content' | base64 -d | head -20

# For any other URL: fetch it and confirm it resolves before embedding
```

**Resource card pattern:**
```html
<div class="lab-card">
  <div class="lab-header">
    <div class="lab-num">{#}</div>
    <div class="lab-info">
      <div class="lab-title">{Exact title from the source}</div>
      <div class="lab-subtitle">{One-line subtitle}</div>
    </div>
    <div class="lab-badge">{Level/type}</div>
  </div>
  <div class="lab-body">
    <div class="lab-desc">{Description from the verified source}</div>
    <div class="lab-tags">
      <span class="lab-tag">{Tag}</span>
      <span class="lab-tag">~{duration}</span>
    </div>
    <a href="{verified URL}" class="lab-link" target="_blank" rel="noopener">📁 {Link label} →</a>
  </div>
</div>
```

---

## Phase 9 — Validate and Commit

```bash
npx html-validate "{output-dir}/{topic-slug}/index.html"
```

Zero errors required. Then commit with a Conventional Commits message describing the page:

```
feat: add {deck title} webpage

- Create {output-dir}/{slug}/index.html with tabbed layout ({tab names})
- Embed {N} images from the deck via base64
- Palette extracted from the presentation ({accent hex})
- {Quiz: N interactive questions / Resources: verified links} (if applicable)
```

If the page belongs to a larger site with an index/listing, ask the user whether and
where to link it — never assume a site structure.

---

## Quick Reference — Checklist

```
[ ] PPTX? Convert to PDF first (soffice --headless)
[ ] Read all pages (batches of 10); capture deck title + language
[ ] Identify slides to skip (bio, company, agenda, contact-only, dividers)
[ ] Extract palette from the deck (bg, accent, text) — page matches the deck's look
[ ] Plan 3-5 tabs from the deck's own topic clusters
[ ] Conditional sections: quiz ONLY if deck has questions, labs ONLY if deck has exercises
[ ] Render 2-4 images via extract_and_encode.py --render-slide (crop with Pillow if needed)
[ ] Write HTML via Python script with __PLACEHOLDER__ replacements
[ ] Page <title> and hero heading match the deck title verbatim
[ ] lang attribute matches the deck language
[ ] Unique IDs for all quiz timers and answer elements (if quiz used)
[ ] All buttons have type="button"
[ ] No inline style="" attributes (use utility CSS classes)
[ ] No duplicate class="" attributes on same element
[ ] Verify every external link before writing it
[ ] npx html-validate → zero errors
[ ] Commit with conventional message
[ ] Ask user about linking from an existing index (never assume)
```
