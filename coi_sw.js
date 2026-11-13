// coi_sw.js — yalnız okuma testi sayfasına COOP/COEP başlıkları ekler (çok çekirdekli WASM için "cross-origin isolated").
// GitHub Pages başlık koyamadığı için. Diğer sayfalara (kayıt sayfası) dokunmaz.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.mode !== 'navigate') return;
  const p = new URL(r.url).pathname;
  if (!/okuma_test\.html$|\/okuma_test\/(index\.html)?$/.test(p)) return;
  e.respondWith(fetch(r).then((res) => {
    if (!res || res.status === 0) return res;
    const h = new Headers(res.headers);
    h.set('Cross-Origin-Opener-Policy', 'same-origin');
    h.set('Cross-Origin-Embedder-Policy', 'credentialless');
    return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h });
  }));
});
