import { BOOKS, tr } from "@/lib/books";
import { getLang } from "@/lib/lang-server";
import { getT } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import FavButton from "@/components/FavButton";

export const metadata = { title: "كتب إسلامية — أذكار المسلم" };

export default async function BooksPage() {
  const lang = await getLang();
  const t = getT(lang);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <PageHeader icon="📚" title={t("books.title")} subtitle={t("books.subtitle")} />

      <div className="space-y-4">
        {BOOKS.map((b) => (
          <article key={b.id} className="card-soft flex gap-4 p-5">
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
                <span className="ms-auto">
                  <FavButton
                    kind="book"
                    id={b.id}
                    title={tr(b.title, lang)}
                    body={tr(b.desc, lang)}
                    meta={tr(b.author, lang)}
                    icon={b.icon}
                    href="/books"
                  />
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
