"use client";

import { useEffect, useState } from "react";
import { useT } from "@/components/LanguageProvider";

type Timings = Record<string, string>;

const PRAYERS: { key: string; icon: string }[] = [
  { key: "Fajr", icon: "🌄" },
  { key: "Sunrise", icon: "🌅" },
  { key: "Dhuhr", icon: "☀️" },
  { key: "Asr", icon: "🌤️" },
  { key: "Maghrib", icon: "🌇" },
  { key: "Isha", icon: "🌙" },
];

// أوقات لحساب "الصلاة القادمة" (بدون الشروق)
const NEXT_ORDER = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

function to12h(time: string, am: string, pm: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h < 12 ? am : pm;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

function minutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

export default function PrayerTimesPage() {
  const t = useT();
  const [timings, setTimings] = useState<Timings | null>(null);
  const [place, setPlace] = useState("");
  const [dateLabel, setDateLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState("Dubai");
  const [country, setCountry] = useState("United Arab Emirates");

  async function loadByCoords(lat: number, lon: number) {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(
        `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`
      );
      const j = await r.json();
      setTimings(j.data.timings);
      setDateLabel(j.data.date?.readable ?? "");
      setPlace(j.data.meta?.timezone ?? "");
    } catch {
      setError(t("prayer.errFetch"));
    } finally {
      setLoading(false);
    }
  }

  async function loadByCity(c: string, co: string) {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(
          c
        )}&country=${encodeURIComponent(co)}&method=2`
      );
      const j = await r.json();
      if (!j.data?.timings) throw new Error("no data");
      setTimings(j.data.timings);
      setDateLabel(j.data.date?.readable ?? "");
      setPlace(`${c} — ${co}`);
    } catch {
      setError(t("prayer.errCity"));
    } finally {
      setLoading(false);
    }
  }

  // محاولة تحديد الموقع تلقائيًا عند الفتح
  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => loadByCoords(pos.coords.latitude, pos.coords.longitude),
        () => loadByCity("Dubai", "United Arab Emirates"),
        { timeout: 8000 }
      );
    } else {
      loadByCity("Dubai", "United Arab Emirates");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // حساب الصلاة القادمة
  let nextKey = "";
  if (timings) {
    const now = new Date().getHours() * 60 + new Date().getMinutes();
    nextKey =
      NEXT_ORDER.find((k) => timings[k] && minutes(timings[k]) > now) || "Fajr";
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">{t("prayer.title")}</h1>
        <p className="mt-1 text-[var(--muted)]">
          {place ? place : t("prayer.locating")}
          {dateLabel ? ` · ${dateLabel}` : ""}
        </p>
      </div>

      {/* إدخال المدينة يدويًا */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loadByCity(city, country);
        }}
        className="mb-6 flex flex-wrap items-end justify-center gap-2"
      >
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder={t("prayer.cityPh")}
          className="w-32 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-emerald-500"
        />
        <input
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder={t("prayer.countryPh")}
          className="w-40 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-emerald-500"
        />
        <button
          type="submit"
          className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          {t("prayer.show")}
        </button>
      </form>

      {loading && (
        <p className="py-10 text-center text-[var(--muted)]">{t("prayer.loading")}</p>
      )}
      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-red-700">
          {error}
        </p>
      )}

      {timings && !loading && (
        <div className="space-y-2">
          {PRAYERS.map((p) => {
            const isNext = p.key === nextKey;
            return (
              <div
                key={p.key}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 transition ${
                  isNext
                    ? "border-[var(--accent)] bg-[var(--done)]"
                    : "border-[var(--border)] bg-[var(--card)]"
                }`}
              >
                <span className="flex items-center gap-2 font-semibold text-[var(--foreground)]">
                  <span className="text-xl">{p.icon}</span>
                  {t(`prayer.${p.key}`)}
                  {isNext && (
                    <span className="rounded-full bg-emerald-700 px-2 py-0.5 text-xs text-white">
                      {t("prayer.next")}
                    </span>
                  )}
                </span>
                <span className="text-lg font-bold text-[var(--accent-strong)]">
                  {timings[p.key]
                    ? to12h(timings[p.key], t("time.am"), t("time.pm"))
                    : "—"}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <p className="mt-6 text-center text-xs text-[var(--muted)]">{t("prayer.note")}</p>
    </div>
  );
}
