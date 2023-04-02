//questions
const questions = [
    {
        question: "what type of language is Javascript?",
        choices: ["a. <object-oriented>", "b. <object-based>", "c. <procedural>", "d. <none of the above>"],
        answer: "a."
    },
    {
        question: "what does the Javascript debugger statement do?",
        choices: ["a. <debug all the errors in the program at runtime>", "b. <it acts as a breakpoint in a program>", "c. <it will debug error in the current statement if any>", "d. <all of the above>"],
        answer: "b."
    },
    {
        question: "what function is used to serialize an object into a JSON string in Javascript",
        choices: ["a. <stringify()>", "b. <parse()>", "c. <convert()>", "d. <none of the above>"],
        answer: "a."
    },
    {
        question: "what are the basic object attributes in Javascript?",
        choices: ["a. <class, prototype, object parameters>", "b. <class, prototype, object extensible flag>", "c. <class, paramaters, objects extensible flag>", "d. <none of these>"],
        answer: "b."
    },
    {
        question: "which of the following are closures in Javascript?",
        choices: ["a. <variables>", "b. <functions>", "c. <objects>", "d. <all of the above>"],
        answer: "d."
    }
];


const timerEl = document.getElementById("timer");
const timeLeft = document.getElementById("timeLeft");
const timesUp = document.getElementById("timesUp");

const startButton = document.getElementById("startButton");
const startDiv = document.getElementById("start");

const questionDiv = document.getElementById("questionDiv");
const questionTitle = document.getElementById("questionTitle");
const choiceA = document.getElementById("btn0");
const choiceB = document.getElementById("btn1");
const choiceC = document.getElementById("btn2");
const choiceD = document.getElementById("btn3");
const answerCheck = document.getElementById("answerCheck");

const summary = document.getElementById("summary");
const submitBtn = document.getElementById("submitBtn");
const initialInput = document.getElementById("initialInput");
const everything = document.getElementById("everything");

const highScoreSection = document.getElementById("highScoreSection");
const finalScore = document.getElementById("finalScore");

const backBtn = document.getElementById("backBtn");
const clearHighScoreBtn = document.getElementById("clearHighScoreBtn");
const viewHighScore = document.getElementById("viewHighScore");
const highScoreList = document.getElementById("highScoreList");

const correctAnsw = 0;
const questionNum = 0;
let questionIndex = 0;

let scoreResult;

//start the game
let totalTime = 121
function newQuiz() {
    questionIndex = 0;
    totalTime = 120;
    timeLeft.textContent = totalTime;
    initialInput.textContent = "";

    startDiv.style.display = "none";
    questionDiv.style.display = "block";
    timerEl.style.display = "block";
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
        answerCheck.textContent = "incorrect";
    }

    questionIndex++;
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        gameOver();
    }
}

function chooseA() { checkAnswer(0); }
function chooseB() { checkAnswer(1); }
function chooseC() { checkAnswer(2); }
function chooseD() { checkAnswer(3); }

//game over when questions answers/run out of time
function gameOver() {
    summary.style.display = "block";
    questionDiv.style.display = "none";
    startDiv.style.display = "none";
    timerEl.style.display = "none";
    timesUp.style.display = "block";

//show final score
    finalScore.textContent = correctAnsw;
}

//local storage
function storeHighScores(event) {
    event.preventDefault();

    if(initialInput.value === "") {
        alert("please enter your initials");
        return;
    }

    startDiv.style.display = "none";
    timerEl.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    let savedHighScores = localStorage.getItem("high scores");
    let scoresArray;

    if(savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    let userScore = {
        initials: initialInput.value,
        score: finalScore.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);

    let scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);

    showHighScores();
}

//show high scores
var i = 0;
function showHighScores() {

    startDiv.style.display = "none";
    timerEl.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    let savedHighScores = localStorage.getItem("high scores");

    if(savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);

    let storedHighScores = JSON.parse(savedHighScores);
    
    for (; i < storedHighScores.length; i++) {
        let eachNewHighScore = document.getElementById("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " ; storedHighScores[i].score;
        highScoreList.appendChild(eachNewHighScore);
    }
}

//event listeners

startButton.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitBtn.addEventListener("click", function(event){
    storeHighScores(event);
});

viewHighScore.addEventListener("click", function(event) {
    showHighScores(event);
});

backBtn.addEventListener("click", function(){
    startDiv.style.display = "block";
    highScoreSection.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    highScoreList.innerHTML = "high scores cleared";
    highScoreList.setAttribute("style", "font=family: 'Archivo', sans-serif; font-style: italic;")
});