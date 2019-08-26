// $('body').css('background-image', "url('assets/images/andromeda.jpg')");


// these define duration of game timeouts
const qTimeout = 10;  // 10 seconds
const qInterval = 10;  // 10 seconds

// this will hold our setInterval that runs the timer
let timerId;

// these variables track the player's score/record
let countCorrect;
let countWrong;
let countTimeout;

let correctAnswer;
let currentUrl;

// this object contains paths to images to be used in game
const imageUrlSet = {
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
    q10: "",
};

let questionIndex;
const questionArray = [];
// questionArray will be array of objects with following structure:

// questionArray[i] = {
//     question: "Question here",
//     answers: {
//         correct: "Correct answer here",
//         wrong1: "Wrong answer #1",
//         wrong2: "Wrong answer #2",
//         wrong3: "Wrong answer #3"
//     },
//     imageUrl: "Image URL here"
// }

// following function creates Question objects with above structure
function createQuestion(question,correctAnswer,wrong1Answer,wrong2Answer,wrong3Answer,imageUrl) {
    this.question = question;
    this.answers = {};
    this.answers.correct = correctAnswer;
    this.answers.wrong1 = wrong1Answer;
    this.answers.wrong2 = wrong2Answer;
    this.answers.wrong3 = wrong3Answer;
    this.imageUrl = imageUrl;
};

// following function calls above function to create new Question object,
// then pushes to questionArray
function addQuestion(question,correctAnswer,wrong1Answer,wrong2Answer,wrong3Answer,imageUrl) {
    const q = new createQuestion(question,correctAnswer,wrong1Answer,wrong2Answer,wrong3Answer,imageUrl);
    questionArray.push(q);
};

// this section to create questionArray to be used in game
addQuestion("What particle mediates the electromagnetic force?","photon","electron","magneton","gluon","assets/images/photon.gif");
addQuestion("Which of the following is a method of gene editing?","CRISPR","DNAse","telomerase","RNAi","assets/images/CRISPR.gif");
addQuestion("");
addQuestion("");
addQuestion("");
addQuestion("");
addQuestion("");
addQuestion("");
addQuestion("");
addQuestion("");
addQuestion("");
addQuestion("");

// this function called when starting/restarting new game
function initializeGame() {
    countCorrect = 0;
    countWrong = 0;
    countTimeout = 0;
    questionIndex = 0;
    loadQuestion();
};

function loadQuestion() {
    currentUrl = questionArray[questionIndex].imageUrl;
    $("#question").text(questionArray[questionIndex].question);
    loadAnswers();
    qTimer();
};

function qTimer() {
    $("#time-remain").text("Time Remaining: " + qTimeout + " seconds");

};

function nextQTimer() {
    questionIndex++;
    // if questionIndex == questionArray.length, there are no further questions

    setTimeout(function() {
        if (questionIndex == questionArray.length) {
            endGame();
        } else {
            loadQuestion();
        }
    }, (qInterval*1000));
};

function loadAnswers() {
    const sequence = [ 1, 2, 3, 4 ];
    shuffle(sequence);

    $("#answers").empty();

    for (let i=0; i<sequence.length; i++) {
        const displayAns = $("<h1>");

        switch(sequence[i]) {
            case 1:
                correctAnswer = questionArray[questionIndex].answers.correct;
                displayAns.text(correctAnswer);
                displayAns.addClass("CORRECT");
                break;
            case 2:
                displayAns.text(questionArray[questionIndex].answers.wrong1);
                break;
            case 3:
                displayAns.text(questionArray[questionIndex].answers.wrong2);
                break;
            case 4:
                displayAns.text(questionArray[questionIndex].answers.wrong3);
                break;
            default:
                alert("Error: sequence[i] not found during loadAnswers() run");
        }

        displayAns.addClass("button");
        $("#answers").append(displayAns);
    }
};

// performs a shuffle of the array
function shuffle(array) {
    let i = 0;
    let j = 0;
    let temp = null;
  
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};

// START GAME: following runs upon clicking "Click here to begin!"
$(".start-game").on("click", function() {
    $("#question").removeClass('start-game');
    $("#question").css('background-color', 'transparent');
    $("#question").css('border', 'none');
    $("#question").css('margin-left', '0');
    $("#question").css('margin-right', '0');
    initializeGame();
    $(".hidden").css('visibility', 'visible');
});

// ANSWER SELECTION: following runs upon clicking an answer option
$(document.body).on("click", ".button", function() {
    clearInterval(timerId);
    $("#answers").empty();
    if ($(this).hasClass("CORRECT")) {
        $("#question").text("Correct!");
        countCorrect++;
    } else {
        $("#question").text("No...");
        countWrong++;
        const showCorrect = $("<h5>");
        showCorrect.text("The correct answer is: " + correctAnswer);
        $("#answers").append(showCorrect);
    }
    const image = $("<img>");
    image.attr("src", currentUrl);
    image.css("height", "250px");
    $("#answers").append(image);
    nextQTimer();
});