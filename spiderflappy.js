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

const PROFILE_KEY = "pac_profile";


function getProfile(){

    return JSON.parse(
        localStorage.getItem(PROFILE_KEY)
    ) || null;

}


function saveProfile(profile){

    localStorage.setItem(
        PROFILE_KEY,
        JSON.stringify(profile)
    );

}


let profile = getProfile();


const spiderSubida = new Image();
spiderSubida.src = "spidersubida.png";

const spiderMedio = new Image();
spiderMedio.src = "spidermedio.png";

const spiderCaida = new Image();
spiderCaida.src = "spidercaida.png";


const edificioNoche = new Image();
const ciudadNoche = new Image();


function cargarCosmeticosEquipados(){

    const perfil = getProfile();


    if(!perfil || !perfil.equipado){

        edificioNoche.src = "edificio_noche.png";
        ciudadNoche.src = "ciudad_noche.png";

        return;

    }


    const edificios = {
        edificio_noche:"edificio_noche.png",
        edificio_dia:"edificio_dia.png"
    };


    const fondos = {
        ciudad_noche:"ciudad_noche.png",
        ciudad_dia:"ciudad_dia.png"
    };


    edificioNoche.src =
    edificios[perfil.equipado.edificio]
    || "edificio_noche.png";


    ciudadNoche.src =
    fondos[perfil.equipado.fondo]
    || "ciudad_noche.png";

}


cargarCosmeticosEquipados();


const musica = new Audio();

musica.src = "spidermusic.mp3";

musica.loop = true;

musica.volume = 0.4;

const musicButton = document.getElementById("music-button");

const MUSIC_KEY = "pac_music_enabled";


let musicEnabled =

    localStorage.getItem(MUSIC_KEY) !== "false";



function actualizarBotonMusica(){

    if(!musicButton){

        return;

    }


    musicButton.textContent =

        musicEnabled ? "🔊" : "🔇";

}



function cambiarMusica(){

    musicEnabled = !musicEnabled;


    localStorage.setItem(

        MUSIC_KEY,

        musicEnabled

    );



    if(!musicEnabled){

        musica.pause();

    }



    actualizarBotonMusica();

}



if(musicButton){

    musicButton.addEventListener(

        "click",

        cambiarMusica

    );

}



actualizarBotonMusica();


let bestScore = 0;

let totalPoints = 0;


if(profile){

    bestScore = profile.spiderFlappyRecord || 0;

    totalPoints = profile.puntosTotales || 0;

}


bestScoreElement.textContent = bestScore;

totalPointsElement.textContent = totalPoints;



const player = {

    x:80,

    y:300,

    radius:22,

    velocity:0,

    gravity:0.45,

    jump:-8

};



let started = false;

let gameRunning = false;

let gameEnded = false;



let obstacles = [];


let frame = 0;

let score = 0;

let gameSpeed = 3;



function drawBackground(){

    if(ciudadNoche.complete){

        ctx.drawImage(

            ciudadNoche,

            0,

            0,

            canvas.width,

            canvas.height

        );

    }else{

        ctx.fillStyle="#160808";

        ctx.fillRect(

            0,

            0,

            canvas.width,

            canvas.height

        );

    }

}



function drawPlayer(){

    let sprite = spiderMedio;


    if(player.velocity < -2){

        sprite = spiderSubida;

    }

    else if(player.velocity > 2){

        sprite = spiderCaida;

    }


    const size = 64;


    ctx.drawImage(

        sprite,

        player.x - size / 2,

        player.y - size / 2,

        size,

        size

    );

}


function createObstacle(){

    const gap = 180;

    const minHeight = 80;

    const maxHeight = canvas.height - gap - minHeight;


    const topHeight = Math.floor(

        Math.random() *

        (maxHeight - minHeight)

        +

        minHeight

    );


    obstacles.push({

        x:canvas.width,

        width:70,

        top:topHeight,

        bottom:canvas.height-topHeight-gap,

        speed:gameSpeed,

        passed:false

    });

}



function drawBuilding(x,y,width,height,flip=false){

    ctx.save();


    ctx.translate(

        x + width / 2,

        y + height / 2

    );


    if(flip){

        ctx.scale(1,-1);

    }


    ctx.rotate(Math.PI / 2);



    ctx.drawImage(

        edificioNoche,

        -height / 2,

        -width / 2,

        height,

        width

    );


    ctx.restore();

}



function drawObstacles(){

    obstacles.forEach((obstacle)=>{


        drawBuilding(

            obstacle.x,

            0,

            obstacle.width,

            obstacle.top,

            true

        );



        drawBuilding(

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



        if(

            !obstacle.passed &&

            obstacle.x + obstacle.width < player.x

        ){

            obstacle.passed = true;


            score++;


            scoreElement.textContent = score;



            if(score % 10 === 0){

                gameSpeed += 0.3;

            }

        }


    });



    obstacles = obstacles.filter(

        obstacle => obstacle.x + obstacle.width > 0

    );



    frame++;



    if(frame % 120 === 0){

        createObstacle();

    }

}



function checkCollision(){


    if(player.y-player.radius<=0){

        endGame();

        return;

    }



    if(player.y+player.radius>=canvas.height){

        endGame();

        return;

    }



    obstacles.forEach((obstacle)=>{


        const hitX =

            player.x + player.radius > obstacle.x &&

            player.x - player.radius < obstacle.x + obstacle.width;



        const hitTop =

            player.y - player.radius < obstacle.top;



        const hitBottom =

            player.y + player.radius >

            canvas.height - obstacle.bottom;



        if(

            hitX &&

            (hitTop || hitBottom)

        ){

            endGame();

        }


    });


}



function updatePlayer(){

    player.velocity += player.gravity;

    player.y += player.velocity;

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

        gameEnded=false;


        score=0;


        gameSpeed=3;


        scoreElement.textContent=0;


        startScreen.style.display="none";

        gameOverScreen.style.display="none";


    }


    player.velocity=player.jump;


    if(musicEnabled){

        musica.play();

    }

}



function endGame(){


    if(gameEnded){

        return;

    }



    gameEnded=true;

    gameRunning=false;


    musica.pause();

    musica.currentTime=0;



    finalScore.textContent=score;


    newRecordElement.style.display="none";



    profile=getProfile();



    if(profile){


    profile.puntos =

    (profile.puntos || 0) + score;


    profile.puntosTotales = profile.puntos;



    if(score > (profile.spiderFlappyRecord || 0)){


        profile.spiderFlappyRecord = score;


        bestScore = score;


        newRecordElement.style.display="inline";


    }



    if(score > (profile.recordGlobal || 0)){


        profile.recordGlobal = score;


    }



    totalPoints = profile.puntosTotales;


    saveProfile(profile);


}



    bestScoreElement.textContent=bestScore;

    totalPointsElement.textContent=totalPoints;



    gameOverScreen.style.display="flex";


}




function restartGame(){


    player.y=300;

    player.velocity=0;


    obstacles=[];


    frame=0;


    score=0;


    gameSpeed=3;


    gameEnded=false;



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



restartButton.addEventListener("click",(e)=>{


    e.preventDefault();


    restartGame();


});



restartButton.addEventListener("touchstart",(e)=>{


    e.preventDefault();


    restartGame();


},{passive:false});





function actualizarDatosPerfil(){


    profile=getProfile();



    if(!profile){

        return;

    }



    bestScore = profile.spiderFlappyRecord || 0;


    totalPoints = profile.puntosTotales || 0;



    bestScoreElement.textContent=bestScore;


    totalPointsElement.textContent=totalPoints;


}




const FPS = 70;
const FRAME_TIME = 1000 / FPS;

let lastFrame = 0;

function gameLoop(timestamp){

    if(timestamp - lastFrame >= FRAME_TIME){

        lastFrame = timestamp;

        update();

        render();

    }

    requestAnimationFrame(gameLoop);

}

actualizarDatosPerfil();

requestAnimationFrame(gameLoop);