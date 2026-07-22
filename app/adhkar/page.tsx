import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdhkarTracker from "@/components/AdhkarTracker";
import type { Adhkar } from "@/lib/types";

export const metadata = { title: "الأذكار — أذكاري" };

export default async function AdhkarPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/adhkar");

  const { data: adhkar } = await supabase
    .from("adhkar")
    .select("*")
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-emerald-900">أذكار اليوم</h1>
        <p className="mt-1 text-emerald-900/60">
          اضغط على كل ذكر حتى يكتمل عدده. تُحفظ متابعتك تلقائيًا.
        </p>
      </div>
      <AdhkarTracker adhkar={(adhkar ?? []) as Adhkar[]} userId={user.id} />
    </div>
  );
}
