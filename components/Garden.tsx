import { gardenStage, nextGardenStage, gardenFlowers } from "@/lib/garden";
import type { Stats } from "@/lib/stats";
import type { Lang, TFunc } from "@/lib/i18n";

// حديقة الأذكار: نبتة رئيسية تنمو مع السلسلة + صفّ زهور للأيام المكتملة
export default function Garden({
  stats,
  t,
}: {
  stats: Stats;
  t: TFunc;
  lang: Lang;
}) {
  const stage = gardenStage(stats.currentStreak);
  const next = nextGardenStage(stats.currentStreak);
  const flowers = gardenFlowers(stats.fullDays);

  return (
    <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-b from-[var(--done)] to-[var(--card)] p-6 text-center shadow-sm">
      <div className="mb-1 flex items-center justify-center gap-2">
        <span className="text-sm font-bold text-[var(--accent-strong)]">
          🌿 {t("garden.title")}
        </span>
      </div>

      {/* النبتة الرئيسية */}
      <div className="my-2 text-7xl leading-none" aria-hidden>
        {stage.emoji}
      </div>
      <p className="text-[var(--foreground)]">
        {stats.currentStreak > 0
          ? t("garden.grown", { n: stats.currentStreak })
          : t("garden.empty")}
      </p>
      <p className="mt-1 text-sm text-[var(--muted)]">{t(stage.labelKey)}</p>

      {/* تربة الحديقة: زهور الأيام المكتملة */}
      {flowers.length > 0 && (
        <div className="mt-4 flex flex-wrap items-end justify-center gap-1 rounded-2xl bg-[var(--hover)] px-3 py-3 text-2xl">
          {flowers.map((f, i) => (
            <span key={i} aria-hidden>
              {f}
            </span>
          ))}
        </div>
      )}

      {/* المرحلة التالية */}
      {next && (
        <p className="mt-4 text-xs text-[var(--muted)]">
          {t("garden.next", { emoji: next.stage.emoji, n: next.daysLeft })}
        </p>
      )}
    </div>
  );
}
