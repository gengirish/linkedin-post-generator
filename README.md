# IntelliForge Learning — Share Your Story

**LinkedIn Post Generator for IntelliForge AI training graduates.**

After completing an IntelliForge AI training, learners visit this standalone app, fill a quick 4-field form, and AI generates 3 ready-to-post LinkedIn post variants. One-click copy → paste to LinkedIn → organic reach for IntelliForge.

---

## What it does

1. Learner fills in: their name, the course they attended, their biggest takeaway, and an optional before/after transformation.
2. They pick a tone: Professional, Casual, or Inspiring.
3. AI (via OpenRouter / Llama 3.3-70B) generates 3 distinct LinkedIn post variants:
   - Achievement Post — milestone celebration
   - Insights Post — 3 things learned
   - Recommendation Post — direct referral with link
4. One-click copy + direct "Open LinkedIn" button.
5. Every copy action is logged to SQLite for analytics.

---

## Courses pre-loaded

- AI Strategy for Business Leaders
- RAG Systems for Real Business Problems
- AI Agents & Agentic Workflows
- IntelliForge AI Training (Comprehensive)
- BuildwithAiGiri Workshop
- Prompt Engineering Masterclass
- Other IntelliForge Training

---

## Run locally

```bash
git clone <repo>
cd linkedin-post-generator
npm install
cp .env.example .env.local
# Edit .env.local and add your OPENROUTER_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Works without an API key** — falls back to template posts so you can test the UI immediately.

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `OPENROUTER_API_KEY` | Recommended | Key from [openrouter.ai](https://openrouter.ai) for AI generation |
| `DB_PATH` | Optional | Path to SQLite file (default: `./shares.db`) |

Get a free OpenRouter key at https://openrouter.ai — the app uses `meta-llama/llama-3.3-70b-instruct` which is very affordable.

---

## Admin dashboard

Visit `/admin` to see:
- Total LinkedIn posts copied/shared by learners
- Breakdown by course
- Last 10 shares with learner name and date

No authentication in MVP — Girish can add NextAuth or a simple password check later.

---

## How to send learners here

After training completion, send learners to:

```
https://share.intelliforge.tech
```

(or wherever you deploy this — see below)

Suggested WhatsApp/email message:
> "Congrats on completing the training! Share your experience on LinkedIn — it takes 60 seconds and inspires your network: https://share.intelliforge.tech"

---

## Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

Set the `OPENROUTER_API_KEY` environment variable in Vercel dashboard (Project → Settings → Environment Variables).

> **Note on SQLite + Vercel**: Vercel's filesystem is ephemeral. For persistent share tracking, either:
> - Use Vercel Postgres / PlanetScale and swap `better-sqlite3` for the relevant driver, or
> - Deploy to Railway / Render / a VPS where the filesystem persists (set `DB_PATH` to a persistent volume path).

---

## Tech stack

- **Next.js 14** App Router
- **TypeScript**
- **Tailwind CSS**
- **better-sqlite3** — synchronous SQLite for share tracking
- **OpenRouter** — AI inference (Llama 3.3-70B)

---

## Built by

[IntelliForge AI](https://www.intelliforge.tech) · [BuildwithAiGiri](https://chat.whatsapp.com/LDqzLHYMlhg9GiO0yRrUOS?mode=gi_t)

Training platform: [learning.intelliforge.tech](https://learning.intelliforge.tech)
