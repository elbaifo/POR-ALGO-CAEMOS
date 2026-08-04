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




// MÚSICA

const musica = new Audio();

musica.src = "elbaifo_music.mp3";

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





// DATOS DEL PERFIL


let bestScore = 0;

let totalPoints = 0;



if(profile){

    bestScore = profile.elBaifoRunRecord || 0;

    totalPoints = profile.puntos || 0;

}



bestScoreElement.textContent = bestScore;

totalPointsElement.textContent = totalPoints;







// JUGADOR


const player = {

    x:120,

    y:300,

    width:45,

    height:45,


    velocity:0,

    gravity:0.7,

    jump:-13,


    grounded:false

};






let gameRunning = false;

let gameEnded = false;



let obstacles = [];



let frame = 0;

let score = 0;


let gameSpeed = 6;

function drawBackground(){

    ctx.fillStyle = "#87CEEB";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.fillStyle = "#4CAF50";

    ctx.fillRect(
        0,
        canvas.height - 60,
        canvas.width,
        60
    );

}




function drawPlayer(){

    ctx.font = "45px Arial";

    ctx.textAlign = "center";

    ctx.textBaseline = "middle";


    ctx.fillText(
        "🐐",
        player.x,
        player.y
    );

}




function drawObstacle(obstacle){


    ctx.fillStyle = "#333";


    ctx.fillRect(

        obstacle.x,

        canvas.height - 60 - obstacle.height,

        obstacle.width,

        obstacle.height

    );


}





function drawObstacles(){


    obstacles.forEach(obstacle=>{

        drawObstacle(obstacle);

    });


}







function createObstacle(){


    const height =

        Math.floor(

            Math.random() * 90

        ) + 30;



    const width =

        Math.floor(

            Math.random() * 80

        ) + 30;



    obstacles.push({

        x: canvas.width,

        width: width,

        height: height,

        passed:false

    });


}








function updatePlayer(){


    player.velocity += player.gravity;


    player.y += player.velocity;



    const ground = canvas.height - 60;



    if(player.y + player.height / 2 >= ground){


        player.y = ground - player.height / 2;


        player.velocity = 0;


        player.grounded = true;


    }else{


        player.grounded = false;


    }


}








function jump(){


    if(player.grounded){


        player.velocity = player.jump;


    }


}








function updateObstacles(){


    obstacles.forEach(obstacle=>{


        obstacle.x -= gameSpeed;



    });



    obstacles = obstacles.filter(obstacle=>{


        return obstacle.x + obstacle.width > 0;


    });





    frame++;




    if(frame % 100 === 0){


        createObstacle();


    }



}








function updateScore(){


    score += 0.05;



    score = Math.floor(score);



    scoreElement.textContent = score;



}








function checkCollision(){


    obstacles.forEach(obstacle=>{


        const obstacleY =

            canvas.height - 60 - obstacle.height;




        const hitX =

            player.x + player.width / 2 >

            obstacle.x &&


            player.x - player.width / 2 <

            obstacle.x + obstacle.width;




        const hitY =

            player.y + player.height / 2 >

            obstacleY;




        if(hitX && hitY){


            endGame();


        }



    });



}








function update(){


    if(!gameRunning){

        return;

    }



    updatePlayer();


    updateObstacles();


    updateScore();


    checkCollision();


}








function render(){


    drawBackground();


    drawObstacles();


    drawPlayer();


}

function startGame(){


    if(!gameRunning){


        gameRunning = true;

        gameEnded = false;


        score = 0;

        frame = 0;

        obstacles = [];


        gameSpeed = 6;



        scoreElement.textContent = 0;


        startScreen.style.display = "none";

        gameOverScreen.style.display = "none";



    }



    jump();



    if(musicEnabled){

        musica.play();

    }



}








function endGame(){


    if(gameEnded){

        return;

    }



    gameEnded = true;

    gameRunning = false;



    musica.pause();

    musica.currentTime = 0;




    finalScore.textContent = score;


    newRecordElement.style.display = "none";



    profile = getProfile();



    if(profile){



        profile.puntos =

            (profile.puntos || 0) + score;



        profile.puntosTotales = profile.puntos;



        if(score > (profile.elBaifoRunRecord || 0)){



            profile.elBaifoRunRecord = score;



            bestScore = score;



            newRecordElement.style.display = "inline";


        }



        if(score > (profile.recordGlobal || 0)){



            profile.recordGlobal = score;


        }




        totalPoints = profile.puntos;



        saveProfile(profile);



    }



    bestScoreElement.textContent = bestScore;


    totalPointsElement.textContent = totalPoints;



    gameOverScreen.style.display = "flex";



}








function restartGame(){


    player.y = 300;

    player.velocity = 0;


    obstacles = [];


    frame = 0;


    score = 0;


    gameSpeed = 6;


    gameEnded = false;



    scoreElement.textContent = 0;


    finalScore.textContent = 0;


    newRecordElement.style.display = "none";



    gameOverScreen.style.display = "none";


    gameRunning = true;



}








document.addEventListener("keydown",(e)=>{


    if(e.code === "Space"){


        e.preventDefault();


        if(gameRunning){

            jump();

        }else{

            startGame();

        }


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


    if(gameRunning){

        jump();

    }else{

        startGame();

    }


});








canvas.addEventListener("touchstart",(e)=>{


    e.preventDefault();



    if(gameRunning){

        jump();

    }else{

        startGame();

    }


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


    profile = getProfile();



    if(!profile){

        return;

    }



    bestScore = profile.elBaifoRunRecord || 0;


    totalPoints = profile.puntos || 0;



    bestScoreElement.textContent = bestScore;


    totalPointsElement.textContent = totalPoints;



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