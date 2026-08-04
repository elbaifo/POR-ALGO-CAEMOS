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

    ]

};

function cargarInventario(){

    const perfil=obtenerPerfil();

    if(!perfil){
        return;
    }

    const personajes=document.getElementById("inventario-personajes");
    const edificios=document.getElementById("inventario-edificios");
    const fondos=document.getElementById("inventario-fondos");

    personajes.innerHTML="";
    edificios.innerHTML="";
    fondos.innerHTML="";

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

            const obtenido=

                item.id==="spiderman" ||

                perfil.inventario.includes(item.id);

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
