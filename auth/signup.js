import { createUserWithEmailAndPassword , signInWithEmailAndPassword ,app , auth ,collection, doc, addDoc , setDoc ,db } from "../firebase.js";

const fullName = document.getElementById("name")
const email = document.getElementById("email")
const password = document.getElementById("password")

const SignUpHandler = async () => {
   try {       
       if (!fullName.value || !email.value || !password.value) {
           alert("Required Fields Are Missing");
           return;
       }

       
       
       
       const authResponse = await createUserWithEmailAndPassword(auth , email.value , password.value)
       console.log(authResponse);
       const userId = authResponse.user.uid
       const userObj = {
           Name: fullName.value,
           email: email.value,
           password: password.value,
           userId : userId,
           type : "user",
           isBlock : "false",
           isDeleted : "false"
       };
       console.log(userObj);

    localStorage.setItem("userObj", JSON.stringify(userObj))

await setDoc(doc(db, "users", authResponse.user.uid) , userObj)


       alert("account created sucsessfully")
       window.location.assign("../index.html")
       

   } catch (error) {
       console.log(error.message);
   }
};

window.SignUpHandler = SignUpHandler;
