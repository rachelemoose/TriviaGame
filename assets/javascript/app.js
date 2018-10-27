$(document).ready(function() {
    var quizQuestions = [
        {
            question: "When is Harry Potter's Birthday?",
            answers: ["October 31", "September 31", "August 31", "July 31"],
            correctAnswer: 3
        }, 
        {
            question: "What does the spell Expelliarmus do?",
            answers: ["Disarms your opponent", "Throws your opponent off their feet", "Gives your opponent a nosebleed"],
            correctAnswer: 0
        },
        {
            question: "What is Harry's middle name?",
            answers: ["Ronald", "Sirius", "James", "Edward"],
            correctAnswer: 2
        },
        {
            question: "Where is Harry's bedroom in the first book?",
            answers: ["Dudley's second bedroom", "The attic", "The cupboard under the stairs", "The Master Bedroom"],
            correctAnswer: 2
        }, 
        {
            question: "What is the symbol for the Ravenclaw house?",
            answers: ["A badger", "A fox", "A lion", "An Eagle", "A Raven"],
            correctAnswer: 3
        }
    ];

//how many the player has gotten right
var correct = 0;

//how many the player has gotten wrong
var wrong = 0;

//how many the player left blank
var unanswered = 0;

//how long the timer goes for - 10 seconds
var timer = 10; 
var intervalId;

//variable for the players answer guess
var userGuess ="";

//set variable of timer to not be running
var running = false;

//number of quiz questions 
var qCount = quizQuestions.length;

//computers pick (object) of the question
var pick;

//array of questions randomly generated
var index;


var newArray = [];


var placeholder = [];

$("#reset").hide(); //hide the reset button until after the results are shown


function showQuestion(){
    index = Math.floor(Math.random()*quizQuestions.length);
    console.log(index) //shows the number of the array question chosen 
    pick = quizQuestions[index];
    console.log(pick) //logs the entire object of question and answers chosen
    $("#questions").html(pick.question);
    console.log(pick.question) //logs the question that the computer has chosen
    for(var i = 0; i < pick.answers.length; i++) {
        console.log(pick.answers.length)
        var userChoice = $("<div>");
        userChoice.addClass("answerchoice");
        userChoice.html(pick.answers[i]);
        //assign array position to it so can check answer
        userChoice.attr("data-guessvalue", i);
        $("#choices").append(userChoice);
    }

};

//click on answer choice function
$(document).on("click", ".answerchoice", function () {
	//grab array position from user's answer guess and gives that an attribute
    userGuess = parseInt($(this).attr("data-guessvalue"));
    console.log(userGuess)

	//correct guess or wrong guess outcomes
	if (userGuess === pick.correctAnswer) {
		stop();
		correct++;
		userGuess="";
        $("#choices").html("<p>Correct!</p>");
        next();

	} else {
		stop();
		wrong++;
		userGuess="";
        $("#choices").html("<p>Wrong! The correct answer is: " + pick.answers[pick.correctAnswer] + "</p>");
        next();
	}
});

function next() {
	newArray.push(pick);
	quizQuestions.splice(index,1);

	setTimeout(function() {
		$("#choices").empty();
		timer= 10;

	//see if all questions have been answered or not then show the score
	if ((wrong + correct + unanswered) === qCount) {
		$("#questions").empty();
		$("#questions").html("<h3>You finished! See your score below </h3>");
		$("#choices").append("<h4> Number Correct: " + correct + "</h4>" );
		$("#choices").append("<h4> Number Incorrect: " + wrong + "</h4>" );
		$("#choices").append("<h4> Number Unanswered: " + unanswered + "</h4>" );
		$("#reset").show();
		correct = 0;
		wrong = 0;
		unanswered = 0;

	} else {
		startTimer();
		showQuestion();

	}
	}, 1000);
}

//on start button, show first question
$("#start").on("click", function(){
    $("#start").hide();
    $("#instructions").hide()
    showQuestion();
    startTimer();
    for(var i = 0; i < quizQuestions.length; i++) {
        placeholder.push(quizQuestions[i]);
    }
})


//timer start
function startTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}

//timer countdown
function decrement() {
	$("#timer").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

	//show message is they run out of time 
	if (timer === 0) {
		unanswered++;
		stop();
		$("#choices").html("<p>Time's up! The correct answer is: " + pick.answers[pick.correctAnswer] + "</p>");
		hidepicture();
	}	
}
//stop timer 
function stop() {
	running = false;
	clearInterval(intervalId);
}


$("#reset").on("click", function() {
	$("#reset").hide();
	$("#choices").empty();
	$("#questions").empty();
	for(var i = 0; i < placeholder.length; i++) {
		quizQuestions.push(placeholder[i]);
	}
	startTimer();
	showQuestion();

})


}); //end of document ready function