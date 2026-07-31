import { BOOKS, tr } from "@/lib/books";
import { getLang } from "@/lib/lang-server";
import { getT } from "@/lib/i18n";

export const metadata = { title: "كتب إسلامية — أذكار المسلم" };

export default async function BooksPage() {
  const lang = await getLang();
  const t = getT(lang);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">{t("books.title")}</h1>
        <p className="mt-1 text-[var(--muted)]">{t("books.subtitle")}</p>
      </div>

      <div className="space-y-4">
        {BOOKS.map((b) => (
          <article
            key={b.id}
            className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm"
          >
            <div className="shrink-0 text-4xl" aria-hidden>
              {b.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  {tr(b.title, lang)}
                </h2>
                <span className="rounded-full bg-[var(--done)] px-2.5 py-0.5 text-xs font-medium text-[var(--accent-strong)]">
                  {tr(b.category, lang)}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-[var(--muted)]">
                {t("books.author")}: {tr(b.author, lang)}
              </p>
              <p className="mt-2 leading-relaxed text-[var(--foreground)]">
                {tr(b.desc, lang)}
              </p>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-[var(--muted)]">{t("books.note")}</p>
    </div>
  );
}
