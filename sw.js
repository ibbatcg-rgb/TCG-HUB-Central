// Service worker do TC&G Hub — torna o app instalável e funcional offline (network-first).
const CACHE = "tcg-hub-v1";
const ASSETS = [
  "./", "./index.html", "./fipe.html", "./credito-bc.html", "./cheat-sheet.html",
  "./dados_dashboard.js", "./dados_credito_bc.js", "./acoes.js", "./precos.js",
  "./setores_news.js", "./chart.umd.min.js",
  "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-180.png",
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS).catch(() => {})).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return; // cross-origin (iframes) passa direto
  e.respondWith(
    fetch(e.request).then((resp) => { const cp = resp.clone(); caches.open(CACHE).then((c) => c.put(e.request, cp)); return resp; })
      .catch(() => caches.match(e.request).then((r) => r || caches.match("./index.html")))
  );
});
