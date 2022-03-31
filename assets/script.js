const startButton = document.getElementById('start-btn');
const qsContainerEl = document.getElementById('q-container');
const titleTxt = document.getElementById('homeTxt');
const hsBtnEl = document.getElementById('high-score-btn');
const nextBtnEl = document.getElementById('next-btn');
const endBtnEl = document.getElementById('end-btn');
var timeEl = document.getElementById('timer');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('choices');
const highScoreEl = document.querySelector('.highScoreResult')
const feedbackEl = document.getElementById('answerReveal');

// Necessary empty variables
var nowQuestion = {}
var answerCorrect =  true
var score = 0
var qCounter = 0
var numOfQuestions = []

// Series of question stored in variable 'questions'
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
        choices: ['alert("Hello JavaScript)', 'alertBox("Hello JavaScript"', 'msg("Hello JavaScript")', 'msgBox("Hello JavaScript")'],
        var: 'alert("Hello JavaScript)'
    },
    {
        question: 'How does a FOR loop start?',
        choices: ['for 1 = 1 to 5', 'for (i = 0; i <= 5)', 'for (i = 0; i <= 5; i++)', 'for (i <= 5; i++)'],
        answer: 'for (i = 0; i <= 5; i++)'
    }
];

const maxPoint = 100;
const maxQs = 5;

// To randomized questions in a stored variable 'questions'
var randomizedQs, questionIndexNow

// function showQs(question) {
//     questionEl.innerHTML = question.question;
//     question.answers.forEach  
// }

// Hides the elements on title page once user click on 'Start Quiz' and proceeds to display questions 
startButton.addEventListener('click', gameStart);
var questionIndexNow = 0;
var secLeft = questions.length * 15;
var timerId;
function gameStart() {
    startButton.classList.add('hide');
    titleTxt.classList.add('hide');
    hsBtnEl.classList.add('hide');
    qsContainerEl.classList.remove('hide');
    nextBtnEl.classList.remove('hide');
    endBtnEl.classList.remove('hide');
    timeEl.classList.remove('hide');

    randomizedQs = questions.sort(() => Math.random() - .5);
    questionIndexNow = 0;

    timerId = setInterval(clockTick, 1000);

    nextQuestion(); // called function to display question after clicking on start quiz 

}

// Setting timer for quiz takers
// var secLeft = 75;

function clockTick() {
       
        secLeft--;
        timeEl.textContent = "Time: " + secLeft;

        // Conditions when users running out of time 
        if(secLeft <= 0) {
            // timeEl.textContent = "";
            clearInterval(secLeft);
            
            quizEnd();
        }
   
}

// Display following question 
;
function nextQuestion() {
    // showQs(randomizedQs,[questionIndexNow]); 

    var currentQuestion = questions[questionIndexNow];

    var questionEl = document.getElementById('question');
    questionEl.textContent = currentQuestion.question;
    answerEl.innerHTML ="";

    currentQuestion.choices.forEach(function(choice) {
        var choiceNode = document.createElement('button');
        choiceNode.setAttribute('class', 'choice');
        choiceNode.setAttribute('value', choice);
        choiceNode.textContent = choice;

        choiceNode.onclick = questionClick;
        answerEl.appendChild(choiceNode);
    })


    // if (numOfQuestions.length === 0 || qCounter > maxQs) {
    //     localStorage.setItem('recentHighScore', score);
    //     return window.location.assign()
    // }
}

function questionClick() {
    if (this.value !== questions[questionIndexNow].answer ) {
        secLeft -= 15;
        if (secLeft < 0) {
            secLeft = 0;
        }
        timeEl.textContent = secLeft;

        feedbackEl.textContent = "wrong!";
    } else {
        feedbackEl.textContent = "Correct!";
    }

    feedbackEl.setAttribute('class', 'feedback');
    setTimeout(function() {
        feedbackEl.setAttribute('class', 'feedback hide');

    }, 1000);



    questionIndexNow++;
    if (questionIndexNow === questions.length) {
        quizEnd();
    } else {
        nextQuestion();
    }
}

// function for score board input
function quizEnd() {
    clearInterval(timerId);
    qsContainerEl.classList.add('hide');
    nextBtnEl.classList.add('hide');
    endBtnEl.classList.add('hide');
    highScoreEl.classList.remove('hide'); 
    
}