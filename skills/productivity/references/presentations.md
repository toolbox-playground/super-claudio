# Presentations & Slides

## Best Tools

### AI-Generated Slides
**Gamma.app** (top pick)
- URL: gamma.app
- AI generates full decks from a prompt or outline
- Beautiful templates, one-click themes
- Free tier: 400 AI credits
- Export: PDF, PowerPoint, share as link
- Prompt: "Create a 10-slide pitch deck for [product], audience: [investors/clients/team]"

**Beautiful.ai**
- URL: beautiful.ai
- Smart slide layouts that auto-adjust
- Good for business presentations
- Paid ($12/month)

**Tome.app**
- URL: tome.app
- AI storytelling format (scroll/narrative style)
- Great for product demos, company intros

### Code → Slides
**Marp** (Markdown → slides, free)
```bash
npm install -g @marp-team/marp-cli
marp slides.md --pdf
marp slides.md --html
```

Marp syntax:
```markdown
---
marp: true
theme: default
---

# Slide 1 Title
Content here

---

# Slide 2
- Bullet 1
- Bullet 2
```

**reveal.js** (HTML presentations)
- GitHub: hakimel/reveal.js
- Highly customizable, developer-friendly

### Google Slides Automation
```python
# Use Google Slides API to create slides programmatically
pip install google-api-python-client google-auth
```

## Recommended Workflow for Pitch Decks

### Structure (10 slides)
1. Problem — what pain point exists
2. Solution — your product/service
3. Market size — TAM, SAM, SOM
4. Product — screenshots or demo
5. Traction — metrics, users, revenue
6. Business model — how you make money
7. Competition — and your differentiation
8. Team — key people and credentials
9. Roadmap — next 12 months
10. Ask — what you need (funding, partners)

### Claude prompt for deck outline:
```
Write a 10-slide pitch deck outline for [company/product].
Include: slide title, 3 bullet points per slide, speaker notes.
Target audience: [VCs / enterprise clients / internal team]
Key metric to highlight: [metric]
```
