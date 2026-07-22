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
    return { ok: false, message: "يرجى تعبئة الموضوع والرسالة." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, message: "يجب تسجيل الدخول أولاً." };
  }

  const { error } = await supabase.from("support_tickets").insert({
    user_id: user.id,
    subject,
    category,
    message,
  });

  if (error) {
    return { ok: false, message: "تعذّر الإرسال، حاول لاحقًا." };
  }

  revalidatePath("/support");
  return { ok: true, message: "تم استلام رسالتك، شكرًا لتواصلك معنا! 🌿" };
}
