"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useT } from "@/components/LanguageProvider";

export type NavItem = { href: string; key: string; icon: string };

export const NAV_ITEMS: NavItem[] = [
  { href: "/adhkar", key: "nav.adhkar", icon: "📿" },
  { href: "/tasbih", key: "nav.tasbih", icon: "🔢" },
  { href: "/prayer-times", key: "nav.prayer", icon: "🕐" },
  { href: "/questions", key: "nav.ayahs", icon: "📖" },
  { href: "/names", key: "nav.names", icon: "✨" },
  { href: "/prophets", key: "nav.prophets", icon: "🌟" },
  { href: "/ramadan", key: "nav.ramadan", icon: "🌙" },
  { href: "/books", key: "nav.books", icon: "📚" },
  { href: "/scriptures", key: "nav.scriptures", icon: "📜" },
  { href: "/fun-facts", key: "nav.facts", icon: "💡" },
  { href: "/duas", key: "nav.duas", icon: "🤲" },
  { href: "/favourites", key: "nav.favourites", icon: "♥" },
  { href: "/qibla", key: "nav.qibla", icon: "🧭" },
  { href: "/share", key: "nav.share", icon: "📤" },
  { href: "/about", key: "nav.about", icon: "ℹ️" },
  { href: "/profile", key: "nav.profile", icon: "👤" },
  { href: "/support", key: "nav.support", icon: "💬" },
];

export default function NavMenu({ children }: { children: React.ReactNode }) {
  const t = useT();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // نغلق القائمة عند الانتقال لصفحة أخرى
  useEffect(() => setOpen(false), [pathname]);

  // نمنع تمرير الصفحة خلف القائمة المفتوحة
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const itemCls = (href: string) =>
    [
      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-base transition",
      pathname === href
        ? "bg-[var(--done)] font-bold text-[var(--accent-strong)]"
        : "text-[var(--foreground)] hover:bg-[var(--hover)]",
    ].join(" ");

  const deskCls = (href: string) =>
    [
      "rounded-lg px-2 py-1 transition",
      pathname === href
        ? "font-bold text-[var(--accent-strong)]"
        : "text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]",
    ].join(" ");

  return (
    <>
      {/* شاشات واسعة: روابط ظاهرة */}
      <div className="hidden flex-wrap items-center justify-center gap-x-1 gap-y-1 text-sm lg:flex">
        {NAV_ITEMS.map((it) => (
          <Link key={it.href} href={it.href} className={deskCls(it.href)}>
            {t(it.key)}
          </Link>
        ))}
        {children}
      </div>

      {/* شاشات صغيرة: زرّ القائمة */}
      <button
        onClick={() => setOpen(true)}
        aria-label={t("nav.menu")}
        aria-expanded={open}
        className="rounded-xl border border-[var(--border)] px-3 py-2 text-xl leading-none text-[var(--foreground)] hover:bg-[var(--hover)] lg:hidden"
      >
        ☰
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label={t("nav.close")}
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-black/50 backdrop-blur-sm"
          />
          <div className="absolute inset-x-0 top-0 max-h-[88vh] overflow-y-auto rounded-b-3xl border-b border-[var(--border)] bg-[var(--background)] p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-bold text-[var(--accent-strong)]">
                {t("brand")}
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label={t("nav.close")}
                className="rounded-lg px-3 py-1 text-2xl leading-none text-[var(--muted)] hover:bg-[var(--hover)]"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
              {NAV_ITEMS.map((it) => (
                <Link key={it.href} href={it.href} className={itemCls(it.href)}>
                  <span aria-hidden>{it.icon}</span>
                  <span className="truncate">{t(it.key)}</span>
                </Link>
              ))}
            </div>

            <div className="mt-3 border-t border-[var(--border)] pt-3">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
