"use client";

import { useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import { tr } from "@/lib/books";
import { FUN_FACTS } from "@/lib/funfacts";

export default function FunFactsPage() {
  const { lang, t } = useLang();
  const [index, setIndex] = useState<number | null>(null);
  const [seen, setSeen] = useState<string[]>([]);
  const [spin, setSpin] = useState(0);

  function nextFact() {
    // نتجنّب تكرار ما ظهر حتى تنتهي القائمة، ثم نبدأ من جديد
    const pool = FUN_FACTS.filter((f) => !seen.includes(f.id));
    const list = pool.length ? pool : FUN_FACTS;
    const pick = list[Math.floor(Math.random() * list.length)];
    setIndex(FUN_FACTS.indexOf(pick));
    setSeen(pool.length ? [...seen, pick.id] : [pick.id]);
    setSpin((s) => s + 1);
  }

  const fact = index === null ? null : FUN_FACTS[index];

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">{t("facts.title")}</h1>
        <p className="mt-1 text-[var(--muted)]">{t("facts.subtitle")}</p>
      </div>

      <div
        key={spin}
        className="animate-[fadeIn_.35s_ease] rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 text-center shadow-sm"
      >
        {fact ? (
          <>
            <div className="text-6xl" aria-hidden>
              {fact.emoji}
            </div>
            <p className="mt-4 text-lg leading-loose text-[var(--foreground)]">
              {tr(fact.text, lang)}
            </p>
          </>
        ) : (
          <p className="text-lg text-[var(--muted)]">{t("facts.empty")}</p>
        )}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={nextFact}
          className="rounded-2xl bg-[var(--accent-strong)] px-8 py-3 text-lg font-bold text-white shadow-sm transition hover:opacity-90 active:scale-95"
        >
          {fact ? t("facts.again") : t("facts.start")}
        </button>
        <p className="mt-3 text-sm text-[var(--muted)]">
          {t("facts.counter")}: {seen.length} / {FUN_FACTS.length}
        </p>
      </div>

      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
