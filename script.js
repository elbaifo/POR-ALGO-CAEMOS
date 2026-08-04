const VERSION = "2.0.0";

const STORAGE_KEY = "pac_profile";

const MENSAJES_CARGA = [

    "Preparando el primer paso...",

    "Si me caigo...",

    "Me levanto...",

    "Casi estamos listos...",

    "Aunque duela."

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

    actualizarPerfilJuegos();

    cargarInventario();


}


comprobarPerfilJuegos();



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

        inventario:[
    "edificio_noche",
    "ciudad_noche"
],

equipado:{
    personaje:"spiderman",
    edificio:"edificio_noche",
    fondo:"ciudad_noche"
},

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

function actualizarPerfilJuegos(){

    const perfil = obtenerPerfil();


    if(!perfil){

        return;

    }


    const record = document.getElementById("profile-spider-record");

    const puntos = document.getElementById("profile-spider-points");


    if(record){

        record.textContent = perfil.spiderFlappyRecord || 0;

    }


    if(puntos){

        puntos.textContent = perfil.puntos || 0;

    }

}


function comprobarPerfilJuegos(){

    const popup = document.getElementById("profile-required-popup");


    if(!popup){

        return;

    }


    const perfil = obtenerPerfil();


    if(!perfil || !perfil.nombre){

        popup.style.display="flex";

    }else{

        popup.style.display="none";

    }

}

function registrarServiceWorker(){

    if("serviceWorker" in navigator){

        navigator.serviceWorker.register(

            "service-worker.js"

        );

    }

}



function cargarInventario(){

    const personajes = document.getElementById("inventario-personajes");
    const edificios = document.getElementById("inventario-edificios");
    const fondos = document.getElementById("inventario-fondos");


    if(!personajes || !edificios || !fondos){
        return;
    }


    const perfil = obtenerPerfil();


    if(!perfil){
        return;
    }


    const objetos = {

        spiderman:{
            nombre:"Spider-Man",
            imagen:"spiderman.png",
            tipo:"personaje"
        },


        edificio_noche:{
            nombre:"Edificio de noche",
            imagen:"edificio_noche.png",
            tipo:"edificio"
        },

        edificio_dia:{
            nombre:"Edificio Día",
            imagen:"edificio_dia.png",
            tipo:"edificio"
        },


        ciudad_noche:{
            nombre:"Ciudad de noche",
            imagen:"ciudad_noche.png",
            tipo:"fondo"
        },

        ciudad_dia:{
            nombre:"Ciudad Día",
            imagen:"ciudad_dia.png",
            tipo:"fondo"
        }

    };



    personajes.innerHTML = "";
    edificios.innerHTML = "";
    fondos.innerHTML = "";



    perfil.inventario.forEach(id=>{


        const objeto = objetos[id];


        if(!objeto){
            return;
        }



        const tarjeta = `

            <div class="shop-card">


                <div class="shop-preview">

                    <img src="${objeto.imagen}" alt="${objeto.nombre}">

                </div>


                <h3>

                    ${objeto.nombre}

                </h3>


                <p class="shop-price">

                    Obtenido

                </p>


                <button class="shop-button" data-equipar="${id}">

    Equipar

</button>


            </div>

        `;



        if(objeto.tipo==="personaje"){

            personajes.innerHTML += tarjeta;

        }


        if(objeto.tipo==="edificio"){

            edificios.innerHTML += tarjeta;

        }


        if(objeto.tipo==="fondo"){

            fondos.innerHTML += tarjeta;

        }


    });


document.querySelectorAll("[data-equipar]").forEach(boton=>{

    boton.addEventListener("click",()=>{

        equiparCosmetico(boton.dataset.equipar);

    });

});

}

function equiparCosmetico(id){

    const perfil = obtenerPerfil();

    if(!perfil){
        return;
    }


    const objetos = {

        spiderman:"personaje",

        edificio_noche:"edificio",

        edificio_dia:"edificio",

        ciudad_noche:"fondo",

        ciudad_dia:"fondo"

    };


    const tipo = objetos[id];


    if(!tipo){
        return;
    }



    perfil.equipado[tipo] = id;


    guardarPerfil(perfil);



    mostrarDynamicIsland(
        "Cosmético equipado correctamente."
    );

}

function mostrarDynamicIsland(texto){

    const island = document.getElementById("dynamic-island");
    const textoIsland = document.getElementById("dynamic-island-text");


    if(!island || !textoIsland){
        return;
    }


    textoIsland.textContent = texto;


    island.classList.remove("hide");
    island.classList.remove("show");


    void island.offsetWidth;


    island.classList.add("show");


    clearTimeout(island.timeout);


    island.timeout=setTimeout(()=>{


        island.classList.remove("show");

        island.classList.add("hide");


    },3000);

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