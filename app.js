//Set counters to 0
var countCorrectAnswers = 0,
	nextQuestion = 0;

//List of questions

var questionDatabase = [
		{
			question: 'According to The Hitchhikers Guide to the Gallaxy, What is the meaning of life',
			answerA: '42',
			answerB: 'Choice',
			answerC: 'Money',
			answerD: 'Love',
			correct_answer: 'js-a',
			display_answer: 'A: 42'
		},
		{
			question: 'Which pill did Neo take to leave the Matirx?',
			answerA: 'The Red Pill.',
			answerB: 'The Blue Pill.',
			answerC: 'The Green Pill.',
			answerD: 'The Yellow Pill.',
			correct_answer: 'js-a',
			display_answer: 'A The Red Pill.'
		},
		{
			question: 'What actor once had a job as a coffin polisher?',
			answerA: 'Ashton Kutcher',
			answerB: 'Sean Connery',
			answerC: 'Bill Murray',
			answerD: 'Charlie Chaplin',
			correct_answer: 'js-b',
			display_answer: 'B: Sean Connery'
		},
		{
			question: 'What was Indiana Jones first name?',
			answerA: 'Max',
			answerB: 'Bill',
			answerC: 'Henry',
			answerD: 'Indiana',
			correct_answer: 'js-c',
			display_answer: 'C: Henry'
		},
		{
			question: 'How many Police Academy Movies have there been?',
			answerA: '4',
			answerB: '6',
			answerC: '5',
			answerD: '7',
			correct_answer: 'js-d',
			display_answer: 'D: 7 '
		}
	]

//Functions to modify container

function iterateNextQuestion() {
	nextQuestion++;
	console.log(nextQuestion);
}

function iterateCorrect() {
	countCorrectAnswers++;
	console.log('+1 correct');
}

function retakeQuiz() {
	countCorrectAnswers = 0;
	nextQuestion = 0;
	quizPageLoad();
}

function reloadQuizzly() {
	window.location.reload();
}

//Load questions to page

function quizPageLoad() {
	$('homeButton').text('Quizzly Home').addClass('smaller-font');
	$('#resutlsDisplay').removeClass('hidden').text('You have completed ' + nextQuestion +
		' of 5 questions.')
	$('#js-quiz').removeClass('hidden');
	$('#final-quiz-results, #nextQuestionButton, #restartQuizBtn, #startBtn, #topBarText').addClass('hidden');
	loadQuestion();
}

function loadQuestion() {
	var questionObject = questionDatabase[nextQuestion];


	$('#js-question').text(questionObject.question);
	$('#js-answerA').text(questionObject.answerA);
	$('#js-answerB').text(questionObject.answerB);
	$('#js-answerC').text(questionObject.answerC);
	$('#js-answerD').text(questionObject.answerD)
}


// Check answers and display correct or incorrect with
function checkAnswer() {
	var userAnswer = $("form input[type='radio']:checked").val();

	if (userAnswer === questionDatabase[nextQuestion].correct_answer) {
		$('#resutlsDisplay').text('You\'re right!');
		iterateCorrect();
	}
	else {
		$('#resutlsDisplay').text('Womp womp waaaa!!! Sorry thats not quite right.' +
			' The correct answer is ' + (questionDatabase[nextQuestion].display_answer) );
	}

	loadAnswerPage();
}

function loadAnswerPage() {
	$('homeButton').text('Quizzly Home');
	$('#js-quiz').addClass('hidden');
	$('#nextQuestionButton').removeClass('hidden');
}

function chooseNextPage () {
	if (questionDatabase[nextQuestion] === questionDatabase[questionDatabase.length-1]) {
		loadLastPage();
	} else {
		iterateNextQuestion();
		quizPageLoad();
		if (questionDatabase[nextQuestion] === questionDatabase[questionDatabase.length-1]) {
			$('#nextQuestionButton').text('Submit quiz');
		}
	}
}


function loadLastPage() {
	$('#homeButton').text('Quiz Start');
	$('#resutlsDisplay').text('You finished!');
	$('#nextQuestionButton').addClass('hidden');
	$('#restartQuizBtn, #final-quiz-results').removeClass('hidden');
	// text
	quizResults();
}

function quizResults() {
	$('#js-correct-answers').text('Correct: ' +
		countCorrectAnswers );
	$('#js-incorrect-answers').text('Incorrect: ' +
		(questionDatabase.length - countCorrectAnswers) );
	$('#js-final-score').text('Final score: ' +
		(countCorrectAnswers/questionDatabase.length)*100 + "%" );
}

// LISTEN

$('#startBtn').on('click', quizPageLoad);

$('#submitButton').on('click', function(event) {
	if ($("form input[type='radio']:checked").length <= 0) {
		alert('Please select an answer.')
	}
	else {
		checkAnswer();
	}
});

$('#nextQuestionButton').on('click', chooseNextPage);

$('#restartQuizBtn').on('click', retakeQuiz);
