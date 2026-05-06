---
name: super-claudio:find-ai-tools
description: >
  AI tool discovery skill. Use when the user wants to find, compare, or evaluate AI-powered
  web tools — especially when they care about whether a tool has a genuinely free tier without
  requiring a credit card.
  Trigger on: "find AI tools for X", "best free AI tools for X", "list the best video creation tools",
  "find free image generation tools", "is there a free AI that does X", "what's the best AI for X",
  "compare AI tools for X", "find tools without credit card", "AI tools with free tier",
  "best AI for video generation", "best AI for image generation", "best AI for audio",
  "best AI for writing", "find a tool that can generate X", "no-credit-card AI tool",
  "which AI tools are actually free", "free trial without credit card", "AI tools that work for free".
  Do NOT trigger for: creating media directly (use media-content-creation), writing content
  (use writing), building code (use software-development), finding Claude Code plugins (use discover-skills).
---

# Find AI Tools

You help the user find the best AI tools for any category, with an honest assessment of
what is genuinely free versus what requires a credit card despite claiming otherwise.

**Core problem you solve:** Many AI tool sites falsely advertise a "free trial" but charge
from day one. Community sources are more honest than vendor marketing. You surface what
actual users report, not what the tool's homepage says.

## Step 1 — Identify category and constraints

Extract from the user's request:
- **Category**: video, image, audio, music, writing, coding, design, presentation, research, etc.
- **Constraint**: free only? no credit card? specific feature (no watermark, high resolution)?

If the category is ambiguous, ask one question before searching.

## Step 2 — Load search strategies

Read `references/search-strategies.md` and find the section matching the user's category.
Use the query strings there as-is — they are tuned for each category.

## Step 3 — Run parallel searches (all at once)

Fire all 3 WebSearch calls simultaneously:

- **Search A** (structured directory): `site:theresanaiforthat.com [category term]`
- **Search B** (community): `best free [category] AI 2026 site:reddit.com OR site:producthunt.com OR site:news.ycombinator.com`
- **Search C** (quality signal): `"free tier" [category] AI 2026 no credit card comparison`

If Search A returns theresanaiforthat.com listing URLs, use WebFetch on the most relevant
one to get structured tool data (pricing, description, user ratings).

## Step 4 — Classify each candidate tool

For every tool found, assign exactly one label. When in doubt, use the **more restrictive** label:

| Label | What it means |
|-------|--------------|
| **Free** | Fully usable with no payment and no credit card; may have usage caps |
| **Freemium** | Meaningful free tier exists; no credit card required to start |
| **Free Trial (card required)** | Requires credit card upfront; auto-charges after trial |
| **Paid Only** | No meaningful free access exists |

**Critical rule:** If a tool's own website says "free trial" but Reddit/ProductHunt/HN users
report that a credit card is required from signup, label it **Free Trial (card required)**
and explicitly flag the gap: *"Site claims free trial — community reports card required from day one."*

Community-sourced pricing claims always outweigh the tool's own marketing copy.

## Step 5 — Rank and output top 5

Rank by:
1. Genuineness of free access (Free > Freemium > Free Trial > Paid Only)
2. Output quality reported by community (not vendor claims)
3. Ease of access (no signup friction, no waitlist)

Output using this exact format:

---

### Top 5 [Category] AI Tools — Honest Free Tier Ranking

**#1 — [Tool Name]** ([URL])
- **What it does:** One sentence. No marketing language.
- **Free tier reality:** Exact limits ("5 videos/month, no watermark, no card") or flag ("Site claims free — community reports card required from day one per r/videogeneration").
- **Access label:** Free / Freemium / Free Trial (card required) / Paid Only
- **Community says:** What actual users report — cite source (Reddit thread, PH review, HN comment).
- **Quality signal:** Output resolution, watermarks, generation speed, notable limitations.

**#2 — [Tool Name]** ([URL])
*(same format)*

...

**#5 — [Tool Name]** ([URL])
*(same format)*

---

**Sources checked:** [list URLs you searched or fetched]
**Search date:** [today's date — AI tool pricing changes frequently without notice]
**Reminder:** Verify free tier details before creating an account or entering any payment info.

---

## When search results are thin (fewer than 5 tools found)

1. Broaden with Futurepedia: `site:futurepedia.io [category]`
2. Try alternate phrasing: `"[category] AI" "free plan" -"credit card required"`
3. Include tools from training data only if labeled: *(from training data — verify current pricing)*

## When the user wants to actually use one of the tools found

If they pick a tool and want step-by-step help creating something, note:
> "I can walk you through using [tool] — just say the word and I'll switch to the
> media-content-creation skill for the full workflow."
