/*

1) create an object which holds the question, images, answer option and all options.
2) create a timer which will display for every question. Timer value should be configurable
3) on load of page the 1st question should load and display all options for that question.
4) once user selects right answer .. notify right and if selects incorrect, show correct answer
5) create a reset function which is called as soon as the game is complete.
6) show scorecard when all questions answered or time is UP.


Sounds:
- clock sound when seconds displayed
- timeup sounds when a Question time is done
- Win game sound
- loose gaem sound

*/

window.onload = function() {
    $('.container').append($('<div>').attr('id', 'btnholder').append($('<button>').attr('id', 'start').text('Start')));
    $('#start').click(game.start);
}

// ****** Variable Declarations ****** 
var intervalId;
var isGameOver = false;
var gameQuestions = [
    { 'question': 'Who is current president of USA?', 'answer': 'Donald Trump', 'option1': 'George Bush', 'option2': 'Donald Trump', 'option3': 'Bill Clinton' },
    { 'question': 'Who is the current Prime Minister of India?', 'answer': 'Narendra Modi', 'option1': 'Mahatma Gandhi', 'option2': 'Gajendra Modi', 'option3': 'Narendra Modi' },
    { 'question': 'Which is the National flower of India?', 'answer': 'Lotus', 'option1': 'Lotus', 'option2': 'Sun Flower', 'option3': 'Tulips' },
    { 'question': 'Who is the CEO of Google?', 'answer': 'Sundar Pichai', 'option1': 'Mark Zuckerberg', 'option2': 'Satya Nadella', 'option3': 'Sundar Pichai' },
];
var correctAnswers = 0;
// ***********************************
// var name = prompt('Welcome to my game');
// console.log ('Welcome - '+name);
// $('.timerdisplay h2').append(timeInterval);

var game = {
    counter: 0,
    maxtimeforQ: 30,

    reset: function() {
    	correctAnswers = 0;
    	isGameOver = false;
        game.maxtimeforQ = 30;
        $('#start').show();
        game.start();
    },

    start: function() {
        clearInterval(intervalId);
    	$('.container').append($('<hr>'));
        $('.container').append($('<div>').attr('class','timerdisplay').append($('<h1>')));
        intervalId = setInterval(game.timer, 1000);
        $('#start').hide();
        $('.container').append($('<form>').attr('id', 'qanda'));
        for (i = 0; i < gameQuestions.length; i++) {
            $('#qanda').append($('<h2>').attr({ 'class': 'question', 'id': 'q' + i }).text(gameQuestions[i].question).append('<br>'));
            for (j = 1; j <= 3; j++) {
                var ansnow = gameQuestions[i]['option' + j];
                console.log(ansnow);
                $('#q' + i).append($('<input>').attr({ 'type': 'radio', 'name': 'option' + i, 'value': ansnow })).append($('<label>').text(ansnow)).append($('<br>'));
            }
        }
        $('#qanda h2 input').click(function() {
            console.log(this);
            if (this.value === gameQuestions[getlastCharAsInt(this.name)].answer) {
                //alert('correct Answer');
                correctAnswers++;
            }
        });
        $('.container').append($('<div>').attr('id', 'submitbtnholder').append($('<button>').attr('id', 'submit').text('Submit')));
        $('#submitbtnholder').click(function(){
        	isGameOver = true;
        	game.gameOver();
        });
    },

    timer: function() {
        $('.timerdisplay h1').text('Time Remaining : ' + game.maxtimeforQ);
        console.log(game.maxtimeforQ);
        if (game.maxtimeforQ <= 0) {
            clearInterval(intervalId);
            isGameOver = true;
            game.gameOver();
        }
        game.maxtimeforQ--;
    },

    gameOver: function() {
        if (isGameOver) {
        	$('.container').empty();
        }
        $('.container').append($('<div>').attr('id','scorecard'));
        $('#scorecard').append($('<h1>').text('Correct Answers : '+correctAnswers));
        $('#scorecard').append($('<h1>').text('Wrong Answers : '+(gameQuestions.length-correctAnswers)));

        $('.container').append($('<div>').attr('id', 'restartbtnholder').append($('<button>').attr('id', 'restart').text('Restart')));
        $('#restart').click(function(){
        	isGameOver = false;
        	$('#scorecard').empty();
        	$('#restart').hide()
        	game.reset();
        });
    }
}

function getlastCharAsInt(myString) {

    return parseInt(myString.substr(myString.length - 1));


}

// var interval = setInterval(function() {
//     console.log('in setinterval', timeInterval);
//     $('.timerdisplay h2').text('Time Remaining : ' + timeInterval);
//     timeInterval--;
//     if (timeInterval <= 0) {
//         clearInterval(interval);
//     }
// }, 1000);

// function alertAfter3secs() {
// 	interval;
// 	alert('Hi');
// }

// alertAfter3secs();