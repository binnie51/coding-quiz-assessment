const startButton = document.getElementById('start-btn');
const qsContainerEl = document.getElementById('q-container');
const titleTxt = document.getElementsByClassName('homeTxt');
var timeEl = document.getElementById('timer');

// Hides the elements on title page once user click on 'Start Quiz' and proceeds to display questions 
startButton.addEventListener('click', gameStart);

function gameStart() {
    startButton.classList.add('hide');
    titleTxt.classList.add('hide');
    qsContainerEl.classList.remove('hide');
    clockTick();
    nextQuestion();
}

// Setting timer
var secLeft = 120;

function clockTick () {
    var time = setInterval(function() {
        secLeft--;
        timeEl.textContent = secLeft + " seconds left"

        // If users running out of time 
        if(time <= 0) {
            clearInterval(time);
        }
    }, 1000)
}

function nextQuestion()

// Series of question
const questions = [
    {
        question: 'What is HTTP stands for?',
        answers: [
            
        ]
    }
]