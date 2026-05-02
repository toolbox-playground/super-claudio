# Prompt Engineering

## Core Principles

### 1. Be specific about output format
Bad: "Write something about dogs"
Good: "Write a 3-paragraph article about golden retrievers. Format: intro (hook), body (3 facts), conclusion (CTA). Tone: friendly, audience: first-time dog owners."

### 2. Give examples (few-shot)
```
Convert these product titles to SEO-friendly slugs:

"Blue Running Shoes" → "blue-running-shoes"
"Men's Winter Jacket (XL)" → "mens-winter-jacket-xl"
"Coffee Maker 12-Cup" → "coffee-maker-12-cup"

Now convert: "Women's Summer Dress - Red Floral"
```

### 3. Use role assignment
```
You are a senior Python developer with 10 years of experience.
Review this code and identify security vulnerabilities:
[code here]
```

### 4. Chain of thought
```
Think step by step before answering.
Q: A store has 15 apples. They sell 7, then receive a shipment of 20.
How many apples do they have?
```

## System Prompt Patterns

### Persona + Constraints
```
You are [ROLE] at [COMPANY].
Your job is to [GOAL].
Always [RULE 1].
Never [RULE 2].
Respond in [LANGUAGE/TONE].
```

### Output Structure Lock
```
Always respond in this exact format:
**Summary:** [1 sentence]
**Details:** [2-3 bullets]
**Next Step:** [1 action]
```

### RAG (Retrieval-Augmented Generation)
```
Use only the information below to answer questions.
If the answer isn't in the context, say "I don't have that information."

Context:
[YOUR DOCUMENTS HERE]

Question: {user_question}
```

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Vague instruction ("make it better") | Specify dimension ("make it more concise, under 100 words") |
| No output format | Define exact structure (JSON, Markdown, table) |
| Too many constraints at once | Break into multiple prompts |
| Assuming Claude has context it doesn't | Provide all relevant context explicitly |

## JSON Output (Structured Extraction)

```python
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system="Always respond with valid JSON only. No explanation, no markdown.",
    messages=[{
        "role": "user",
        "content": f"Extract: name, price, category from: {product_text}"
    }]
)
import json
data = json.loads(response.content[0].text)
```

## Prompt Templates by Use Case

### Summarization
```
Summarize the following [article/document/meeting notes] in [X] bullet points.
Focus on: [key themes, decisions, action items].
Audience: [who will read this]
---
[CONTENT]
```

### Translation + Localization
```
Translate this to [language]. Keep the tone [formal/casual].
If there are cultural references that don't translate well, adapt them naturally.
---
[CONTENT]
```

### Code Review
```
Review this [Python/JS/SQL] code for:
1. Security vulnerabilities
2. Performance issues
3. Best practice violations
4. Readability

For each issue: file:line, severity (High/Medium/Low), explanation, suggested fix.
---
[CODE]
```

## Docs & Resources
- Anthropic prompt library: docs.anthropic.com/en/prompt-library
- Prompt engineering guide: docs.anthropic.com/en/docs/build-with-claude/prompt-engineering
