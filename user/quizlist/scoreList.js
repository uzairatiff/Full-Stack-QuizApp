import { getDoc , getDocs , db , collection , query , where  } from "../../firebase.js";

let scoreTable = document.getElementById("scoreTable")

const getScoreListing = async ()=>{
    try {
        const userObj = JSON.parse(localStorage.getItem("userObj"))
       const q = query(collection(db , "scores") , where("userId" , "==" , userObj.userId)) 
        

        const querySanpshot = await getDocs(q)
        querySanpshot.forEach(doc=>{
            const data = doc.data()
            const percentage = (data.score / data.TotalQuestion) * 100    
            console.log(doc.data());

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










window.getScoreListing = getScoreListing