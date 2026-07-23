import type { HeatDay } from "@/lib/stats";
import type { TFunc } from "@/lib/i18n";

const LEVEL_CLASS = [
  "bg-[var(--hover)]", // 0 — لا شيء
  "bg-emerald-300/60", // 1 — جزئي
  "bg-emerald-500/80", // 2 — فئة كاملة
  "bg-emerald-700", // 3 — الصباح والمساء
];

export default function Heatmap({ days, t }: { days: HeatDay[]; t: TFunc }) {
  const levelLabels = [t("heat.l0"), t("heat.l1"), t("heat.l2"), t("heat.l3")];
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-bold text-[var(--foreground)]">{t("heatmap.title")}</h3>
        <div className="flex items-center gap-1 text-xs text-[var(--muted)]">
          <span>{t("heatmap.less")}</span>
          {LEVEL_CLASS.map((c, i) => (
            <span key={i} className={`h-3 w-3 rounded-sm ${c}`} />
          ))}
          <span>{t("heatmap.more")}</span>
        </div>
      </div>

      <div className="grid grid-flow-col grid-rows-7 justify-start gap-1.5">
        {days.map((d) => (
          <div
            key={d.day}
            title={`${d.day} — ${levelLabels[d.level]}`}
            className={`h-4 w-4 rounded-sm ${LEVEL_CLASS[d.level]}`}
            aria-label={`${d.day} — ${levelLabels[d.level]}`}
          />
        ))}
      </div>
    </div>
  );
}
