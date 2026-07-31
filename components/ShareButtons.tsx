"use client";

import { useState } from "react";
import { useT } from "@/components/LanguageProvider";

export default function ShareButtons({ url }: { url: string }) {
  const t = useT();
  const [copied, setCopied] = useState(false);

  const text = t("share.message");

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* المتصفّح منع النسخ */
    }
  }

  async function nativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: t("brand"), text, url });
        return;
      } catch {
        /* أغلق المستخدم نافذة المشاركة */
      }
    }
    copy();
  }

  const msg = encodeURIComponent(`${text} ${url}`);
  const links = [
    { id: "wa", label: "WhatsApp", icon: "💬", href: `https://wa.me/?text=${msg}` },
    {
      id: "tg",
      label: "Telegram",
      icon: "✈️",
      href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    },
    { id: "x", label: "X", icon: "𝕏", href: `https://twitter.com/intent/tweet?text=${msg}` },
  ];

  return (
    <div className="mt-6">
      <button
        onClick={nativeShare}
        className="w-full rounded-2xl bg-emerald-700 px-6 py-4 text-lg font-bold text-white shadow-sm transition hover:bg-emerald-800 active:scale-95"
      >
        📤 {t("share.button")}
      </button>

      <button
        onClick={copy}
        className="mt-3 w-full rounded-2xl border border-[var(--border)] px-6 py-3 font-medium text-[var(--foreground)] transition hover:bg-[var(--hover)]"
      >
        {copied ? `✅ ${t("share.copied")}` : `🔗 ${t("share.copy")}`}
      </button>

      <div className="mt-4 flex justify-center gap-3">
        {links.map((l) => (
          <a
            key={l.id}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={l.label}
            className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-5 py-3 text-xl shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            {l.icon}
          </a>
        ))}
      </div>
    </div>
  );
}
