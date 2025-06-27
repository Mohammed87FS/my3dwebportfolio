// Simple service worker for better mobile experience
const CACHE_NAME = "portfolio-v1";
const urlsToCache = [
  "/",
  "/git.svg",
  "/insta.svg",
  "/linked2.svg",
  "/mail.svg",
  "/favicon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache");
        return cache.addAll(
          urlsToCache.map((url) => {
            return new Request(url, { cache: "reload" });
          })
        );
      })
      .catch((error) => {
        console.warn("Cache install failed:", error);
      })
  );
});

self.addEventListener("fetch", (event) => {
  // Skip service worker for development environment
  if (
    event.request.url.includes("localhost:5173") ||
    event.request.url.includes("/@fs/") ||
    event.request.url.includes(".svelte-kit") ||
    event.request.url.includes("/@vite/") ||
    event.request.url.includes("@sveltejs")
  ) {
    return;
  }

  // Only handle GET requests for same origin
  if (
    event.request.method !== "GET" ||
    !event.request.url.startsWith(self.location.origin)
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      if (response) {
        return response;
      }
      return fetch(event.request).catch(() => {
        // Offline fallback - could return a custom offline page
        if (event.request.destination === "document") {
          return new Response(
            "<html><body style=\"font-family: 'Press Start 2P', cursive; background: #000; color: #FFAA00; text-align: center; padding: 2rem;\"><h1>Offline</h1><p>Please check your connection and try again.</p></body></html>",
            { headers: { "Content-Type": "text/html" } }
          );
        }
        return new Response("Network error", { status: 408 });
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
