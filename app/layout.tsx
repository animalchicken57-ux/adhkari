import type { Metadata, Viewport } from "next";
import { Tajawal, Amiri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/components/LanguageProvider";
import LanguageGate from "@/components/LanguageGate";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import { getLang } from "@/lib/lang-server";
import { getT, dir } from "@/lib/i18n";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "أذكاري · Adhkari — Morning & Evening Adhkar",
  description:
    "تطبيق يساعدك على المحافظة على أذكار الصباح والمساء بعدّاد تفاعلي، متابعة يومية، وسلاسل تحفيزية.",
  icons: { icon: "/icon-192.png", apple: "/icon-192.png" },
  appleWebApp: { capable: true, title: "أذكاري", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#0b6e4f",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLang();
  const t = getT(lang);

  return (
    <html
      lang={lang}
      dir={dir(lang)}
      suppressHydrationWarning
      className={`${tajawal.variable} ${amiri.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        <ServiceWorkerRegister />
        <LanguageProvider lang={lang}>
          <LanguageGate />
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-[var(--border)] py-6 text-center text-sm text-[var(--muted)]">
            {t("footer")}
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
