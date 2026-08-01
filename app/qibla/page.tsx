"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useT } from "@/components/LanguageProvider";
import PageHeader from "@/components/PageHeader";

// إحداثيات الكعبة المشرّفة
const KAABA_LAT = 21.4225;
const KAABA_LON = 39.8262;

/** اتجاه القبلة بالدرجات من الشمال الحقيقي */
function qiblaBearing(lat: number, lon: number): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const toDeg = (r: number) => (r * 180) / Math.PI;
  const dLon = toRad(KAABA_LON - lon);
  const y = Math.sin(dLon) * Math.cos(toRad(KAABA_LAT));
  const x =
    Math.cos(toRad(lat)) * Math.sin(toRad(KAABA_LAT)) -
    Math.sin(toRad(lat)) * Math.cos(toRad(KAABA_LAT)) * Math.cos(dLon);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

const norm = (d: number) => ((d % 360) + 360) % 360;

/** زاوية دوران الشاشة — بدونها تنحرف البوصلة ٩٠° في الوضع الأفقي */
function screenAngle(): number {
  if (typeof window === "undefined") return 0;
  const so = window.screen?.orientation?.angle;
  if (typeof so === "number") return so;
  const legacy = (window as unknown as { orientation?: number }).orientation;
  return typeof legacy === "number" ? legacy : 0;
}

export default function QiblaPage() {
  const t = useT();
  const [bearing, setBearing] = useState<number | null>(null);
  const [heading, setHeading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [denied, setDenied] = useState(false);
  const attached = useRef(false);

  const handler = useCallback((e: DeviceOrientationEvent) => {
    const anyE = e as DeviceOrientationEvent & { webkitCompassHeading?: number };
    let h: number | null = null;

    if (typeof anyE.webkitCompassHeading === "number") {
      // iOS يعطي الاتجاه جاهزًا بالنسبة للشمال
      h = anyE.webkitCompassHeading;
    } else if (e.absolute && e.alpha != null) {
      h = 360 - e.alpha;
    }

    if (h != null) setHeading(norm(h + screenAngle()));
  }, []);

  const attach = useCallback(() => {
    if (attached.current) return;
    attached.current = true;
    window.addEventListener("deviceorientationabsolute", handler as EventListener, true);
    window.addEventListener("deviceorientation", handler as EventListener, true);
  }, [handler]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setBearing(qiblaBearing(pos.coords.latitude, pos.coords.longitude)),
        () => setError(t("qibla.err")),
        { timeout: 8000, enableHighAccuracy: true }
      );
    } else {
      setError(t("qibla.err"));
    }

    const D = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
    if (typeof D?.requestPermission !== "function") attach();

    return () => {
      window.removeEventListener("deviceorientationabsolute", handler as EventListener, true);
      window.removeEventListener("deviceorientation", handler as EventListener, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function enableCompass() {
    const D = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
    if (typeof D?.requestPermission === "function") {
      D.requestPermission()
        .then((state) => (state === "granted" ? attach() : setDenied(true)))
        .catch(() => setDenied(true));
    } else {
      attach();
    }
  }

  const live = heading != null;
  const h = heading ?? 0;

  // الوردة تدور عكس اتجاه الجهاز ليبقى الشمال على الشمال الحقيقي
  const roseRot = live ? -h : 0;
  // إبرة القبلة تبقى دائمًا بزاوية القبلة بالنسبة للوردة
  const needleRot = bearing == null ? 0 : bearing - h;

  const delta = bearing == null || !live ? null : norm(bearing - h);
  const aligned = delta != null && (delta < 6 || delta > 354);

  return (
    <div className="mx-auto max-w-md px-4 py-8 text-center">
      <PageHeader icon="🧭" title={t("qibla.title")} subtitle={t("qibla.subtitle")} />

      {error && (
        <p className="mb-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      )}

      {/* البوصلة */}
      <div
        className={`relative mx-auto h-64 w-64 rounded-full border-4 bg-[var(--card)] transition-colors ${
          aligned ? "border-emerald-500" : "border-[var(--border)]"
        }`}
      >
        {/* وردة الجهات — تدور مع الجهاز */}
        <div
          className="absolute inset-0"
          style={{ transform: `rotate(${roseRot}deg)`, transition: "transform 0.15s ease-out" }}
        >
          <span className="absolute left-1/2 top-1 -translate-x-1/2 text-xs font-bold text-red-500">
            N
          </span>
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-[var(--muted)]">
            E
          </span>
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-bold text-[var(--muted)]">
            S
          </span>
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-[var(--muted)]">
            W
          </span>
        </div>

        {/* إبرة القبلة */}
        <div
          className="absolute inset-0"
          style={{ transform: `rotate(${needleRot}deg)`, transition: "transform 0.15s ease-out" }}
        >
          <div
            className={`absolute left-1/2 top-1/2 h-24 w-1 -translate-x-1/2 -translate-y-full rounded transition-colors ${
              aligned ? "bg-emerald-500" : "bg-emerald-700"
            }`}
          />
          <div className="absolute left-1/2 top-2 -translate-x-1/2 text-3xl">🕋</div>
        </div>

        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-700" />
      </div>

      {bearing != null && (
        <div className="mt-6">
          <div className="text-sm text-[var(--muted)]">{t("qibla.bearing")}</div>
          <div className="tabular text-3xl font-bold text-[var(--accent-strong)]">
            {Math.round(bearing)}°
          </div>
          {live && (
            <div className="tabular mt-1 text-sm text-[var(--muted)]">
              {t("qibla.heading")}: {Math.round(h)}°
            </div>
          )}
          {aligned && (
            <p className="mt-2 font-semibold text-[var(--accent-strong)]">{t("qibla.aligned")}</p>
          )}
        </div>
      )}

      {/* حالة البوصلة — لا نُظهر إبرة "حيّة" وهي ليست كذلك */}
      {!live && (
        <div className="mt-6">
          <p className="rounded-xl bg-[var(--hover)] px-4 py-3 text-sm leading-relaxed text-[var(--foreground)]">
            {denied ? t("qibla.denied") : t("qibla.northUp")}
          </p>
          <button
            onClick={enableCompass}
            className="mt-3 rounded-xl bg-emerald-700 px-5 py-2.5 font-semibold text-white transition hover:bg-emerald-800 active:scale-95"
          >
            {t("qibla.enable")}
          </button>
        </div>
      )}

      <p className="mt-6 text-xs leading-relaxed text-[var(--muted)]">{t("qibla.hint")}</p>
    </div>
  );
}
