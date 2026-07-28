"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LanguageProvider";

type Prefs = { enabled: boolean; morning: string; evening: string };

const KEY = "adhkari-reminders";
const DEFAULTS: Prefs = { enabled: false, morning: "07:00", evening: "18:00" };

function load(): Prefs {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

// عدد المللي ثانية حتى وقت HH:MM القادم
function msUntil(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  const now = new Date();
  const next = new Date();
  next.setHours(h, m, 0, 0);
  if (next.getTime() <= now.getTime()) next.setDate(next.getDate() + 1);
  return next.getTime() - now.getTime();
}

async function showReminder(title: string, body: string) {
  const opts: NotificationOptions = { body, icon: "/icon-192.png", badge: "/icon-192.png" };
  try {
    if ("serviceWorker" in navigator) {
      const reg = await navigator.serviceWorker.ready;
      await reg.showNotification(title, opts);
      return;
    }
  } catch {
    /* تجاهل ثم استخدم البديل */
  }
  try {
    new Notification(title, opts);
  } catch {
    /* المتصفح لا يدعم */
  }
}

export default function ReminderSettings() {
  const { t } = useLang();
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">("default");
  const [mounted, setMounted] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    setMounted(true);
    setPrefs(load());
    if (typeof Notification === "undefined") setPermission("unsupported");
    else setPermission(Notification.permission);
  }, []);

  // إعادة جدولة المنبّهات كلّما تغيّرت التفضيلات أو الإذن
  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (!prefs.enabled || permission !== "granted") return;

    const schedule = (time: string, title: string, body: string) => {
      const fire = () => {
        showReminder(title, body);
        // إعادة الجدولة لليوم التالي
        timers.current.push(setTimeout(fire, 24 * 60 * 60 * 1000));
      };
      timers.current.push(setTimeout(fire, msUntil(time)));
    };

    schedule(prefs.morning, t("reminder.morningTitle"), t("reminder.morningBody"));
    schedule(prefs.evening, t("reminder.eveningTitle"), t("reminder.eveningBody"));

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [prefs, permission, t]);

  function save(next: Prefs) {
    setPrefs(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* تجاهل */
    }
  }

  async function enable() {
    if (permission === "unsupported") return;
    const res = await Notification.requestPermission();
    setPermission(res);
    if (res === "granted") {
      save({ ...prefs, enabled: true });
      showReminder(t("reminder.onTitle"), t("reminder.onBody"));
    }
  }

  if (!mounted) return null;

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <div className="mb-1 flex items-center gap-2">
        <span className="text-xl">🔔</span>
        <h2 className="text-lg font-bold text-[var(--foreground)]">{t("reminder.title")}</h2>
      </div>
      <p className="mb-4 text-sm text-[var(--muted)]">{t("reminder.subtitle")}</p>

      {permission === "unsupported" ? (
        <p className="rounded-xl bg-[var(--hover)] p-3 text-sm text-[var(--muted)]">
          {t("reminder.unsupported")}
        </p>
      ) : permission !== "granted" ? (
        <button
          type="button"
          onClick={enable}
          className="rounded-xl bg-emerald-700 px-5 py-2.5 font-semibold text-white transition hover:bg-emerald-800"
        >
          {t("reminder.enable")}
        </button>
      ) : (
        <div className="space-y-4">
          <label className="flex cursor-pointer items-center justify-between gap-3">
            <span className="text-[var(--foreground)]">{t("reminder.active")}</span>
            <input
              type="checkbox"
              checked={prefs.enabled}
              onChange={(e) => save({ ...prefs, enabled: e.target.checked })}
              className="h-5 w-5 accent-emerald-700"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <TimeField
              label={`☀️ ${t("reminder.morning")}`}
              value={prefs.morning}
              onChange={(v) => save({ ...prefs, morning: v })}
            />
            <TimeField
              label={`🌙 ${t("reminder.evening")}`}
              value={prefs.evening}
              onChange={(v) => save({ ...prefs, evening: v })}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => showReminder(t("reminder.testTitle"), t("reminder.testBody"))}
              className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--hover)]"
            >
              {t("reminder.test")}
            </button>
          </div>

          <p className="text-xs text-[var(--muted)]">{t("reminder.note")}</p>
        </div>
      )}
    </div>
  );
}

function TimeField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-[var(--muted)]">{label}</span>
      <input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)]"
      />
    </label>
  );
}
