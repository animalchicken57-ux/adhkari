import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getDailyItem } from "@/lib/daily";
import { getLang } from "@/lib/lang-server";
import { getT } from "@/lib/i18n";

export default async function Home() {
  const t = getT(await getLang());
  const daily = getDailyItem();

  let signedIn = false;
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      signedIn = !!user;
    } catch {
      signedIn = false;
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4">
      <section className="py-16 text-center sm:py-24">
        <span className="mb-4 inline-block rounded-full bg-[var(--hover)] px-4 py-1.5 text-sm font-medium text-[var(--accent-strong)]">
          {t("home.eyebrow")}
        </span>
        <h1 className="mx-auto max-w-2xl text-4xl font-bold leading-tight text-[var(--foreground)] sm:text-5xl">
          {t("home.title")}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--muted)]">
          {t("home.desc")}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={signedIn ? "/adhkar" : "/signup"}
            className="rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-800"
          >
            {signedIn ? t("home.ctaOpen") : t("home.ctaStart")}
          </Link>
          {!signedIn && (
            <Link
              href="/login"
              className="rounded-xl border border-[var(--border)] px-6 py-3 font-semibold text-[var(--foreground)] transition hover:bg-[var(--hover)]"
            >
              {t("home.ctaLogin")}
            </Link>
          )}
        </div>
      </section>

      {/* آية/حديث اليوم */}
      <section className="pb-12">
        <div className="mx-auto max-w-2xl rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 text-center shadow-sm">
          <span className="inline-block rounded-full bg-[var(--done)] px-3 py-1 text-xs font-medium text-[var(--accent-strong)]">
            {daily.kind === "آية" ? t("home.verseOfDay") : t("home.hadithOfDay")}
          </span>
          <p className="font-quran mt-4 text-2xl leading-loose text-[var(--foreground)]">
            {daily.text}
          </p>
          <p className="mt-3 text-sm text-[var(--muted)]">﴿ {daily.source} ﴾</p>
        </div>
      </section>

      <section className="grid gap-4 pb-10 sm:grid-cols-3">
        <Feature icon="📿" title={t("home.f1t")} text={t("home.f1d")} />
        <Feature icon="🔥" title={t("home.f2t")} text={t("home.f2d")} />
        <Feature icon="📊" title={t("home.f3t")} text={t("home.f3d")} />
      </section>

      <section className="mb-16 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 text-center">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">
          {t("home.allInOne")}
        </h2>
        <p className="mt-2 text-[var(--muted)]">{t("home.allInOneDesc")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          <Pill>{t("home.pill1")}</Pill>
          <Pill>{t("home.pill2")}</Pill>
          <Pill>{t("home.pill3")}</Pill>
        </div>
      </section>
    </div>
  );
}

function Feature({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 text-center">
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-3 font-bold text-[var(--foreground)]">{title}</h3>
      <p className="mt-1 text-sm text-[var(--muted)]">{text}</p>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[var(--hover)] px-4 py-2 font-medium text-[var(--accent-strong)]">
      {children}
    </span>
  );
}
