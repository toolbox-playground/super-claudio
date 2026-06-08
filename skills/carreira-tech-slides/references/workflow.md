# Carreira Tech Slides — Full Workflow

Convert a DevOps Mentoria PPTX into a Carreira Tech beginner PPTX using pptxgenjs,
preserving original images at correct aspect ratios and adapting all content for
absolute beginners.

Production example: `Aula01_Python_CarreiraTech_v2.pptx` (~5MB, 31 slides, 17 images)

---

## Phase 0 — Prerequisites

```bash
# Python for image extraction and dimension analysis
pip3 install python-pptx Pillow --break-system-packages

# Node.js for PPTX generation
mkdir -p /tmp/aula_build && cd /tmp/aula_build
npm init -y
npm install pptxgenjs
```

---

## Phase 1 — Read the Source PPTX

```python
from pptx import Presentation

prs = Presentation("/path/to/mentoria.pptx")
print(f"Slides: {len(prs.slides)}  Size: {prs.slide_width.inches:.2f}\" x {prs.slide_height.inches:.2f}\"")

for i, slide in enumerate(prs.slides):
    print(f"\n--- Slide {i+1} ---")
    for shape in slide.shapes:
        if shape.has_text_frame:
            for para in shape.text_frame.paragraphs:
                text = para.text.strip()
                if text:
                    print(f"  TEXT: {text[:100]}")
        if shape.shape_type == 13:  # Picture
            print(f"  IMAGE: {shape.name} ({shape.width.inches:.2f}\" x {shape.height.inches:.2f}\")")
```

Note for each slide:
- Core concept being taught
- Images present (name, original dimensions in the slide)
- Content level: basic concept | code example | real-world application | quiz/challenge

---

## Phase 2 — Extract Images from Source PPTX

```python
from pptx import Presentation
import os

def extract_images(pptx_path, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    prs = Presentation(pptx_path)
    for slide_num, slide in enumerate(prs.slides, 1):
        for shape in slide.shapes:
            if shape.shape_type == 13:  # Picture
                try:
                    img = shape.image
                    filename = f"slide{slide_num:02d}_{shape.name.replace(' ', '_').replace(';', '_')}.{img.ext}"
                    with open(os.path.join(output_dir, filename), 'wb') as f:
                        f.write(img.blob)
                    print(f"  Extracted: {filename} ({len(img.blob)//1024}KB)")
                except Exception as e:
                    print(f"  Error slide {slide_num}: {e}")

extract_images("/path/to/mentoria.pptx", "/tmp/pptx_images/source")
```

---

## Phase 3 — CRITICAL: Analyze Aspect Ratios

**Never force an image into wrong dimensions.** Always calculate correct w/h from pixel dimensions.

```python
from PIL import Image
import os

imgs_dir = "/tmp/pptx_images/source"
for filename in sorted(os.listdir(imgs_dir)):
    if not filename.endswith(('.png', '.jpg', '.jpeg')):
        continue
    path = os.path.join(imgs_dir, filename)
    with Image.open(path) as img:
        w, h = img.size
        ratio = w / h
        # Fit to right-column space (max_w=5.5", max_h=5.8")
        max_w, max_h = 5.5, 5.8
        if ratio > 1:  # landscape
            fit_w = min(max_w, max_h * ratio)
            fit_h = fit_w / ratio
        else:          # portrait or square
            fit_h = min(max_h, max_w / ratio)
            fit_w = fit_h * ratio
        print(f"  {filename[:40]:40s}: {w}x{h}  ratio={ratio:.3f}  → w={fit_w:.2f}\", h={fit_h:.2f}\"")
```

### Aspect Ratio Rules

| Image type | Typical ratio | How to size it |
|---|---|---|
| Landscape (wide screenshots, logo grids) | > 1 | `w = max_w; h = w / ratio` |
| Portrait (stat charts, tall diagrams) | < 1 | `h = max_h; w = h * ratio` |
| Square (logos, icons) | ≈ 1 | `w = h = desired_size` |
| Very wide (PyPI banner, status bar) | > 3 | `w = available_width; h = w / ratio` |

**Right-align portrait images** against the slide's right edge:
```javascript
const imgX = 13.3 - 0.25 - imgW;  // 0.25" right margin
```

**Verify your math before putting in build.js:**
- `ratio = pixel_w / pixel_h`
- For landscape: `fit_h = fit_w / ratio` → must equal `fit_w / ratio`
- For portrait: `fit_w = fit_h * ratio` → must equal `fit_h * ratio`
- Do NOT eyeball it — a 10% error makes text inside images visibly skewed

---

## Phase 4 — Plan the Deck Structure

### Standard Structure (≈ 30–35 slides)

| # | Type | Pattern |
|---|------|---------|
| 1 | Cover | Navy, topic logo top-right, 3 value tags |
| 2 | Combinados | 3 ground-rules callout boxes |
| 3 | Agenda | 4-column topic grid |
| 4, 12, 17, 23 | Section dividers | `sectionSlide()` navy with watermark number |
| 5–11 | Core concepts | `head()` + content + right-column image |
| 13–16 | Code basics | `head()` + codeBox + calloutBox |
| 18–22 | Logic/loops | `head()` + codeBox + flow diagrams |
| 24–27 | Advanced tools | `head()` + codeBox + image (PyPI, etc.) |
| 28 | Challenge | DARK background, GitHub link |
| 29 | Resources | 4-card learning links grid |
| 30 | Recap | 6-card summary |
| 31 | Closing | Navy, 3 contact cards |

### Image Placement Decision Tree

```
Does the original slide have an image?
  ├─ YES → Is it DevOps-specific (CI/CD, Docker, pipelines)?
  │         ├─ YES → Skip it (confuses beginners)
  │         └─ NO  → Extract and reuse with correct aspect ratio
  └─ NO  → Is there a widely-recognized visual that helps? (rankings, logos, screenshots)
            ├─ YES → Check if it exists in the source; if not, note it for future
            └─ NO  → Slide is text-only (that's fine, use callout boxes)
```

---

## Phase 5 — Content Adaptation Rules

### The "Translator" Mental Model

| DevOps Mentoria says... | Carreira Tech says... |
|---|---|
| "Python para automação DevOps e scripting" | "Python serve para automatizar tarefas chatas do dia a dia" |
| "Linguagens interpretadas x compiladas" | "Como o computador 'lê' o código — tem um modo mais rápido e um mais flexível" |
| `pip install` para gerenciar dependências | "pip é como uma App Store para código Python — um comando e pronto" |
| Technical feature list | **Analogy first**, then feature |
| Code examples with DevOps context | Code examples with everyday context (grades, ages, shopping lists) |
| "Como vocês já sabem..." | Never assumed — always explain from scratch |

### Required Elements per Concept Slide

1. **Concept sentence** (1 line max): "É um conjunto de regras para dar instruções ao computador"
2. **Everyday analogy** callout box: `calloutBox(... "🍰", "Pense numa receita de bolo", ...)`
3. **Code example** (if applicable): `codeBox()` with the simplest possible real example
4. **"Por que isso importa?"** callout: connects concept to the student's career goal
5. **Original image** from source PPTX if it adds visual context without jargon

### Mandatory Language Tone Rules

- Use "você" — always informal
- Never say "como vocês já sabem" or assume any prior knowledge
- Say "Não precisa decorar isso agora" when introducing anything complex
- Use "Vamos com calma" on difficult slides
- End heavy slides with an encouraging note
- Code variable names use everyday context: `nome`, `idade`, `nota`, `frutas` — never `foo`, `bar`, `x`

---

## Phase 6 — TBXTech Visual Identity (copy verbatim)

```javascript
// Colors
const NAVY   = "0D1B2A";  // backgrounds, section slides, cover
const BLUE   = "1565C0";  // primary accent (info, general)
const BLUE2  = "1976D2";  // secondary blue (kickers, highlights)
const TEAL   = "00897B";  // success, positive, definitions
const PURPLE = "6A1B9A";  // advanced topics, special sections
const ORANGE = "E65100";  // warnings, analogies, highlights
const GREEN  = "2E7D32";  // correct, good practices
const CODEBG = "1E2733";  // code box background
const LIGHT  = "F5F7FA";  // content slide background
const WHITE  = "FFFFFF";
const DARK   = "1A1A2E";  // challenge/closing slides

// Fonts (use exactly these names in pptxgenjs)
// Titles:  fontFace: "Trebuchet MS"  bold: true
// Body:    fontFace: "Calibri"
// Code:    fontFace: "Consolas"

// Layout
// pres.layout = "LAYOUT_WIDE"  →  13.3" × 7.5"
```

---

## Phase 7 — pptxgenjs Helpers (copy into every build.js)

```javascript
const pptx = require("pptxgenjs");
const path = require("path");
const pres = new pptx();
pres.layout = "LAYOUT_WIDE";

// [paste color constants from Phase 6 here]

// footer — call on every content slide
function footer(slide, num) {
  slide.addText("tbxtech.com.br", {
    x: 0.3, y: 7.1, w: 3.5, h: 0.28,
    fontSize: 8, color: "888888", fontFace: "Calibri",
  });
  slide.addText("Aula 0X · Título da Aula", {  // ← update per lesson
    x: 4.0, y: 7.1, w: 5.0, h: 0.28,
    fontSize: 8, color: "888888", fontFace: "Calibri", align: "center",
  });
  if (num) slide.addText(String(num), {
    x: 12.4, y: 7.1, w: 0.6, h: 0.28,
    fontSize: 8, color: "888888", fontFace: "Calibri", align: "right",
  });
}

// sectionSlide — navy divider with watermark number
function sectionSlide(num, kicker, title, subtitle) {
  const slide = pres.addSlide();
  slide.background = { color: NAVY };
  slide.addText(String(num).padStart(2, "0"), {
    x: 7.5, y: -0.2, w: 6, h: 5,
    fontSize: 200, color: "FFFFFF", bold: true, fontFace: "Trebuchet MS",
    transparency: 90,
  });
  slide.addText(kicker.toUpperCase(), {
    x: 0.6, y: 2.8, w: 8, h: 0.4,
    fontSize: 11, color: BLUE2, bold: true, fontFace: "Trebuchet MS", charSpacing: 3,
  });
  slide.addText(title, {
    x: 0.6, y: 3.2, w: 9, h: 1.2,
    fontSize: 40, color: WHITE, bold: true, fontFace: "Trebuchet MS",
  });
  if (subtitle) slide.addText(subtitle, {
    x: 0.6, y: 4.4, w: 9, h: 0.5,
    fontSize: 14, color: "B0BEC5", fontFace: "Calibri", italic: true,
  });
  return slide;
}

// head — light background + color top bar + slide title
function head(slide, title, accent) {
  slide.background = { color: LIGHT };
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: 13.3, h: 0.06, fill: { color: accent || TEAL },
  });
  slide.addText(title, {
    x: 0.35, y: 0.12, w: 12.6, h: 0.65,
    fontSize: 22, bold: true, color: NAVY, fontFace: "Trebuchet MS",
  });
}

// codeBox — dark syntax-highlighted code block
// lines = [{text: "...", color?: "hex", size?: 11}]
// Suggested colors: "E65100" keywords, "68D391" strings, "718096" comments, "9EC8FF" values
function codeBox(slide, x, y, w, h, lines) {
  slide.addShape(pres.ShapeType.rect, {
    x, y, w, h, fill: { color: CODEBG }, line: { color: "2D3748", width: 1 },
  });
  const codeText = lines.map(line => ({
    text: line.text,
    options: { color: line.color || "E2E8F0", fontFace: "Consolas", fontSize: line.size || 11, breakLine: true },
  }));
  slide.addText(codeText, {
    x: x + 0.15, y: y + 0.1, w: w - 0.3, h: h - 0.2,
    fontFace: "Consolas", fontSize: 11,
  });
}

// calloutBox — colored left-bar callout
// bg = light fill color, accent = bar + title color
function calloutBox(slide, x, y, w, h, icon, title, body, bg, accent) {
  slide.addShape(pres.ShapeType.rect, {
    x, y, w, h, fill: { color: bg || "E3F2FD" }, line: { color: accent || BLUE, width: 0 },
  });
  slide.addShape(pres.ShapeType.rect, {
    x, y, w: 0.06, h, fill: { color: accent || BLUE },
  });
  if (icon) slide.addText(icon, { x: x + 0.15, y: y + 0.08, w: 0.5, h: 0.4, fontSize: 18 });
  slide.addText(title, {
    x: x + 0.65, y: y + 0.08, w: w - 0.8, h: 0.35,
    fontSize: 11, bold: true, color: NAVY, fontFace: "Trebuchet MS",
  });
  slide.addText(body, {
    x: x + 0.65, y: y + 0.42, w: w - 0.8, h: h - 0.55,
    fontSize: 10, color: "333333", fontFace: "Calibri",
  });
}
```

---

## Phase 8 — Image Placement Patterns

### Right-Column Layout (most common)

```javascript
// LANDSCAPE image (ratio > 1)  —  fix width, compute height
const imgW = 5.5, imgH = imgW / RATIO;   // e.g. RATIO=1.6 → h=3.44
slide.addImage({ path: IMG.myImage, x: 7.6, y: 1.0, w: imgW, h: imgH });
slide.addText("Source caption", { x: 7.6, y: 1.0 + imgH + 0.08, w: imgW, h: 0.22,
  fontSize: 7, color: "888888", fontFace: "Calibri", align: "center" });

// PORTRAIT image (ratio < 1)  —  fix height, compute width, right-align
const imgH2 = 5.8, imgW2 = imgH2 * RATIO;  // e.g. RATIO=0.724 → w=4.2
const imgX2 = 13.3 - 0.25 - imgW2;          // right-aligned with 0.25" margin
slide.addImage({ path: IMG.myImage, x: imgX2, y: 0.85, w: imgW2, h: imgH2 });

// SQUARE image (ratio ≈ 1)  —  equal sides
const sz = 5.5;
slide.addImage({ path: IMG.myImage, x: 7.45, y: 0.85, w: sz, h: sz });
```

### Company Logo Grid (multiple small logos)

```javascript
// Each logo gets its own w/h based on pixel aspect ratio
const logos = [
  { path: IMG.google,    label: "Google",    w: 1.4, h: 1.4  },  // 1:1
  { path: IMG.nasa,      label: "NASA",      w: 1.4, h: 1.2  },  // 563x482 → 1.168:1
  { path: IMG.netflix,   label: "Netflix",   w: 1.4, h: 1.4  },  // 1:1
  // ... all logos with their correct h
];

const cols = 4, startX = 0.6, startY = 1.4, gapX = 2.8, gapY = 2.4;
logos.forEach((logo, i) => {
  const x = startX + (i % cols) * gapX;
  const y = startY + Math.floor(i / cols) * gapY;
  const offsetY = (1.4 - logo.h) / 2;  // center non-square logos in the cell

  slide.addShape(pres.ShapeType.rect, {
    x: x - 0.2, y: y - 0.15, w: logo.w + 0.4, h: 1.4 + 0.55,
    fill: { color: WHITE }, line: { color: "DDDDDD", width: 1 },
  });
  slide.addImage({ path: logo.path, x, y: y + offsetY, w: logo.w, h: logo.h });
  slide.addText(logo.label, {
    x: x - 0.2, y: y + 1.4, w: logo.w + 0.4, h: 0.3,
    fontSize: 10, bold: true, color: NAVY, align: "center", fontFace: "Trebuchet MS",
  });
});
```

---

## Phase 9 — Build, Verify, Deliver

```bash
cd /tmp/aula_build
node build.js
# Expected output: ✅ PPTX gerado: /Users/caioroscelly/Downloads/AulaXX_...pptx

# Quick verification
python3 -c "
from pptx import Presentation
prs = Presentation('/Users/caioroscelly/Downloads/AulaXX_CarreiraTech_v1.pptx')
print(f'Slides: {len(prs.slides)}')
for i, slide in enumerate(prs.slides):
    imgs = [s for s in slide.shapes if s.shape_type == 13]
    title = next((p.text.strip()[:60] for t in slide.shapes if t.has_text_frame
                  for p in t.text_frame.paragraphs if p.text.strip() and len(p.text.strip()) > 3), '')
    img_tag = f'  [{len(imgs)} imgs]' if imgs else ''
    print(f'  {i+1:02d}. {title}{img_tag}')
"
```

---

## Phase 10 — QA Checklist

```
[ ] Every content slide calls head() + footer()
[ ] Every section slide uses sectionSlide()
[ ] All images: pixel dimensions checked → w/h computed from ratio
[ ] No image forced into wrong dimensions (no stretching, no squashing)
[ ] Portrait images are right-aligned (x = 13.3 - margin - w)
[ ] Company logo grid: each logo has its own h from pixel ratio
[ ] Code boxes use CODEBG = "1E2733" background
[ ] Each concept slide has at least one analogy callout box
[ ] No DevOps jargon without plain-language explanation
[ ] Code variable names use everyday context (nome, idade, nota — not x, foo, bar)
[ ] Cover slide includes topic logo/image
[ ] Closing slide has 3 contact cards (phone, Instagram, website)
[ ] Challenge slide uses DARK background
[ ] File name pattern: AulaXX_Titulo_CarreiraTech_vN.pptx in Downloads
```

---

## Callout Box Color Palette Reference

| When to use | bg color | accent color |
|---|---|---|
| Definition / "O que é" | `E0F7FA` | `TEAL` = `00897B` |
| Analogy / "No dia a dia" | `FFF8E1` | `ORANGE` = `E65100` |
| "💡 Por que isso importa?" | `FFF3E0` | `ORANGE` = `E65100` |
| Warning / "Cuidado" | `FFEBEE` | `C62828` |
| Good practice / "✅ Faça isso" | `F1F8E9` | `GREEN` = `2E7D32` |
| Advanced / "Indo além" | `F3E5F5` | `PURPLE` = `6A1B9A` |
| General info / tip | `E3F2FD` | `BLUE` = `1565C0` |

---

## Course Context

**Company:** TBXTech · tbxtech.com.br · 19 98199-0082 · @toolboxtechnology

**Course:** Carreira Tech — Do Zero ao Primeiro Emprego em Tecnologia
- Target: Absolute beginners + career changers (zero prior tech knowledge)
- Duration: 3–6 months · 10h/week
- Tracks: Dev | Cloud/DevOps | Dados & Analytics

**Source PPTX files:** DevOps Mentoria slides (audience: interns/juniors already in tech)
- Original files: `/Users/caioroscelly/Downloads/Aula XX - *.pptx`
- Produced by: TBXTech / caioroscelly

**Output:** `/Users/caioroscelly/Downloads/AulaXX_Titulo_CarreiraTech_vN.pptx`
