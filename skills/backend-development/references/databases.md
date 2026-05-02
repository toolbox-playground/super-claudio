# Databases & Data Layer

## Choosing the Right Database

| Need | Database | Hosted Option |
|------|----------|---------------|
| Relational data, SQL, relations | PostgreSQL | Supabase, Railway, Neon |
| Flexible schema, JSON documents | MongoDB | MongoDB Atlas (free tier) |
| Real-time sync (mobile/web apps) | Firebase Firestore | Firebase (Google, free tier) |
| Simple key-value, caching | Redis | Upstash (free tier) |
| Embedded, local, no server | SQLite | Local file (no hosting needed) |

## Supabase — Postgres + Auth + Storage (Recommended)

Supabase gives you a full backend in minutes: PostgreSQL database, authentication, file storage,
and auto-generated REST + GraphQL APIs.

**Free tier:** 2 projects, 500MB storage, 50,000 monthly active users.

### Setup

```bash
npm install @supabase/supabase-js
```

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key'
)
```

### Common operations

```typescript
// Insert
const { data, error } = await supabase
  .from('products')
  .insert({ name: 'Coffee', price: 29.90 })

// Select with filter
const { data } = await supabase
  .from('products')
  .select('*')
  .eq('category', 'beverages')
  .order('price', { ascending: true })

// Update
await supabase.from('products').update({ price: 24.90 }).eq('id', 1)

// Delete
await supabase.from('products').delete().eq('id', 1)
```

### Authentication (built-in)

```typescript
// Sign up
await supabase.auth.signUp({ email: 'user@example.com', password: 'password' })

// Sign in
await supabase.auth.signInWithPassword({ email, password })

// Get current user
const { data: { user } } = await supabase.auth.getUser()
```

## Prisma — ORM for Node.js/TypeScript

Use when you want type-safe database access with any SQL database.

```bash
npm install prisma @prisma/client
npx prisma init
```

Schema (`prisma/schema.prisma`):
```prisma
model Product {
  id        Int      @id @default(autoincrement())
  name      String
  price     Float
  createdAt DateTime @default(now())
}
```

```bash
npx prisma migrate dev --name init   # create migration
npx prisma generate                   # generate client
```

```typescript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const products = await prisma.product.findMany({
  where: { price: { lt: 50 } },
  orderBy: { createdAt: 'desc' }
})
```

## Schema Design Principles

1. Start with entities (nouns: User, Product, Order)
2. Define relationships (one-to-many, many-to-many)
3. Add indexes on frequently queried columns
4. Use UUIDs for public-facing IDs (harder to enumerate)
5. Always include `created_at` and `updated_at` timestamps
