# Google+ (Redesign) — Developer & Creator Collaborative Network

[![React 19](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg)](https://tailwindcss.com/)
[![Supabase Postgres](https://img.shields.io/badge/Supabase-PostgreSQL%20RLS-3ECF8E.svg)](https://supabase.com/)

An interactive, production-ready reimagining of **Google+** built for developers, AI researchers, and technical creators. 

Features reimagined **Circles** audience control, **Instant Connect** opt-in serendipity matchmaking, **Project Showcases**, verified developer profiles, and short-form micro-learning **Reels**.

---

## 📑 Submission Documentation

- **1-Page Summary & Rubric Defense**: See [1_PAGE_SUMMARY.md](./1_PAGE_SUMMARY.md) or visit `/summary` in the running app.
- **Backend Architecture & SQL Schema**: See [backend/README.md](./backend/README.md).
- **Frontend App Architecture**: See [frontend/README.md](./frontend/README.md).

---

## 📁 Repository Structure

Strictly organized into two clean, self-contained directories:

```
Google+/
├── 1_PAGE_SUMMARY.md      # Official 1-Page Summary (Findings, New Purpose, What We Built)
├── README.md              # Project documentation & setup instructions
├── .gitignore             # Clean repository filter (no node_modules or secrets)
│
├── frontend/              # React 19 + TypeScript + Vite + Tailwind CSS v4
│   ├── src/
│   │   ├── components/    # Navbar, Sidebar, ReelsPlayer, PersonaSwitcher, etc.
│   │   ├── context/       # AuthContext, DataContext (with offline-first sync)
│   │   ├── pages/         # HomePage, ReelsPage, InstantConnectPage, SummaryPage, etc.
│   │   └── types/         # Strongly-typed domain models
│   ├── package.json
│   └── vite.config.ts
│
└── backend/               # Node.js + Express microservice + Supabase SQL
    ├── src/
    │   ├── server.ts      # API routes (Link preview, matchmaking, moderation)
    │   └── services/      # Instant connect scoring & moderation engines
    ├── supabase/
    │   └── migrations/    # 26-Table SQL schema, strict RLS & storage policies
    ├── docs/              # Technical specs and requirements
    └── package.json
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ (tested on Node 20 / 22)
- npm or yarn

### 1. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> **💡 Judge's Tip**: Use the **Persona Switcher** banner at the top of the app to switch between personas:
> - **Alex Rivera** (Senior Full-Stack Engineer)
> - **Dr. Elena Rostova** (AI Research Scientist)
> - **Jordan Lee** (Open-Source Contributor)
> - **Maya Chen** (Lead Mobile Developer)

### 2. Run the Backend Microservice

```bash
cd backend
npm install
npm run dev
```

The API microservice will launch on [http://localhost:4000](http://localhost:4000).

---

## ✨ Key Features

1. **Reels Hub (`/reels`)**:
   - Vertical short-form video player designed for code walkthroughs, AI research breakdowns, design animations, and developer entertainment.
   - Interactive play/pause, mute/unmute, category tabs (`Tech`, `AI`, `Dev Life`, `Tips`), comments, and "Post Reel" creator modal.

2. **Reimagined Circles (`/`)**:
   - Dynamic audience filtering: post to "Core Team", "Mentors", "Colleagues", or "Public" with single-click feed segmentation.

3. **Instant Connect Matchmaker (`/events/:id/instant-connect`)**:
   - Opt-in serendipity matchmaking engine that analyzes skills, goals (Hackathons, Co-Founders, Mentorship), and compatibility to connect engineers.

4. **Project Showcase (`/projects`)**:
   - Showcase live products with GitHub repository links, tech tags, and open collaborator roles.

5. **26-Table Relational Schema & Row Level Security (RLS)**:
   - Full enterprise database schema (`backend/supabase/migrations/`) enforcing cryptographic data access rules and audience isolation at the database level.

---

## 🛡️ License

MIT License. Built for the Google+ Redesign Hackathon Challenge.
