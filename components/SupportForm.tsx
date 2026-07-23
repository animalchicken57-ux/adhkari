"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitTicket, type TicketState } from "@/app/support/actions";
import { useT } from "@/components/LanguageProvider";

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useT();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-emerald-700 py-2.5 font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60"
    >
      {pending ? t("support.sending") : t("support.send")}
    </button>
  );
}

export default function SupportForm() {
  const t = useT();
  const [state, formAction] = useActionState<TicketState, FormData>(submitTicket, null);

  return (
    <form action={formAction} className="space-y-4">
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-[var(--muted)]">{t("support.subject")}</span>
        <input
          name="subject"
          required
          placeholder={t("support.subjectPh")}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-[var(--muted)]">{t("support.type")}</span>
        <select
          name="category"
          defaultValue="general"
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        >
          <option value="general">{t("support.catgeneral")}</option>
          <option value="bug">{t("support.catbug")}</option>
          <option value="suggestion">{t("support.catsuggestion")}</option>
          <option value="complaint">{t("support.catcomplaint")}</option>
        </select>
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-[var(--muted)]">{t("support.msg")}</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder={t("support.msgPh")}
          className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        />
      </label>

      {state && (
        <p
          className={`rounded-lg px-3 py-2 text-sm ${
            state.ok ? "bg-[var(--done)] text-[var(--foreground)]" : "bg-red-50 text-red-700"
          }`}
        >
          {t(state.message)}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
