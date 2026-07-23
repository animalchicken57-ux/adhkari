import type { HeatDay } from "@/lib/stats";

const LEVEL_CLASS = [
  "bg-[var(--hover)]", // 0 — لا شيء
  "bg-emerald-300/60", // 1 — جزئي
  "bg-emerald-500/80", // 2 — فئة كاملة
  "bg-emerald-700", // 3 — الصباح والمساء
];

const WEEKDAYS = ["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"];

export default function Heatmap({ days }: { days: HeatDay[] }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-bold text-[var(--foreground)]">آخر ٥ أسابيع</h3>
        <div className="flex items-center gap-1 text-xs text-[var(--muted)]">
          <span>أقل</span>
          {LEVEL_CLASS.map((c, i) => (
            <span key={i} className={`h-3 w-3 rounded-sm ${c}`} />
          ))}
          <span>أكثر</span>
        </div>
      </div>

      {/* شبكة: 7 أعمدة (أيام الأسبوع) */}
      <div className="grid grid-flow-col grid-rows-7 justify-start gap-1.5">
        {days.map((d) => {
          const date = new Date(d.day + "T00:00:00");
          const label = `${d.day} — ${
            ["لا شيء", "جزئي", "فئة كاملة", "صباح ومساء"][d.level]
          }`;
          return (
            <div
              key={d.day}
              title={label}
              className={`h-4 w-4 rounded-sm ${LEVEL_CLASS[d.level]}`}
              aria-label={label}
              data-weekday={WEEKDAYS[date.getDay()]}
            />
          );
        })}
      </div>
    </div>
  );
}
