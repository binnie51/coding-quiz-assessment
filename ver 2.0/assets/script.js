// global element variables
var timeEl = document.getElementById("timer");
var scoreEl = document.getElementById("score");
var startBtn = document.getElementById("start-btn");
var highScoreBtn = document.getElementById("high-score-btn");
// questions variables
var questionEl = document.querySelector(".questions-display");

var answerEl = document.querySelector("#answer-revealed");
var progressEl = document.querySelector(".progress-bar");
var randomQuestions, currQIndex;
// containers 
var titleContainer = document.querySelector(".title");
var quizContainer = document.querySelector(".quiz-Container");
var endContainer = document.querySelector(".ending-container");
var scoreboardContainer = document.querySelector(".scoreboard-container");

var initTime = 60;
var score = 0;
var intervalId;
// time spend on each question
var questionTime = 15;
var totalTime = questions.length * questionTime;

// Set of questions
const questions = [
    {
        question: 'What is JavaScript?',
        choices: ['Programming language of the Web, used for both client-side and server-side development.', 'Language to style HTML document(s)', 'A standard language for storing, manipulating and retrieving data in databases', 'All the above'],
        answer: 'Programming language of the Web, used for both client-side and server-side development.'
    },
    {
        question: 'Which of the followings enables you to declare variables(s)?',
        choices: ['function', 'var', 'if', 'return'],
        answer: 'var'
    },
    {
        question: 'Which HTML element we use to insert JavaScript?',
        choices: ['<div>', '<javascript>', '<js>', '<script>'],
        answer: '<script>'
    },
    {
        question: 'How would you write "Hello JavaScript" in an alert box?',
        choices: ['alert("Hello JavaScript")', 'alertBox("Hello JavaScript"', 'msg("Hello JavaScript")', 'msgBox("Hello JavaScript")'],
        answer: 'alert("Hello JavaScript")'
    },
    {
        question: 'How does a FOR loop start?',
        choices: ['for 1 = 1 to 5', 'for (i = 0; i <= 5)', 'for (i = 0; i <= 5; i++)', 'for (i <= 5; i++)'],
        answer: 'for (i = 0; i <= 5; i++)'
    }
];

// Initialize my game
startBtn.addEventListener("click", gameStart);
function gameStart() {
    // hide title, show quiz 
    titleContainer.classList.add("hide");
    quizContainer.classList.remove("hide");

    

    scoreEl.textContent = "Score: " + score;
    // randomized questions object
    randomQuestions = questions.sort(() => Math.floor() - .5);
    currQIndex = 0;
    intervalId = setInterval(function() {
        clockTick();
    }, 1000);

    fetchQuestion();
}

// init 60 seconds timer, decrement by 1000 or "1 second"
var clockTick = setInterval(function () {
    --totalTime;
    timeEl.textContent = "Time: " + initTime;
    // if time runs out, 
    // end the quiz, clear interval and save the score to the local storage
    if (totalTime <= 0){
        clearInterval(clockTick);
        // save player time to local storage "score"
        localStorage.setItem("score", score);
        // end the quiz by calling the ending screen function
        endQuiz();
    }
}, 1000);

// grab a random question from the list 
function fetchQuestion() {
    // grab questions from the object key, assign it to a var
    var currentQuestion = questions[currQIndex];
    if (currentQuestion === undefined) {
        localStorage.setItem("score", JSON.stringify(score));
        endQuiz();
    }
    questionEl.textContent = currentQuestion.question;

    answerEl.innerHTML = "";
    currentQuestion.choices.forEach(element => {
        // create button tags for each multiple choices
        const choiceNode = document.createElement("p");


    });
}

// performs checks on the answer
function clickCheck(event){
    let selectedChoice = event.target.dataset.choices;
    let currentQuestion = questions[currQIndex];

    if(selectedChoice === currentQuestion.answer) {
        score += 20;
        answerEl.textContent = "Correct! 👍";
        answerEl.setAttribute("text-success");
        // 1 second momentum 
        setTimeout(function (){
            answerEl.innerHTML = "";
        }, 1000);
    } 
    else {
        totalTime -= 15;

        answerEl.textContent = "That's not the correct answer!";
        answerEl.setAttribute("text-danger");
        // 1 second momentum
        setTimeout(function (){
            answerEl.innerHTML = "";
        }, 1000);
    }
    fetchQuestion();
}