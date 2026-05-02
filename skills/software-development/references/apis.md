# API Design & Frameworks

## Framework Selection

| Framework | Language | Best For | When to Use |
|-----------|----------|----------|-------------|
| **Fastify** | Node.js/TS | Fast REST APIs, microservices | Default choice for Node.js |
| **Express** | Node.js | Flexible, huge ecosystem | Legacy projects, maximum flexibility |
| **FastAPI** | Python | Auto-docs, ML backends, typed | Python projects, AI/ML adjacent |
| **Hono** | JS/TS | Edge functions, Cloudflare Workers | Serverless-first, ultra-fast |
| **NestJS** | TypeScript | Large enterprise apps | Team projects needing strong structure |

## Fastify — Fast REST API (Recommended for Node.js)

```bash
npm install fastify
```

```typescript
import Fastify from 'fastify'
const app = Fastify({ logger: true })

app.get('/products', async (request, reply) => {
  return { products: await db.findAll() }
})

app.post('/products', async (request, reply) => {
  const product = await db.create(request.body)
  return reply.code(201).send(product)
})

await app.listen({ port: 3000 })
```

### With Zod validation

```bash
npm install zod @fastify/type-provider-zod
```

```typescript
import { z } from 'zod'

const ProductSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive()
})

app.post('/products', {
  schema: { body: zodToJsonSchema(ProductSchema) }
}, async (req) => {
  const { name, price } = ProductSchema.parse(req.body)
  return db.create({ name, price })
})
```

## FastAPI — Python API with Auto-Docs

```bash
pip install fastapi uvicorn
```

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Product(BaseModel):
    name: str
    price: float

@app.get("/products")
async def get_products():
    return {"products": db.find_all()}

@app.post("/products", status_code=201)
async def create_product(product: Product):
    return db.create(product.dict())
```

Run: `uvicorn main:app --reload`
Docs: automatically at `/docs` (Swagger UI)

## REST API Design Conventions

```
GET    /products          → list all
GET    /products/:id      → get one
POST   /products          → create
PUT    /products/:id      → replace (full update)
PATCH  /products/:id      → partial update
DELETE /products/:id      → delete
```

**Status codes:**
- 200 OK, 201 Created, 204 No Content
- 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found
- 500 Internal Server Error

## Authentication Patterns

### JWT (stateless, most common)

```typescript
import jwt from 'jsonwebtoken'

// Generate token at login
const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
)

// Verify in middleware
const decoded = jwt.verify(token, process.env.JWT_SECRET)
```

### API Key (for server-to-server)

```typescript
app.addHook('onRequest', async (request, reply) => {
  const key = request.headers['x-api-key']
  if (key !== process.env.API_KEY) {
    return reply.code(401).send({ error: 'Invalid API key' })
  }
})
```
