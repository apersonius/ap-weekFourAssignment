const timeEl = document.querySelector(".time");
const mainEl = document.getElementById("main");
const secondsLeft = 60;

//timer function
function setTime() {
    let timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds left to complete quiz";

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            sendMessage();
        }
    }, 1000);
}

function sendMessage() {
    timeEl.textContent = "The quiz is over";
}

setTime();
