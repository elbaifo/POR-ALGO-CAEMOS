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

    const perfil = obtenerPerfil();

    if(!perfil) return;


    const precios = {

        edificio_dia:100,
        ciudad_dia:120

    };


    const precio = precios[itemId];


    const boton = document.querySelector(`[data-item="${itemId}"]`);


    if(perfil.inventario.includes(itemId)) return;



    if(perfil.puntos >= precio){


        perfil.puntos -= precio;


        perfil.inventario.push(itemId);


        guardarPerfil(perfil);


        actualizarPerfilJuegos();


        actualizarBotones();


        mostrarDynamicIsland(
            "Selecciona tu cosmético comprado en tu perfil."
        );


    }else{


        agitarBoton(boton);


        mostrarDynamicIsland(
            "No tienes suficientes puntos para comprar este cosmético."
        );


    }

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



    island.timeout = setTimeout(()=>{


        island.classList.remove("show");


        island.classList.add("hide");



        setTimeout(()=>{


            island.classList.remove("hide");


        },450);



    },3000);


}





function agitarBoton(boton){


    if(!boton) return;



    boton.animate(


        [

            {
                transform:"translateX(0)",
                background:"#c1121f"
            },


            {
                transform:"translateX(-8px)",
                background:"#ff2d2d"
            },


            {
                transform:"translateX(8px)",
                background:"#ff2d2d"
            },


            {
                transform:"translateX(-8px)",
                background:"#ff2d2d"
            },


            {
                transform:"translateX(8px)",
                background:"#ff2d2d"
            },


            {
                transform:"translateX(0)",
                background:"#8b2d2d"
            }


        ],


        {

            duration:500

        }


    );


}