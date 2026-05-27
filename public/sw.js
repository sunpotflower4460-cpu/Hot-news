// Minimal passthrough service worker — satisfies PWA installability without
// aggressive caching (the content layer is still a mock shell).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {
  // Network passthrough; caching strategy added once the real API exists.
});
