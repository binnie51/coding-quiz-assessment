const startButton = document.getElementById('start-btn');
const qsContainerEl = document.getElementById('q-container');
const titleTxt = document.getElementById('title');
const hsBtnEl = document.getElementById('high-score-btn');
const timeEl = document.getElementById('timer');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('choices');
const highScoreEl = document.querySelector('.highScoreResult')
const feedbackEl = document.getElementById('answerReveal');
const scoreEl = document.getElementById('score');

const usernameEl = document.querySelector('#username');
const saveScoreBtnEl = document.querySelector('#saveScoreBtn');
const finalScoreEl = document.querySelector('#finalScore');
const highScoreList = document.querySelector('ul');

const hsDisplayEl = document.querySelector('.highScoresPage')

var score = 0;

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
        choices: ['alert("Hello JavaScript")', 'alertBox("Hello JavaScript"', 'msg("Hello JavaScript")', 'msgBox("Hello JavaScript")'],
        answer: 'alert("Hello JavaScript")'
    },
    {
        question: 'How does a FOR loop start?',
        choices: ['for 1 = 1 to 5', 'for (i = 0; i <= 5)', 'for (i = 0; i <= 5; i++)', 'for (i <= 5; i++)'],
        answer: 'for (i = 0; i <= 5; i++)'
    }
];

// Variable to randomized questions in a stored variable 'questions' and index of the questions' array
var randomizedQs, questionIndexNow

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
    timeEl.classList.remove('hide');

    timeEl.textContent = "Time: 75";
    scoreEl.textContent = "Score: " + score;

    // randomized question
    randomizedQs = questions.sort(() => Math.random() - .5);

    questionIndexNow = 0;

    timerId = setInterval(clockTick, 1000);

    nextQuestion();
}

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

// Start & display question 

function nextQuestion() {
    // showQs(randomizedQs,[questionIndexNow]); 

    var currentQuestion = questions[questionIndexNow];

    var questionEl = document.getElementById('question');
    questionEl.textContent = currentQuestion.question;
    answerEl.innerHTML = "";

    currentQuestion.choices.forEach(function(choice) {
        var choiceNode = document.createElement('button');
        choiceNode.setAttribute('class', 'choice');
        choiceNode.setAttribute('value', choice);
        choiceNode.textContent = choice;

        choiceNode.onclick = questionClick;
        answerEl.appendChild(choiceNode);
    })
}

// when the users choose the correct/wrong anwers. it'll deduct 15 sec on every wronmg answer 
function questionClick() {
    if (this.value !== questions[questionIndexNow].answer ) {
        secLeft -= 15;
        if (secLeft <= 0) {
            secLeft = 0;
            clearInterval(secLeft);
        }
        timeEl.textContent = "Time:" + secLeft;
        scoreEl.textContent = "Score: " + score;

        feedbackEl.textContent = "Wrong! 15 seconds deduct.";
    } else {
        score += 20;
        scoreEl.textContent = "Score: " + score;
        feedbackEl.textContent = "Correct!";
    }

    feedbackEl.setAttribute('class', 'feedback');
    setTimeout(function() {
        feedbackEl.setAttribute('class', 'feedback hide');

    },1000);

    nextQuestion();



    questionIndexNow++;
    if (questionIndexNow === questions.length) {
        quizEnd();
        clearInterval(timerId);
        timeEl.textContent = "";
    } 
    else {
        nextQuestion();
    }
}

// function for score board input
function quizEnd() {
    qsContainerEl.classList.add('hide');
    scoreEl.innerHTML = "";

    highScoreEl.classList.remove('hide'); 
    finalScoreEl.textContent = score;
    
    // note: know what child and parent 
}

// End page and storing results into local storage
// selectors for end page
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

usernameEl.addEventListener('keyup', () => {
    saveScoreBtnEl.disabled = !usernameEl.value
})

// function displayHighScore() {
//     if(highScores !== null) {
//         document.querySelector('#hsList').textContent = highScores.finalScoreEl + " " + highScores.usernameEl
//     }
// }

function displayHighScore() {
    console.log(highScores);
    for(var i = 0; i < highScores.length; i++){
        console.log(highScoreList);
        var listScore = document.createElement("li");
        
        listScore.textContent = highScores[i].name + " - " + highScores[i].score;
        highScoreList.appendChild(listScore);
    }
}

document.querySelector(".highScoreResult").addEventListener('click', function(event) {
    
    if(event.target.matches('#saveScoreBtn')){
        event.preventDefault();
        // can't save progress without entering initials
        if (usernameEl.value === "") {
            alert("Please enter your initials!");
            return;
        }

        const score = {
            score: finalScoreEl.innerHTML,
            name: usernameEl.value
        };
        // console.log(score);
        // console.log(finalScoreEl);
        highScores.push(score);
        highScores.sort( (a, b) =>  b.score - a.score);
        window.localStorage.setItem('highscores', JSON.stringify(highScores));
        
        displayHighScore();
        hsDisplayEl.classList.remove('hide'); // displaying highscore page
        highScoreEl.classList.add('hide');

        
    }
});
 

document.querySelector("#homeBtn").addEventListener("click", function(event) {
    event.preventDefault();

    startButton.classList.remove('hide');
    titleTxt.classList.remove('hide');
    hsBtnEl.classList.remove('hide');
    hsDisplayEl.classList.add('hide');

    // gameStart();
    // questionClick();

});

// view high scores page after clicking on "high Scores" button on the main menu
document.querySelector("#high-score-btn").addEventListener("click", function(event) {
    event.preventDefault();
    
    hsDisplayEl.classList.remove('hide');
    startButton.classList.add('hide');
    titleTxt.classList.add('hide');
    hsBtnEl.classList.add('hide');

});