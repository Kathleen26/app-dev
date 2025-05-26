 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
  import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
  import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
  apiKey: "AIzaSyBTYGQr5-l4v2NwG_aurcu6starrvom9yY",
  authDomain: "login-form-158fe.firebaseapp.com",
  projectId: "login-form-158fe",
  storageBucket: "login-form-158fe.firebasestorage.app",
  messagingSenderId: "805436245484",
  appId: "1:805436245484:web:65cd7c8db19d0d29142cc9"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

    const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedUserName').innerText=userData.name;
                document.getElementById('loggedUserEmail').innerText=userData.email;
            }
            else{
                console.log("no document found matching id")
            }
        })
        .catch((error)=>{
            console.log("Error getting document");
        })
    }
    else{
        console.log("User Id not Found in Local storage")
    }
  })

  const logoutButton=document.getElementById('logout');

  logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='login and register.html';
    })
    .catch((error)=>{
        console.error('Error Signing out:', error);
    })
  })