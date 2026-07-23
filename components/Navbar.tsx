import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getLang } from "@/lib/lang-server";
import { getT } from "@/lib/i18n";

export default async function Navbar() {
  const t = getT(await getLang());
  let userEmail: string | null = null;

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      userEmail = user?.email ?? null;
    } catch {
      userEmail = null;
    }
  }

  const linkCls =
    "rounded-lg px-2 py-1 text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]";

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-1">
          <Link href="/" className="flex items-center gap-2 font-bold text-[var(--accent-strong)]">
            <span className="text-2xl">🕌</span>
            <span className="text-lg">{t("brand")}</span>
          </Link>
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        <div className="flex flex-wrap items-center justify-end gap-x-1 gap-y-1 text-sm sm:gap-x-2">
          <Link href="/adhkar" className={linkCls}>{t("nav.adhkar")}</Link>
          <Link href="/tasbih" className={linkCls}>{t("nav.tasbih")}</Link>
          <Link href="/prayer-times" className={linkCls}>{t("nav.prayer")}</Link>
          <Link href="/questions" className={linkCls}>{t("nav.ayahs")}</Link>
          <Link href="/profile" className={linkCls}>{t("nav.profile")}</Link>
          <Link href="/support" className={linkCls}>{t("nav.support")}</Link>

          {userEmail ? (
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="rounded-lg bg-[var(--hover)] px-3 py-1 font-medium text-[var(--foreground)] hover:bg-[var(--hover)]"
              >
                {t("nav.logout")}
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-emerald-700 px-3 py-1 font-medium text-white hover:bg-emerald-800"
            >
              {t("nav.login")}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
