"use client";

import { useEffect } from "react";

// يسجّل خدمة العامل لتمكين تثبيت التطبيق (PWA)
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);
  return null;
}
