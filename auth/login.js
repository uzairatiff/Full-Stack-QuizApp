import { getAuth, signInWithEmailAndPassword, auth, app, collection, doc, getDoc, db } from "../firebase.js";

const email = document.getElementById("email");
const password = document.getElementById("password");

let userdata; // Declare userdata outside the function

const SignInHandler = async () => {
  try {
    if (!email.value || !password.value) {
      alert("Required Fields Are Missing");
      
    }

    const userAuth = await signInWithEmailAndPassword(auth, email.value, password.value);

    const uid = userAuth.user.uid;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    userdata = { ...docSnap.data(), uid }; // Assign value to userdata

    if (userdata.type === "admin") {
      window.location.assign("../admin/dashboard.html");
    } else {
      window.location.assign("../user/dashboard.html");
    }

  } catch (error) {
    console.log(error.message);
    alert(error.message)
  }
}

export { userdata }; // Now userdata is accessible here

window.SignInHandler = SignInHandler;