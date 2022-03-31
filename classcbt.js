let cbt = {
    duration: 1,
    instructions: `
        1.) Read all questions carefully
        2.) Answer all questions
    `,
    questions: [
        {
           questionNo: 1,
           question: "Who is the worst president in Nigeria",
           options: [
               "On seat", "Bubu", "Buhari", "Muhammedu"
           ],
           answer: 1
        },
        {
            questionNo: 2,
            question: "Who is the present governor of Rivers state",
            options:[
                "Wike", "Bubu","Wiki"
            ],
            answer: 0
        },
        {
            questionNo: 3,
            question: "What is the best University in Nigeria",
            options: [
                "Unilag","Uniben","Covenant","Uniport","UI"
            ],
            answer: 1 

        }
    ]

}

const countDown=()=>{
    //cbt.duration--;
    
    if(seconds==0){
        seconds = 59;

        if(cbt.duration==0){
            clearInterval(tmr);
            seconds = 0;
            markScript();
        }
        else{cbt.duration--;}
    }
    else{
        seconds--;
    }
    

    //This code is to extract hour and minute from duration and change display
    hour = Math.floor(cbt.duration/60); //1.
    minute = cbt.duration%60;

    const timer = document.querySelector(".timer");
    timer.innerHTML = hour + ":" + minute + ":" + seconds;
}

let hour = Math.floor(cbt.duration/60); //1.
let minute = cbt.duration%60; let seconds = 0;


const timer = document.querySelector(".timer");
timer.innerHTML = hour + ":" + minute + ":00";

let tmr = setInterval(countDown,1000);

//Day 2 work

const question_div = document.querySelector(".question_div");//Get reference to question_div

const option_div = document.querySelector(".option_div"); //Get reference to options div

const question_bottom = document.querySelector(".question_bottom"); //Get reference to questions button
question_bottom.innerHTML = "";
//To put bottoms inside the above div, lets loop through the questions
for(let i = 0; i < cbt.questions.length; i++){
    question_bottom.innerHTML += `
        <button onclick="showQuestion(${i})">${i+1}</button>
    `
}

//This get references to the questions buttons
const ques_btns = document.querySelectorAll(".question_bottom > button")

let select_options = []; // This array will hold the selected option for each question
for(let x = 0; x < cbt.questions.length; x++){
    select_options[x] = -1;
}

showQuestion(0); //Call function to display the first question and its options

/*This will be called by each button when they are clicked
    Each button will passed the index value as argument.
*/
function showQuestion(questionNumber){
    //alert(questionNumber)
    question_div.innerHTML = cbt.questions[questionNumber].question;

    /*This add the question options */
    option_div.innerHTML = "";

    for(let i = 0; i < cbt.questions[questionNumber].options.length; i++){
        option_div.innerHTML += `
            <input type="radio" onclick="setOption(${questionNumber},${i})" name="option"/> ${cbt.questions[questionNumber].options[i]} <br />  
        `;
    }
    //End of adding question options

    const inputs = document.querySelectorAll(".option_div > input");

    //This loops through the buttons and remove highlight class for the buttons
    for(let i = 0; i < ques_btns.length; i++){
        ques_btns[i].classList.remove("highlight");
    }
    //End of loop

    ques_btns[questionNumber].classList.add("highlight"); //This highlight the button that is clicked

    //Set option if selected
    if(select_options[questionNumber] >= 0){
        let sel_opt = select_options[questionNumber];
        inputs[sel_opt].checked = true;
    }
}

function setOption(questionNumber,optionNumber){
    //alert(questionNumber + "/" + optionNumber)
    select_options[questionNumber] = optionNumber;
}

function markScript(){
    let score = 0;
    for(let x=0; x < select_options.length; x++){
        if(select_options[x] == cbt.questions[x].answer){
            score++;
        }
    }
    alert(score)
}

function endExam(){
    if(confirm("Are you sure you want to end exam?")){
        clearInterval(tmr);
        markScript();
    }
    
}