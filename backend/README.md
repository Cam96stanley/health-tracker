# Health Tracker — Backend

A RESTful API for the Chronic Illness Tracker application. Built with Node.js, Express, and PostgreSQL via Prisma. Handles authentication, daily health entry logging, automated insight generation, and report exports.

[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://neon.tech)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io)
[![Zod](https://img.shields.io/badge/Zod-4-3E67B1?style=flat-square&logo=zod&logoColor=white)](https://zod.dev)
[![pdfkit](https://img.shields.io/badge/pdfkit-0.18-CC0000?style=flat-square)](https://pdfkit.org)
[![Biome](https://img.shields.io/badge/Biome-2-60A5FA?style=flat-square&logo=biome&logoColor=white)](https://biomejs.dev)
[![pnpm](https://img.shields.io/badge/pnpm-10-F69220?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io)

---

## Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Architecture](#architecture)
- [Database](#database)

---

## Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma          # Database schema and model definitions
│   └── prisma.config.ts       # Prisma configuration
├── src/
│   ├── routes/                # Endpoint definitions (not yet implemented)
│   ├── controllers/           # Request/response handling (not yet implemented)
│   ├── services/              # Business logic (not yet implemented)
│   ├── middleware/            # Auth and other middleware (not yet implemented)
│   ├── app.ts                 # Express app setup, middleware registration
│   ├── env.ts                 # Zod env validation, exits early if misconfigured
│   ├── swagger.ts             # Swagger/OpenAPI documentation setup
│   └── server.ts              # Entry point, starts the HTTP server
├── .env                       # Local environment variables (never commit)
├── .env.example               # Env variable template (safe to commit)
├── .gitignore
├── biome.json                 # Linter and formatter config
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- PostgreSQL (local or hosted via Neon)

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Actual project secrets will be sent upon onboarding. To generate a secure `JWT_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Set up the database

```bash
pnpm prisma migrate dev
```

### 4. Start the development server

```bash
pnpm dev
```

The API will be available at `http://localhost:8000`.

---

## Scripts

| Script | Description |
|---|---|
| `dev` | Start dev server with hot reload |
| `build` | Compile TypeScript to `dist/` |
| `start` | Run compiled output (production) |
| `lint` | Run linter |
| `format` | Format all files |
| `check` | Lint, format, and sort imports |

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_SECRET` | Yes | Secret used to sign JWTs, minimum 32 characters |
| `PORT` | No | Port the server listens on, defaults to `8000` |
| `NODE_ENV` | No | `development`, `production`, or `test` |

---

## Architecture

The backend follows a three-layer architecture:

**Routes** define the endpoint and bind it to a controller method. No logic lives here.

**Controllers** handle the HTTP layer — reading from `req`, calling the appropriate service, and sending the response. They do not contain business logic.

**Services** contain all business logic. They interact with the database via Prisma and can call other services.

```
Request → Route → Controller → Service → Prisma → PostgreSQL
```

---

## Database

Schema is managed with Prisma. The planned core tables are `users`, `entries`, `symptoms`, `medications`, and `insights`. Models are not yet defined — see `prisma/schema.prisma` as the source of truth.

### Useful Prisma commands

```bash
pnpm prisma migrate dev        # Create and apply a new migration
pnpm prisma studio             # Open Prisma's visual DB browser
pnpm prisma generate           # Regenerate the Prisma client after schema changes
pnpm prisma db push            # Push schema changes without creating a migration (prototyping only)
```
