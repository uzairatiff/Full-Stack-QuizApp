import { getDocs , getDoc , db , collection, doc, addDoc } from "../../firebase.js";

let questions = []
let indexNumber = 0
let score = 0
let QuizTitle

const questionElement = document.getElementById("questionElement")
const optionsElement = document.getElementById("optionsElement")
const nextBtn = document.getElementById("next-btn")
const scores = document.getElementById("scores").children

// const myPromise = new Promise()

const checkQuizId =async ()=>{
    try {
        
        const QuizId = sessionStorage.getItem("QuizId")
        console.log("QuizId" , ":" , QuizId);
        if (QuizId == null) {
            window.location.replace("../dashboard.html")
            return
        }
        
        const docSnap = await getDoc(doc(db , "Quizzes" , QuizId))
        console.log(docSnap.data());
        QuizTitle = docSnap.data().QuizTitle

        questions = docSnap.data().Questions
        
        return questions
    } catch (error) {
        console.log(error.message);
        
    }
}

checkQuizId()
.then((response)=>{
    console.log(response , "response");
    questions = response
    handleQuestion()
    
})
.catch((error)=>{
    console.log(error);
    
})





const handleQuestion = ()=> {

    console.log("handleQuestion", questions);
    let optionsObj = questions[indexNumber].options;
    let questionTitle = questions[indexNumber].QuestionText;
    
    // Keep existing structure and only update the content
    questionElement.innerHTML = `<h2 class="question">Q : ${questionTitle}</h2>`;
    
    optionsElement.innerHTML = "";
    for (let i = 0; i < optionsObj.length; i++) {
        optionsElement.innerHTML += `<li onclick="checkAns(this)" class="option">${optionsObj[i]}</li>`;
    }
}



const checkAns = (ele) => {    
    let correctAns = questions[indexNumber].CorrectAnswer.trim().toLowerCase();
    var allLiElement = optionsElement.children;

    // Disable all options
    for (var i = 0; i < allLiElement.length; i++) {
        allLiElement[i].style.pointerEvents = "none"; // Prevent further clicks
    }

    if (ele.textContent.trim().toLowerCase() === correctAns) {
        ele.style.backgroundColor = "#32CD32";
        ele.style.color = "white";
        score++;
    } else {
        ele.style.backgroundColor = "#FF474C";
        ele.style.color = "white";

        for (var i = 0; i < allLiElement.length; i++) {
            if (allLiElement[i].textContent.trim().toLowerCase() === correctAns) {
                allLiElement[i].style.backgroundColor = "green";
                break;
            }
        }
    }
    nextBtn.style.display = "block";
};
 




const nextQues = () => {
    
    if (indexNumber < questions.length - 1) {
        indexNumber++
        handleQuestion()  
    }else {
        console.log("submitted");
        onSubmit()
        
    }
}



const onSubmit = async ()=> {
    console.log("score" , ":" , score);
    console.log("totalQuestions" , ":" ,  questions.length);
    console.log("worngAnswer" , ":" ,  questions.length - score);

    const userObj = JSON.parse(localStorage.getItem("userObj"));

    const scoreObj = {
        TotalQuestion : questions.length,
        score : score,
        WrongAnswer : questions.length - score,
        quizId : sessionStorage.getItem("QuizId"),
       userId : userObj.userId,
       userName : userObj.Name,
       QuizTitle : QuizTitle,
       

    }
    console.log(scoreObj);

   const response =  await addDoc(collection(db , "scores") , scoreObj)
        console.log(response);

        scores[1].innerHTML = `Quiz Title : ${QuizTitle}` 
        scores[2].innerHTML = `QuizScore : ${score}`
        scores[3].innerHTML = `Total Question : ${questions.length}`
        scores[4].innerHTML = `Wrong Question : ${questions.length - score}`

        let resultContainer = document.getElementById("resultContainer")
        resultContainer.style.display = "block"
        
    
}











window.nextQues = nextQues
window.onSubmit = onSubmit
window.checkAns = checkAns
window.handleQuestion = handleQuestion;