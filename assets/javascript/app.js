// $('body').css('background-image', "url('assets/images/andromeda.jpg')");


// these define duration of game timeouts
const qTimeout = 10;  // 10 seconds
const qInterval = 3;  // 3 seconds

// these variables track the player's score/record
let countCorrect;
let countWrong;
let countTimeout;

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
addQuestion("Which particle mediates the EM force?","photon","electron","magneton","gluon","URL_here");
addQuestion("Which newly developed procedure allows for precise genetic editing?","CRISpR","PCR","transcriptase","RNAi","URL_here");
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
    $("#question").text(questionArray[questionIndex].question);
    loadAnswers();

    // questionIndex++;
    // if questionIndex == questionArray.length, the final question has been loaded

    qTimer();
};

function qTimer() {
    $("#time-remain").text("Time Remaining: " + qTimeout + " seconds");

};

function loadAnswers() {
    const sequence = [ 1, 2, 3, 4 ];
    shuffle(sequence);

    $("#answers").empty();

    for (let i=0; i<sequence.length; i++) {
        const displayAns = $("<h1>");

        switch(sequence[i]) {
            case 1:
                displayAns.text(questionArray[questionIndex].answers.correct);
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
