"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitTicket, type TicketState } from "@/app/support/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-emerald-700 py-2.5 font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60"
    >
      {pending ? "جارِ الإرسال..." : "إرسال"}
    </button>
  );
}

export default function SupportForm() {
  const [state, formAction] = useActionState<TicketState, FormData>(
    submitTicket,
    null
  );

  return (
    <form action={formAction} className="space-y-4">
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-emerald-900/80">
          الموضوع
        </span>
        <input
          name="subject"
          required
          placeholder="عنوان مختصر لرسالتك"
          className="w-full rounded-xl border border-emerald-900/15 bg-white px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-emerald-900/80">
          النوع
        </span>
        <select
          name="category"
          defaultValue="general"
          className="w-full rounded-xl border border-emerald-900/15 bg-white px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        >
          <option value="general">استفسار عام</option>
          <option value="bug">مشكلة تقنية</option>
          <option value="suggestion">اقتراح</option>
          <option value="complaint">شكوى</option>
        </select>
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-emerald-900/80">
          الرسالة
        </span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="اكتب رسالتك هنا..."
          className="w-full resize-none rounded-xl border border-emerald-900/15 bg-white px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        />
      </label>

      {state && (
        <p
          className={`rounded-lg px-3 py-2 text-sm ${
            state.ok
              ? "bg-emerald-50 text-emerald-800"
              : "bg-red-50 text-red-700"
          }`}
        >
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
