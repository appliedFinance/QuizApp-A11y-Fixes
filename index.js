//  This is the javascript for an 'Economics Quiz'.  Submitted for Thinkful's Unit 1 Project.
//
// To-do's:
//  - add a timer in lower right
//  - add links to study-sites, like wikipedia

// This global array holds the quiz question
const QUIZ = [
{
	question: "If the government levied a tax of $1 on every pair of shoes sold, which of the following would most likely result?",
	answers: ["Suppliers would sell more and charge a higher price.", "Consumers would pay a higher price for shes, and probably buy a smaller quantity.", "Consumers would pay a higher price, and as a result, suppliers would make larger profits.", "Suppliers would increase the quantity sold to offset the taxes paid to the government."], 
	correct: 1
},
{
	question: "If the available supply of a product increases at the same time the demand for it falls, in the absence of counteracting forces its price will:",
	answers: ["Rise","Fall","Stay the same","Be indeterminate"],
	correct: 1
},
{
	question: "The long lines of consumers waiting outside many stores in Cuba tell us that many consumer goods there are probably:",
	answers: ["Not in demand","Priced too low","In great supply","Priced too high"],
	correct: 1
},
{
	question: "The price system in a market economy reacts to a shortage of a product by:",
	answers: ["Raising its price and producers' profits", "Lowering its price and producers' profits", "Raising its price, but lowering producers' profits", "Lowering its price, but increasing producers' profits"],
	correct: 0
},
{
	question: "In a market econommy, what determines how many workers and machines are employed in one industry vs. another?",
	answers: ["Social custom", "The exchange value of money", "The ways consumers spend their income", "The average age, education and training of people in a nation's labor force."],
	correct: 2
},
{
	question: "Which of the following tends to reduce consumer spending?",
	answers: ["A decrease in consumer incomes", "An increase in business investment", "A decrease in personal income taxes", "An increase in government payments to individuals"],
	correct: 0
},
{
	question: "At full employment, to slow down price increases during the next year of so, the government should:",
	answers: ["Raise taxes", "Increase governmental spending", "Increase loans to promising college students", "Stimulate business investment in more efficient machinery"],
	correct: 0
},
{
	question: "Changes in workers' real wages (the purchasing power of their money wages) are calculated by comparing changes in money wages with changes in the:",
	answers: ["Cost of living", "Rate of business profits", "Level of national wealth", "Volume of credit and currency"],
	correct: 0
},
{
	question: "If the amount of money circulating in the United States is rapidly increased at a time when there is full employment, what would be most likely to happen:",
	answers: ["The prices of many goods and services would rise", "We would all be better of because we could buy more", "Business would immediately try to slow down production", "Interest rates on loans would fall immediately, and for the next few years."],
	correct: 0
},
{
	question: "Over the long run, what would be the best way of increasing the amount of goods and services the nation can produce?",
	answers: ["Pass laws to prevent workers from going on strike", "Raise everyone's income so that we all have more money to spend", "Provide better technology, machinery and education for workers", "Have the government subsidize businesses in emerging high-technology industries"],
	correct: 2
}
];


/// GLOBAL VARIABLES
let numCurrentQuestion= 0; // holds the number of the current question
let userAnswer= -1; // the array index of the selected answer's data-num
let score= 0; // current number correct
let userAnswers= []; // memory of player's answers
///


function unhideQuizPage() {
	$('.quiz').removeClass("hidden");
}

function welcomePage() {
	// hide the start page and show the quiz page
	$('.start form').submit(function (event) {
		event.preventDefault();
		$(this).closest("div").addClass("hidden");
		unhideQuizPage();
	}); 
}

function loadQuestion(n) {
	// copy quiz question into question-div 
	$('.quiz .question').text(QUIZ[n].question);
	$('.quiz .question-number').text( n+1 + " of " + QUIZ.length );
}

function loadAnswers(n) {
	// add a form for each set of answers.  use Radio buttons for input.
	const $targ = $('.quiz .answers');
	$targ.html(""); // clear last answer set
	let s = "<form action='#' role='select answer'>";
	for(let i=0; i<QUIZ[n].answers.length; i++)
	{
		s = s + `
			<li>
			<label>
			<input type='radio' name='answer' value='${i}'> ${QUIZ[n].answers[i]}</label>
			</li>`;
	}
	s = s + "<div class='button-holder'><button>Submit</button></div>";
	$targ.append(s);
}

function askFirstQuestion() {
	// specifically load first quiz question
	loadQuestion(0);
	loadAnswers(0);
}

function showSummary() {
	$(".quiz").addClass("hidden"); // hide the quiz questions
	// Top line is player's score
	let s = "<p><strong><span class='large-text'>You scored " + score + " out of " + QUIZ.length + "</span></strong></p><form><button>Try Again</button></form>";
	// Loop through question and give visual feedback for right/wrong answers
	for (let i=0; i<QUIZ.length; i++)
	{
		// add if statment to select green or red box
		if (userAnswers[i] == QUIZ[i].correct) {
			// green box
			s = s + `<div class='summary-box green-box'>`;
		} else {
			// red box
			s = s + `<div class='summary-box red-box'>`;
		}
		s = s + `<p>${i+1}:  ${QUIZ[i].question}</p><p><strong><em>You answered</em></strong>: ${QUIZ[i].answers[userAnswers[i]]}</p><p><strong><em>Correct answer is</em></strong>: ${QUIZ[i].answers[QUIZ[i].correct]}</p></div>`;
	}
	s = s + `<form><button>Try Again</button></form>`; // allow naked form button to reset html load
	// Enter as new html
	$('.summary').html(s);	
}

function gradeSubmission() {
	// remember the answer
	userAnswers.push(userAnswer);
	// Allow alerts() to give immediate response in a from everyone will quickly understand
	if (userAnswer == QUIZ[numCurrentQuestion].correct) {
		alert(" C O R R E C T");
		score++;
	} else {
		alert(" W R O N G ");
	}
	// tell the player their stats as the quiz progresses	
	$('.feedback').text("Your Score so far is:  " + score + " out of " + (numCurrentQuestion+1));
}

function nextQuestion() {
	numCurrentQuestion++; // increment the question counter
	userAnswer= -1; // clear last answer

	// if there is another question available load it
	if (numCurrentQuestion < QUIZ.length) 
	{
		loadQuestion(numCurrentQuestion);
		loadAnswers(numCurrentQuestion);
	} else {
		// show summary now, there are no more questions in the global array
		showSummary();
	}
}

function addEventListeners() {
	// add event listeners

	// submit answer from answers page
	$('.answers').on("submit", "form", function(event) {
		event.preventDefault();
		userAnswer = $(this).find("input[name='answer']:checked").val();
		if (userAnswer>-1)
		{
			gradeSubmission();
			nextQuestion();
		}
	});

	// forward the li click to the radio button
	$('.answers').on("click", "li", function () {
		$(this).find("input[type='radio']").prop("checked",true);
	});
}

function main() {
	welcomePage();
	addEventListeners();
	askFirstQuestion();
}//main


$(main);



