const startButton = document.getElementById('start-btn');
const qsContainerEl = document.getElementById('q-container');
const titleTxt = document.getElementById('homeTxt');
const hsBtnEl = document.getElementById('high-score-btn');
const nextBtnEl = document.getElementById('next-btn');
var timeEl = document.getElementById('timer');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answers-btn');

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
        choice: ['Programming language of the Web, used for both client-side and server-side development.', 'Language to style HTML document(s)', 'A standard language for storing, manipulating and retrieving data in databases', 'All the above'],
        answer: 'Programming language of the Web, used for both client-side and server-side development.'
    },
    {
        question: 'Which of the followings enables you to declare variables(s)?',
        choice: ['function', 'var', 'if', 'return'],
        answer: 'var'
    },
    {
        question: 'Which HTML element we use to insert JavaScript?',
        choice: ['<div>', '<javascript>', '<js>', '<script>'],
        answer: '<script>'
    },
    {
        question: 'How would you write "Hello JavaScript" in an alert box?',
        choice: ['alert("Hello JavaScript)', 'alertBox("Hello JavaScript"', 'msg("Hello JavaScript")', 'msgBox("Hello JavaScript")'],
        var: 'alert("Hello JavaScript)'
    },
    {
        question: 'How does a FOR loop start?',
        choice: ['for 1 = 1 to 5', 'for (i = 0; i <= 5)', 'for (i = 0; i <= 5; i++)', 'for (i <= 5; i++)'],
        answer: 'for (i = 0; i <= 5; i++)'
    }

]

const maxPoint = 100;
const maxQs = 5;

// To randomized questions in a stored variable 'questions'
let randomizedQs, questionIndexNow

function showQs(question) {
    questionEl.innerHTML = question.question;
    question.answers.forEach  
}

// Hides the elements on title page once user click on 'Start Quiz' and proceeds to display questions 
startButton.addEventListener('click', gameStart);

function gameStart() {
    startButton.classList.add('hide');
    titleTxt.classList.add('hide');
    hsBtnEl.classList.add('hide');
    randomizedQs = questions.sort(() => Math.random() - .5);
    questionIndexNow = 0;
    qsContainerEl.classList.remove('hide');
    nextBtnEl.classList.remove('hide');
    clockTick();
    nextQuestion(); // called function to display question after clicking on start quiz 

    
}

// Setting timer for quiz takers
var secLeft = 60;

function clockTick () {
    var time = setInterval(function() {
        secLeft--;
        timeEl.textContent = secLeft;

        // Conditions when users running out of time 
        if(time <= 0) {
            clearInterval(time);
            quizEnd();
        }
    }, 1000)
}

// Display following question 
function nextQuestion() {
    showQs(randomizedQs,[questionIndexNow]); 

    if (numOfQuestions.length === 0 || qCounter > maxQs) {
        localStorage.setItem('recentHighScore', score);
        return window.location.assign()
    }
}

// 
function quizEnd() {

}