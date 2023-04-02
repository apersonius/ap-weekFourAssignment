const timerEl = document.getElementById(".timerCount");
const win = document.querySelector(".win");
const lose = document.querySelector(".lose");
const startButton = document.querySelector(".startButton");

let timer;
let timerCount;

//start the game
function startGame() {
    timerCount = 60;
    startButton.disabled = true;
    startTimer()
}

//winGame when game is won
function winGame() {
    wordBlank.textContent = "You won";
    startButton.disabled = false;
}

//loseGame when game is lost
function loseGame() {
    wordBlank.textContent = "Game Over";
    startButton.disabled = false;
}

//timer function
function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerEl.textContent = timerCount;
        if (timerCount >- 0) {
            if (isWin && timerCount > 0) {
                clearInterval(timer);
                winGame();
            }
        }

        if (timerCount === 0) {
            clearInterval(timer);
            loseGame();
        }
    }, 1000);
}

//event listener to start game
startButton.addEventListener("click", startGame);

Infinity();