"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useT } from "@/components/LanguageProvider";

// إحداثيات الكعبة المشرّفة
const KAABA_LAT = 21.4225;
const KAABA_LON = 39.8262;

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

export default function QiblaPage() {
  const t = useT();
  const [bearing, setBearing] = useState<number | null>(null);
  const [heading, setHeading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const attached = useRef(false);

  const handler = useCallback((e: DeviceOrientationEvent) => {
    const anyE = e as DeviceOrientationEvent & { webkitCompassHeading?: number };
    let h: number | null = null;
    if (typeof anyE.webkitCompassHeading === "number") h = anyE.webkitCompassHeading;
    else if (e.absolute && e.alpha != null) h = (360 - e.alpha) % 360;
    if (h != null) setHeading(h);
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
        { timeout: 8000 }
      );
    } else {
      setError(t("qibla.err"));
    }
    // للأجهزة التي لا تتطلّب إذنًا صريحًا
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
      D.requestPermission().then((state) => {
        if (state === "granted") attach();
      });
    } else {
      attach();
    }
  }

  const needle = bearing == null ? 0 : bearing - (heading ?? 0);
  const aligned = heading != null && bearing != null && Math.abs(((needle % 360) + 360) % 360) < 6;

  return (
    <div className="mx-auto max-w-md px-4 py-8 text-center">
      <h1 className="text-3xl font-bold text-[var(--foreground)]">{t("qibla.title")}</h1>
      <p className="mt-1 text-[var(--muted)]">{t("qibla.subtitle")}</p>

      {error && (
        <p className="mt-6 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      {/* البوصلة */}
      <div className="relative mx-auto mt-8 h-64 w-64 rounded-full border-4 border-[var(--border)] bg-[var(--card)]">
        <span className="absolute left-1/2 top-1 -translate-x-1/2 text-xs font-bold text-[var(--muted)]">N</span>
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-[var(--muted)]">E</span>
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-bold text-[var(--muted)]">S</span>
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-[var(--muted)]">W</span>

        <div
          className="absolute inset-0"
          style={{ transform: `rotate(${needle}deg)`, transition: "transform 0.2s ease-out" }}
        >
          <div className="absolute left-1/2 top-1/2 h-24 w-1 -translate-x-1/2 -translate-y-full rounded bg-emerald-600" />
          <div className="absolute left-1/2 top-2 -translate-x-1/2 text-3xl">🕋</div>
        </div>
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-700" />
      </div>

      {bearing != null && (
        <div className="mt-6">
          <div className="text-sm text-[var(--muted)]">{t("qibla.bearing")}</div>
          <div className="text-3xl font-bold text-[var(--accent-strong)]">
            {Math.round(bearing)}°
          </div>
          {aligned && (
            <p className="mt-2 font-semibold text-[var(--accent-strong)]">{t("qibla.aligned")}</p>
          )}
        </div>
      )}

      {heading == null && (
        <button
          onClick={enableCompass}
          className="mt-6 rounded-xl bg-emerald-700 px-5 py-2.5 font-semibold text-white hover:bg-emerald-800"
        >
          {t("qibla.enable")}
        </button>
      )}

      <p className="mt-6 text-xs text-[var(--muted)]">{t("qibla.hint")}</p>
    </div>
  );
}
