"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LANGS, dir, type Lang } from "@/lib/i18n";

// نافذة اختيار اللغة عند أول زيارة (لا توجد كوكيز لغة بعد)
export default function LanguageGate() {
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasLang = document.cookie
      .split("; ")
      .some((c) => c.startsWith("lang="));
    if (!hasLang) setShow(true);
  }, []);

  if (!show) return null;

  function choose(l: Lang) {
    document.cookie = `lang=${l}; path=/; max-age=31536000`;
    document.documentElement.lang = l;
    document.documentElement.dir = dir(l);
    setShow(false);
    router.refresh();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 text-center shadow-xl">
        <div className="text-4xl">🕌</div>
        <h2 className="mt-3 text-xl font-bold text-[var(--foreground)]">
          اختر لغتك · Choose your language
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => choose(l.code)}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-lg font-semibold text-[var(--foreground)] transition hover:bg-[var(--hover)]"
            >
              {l.native}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
