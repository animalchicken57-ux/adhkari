import { headers } from "next/headers";
import QRCode from "qrcode";
import ShareButtons from "@/components/ShareButtons";
import { getLang } from "@/lib/lang-server";
import { getT } from "@/lib/i18n";

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
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">{t("share.title")}</h1>
        <p className="mt-1 text-[var(--muted)]">{t("share.subtitle")}</p>
      </div>

      <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 text-center shadow-sm">
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

      <div className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 text-center shadow-sm">
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
