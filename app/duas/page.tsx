import { tr } from "@/lib/books";
import { DUAS } from "@/lib/duas";
import { getLang } from "@/lib/lang-server";
import { getT } from "@/lib/i18n";

export const metadata = { title: "أدعية — أذكار المسلم" };

export default async function DuasPage() {
  const lang = await getLang();
  const t = getT(lang);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">{t("duas.title")}</h1>
        <p className="mt-1 text-[var(--muted)]">{t("duas.subtitle")}</p>
      </div>

      <div className="space-y-4">
        {DUAS.map((d) => (
          <article
            key={d.id}
            className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[var(--hover)] px-5 py-3">
              <span className="text-2xl" aria-hidden>
                {d.icon}
              </span>
              <h2 className="font-bold text-[var(--foreground)]">{tr(d.when, lang)}</h2>
            </div>

            <div className="px-5 py-5">
              <p
                dir="rtl"
                className="font-quran text-center text-2xl leading-loose text-[var(--foreground)]"
              >
                {d.arabic}
              </p>
              <p className="mt-4 leading-relaxed text-[var(--muted)]">
                {tr(d.meaning, lang)}
              </p>
              <p className="mt-2 text-xs text-[var(--accent-strong)]">
                {tr(d.source, lang)}
              </p>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 text-center text-sm leading-relaxed text-[var(--muted)]">
        {t("duas.note")}
      </p>
    </div>
  );
}
