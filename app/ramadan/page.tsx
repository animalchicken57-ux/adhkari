"use client";

import { useEffect, useState } from "react";
import { useT } from "@/components/LanguageProvider";

type Hijri = { year: number; month: number; day: number };

/** التاريخ الهجري ليوم معيّن حسب تقويم أم القرى */
function toHijri(d: Date): Hijri {
  const parts = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura-nu-latn", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).formatToParts(d);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return { year: get("year"), month: get("month"), day: get("day") };
}

const DAY = 86_400_000;

/** أوّل يوم من رمضان القادم (أو الحالي إن كنّا فيه) */
function findRamadan(from: Date): { start: Date; inside: boolean } | null {
  const today = toHijri(from);
  if (today.month === 9) {
    const start = new Date(from.getTime() - (today.day - 1) * DAY);
    return { start, inside: true };
  }
  // نبحث يومًا بيوم حتى نجد أوّل رمضان — أقل من سنة قمرية
  for (let i = 1; i <= 400; i++) {
    const d = new Date(from.getTime() + i * DAY);
    const h = toHijri(d);
    if (h.month === 9 && h.day === 1) return { start: d, inside: false };
  }
  return null;
}

function Box({ value, label }: { value: number; label: string }) {
  return (
    <div className="min-w-[72px] rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-4 text-center shadow-sm">
      <div className="text-3xl font-bold tabular-nums text-[var(--accent-strong)]">
        {String(value).padStart(2, "0")}
      </div>
      <div className="mt-1 text-xs text-[var(--muted)]">{label}</div>
    </div>
  );
}

export default function RamadanPage() {
  const t = useT();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // لا نحسب شيئًا قبل تحميل الصفحة في المتصفّح لتفادي اختلاف الخادم عن العميل
  if (!now) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">{t("ramadan.title")}</h1>
        <p className="mt-6 text-[var(--muted)]">{t("ramadan.loading")}</p>
      </div>
    );
  }

  const hijri = toHijri(now);
  const found = findRamadan(now);
  const inside = found?.inside ?? false;
  const target = found?.start;

  const diff = target && !inside ? target.getTime() - now.getTime() : 0;
  const days = Math.floor(diff / DAY);
  const hours = Math.floor((diff % DAY) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">{t("ramadan.title")}</h1>
        <p className="mt-1 text-[var(--muted)]">{t("ramadan.subtitle")}</p>
      </div>

      <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 text-center shadow-sm">
        <div className="text-6xl" aria-hidden>
          🌙
        </div>

        {inside ? (
          <>
            <p className="mt-4 text-2xl font-bold text-[var(--accent-strong)]">
              {t("ramadan.here")}
            </p>
            <p className="mt-2 text-[var(--muted)]">
              {t("ramadan.dayOf")} {hijri.day}
            </p>
          </>
        ) : (
          <>
            <p className="mt-4 text-[var(--muted)]">{t("ramadan.remaining")}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2" dir="ltr">
              <Box value={days} label={t("ramadan.days")} />
              <Box value={hours} label={t("ramadan.hours")} />
              <Box value={minutes} label={t("ramadan.minutes")} />
              <Box value={seconds} label={t("ramadan.seconds")} />
            </div>
          </>
        )}
      </div>

      <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 text-center shadow-sm">
        <p className="text-sm text-[var(--muted)]">{t("ramadan.todayIs")}</p>
        <p className="mt-1 text-lg font-bold text-[var(--foreground)]">
          {hijri.day} / {hijri.month} / {hijri.year} {t("ramadan.hijri")}
        </p>
      </div>

      <p className="mt-6 text-center text-sm leading-relaxed text-[var(--muted)]">
        {t("ramadan.note")}
      </p>
    </div>
  );
}
