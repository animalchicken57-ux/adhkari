# Product Brief — أذكاري (Adhkari)

> Produced with the **BMAD-METHOD™** workflow (Analyst agent → Product Brief). BMad v6.10.0.

## 1. Problem Statement
Many Muslims intend to keep the **morning and evening adhkār** (daily remembrances) but
forget them, lose count mid-way, or lose the daily habit after a few days. Paper booklets
give no reminder, no progress, and no sense of consistency. There is no lightweight,
distraction-free tool focused *only* on turning this specific act of worship into a
sustained daily habit.

## 2. Target Users
- **Primary:** practicing Muslims (teens → adults) who want to keep morning/evening adhkār
  consistently and track their streak.
- **Secondary:** beginners who don't know the adhkār and need the authentic text + count in
  one place, with adjustable font size for readability.

## 3. Proposed Solution
A focused, mobile-friendly **Arabic (RTL) web app** that:
- presents the authentic morning/evening adhkār with the correct repeat count,
- provides an **interactive tap counter** per dhikr with auto-saved daily progress,
- motivates consistency through **streaks** and personal stats,
- adds supporting tools (digital tasbīḥ, prayer times, verse/ḥadīth of the day).

## 4. Goals & Success Metrics
| Goal | Metric |
| --- | --- |
| Build a daily habit | Current streak & longest streak per user |
| Complete the daily wird | % of morning/evening adhkār completed per day |
| Retention | Number of active days; total completions |
| Accessibility | Adjustable font size; works on any phone browser |

## 5. Scope
**In scope (MVP):** authentication, morning/evening tracker with counters & streaks,
profile with stats, support channel.
**Added value:** dark mode, digital tasbīḥ, prayer times, daily verse/ḥadīth, font controls,
phone push on support messages.
**Out of scope (for now):** audio recitation, social/leaderboards, native mobile apps,
offline PWA sync.

## 6. Constraints & Assumptions
- Web stack required: **Next.js** (frontend) + **Supabase** (database/auth).
- Deployed on **Vercel**, source on **GitHub**.
- Content must be **authentic** (Ḥiṣn al-Muslim references); accuracy is a hard requirement.
- Single developer, short timeline (course assignment).

## 7. Risks
| Risk | Mitigation |
| --- | --- |
| Inaccurate religious text | Curated from well-known authentic sources; stored in DB for review |
| Users drop off | Streaks + daily progress + gentle motivation copy |
| Build/deploy misconfig | Environment variables verified across all Vercel environments |
