const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const startScreen = document.getElementById("start-screen");
const gameOverScreen = document.getElementById("game-over");

const scoreElement = document.getElementById("score");

const player = {

    x:80,

    y:300,

    radius:22,

    velocity:0,

    gravity:0.45,

    jump:-8

};

let started = false;

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

function update(){

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

function render(){

    drawBackground();

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

        startScreen.style.display = "none";

    }

    player.velocity = player.jump;

}

document.addEventListener("keydown",(e)=>{

    if(e.code==="Space"){

        e.preventDefault();

        startGame();

    }

});

document.addEventListener("click",()=>{

    startGame();

});

document.addEventListener("touchstart",(e)=>{

    e.preventDefault();

    startGame();

},{passive:false});

gameLoop();