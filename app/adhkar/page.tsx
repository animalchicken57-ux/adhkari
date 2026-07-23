import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdhkarTracker from "@/components/AdhkarTracker";
import type { Adhkar } from "@/lib/types";
import { getLang } from "@/lib/lang-server";
import { getT } from "@/lib/i18n";

export const metadata = { title: "الأذكار — أذكاري" };

export default async function AdhkarPage() {
  const supabase = await createClient();
  const t = getT(await getLang());

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
        <h1 className="text-3xl font-bold text-[var(--foreground)]">{t("adhkar.title")}</h1>
        <p className="mt-1 text-[var(--muted)]">{t("adhkar.subtitle")}</p>
      </div>
      <AdhkarTracker adhkar={(adhkar ?? []) as Adhkar[]} userId={user.id} />
    </div>
  );
}
