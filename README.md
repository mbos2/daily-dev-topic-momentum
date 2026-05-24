# Daily Dev Topic Momentum

Topic Momentum is a hackathon project built on top of the daily.dev public API.

The goal is simple:

Pick developer topics, compare them over time, and discover which topic builds the strongest momentum.

Unlike traditional analytics dashboards, Topic Momentum focuses on content, engagement, and battle-style comparisons.

---

## Features

### Topic Battles

Compare:

- 2 topics
- 3 topics

Examples:

- React vs Vue
- Rust vs Go
- C# vs C++
- PostgreSQL vs MongoDB vs Redis

Or, just run a random battle button and see what you get!

---

### Time Ranges

Supported periods:

- Day
- Week
- Month

---

### Topic Statistics

Every battle generates:

- Total Articles
- Total Comments
- Total Upvotes
- Total Read Time
- Unique Posts
- Overlap Posts
- Momentum Score

---

### Momentum Ranking

Topics are ranked using weighted engagement signals.

Momentum combines:

- Discussion
- Community approval
- Reading depth
- Topic overlap

---

### Top Articles

Per topic:

- Ranked articles
- Momentum score
- Load more support

---

### Battle Insights

Generated automatically:

- Victory Margin
- Content Efficiency
- Article Dominance

---

### History

Save and revisit previous battles.

Includes:

- Historical snapshots
- Previous comparisons
- Battle results

---

## Architecture

```text
Frontend
↓
Next.js API
↓
daily.dev API
↓
Transform
↓
Response
```

Frontend never communicates directly with daily.dev.

---

## Tech Stack

Frontend

- Next.js (App Router)
- TypeScript
- Chakra UI
- TailwindCSS

Backend

- Next.js Route Handlers
- Axios

Storage

- JSON
- Vercel Blob

Hosting

- Vercel
