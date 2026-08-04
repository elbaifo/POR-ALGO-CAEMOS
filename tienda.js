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

}

function mostrarDynamicIsland(texto,tipo){

}

function agitarBoton(boton){

}