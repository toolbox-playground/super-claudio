# Cloud Automation: Make.com & Zapier

No-code automation tools that connect apps in the cloud. No server needed.

## Make.com (formerly Integromat)

- URL: make.com
- **Free tier**: 1,000 operations/month, unlimited scenarios
- **Best for**: Complex multi-step workflows with transformations, visual data mapping
- **Strength over Zapier**: More powerful data manipulation, cheaper at scale

### Getting started
1. Go to make.com → Create account
2. New Scenario → Add a trigger (e.g., "Watch new Instagram post")
3. Add modules (actions) in sequence
4. Set schedule or trigger condition → Activate

### Useful Make.com scenarios

**TikTok content pipeline:**
Airtable new row → Generate image via API → Post to Buffer → Notify via Telegram

**Lead capture:**
Typeform submission → Add to Google Sheets → Send welcome email via Gmail → Notify team on Slack

**E-commerce alert:**
Shopify new order → Send WhatsApp message → Update inventory spreadsheet

### Make.com + Webhooks
Any app that can send a webhook can trigger a Make.com scenario:
- Receive webhook → process data → fan out to multiple apps

## Zapier

- URL: zapier.com
- **Free tier**: 100 tasks/month, 5 Zaps, single-step only
- **Paid**: from $19.99/month for multi-step
- **Best for**: Simple 2-step automations, large app library (6,000+ apps), non-technical users

### When to use Zapier vs Make.com

| Need | Use |
|------|-----|
| Simple trigger → action (2 steps) | Zapier free tier |
| Multi-step with logic/transformations | Make.com |
| Large app catalog (obscure integrations) | Zapier |
| Cost-sensitive, many operations | Make.com or n8n |
| Self-hosted, unlimited | n8n |

## IFTTT — Simple Consumer Automation

- URL: ifttt.com
- Free tier: 3 applets
- Best for: Personal automation (smart home, social cross-posting, simple triggers)
- Not for: Business workflows or complex logic

## Choosing the Right Tool

```
Is it a simple "if this, then that"?
  → IFTTT (personal) or Zapier free tier (business)

Do you need multi-step with logic?
  → Make.com (cloud) or n8n (self-hosted)

Do you want zero pricing surprises?
  → n8n self-hosted (unlimited, free)

Do you need the broadest app support?
  → Zapier (6,000+ apps)
```
