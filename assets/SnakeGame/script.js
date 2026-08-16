const loadingScreen = document.getElementById("loading-screen");
const gameBoard = document.getElementById("game-board");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("high-score");
const statusMessage = document.getElementById("status-message");
const pauseButton = document.getElementById("pause-button");
const resetButton = document.getElementById("reset-button");
const gameOverlay = document.getElementById("game-overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayMessage = document.getElementById("overlay-message");
const overlayReset = document.getElementById("overlay-reset");

const BOARD_SIZE = 20;
const GAME_SPEED = 300;

const gameState = {
    snake: [],
    food: null,
    direction: {
        row: 0,
        col: 1
    },
    score: 0,
    highScore: Number(localStorage.getItem("snakeHighScore")) || 0,
    isRunning: false,
    isPaused: false,
    isGameOver: false,
    gameLoop: null
};

window.addEventListener("load", () => {
    setTimeout(() => {
        loadingScreen.classList.add("loaded");
        document.body.classList.remove("loading");
    }, 1800);
});

function createBoard() {
    gameBoard.innerHTML = "";

    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
        const cell = document.createElement("div");
        cell.classList.add("board-cell");
        gameBoard.appendChild(cell);
    }
}

function initializeGame() {
    stopGameLoop();

    gameState.snake = [
        { row: 10, col: 8 },
        { row: 10, col: 9 },
        { row: 10, col: 10 }
    ];

    gameState.food = null;

    gameState.direction = {
        row: 0,
        col: 1
    };

    gameState.score = 0;
    gameState.isRunning = false;
    gameState.isPaused = false;
    gameState.isGameOver = false;

    pauseButton.textContent = "Pause";

    hideGameOverlay();

    statusMessage.textContent = "Press any arrow key to start";

    generateFood();
    renderGame();
}

function generateFood() {
    if (gameState.snake.length >= BOARD_SIZE * BOARD_SIZE) {
        gameState.food = null;
        return;
    }

    let newFood;

    do {
        newFood = {
            row: Math.floor(Math.random() * BOARD_SIZE),
            col: Math.floor(Math.random() * BOARD_SIZE)
        };
    } while (
        gameState.snake.some(
            segment =>
                segment.row === newFood.row &&
                segment.col === newFood.col
        )
    );

    gameState.food = newFood;
}

function renderSnake() {
    const cells = gameBoard.querySelectorAll(".board-cell");

    gameState.snake.forEach((segment, index) => {
        const cellIndex = segment.row * BOARD_SIZE + segment.col;
        const cell = cells[cellIndex];

        if (!cell) {
            return;
        }

        cell.classList.add("snake");

        if (index === gameState.snake.length - 1) {
            cell.classList.add("snake-head");
        }
    });
}

function renderFood() {
    if (!gameState.food) {
        return;
    }

    const cells = gameBoard.querySelectorAll(".board-cell");
    const index =
        gameState.food.row * BOARD_SIZE +
        gameState.food.col;

    const cell = cells[index];

    if (cell) {
        cell.classList.add("food");
    }
}

function renderScore() {
    scoreElement.textContent = gameState.score;
    highScoreElement.textContent = gameState.highScore;
}

function renderGame() {
    const cells = gameBoard.querySelectorAll(".board-cell");

    cells.forEach(cell => {
        cell.classList.remove(
            "snake",
            "snake-head",
            "food"
        );
    });

    renderSnake();
    renderFood();
    renderScore();
}

function checkSelfCollision(position) {
    return gameState.snake.some(segment => {
        return (
            segment.row === position.row &&
            segment.col === position.col
        );
    });
}

function checkFoodCollision(position) {
    return (
        gameState.food &&
        position.row === gameState.food.row &&
        position.col === gameState.food.col
    );
}

function moveSnake() {
    if (
        !gameState.isRunning ||
        gameState.isPaused ||
        gameState.isGameOver
    ) {
        return;
    }

    const head =
        gameState.snake[gameState.snake.length - 1];

    let newRow =
        head.row + gameState.direction.row;

    let newCol =
        head.col + gameState.direction.col;

    if (newRow < 0) {
        newRow = BOARD_SIZE - 1;
    }

    if (newRow >= BOARD_SIZE) {
        newRow = 0;
    }

    if (newCol < 0) {
        newCol = BOARD_SIZE - 1;
    }

    if (newCol >= BOARD_SIZE) {
        newCol = 0;
    }

    const newHead = {
        row: newRow,
        col: newCol
    };

    const ateFood = checkFoodCollision(newHead);

    const bodyToCheck = ateFood
        ? gameState.snake
        : gameState.snake.slice(1);

    const collided = bodyToCheck.some(segment => {
        return (
            segment.row === newHead.row &&
            segment.col === newHead.col
        );
    });

    if (collided) {
        endGame();
        return;
    }

    gameState.snake.push(newHead);

    if (ateFood) {
        gameState.score += 10;

        if (gameState.score > gameState.highScore) {
            gameState.highScore = gameState.score;
            localStorage.setItem(
                "snakeHighScore",
                gameState.highScore
            );
        }

        if (
            gameState.snake.length <
            BOARD_SIZE * BOARD_SIZE
        ) {
            generateFood();
        } else {
            endGame("You Win!", "You filled the entire board.");
            return;
        }
    } else {
        gameState.snake.shift();
    }

    renderGame();
}

function changeDirection(row, col) {
    if (
        gameState.isGameOver ||
        gameState.isPaused
    ) {
        return;
    }

    const currentDirection =
        gameState.direction;

    if (
        currentDirection.row + row === 0 &&
        currentDirection.col + col === 0
    ) {
        return;
    }

    gameState.direction = {
        row,
        col
    };

    if (!gameState.isRunning) {
        startGameLoop();
    }
}

document.addEventListener("keydown", event => {
    switch (event.key) {
        case "ArrowUp":
            event.preventDefault();
            changeDirection(-1, 0);
            break;

        case "ArrowDown":
            event.preventDefault();
            changeDirection(1, 0);
            break;

        case "ArrowLeft":
            event.preventDefault();
            changeDirection(0, -1);
            break;

        case "ArrowRight":
            event.preventDefault();
            changeDirection(0, 1);
            break;

        case " ":
            event.preventDefault();
            togglePause();
            break;

        case "Escape":
            event.preventDefault();
            initializeGame();
            break;
    }
});

function startGameLoop() {
    if (gameState.isGameOver) {
        return;
    }

    stopGameLoop();

    gameState.isRunning = true;
    gameState.isPaused = false;

    statusMessage.textContent = "Game running";

    gameState.gameLoop = setInterval(
        moveSnake,
        GAME_SPEED
    );
}

function stopGameLoop() {
    if (gameState.gameLoop) {
        clearInterval(gameState.gameLoop);
        gameState.gameLoop = null;
    }
}

function togglePause() {
    if (gameState.isGameOver) {
        return;
    }

    if (!gameState.isRunning) {
        startGameLoop();
        return;
    }

    if (gameState.isPaused) {
        gameState.isPaused = false;
        pauseButton.textContent = "Pause";
        statusMessage.textContent = "Game running";
    } else {
        gameState.isPaused = true;
        pauseButton.textContent = "Resume";
        statusMessage.textContent = "Game paused";
    }
}

function endGame(
    title = "Game Over",
    message = "Your snake has collided."
) {
    gameState.isGameOver = true;
    gameState.isRunning = false;
    gameState.isPaused = false;

    stopGameLoop();

    overlayTitle.textContent = title;
    overlayMessage.textContent = message;

    statusMessage.textContent = title;

    showGameOverlay();
}

function showGameOverlay() {
    gameOverlay.classList.add("visible");
}

function hideGameOverlay() {
    gameOverlay.classList.remove("visible");
}

pauseButton.addEventListener("click", togglePause);

resetButton.addEventListener("click", initializeGame);

overlayReset.addEventListener("click", initializeGame);

document
    .querySelectorAll(".mobile-controls button")
    .forEach(button => {
        button.addEventListener("click", () => {
            const direction =
                button.dataset.direction;

            switch (direction) {
                case "up":
                    changeDirection(-1, 0);
                    break;

                case "down":
                    changeDirection(1, 0);
                    break;

                case "left":
                    changeDirection(0, -1);
                    break;

                case "right":
                    changeDirection(0, 1);
                    break;
            }
        });
    });

createBoard();
initializeGame();