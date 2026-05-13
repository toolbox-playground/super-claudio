# Webpage from Slides — Full Workflow

Convert a PDF or PPTX slide deck into a standalone, self-contained HTML page with embedded
images, interactive tabs, and no external file dependencies (except Google Fonts CDN).

Production examples built with this workflow:
- `auloes/devsecops/index.html`
- `auloes/cloud-computing/index.html`

---

## Phase 0 — Prerequisites

Before starting, ensure these tools are available:

```bash
# Python libs for image extraction
pip3 install pymupdf Pillow --break-system-packages

# html-validate (project must have it in devDependencies)
npm run validate

# gh CLI — for verifying real lab/resource links before writing them
gh api repos/ORG/REPO/contents/PATH --jq '.[].name'
```

The `generate-image-base64` skill must be installed at:
`~/.claude/skills/generate-image-base64/scripts/extract_and_encode.py`

---

## Phase 1 — Read the entire PDF

Read in batches of 10 pages. The Read tool renders each slide as an image automatically.

```
Read PDF: pages 1-10, then 11-20, then 21-30 (until end)
```

For each batch, note:
- Slide number (1-based)
- Content type: content slide | quiz slide | section divider | presenter/company slide

---

## Phase 2 — Content Audit (what to SKIP)

**Always skip these slide types — never render their content in the page:**

| Slide type | Examples | Reason |
|---|---|---|
| Presenter bio | "About me", "Sobre o instrutor" | Bloats page, rarely useful to students |
| Company pitch | "Sobre a empresa", "About us", "Toolbox" logo slides | Not educational content |
| Agenda / "O que veremos" | Bullet list of topics | Redundant — the tabs ARE the agenda |
| Contact-only | Final slide with phone/Instagram/logo only | Use a Links section instead |
| Section dividers | "Parte 2", "Mão na massa", empty slides | Just visual separators |

**Always include:**
- Definition/concept slides
- Show do Milhão / quiz slides → interactive widget
- Diagram/visual slides → embed image
- How-it-works / comparison slides
- Lab description slides
- Tips and best practices slides
- "Futuro" / trends slides → content for a tab

---

## Phase 3 — Plan Tabs and Images

**Tab count:** 3–5 tabs is ideal. One tab per major topic cluster.

**Standard tab pattern for educational content:**
```
Tab 1: 🏠 Intro + Core Concept   (definition, why it matters, first quiz)
Tab 2: 🔧 Main Topic             (deep dive, comparisons, second quiz)
Tab 3: 🏗️ Architecture / Advanced (patterns, best practices, meme/diagram)
Tab 4: 🔬 Labs                   (hands-on exercises with real GitHub links)
```

**Images to embed (pick 2–4 per page):**
- Meme or memorable visual from the opening → goes in intro tab hero area
- Main diagram (IaaS/PaaS/SaaS stack, pipeline, architecture) → relevant tab
- Humorous/viral meme that reinforces a concept → before or after the concept card
- Avoid: presenter photos, logo slides, text-heavy slides that add no visual value

---

## Phase 4 — Extract and Embed Images

Use the `generate-image-base64` skill script. Always use `--render-slide` to capture the full
slide layout (text + graphics), not just embedded images.

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
import base64, io, subprocess, sys

# 1. Render the slide to a temp file
subprocess.run([
    'python3',
    '/Users/caioroscelly/.claude/skills/generate-image-base64/scripts/extract_and_encode.py',
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
# Example: right half of slide (strip presenter text on left)
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
- Intro meme: 50–80KB base64 text → `--max-width 900 --quality 80`
- Diagram: 60–100KB → `--max-width 800 --quality 82`
- Full-page meme: 100–180KB is fine → `--max-width 900 --quality 80`

**Build the HTML via Python script** (never paste base64 into Edit tool — too large):

```python
with open('/tmp/slide1_b64.txt') as f: b64_intro = f.read().strip()
with open('/tmp/slide2_b64.txt') as f: b64_diagram = f.read().strip()

HTML = r"""...page content with __INTRO__ and __DIAGRAM__ placeholders..."""

HTML = HTML.replace('__INTRO__', b64_intro)
HTML = HTML.replace('__DIAGRAM__', b64_diagram)

with open('auloes/my-topic/index.html', 'w') as f:
    f.write(HTML)
print(f'{len(HTML):,} chars')
```

Use `r"""..."""` (raw string) to avoid issues with backslashes in CSS. Never use `%s` or
`.format()` — the HTML contains `%` characters in CSS rules that will break those methods.
Use `.replace('__PLACEHOLDER__', value)` exclusively.

---

## Phase 5 — HTML Structure

### Directory
```
auloes/{topic-slug}/index.html   ← single self-contained file
```

### CSS Architecture

**Color scheme** — define as CSS custom properties, not inline values.
Use a `--accent` variable for the topic's primary color:
- Cloud Security / DevSecOps → `#dc2626` (red)
- Cloud Computing → `#2563eb` (blue)
- Kubernetes → `#326CE5` (k8s blue)
- Infra as Code → `#8B5CF6` (purple)
- General DevOps → `#0ea5e9` (sky blue)

```css
:root {
  --bg: #070b14;
  --surface: #0d1526;
  --surface2: #111f38;
  --border: rgba(VAR_ACCENT_RGB, 0.22);
  --accent: #2563eb;       /* topic color */
  --accent2: #60a5fa;      /* lighter variant */
  --accent3: #fbbf24;      /* warm yellow highlight */
  --accent4: #34d399;      /* green for success/correct */
  --text: #e2e8f0;
  --muted: #8892a4;
  --nav-h: 64px;
}
html.light {
  /* light mode overrides — keep bg/surface light, accent stays same */
}
```

**Utility class prefix** — use a 2–3 letter prefix unique to the topic to avoid collisions:
- `dso-*` for DevSecOps, `cc-*` for Cloud Computing, `k8s-*` for Kubernetes, etc.

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
.{prefix}-quiz-icon { font-size: 1.3rem; }
```

### Shared Component CSS (copy verbatim, only change accent color)

These components appear in every page — copy the CSS block from a reference page and
only swap the accent color values:

- **Navbar** — `.navbar`, `.navbar-inner`, `.navbar-brand`, `.navbar-name`, `.btn-whatsapp`, `#theme-toggle`
- **Tab navigation** — `.tabnav`, `.tab-btn`, `.tab-btn.active`
- **Panel hero** — `.panel-hero`, `.panel-hero::before`, `.hero-badge`, radial gradient with accent color
- **Cards** — `.card`, `.two-col`, `.grid-3`, `.benefit-card`, `.term-grid`, `.term-card`
- **Lab cards** — `.lab-list`, `.lab-card`, `.lab-header`, `.lab-num`, `.lab-body`, `.lab-tags`, `.lab-link`
- **Links grid** — `.links-grid`, `.link-card`
- **Show do Milhão quiz** — `.quiz-show`, `.qshow-*` classes (full set — never split this component)

### HTML Skeleton

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aulão de {Topic} — ToolBoX</title>
  <meta name="description" content="...">
  <link rel="icon" href="https://tbxtech.com.br/wp-content/uploads/2024/02/toolbox-300x200-white.png" type="image/png">
  <style>/* all CSS here — no external stylesheets */</style>
</head>
<body>
  <nav class="navbar">...</nav>
  <div class="tabnav">
    <button type="button" class="tab-btn active" onclick="showTab('intro',this)">🏠 Intro</button>
    <!-- more tabs -->
  </div>
  <div class="content">
    <div id="tab-intro" class="tab-panel active">...</div>
    <!-- more panels -->
  </div>
  <script>/* theme toggle + showTab + selectShow + startQuizTimer */</script>
</body>
</html>
```

### Hard Rules — Validated by html-validate

| Rule | Correct | Wrong |
|------|---------|-------|
| No inline styles | `<div class="cc-mt20">` | `<div style="margin-top:20px">` |
| Button type required | `<button type="button">` | `<button>` |
| No duplicate class attrs | `class="grid-3 cc-mt16"` | `class="grid-3" class="cc-mt16"` |
| No % in CSS property values via inline | use CSS class | `style="width:31%"` |

Always run `npm run validate` after writing the file. Zero errors required before commit.

---

## Phase 6 — Show do Milhão Quiz Pattern

Use for any quiz/question slide in the PDF. Create one widget per question.
Each widget needs **unique element IDs** (q1-timer, q1-ans, q2-timer, q2-ans…).

```html
<div class="quiz-show">
  <div class="qshow-top">
    <div class="qshow-logo">
      <span class="{prefix}-quiz-icon">☁️</span>
      <span class="qshow-logo-text">Show do Milhão</span>
    </div>
    <span class="qshow-edition">EDIÇÃO · {TOPIC}</span>
    <div class="qshow-countdown" id="q1-timer">30</div>
  </div>
  <div class="qshow-body">
    <div class="qshow-main">
      <div class="qshow-prize-label">Pergunta da Rodada</div>
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
      <div class="qshow-rung safe">🏆 Expert</div>
      <div class="qshow-rung">{Topic} Pro</div>
      <div class="qshow-rung active">{Current level}</div>
      <div class="qshow-rung">{Topic}+Ops</div>
      <div class="qshow-rung safe">☁️ Básico</div>
    </div>
  </div>
  <div class="qshow-footer">
    <button type="button" class="qshow-reveal-btn"
      onclick="document.getElementById('q1-ans').classList.add('shown')">Ver resposta →</button>
  </div>
  <div class="qshow-answer" id="q1-ans">
    ✅ <strong>B — {Correct answer}</strong> é a resposta correta! {Explanation.}
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
['q1-timer','q2-timer','q3-timer','q4-timer'].forEach(startQuizTimer);
```

---

## Phase 7 — Labs Section

**Always verify lab content via `gh api` before writing the section.** Never invent lab names.

```bash
# List available labs
gh api repos/ORG/REPO/contents/PATH --jq '.[].name'

# Read a lab README to get accurate title and description
gh api repos/ORG/REPO/contents/PATH/lab-001/README.md --jq '.content' | base64 -d | head -20
```

**Lab card pattern:**
```html
<div class="lab-card">
  <div class="lab-header">
    <div class="lab-num">Lab 001</div>
    <div class="lab-info">
      <div class="lab-title">{Exact title from README}</div>
      <div class="lab-subtitle">{One-line subtitle}</div>
    </div>
    <div class="lab-badge">Iniciante</div>
  </div>
  <div class="lab-body">
    <div class="lab-desc">{Description from README objective}</div>
    <div class="lab-tags">
      <span class="lab-tag">Tag1</span>
      <span class="lab-tag">~30 min</span>
    </div>
    <a href="https://github.com/ORG/REPO/tree/main/PATH/lab-001" class="lab-link"
       target="_blank" rel="noopener">📁 Ver lab-001 no GitHub →</a>
  </div>
</div>
```

---

## Phase 8 — Commit

Use Conventional Commits. Pattern used in this project:

```
feat(auloes): adiciona página de {Topic} e links Ver Material

- Cria auloes/{slug}/index.html com layout de abas ({Tab1}, {Tab2}, {Tab3}, {Tab4})
- Embute imagens do PDF via base64 ({description of each image})
- {N} perguntas do Show do Milhão interativas com timer
- Labs reais: {lab list}
- Adiciona botão "Ver Material" no card de {Topic} em auloes/index.html

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

---

## Phase 9 — Update Main Index (auloes/index.html)

After creating the page, add a "Ver Material" button to the topic's card in `auloes/index.html`.

**Find the right card** by searching for the aulão title, then add inside `.aulao-links`:

```html
<a class="material-link"
   href="https://auloes.tbxtech.com.br/auloes/{slug}"
   target="_blank" rel="noopener noreferrer">Ver Material</a>
```

The `.material-link` CSS class is already defined in `auloes/index.html`:
```css
.material-link {
  display: inline-block; margin-left: 8px; padding: 6px 10px;
  border-radius: 8px; font-size: .8rem; font-weight: 700;
  color: #16a34a; background: transparent;
  border: 1px solid rgba(22,163,74,.25); text-decoration: none;
}
.material-link:hover { background: rgba(22,163,74,.07); }
```

---

## Quick Reference — Checklist

```
[ ] Read all PDF pages (batches of 10)
[ ] Identify slides to skip (bio, company, agenda, contact-only, dividers)
[ ] Plan 3-5 tabs and 2-4 images to embed
[ ] Render images via extract_and_encode.py --render-slide
[ ] Crop images if needed (Pillow crop script)
[ ] Write HTML as Python script with __PLACEHOLDER__ replacements
[ ] Unique IDs for all quiz timers and answer elements
[ ] All buttons have type="button"
[ ] No inline style="" attributes (use utility CSS classes)
[ ] No duplicate class="" attributes on same element
[ ] Verify lab links via gh api before writing them
[ ] npm run validate → zero errors
[ ] Commit with feat(auloes): conventional message
[ ] Add Ver Material button in auloes/index.html
[ ] Push
```
