# 🏗️ Mosanada SaaS

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![NestJS](https://img.shields.io/badge/NestJS-v10-red.svg)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748.svg)](https://prisma.io/)

**Multi-tenant SaaS backend** for subscription management with **double-entry bookkeeping** and **deferred revenue recognition**.

Each tenant (company) manages its own customers, plans, subscriptions, invoices, and payments — fully isolated.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | NestJS (Node.js + TypeScript) |
| Database | PostgreSQL (Neon.tech serverless) |
| ORM | Prisma |
| Auth | JWT (Passport + bcrypt) |
| API Docs | Swagger UI (auto-opens on `/`) |
| Deploy | Vercel (serverless) |
| License | MIT |

---

## 🏛️ Architecture Decisions

### Multi-Tenancy (Shared Database)
All tenants share the same database with row-level isolation via `tenantId` on every table. Every query is filtered by the tenant extracted from the JWT token. This approach is cost-effective for SaaS and scales well with Neon.tech's serverless PostgreSQL.

### Double-Entry Bookkeeping
Every financial transaction creates balanced journal entries (`SUM(debit) = SUM(credit)`). Three automated journal entry types:

| Event | Debit | Credit |
|-------|-------|--------|
| Invoice Created | Accounts Receivable | Deferred Revenue |
| Payment Received | Cash | Accounts Receivable |
| Revenue Recognized | Deferred Revenue | Subscription Revenue |

### Idempotent Operations
Both invoice generation and revenue recognition are idempotent — safe to call multiple times without creating duplicates.

---

## 📦 API Endpoints

| Group | Endpoint | Method | Description |
|-------|----------|--------|-------------|
| Auth | `/api/auth/register` | POST | Register tenant + admin user |
| Auth | `/api/auth/login` | POST | Login, get JWT |
| Plans | `/api/plans` | CRUD | Manage subscription plans |
| Customers | `/api/customers` | CRUD | Manage customers |
| Subscriptions | `/api/subscriptions` | POST/GET | Create & list subscriptions |
| Subscriptions | `/api/subscriptions/:id/cancel` | PATCH | Cancel subscription |
| Billing | `/api/billing/generate-invoices` | POST | Generate monthly invoices |
| Billing | `/api/invoices` | GET | List invoices |
| Payments | `/api/payments` | POST/GET | Record payments |
| Accounting | `/api/accounts` | GET | Chart of accounts |
| Accounting | `/api/accounts/:id/ledger` | GET | Account ledger |
| Accounting | `/api/journal-entries` | GET | All journal entries |
| Accounting | `/api/accounting/recognize-revenue` | POST | Recognize deferred revenue |
| Reports | `/api/reports/income-statement` | GET | Income statement |
| Reports | `/api/reports/balance-sheet` | GET | Balance sheet |

---

## 🚀 Local Setup

### Prerequisites
- Node.js 18+
- PostgreSQL (or Neon.tech free tier)

### Steps

```bash
# 1. Clone
git clone https://github.com/your-username/mosanada-saas.git
cd mosanada-saas

# 2. Install
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your DATABASE_URL and JWT_SECRET

# 4. Generate Prisma client
npx prisma generate

# 5. Run migrations
npx prisma migrate dev --name init

# 6. Start development server
npm run start:dev

# 7. Open Swagger UI
# Visit http://localhost:3000 (redirects to /api/docs)
```

---

## 🧪 Quick Validation Flow

1. **Register** → POST `/api/auth/register`
2. **Authorize** → Click "Authorize" in Swagger, paste JWT
3. **Create Plan** ($500/mo) → POST `/api/plans`
4. **Create Customer** → POST `/api/customers`
5. **Create Subscription** → POST `/api/subscriptions`
6. **Generate Invoices** → POST `/api/billing/generate-invoices` (1 invoice, $500)
7. **Verify** → Balance Sheet: AR=$500, Deferred=$500
8. **Record Payment** → POST `/api/payments`
9. **Verify** → Balance Sheet: Cash=$500, AR=$0
10. **Recognize Revenue** → POST `/api/accounting/recognize-revenue`
11. **Verify** → Income Statement: Revenue=$500, Balance Sheet balances ✅
12. **Register 2nd Tenant** → Verify data isolation

---

## 🌐 Deploy to Vercel

1. Create a [Neon.tech](https://neon.tech) free PostgreSQL database
2. Push code to GitHub
3. Import project in [Vercel](https://vercel.com)
4. Set environment variables: `DATABASE_URL`, `JWT_SECRET`
5. Build command: `npx prisma generate && npm run build`
6. Add postbuild script for migrations

---

## 📄 License

[MIT](LICENSE) — open source, use freely.
