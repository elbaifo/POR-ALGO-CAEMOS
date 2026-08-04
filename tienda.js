document.addEventListener("DOMContentLoaded",()=>{

    inicializarTienda();

});

function inicializarTienda(){

    const botones = document.querySelectorAll(".shop-button[data-item]");

    botones.forEach(boton=>{

        boton.addEventListener("click",()=>{

            comprarCosmetico(boton.dataset.item);

        });

    });

    actualizarBotones();

}

function comprarCosmetico(itemId){

}

function actualizarBotones(){

    const perfil = obtenerPerfil();

    if(!perfil) return;

    document.querySelectorAll(".shop-button[data-item]").forEach(boton=>{

        const comprado = perfil.inventario.includes(boton.dataset.item);

        if(comprado){

            boton.textContent = "Obtenido";
            boton.disabled = true;

        }else{

            boton.textContent = "Comprar";
            boton.disabled = false;

        }

    });

}

function mostrarDynamicIsland(texto,tipo){

}

function agitarBoton(boton){

}