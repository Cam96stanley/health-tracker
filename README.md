# Chronic Illness Tracker

A web application that helps people with chronic illness log their daily health data and automatically surface patterns and insights. Users track sleep, symptoms, and medications — the app does the work of finding correlations and turning raw logs into actionable information they can act on or share with their doctor.

[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://neon.tech)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io)
[![Zod](https://img.shields.io/badge/Zod-4-3E67B1?style=flat-square&logo=zod&logoColor=white)](https://zod.dev)
[![Biome](https://img.shields.io/badge/Biome-2-60A5FA?style=flat-square&logo=biome&logoColor=white)](https://biomejs.dev)
[![pnpm](https://img.shields.io/badge/pnpm-10-F69220?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io)

---

## Contents

- [Core Features](#core-features)
- [Getting Started](#getting-started)

---

## Core Features

- **Daily logging** — log sleep, symptoms (with severity), medications, and notes in under 30 seconds
- **Dashboard** — at-a-glance stats including average sleep, most frequent symptom, and medication adherence rate
- **Insight engine** — automatically detects correlations across entries, such as sleep vs. symptom severity and medication adherence vs. symptom frequency
- **Trends** — charts showing symptom severity, sleep, and adherence over time
- **Reports** — generate and download a PDF summary to share with a healthcare provider

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- Access to the Neon database (request an invite from the project owner)

### 1. Set up the backend

```bash
cd backend
pnpm install
cp .env.example .env
# Paste the DATABASE_URL from your Neon invite into .env
# Generate and add a JWT_SECRET
pnpm prisma migrate dev
pnpm dev
```

The API runs on `http://localhost:8000` by default.

See `backend/README.md` for full setup details.
