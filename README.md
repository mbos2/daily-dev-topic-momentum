# Daily Dev Topic Pulse

Topic Battles is a hackathon project built on top of the daily.dev public API.

The goal is to compare developer topics over time and determine which topic wins based on engagement and article quality.

This project is intentionally content-first and not an analytics dashboard.

---

## Features

### Topic Battles

Compare 2 or 3 topics.

Examples:

- React vs Vue
- Rust vs Go
- Rust vs Go vs Svelte

---

### Time Ranges

Supported ranges:

- Day
- Week
- Month

---

### Topic Statistics

Per topic:

- Total Articles
- Total Comments
- Total Upvotes
- Total Read Time
- Unique Articles
- Shared Articles
- Engagement Score calculated based on other stats

---

### Top Articles

Each topic returns:

- article
- calculated score

Sorted descending.

---

## Architecture

Frontend

↓

Next.js API

↓

daily.dev API

↓

Transform

↓

Response

Frontend never calls daily.dev directly.

---

## Stack

Frontend:

- Next.js (App Router)
- TypeScript
- Chakra UI
- TailwindCSS

Backend:

- Next.js Route Handlers
- Axios

Storage for history snapshots:

- JSON files

Hosting:

- Vercel

---

## Environment

Create:

.env.local

Example:

```env
DAILY_DEV_API_BASE_URL=
DAILY_DEV_API_TOKEN=
BLOB_STORE_ID="store_xN6XJAStCrRJpEk4"
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xN6XJAStCrRJpEk4_vJdw2RbdIKbArM9abqKg0p88mSQYHD"
```

---

## Run

Install:

```bash
npm install
```

Run:

```bash
npm run dev
```

---

## Deployment

Vercel

Environment variables must be configured in Vercel dashboard.

---
