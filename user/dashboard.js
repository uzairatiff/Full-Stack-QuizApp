import { getDocs , collection , db } from "../firebase.js";

let CardListingContainer = document.getElementById("CardListingContainer")


const QuizListing = async () => {
    console.log("QuizListing");
    try {
      const docSnap = await  getDocs(collection(db , "Quizzes")) 
      console.log(docSnap);

      docSnap.forEach((doc)=>{
        const data = doc.data()
        console.log("doc" , doc.data());
        if (data.isActive == true) {
            
            CardListingContainer.innerHTML += `<div class="quiz-card">
            <p class="quiz-category">${data.QuizTitle}</p>
            <h1 class="quiz-heading">${data.QuizCategory}</h1>
            
            
            <button id="${doc.id}" class="toggle-button" onclick = "navigate(this)">Start Quiz</button>
          </div>`
        }
      })
      
    } catch (error) {
        console.log(error.message);
        
    }
    
}


const navigate = (ele) =>{
    console.log(ele.id);
    
    sessionStorage.setItem("QuizId" , ele.id) 
    window.location.assign("../user/QuizApp/quizApp.html")   
}




window.navigate = navigate
window.addEventListener("load" , QuizListing)
