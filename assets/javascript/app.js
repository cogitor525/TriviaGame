// $('body').css('background-image', "url('assets/images/andromeda.jpg')");


// these define duration of game timeouts
const qTimeout = 10000;
const qInterval = 3000;

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

};

// GAME PRE-START: This section runs at pageload

// $(".hidden").css('visibility', 'hidden');
// #question {
//     background-color: rgba(0,128,0,0.25);
//     color: white;
//     border: 1px solid green;
//     margin-left: 160px;
//     margin-right: 160px;
//     margin-bottom: 25px;
// }