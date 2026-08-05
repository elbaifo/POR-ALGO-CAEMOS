document.addEventListener("DOMContentLoaded",()=>{

    if(!document.getElementById("inventario-personajes")){
        return;
    }

    cargarInventario();

});

const COSMETICOS={

    personajes:[

        {
            id:"spiderman",
            nombre:"Spider-Man",
            imagen:"spiderman.png"
        },

        {
            id:"personaje2",
            nombre:"Próximamente",
            bloqueado:true
        },

        {
            id:"personaje3",
            nombre:"Próximamente",
            bloqueado:true
        },

        {
            id:"personaje4",
            nombre:"Próximamente",
            bloqueado:true
        }

    ],

    edificios:[

        {
            id:"edificio_noche",
            nombre:"Edificio Noche",
            imagen:"edificio_noche.png"
        },

        {
            id:"edificio_dia",
            nombre:"Edificio Día",
            imagen:"edificio_dia.png"
        },

        {
            id:"edificio3",
            nombre:"Próximamente",
            bloqueado:true
        },

        {
            id:"edificio4",
            nombre:"Próximamente",
            bloqueado:true
        }

    ],

    fondos:[

        {
            id:"ciudad_noche",
            nombre:"Ciudad Noche",
            imagen:"ciudad_noche.png"
        },

        {
            id:"ciudad_dia",
            nombre:"Ciudad Día",
            imagen:"ciudad_dia.png"
        },

        {
            id:"fondo3",
            nombre:"Próximamente",
            bloqueado:true
        },

        {
            id:"fondo4",
            nombre:"Próximamente",
            bloqueado:true
        }

    ],

    baifoPersonajes:[

        {
            id:"baifo_default",
            nombre:"El Baifo",
            imagen:"elbaifo.png"
        },

        {
            id:"baifo_personaje2",
            nombre:"Próximamente",
            bloqueado:true
        },

        {
            id:"baifo_personaje3",
            nombre:"Próximamente",
            bloqueado:true
        },

        {
            id:"baifo_personaje4",
            nombre:"Próximamente",
            bloqueado:true
        }

    ],

    baifoFondos:[

        {
            id:"baifo_fondo_default",
            nombre:"Canarias",
            imagen:"canarias.png"
        },

        {
            id:"baifo_fondo2",
            nombre:"Próximamente",
            bloqueado:true
        },

        {
            id:"baifo_fondo3",
            nombre:"Próximamente",
            bloqueado:true
        },

        {
            id:"baifo_fondo4",
            nombre:"Próximamente",
            bloqueado:true
        }

    ],

    baifoMusicas:[

        {
            id:"baifo_music_default",
            nombre:"Columbia",
            imagen:"columbia.png"
        },

        {
            id:"baifo_music2",
            nombre:"Próximamente",
            bloqueado:true
        },

        {
            id:"baifo_music3",
            nombre:"Próximamente",
            bloqueado:true
        },

        {
            id:"baifo_music4",
            nombre:"Próximamente",
            bloqueado:true
        }

    ]

};

function cargarInventario(){

    const perfil = obtenerPerfil();

    if(!perfil){
        return;
    }

    if(!perfil.equipado){
        perfil.equipado = {};
    }

    if(!perfil.equipado.baifoPersonaje){
        perfil.equipado.baifoPersonaje = "baifo_default";
    }

    if(!perfil.equipado.baifoFondo){
        perfil.equipado.baifoFondo = "baifo_fondo_default";
    }

    if(!perfil.equipado.baifoMusica){
        perfil.equipado.baifoMusica = "baifo_music_default";
    }

    guardarPerfil(perfil);

    const personajes = document.getElementById("inventario-personajes");
    const edificios = document.getElementById("inventario-edificios");
    const fondos = document.getElementById("inventario-fondos");

    const baifoPersonajes = document.getElementById("inventario-baifo-personajes");
    const baifoFondos = document.getElementById("inventario-baifo-fondos");
    const baifoMusicas = document.getElementById("inventario-baifo-musicas");

    personajes.innerHTML = "";
    edificios.innerHTML = "";
    fondos.innerHTML = "";

    if(baifoPersonajes) baifoPersonajes.innerHTML = "";
    if(baifoFondos) baifoFondos.innerHTML = "";
    if(baifoMusicas) baifoMusicas.innerHTML = "";

    crearCategoria(
        COSMETICOS.personajes,
        personajes,
        perfil,
        "personaje"
    );

    crearCategoria(
        COSMETICOS.edificios,
        edificios,
        perfil,
        "edificio"
    );

    crearCategoria(
        COSMETICOS.fondos,
        fondos,
        perfil,
        "fondo"
    );

    if(baifoPersonajes){
        crearCategoria(
            COSMETICOS.baifoPersonajes,
            baifoPersonajes,
            perfil,
            "baifoPersonaje"
        );
    }

    if(baifoFondos){
        crearCategoria(
            COSMETICOS.baifoFondos,
            baifoFondos,
            perfil,
            "baifoFondo"
        );
    }

    if(baifoMusicas){
        crearCategoria(
            COSMETICOS.baifoMusicas,
            baifoMusicas,
            perfil,
            "baifoMusica"
        );
    }

}

function crearCategoria(lista,contenedor,perfil,tipo){

    lista.forEach(item=>{

        const tarjeta=document.createElement("div");
        tarjeta.className="shop-card";

        if(item.bloqueado){

            tarjeta.innerHTML=`

                <div class="shop-placeholder">?</div>

                <h3>
                    Próximamente
                </h3>

                <p class="shop-price">
                    Bloqueado
                </p>

                <button class="shop-button" disabled>
                    Bloqueado
                </button>

            `;

        }else{

            const obtenido =

    item.id==="spiderman" ||

    item.id==="baifo_default" ||

    item.id==="baifo_fondo_default" ||

    item.id==="baifo_music_default" ||

    (perfil.inventario && perfil.inventario.includes(item.id));

            const equipado=

                perfil.equipado[tipo]===item.id;

            tarjeta.innerHTML=`

                <div class="shop-preview">

                    <img src="${item.imagen}" alt="${item.nombre}">

                </div>

                <h3>
                    ${item.nombre}
                </h3>

                <p class="shop-price">

                    ${obtenido ? "Obtenido" : "No obtenido"}

                </p>

                <button

                    class="shop-button"

                    ${!obtenido ? "disabled" : ""}

                    data-id="${item.id}"

                    data-tipo="${tipo}">

                    ${equipado ? "Equipado" : "Equipar"}

                </button>

            `;

        }

        contenedor.appendChild(tarjeta);

    });

    contenedor.querySelectorAll("[data-id]").forEach(boton=>{

        boton.addEventListener("click",()=>{

            equiparCosmetico(

                boton.dataset.id,

                boton.dataset.tipo

            );

        });

    });

}

function equiparCosmetico(id,tipo){

    const perfil=obtenerPerfil();

    if(!perfil){
        return;
    }

    perfil.equipado[tipo]=id;

    guardarPerfil(perfil);

    cargarInventario();

    mostrarDynamicIsland(
        "Cosmético equipado correctamente."
    );

}

function mostrarDynamicIsland(texto){

    const island=document.getElementById("dynamic-island");
    const textoIsland=document.getElementById("dynamic-island-text");

    if(!island || !textoIsland){
        return;
    }

    textoIsland.textContent=texto;

    island.classList.remove("hide");
    island.classList.remove("show");

    void island.offsetWidth;

    island.classList.add("show");

    clearTimeout(island.timeout);

    island.timeout=setTimeout(()=>{

        island.classList.remove("show");
        island.classList.add("hide");

        setTimeout(()=>{

            island.classList.remove("hide");

        },450);

    },3000);

}
