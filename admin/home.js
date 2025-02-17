import { getDoc , getDocs , db , collection , query , where  } from "../../firebase.js";

let scoreTable = document.getElementById("scoreTable")
let quizDropdown = document.getElementById("quizDropdown")

const getScoreListing = async ()=>{
    try {
        const userObj = JSON.parse(localStorage.getItem("userObj"))
    //    const q = query(collection(db , "scores") , where("userId" , "==" , userObj.userId)) 
        

        const querySanpshot = await getDocs(collection(db , "scores"))
        querySanpshot.forEach(doc=>{
            const data = doc.data()
            const percentage = (data.score / data.TotalQuestion) * 100    

            scoreTable.innerHTML += `<td class="border-black border-[1px] w-[100px]"> ${data.quizId}</td>
            <td class="border-black border-[1px]">${data.userName}</td>
            <td class="border-black border-[1px]">${data.QuizTitle}</td>
            <td class="border-black border-[1px]">${data.score}</td>
            <td class="border-black border-[1px]">${data.WrongAnswer}</td>
            <td class="border-black border-[1px]">${data.TotalQuestion}</td>
            <td class="border-black border-[1px]">${percentage}</td>`
            
        })
    } catch (error) {
        console.log(error.message);
        
    }
}



const QuizListing = async () => {
    try {
      const docSnap = await  getDocs(collection(db , "Quizzes")) 

      docSnap.forEach((doc) => {
        const data = doc.data();
    
            quizDropdown.innerHTML += `<option value=${doc.id}>${data.QuizTitle}</option>`
    });
    
      
    } catch (error) {
        console.log(error.message);
        
    }
    
}



const filterQuiz = async (ele)=>{

    
    const userObj = JSON.parse(localStorage.getItem("userObj"))
       const q = query(collection(db , "scores") , where("quizId" , "==" , ele.value)) 
       
       
       scoreTable.innerHTML = ""
       scoreTable.innerHTML = ` <tr class="border-[1px] border-black">
            <td class="border-black pl-1 border-[1px] w-[100px]">No#</td>
            <td class="border-black pl-1 border-[1px]  w-[100px]">Name</td>
            <td class="border-black pl-1 border-[1px]  w-[100px]">Quiz Name</td>
            <td class="border-black pl-1 border-[1px]  w-[100px]">Score</td>
            <td class="border-black pl-1 border-[1px]  w-[100px]">Wrong Ans</td>
            <td class="border-black pl-1 border-[1px]  w-[100px]">Total Question</td>
            <td class="border-black pl-1 border-[1px]  w-[100px]    ">Percentage%</td>
        </tr>`


        const querySanpshot = await getDocs(q)
        querySanpshot.forEach(doc=>{
            const data = doc.data()
            const percentage = (data.score / data.TotalQuestion) * 100    

            scoreTable.innerHTML += `<td class="border-black border-[1px] w-[100px]"> ${data.quizId}</td>
            <td class="border-black border-[1px]">${data.userName}</td>
            <td class="border-black border-[1px]">${data.QuizTitle}</td>
            <td class="border-black border-[1px]">${data.score}</td>
            <td class="border-black border-[1px]">${data.WrongAnswer}</td>
            <td class="border-black border-[1px]">${data.TotalQuestion}</td>
            <td class="border-black border-[1px]">${percentage}</td>`
            
        })


}





window.filterQuiz = filterQuiz
window.QuizListing = QuizListing
window.getScoreListing = getScoreListing