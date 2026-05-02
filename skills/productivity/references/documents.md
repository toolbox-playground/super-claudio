# Documents & Reports

## Best Tools

### Markdown → PDF/Word
**Pandoc** (free, open-source)
- Convert Markdown to PDF, DOCX, HTML, LaTeX
- Install: `brew install pandoc` / `apt install pandoc`
- PDF output: `pandoc input.md -o output.pdf`
- DOCX: `pandoc input.md -o output.docx`
- With template: `pandoc input.md --reference-doc=template.docx -o output.docx`

**WeasyPrint** (Python, HTML → PDF)
```bash
pip install weasyprint
weasyprint input.html output.pdf
```

### AI-Powered Document Generation
**Claude directly** — for structured reports, Claude can produce:
- Markdown tables, headers, summaries
- Business reports with sections
- Technical documentation

Prompt pattern for structured reports:
```
Write a [type] report about [topic].
Structure: Executive Summary → Key Findings → Recommendations → Appendix
Format: Markdown with headers, bullet points, and tables where relevant
Audience: [stakeholder type]
Tone: [professional/casual/technical]
```

### Google Docs Automation
**Google Apps Script** — automate doc creation from data:
```javascript
function createReport(data) {
  const doc = DocumentApp.create('Report ' + new Date().toISOString());
  const body = doc.getBody();
  body.appendParagraph(data.title).setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph(data.content);
  return doc.getUrl();
}
```

**python-docx** — create DOCX from Python:
```python
pip install python-docx
from docx import Document
doc = Document()
doc.add_heading('Report Title', 0)
doc.add_paragraph('Content here')
doc.save('report.docx')
```

### Notion
- Templates: notion.so/templates
- API for automation: developers.notion.com
- Use Case: internal wikis, SOPs, knowledge base

## Recommended Workflow for Reports

1. Structure the outline first (ask Claude to draft it)
2. Write each section with Claude
3. Export to Markdown
4. Convert to final format with Pandoc or python-docx
5. Add visual elements (charts) from data-viz.md if needed
