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

    if(primeraVez){

        mostrarPantallaCarga();

    }else{

        mostrarMenuPrincipal();

    }

}

/* ===========================
   PANTALLA DE CARGA
=========================== */

function mostrarPantallaCarga(){

    const app = document.getElementById("app");

    app.innerHTML = `

        <div class="loading-screen">

            <h1 class="loading-logo">POR ALGO SERÁ</h1>

            <div class="loading-bar">

                <div class="loading-fill" id="loading-fill"></div>

            </div>

            <p class="loading-text" id="loading-text">
                ${MENSAJES_CARGA[0]}
            </p>

        </div>

    `;

    const barra = document.getElementById("loading-fill");
    const texto = document.getElementById("loading-text");

    let progreso = 0;

    const intervalo = setInterval(() => {

        progreso++;

        barra.style.width = progreso + "%";

        if(progreso === 20) texto.textContent = MENSAJES_CARGA[1];
        if(progreso === 45) texto.textContent = MENSAJES_CARGA[2];
        if(progreso === 70) texto.textContent = MENSAJES_CARGA[3];
        if(progreso === 95) texto.textContent = MENSAJES_CARGA[4];

        if(progreso >= 100){

            clearInterval(intervalo);

            setTimeout(() => {

                mostrarPopupBienvenida();

            },500);

        }

    },70);

}

/* ===========================
   POPUP BIENVENIDA
=========================== */

function mostrarPopupBienvenida(){

    const app = document.getElementById("app");

    app.innerHTML += `

        <div class="popup-overlay">

            <div class="popup">

                <h1>Bienvenida ❤️</h1>

                <p>
                    Antes de empezar esta aventura quiero darte las gracias por este primer año.
                    Todo lo que vas a ver a partir de ahora lo he hecho pensando únicamente en ti.
                    Espero que disfrutes cada rincón de <strong>POR ALGO SERÁ</strong>.
                </p>

                <button id="start-button">
                    Comenzar
                </button>

            </div>

        </div>

    `;

    document
        .getElementById("start-button")
        .addEventListener("click", crearPerfil);

}

/* ===========================
   CREAR PERFIL
=========================== */

function crearPerfil(){

    const perfil = {

        nombre:"",
        puntos:0,
        monedas:0,
        logros:[],
        skins:[],
        inventario:[],
        ajustes:{},
        version:VERSION

    };

    localStorage.setItem("pas_profile", JSON.stringify(perfil));

    mostrarMenuPrincipal();

}

/* ===========================
   MENÚ PRINCIPAL
=========================== */

function mostrarMenuPrincipal(){

    const app = document.getElementById("app");

    app.innerHTML = `

        <div style="text-align:center;">

            <h1 style="font-size:2.5rem;margin-bottom:20px;letter-spacing:6px;">

                POR ALGO SERÁ

            </h1>

            <p style="color:#A8B3C2;">

                Menú principal en desarrollo...

            </p>

        </div>

    `;

}