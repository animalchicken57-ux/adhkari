"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type TicketState = { ok: boolean; message: string } | null;

export async function submitTicket(
  _prev: TicketState,
  formData: FormData
): Promise<TicketState> {
  const subject = String(formData.get("subject") ?? "").trim();
  const category = String(formData.get("category") ?? "general");
  const message = String(formData.get("message") ?? "").trim();

  if (!subject || !message) {
    return { ok: false, message: "support.errFill" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, message: "support.errLogin" };
  }

  const { error } = await supabase.from("support_tickets").insert({
    user_id: user.id,
    subject,
    category,
    message,
  });

  if (error) {
    return { ok: false, message: "support.errFail" };
  }

  // إشعار فوري على الجوال عبر ntfy (اشترك في نفس الموضوع من تطبيق ntfy)
  const topic = process.env.NTFY_TOPIC || "adhkari-support-a7f3k9q2";
  try {
    await fetch(`https://ntfy.sh/${topic}`, {
      method: "POST",
      headers: { Title: "New Adhkari support message", Tags: "envelope" },
      body: `[${category}] ${subject}\n${message}\n— ${user.email}`,
    });
  } catch {
    // لا نُفشل الإرسال إذا تعذّر الإشعار
  }

  revalidatePath("/support");
  return { ok: true, message: "support.successMsg" };
}
