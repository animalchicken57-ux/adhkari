"use client";

import { useEffect, useState } from "react";
import { useT } from "@/components/LanguageProvider";

type NameItem = {
  number: number;
  name: string;
  transliteration: string;
  meaning: string;
};

export default function NamesPage() {
  const t = useT();
  const [names, setNames] = useState<NameItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("https://api.aladhan.com/v1/asmaAlHusna");
        const j = await r.json();
        if (!Array.isArray(j.data)) throw new Error("bad");
        setNames(
          j.data.map(
            (d: {
              number: number;
              name: string;
              transliteration: string;
              en?: { meaning?: string };
            }) => ({
              number: d.number,
              name: d.name,
              transliteration: d.transliteration,
              meaning: d.en?.meaning ?? "",
            })
          )
        );
      } catch {
        setError(t("names.err"));
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">{t("names.title")}</h1>
        <p className="mt-1 text-[var(--muted)]">{t("names.subtitle")}</p>
      </div>

      {loading && <p className="py-10 text-center text-[var(--muted)]">{t("names.loading")}</p>}
      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-red-700">{error}</p>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {names.map((n) => (
          <div
            key={n.number}
            className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 text-center"
          >
            <div className="mb-1 flex items-center justify-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--hover)] text-xs text-[var(--muted)]">
                {n.number}
              </span>
              <span className="font-quran text-2xl text-[var(--accent-strong)]">{n.name}</span>
            </div>
            <div className="text-sm font-medium text-[var(--foreground)]">{n.transliteration}</div>
            <div className="text-xs text-[var(--muted)]">{n.meaning}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
