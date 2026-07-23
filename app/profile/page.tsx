import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { computeStats, buildHeatmap, type CompletionRow } from "@/lib/stats";
import type { Category } from "@/lib/types";
import Heatmap from "@/components/Heatmap";
import ProfileEditor from "@/components/ProfileEditor";

export const metadata = { title: "ملفّي — أذكاري" };

function todayStr(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/profile");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, created_at")
    .eq("id", user.id)
    .maybeSingle();

  const { data: totalsRows } = await supabase.from("adhkar").select("category");
  const totals = { morning: 0, evening: 0 };
  (totalsRows ?? []).forEach((r: { category: Category }) => {
    totals[r.category] += 1;
  });

  const { data: comps } = await supabase
    .from("dhikr_completions")
    .select("day, adhkar(category)");

  const rows: CompletionRow[] = (comps ?? []).map(
    (r: { day: string; adhkar: { category: Category } | { category: Category }[] | null }) => {
      const cat = Array.isArray(r.adhkar) ? r.adhkar[0]?.category : r.adhkar?.category;
      return { day: r.day, category: cat ?? "morning" };
    }
  );

  const stats = computeStats(rows, totals, todayStr());
  const heatmap = buildHeatmap(rows, totals, todayStr(), 35);

  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("ar", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* بطاقة المستخدم */}
      <div className="mb-8 flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-2xl font-bold text-white">
          {(profile?.full_name || user.email || "؟").trim().charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xl font-bold text-[var(--foreground)]">
            {profile?.full_name || "بدون اسم"}
          </h1>
          <p className="truncate text-sm text-[var(--muted)]">{user.email}</p>
          <p className="mt-1 text-xs text-[var(--muted)]">عضو منذ: {memberSince}</p>
          <div className="mt-3">
            <ProfileEditor initialName={profile?.full_name || ""} />
          </div>
        </div>
      </div>

      {/* الإحصاءات */}
      <h2 className="mb-3 text-lg font-bold text-[var(--foreground)]">إحصاءاتك</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="السلسلة الحالية" value={`${stats.currentStreak} يوم`} icon="🔥" />
        <StatCard label="أطول سلسلة" value={`${stats.longestStreak} يوم`} icon="🏆" />
        <StatCard label="أيام مكتملة" value={`${stats.fullDays}`} icon="📅" />
        <StatCard label="إجمالي الأذكار" value={`${stats.totalCompletions}`} icon="📿" />
      </div>

      <p className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--done)] p-4 text-center text-[var(--foreground)]">
        {stats.currentStreak > 0
          ? `أحسنت! حافظت على وردك ${stats.currentStreak} يومًا متتاليًا. استمر 🌟`
          : "ابدأ اليوم أول سلسلة لك — أتمم أذكار الصباح أو المساء كاملةً 🌱"}
      </p>

      {/* الخريطة الحرارية */}
      <div className="mt-8">
        <Heatmap days={heatmap} />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 text-center">
      <div className="text-2xl">{icon}</div>
      <div className="mt-1 text-xl font-bold text-[var(--foreground)]">{value}</div>
      <div className="text-xs text-[var(--muted)]">{label}</div>
    </div>
  );
}
