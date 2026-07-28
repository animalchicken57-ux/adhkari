"use client";

import { useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import {
  MOTIVATIONAL,
  SUNNAH_FACTS,
  HADITHS,
  dayOfYear,
  pick,
  tr,
} from "@/lib/encouragement";

type Kind = "motivation" | "sunnah" | "hadith";

// بطاقة محتوى تحفيزي: عبارة مشجّعة، أو حقيقة عن سنّة، أو حديث.
// تبدأ بعنصر اليوم (ثابت لتفادي اختلاف الخادم/العميل) ويمكن تبديله.
export default function EncouragementCard({ kind }: { kind: Kind }) {
  const { lang, t } = useLang();
  const [seed, setSeed] = useState(() => dayOfYear());

  if (kind === "hadith") {
    const h = pick(HADITHS, seed);
    return (
      <Shell
        badge={t("enc.hadithBadge")}
        onShuffle={() => setSeed((s) => s + 1)}
        shuffleLabel={t("enc.another")}
      >
        <p className="font-quran text-xl leading-loose text-[var(--foreground)]">
          «{tr(h.text, lang)}»
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">— {tr(h.source, lang)}</p>
      </Shell>
    );
  }

  if (kind === "sunnah") {
    const f = pick(SUNNAH_FACTS, seed);
    return (
      <Shell
        badge={t("enc.sunnahBadge")}
        onShuffle={() => setSeed((s) => s + 1)}
        shuffleLabel={t("enc.another")}
      >
        <p className="text-lg leading-relaxed text-[var(--foreground)]">
          {tr(f, lang)}
        </p>
      </Shell>
    );
  }

  const m = pick(MOTIVATIONAL, seed);
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--done)] px-5 py-4">
      <span className="text-2xl">✨</span>
      <p className="flex-1 text-[var(--foreground)]">{tr(m, lang)}</p>
      <button
        type="button"
        onClick={() => setSeed((s) => s + 1)}
        aria-label={t("enc.another")}
        title={t("enc.another")}
        className="shrink-0 rounded-lg px-2 py-1 text-lg text-[var(--muted)] transition hover:bg-[var(--hover)] hover:text-[var(--foreground)]"
      >
        ↻
      </button>
    </div>
  );
}

function Shell({
  badge,
  children,
  onShuffle,
  shuffleLabel,
}: {
  badge: string;
  children: React.ReactNode;
  onShuffle: () => void;
  shuffleLabel: string;
}) {
  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="inline-block rounded-full bg-[var(--done)] px-3 py-1 text-xs font-medium text-[var(--accent-strong)]">
          {badge}
        </span>
        <button
          type="button"
          onClick={onShuffle}
          className="rounded-lg px-2 py-1 text-sm text-[var(--muted)] transition hover:bg-[var(--hover)] hover:text-[var(--foreground)]"
        >
          ↻ {shuffleLabel}
        </button>
      </div>
      {children}
    </div>
  );
}
