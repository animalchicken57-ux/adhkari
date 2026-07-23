import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ThemeToggle from "@/components/ThemeToggle";

export default async function Navbar() {
  let userEmail: string | null = null;

  // نتفادى الانهيار إذا لم تُضبط متغيّرات البيئة بعد
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

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-1">
          <Link href="/" className="flex items-center gap-2 font-bold text-[var(--accent-strong)]">
            <span className="text-2xl">🕌</span>
            <span className="text-lg">أذكاري</span>
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex flex-wrap items-center justify-end gap-x-1 gap-y-1 text-sm sm:gap-x-2">
          <Link href="/adhkar" className="rounded-lg px-2 py-1 text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]">
            الأذكار
          </Link>
          <Link href="/tasbih" className="rounded-lg px-2 py-1 text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]">
            المسبحة
          </Link>
          <Link href="/prayer-times" className="rounded-lg px-2 py-1 text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]">
            الصلاة
          </Link>
          <Link href="/profile" className="rounded-lg px-2 py-1 text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]">
            ملفّي
          </Link>
          <Link href="/support" className="rounded-lg px-2 py-1 text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]">
            الدعم
          </Link>

          {userEmail ? (
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="rounded-lg bg-[var(--hover)] px-3 py-1 font-medium text-[var(--foreground)] hover:bg-[var(--hover)]"
              >
                خروج
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-emerald-700 px-3 py-1 font-medium text-white hover:bg-emerald-800"
            >
              دخول
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
