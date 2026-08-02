const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const startScreen = document.getElementById("start-screen");
const gameOverScreen = document.getElementById("game-over");

const player = {

    x:80,

    y:300,

    radius:22,

    velocity:0,

    gravity:0.45,

    jump:-8

};


let started = false;


let obstacles = [];

let frame = 0;


function drawBackground(){

    ctx.fillStyle="#0D1424";

    ctx.fillRect(0,0,canvas.width,canvas.height);

}



function drawPlayer(){

    ctx.font="40px Arial";

    ctx.textAlign="center";

    ctx.textBaseline="middle";

    ctx.fillText("🕷️",player.x,player.y);

}



function createObstacle(){

    const gap = 180;

    const minHeight = 80;

    const maxHeight = canvas.height - gap - minHeight;


    const topHeight = Math.floor(

        Math.random() * (maxHeight - minHeight) + minHeight

    );


    obstacles.push({

        x:canvas.width,

        width:70,

        top:topHeight,

        bottom:canvas.height - topHeight - gap,

        speed:3

    });

}



function drawObstacles(){

    ctx.fillStyle="#5B8CFF";


    obstacles.forEach((obstacle)=>{


        ctx.fillRect(

            obstacle.x,

            0,

            obstacle.width,

            obstacle.top

        );


        ctx.fillRect(

            obstacle.x,

            canvas.height - obstacle.bottom,

            obstacle.width,

            obstacle.bottom

        );


    });

}



function updateObstacles(){


    obstacles.forEach((obstacle)=>{

        obstacle.x -= obstacle.speed;

    });


    obstacles = obstacles.filter((obstacle)=>{

        return obstacle.x + obstacle.width > 0;

    });


    frame++;


    if(frame % 120 === 0){

        createObstacle();

    }


}



function updatePlayer(){


    if(!started){

        return;

    }


    player.velocity += player.gravity;

    player.y += player.velocity;



    if(player.y < player.radius){

        player.y = player.radius;

        player.velocity = 0;

    }



    if(player.y > canvas.height-player.radius){

        player.y = canvas.height-player.radius;

        player.velocity = 0;

    }


}



function update(){


    if(!started){

        return;

    }


    updatePlayer();

    updateObstacles();


}



function render(){

    drawBackground();

    drawObstacles();

    drawPlayer();

}



function gameLoop(){

    update();

    render();

    requestAnimationFrame(gameLoop);

}



function startGame(){


    if(!started){

        started = true;

        startScreen.style.display="none";

    }


    player.velocity = player.jump;


}



document.addEventListener("keydown",(e)=>{


    if(e.code==="Space"){

        e.preventDefault();

        startGame();

    }


});



startScreen.addEventListener("click",()=>{

    startGame();

});



startScreen.addEventListener("touchstart",(e)=>{


    e.preventDefault();

    startGame();


},{passive:false});



canvas.addEventListener("click",()=>{


    startGame();


});



canvas.addEventListener("touchstart",(e)=>{


    e.preventDefault();

    startGame();


},{passive:false});



gameLoop();