const CACHE_NAME = "por-algo-caemos-v3";

const ARCHIVOS = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./favicon.png"
];

self.addEventListener("install", event => {

    self.skipWaiting();

    event.waitUntil(

        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(ARCHIVOS))

    );

});

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys => {

            return Promise.all(

                keys.map(key => {

                    if(key !== CACHE_NAME){

                        return caches.delete(key);

                    }

                })

            );

        })

    );

    self.clients.claim();

});

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
        .then(response => response || fetch(event.request))

    );

});