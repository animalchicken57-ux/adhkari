import AuthForm from "@/components/AuthForm";

export const metadata = { title: "تسجيل الدخول — أذكاري" };
// تُصيَّر عند الطلب (تتفادى فشل البناء إن غابت متغيّرات البيئة أثناء الـ prerender)
export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <AuthForm mode="login" />
    </div>
  );
}
