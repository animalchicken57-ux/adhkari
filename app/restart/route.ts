import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// يعيد التطبيق إلى حالة "أول زيارة": خروج من الحساب ومسح اختيار اللغة.
// مفيد للعرض التقديمي — رابط واحد يعيد كل شيء من البداية.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      const supabase = await createClient();
      await supabase.auth.signOut();
    } catch {
      /* لا يوجد جلسة — لا بأس */
    }
  }

  const res = NextResponse.redirect(new URL("/", request.url), { status: 303 });
  // حذف كوكي اللغة حتى تظهر نافذة اختيار اللغة من جديد
  res.cookies.set("lang", "", { path: "/", maxAge: 0 });
  return res;
}
