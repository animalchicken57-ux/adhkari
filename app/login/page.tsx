import AuthForm from "@/components/AuthForm";

export const metadata = { title: "تسجيل الدخول — أذكاري" };

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <AuthForm mode="login" />
    </div>
  );
}
