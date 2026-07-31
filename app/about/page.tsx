import Link from "next/link";
import { getLang } from "@/lib/lang-server";
import { getT } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";

export const metadata = { title: "عن التطبيق — أذكار المسلم" };

const SECTIONS = [
  { href: "/adhkar", icon: "📿", key: "nav.adhkar", desc: "about.s1" },
  { href: "/tasbih", icon: "🔢", key: "nav.tasbih", desc: "about.s2" },
  { href: "/prayer-times", icon: "🕐", key: "nav.prayer", desc: "about.s3" },
  { href: "/questions", icon: "📖", key: "nav.ayahs", desc: "about.s4" },
  { href: "/names", icon: "✨", key: "nav.names", desc: "about.s5" },
  { href: "/prophets", icon: "🌟", key: "nav.prophets", desc: "about.s6" },
  { href: "/ramadan", icon: "🌙", key: "nav.ramadan", desc: "about.s7" },
  { href: "/books", icon: "📚", key: "nav.books", desc: "about.s8" },
  { href: "/scriptures", icon: "📜", key: "nav.scriptures", desc: "about.s9" },
  { href: "/fun-facts", icon: "💡", key: "nav.facts", desc: "about.s10" },
  { href: "/duas", icon: "🤲", key: "nav.duas", desc: "about.s11" },
  { href: "/qibla", icon: "🧭", key: "nav.qibla", desc: "about.s12" },
];

export default async function AboutPage() {
  const t = getT(await getLang());

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <PageHeader icon="🕌" title={t("about.title")} subtitle={t("about.subtitle")} />

      <section className="card-soft p-6">
        <h2 className="text-xl font-bold text-[var(--foreground)]">
          {t("about.whyTitle")}
        </h2>
        <p className="mt-2 leading-loose text-[var(--foreground)]">{t("about.why")}</p>
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-xl font-bold text-[var(--foreground)]">
          {t("about.whatTitle")}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="card-soft flex gap-3 p-4"
            >
              <span className="text-2xl" aria-hidden>
                {s.icon}
              </span>
              <span className="min-w-0">
                <span className="block font-bold text-[var(--foreground)]">
                  {t(s.key)}
                </span>
                <span className="block text-sm leading-relaxed text-[var(--muted)]">
                  {t(s.desc)}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="card-soft mt-6 p-6">
        <h2 className="text-xl font-bold text-[var(--foreground)]">
          {t("about.techTitle")}
        </h2>
        <p className="mt-2 leading-loose text-[var(--foreground)]">{t("about.tech")}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"].map(
            (x) => (
              <span
                key={x}
                className="rounded-full bg-[var(--hover)] px-3 py-1 font-medium text-[var(--accent-strong)]"
              >
                {x}
              </span>
            )
          )}
        </div>
      </section>

      <section className="card-soft mt-6 p-8 text-center">
        <div className="text-4xl" aria-hidden>
          🤲
        </div>
        <p className="font-quran mt-4 text-2xl leading-loose text-[var(--foreground)]">
          {t("about.duaText")}
        </p>
        <p className="mt-3 text-sm text-[var(--muted)]">{t("about.duaRef")}</p>
      </section>

      <p className="mt-8 text-center text-sm leading-relaxed text-[var(--muted)]">
        {t("about.thanks")}
      </p>
    </div>
  );
}
