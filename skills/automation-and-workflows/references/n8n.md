# n8n — Self-Hosted Workflow Automation

n8n is the most powerful free automation tool. Runs locally or on a server, no per-task pricing,
and has 400+ integrations. Think Zapier but open-source and with code when you need it.

## Install (Docker — recommended)

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

Open: http://localhost:5678

## Install (npm)

```bash
npm install n8n -g
n8n start
```

## Key Concepts

- **Workflow**: A series of connected nodes that execute in order
- **Trigger node**: What starts the workflow (webhook, schedule, email, etc.)
- **Action node**: What happens (HTTP request, send email, write file, etc.)
- **Expression**: `{{ $json.field }}` — access data from previous nodes

## Common Workflow Patterns

### Auto-post to social media when a blog is published
```
RSS Feed Trigger → Extract fields → Post to Buffer/Hootsuite → Send Slack notification
```

### Process form submissions
```
Webhook Trigger → Validate data → Save to Google Sheets → Send confirmation email
```

### Daily report
```
Schedule Trigger (9am) → Fetch data from API → Format with Code node → Send email
```

### Monitor and alert
```
Schedule Trigger (every 5min) → HTTP Request → IF node (condition) → Send alert
```

## Useful Nodes

| Node | What It Does |
|------|-------------|
| **HTTP Request** | Call any API |
| **Code** | Run JavaScript/Python |
| **IF** | Conditional branching |
| **Schedule Trigger** | Run on cron schedule |
| **Webhook** | Receive HTTP calls |
| **Google Sheets** | Read/write spreadsheets |
| **Gmail / Outlook** | Send and receive email |
| **Telegram / Slack** | Send messages |
| **OpenAI** | Call AI models |

## n8n + Claude / AI

n8n has a built-in AI Agent node that can use Claude or other models:
1. Add "AI Agent" node
2. Set model to Claude (requires Anthropic API key)
3. Give it tools (HTTP Request, Google Sheets, etc.)
4. It autonomously decides which tools to use

## Cloud Option

n8n also offers a managed cloud: n8n.io/cloud — free tier available (limited executions).
Self-hosted is unlimited and free.
