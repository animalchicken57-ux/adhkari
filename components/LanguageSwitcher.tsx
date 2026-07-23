"use client";

import { useRouter } from "next/navigation";
import { dir, type Lang } from "@/lib/i18n";
import { useLang } from "./LanguageProvider";

export default function LanguageSwitcher() {
  const router = useRouter();
  const { lang } = useLang();
  const other: Lang = lang === "ar" ? "en" : "ar";

  function switchTo(l: Lang) {
    document.cookie = `lang=${l}; path=/; max-age=31536000`;
    document.documentElement.lang = l;
    document.documentElement.dir = dir(l);
    router.refresh();
  }

  return (
    <button
      onClick={() => switchTo(other)}
      title="Language / اللغة"
      aria-label="Switch language"
      className="rounded-lg px-2 py-1 text-sm font-bold text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]"
    >
      {other === "ar" ? "ع" : "EN"}
    </button>
  );
}
