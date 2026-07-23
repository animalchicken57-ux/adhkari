"use client";

import { useEffect, useState } from "react";

const PRESETS = [
  "سُبْحَانَ اللَّهِ",
  "الْحَمْدُ لِلَّهِ",
  "لَا إِلَٰهَ إِلَّا اللَّهُ",
  "اللَّهُ أَكْبَرُ",
  "أَسْتَغْفِرُ اللَّهَ",
  "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
  "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
  "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ",
];

const TARGETS = [33, 99, 100, 0]; // 0 = بلا حدّ

export default function TasbihPage() {
  const [dhikr, setDhikr] = useState(PRESETS[0]);
  const [count, setCount] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [target, setTarget] = useState(33);
  const [vibrate, setVibrate] = useState(true);

  // استرجاع الحالة
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("tasbih") || "{}");
      if (s.dhikr) setDhikr(s.dhikr);
      if (typeof s.count === "number") setCount(s.count);
      if (typeof s.rounds === "number") setRounds(s.rounds);
      if (typeof s.target === "number") setTarget(s.target);
      if (typeof s.vibrate === "boolean") setVibrate(s.vibrate);
    } catch {}
  }, []);

  // حفظ الحالة
  useEffect(() => {
    localStorage.setItem(
      "tasbih",
      JSON.stringify({ dhikr, count, rounds, target, vibrate })
    );
  }, [dhikr, count, rounds, target, vibrate]);

  function buzz(ms: number | number[]) {
    if (vibrate && typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(ms);
    }
  }

  function tap() {
    setCount((c) => {
      const next = c + 1;
      if (target > 0 && next >= target) {
        buzz([90, 40, 90]); // اهتزاز الإكمال
        setRounds((r) => r + 1);
        return 0;
      }
      buzz(25);
      return next;
    });
  }

  function resetAll() {
    setCount(0);
    setRounds(0);
  }

  const pct = target > 0 ? Math.round((count / target) * 100) : 0;

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">المسبحة الرقمية</h1>
        <p className="mt-1 text-[var(--muted)]">اختر ذِكرًا واضغط للعدّ. يُحفظ تلقائيًا.</p>
      </div>

      {/* اختيار الذكر */}
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {PRESETS.map((p) => (
          <button
            key={p}
            onClick={() => {
              setDhikr(p);
              setCount(0);
            }}
            className={`rounded-full border px-3 py-1.5 text-sm font-quran transition ${
              dhikr === p
                ? "border-[var(--accent)] bg-[var(--done)] text-[var(--foreground)]"
                : "border-[var(--border)] text-[var(--muted)] hover:bg-[var(--hover)]"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* اختيار الهدف */}
      <div className="mb-5 flex items-center justify-center gap-2 text-sm">
        <span className="text-[var(--muted)]">الهدف:</span>
        {TARGETS.map((t) => (
          <button
            key={t}
            onClick={() => {
              setTarget(t);
              setCount(0);
            }}
            className={`rounded-lg border px-3 py-1 font-semibold transition ${
              target === t
                ? "border-[var(--accent)] bg-[var(--done)] text-[var(--foreground)]"
                : "border-[var(--border)] text-[var(--muted)] hover:bg-[var(--hover)]"
            }`}
          >
            {t === 0 ? "∞" : t}
          </button>
        ))}
      </div>

      {/* زر العدّ الكبير */}
      <button
        onClick={tap}
        className="group relative mx-auto flex aspect-square w-full max-w-sm select-none flex-col items-center justify-center rounded-full border-4 border-[var(--accent)] bg-[var(--card)] shadow-lg transition active:scale-[0.98]"
      >
        <span className="mb-2 px-6 text-center font-quran text-2xl text-[var(--foreground)]">
          {dhikr}
        </span>
        <span className="text-6xl font-bold text-[var(--accent-strong)]">{count}</span>
        {target > 0 && (
          <span className="mt-1 text-sm text-[var(--muted)]">من {target}</span>
        )}
        <span className="mt-3 text-xs text-[var(--muted)]">اضغط في أي مكان</span>
      </button>

      {/* شريط التقدّم للهدف */}
      {target > 0 && (
        <div className="mx-auto mt-5 max-w-sm">
          <div className="progress-track h-2.5">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      {/* الإحصاء والأدوات */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-center">
          <div className="text-xl font-bold text-[var(--foreground)]">{rounds}</div>
          <div className="text-xs text-[var(--muted)]">جولات مكتملة</div>
        </div>
        <button
          onClick={() => setVibrate((v) => !v)}
          className="rounded-xl border border-[var(--border)] px-4 py-3 text-sm text-[var(--muted)] hover:bg-[var(--hover)]"
        >
          {vibrate ? "📳 الاهتزاز مفعّل" : "🔕 الاهتزاز متوقف"}
        </button>
        <button
          onClick={resetAll}
          className="rounded-xl border border-[var(--border)] px-4 py-3 text-sm text-[var(--muted)] hover:bg-[var(--hover)]"
        >
          ↻ تصفير
        </button>
      </div>
    </div>
  );
}
