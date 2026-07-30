"use client";

import Link from "next/link";
import { useT } from "@/components/LanguageProvider";
import { NAV_ITEMS } from "@/components/NavMenu";

/** شبكة روابط لكل أقسام التطبيق — تسهّل الوصول من الصفحة الرئيسية */
export default function ExploreGrid() {
  const t = useT();
  const items = NAV_ITEMS.filter(
    (i) => i.href !== "/profile" && i.href !== "/support"
  );

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--accent-strong)] hover:shadow-md"
        >
          <div className="text-3xl transition group-hover:scale-110" aria-hidden>
            {it.icon}
          </div>
          <div className="mt-2 text-sm font-medium text-[var(--foreground)]">
            {t(it.key)}
          </div>
        </Link>
      ))}
    </div>
  );
}
