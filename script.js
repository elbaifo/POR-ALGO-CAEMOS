const VERSION = "2.0.0";

const STORAGE_KEY = "pac_profile";

const MENSAJES_CARGA = [

    "Preparando el primer paso...",

    "Levantando el camino...",

    "Superando obstáculos...",

    "Casi estamos listos...",

    "Todo preparado."

];

document.addEventListener(

    "DOMContentLoaded",

    iniciarAplicacion

);


function iniciarAplicacion(){

    const primeraVez = !localStorage.getItem(STORAGE_KEY);

    const loading = document.getElementById("loading-screen");

    const popup = document.getElementById("welcome-popup");


    if(loading || popup){

        if(primeraVez){

            mostrarPantallaCarga();

        }else{

            if(loading){

                loading.style.display="none";

            }

            if(popup){

                popup.style.display="none";

            }

        }

    }


    if(document.getElementById("profile-container")){

    cargarPerfil();

}

if(document.getElementById("spiderflappy-record")){

    actualizarRecords();

}

activarTransiciones();

registrarServiceWorker();

}



function mostrarPantallaCarga(){

    const loading = document.getElementById("loading-screen");


    if(!loading){

        return;

    }


    const barra = loading.querySelector(".loading-progress");

    let progreso = 0;


    actualizarMensajeCarga(MENSAJES_CARGA[0]);


    const intervalo = setInterval(()=>{


        progreso++;


        if(barra){

            barra.style.width = progreso + "%";

        }


        if(progreso===20){

            actualizarMensajeCarga(MENSAJES_CARGA[1]);

        }


        if(progreso===45){

            actualizarMensajeCarga(MENSAJES_CARGA[2]);

        }


        if(progreso===70){

            actualizarMensajeCarga(MENSAJES_CARGA[3]);

        }


        if(progreso===95){

            actualizarMensajeCarga(MENSAJES_CARGA[4]);

        }


        if(progreso>=100){

            clearInterval(intervalo);


            setTimeout(()=>{


                loading.style.opacity="0";


                setTimeout(()=>{


                    loading.style.display="none";

                    mostrarPopupBienvenida();


                },500);


            },500);

        }


    },70);

}



function actualizarMensajeCarga(texto){

    const mensaje = document.querySelector(".loading-text");


    if(mensaje){

        mensaje.textContent = texto;

    }

}



function mostrarPopupBienvenida(){

    const popup = document.getElementById("welcome-popup");


    if(!popup){

        return;

    }


    popup.style.display="flex";


    const boton = document.getElementById("enter-button");


    if(boton){

        boton.onclick=()=>{


            crearPerfil();


            popup.style.opacity="0";


            setTimeout(()=>{


                popup.style.display="none";


            },500);


        };

    }

}



function crearPerfil(){

    const perfil={

        nombre:"",

        puntos:0,

        monedas:0,

        puntosTotales:0,

        recordGlobal:0,

        juegos:0,

        logros:[],

        skinsCompradas:[],

        inventario:[],

        ajustes:{},

        version:VERSION

    };


    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(perfil)

    );

}



function cargarPerfil(){

    const contenedor = document.getElementById("profile-container");


    const perfil = JSON.parse(

        localStorage.getItem(STORAGE_KEY)

    );


    if(!contenedor || !perfil){

        return;

    }



    if(!perfil.nombre){


        contenedor.innerHTML = `

            <p>

                Elige un nombre de usuario

            </p>

            <div class="profile-input">

                <input

                id="username-input"

                type="text"

                maxlength="20"

                placeholder="Nombre">


                <button id="confirm-name">

                    Confirmar

                </button>

            </div>

        `;



        document

        .getElementById("confirm-name")

        .addEventListener("click",()=>{


            const nombre = document

            .getElementById("username-input")

            .value

            .trim();



            if(nombre.length>0){


                perfil.nombre = nombre;


                localStorage.setItem(

                    STORAGE_KEY,

                    JSON.stringify(perfil)

                );


                cargarPerfil();

            }


        });


        return;

    }



    contenedor.innerHTML = `

        <h2 class="profile-name">

            ${perfil.nombre}

        </h2>


        <div class="profile-stats">


            <p>

                Puntos: ${perfil.puntos}

            </p>


            <p>

                Monedas: ${perfil.monedas}

            </p>


            <p>

                Récord global: ${perfil.recordGlobal}

            </p>


            <p>

                Puntos totales: ${perfil.puntosTotales}

            </p>


            <p>

                Juegos completados: ${perfil.juegos}

            </p>


            <p>

                Skins: ${perfil.skinsCompradas.length}

            </p>


        </div>

    `;

}



function activarTransiciones(){

    document

    .querySelectorAll("a")

    .forEach((enlace)=>{


        const destino = enlace.getAttribute("href");


        if(

            !destino ||

            destino.startsWith("#") ||

            destino.startsWith("http") ||

            enlace.target==="_blank"

        ){

            return;

        }



        enlace.addEventListener("click",(e)=>{


            e.preventDefault();



            document.body.classList.add("page-exit");



            setTimeout(()=>{


                window.location.href = destino;



            },350);


        });


    });

}



function obtenerPerfil(){

    return JSON.parse(

        localStorage.getItem(STORAGE_KEY)

    );

}



function guardarPerfil(perfil){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(perfil)

    );

}

function actualizarRecords(){

    const perfil = obtenerPerfil();

    if(!perfil){

        return;

    }

    const spiderRecord = document.getElementById("spiderflappy-record");

    if(spiderRecord){

        spiderRecord.textContent =
        "Récord: " + (perfil.spiderFlappyRecord || 0);

    }

}



function registrarServiceWorker(){

    if("serviceWorker" in navigator){

        navigator.serviceWorker.register(

            "service-worker.js"

        );

    }

}



window.addEventListener("pageshow",(event)=>{


    document.body.classList.remove("page-exit");



    if(event.persisted){


        document.body.style.animation="none";



        setTimeout(()=>{


            document.body.style.animation="pageEnter .7s ease forwards";


        },10);


    }


});