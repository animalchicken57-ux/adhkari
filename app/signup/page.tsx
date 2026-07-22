import AuthForm from "@/components/AuthForm";

export const metadata = { title: "إنشاء حساب — أذكاري" };

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <AuthForm mode="signup" />
    </div>
  );
}
