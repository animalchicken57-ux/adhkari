"use client";

import { createContext, useContext, useMemo } from "react";
import { getT, type Lang, type TFunc } from "@/lib/i18n";

const Ctx = createContext<{ lang: Lang; t: TFunc }>({
  lang: "ar",
  t: getT("ar"),
});

export function LanguageProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ lang, t: getT(lang) }), [lang]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}

export function useT(): TFunc {
  return useContext(Ctx).t;
}
