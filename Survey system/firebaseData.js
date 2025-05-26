import {getFirestore, setDoc, doc, collection, addDoc} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";

//intialize firebae
const firebaseConfig = {
  apiKey: "AIzaSyBTYGQr5-l4v2NwG_aurcu6starrvom9yY",
  authDomain: "login-form-158fe.firebaseapp.com",
  projectId: "login-form-158fe",
  storageBucket: "login-form-158fe.firebasestorage.app",
  messagingSenderId: "805436245484",
  appId: "1:805436245484:web:65cd7c8db19d0d29142cc9"
  };

const app = initializeApp(firebaseConfig);

//initialize firestore
export const db = getFirestore();


//gets respondent data from registration.html

const register=document.getElementById('register');
const age=document.getElementById('age');
const gender=document.getElementById('gender');
const address=document.getElementById('address');

register.addEventListener('click', (event)=>{
    event.preventDefault();
  addDoc(collection(db, "respondentData"), {
  age: age.value,
  gender: gender.value,
  address: address.value
});
    
})
 



