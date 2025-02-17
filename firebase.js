  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
  import { getFirestore , collection , updateDoc , setDoc , getDoc , doc , addDoc , getDocs ,  query, where } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBWqgT1WbV_xtReBjZr_LLqO-EBfp0l5dY",
    authDomain: "fullstack-quizapp-141b3.firebaseapp.com",
    projectId: "fullstack-quizapp-141b3",
    storageBucket: "fullstack-quizapp-141b3.firebasestorage.app",
    messagingSenderId: "602229231550",
    appId: "1:602229231550:web:eaccea4eb7addefcbe33ef",
    measurementId: "G-T3JGY2ZXMM"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app)
  export{
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    app,
    auth,
    collection,
    doc,
    addDoc,
    setDoc,
    getDoc,
    getDocs,
    db,
    updateDoc,
     query,
      where 
    
  }