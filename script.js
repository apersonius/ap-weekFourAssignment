const timerEl = document.getElementById("timer");
const timeLeft = document.getElementById("timeLeft");
const timesUp = document.getElementById("timesUp");

const startButton = document.getElementById(".startButton");
const startDiv = document.getElementById("start");

const questionDiv = document.getElementById("questionDiv");
const questionTitle = document.getElementById("questionTitle");
const choiceA = document.getElementById("btn0");
const choiceB = document.getElementById("btn1");
const choiceC = document.getElementById("bth2");
const choiceD = document.getElementById("btn3");
const answerCheck = document.getElementById("answerCheck");

const summary = document.getElementById("summary");
const submitBtn = document.getElementById("submitBtn");
const initialInput = document.getElementById("initialInput");
const everything = document.getElementById("everything");

const correctAnsw = 0;
const questionNum = 0;
const questionIndex = 0;

//questions
const questions = [
    {
        question: "",
        choices: ["a. <>", "b. <>", "c. <>", "d. <>"],
        answer: ""
    },
    {
        question: "",
        choices: ["a. <>", "b. <>", "c. <>", "d. <>"],
        answer: ""
    },
    {
        question: "",
        choices: ["a. <>", "b. <>", "c. <>", "d. <>"],
        answer: ""
    },
    {
        question: "",
        choices: ["a. <>", "b. <>", "c. <>", "d. <>"],
        answer: ""
    },
    {
        question: "",
        choices: ["a. <>", "b. <>", "c. <>", "d. <>"],
        answer: ""
    },
];

//start the game
let totalTime = 121
function newQuiz() {
    questionIndex = 0;
    totalTime = 120;
    timeLeft.textContent = totalTime;
    initialInput.textContent = "";

    startDiv.style.display = "none";
    questionDiv.style.display = "block";
    timer.style.display = "block";
    timesUp.style.display = "none";

    var startTimer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length -1) {
                gameOver();
            }
        }
    }, 1000);

    showQuiz();
};

function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    choiceA.textContent = questions[questionIndex].choices[0];
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];
}

//check answers
function checkAnswer(answer) {
    let lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    answerCheck.style.display = "block";

    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        correctAnsw++;
        answerCheck.textContent = "correct";
    } else {
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        answerCheck.textContent = "incorrect, the answer is " + questions[questionIndex].answer;
    }

    questionIndex++;
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        gameOver();
    }
}

//game over when questions answers/run out of time
function gameOver() {
    summary.style.display = "block";
    questionDiv.style.display = "none";
    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "block";

    finalScore.textContent = correctAnsw;
}

startDiv.style.display = "none";
timer.style.display = "none";
timesUp.style.display = "none";
summary.style.display = "none";

//event listeners

startButton.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitBtn.addEventListener("click", function(event) {
    
})