import { headers } from "next/headers";
import QRCode from "qrcode";
import ShareButtons from "@/components/ShareButtons";
import { getLang } from "@/lib/lang-server";
import { getT } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";

export const metadata = { title: "شارك التطبيق — أذكار المسلم" };

export default async function SharePage() {
  const t = getT(await getLang());

  const h = await headers();
  const host = h.get("host") ?? "adhkari-the-project3.vercel.app";
  const proto = host.startsWith("localhost") ? "http" : "https";
  const url = `${proto}://${host}`;

  // نولّد رمز QR على الخادم — بلا اتصال بأي خدمة خارجية
  const qr = await QRCode.toString(url, {
    type: "svg",
    margin: 1,
    width: 220,
    color: { dark: "#000000", light: "#ffffff" },
  });

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <PageHeader icon="📤" title={t("share.title")} subtitle={t("share.subtitle")} />

      <div className="card-soft p-6 text-center">
        <div
          className="mx-auto w-[220px] rounded-2xl bg-white p-3 [&>svg]:h-full [&>svg]:w-full"
          dangerouslySetInnerHTML={{ __html: qr }}
        />
        <p className="mt-3 text-sm text-[var(--muted)]">{t("share.scan")}</p>

        <p
          dir="ltr"
          className="mt-4 break-all rounded-xl bg-[var(--hover)] px-4 py-3 font-mono text-sm text-[var(--accent-strong)]"
        >
          {url}
        </p>

        <ShareButtons url={url} />
      </div>

      <div className="card-soft mt-6 p-8 text-center">
        <div className="text-4xl" aria-hidden>
          🌱
        </div>
        <p className="font-quran mt-4 text-xl leading-loose text-[var(--foreground)]">
          {t("share.hadith")}
        </p>
        <p className="mt-3 text-sm text-[var(--muted)]">{t("share.hadithRef")}</p>
      </div>
    </div>
  );
}
