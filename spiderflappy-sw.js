const CACHE_NAME = "spider-flappy-v1";


const ARCHIVOS = [

    "./spiderflappy.html",

    "./spiderflappy.css",

    "./spiderflappy.js",

    "./spiderflappy-manifest.json",

    "./spider-art.png"

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