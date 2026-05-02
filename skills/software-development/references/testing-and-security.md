# Testing & Security

## Testing Frameworks

### Python
```bash
pip install pytest pytest-cov
```
```python
# test_example.py
def test_add():
    assert add(2, 3) == 5

def test_add_negative():
    assert add(-1, 1) == 0
```
```bash
pytest tests/ -v                    # run all tests
pytest tests/ --cov=src --cov-report=html  # with coverage
pytest tests/ -k "test_add"         # run specific test
```

**pytest plugins:**
- `pytest-asyncio` — async tests
- `pytest-mock` — mocking
- `pytest-httpx` — mock HTTP requests in FastAPI/httpx
- `factory-boy` — test data factories

### JavaScript / Node.js
```bash
npm install -D jest @types/jest
# or
npm install -D vitest  # faster, Vite-native
```
```javascript
// sum.test.js
test('adds 2 + 3 to equal 5', () => {
  expect(add(2, 3)).toBe(5);
});

test('throws on invalid input', () => {
  expect(() => add('a', 1)).toThrow();
});
```
```bash
npx jest --coverage
npx vitest run
```

### End-to-End (Browser)
**Playwright** (recommended)
```bash
npm install -D @playwright/test
npx playwright install
```
```typescript
import { test, expect } from '@playwright/test';

test('homepage has title', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
  await page.click('text=Get started');
  await expect(page).toHaveURL(/.*intro/);
});
```
```bash
npx playwright test
npx playwright test --ui   # visual debugger
```

**Cypress** (alternative)
```bash
npm install -D cypress
npx cypress open
```

### API Testing
**httpx + pytest** (Python)
```python
from fastapi.testclient import TestClient
client = TestClient(app)

def test_create_user():
    response = client.post("/users", json={"name": "Alice"})
    assert response.status_code == 201
    assert response.json()["name"] == "Alice"
```

**supertest** (Node.js)
```javascript
const request = require('supertest');
const app = require('./app');

test('GET /users returns 200', async () => {
  const res = await request(app).get('/users');
  expect(res.statusCode).toBe(200);
});
```

---

## Security Basics

### OWASP Top 10 — Quick Checklist

| Risk | What to check |
|------|-------------|
| Injection (SQL, NoSQL, command) | Use parameterized queries, never concatenate user input into queries |
| Broken authentication | Enforce strong passwords, use bcrypt/argon2, short session TTLs |
| Sensitive data exposure | Never log passwords/tokens, use HTTPS, encrypt at rest |
| XSS | Sanitize HTML output, use Content-Security-Policy header |
| IDOR / broken access control | Verify ownership on every resource request |
| Security misconfiguration | Disable debug mode in prod, remove default credentials |
| Vulnerable dependencies | Run `npm audit` / `pip-audit` regularly |
| SSRF | Validate/block internal IP ranges in user-supplied URLs |

### Secrets Detection
```bash
# Install truffleHog (scan git history for leaked secrets)
pip install trufflehog
trufflehog git file://. --since-commit HEAD~10

# gitleaks (fast, CI-friendly)
brew install gitleaks
gitleaks detect --source . -v
```

Add to `.gitignore`:
```
.env
.env.local
*.pem
*.key
secrets.json
```

### Dependency Scanning
```bash
# Python
pip install pip-audit
pip-audit

# Node.js
npm audit
npm audit fix

# Docker images
docker scout cves my-image:latest
```

### Input Validation (Python)
```python
from pydantic import BaseModel, validator

class UserInput(BaseModel):
    email: str
    age: int

    @validator('age')
    def age_must_be_positive(cls, v):
        if v < 0 or v > 150:
            raise ValueError('Invalid age')
        return v
```

### SQL Injection Prevention
```python
# ❌ Never do this
cursor.execute(f"SELECT * FROM users WHERE name = '{user_input}'")

# ✅ Always use parameterized queries
cursor.execute("SELECT * FROM users WHERE name = %s", (user_input,))
```

### Environment Variables
```python
# Python — never hardcode secrets
import os
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("API_KEY")
if not API_KEY:
    raise RuntimeError("API_KEY environment variable not set")
```

```javascript
// Node.js
import 'dotenv/config';
const apiKey = process.env.API_KEY;
if (!apiKey) throw new Error('API_KEY not set');
```

### Security Headers (Express / Fastify)
```javascript
// Express — use helmet
npm install helmet
app.use(require('helmet')());
```

```python
# FastAPI — add security headers middleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["yourdomain.com"])
```

## CI Integration

```yaml
# GitHub Actions — test + security scan on every PR
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pip install -r requirements.txt
      - run: pytest tests/ --cov=src
      - run: pip-audit
      - run: gitleaks detect --source . -v
```
