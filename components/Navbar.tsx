import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

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
    <header className="sticky top-0 z-20 border-b border-emerald-900/10 bg-[var(--background)]/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-emerald-800">
          <span className="text-2xl">🕌</span>
          <span className="text-lg">أذكاري</span>
        </Link>

        <div className="flex items-center gap-1 text-sm sm:gap-3">
          <Link href="/adhkar" className="rounded-lg px-2 py-1 text-emerald-900/80 hover:bg-emerald-900/5 hover:text-emerald-900">
            الأذكار
          </Link>
          <Link href="/profile" className="rounded-lg px-2 py-1 text-emerald-900/80 hover:bg-emerald-900/5 hover:text-emerald-900">
            ملفّي
          </Link>
          <Link href="/support" className="rounded-lg px-2 py-1 text-emerald-900/80 hover:bg-emerald-900/5 hover:text-emerald-900">
            الدعم
          </Link>

          {userEmail ? (
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="rounded-lg bg-emerald-900/5 px-3 py-1 font-medium text-emerald-900 hover:bg-emerald-900/10"
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
