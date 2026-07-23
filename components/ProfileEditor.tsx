"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { updateProfile, type ProfileState } from "@/app/profile/actions";

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
    >
      {pending ? "جارِ الحفظ..." : "حفظ"}
    </button>
  );
}

export default function ProfileEditor({ initialName }: { initialName: string }) {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState<ProfileState, FormData>(
    updateProfile,
    null
  );

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg border border-[var(--border)] px-3 py-1 text-sm text-[var(--muted)] hover:bg-[var(--hover)]"
      >
        ✏️ تعديل الاسم
      </button>
    );
  }

  return (
    <form action={formAction} className="flex flex-wrap items-center gap-2">
      <input
        name="full_name"
        defaultValue={initialName}
        maxLength={60}
        required
        className="w-44 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-emerald-500"
      />
      <SaveButton />
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="rounded-lg px-2 py-1 text-sm text-[var(--muted)] hover:bg-[var(--hover)]"
      >
        إلغاء
      </button>
      {state && (
        <span
          className={`text-sm ${state.ok ? "text-[var(--accent-strong)]" : "text-red-600"}`}
        >
          {state.message}
        </span>
      )}
    </form>
  );
}
