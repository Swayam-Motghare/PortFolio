const body = document.getElementById("main-body");
const board = document.getElementById("board");
const snake = document.getElementById("snake");
const fruit = document.getElementById("fruit");
const apple = document.getElementById("apple");
const tip = document.getElementById("subhead");
const gmo = document.getElementById("gmo");
const currentScore = document.getElementById("currentScore");
const bestscore = document.getElementById("bestScore");
const bgmusic = document.getElementById("bgmusic");

let snakeLenght = 1;
let score = 0;
let HighScore = 0;
let direction = "";
let speed = 400;
let isOver = false;
let isGold = false;
let cond = 50;

// snakeCords
let snakeScol = 5;
let snakeSrow = 6;

// fruitCords
let fruitScol = 9;
let fruitSrow = 8;

// Arrays
let SnakeBodyArray = new Array();
SnakeBodyArray[0] = snake;
let cordsArray = new Array();
let temp = new Array();

// GAME START
initialLoad()
gameLoop();

function initialLoad(){
    snakeLenght = 1;
    score = 0;

    snake.style.gridColumnStart = snakeScol;
    snake.style.gridRowStart = snakeSrow;

    fruit.style.gridColumnStart = fruitScol;
    fruit.style.gridRowStart = fruitSrow;

    tip.innerHTML = 'Use "ArrowRight" Key To Start'
}

body.addEventListener('keydown',(event)=>{
    // console.log(event.code);
    if(isOver && event.code != "KeyR"){
        return;
    }

    let key = event.key
    tip.innerHTML = "JS Snake Game! "
    if(key == "ArrowRight" && direction != "left"){
        direction = "right";
    } else if(key == "ArrowLeft" && direction != "right"){
        direction = "left";
    } else if(key == "ArrowUp" && direction != "down"){
        direction = "up";
    } else if(key == "ArrowDown" && direction != "up"){
        direction = "down";
    } else if(key == "Escape"){
        direction = "";
        bgmusic.pause();
    } else if (event.code == "KeyR"){
        if(isOver == true){
            restartGame();
        }
    }
    if(direction != ""){
        bgmusic.play();
    }
})

function moveSnake(axis){
    for (let i = SnakeBodyArray.length - 1; i >= 1; i--) {
    cordsArray[i] = cordsArray[i - 1];
    }
    if(axis == "right" ){
        snakeScol++
    } else if ( axis == "left" ){
        snakeScol--
    } else if ( axis == "up" ){
        snakeSrow--
    } else if ( axis == "down"){
        snakeSrow++
    }
    if(axis == "left" || axis == "right"){
        snake.style.flexDirection = "column";
    } else if(axis == "up" || axis == "down"){
        snake.style.flexDirection = "row";
    }
    cordsArray[0] = {
        CS: snakeScol,
        RS: snakeSrow
    };

    for (let i = 0; i < SnakeBodyArray.length; i++) {
        if (cordsArray[i]) {
        SnakeBodyArray[i].style.gridColumnStart = cordsArray[i]["CS"];
        SnakeBodyArray[i].style.gridRowStart = cordsArray[i]["RS"];
        }
    }

    for (let i = 1; i < SnakeBodyArray.length; i++) {
        if (
        cordsArray[0]["CS"] == cordsArray[i]["CS"] &&
        cordsArray[0]["RS"] == cordsArray[i]["RS"]
        ) {
        console.log("collide with body");
        gameOver();
        }
    }
}

function renderSnake(){
    snake.style.gridColumnStart = snakeScol;
    snake.style.gridRowStart = snakeSrow;
}

function checkWallCollision(){
    if(snakeScol > 20){
        snakeScol = 0;
    } else if (snakeSrow > 20){
        snakeSrow = 0;
    } else if (snakeScol < 0){
        snakeScol = 21;
    } else if(snakeSrow < 0){
        snakeSrow = 21;
    }
}

function eatFruit(){
    if(
        snakeScol == fruitScol && snakeSrow == fruitSrow
    ){
        if(isGold == true){
            score+=50;
            currentScore.innerHTML = score;
        } else{
            score+=10;
            currentScore.innerHTML = score;
        }
        if(score > HighScore){
            HighScore = score;
            bestscore.innerHTML = HighScore;
        }
        fruitLocation();
        renderFruit();
        growBody();
        increaseDif();
        snakeLenght++;
    }
}

function fruitLocation(){
    let loc1 = Math.floor(Math.random()*20)+1;
    let loc2 = Math.floor(Math.random()*20)+1;
    for (let i = 0; i < cordsArray.length; i++) {
        const element = cordsArray[i];
        if(element["CS"] == loc1 && element["RS"] == loc2){
            return fruitLocation();
        }
    }
    fruitScol = loc1;
    fruitSrow = loc2;

    goldApple();
}

function renderFruit(){
    fruit.style.gridColumnStart = fruitScol;
    fruit.style.gridRowStart = fruitSrow;
}

function growBody(){
    SnakeBodyArray[snakeLenght] = document.createElement("div");
    SnakeBodyArray[snakeLenght].classList.add("body");
    SnakeBodyArray[snakeLenght].style.gridColumnStart = cordsArray["CS"];
    SnakeBodyArray[snakeLenght].style.gridRowStart = cordsArray["RS"];
    board.appendChild(SnakeBodyArray[snakeLenght]);
}

function gameOver(){
    direction = "";
    
    board.style.outline = "1px solid rgb(107, 65, 10)";
    board.style.backgroundColor = "rgba(107, 65, 10, 0.27)"
    for (let i = 0; i < SnakeBodyArray.length; i++) {
        const element = SnakeBodyArray[i];
        element.style.display = "none";
    }
    gmo.classList.remove("hdgo");
    apple.style.display = "none"
    tip.innerHTML = "Press R to Restart"
    isOver = true;
}

function restartGame(){
    console.log("restart");

    gmo.classList.add("hdgo");

    for (let i = 1; i < SnakeBodyArray.length; i++) {
        SnakeBodyArray[i].remove();
    }
    SnakeBodyArray = [];
    cordsArray = [];
    SnakeBodyArray[0] = snake;

    snakeLenght = 1;
    direction = "";
    isOver = false;
    score = 0;
    speed = 400;
    cond = 50;
    snake.style.display = "flex";
    apple.style.display = "inline-block";

    snakeScol = 5;
    snakeSrow = 6;
    fruitScol = 9;
    fruitSrow = 8;

    board.style.outline = "";
    board.style.backgroundColor = "";

    renderSnake();
    renderFruit();

    tip.innerHTML = 'Use "ArrowRight" Key To Start';

    score = 0;
    currentScore.innerHTML = score;
    
}

function increaseDif(){
    
    if(speed > 150){
        if(score >= cond){
            speed = speed - 50;
            cond = cond + 50;
        }
    }
    console.log(speed);
}

function goldApple(){
    let goldChance = Math.floor(Math.random()*10)+1;

    if(goldChance == 10){
        isGold = true;
        apple.style.color = "goldenrod";
    } else {
        isGold = false;
        apple.style.color = "red";
    }
}

function gameLoop(){
    if(direction != ""){
        moveSnake(direction);
        eatFruit();
        checkWallCollision();
        renderSnake();
    }
    setTimeout(gameLoop,speed);
}