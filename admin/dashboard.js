// const authCheck = () => {
//     const user = localStorage.getItem("userObj");
//     console.log(user);
//     if (user == null) {
//         window.location.replace("../index.html");
//     }
// };



import { addDoc , collection , db } from "../firebase.js";






const QuizCategory = document.getElementById("Quizcategory")
const QuizTitle = document.getElementById("QuizTitle")
const QuestionText = document.getElementById("QuestionText")
const OptionA = document.getElementById("OptionA")
const OptionB = document.getElementById("OptionB")
const OptionC = document.getElementById("OptionC")
const OptionD = document.getElementById("OptionD")
const CorrectAnswer = document.getElementById("CorrectAnswer")


const CreateQuiz = async () => {
    try {
        if (
            Quizcategory.value === "" ||
            QuizTitle.value === "" ||
            QuestionText.value === "" ||
            OptionA.value === "" ||
            OptionB.value === "" ||
            OptionC.value === "" ||
            OptionD.value === "" ||
            CorrectAnswer.value === ""
        ) {
            alert("Fill all Imput Feilds");
            return;
        }
        console.log(QuesArr , "QuesArr");
        
        const SaveObj = {
            QuizTitle : QuizTitle.value,
            QuizCategory : QuizCategory.value,
            Questions : QuesArr,
            isActive : false
        }
        
        
        const response = await addDoc(collection(db, "Quizzes") , SaveObj)
        console.log("response" , response);
        
        
        
    } catch (error) {
        console.log(error.message);
        alert(error.message)
        
    }
    
}

const QuesArr = []



const NextQuesBtn = async () => { 
    const QuestionText = document.getElementById("QuestionText")
    const OptionA = document.getElementById("OptionA")
    const OptionB = document.getElementById("OptionB")
    const OptionC = document.getElementById("OptionC")
    const OptionD = document.getElementById("OptionD")
    const CorrectAnswer = document.getElementById("CorrectAnswer")
    if (

        QuestionText.value === "" ||
        OptionA.value === "" ||
        OptionB.value === "" ||
        OptionC.value === "" ||
        OptionD.value === "" ||
        CorrectAnswer.value === ""
    ) {
        alert("you should fill these feilds")
    }
    
    QuestionText.value == ""
OptionA.value == "" 
 OptionB.value == ""
OptionC.value == ""
 OptionD.value == ""
 CorrectAnswer.value == ""
    const QuesObj = {
        QuestionText : QuestionText.value,
        options : [
            OptionA.value,
            OptionB.value,
            OptionC.value,
            OptionD.value,
        ], 
        CorrectAnswer : CorrectAnswer.value,
        
    }
    QuesArr.push(QuesObj)
    console.log(QuesObj);
    
}



window.NextQuesBtn = NextQuesBtn;
window.CreateQuiz = CreateQuiz;


























