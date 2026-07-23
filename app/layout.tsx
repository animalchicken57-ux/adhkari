import type { Metadata } from "next";
import { Tajawal, Amiri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "أذكاري — متتبّع أذكار الصباح والمساء",
  description:
    "تطبيق يساعدك على المحافظة على أذكار الصباح والمساء بعدّاد تفاعلي، متابعة يومية، وسلاسل تحفيزية.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${tajawal.variable} ${amiri.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[var(--border)] py-6 text-center text-sm text-[var(--muted)]">
          أذكاري — رفيقك اليومي لأذكار الصباح والمساء
        </footer>
      </body>
    </html>
  );
}
