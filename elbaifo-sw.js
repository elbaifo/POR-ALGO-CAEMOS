const CACHE_NAME = "el-baifo-run-v1";

const ARCHIVOS = [

    "./elbaiforun.html",

    "./elbaiforun.css",

    "./elbaiforun.js",

    "./elbaifo-manifest.json",

    "./elbaifo.png",

    "./baifomusic.mp3"

];

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
        .then(cache => {

            return cache.addAll(ARCHIVOS);

        })

    );

});

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()
        .then(keys => {

            return Promise.all(

                keys
                .filter(key => key !== CACHE_NAME)
                .map(key => caches.delete(key))

            );

        })

    );

});

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
        .then(response => {

            return response || fetch(event.request);

        })

    );

});