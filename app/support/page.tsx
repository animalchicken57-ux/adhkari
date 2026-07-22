import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SupportForm from "@/components/SupportForm";

export const metadata = { title: "الدعم والتواصل — أذكاري" };

const CATEGORY_LABEL: Record<string, string> = {
  general: "استفسار عام",
  bug: "مشكلة تقنية",
  suggestion: "اقتراح",
  complaint: "شكوى",
};

const STATUS_LABEL: Record<string, string> = {
  open: "قيد المراجعة",
  closed: "مغلقة",
};

export default async function SupportPage() {
  const supabase = await createClient();

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
        <h1 className="text-3xl font-bold text-emerald-900">الدعم والتواصل</h1>
        <p className="mt-1 text-emerald-900/60">
          عندك استفسار أو اقتراح أو شكوى؟ راسلنا وسنردّ عليك.
        </p>
      </div>

      <div className="rounded-2xl border border-emerald-900/10 bg-[var(--card)] p-6">
        <SupportForm />
      </div>

      {tickets && tickets.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-lg font-bold text-emerald-900">
            رسائلك السابقة
          </h2>
          <div className="space-y-3">
            {tickets.map((t) => (
              <div
                key={t.id}
                className="rounded-2xl border border-emerald-900/10 bg-[var(--card)] p-4"
              >
                <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold text-emerald-900">{t.subject}</h3>
                  <div className="flex gap-2 text-xs">
                    <span className="rounded-full bg-emerald-900/5 px-2 py-0.5 text-emerald-900/70">
                      {CATEGORY_LABEL[t.category] ?? t.category}
                    </span>
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-800">
                      {STATUS_LABEL[t.status] ?? t.status}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-emerald-900/70">{t.message}</p>
                <p className="mt-2 text-xs text-emerald-900/40">
                  {new Date(t.created_at).toLocaleString("ar")}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
