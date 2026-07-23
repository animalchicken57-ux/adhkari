"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useT } from "@/components/LanguageProvider";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const isSignup = mode === "signup";
  const t = useT();
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setLoading(true);

    try {
      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo:
              typeof window !== "undefined"
                ? `${window.location.origin}/auth/callback`
                : undefined,
          },
        });
        if (error) throw error;
        if (data.session) {
          router.push("/adhkar");
          router.refresh();
        } else {
          setNotice(t("auth.confirmNotice"));
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push("/adhkar");
        router.refresh();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : t("err.generic");
      setError(errorKey(message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm sm:p-8">
      <h1 className="mb-1 text-2xl font-bold text-[var(--foreground)]">
        {isSignup ? t("auth.signupTitle") : t("auth.loginTitle")}
      </h1>
      <p className="mb-6 text-sm text-[var(--muted)]">
        {isSignup ? t("auth.signupSub") : t("auth.loginSub")}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignup && (
          <Field label={t("auth.name")} type="text" value={fullName} onChange={setFullName} placeholder={t("auth.namePh")} required />
        )}
        <Field label={t("auth.email")} type="email" value={email} onChange={setEmail} placeholder="you@example.com" required />
        <Field label={t("auth.password")} type="password" value={password} onChange={setPassword} placeholder={t("auth.passwordPh")} required />

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{t(error)}</p>
        )}
        {notice && (
          <p className="rounded-lg bg-[var(--done)] px-3 py-2 text-sm text-[var(--foreground)]">{notice}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-emerald-700 py-2.5 font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60"
        >
          {loading ? t("auth.loading") : isSignup ? t("auth.signupBtn") : t("auth.loginBtn")}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--muted)]">
        {isSignup ? (
          <>
            {t("auth.haveAccount")}{" "}
            <Link href="/login" className="font-semibold text-[var(--accent-strong)] hover:underline">
              {t("auth.goLogin")}
            </Link>
          </>
        ) : (
          <>
            {t("auth.noAccount")}{" "}
            <Link href="/signup" className="font-semibold text-[var(--accent-strong)] hover:underline">
              {t("auth.goSignup")}
            </Link>
          </>
        )}
      </p>
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-[var(--muted)]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[var(--foreground)] outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
      />
    </label>
  );
}

// يعيد مفتاح ترجمة معروفًا أو الرسالة الأصلية (fallback)
function errorKey(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login")) return "err.invalid";
  if (m.includes("already registered") || m.includes("already been registered")) return "err.exists";
  if (m.includes("password")) return "err.password";
  if (m.includes("email")) return "err.email";
  return message;
}
