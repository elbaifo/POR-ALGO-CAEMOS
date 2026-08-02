const VERSION = "1.0.0";

const MENSAJES_CARGA = [
"Inicializando...",
"Cargando recuerdos...",
"Preparando la aventura...",
"Sincronizando corazones...",
"¡Todo listo!"
];

document.addEventListener("DOMContentLoaded", iniciarAplicacion);

function iniciarAplicacion(){

const primeraVez = !localStorage.getItem("pas_profile");

const loading = document.getElementById("loading-screen");
const popup = document.getElementById("welcome-popup");

if(loading || popup){

    if(primeraVez){

        mostrarPantallaCarga();

    }else{

        if(loading){

            loading.style.display = "none";

        }

        if(popup){

            popup.style.display = "none";

        }

    }

}

if(document.getElementById("profile-container")){

    cargarPerfil();

}

}

function mostrarPantallaCarga(){

const loading = document.getElementById("loading-screen");

if(!loading) return;

const barra = loading.querySelector(".loading-progress");

let progreso = 0;

const intervalo = setInterval(()=>{

    progreso++;

    if(barra){

        barra.style.width = progreso + "%";

    }

    if(progreso === 20){

        actualizarMensajeCarga(MENSAJES_CARGA[1]);

    }

    if(progreso === 45){

        actualizarMensajeCarga(MENSAJES_CARGA[2]);

    }

    if(progreso === 70){

        actualizarMensajeCarga(MENSAJES_CARGA[3]);

    }

    if(progreso === 95){

        actualizarMensajeCarga(MENSAJES_CARGA[4]);

    }

    if(progreso >= 100){

        clearInterval(intervalo);

        setTimeout(()=>{

            loading.style.opacity = "0";

            setTimeout(()=>{

                loading.style.display = "none";

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

if(!popup) return;

popup.style.display = "flex";

const boton = document.getElementById("enter-button");

if(boton){

    boton.onclick = ()=>{

        crearPerfil();

        popup.style.opacity = "0";

        setTimeout(()=>{

            popup.style.display = "none";

        },500);

    };

}

}

function crearPerfil(){

const perfil = {

    nombre:"",
    puntos:0,
    monedas:0,
    logros:[],
    skins:[],
    inventario:[],
    ajustes:{},
    juegos:0,
    version:VERSION

};

localStorage.setItem(

    "pas_profile",

    JSON.stringify(perfil)

);

}

function cargarPerfil(){

const contenedor = document.getElementById("profile-container");

const perfil = JSON.parse(

    localStorage.getItem("pas_profile")

);

if(!perfil){

    return;

}

if(!perfil.nombre){

    contenedor.innerHTML = `

        <p>

            Ingresa un nombre de usuario

        </p>

        <div class="profile-input">

            <input
            id="username-input"
            type="text"
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

        if(nombre.length > 0){

            perfil.nombre = nombre;

            localStorage.setItem(

                "pas_profile",

                JSON.stringify(perfil)

            );

            cargarPerfil();

        }

    });

}else{

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

                Skins: 0/0

            </p>

        </div>

    `;

}

}

document.querySelectorAll("a").forEach(enlace=>{

const destino = enlace.getAttribute("href");

if(

    !destino ||

    destino.startsWith("#") ||

    destino.startsWith("http") ||

    enlace.target === "_blank"

){

    return;

}

enlace.addEventListener("click",e=>{

    e.preventDefault();

    document.body.classList.add("page-exit");

    setTimeout(()=>{

        window.location.href = destino;

    },350);

});

});

if("serviceWorker" in navigator){

navigator.serviceWorker.register("service-worker.js");

}