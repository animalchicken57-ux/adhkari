import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { computeStats, buildHeatmap, type CompletionRow } from "@/lib/stats";
import type { Category } from "@/lib/types";
import Heatmap from "@/components/Heatmap";
import ProfileEditor from "@/components/ProfileEditor";
import Garden from "@/components/Garden";
import MilestoneBadges from "@/components/MilestoneBadges";
import ReminderSettings from "@/components/ReminderSettings";
import EncouragementCard from "@/components/EncouragementCard";
import { getLang } from "@/lib/lang-server";
import { getT } from "@/lib/i18n";

export const metadata = { title: "ملفّي — أذكاري" };

function todayStr(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export default async function ProfilePage() {
  const supabase = await createClient();
  const lang = await getLang();
  const t = getT(lang);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/profile");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, age, created_at")
    .eq("id", user.id)
    .maybeSingle();

  const { data: totalsRows } = await supabase.from("adhkar").select("category");
  const totals = { morning: 0, evening: 0 };
  (totalsRows ?? []).forEach((r: { category: Category }) => {
    totals[r.category] += 1;
  });

  const { data: comps } = await supabase
    .from("dhikr_completions")
    .select("day, adhkar(category, repeat)");

  type AdhkarJoin = { category: Category; repeat: number };
  const rows: CompletionRow[] = (comps ?? []).map(
    (r: { day: string; adhkar: AdhkarJoin | AdhkarJoin[] | null }) => {
      const a = Array.isArray(r.adhkar) ? r.adhkar[0] : r.adhkar;
      return { day: r.day, category: a?.category ?? "morning", repeat: a?.repeat ?? 1 };
    }
  );

  const stats = computeStats(rows, totals, todayStr());
  const heatmap = buildHeatmap(rows, totals, todayStr(), 35);

  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString(lang, {
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
            {profile?.full_name || t("profile.noName")}
          </h1>
          <p className="truncate text-sm text-[var(--muted)]">{user.email}</p>
          <p className="mt-1 text-xs text-[var(--muted)]">
            {t("profile.memberSince")}: {memberSince}
            {typeof profile?.age === "number" ? ` · ${t("auth.age")}: ${profile.age}` : ""}
          </p>
          <div className="mt-3">
            <ProfileEditor initialName={profile?.full_name || ""} />
          </div>
        </div>
      </div>

      {/* الإحصاءات */}
      <h2 className="mb-3 text-lg font-bold text-[var(--foreground)]">{t("profile.stats")}</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label={t("profile.currentStreak")} value={`${stats.currentStreak} ${t("profile.days")}`} icon="🔥" />
        <StatCard label={t("profile.longestStreak")} value={`${stats.longestStreak} ${t("profile.days")}`} icon="🏆" />
        <StatCard label={t("profile.completedDays")} value={`${stats.fullDays}`} icon="📅" />
        <StatCard label={t("profile.totalAdhkar")} value={`${stats.totalCompletions}`} icon="📿" />
      </div>

      {/* إحصاءة «واو»: مجموع مرّات التسبيح */}
      <div className="mt-3 flex items-center justify-center gap-3 rounded-2xl border border-[var(--border)] bg-gradient-to-l from-[var(--done)] to-[var(--card)] p-5 text-center">
        <span className="text-3xl">📿</span>
        <div>
          <div className="text-3xl font-bold text-[var(--accent-strong)]">
            {stats.totalRepetitions.toLocaleString(lang)}
          </div>
          <div className="text-sm text-[var(--muted)]">{t("profile.totalReps")}</div>
        </div>
      </div>

      <p className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--done)] p-4 text-center text-[var(--foreground)]">
        {stats.currentStreak > 0
          ? t("profile.motivateOn", { n: stats.currentStreak })
          : t("profile.motivateOff")}
      </p>

      {/* حديقة الأذكار */}
      <div className="mt-8">
        <Garden stats={stats} t={t} lang={lang} />
      </div>

      {/* المكافآت والأوسمة */}
      <div className="mt-8">
        <MilestoneBadges stats={stats} t={t} lang={lang} />
      </div>

      {/* تعلّم واغتنم: سنّة + حديث */}
      <h2 className="mb-3 mt-8 text-lg font-bold text-[var(--foreground)]">{t("profile.learn")}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <EncouragementCard kind="sunnah" />
        <EncouragementCard kind="hadith" />
      </div>

      {/* التذكيرات */}
      <div className="mt-8">
        <ReminderSettings />
      </div>

      {/* الخريطة الحرارية */}
      <div className="mt-8">
        <Heatmap days={heatmap} t={t} />
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
