# Demo Script — أذكار المسلم / Adhkar Al Muslim

**Format:** live demo, spoken · **Audience:** teacher + class · **Target:** 10–15 minutes

**Before you start**
- Open **https://adhkari-the-project3.vercel.app** in a browser tab, already **logged in**.
- Open a **second tab** on `/adhkar`, and a **third** on `/ramadan` (it takes a second to start ticking).
- Have your **phone** ready on the same page — you'll use it for the QR and the ☰ menu.
- Zoom the browser to about **125%** so the class can read it.
- If the school Wi-Fi is unreliable, note that the app still opens offline — that's a *feature* you can point out, not an excuse.

> Timings are a guide. If you're running long, the parts marked **[CUT IF SHORT]** are the ones to drop.

---

## 1 · Opening — the problem (1 min 30)

> "Assalamu alaykum. My project is called **أذكار المسلم** — Adhkar Al Muslim.
>
> Let me start with the problem. Most Muslims *intend* to read the morning and evening adhkar every day. But three things get in the way. You **forget**. You **lose count** halfway through a dhikr that's meant to be said thirty-three times. And after a few days, you quietly **stop**, because nothing tells you whether you're keeping it up or not.
>
> A paper booklet can't help with any of that. It doesn't remind you, it doesn't count for you, and it doesn't show you that you've kept it up eleven days in a row.
>
> So I built a web app that does."

**Say the one-line pitch clearly — this is the sentence they'll remember:**

> "It turns the adhkar from something you try to remember into a daily habit you can actually see."

---

## 2 · The core feature — the tracker (3 min)

*Go to `/adhkar`.*

> "This is the heart of the app. Morning and evening adhkar, tabbed at the top."

**Do this, live:**
1. Tap a dhikr card two or three times — **let the class watch the counter go down**.
2. Point at the progress bar filling.
3. Say: *"Notice I didn't press save. It saved itself — I'll come back to why that matters."*
4. Complete one dhikr fully so the ✓ **تمّ** state appears.
5. Change the **font size** control.

> "Every dhikr has its correct repeat count — three times, seven times, thirty-three times — taken from authentic sources, mainly Hisn al-Muslim. Accuracy here isn't a nice-to-have. If the text or the count is wrong, the whole app is worthless, so that was a hard requirement from the start.
>
> The font control is there because my secondary users are beginners and older relatives, and the Arabic script needs to be readable for them."

**[CUT IF SHORT]** — refresh the page to prove progress persisted.

---

## 3 · What makes people come back — streaks (2 min)

*Go to `/profile`.*

> "This is the part I'm most pleased with, because it solves the third problem — giving up.
>
> Here's my **current streak**, my **longest streak**, **days completed**, and **total adhkar**."

*Point at the heatmap.*

> "This grid is the last five weeks. Each square is a day: empty means nothing, light means partly done, full green means I completed both morning and evening.
>
> The reason this works is simple psychology — once you can *see* an unbroken chain, you don't want to be the one who breaks it. That's what turns an intention into a habit."

---

## 4 · Show the breadth (3 min — move briskly)

> "Around that core, I built out a full set of tools. Let me move quickly."

*Use the ☰ menu to jump between these. Spend ~20 seconds each.*

| Page | What to say in one line |
|---|---|
| **المسبحة** `/tasbih` | "A digital tasbih — set a target, tap, it vibrates when you complete a round." |
| **الصلاة** `/prayer-times` | "Prayer times for wherever you are, with the next prayer highlighted." |
| **القبلة** `/qibla` | "A live compass pointing to the qibla using the phone's sensors." |
| **الآيات** `/questions` | "Type any surah and verse — you get the text, the simplified tafsir, and you can listen to it recited." |
| **الأسماء** `/names` | "The ninety-nine names of Allah with their meanings." |
| **قصص الأنبياء** `/prophets` | "Nine prophets, each with their story and the lesson from it." |
| **رمضان** `/ramadan` | **Stop here — see below.** |
| **المعلومات** `/fun-facts` | **Stop here — see below.** |

### Two to actually stop on

**Ramadan countdown** *(let the seconds tick visibly for a moment)*

> "This counts down to the first day of Ramadan — live, to the second.
>
> The interesting part is that I didn't type the date in. If I had, it would be wrong next year and someone would have to fix it. Instead it reads the Islamic calendar directly from the browser and works out when Ramadan falls. It'll still be correct in ten years with nobody touching it."

**Fun facts** *(press the button two or three times — this is the crowd-pleaser)*

> "Forty-five facts. It won't repeat one until it's shown you all of them."

*Read one out loud — the al-Qarawiyyin one lands well:*

> "The oldest working university in the world was founded by a Muslim woman, Fatima al-Fihri, in Morocco in the year 859."

---

## 5 · How it was built (2 min 30)

*Go to `/about` and scroll to the tech section.*

> "Quickly, how it's actually built.
>
> It's a **Next.js** web app written in **TypeScript**, styled with **Tailwind CSS**. The database and login are handled by **Supabase**, and it's deployed on **Vercel**, connected to **GitHub** — so when I push a change, the live site updates by itself in about a minute."

**Three design decisions worth naming out loud** *(this is where technical marks usually live):*

1. **"It's Arabic-first, not translated."** — The whole layout runs right-to-left, and switching to English flips it. It wasn't built in English and then patched.

2. **"It works offline."** — It's a Progressive Web App. You can install it on your phone's home screen and it opens like a normal app. *(Show it on your phone if you installed it.)*

3. **"Your data is actually protected."** — Supabase uses row-level security, so the database itself enforces that you can only ever read your own records. It's not just hidden in the interface — it's blocked at the database.

**[CUT IF SHORT]** — mention you planned it with the BMAD method and wrote a product brief, PRD and architecture document before coding, all in `docs/`.

---

## 6 · Share it — get the class involved (1 min)

*Go to `/share`.*

> "Last thing. This page has a QR code."

**Ask the class to scan it with their phone cameras.** Let them open it while you talk.

> "It's live on the internet right now — anyone here can open it on their own phone. It's not a mock-up or a prototype. It's a real, working, deployed website."

*This is your strongest moment. Let the pause sit while people look at their phones.*

---

## 7 · Closing (1 min)

> "So — the problem was that people intend to keep the adhkar and don't manage it. The app solves that with a counter that remembers where you are, and a streak that makes you want to keep going. Everything else is built around that one idea.
>
> The thing I'm most proud of isn't a single feature — it's that it's genuinely finished and genuinely online. Someone could start using it today.
>
> شكرًا لكم. Any questions?"

---

## Likely questions — have answers ready

**"Did you write this yourself or use a template?"**
> "No template. Every page was built for this project. I used AI as a coding assistant — I decided what to build and why, and reviewed everything that went in."
> *(Be honest here. Teachers respect it, and a claim you can't back up under follow-up questions is far worse.)*

**"How do you know the adhkar are correct?"**
> "They're taken from Hisn al-Muslim and well-known authentic collections. Accuracy was a hard requirement — I listed it as the top project risk in my planning document."

**"What was the hardest part?"**
> Pick a **real** one. Good honest answer: *"The Ramadan countdown. My first version only counted whole days — the hours and minutes were stuck at zero, because I was counting to 'this same time in 193 days' instead of to midnight on the day itself. I had to work out why the numbers weren't moving."*
> *(This is a strong answer. It shows you can find and fix a bug, not just build things that work first time.)*

**"What would you add next?"**
> "A favourites feature — save any dhikr, du'a or fact with a heart and see them all in one place. And collapsible cards on the prophets page, since it's a lot of scrolling right now."

**"How long did it take?"**
> Answer honestly with the real number.

---

## Practice notes

- **Time yourself once, out loud.** Reading it in your head is always faster than saying it.
- **Rehearse the clicks**, not just the words. Fumbling to find a page is what actually eats your time.
- **Don't read this script during the demo.** Learn the six section headings; the words will come.
- **If something breaks live:** stay calm, say *"it's a live site, let me refresh"* — and keep going. Nobody marks you down for a slow network, but panicking shows.
- **Slow down at the two numbers that impress:** *45 fun facts*, *17 pages* (19 counting login and sign-up).
