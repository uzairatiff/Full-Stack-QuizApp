import { collection, doc, getDocs, db, updateDoc } from "../firebase.js";

let parent = document.querySelector("#parent");

const GetQuizList = async () => {
  try {
    const quizSnap = await getDocs(collection(db, "Quizzes"));
    parent.innerHTML = ""; // Clear the list before repopulating

    quizSnap.forEach((doc) => {
      const QuizObj = { ...doc.data(), id: doc.id };
      console.log(doc.id);

      parent.innerHTML += `
        <div class="quiz-card">
          <h1 class="quiz-heading">${QuizObj.QuizTitle}</h1>
          <p class="quiz-category">${QuizObj.QuizCategory}</p>
          ${QuizObj.isActive ? 
            `<button id=${doc.id} onclick="toggleStatus(this, 'Inactive')" class="toggle-button">Active</button>` : 
            `<button id=${doc.id} onclick="toggleStatus(this, 'active')" class="toggle-button">Inactive</button>`
          }
        </div>`;
    });
  } catch (error) {
    console.error(error.message);
  }
};

const toggleStatus = async (ele, status) => {
  try {
    console.log(ele, status);
    const CardID = ele.id;

    await updateDoc(doc(db, "Quizzes", CardID), {
      isActive: status === 'Inactive' ? false : true
    });

    console.log("Status updated successfully");
    GetQuizList(); // Refresh the quiz list
  } catch (error) {
    console.error(error.message);
  }
};

window.GetQuizList = GetQuizList;
window.toggleStatus = toggleStatus;

