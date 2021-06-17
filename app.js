console.log('This is salman from app.js');

const questionNumber= document.querySelector('.question-number');
const questionText= document.querySelector('.question-text');
const optionContainer= document.querySelector('.option-container');
const answersIndicatorContainer= document.querySelector('.answer-indicator');
const homeBox= document.querySelector('.home-box');
const quizBox= document.querySelector('.quiz-box');
const resultBox= document.querySelector('.result-box');


let questionCounter=0;
let currentQuestion;
let availableQuestion=[];
let availableOptions=[];
let correctAnswers=0;
let attempt = 0;

// Push the Question into availableQuestions array

function setAvailableQuestions()
{
    const totalQuestion= quiz.length;
    for (let i=0 ; i<totalQuestion; i++)
    {
        availableQuestion.push(quiz[i]);
    }
}

// Set questions number and question and option

function getNewQuestions()
{
    questionNumber.innerHTML="Question " + (questionCounter + 1)+ " of " +quiz.length;

    // set Question text
    // get random questions 
    const questionIndex = availableQuestion[Math.floor(Math.random()* availableQuestion.length)];
    currentQuestion=questionIndex;
    questionText.innerHTML=currentQuestion.q;

    // get the position of questionIndex from the availableQuestions Array
    const index1= availableQuestion.indexOf(questionIndex);

    // remove the 'questionIndex' from the availableQuestion Array . so that the question does not repeat
    availableQuestion.splice(index1, 1);
    // set options
    // get the length of the options 
    const optionLen= currentQuestion.options.length;

    // push options into availableOptions Array 
    for(let i=0; i<optionLen; i++){
        availableOptions.push(i)
    }

    optionContainer.innerHTML='';
    let animationDelay=0.15;
    // Create a options in html
    for(let i=0; i<optionLen; i++){
        // random option
        const optionIndex= availableOptions[Math.floor(Math.random()* availableOptions.length)];
        // get the position of 'optionIndex ' from the availableOptions
        const index2 = availableOptions.indexOf(optionIndex);

        // Remove the 'optionIndex' from the availableOptions , so that
        availableOptions.splice(index2,1);
        const option= document.createElement("div");
        option.innerHTML= currentQuestion.options[optionIndex];
        option.id=optionIndex;
        option.style.animationDelay= animationDelay + 's';
        animationDelay=animationDelay + 0.15;
        option.className="option";
        optionContainer.appendChild(option)
        option.setAttribute('onclick', 'getResult(this)');
    }

    questionCounter++;
}


// get the result of current attempt question 
function getResult(element){

    const id =parseInt(element.id);
    // get the answer by comparing id of clicked option
    if(id=== currentQuestion.answer){
        // set the green color to the option
        element.classList.add('correct');

        // add the indicator to the correct mark
        updateAnswerIndicator('correct');
        correctAnswers++;
        console.log('correct:', correctAnswers);
    }
    else{
        // set the res color to the incorrect option
        element.classList.add('wrong');

        // add the indicator to the wrong mark
        updateAnswerIndicator('wrong');
        

        // if the answer is incorrect the correct option by adding green color the correct option
        const optionLen= optionContainer.children.length;
        for(let i=0; i<optionLen ; i++){
            if(parseInt(optionContainer.children[i].id)=== currentQuestion.answer){
                optionContainer.children[i].classList.add('correct');
            }
        }
    }
    attempt++;
    unClickableoptions();
}

//  make all the options unclickable once user select a option {Restrict the user to change the option agian}
function unClickableoptions(){
    const optionLen= optionContainer.children.length;
    for(let i=0;i<optionLen; i++){
        optionContainer.children[i].classList.add('already-answered');
    }
}


function answersIndicator(){
    answersIndicatorContainer.innerHTML = "";
    const totalQuestion=quiz.length;
    for(let i=0;i<totalQuestion; i++){
        const indicator= document.createElement('div');
        answersIndicatorContainer.appendChild(indicator);

    }
}


function  updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
}

function next()
{
    if(questionCounter === quiz.length){
        console.log('Quiz Over');
        quizOver();
    }
    else
    {
        getNewQuestions();
    }
}


function quizOver(){
    // hide quiz quizBox 
    quizBox.classList.add('hide');
    // show result box
    resultBox.classList.remove('hide');
    quizResult();
}

// get the quiz result's

function quizResult(){
    resultBox.querySelector('.total-question').innerHTML=quiz.length;
    resultBox.querySelector('.total-attempt').innerHTML=attempt;
    resultBox.querySelector('.total-correct').innerHTML= correctAnswers;
    resultBox.querySelector('.total-wrong').innerHTML= attempt- correctAnswers ;
    const percentage= (correctAnswers/ quiz.length)*100;
    resultBox.querySelector('.total-percentage').innerHTML= percentage.toFixed(2)+ "%";
    resultBox.querySelector('.total-score').innerHTML=correctAnswers+ " / " + quiz.length;
}


function resetQuiz(){
    questionCounter=0;
    correctAnswers=0;
    attempt = 0;
}


function tryAgainQuiz(){
    // hide the resultBox
    resultBox.classList.add('hide');
    // show the quiz Box 
    quizBox.classList.remove('hide');
    resetQuiz();
    startQuiz();
}

function goToHome(){
    // hide result box
    homeBox.classList.add('hide');
    // show home box
    homeBox.classList.remove('hide');
    resetQuiz();

}

// #### STARTING POINT #####


function startQuiz()
{

    // hide home box
    homeBox.classList.add('hide');
    //show quiz box
    quizBox.classList.remove('hide');

    // first we will set all questions in availableQuestions Array
    setAvailableQuestions();

    // second we will call getNewQuestions() ; function
    getNewQuestions();

    // to create indicator of answer
    answersIndicator();
}


// window.onload=function(){
//     homeBox.querySelector('.total-question').innerHTML= quiz.length;
// }