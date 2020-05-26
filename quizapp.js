//  This is the javascript for an 'Economics Quiz'.  Submitted for Thinkful's Unit 1 Project.
//
// To-do's:
//  - add a timer in lower right
//  - add links to study-sites, like wikipedia

// This global array holds the quiz question
const QUIZ = [
{
question: "The amount an investor will have in 15 years if $1000 is invested today at an annual interest  rate of 9% will be closest to:",
answers: ["", "$1,350.", "$3,518.", "$3,642.", "$9,000."],
correct: 3
},
{
question: "Fifty years ago, an investor bought a share of stock for $10.  That stock has paid no dividends during this period, yet it has returned 20%, compounded annually, over the past 50 years.  If this is true, the share price is now closest to:",
answers: ["", "$1,000.", "$4,550.", "$45,502.", "$91,004."],
correct: 4
},
{
question: "How much must be invested today at 0% to have $100 in three years?",
answers: ["", "$77.75", "$100.00", "$126.30", "$87.50"],
correct: 2
},
{
question: "How much must be invested today, at 8% interest, to accumulate enough to retire a $10,000 debt due seven years from today? (closest)",
answers: ["", "$3,265.", "$5,835.", "$6,123.", "$8,794."],
correct: 2
},
{
question: "An analyst estimates that XYZ’s earnings will grow from $3.00 a share to $4.50 per share over the next eight years.  The rate of growth in XYZ’s earnings is closest to:",
answers: ["", "4.9%", "5.2%", "6.7%", "7.0%"],
correct: 2
},
{
question: "If $5,000 is invested in a fund offering a rate of return of 12% per year, approximately how many years will it take for the investment to reach $10,000?",
answers: ["", "4.33 years", "5.75 years", "6.12 years", "7.50 years"],
correct: 3
},
{
question: "An investment is expected to produce the cash flows of $500, $200, and $800 at the end of the next three years.  If the required rate of return is 12%,  the PV (present value) is closest to:",
answers: ["", "$835.", "$1,175.", "$1,235.", "$1,500."],
correct: 2
},
{
question: "Given an 8.5% discount rate, an asset that generates cash flows of $10 in year 1, -$20 in year 2, $10 in year 3, and is then sold for $150 at the end of year 4 has a present value of:",
answers: ["", "$163.42", "$150.00", "$135.58", "$108.29"],
correct: 4
},
{
question: "An investor has just won the lottery and will receive $50,000 per year at the end of each of the next 20 years.  At a 10% interest rate, the PV is closest to:",
answers: ["", "$418,246.", "$425,678.", "$637,241.", "$2,863,750."],
correct: 2
},
{
question: "If $10,000 is invested today in an account earning interest at a rate of 9.5%, what is the value of the equal withdrawals which can be taken out of the account at the end of each of the next five years, if the investor plans to deplete the account at the end of the time period?",
answers: ["", "$2,000.", "$2,453.", "$2,604.", "$2,750."],
correct: 3
},
{
question: "An investor is to receive a 15-year $8,000 annuity due, the first payment to be received to today.  At an 11% discount rate, what is this annuities PV?",
answers: ["", "$55,855", "$57,527.", "$63,855.", "$120,000."],
correct: 4
},
{
question: "Given an 11% rate of return, the amount needed to be put into an investment account at the end of each of the next 10 years in order to accumulate $60,000 is?",
answers: ["", "$2,500", "$4,432", "$3,588", "$6,000"],
correct: 3
},
{
question: "An investor will receive an annuity of $4,000 a year for 10 years.  The first payment is to be received 5 years from today.  At a 9% discount rate, this annuity’s worth today, PV, is?",
answers: ["", "$16,684.", "$18,186.", "$25,671.", "$40,000."],
correct: 2
},
{
question: "If $1,000 is invested today and $1,000 is invested at the beginning of each of the next 3 years, at 12% interest (compounded annually), the amount an investor will have at the end of the 4th year will be?",
answers: ["", "$4,272.", "$4,779.", "$5,353.", "$6,792."],
correct: 3
},
{
question: "An investor is looking at a $150,000 home.  If 20% must be put down and the balance is financed at 9% over the next 30 years, what is the monthly mortgage payment?",
answers: ["", "$652.25", "$799.33", "$895.21", "$965.55"],
correct: 4
},
{
question: "Given daily compounding, the growth of $5,000 invested for one year at 12% interest will be?",
answers: ["", "$5,600", "$5,628", "$5,637", "$5,000"],
correct: 3
},
{
question: "Terry Corporation preferred stocks are expected to pay $9 annual dividend forever.  If the required rate of return on equivalent investments is 11%, a share of Terry preferred should be worth?",
answers: ["", "$100.00", "$81.82", "$99.00", "$122.22"],
correct: 2
},
{
question: "A share of George Co. preferred stock is selling for $65.  It pays a dividend of $4.50 per year and has a perpetual life.  The rate of return it is offering its investors is?",
answers: ["", "4.5%", "6.5%", "6.9%", "14.4%"],
correct: 3
},
{
question: "If $10,000 is borrowed at 10% interest to be paid back over 10 years, how much of the second year’s payment is interest (assume annual loan payments)?",
answers: ["", "$954.25", "$937.26", "$1,000.00", "$1,037.26"],
correct: 2
},
{
question: "What is the effective annual rate for a credit card that charges 18% compounded monthly?",
answers: ["", "15.00%", "15.38%", "18.81%", "19.56%"],
correct: 4
}];






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



