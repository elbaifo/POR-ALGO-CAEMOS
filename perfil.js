document.addEventListener("DOMContentLoaded",()=>{

    if(!document.getElementById("inventario-personajes")){
        return;
    }

    cargarInventario();

});


function cargarInventario(){

    const perfil = obtenerPerfil();

    if(!perfil){
        return;
    }

    const personajes =
    document.getElementById("inventario-personajes");

    const edificios =
    document.getElementById("inventario-edificios");

    const fondos =
    document.getElementById("inventario-fondos");


    personajes.innerHTML = "";
    edificios.innerHTML = "";
    fondos.innerHTML = "";

}

const COSMETICOS = {

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