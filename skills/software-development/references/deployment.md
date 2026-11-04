# Deployment & Hosting

## Recommended Hosting Platforms

| Platform | Best For | Free Tier | Price |
|----------|----------|-----------|-------|
| **Railway** | Full-stack apps, databases | $5 credit/month | ~$5/month |
| **Render** | Web services, cron jobs | Free (sleeps after inactivity) | $7/month |
| **Fly.io** | Global edge deployment, containers | 3 shared VMs free | Pay-as-you-go |
| **Vercel** | Next.js, serverless functions | Generous free tier | $20/month |
| **Supabase Edge Functions** | Serverless, Supabase-integrated | Included with Supabase | Free |
| **Cloudflare Workers** | Edge, ultra-fast, global | 100k requests/day free | $5/month |

## Railway — Easiest Full Deployment

Railway deploys directly from GitHub. Supports Node.js, Python, Docker, and databases.

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

Or: Push to GitHub → railway.app → "Deploy from GitHub" → done.

Railway auto-detects the framework, sets environment variables, and gives you a URL.

## Docker — Containerize Your App

```dockerfile
# Dockerfile (Node.js example)
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]
```

```bash
docker build -t my-app .
docker run -p 3000:3000 my-app
```

Push to any container registry (Docker Hub, GitHub Container Registry), then deploy to Railway, Fly.io, or any VPS.

## Environment Variables

Never hardcode secrets. Use `.env` locally:

```bash
# .env (never commit this file)
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-here
API_KEY=your-key
```

```typescript
// Access in code
const dbUrl = process.env.DATABASE_URL
```

Add to `.gitignore`:
```
.env
.env.local
.env.production
```

On Railway/Render/Vercel: set env vars in the dashboard → they're injected at runtime.

## Health Check Endpoint

Always add a health check — required by most platforms and load balancers:

```typescript
app.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() }
})
```

## Basic GitHub Actions CI/CD

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262 # v4.4.0
        with:
          persist-credentials: false
      - uses: actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020 # v4.4.0
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test
      - name: Deploy to Railway
        run: railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```
