const CACHE_NAME = "rc-portfolio-v1";
const OFFLINE_URL = "/offline.html";

const PRECACHE_ASSETS = [
	"/",
	"/pt",
	"/en",
	"/favicon.ico",
	"/icon.png",
	"/apple-icon.png",
	"/og-image.png",
	"/offline.html",
];

// Install event - precache core assets
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => {
				return cache.addAll(PRECACHE_ASSETS);
			})
			.then(() => self.skipWaiting()),
	);
});

// Activate event - cleanup old caches
self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) => {
				return Promise.all(
					cacheNames.map((cacheName) => {
						if (cacheName !== CACHE_NAME) {
							return caches.delete(cacheName);
						}
					}),
				);
			})
			.then(() => self.clients.claim()),
	);
});

// Fetch event - Stale-while-revalidate strategy with offline fallback
self.addEventListener("fetch", (event) => {
	// Skip non-GET requests and cross-origin requests
	if (
		event.request.method !== "GET" ||
		!event.request.url.startsWith(self.location.origin)
	) {
		return;
	}

	event.respondWith(
		caches.match(event.request).then((cachedResponse) => {
			const fetchPromise = fetch(event.request)
				.then((networkResponse) => {
					if (
						networkResponse &&
						networkResponse.status === 200 &&
						networkResponse.type === "basic"
					) {
						const responseToCache = networkResponse.clone();
						caches.open(CACHE_NAME).then((cache) => {
							cache.put(event.request, responseToCache);
						});
					}
					return networkResponse;
				})
				.catch(() => {
					if (cachedResponse) {
						return cachedResponse;
					}
					if (event.request.headers.get("accept")?.includes("text/html")) {
						return caches.match(OFFLINE_URL);
					}
				});

			return cachedResponse || fetchPromise;
		}),
	);
});
