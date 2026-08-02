const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const startScreen = document.getElementById("start-screen");
const gameOverScreen = document.getElementById("game-over");

const restartButton = document.getElementById("restart-button");

const scoreElement = document.getElementById("score");
const finalScore = document.getElementById("final-score");

const bestScoreElement = document.getElementById("best-score");
const totalPointsElement = document.getElementById("total-points");
const newRecordElement = document.getElementById("new-record");

let bestScore = Number(localStorage.getItem("spiderflappyBestScore")) || 0;
let totalPoints = Number(localStorage.getItem("spiderflappyTotalPoints")) || 0;

bestScoreElement.textContent = bestScore;
totalPointsElement.textContent = totalPoints;

const player={

    x:80,

    y:300,

    radius:22,

    velocity:0,

    gravity:0.45,

    jump:-8

};

let started=false;

let gameRunning=false;

let obstacles=[];

let frame=0;

let score=0;

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

    const gap=180;

    const minHeight=80;

    const maxHeight=canvas.height-gap-minHeight;

    const topHeight=Math.floor(

        Math.random()*(maxHeight-minHeight)+minHeight

    );

    obstacles.push({

        x:canvas.width,

        width:70,

        top:topHeight,

        bottom:canvas.height-topHeight-gap,

        speed:3,

        passed:false

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

            canvas.height-obstacle.bottom,

            obstacle.width,

            obstacle.bottom

        );

    });

}

function updateObstacles(){

    obstacles.forEach((obstacle)=>{

        obstacle.x-=obstacle.speed;

        if(!obstacle.passed && obstacle.x+obstacle.width<player.x){

            obstacle.passed=true;

            score++;

            scoreElement.textContent=score;

        }

    });

    obstacles=obstacles.filter((obstacle)=>{

        return obstacle.x+obstacle.width>0;

    });

    frame++;

    if(frame%120===0){

        createObstacle();

    }

}

function checkCollision(){

    if(player.y-player.radius<=0){

        endGame();

    }

    if(player.y+player.radius>=canvas.height){

        endGame();

    }

    obstacles.forEach((obstacle)=>{

        const hitX=

        player.x+player.radius>obstacle.x &&

        player.x-player.radius<obstacle.x+obstacle.width;

        const hitTop=

        player.y-player.radius<obstacle.top;

        const hitBottom=

        player.y+player.radius>

        canvas.height-obstacle.bottom;

        if(hitX && (hitTop || hitBottom)){

            endGame();

        }

    });

}

function updatePlayer(){

    player.velocity+=player.gravity;

    player.y+=player.velocity;

}

function update(){

    if(!gameRunning){

        return;

    }

    updatePlayer();

    updateObstacles();

    checkCollision();

}


function render(){

    drawBackground();

    drawObstacles();

    drawPlayer();

}

function startGame(){

    if(!gameRunning){

        started=true;

        gameRunning=true;

        startScreen.style.display="none";

        gameOverScreen.style.display="none";

    }

    player.velocity=player.jump;

}

function endGame(){

    gameRunning=false;

    finalScore.textContent=score;

    newRecordElement.style.display="none";

    if(score>bestScore){

        bestScore=score;

        localStorage.setItem(

            "spiderflappyBestScore",

            bestScore

        );

        bestScoreElement.textContent=bestScore;

        newRecordElement.style.display="inline";

    }

    totalPoints+=score;

    localStorage.setItem(

        "spiderflappyTotalPoints",

        totalPoints

    );

    totalPointsElement.textContent=totalPoints;

    gameOverScreen.style.display="flex";

}

function restartGame(){

    player.y=300;

    player.velocity=0;

    obstacles=[];

    frame=0;

    score=0;

    scoreElement.textContent=0;

    finalScore.textContent=0;

    newRecordElement.style.display="none";

    gameOverScreen.style.display="none";

    gameRunning=true;

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

restartButton.addEventListener("click",()=>{

    restartGame();

});

gameLoop();

function gameLoop(){

    update();

    render();

    requestAnimationFrame(gameLoop);

}