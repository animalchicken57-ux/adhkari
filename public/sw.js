// خدمة عامل بسيطة لتمكين التثبيت والعمل دون اتصال (app shell)
const CACHE = "adhkari-v6";
const ASSETS = ["/", "/adhkar", "/tasbih", "/prayer-times", "/questions", "/names", "/prophets", "/ramadan", "/books", "/scriptures", "/fun-facts", "/duas", "/favourites", "/qibla", "/share", "/about", "/masjid-bg.jpg", "/icon-192.png", "/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

// النقر على التذكير يفتح صفحة الأذكار (أو يركّز نافذة مفتوحة)
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if ("focus" in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow("/adhkar");
    })
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  // نتجاهل طلبات واجهات البيانات الخارجية والـ Supabase
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then((r) => r || caches.match("/")))
  );
});
