"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useT } from "@/components/LanguageProvider";
import PageHeader from "@/components/PageHeader";
import {
  FAV_EVENT,
  type Fav,
  type FavKind,
  clearFavs,
  readFavs,
  removeFav,
} from "@/lib/favourites";

const KIND_KEY: Record<FavKind, string> = {
  dua: "nav.duas",
  fact: "nav.facts",
  prophet: "nav.prophets",
  book: "nav.books",
  scripture: "nav.scriptures",
};

const ORDER: FavKind[] = ["dua", "fact", "prophet", "book", "scripture"];

export default function FavouritesPage() {
  const t = useT();
  const [favs, setFavs] = useState<Fav[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setFavs(readFavs());
    sync();
    setReady(true);
    window.addEventListener(FAV_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(FAV_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (!ready) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <PageHeader icon="♥" title={t("fav.title")} subtitle={t("fav.subtitle")} />
      </div>
    );
  }

  const groups = ORDER.map((k) => ({
    kind: k,
    items: favs.filter((f) => f.kind === k),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <PageHeader icon="♥" title={t("fav.title")} subtitle={t("fav.subtitle")} />

      {favs.length === 0 ? (
        <div className="card-soft p-10 text-center">
          <div className="text-5xl" aria-hidden>
            ♡
          </div>
          <p className="mt-4 leading-relaxed text-[var(--muted)]">{t("fav.empty")}</p>
          <Link
            href="/duas"
            className="mt-5 inline-block rounded-xl bg-emerald-700 px-5 py-2.5 font-semibold text-white transition hover:bg-emerald-800"
          >
            {t("fav.browse")}
          </Link>
        </div>
      ) : (
        <>
          <p className="mb-4 text-center text-sm text-[var(--muted)]">
            {t("fav.count")}: <span className="tabular font-bold">{favs.length}</span>
          </p>

          {groups.map((g) => (
            <section key={g.kind} className="mb-8">
              <h2 className="mb-3 text-lg font-bold text-[var(--accent-strong)]">
                {t(KIND_KEY[g.kind])}{" "}
                <span className="tabular text-sm font-normal text-[var(--muted)]">
                  ({g.items.length})
                </span>
              </h2>

              <div className="space-y-3">
                {g.items.map((f) => (
                  <article key={f.key} className="card-soft p-5">
                    <div className="flex items-start gap-3">
                      {f.icon && (
                        <span className="text-2xl" aria-hidden>
                          {f.icon}
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <Link
                          href={f.href}
                          className="font-bold text-[var(--foreground)] hover:text-[var(--accent-strong)]"
                        >
                          {f.title}
                        </Link>
                        <p className="mt-2 leading-loose text-[var(--foreground)]">{f.body}</p>
                        {f.meta && (
                          <p className="mt-2 text-xs text-[var(--accent-strong)]">{f.meta}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFav(f.key)}
                        aria-label={t("fav.remove")}
                        title={t("fav.remove")}
                        className="shrink-0 rounded-xl px-2.5 py-1.5 text-xl leading-none text-rose-500 transition hover:bg-rose-500/10 active:scale-90"
                      >
                        ♥
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}

          <div className="text-center">
            <button
              onClick={() => {
                if (confirm(t("fav.clearConfirm"))) clearFavs();
              }}
              className="rounded-xl border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--hover)] hover:text-[var(--foreground)]"
            >
              {t("fav.clear")}
            </button>
          </div>
        </>
      )}

      <p className="mt-8 text-center text-xs leading-relaxed text-[var(--muted)]">
        {t("fav.note")}
      </p>
    </div>
  );
}
