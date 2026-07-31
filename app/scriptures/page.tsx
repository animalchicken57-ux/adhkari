import { tr } from "@/lib/books";
import { SCRIPTURES } from "@/lib/scriptures";
import { getLang } from "@/lib/lang-server";
import { getT } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";

export const metadata = { title: "الكتب السماوية — أذكار المسلم" };

export default async function ScripturesPage() {
  const lang = await getLang();
  const t = getT(lang);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <PageHeader
        icon="📜"
        title={t("scriptures.title")}
        subtitle={t("scriptures.subtitle")}
      />

      <p className="card-soft mb-6 p-4 leading-relaxed text-[var(--foreground)]">
        {t("scriptures.intro")}
      </p>

      <ol className="space-y-4">
        {SCRIPTURES.map((s, i) => (
          <li
            key={s.id}
            className="card-soft p-5"
          >
            <div className="flex gap-4">
              <div className="shrink-0 text-4xl" aria-hidden>
                {s.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[var(--done)] px-2 py-0.5 text-xs font-bold text-[var(--accent-strong)]">
                    {i + 1}
                  </span>
                  <h2 className="text-lg font-bold text-[var(--foreground)]">
                    {tr(s.name, lang)}
                  </h2>
                </div>
                <p className="mt-0.5 text-sm text-[var(--muted)]">
                  {t("scriptures.revealedTo")}: {tr(s.prophet, lang)}
                </p>
                <p className="mt-2 leading-relaxed text-[var(--foreground)]">
                  {tr(s.desc, lang)}
                </p>

                <blockquote className="mt-3 rounded-xl border-s-4 border-[var(--accent-strong)] bg-[var(--hover)] px-4 py-2">
                  <p className="leading-loose text-[var(--foreground)]">
                    ﴿ {tr(s.ayah, lang)} ﴾
                  </p>
                  <cite className="mt-1 block text-xs not-italic text-[var(--muted)]">
                    {tr(s.ref, lang)}
                  </cite>
                </blockquote>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-8 text-center text-sm text-[var(--muted)]">{t("scriptures.note")}</p>
    </div>
  );
}
