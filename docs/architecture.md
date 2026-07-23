# Architecture Document — أذكاري (Adhkari)

> Produced with the **BMAD-METHOD™** workflow (Architect agent → Architecture). BMad v6.10.0.
> Companion documents: [`product-brief.md`](./product-brief.md), [`PRD.md`](./PRD.md).

## 1. Technology Stack
| Layer | Choice | Reason |
| --- | --- | --- |
| Frontend | **Next.js 16 (App Router) + React 19 + TypeScript** | Required stack; SSR + RSC; deploys natively on Vercel |
| Styling | **Tailwind CSS v4** + CSS variables | Fast RTL styling; theme tokens enable dark mode |
| Fonts | `next/font` — Tajawal (UI) + Amiri (Qur'an/adhkār) | Authentic Arabic typography |
| Database & Auth | **Supabase** (Postgres + Auth) via `@supabase/ssr` | Required stack; RLS-secured; cookie-based SSR sessions |
| Hosting | **Vercel** (connected to GitHub) | Required; auto-deploy on push |
| External API | Aladhan (prayer times), ntfy (push) | Free, no key, non-critical |

## 2. High-Level Design
```
Browser (RTL, Arabic)
  │
  ├── Next.js App Router (Vercel)
  │     ├── Server Components  → data reads via Supabase server client (cookies)
  │     ├── Client Components  → interactivity (tracker, tasbih, prayer times, theme)
  │     ├── Server Actions     → support ticket submit
  │     └── proxy.ts (middleware) → refresh session, guard protected routes
  │
  └── Supabase
        ├── Auth (email/password)
        └── Postgres + Row-Level Security
```

## 3. Data Model
- **profiles**(id → auth.users, full_name, created_at) — auto-created via trigger on signup.
- **adhkar**(id, category `morning|evening`, title, body, repeat, virtue, sort_order) — seeded catalog (public read).
- **dhikr_completions**(id, user_id, adhkar_id, day, created_at; unique(user_id, adhkar_id, day)) — one row per completed dhikr per day.
- **support_tickets**(id, user_id, subject, category, message, status, created_at).

### Security (RLS)
- `adhkar`: readable by everyone.
- `profiles`, `dhikr_completions`, `support_tickets`: each user can only read/write rows where `auth.uid() = user_id` (or `= id` for profiles).

## 4. Key Components
| Component | Type | Responsibility |
| --- | --- | --- |
| `lib/supabase/{client,server,middleware}.ts` | lib | Supabase clients for browser / server / session refresh |
| `proxy.ts` | middleware | Refresh auth cookie; redirect anonymous users from protected routes |
| `AdhkarTracker.tsx` | client | Tabs, tap counters, progress, font scaling, persistence |
| `lib/stats.ts` | lib | Pure functions computing streaks/stats from completions |
| `app/support/actions.ts` | server action | Insert ticket + fire ntfy push |
| `ThemeToggle.tsx` + tokens | client + CSS | Dark/light theme with no-flash init script |

## 5. Data Flow — Completing a Dhikr
1. Server component loads the adhkār catalog + current user, passes to `AdhkarTracker`.
2. Client loads today's completions (browser Supabase client, RLS-scoped).
3. User taps → local count increments → on reaching `repeat`, `upsert` into `dhikr_completions`.
4. Profile page later reads completions (+ category) and `lib/stats.ts` computes streaks.

## 6. Deployment & Environments
- **Source:** GitHub → **CI/CD:** Vercel auto-deploys `main`.
- **Env vars:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (must exist in **Production, Preview, Development** — `NEXT_PUBLIC_*` are inlined at **build time**).
- **Schema:** `supabase/schema.sql` run once in the Supabase SQL editor.

## 7. Non-Functional Decisions
- **Streak logic** kept as pure functions for testability (`lib/stats.ts`).
- **Resilience:** landing/nav guard missing env; ntfy failure never blocks ticket submission.
- **Timezone:** "today" computed on the client so the day boundary matches the user's locale.
- **Auth pages** are `force-dynamic` to avoid build-time prerender coupling to env.

## 8. Future Architecture Notes
Audio assets (Supabase Storage), a PWA/offline layer, and a materialized `daily_progress`
view are natural next steps if scope grows.
