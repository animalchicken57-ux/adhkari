import { tr } from "@/lib/books";
import { PROPHETS } from "@/lib/prophets";
import { getLang } from "@/lib/lang-server";
import { getT } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";

export const metadata = { title: "قصص الأنبياء — أذكار المسلم" };

export default async function ProphetsPage() {
  const lang = await getLang();
  const t = getT(lang);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <PageHeader icon="🌟" title={t("prophets.title")} subtitle={t("prophets.subtitle")} />

      <div className="space-y-4">
        {PROPHETS.map((p) => (
          <article key={p.id} className="card-soft overflow-hidden">
            <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[var(--hover)] px-5 py-3">
              <span className="text-3xl" aria-hidden>
                {p.emoji}
              </span>
              <div className="min-w-0">
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  {tr(p.name, lang)}
                </h2>
                <p className="text-sm text-[var(--accent-strong)]">{tr(p.title, lang)}</p>
              </div>
            </div>

            <div className="px-5 py-4">
              <p className="leading-loose text-[var(--foreground)]">{tr(p.story, lang)}</p>
              <p className="mt-3 rounded-xl bg-[var(--done)] px-4 py-2 text-sm leading-relaxed text-[var(--accent-strong)]">
                💡 {t("prophets.lesson")}: {tr(p.lesson, lang)}
              </p>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-[var(--muted)]">{t("prophets.note")}</p>
    </div>
  );
}
