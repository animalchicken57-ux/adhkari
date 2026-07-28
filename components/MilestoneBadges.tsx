import { evaluateBadges } from "@/lib/garden";
import type { Stats } from "@/lib/stats";
import type { Lang, TFunc } from "@/lib/i18n";

// شبكة الأوسمة: المكتسبة ملوّنة، والمقفلة باهتة مع شريط تقدّم
export default function MilestoneBadges({
  stats,
  t,
  lang,
}: {
  stats: Stats;
  t: TFunc;
  lang: Lang;
}) {
  const badges = evaluateBadges(stats);
  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[var(--foreground)]">
          {t("badges.title")}
        </h2>
        <span className="text-sm text-[var(--muted)]">
          {t("badges.count", { earned: earnedCount, total: badges.length })}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {badges.map((b) => {
          const pct = Math.min(100, Math.round((b.value / b.threshold) * 100));
          return (
            <div
              key={b.id}
              className={`rounded-2xl border p-4 text-center transition ${
                b.earned
                  ? "border-[var(--accent)] bg-[var(--done)]"
                  : "border-[var(--border)] bg-[var(--card)]"
              }`}
              title={b.desc[lang] ?? b.desc.ar}
            >
              <div className={`text-3xl ${b.earned ? "" : "opacity-30 grayscale"}`}>
                {b.icon}
              </div>
              <div className="mt-1 text-xs font-bold text-[var(--foreground)]">
                {b.title[lang] ?? b.title.ar}
              </div>
              {b.earned ? (
                <div className="mt-1 text-[11px] font-medium text-[var(--accent-strong)]">
                  ✓ {t("badges.earned")}
                </div>
              ) : (
                <div className="mt-2">
                  <div className="progress-track h-1.5 w-full">
                    <div className="progress-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="mt-1 text-[10px] text-[var(--muted)]">
                    {b.value} / {b.threshold}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
