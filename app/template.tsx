"use client";

// يُعاد إنشاؤه عند كل تنقّل بين الصفحات → تشغيل حركة الانتقال في كل مرة
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-transition">{children}</div>;
}
