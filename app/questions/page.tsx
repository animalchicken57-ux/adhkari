"use client";

import { useState } from "react";
import { useT } from "@/components/LanguageProvider";

type AyahResult = {
  surahName: string;
  surahEnglish: string;
  ayahNumber: number;
  arabic: string;
  tafsir: string;
  english: string;
};

const EXAMPLES = [
  { label: "آية الكرسي", s: 2, a: 255 },
  { label: "الفاتحة", s: 1, a: 2 },
  { label: "الإخلاص", s: 112, a: 1 },
  { label: "الرحمن", s: 55, a: 13 },
  { label: "يس", s: 36, a: 9 },
];

export default function QuestionsPage() {
  const t = useT();
  const [surah, setSurah] = useState(2);
  const [ayah, setAyah] = useState(255);
  const [result, setResult] = useState<AyahResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function lookup(s: number, a: number) {
    if (s < 1 || s > 114 || a < 1) {
      setError(t("q.errRange"));
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const r = await fetch(
        `https://api.alquran.cloud/v1/ayah/${s}:${a}/editions/quran-uthmani,ar.muyassar,en.sahih`
      );
      const j = await r.json();
      if (j.code !== 200 || !Array.isArray(j.data)) {
        throw new Error("not found");
      }
      const [uthmani, muyassar, sahih] = j.data;
      setResult({
        surahName: uthmani.surah?.name ?? "",
        surahEnglish: uthmani.surah?.englishName ?? "",
        ayahNumber: uthmani.numberInSurah ?? a,
        arabic: uthmani.text ?? "",
        tafsir: muyassar?.text ?? "",
        english: sahih?.text ?? "",
      });
    } catch {
      setError(t("q.errNotFound"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">{t("q.title")}</h1>
        <p className="mt-1 text-[var(--muted)]">{t("q.subtitle")}</p>
      </div>

      {/* أمثلة سريعة */}
      <div className="mb-5 flex flex-wrap justify-center gap-2">
        {EXAMPLES.map((e) => (
          <button
            key={e.label}
            onClick={() => {
              setSurah(e.s);
              setAyah(e.a);
              lookup(e.s, e.a);
            }}
            className="rounded-full border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--muted)] hover:bg-[var(--hover)]"
          >
            {e.label}
          </button>
        ))}
      </div>

      {/* نموذج البحث */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          lookup(surah, ayah);
        }}
        className="mb-6 flex flex-wrap items-end justify-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4"
      >
        <label className="text-sm">
          <span className="mb-1 block text-[var(--muted)]">{t("q.surah")}</span>
          <input
            type="number"
            min={1}
            max={114}
            value={surah}
            onChange={(e) => setSurah(Number(e.target.value))}
            className="w-28 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[var(--foreground)] outline-none focus:border-emerald-500"
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-[var(--muted)]">{t("q.ayah")}</span>
          <input
            type="number"
            min={1}
            value={ayah}
            onChange={(e) => setAyah(Number(e.target.value))}
            className="w-28 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[var(--foreground)] outline-none focus:border-emerald-500"
          />
        </label>
        <button
          type="submit"
          className="rounded-xl bg-emerald-700 px-5 py-2.5 font-semibold text-white hover:bg-emerald-800"
        >
          {t("q.show")}
        </button>
      </form>

      {loading && <p className="py-8 text-center text-[var(--muted)]">{t("q.searching")}</p>}
      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-red-700">
          {error}
        </p>
      )}

      {result && !loading && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 text-center">
            <div className="mb-3 text-sm font-medium text-[var(--accent-strong)]">
              {t("q.surahLabel")} {result.surahName} — {t("q.ayahLabel")} {result.ayahNumber}
            </div>
            <p className="font-quran text-3xl leading-loose text-[var(--foreground)]">
              {result.arabic}
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--done)] p-6">
            <h3 className="mb-2 font-bold text-[var(--foreground)]">{t("q.meaning")}</h3>
            <p className="leading-loose text-[var(--foreground)]">{result.tafsir}</p>
          </div>

          {result.english && (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
              <h3 className="mb-2 font-bold text-[var(--foreground)]">{t("q.english")}</h3>
              <p dir="ltr" className="text-left leading-relaxed text-[var(--muted)]">
                {result.english}
              </p>
            </div>
          )}
        </div>
      )}

      <p className="mt-6 text-center text-xs text-[var(--muted)]">{t("q.source")}</p>
    </div>
  );
}
