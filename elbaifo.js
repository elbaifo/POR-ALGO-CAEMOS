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

musica.src = "baifomusic.mp3";

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

    totalPoints = profile.elBaifoRunPoints || 0;

}

bestScoreElement.textContent = bestScore;

totalPointsElement.textContent = totalPoints;







// JUGADOR


const player = {

    x:120,

    y:0,

    width:70,

    height:70,

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

const baifoFrames = [];

for(let i = 1; i <= 3; i++){

    const img = new Image();

    img.src = i === 1
        ? "elbaifo.png"
        : `elbaifo${i}.png`;

    baifoFrames.push(img);

}


let baifoFrame = 0;

let baifoAnimacion = 0;

const fondo = new Image();
fondo.src = "canarias.png";

let fondoX = 0;




function drawBackground(){

    if(fondo.complete && fondo.naturalWidth > 0){

        ctx.drawImage(
            fondo,
            fondoX,
            0,
            canvas.width,
            canvas.height
        );

        ctx.drawImage(
            fondo,
            fondoX + canvas.width,
            0,
            canvas.width,
            canvas.height
        );

    }else{

        ctx.fillStyle = "#87CEEB";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

    }


    fondoX -= gameSpeed * 0.4;


    if(fondoX <= -canvas.width){

        fondoX = 0;

    }

}




function drawPlayer(){

    baifoAnimacion++;

    if(baifoAnimacion >= 8){

        baifoAnimacion = 0;

        baifoFrame++;

        if(baifoFrame >= baifoFrames.length){

            baifoFrame = 0;

        }

    }


    const sprite = baifoFrames[baifoFrame];


    if(sprite.complete && sprite.naturalWidth > 0){

    ctx.drawImage(
        sprite,
        player.x - player.width / 2,
        player.y - player.height / 2,
        player.width,
        player.height
    );

}

}




function drawObstacle(obstacle){

    ctx.fillStyle = "#333";

    ctx.fillRect(

        obstacle.x,

        canvas.height - obstacle.height,

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

        Math.random() * 45

    ) + 25;



const width =

    Math.floor(

        Math.random() * 40

    ) + 20;



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



    const ground = canvas.height;



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




    if(frame % 140 === 0){

    createObstacle();

}



}








function updateScore(){

    score++;

    scoreElement.textContent = Math.floor(score / 4);

}








function checkCollision(){


    obstacles.forEach(obstacle=>{


        const obstacleY =

    canvas.height - obstacle.height;




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

        player.y = canvas.height -                       player.height / 2;
player.velocity = 0;
player.grounded = true;

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




    score = Math.floor(score / 4);

finalScore.textContent = score;

newRecordElement.style.display = "none";

profile = getProfile();



    if(profile){



        profile.elBaifoRunPoints =
    (profile.elBaifoRunPoints || 0) + score;

if(score > (profile.elBaifoRunRecord || 0)){

    profile.elBaifoRunRecord = score;

    bestScore = score;

    newRecordElement.style.display = "inline";

}

totalPoints = profile.elBaifoRunPoints;

saveProfile(profile);



    }



    bestScoreElement.textContent = bestScore;


    totalPointsElement.textContent = totalPoints;



    gameOverScreen.style.display = "flex";



}








function restartGame(){


    player.y = canvas.height - player.height / 2;

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

if(musicEnabled){

    musica.currentTime = 0;

    musica.play();

}

jump();

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

totalPoints = profile.elBaifoRunPoints || 0;

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