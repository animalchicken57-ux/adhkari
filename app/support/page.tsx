import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SupportForm from "@/components/SupportForm";
import { getLang } from "@/lib/lang-server";
import { getT } from "@/lib/i18n";

export const metadata = { title: "الدعم والتواصل — أذكاري" };

export default async function SupportPage() {
  const supabase = await createClient();
  const lang = await getLang();
  const t = getT(lang);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/support");

  const { data: tickets } = await supabase
    .from("support_tickets")
    .select("id, subject, category, message, status, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">{t("support.title")}</h1>
        <p className="mt-1 text-[var(--muted)]">{t("support.subtitle")}</p>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SupportForm />
      </div>

      {tickets && tickets.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-lg font-bold text-[var(--foreground)]">{t("support.prev")}</h2>
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4"
              >
                <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold text-[var(--foreground)]">{ticket.subject}</h3>
                  <div className="flex gap-2 text-xs">
                    <span className="rounded-full bg-[var(--hover)] px-2 py-0.5 text-[var(--muted)]">
                      {t(`support.cat${ticket.category}`)}
                    </span>
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-800">
                      {t(`support.status${ticket.status}`)}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[var(--muted)]">{ticket.message}</p>
                <p className="mt-2 text-xs text-[var(--muted)]">
                  {new Date(ticket.created_at).toLocaleString(lang)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
