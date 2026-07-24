const cacheName = "weather-app-v1";

const assets = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json"
];
const assets = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];

// Install Service Worker
self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            return cache.addAll(assets);
        })
    );

});


// Activate Service Worker
self.addEventListener("activate", event => {

    event.waitUntil(
        caches.keys().then(keys => {

            return Promise.all(
                keys.map(key => {

                    if(key !== cacheName){
                        return caches.delete(key);
                    }

                })
            );

        })
    );

});


// Fetch Offline Support
self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
        .then(response => {

            return response || fetch(event.request);

        })

    );

});
