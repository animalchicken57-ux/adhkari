import type { Stats } from "./stats";

// ============================================================
//  حديقة الأذكار: تنمو مع سلسلتك الحالية
//  Adhkar Garden: grows with your current streak
// ============================================================

export type GardenStage = {
  emoji: string;
  // مفتاح ترجمة لوصف المرحلة
  labelKey: string;
  // الحدّ الأدنى للسلسلة لبلوغ هذه المرحلة
  min: number;
};

// مراحل نموّ النبتة الرئيسية حسب السلسلة الحالية
export const GARDEN_STAGES: GardenStage[] = [
  { emoji: "🏜️", labelKey: "garden.s0", min: 0 },
  { emoji: "🌱", labelKey: "garden.s1", min: 1 },
  { emoji: "🌿", labelKey: "garden.s2", min: 3 },
  { emoji: "🌸", labelKey: "garden.s3", min: 7 },
  { emoji: "🌷", labelKey: "garden.s4", min: 14 },
  { emoji: "🌳", labelKey: "garden.s5", min: 30 },
  { emoji: "🌴", labelKey: "garden.s6", min: 100 },
];

export function gardenStage(streak: number): GardenStage {
  let stage = GARDEN_STAGES[0];
  for (const s of GARDEN_STAGES) if (streak >= s.min) stage = s;
  return stage;
}

// المرحلة التالية والأيام المتبقية للوصول إليها (لعرض «متبقٍّ يومان»)
export function nextGardenStage(
  streak: number
): { stage: GardenStage; daysLeft: number } | null {
  for (const s of GARDEN_STAGES) {
    if (s.min > streak) return { stage: s, daysLeft: s.min - streak };
  }
  return null;
}

// صفّ من الزهور يمثّل الأيام المكتملة (بحدٍّ أقصى للعرض)
export function gardenFlowers(fullDays: number, max = 14): string[] {
  const n = Math.min(fullDays, max);
  return Array.from({ length: n }, (_, i) => (i % 3 === 0 ? "🌷" : i % 3 === 1 ? "🌸" : "🌻"));
}

// ============================================================
//  الأوسمة (مكافآت افتراضية) — بديل بطاقات الهدايا
//  Badges (virtual rewards)
// ============================================================

export type Badge = {
  id: string;
  icon: string;
  title: { ar: string; en: string };
  desc: { ar: string; en: string };
  metric: "currentStreak" | "longestStreak" | "fullDays" | "totalCompletions" | "totalRepetitions";
  threshold: number;
};

export const BADGES: Badge[] = [
  {
    id: "first-day",
    icon: "🌱",
    title: { ar: "البداية", en: "First Step" },
    desc: { ar: "أتممت أول يوم كامل", en: "Completed your first full day" },
    metric: "fullDays",
    threshold: 1,
  },
  {
    id: "streak-3",
    icon: "🔥",
    title: { ar: "ثلاثة أيام", en: "3-Day Streak" },
    desc: { ar: "سلسلة ٣ أيام متتالية", en: "A 3-day streak" },
    metric: "longestStreak",
    threshold: 3,
  },
  {
    id: "streak-7",
    icon: "⭐",
    title: { ar: "أسبوع كامل", en: "Full Week" },
    desc: { ar: "سلسلة ٧ أيام متتالية", en: "A 7-day streak" },
    metric: "longestStreak",
    threshold: 7,
  },
  {
    id: "streak-30",
    icon: "🏅",
    title: { ar: "شهر من الوفاء", en: "Faithful Month" },
    desc: { ar: "سلسلة ٣٠ يومًا متتالية", en: "A 30-day streak" },
    metric: "longestStreak",
    threshold: 30,
  },
  {
    id: "streak-100",
    icon: "👑",
    title: { ar: "مئة يوم", en: "Century" },
    desc: { ar: "سلسلة ١٠٠ يوم — ما شاء الله", en: "A 100-day streak — Mashallah" },
    metric: "longestStreak",
    threshold: 100,
  },
  {
    id: "days-15",
    icon: "📅",
    title: { ar: "خمسة عشر يومًا", en: "15 Days" },
    desc: { ar: "١٥ يومًا مكتملًا", en: "15 completed days" },
    metric: "fullDays",
    threshold: 15,
  },
  {
    id: "reps-1000",
    icon: "📿",
    title: { ar: "ألف تسبيحة", en: "1,000 Dhikr" },
    desc: { ar: "سبّحت الله ١٠٠٠ مرّة", en: "Glorified Allah 1,000 times" },
    metric: "totalRepetitions",
    threshold: 1000,
  },
  {
    id: "reps-10000",
    icon: "💎",
    title: { ar: "عشرة آلاف", en: "10,000 Dhikr" },
    desc: { ar: "سبّحت الله ١٠٠٠٠ مرّة", en: "Glorified Allah 10,000 times" },
    metric: "totalRepetitions",
    threshold: 10000,
  },
];

export type BadgeState = Badge & { earned: boolean; value: number };

export function evaluateBadges(stats: Stats): BadgeState[] {
  return BADGES.map((b) => {
    const value = stats[b.metric];
    return { ...b, value, earned: value >= b.threshold };
  });
}
