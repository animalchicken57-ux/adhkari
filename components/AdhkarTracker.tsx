"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { CATEGORY_LABEL, type Adhkar, type Category } from "@/lib/types";

function todayStr(): string {
  // تاريخ اليوم بتوقيت المستخدم المحلي (YYYY-MM-DD)
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export default function AdhkarTracker({
  adhkar,
  userId,
}: {
  adhkar: Adhkar[];
  userId: string;
}) {
  const supabase = createClient();
  const day = todayStr();

  const [tab, setTab] = useState<Category>(() =>
    new Date().getHours() < 15 ? "morning" : "evening"
  );
  const [counts, setCounts] = useState<Record<number, number>>({});
  const [done, setDone] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  // تحميل ما اكتمل اليوم
  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase
        .from("dhikr_completions")
        .select("adhkar_id")
        .eq("day", day);
      if (!active) return;
      const set = new Set<number>((data ?? []).map((r) => r.adhkar_id));
      setDone(set);
      const initCounts: Record<number, number> = {};
      adhkar.forEach((a) => {
        if (set.has(a.id)) initCounts[a.id] = a.repeat;
      });
      setCounts(initCounts);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day]);

  const list = useMemo(
    () => adhkar.filter((a) => a.category === tab),
    [adhkar, tab]
  );

  const doneCount = list.filter((a) => done.has(a.id)).length;
  const pct = list.length ? Math.round((doneCount / list.length) * 100) : 0;

  async function tap(a: Adhkar) {
    if (done.has(a.id)) return;
    const current = (counts[a.id] ?? 0) + 1;
    setCounts((c) => ({ ...c, [a.id]: current }));

    if (current >= a.repeat) {
      // اكتمل الذكر → نحفظه
      setDone((d) => new Set(d).add(a.id));
      await supabase.from("dhikr_completions").upsert(
        { user_id: userId, adhkar_id: a.id, day },
        { onConflict: "user_id,adhkar_id,day" }
      );
    }
  }

  async function reset(a: Adhkar) {
    setDone((d) => {
      const n = new Set(d);
      n.delete(a.id);
      return n;
    });
    setCounts((c) => ({ ...c, [a.id]: 0 }));
    await supabase
      .from("dhikr_completions")
      .delete()
      .eq("adhkar_id", a.id)
      .eq("day", day);
  }

  return (
    <div>
      {/* التبويبات */}
      <div className="mb-5 grid grid-cols-2 gap-2 rounded-2xl bg-emerald-900/5 p-1.5">
        {(["morning", "evening"] as Category[]).map((c) => (
          <button
            key={c}
            onClick={() => setTab(c)}
            className={`rounded-xl px-4 py-2.5 font-semibold transition ${
              tab === c
                ? "bg-emerald-700 text-white shadow"
                : "text-emerald-900/70 hover:bg-emerald-900/5"
            }`}
          >
            {c === "morning" ? "🌅 " : "🌙 "}
            {CATEGORY_LABEL[c]}
          </button>
        ))}
      </div>

      {/* شريط التقدم */}
      <div className="mb-6 rounded-2xl border border-emerald-900/10 bg-[var(--card)] p-4">
        <div className="mb-2 flex items-center justify-between text-sm font-medium text-emerald-900/80">
          <span>تقدّم {CATEGORY_LABEL[tab]}</span>
          <span>
            {doneCount} / {list.length}
          </span>
        </div>
        <div className="progress-track h-3">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        {pct === 100 && list.length > 0 && (
          <p className="mt-3 text-center font-semibold text-emerald-700">
            🎉 ما شاء الله! أتممت {CATEGORY_LABEL[tab]} لليوم. تقبّل الله.
          </p>
        )}
      </div>

      {loading ? (
        <p className="py-10 text-center text-emerald-900/50">جارِ التحميل...</p>
      ) : (
        <div className="space-y-4">
          {list.map((a) => {
            const isDone = done.has(a.id);
            const c = counts[a.id] ?? 0;
            return (
              <article
                key={a.id}
                className={`rounded-2xl border p-5 transition ${
                  isDone
                    ? "border-emerald-300 bg-emerald-50/70"
                    : "border-emerald-900/10 bg-[var(--card)]"
                }`}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <h3 className="font-bold text-emerald-900">{a.title}</h3>
                  <span className="shrink-0 rounded-full bg-emerald-900/5 px-2.5 py-0.5 text-xs font-medium text-emerald-900/70">
                    التكرار: {a.repeat}
                  </span>
                </div>

                <p className="font-quran text-lg text-emerald-950/90">{a.body}</p>

                {a.virtue && (
                  <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
                    ✨ {a.virtue}
                  </p>
                )}

                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => tap(a)}
                    disabled={isDone}
                    className={`flex-1 rounded-xl py-3 text-lg font-bold transition ${
                      isDone
                        ? "cursor-default bg-emerald-600 text-white"
                        : "bg-emerald-700 text-white hover:bg-emerald-800 active:scale-[0.99]"
                    }`}
                  >
                    {isDone ? "✓ تمّ" : `${c} / ${a.repeat} — اضغط`}
                  </button>
                  {(isDone || c > 0) && (
                    <button
                      onClick={() => reset(a)}
                      className="rounded-xl border border-emerald-900/15 px-3 py-3 text-sm text-emerald-900/60 hover:bg-emerald-900/5"
                      title="إعادة"
                    >
                      ↻
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
