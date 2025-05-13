const staticDevCoffee = "low-cost-not-shooting-game-sim"
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/audio/tick1.mp3",
  "/audio/tick2.mp3",
  "/images/cursorl.png",
  "/images/cursorr.png"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})