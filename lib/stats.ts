import type { Category } from "./types";

export type CompletionRow = { day: string; category: Category };

export type Stats = {
  totalCompletions: number;
  activeDays: number;
  currentStreak: number;
  longestStreak: number;
  fullDays: number;
};

function addDays(day: string, delta: number): string {
  const [y, m, d] = day.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + delta);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${dt.getUTCFullYear()}-${p(dt.getUTCMonth() + 1)}-${p(dt.getUTCDate())}`;
}

/**
 * يحسب الإحصاءات من سجلّات الإتمام.
 * "اليوم المكتمل" = المستخدم أتمّ كل أذكار الصباح أو كل أذكار المساء.
 */
export function computeStats(
  rows: CompletionRow[],
  totals: { morning: number; evening: number },
  today: string
): Stats {
  const byDay = new Map<string, { morning: number; evening: number }>();
  for (const r of rows) {
    const e = byDay.get(r.day) ?? { morning: 0, evening: 0 };
    e[r.category] += 1;
    byDay.set(r.day, e);
  }

  const qualifies = (day: string) => {
    const e = byDay.get(day);
    if (!e) return false;
    return (
      (totals.morning > 0 && e.morning >= totals.morning) ||
      (totals.evening > 0 && e.evening >= totals.evening)
    );
  };

  const fullDaysSet = [...byDay.keys()].filter(qualifies).sort();

  // أطول سلسلة
  let longest = 0;
  let run = 0;
  let prev: string | null = null;
  for (const day of fullDaysSet) {
    if (prev && addDays(prev, 1) === day) run += 1;
    else run = 1;
    longest = Math.max(longest, run);
    prev = day;
  }

  // السلسلة الحالية (تنتهي اليوم أو أمس)
  let current = 0;
  let cursor = qualifies(today) ? today : addDays(today, -1);
  while (qualifies(cursor)) {
    current += 1;
    cursor = addDays(cursor, -1);
  }

  return {
    totalCompletions: rows.length,
    activeDays: byDay.size,
    currentStreak: current,
    longestStreak: longest,
    fullDays: fullDaysSet.length,
  };
}
