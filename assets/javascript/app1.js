var trivia = {
	//array of objects containing questions, answers, and index of solution
	questions: [
		{
			question: "What is first planet in solar system?",
			answers: [
				"Mercury",
				"Increase Pokemon Happiness",
				"Heal Freeze",
				"Nothing, it's just a Poffin ingredient"
			],
			solution: 0,
			image: "Mercury"
		},
		{
			question: "What is second planet in solar system?",
			answers: [
				"Rest",
				"Agility",
				"Venus",
				"Imprison"
			],
			solution: 2,
			image: "Venus"
		},
		{
			question: "What is third planet in solar system?",
			answers: [
				"Earth",
				"Skitty",
				"Igglybuff",
				"Patrat"
			],
			solution: 0,
			image: "Earth"
		},
		{
			question: "what is fourth planet in solar system?",
			answers: [
				"Fire / Water",
				"Normal / Dragon",
				"Electric / Fire",
				"Mars"
			],
			solution: 3,
			image: "Mars"
		},
		{
			question: "What is fifth planet in solar system?",
			answers: [
				"Trade for a specific other Pokemon",
				"Jupiter",
				"Level up with a specific other Pokemon in the party",
				"Level up while the game system is upside-down"
			],
			solution: 1,
			image: "Jupiter"
		},
		{
			question: "What is sixth planet in solar system?",
			answers: [
				"26",
				"27",
				"Saturn",
				"29"
			],
			solution: 2,
			image: "Saturn"
		},
		{
			question: "What is seventh planet in solar system?",
			answers: [
				"Jigglypuff",
				"Uranus",
				"Roselia",
				"Piloswine"
			],
			solution: 1,
			image: "Uranus"
		},
		{
			question: "What is eight planet in solar system?",
			answers: [
				"Togedemaru",
				"Jirachi",
				"Genesect",
				"Neptune"
			],
			solution: 3,
			image: "Neptune"
		},
		{
			question: "What is ninth planet in solar system?",
			answers: [
				"Pluto",
				"Xurkitree",
				"Blacephalon",
				"Cryogonal"
			],
			solution: 0,
			image: "Pluto"
		},
		{
			question: "Do aliens exist on earth?",
			answers: [
				"True",
				"False",
				"Neither true nor false",
				"To be determined"
			],
			solution: 3,
			image: "Blob"
		},
	],
	//right and wrong answer counters
	rightCount: 0,
	wrongCount: 0,
	//chosen answer
	chosenAnswer: "",
	//index of current question
	currentIndex: 0,
	//object of current question (i.e. questions[currentIndex])
	currentQuestion: {},
	//timer to count down
	timer: 10,
	//interval variable
	interval: null,

	//randomizes question order
	randomizeOrder: function() {
		var currentIndex = this.questions.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = this.questions[currentIndex];
			this.questions[currentIndex] = this.questions[randomIndex];
			this.questions[randomIndex] = temporaryValue;
		}
	},

	//display new set of question and answers
	showQuestion: function() {
		//set currentQuestion
		this.currentQuestion = this.questions[this.currentIndex];

		//display question on page
		$("#question").text(this.currentQuestion.question);

		//display answers on page
		for (var i = 0; i < this.currentQuestion.answers.length; i++) {
			var newAns = $("<a href='#' class='answer'>").text(this.currentQuestion.answers[i]);
			$("#answers").append(newAns);
		}

		//display image
		$("#question-image").attr("src", "assets/images/"+this.currentQuestion.image+".jpg");

		//countdown timer
		$("#countdown").text(trivia.timer);
		this.interval = setInterval(function() {
			trivia.timer--;
			$("#countdown").text(trivia.timer);
			if (trivia.timer <= 0) {
				trivia.progressGame();
			}
		}, 1000);
	},

	//check for right/wrong answer and move to next question
	progressGame: function() {
		//CORRECT ANSWER LOGIC:
		if (this.chosenAnswer == this.currentQuestion.answers[this.currentQuestion.solution]) {
			this.rightCount++;
			this.currentIndex++;

			//reset timer
			clearInterval(this.interval);
			this.timer = 10;

			//remove answers from game area and hide it
			$("#answers").empty();
			$("#game-area").attr("class", "hidden");

			//add text to result area and show it
			$("#result-area").append("<h2>Correct! You picked the right answer.</h2>");
			$("#result-area").append("<h4>Next question in 3 seconds...</h4>");
			$("#result-area").attr("class", "");
			
			//run this after 5 seconds
			setTimeout(function() {
				//if at the end of questions array
				if (trivia.currentIndex >= trivia.questions.length) {
					trivia.endGame();
				}
				
				//if not at the end
				else {
					//hide result area and show game area
					$("#result-area").empty();
					$("#result-area").attr("class", "hidden");
					$("#game-area").attr("class", "");
					
					//show next question
					trivia.showQuestion();
				}
			}, 3000);
		}
		
		//WRONG ANSWER / TIMEOUT LOGIC:
		else {
			this.wrongCount++;
			this.currentIndex++;

			//reset timer
			clearInterval(this.interval);
			
			//remove answers from game area and hide it
			$("#answers").empty();
			$("#game-area").attr("class", "hidden");
			
			//if time ran out
			if (this.timer <= 0) {
				//add text to result area and show it
				$("#result-area").append("<h2>Time Up! The correct answer was: '" +this.currentQuestion.answers[this.currentQuestion.solution] +"'</h2>");
				$("#result-area").append("<h4>Next question in 3 seconds...</h4>");
				$("#result-area").attr("class", "");
				this.timer = 10;
			}
			
			//if wrong answer was chosen
			else {
				//add text to result area and show it
				$("#result-area").append("<h2>Incorrect! The correct answer was: '" +this.currentQuestion.answers[this.currentQuestion.solution] +"'</h2>");
				$("#result-area").append("<h4>Next question in 3 seconds...</h4>");
				$("#result-area").attr("class", "");
				this.timer = 10;
			}

			//run this after 5 seconds
			setTimeout(function() {
				//if at the end of questions array
				if (trivia.currentIndex >= trivia.questions.length) {
					trivia.endGame();
				}
				
				//if not at the end
				else {
					//hide result area and show game area
					$("#result-area").empty();
					$("#result-area").attr("class", "hidden");
					$("#game-area").attr("class", "");
	
					//show next question
					trivia.showQuestion();
				}
			}, 3000);
		}
	},

	//show end screen
	endGame: function() {
		clearInterval(this.interval);

		$("#game-area").attr("class", "hidden");
		$("#result-area").attr("class", "hidden");
		$("#end-screen").attr("class", "");

		$("#right-answers").text("Correct Answers: " +this.rightCount);
		$("#wrong-answers").text("Incorrect Answers: " +this.wrongCount);
		$("#percent-right").text("Percentage Correct: " +Math.round((this.rightCount / this.questions.length) * 100) +"%");
	},

	//reset and restart game
	resetGame: function() {
		//empty out all changing text
		$("#question").empty();
		$("#answers").empty();
		$("#result-area").empty();
		$("#right-answers").empty();
		$("#wrong-answers").empty();
		$("#percent-right").empty();

		//reset all variables
		this.currentIndex = 0;
		this.rightCount = 0;
		this.wrongCount = 0;
		this.currentQuestion = {};
		this.chosenAnswer = "";
		this.timer = 10;
		clearInterval(this.interval);
		
		//show / hide sections
		$("#end-screen").attr("class", "hidden");
		$("#result-area").attr("class", "hidden");
		$("#game-area").attr("class", "");

		//randomize question order and restart game
		this.randomizeOrder();
		this.showQuestion();
	},
}
$(document).ready(function() {
	//randomize question order and start game
	trivia.randomizeOrder();
	trivia.showQuestion();

	//listener for clicking on an answer
	$("body").on("click", ".answer", function() {
		trivia.chosenAnswer = $(this).text();
		trivia.progressGame();
	});

	//listener for restart button
	$("body").on("click", "#restart-button", function() {
		trivia.resetGame();
    });
    
    var listEl = document.querySelector("#grocery-list");
    var shoppingCartEl = document.querySelector("#shopping-cart");
    var groceries = ["Team 1", "Team 2", "Team 3", "Team 4", "Team 5"];
    
    listEl.addEventListener("click", function(event) {
      event.preventDefault();
      if(event.target.matches("button")) {
        var item = document.createElement("div");
        item.textContent = groceries[event.target.parentElement.id];
        shoppingCartEl.append(item);
      }
    });



});
/*
document.getElementById("lessFun").onclick = function() { 
  
	document.getElementById("Fun").style.display = "none"; 

}
document.getElementById("moreFun").onclick = function() { 
  
	document.getElementById("Fun").style.display = "block"; 

}
*/

function onClickHide (){
	document.getElementById("Fun").style.display = "none";
}
function onClickShow() {
	document.getElementById("Fun").style.display = "block";
}
/*
var listEl = document.querySelector("#grocery-list");
var shoppingCartEl = document.querySelector("#shopping-cart");
var groceries = ["Bananas", "Apples", "Oranges", "Grapes", "Blueberries"];

listEl.addEventListener("click", function(event) {
  event.preventDefault();
  if(event.target.matches("button")) {
    var item = document.createElement("div");
    item.textContent = groceries[event.target.parentElement.id];
    shoppingCartEl.append(item);
  }
});
*/