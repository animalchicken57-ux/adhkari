"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-label="تبديل الوضع الليلي"
      title={dark ? "الوضع النهاري" : "الوضع الليلي"}
      className="rounded-lg px-2 py-1 text-lg text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
