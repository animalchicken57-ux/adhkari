# Product Requirements Document (PRD) — أذكاري (Adhkari)

> Produced with the **BMAD-METHOD™** workflow (PM agent → PRD). BMad v6.10.0.
> Companion documents: [`product-brief.md`](./product-brief.md), [`architecture.md`](./architecture.md).

## 1. Overview
Adhkari is an Arabic (RTL) web app that helps users keep their **morning and evening
adhkār** through an interactive counter, automatic daily progress, and motivating streaks,
plus supporting worship tools.

## 2. Goals
- G1 — Make completing the daily wird effortless and trackable.
- G2 — Build long-term consistency via streaks and stats.
- G3 — Provide authentic content with an accessible, distraction-free UI.

## 3. Users & Personas
- **P1 — The Consistent Worshipper:** wants to finish morning/evening adhkār daily and see a growing streak.
- **P2 — The Beginner:** needs the authentic text + count and larger font to read comfortably.

## 4. Functional Requirements
Requirements are grouped by capability with stable IDs.

### FR-A: Authentication
- **FR-A1** Users can create an account with name, email, password.
- **FR-A2** Users can log in and log out securely.
- **FR-A3** Protected pages (tracker, profile, support) redirect anonymous users to login.
- **FR-A4** A profile row is created automatically on signup.

### FR-B: Adhkar Tracker (core)
- **FR-B1** Show morning and evening adhkār in separate tabs, ordered.
- **FR-B2** Each dhikr shows title, authentic text, repeat count, and virtue.
- **FR-B3** Tapping a dhikr increments its counter; on reaching the repeat count it is marked complete.
- **FR-B4** Completion is persisted per user per day; state restores on reload.
- **FR-B5** A progress bar shows completion for the active category; a celebration appears at 100%.
- **FR-B6** A dhikr can be reset for the day.
- **FR-B7** Users can increase/decrease the adhkār text font size (persisted).

### FR-C: Profile & Stats
- **FR-C1** Show user name, email, and member-since date.
- **FR-C2** Show current streak, longest streak, completed days, total completions.
- **FR-C3** A day counts toward the streak when a full category (morning OR evening) is completed.

### FR-D: Support
- **FR-D1** Authenticated users can submit a ticket (subject, category, message).
- **FR-D2** Tickets are stored and listed back to the user with status.
- **FR-D3** A phone push notification is sent to the maintainer when a ticket is created.

### FR-E: Supporting Tools
- **FR-E1** Digital tasbīḥ: preset adhkār, selectable target (33/99/100/∞), vibration, saved count.
- **FR-E2** Prayer times: auto-detect location (or city input) and show today's five prayers, highlighting the next.
- **FR-E3** Verse/ḥadīth of the day on the home page, rotating daily.
- **FR-E4** Dark mode toggle, persisted, with no flash on load.

## 5. Non-Functional Requirements
- **NFR1 Security:** Row-Level Security on all tables; users access only their own rows.
- **NFR2 Performance:** first load fast; static/edge where possible; no blocking calls on landing.
- **NFR3 Accessibility & i18n:** full Arabic RTL, readable Arabic fonts, adjustable text size.
- **NFR4 Responsiveness:** works on mobile and desktop; no horizontal overflow.
- **NFR5 Reliability:** app renders even if a non-critical service (e.g. notifications) fails.
- **NFR6 Maintainability:** typed codebase (TypeScript), clear module boundaries.

## 6. Epics & Stories
### Epic 1 — Foundation & Auth
- S1.1 Scaffold Next.js + TypeScript + Tailwind (RTL, Arabic fonts).
- S1.2 Supabase clients (browser/server) + session middleware.
- S1.3 Database schema + RLS + auto-profile trigger.
- S1.4 Signup / login / logout + route protection.

### Epic 2 — Adhkar Tracker
- S2.1 Seed authentic morning/evening adhkār.
- S2.2 Tracker UI with tabs, counters, progress bar.
- S2.3 Persist daily completions; restore on load.
- S2.4 Font-size controls.

### Epic 3 — Profile & Stats
- S3.1 Compute streaks and stats from completions.
- S3.2 Profile page with stat cards and motivation.

### Epic 4 — Support
- S4.1 Ticket form + storage + list.
- S4.2 Phone push notification on new ticket.

### Epic 5 — Supporting Tools & Polish
- S5.1 Digital tasbīḥ. S5.2 Prayer times. S5.3 Daily verse/ḥadīth. S5.4 Dark mode.

## 7. Success Metrics & Counter-Metrics
- **Metric:** daily completion rate, current/longest streak, active days.
- **Counter-metric:** ensure added tools don't distract from the core wird (tracker remains the primary CTA).

## 8. Out of Scope
Audio recitation, social/leaderboards, native apps, offline sync — deferred to a future release.
