import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

  
  const firebaseConfig = {
  apiKey: "AIzaSyBTYGQr5-l4v2NwG_aurcu6starrvom9yY",
  authDomain: "login-form-158fe.firebaseapp.com",
  projectId: "login-form-158fe",
  storageBucket: "login-form-158fe.firebasestorage.app",
  messagingSenderId: "805436245484",
  appId: "1:805436245484:web:65cd7c8db19d0d29142cc9"
  };

 
  const app = initializeApp(firebaseConfig);
  
    function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0; 
    },5000);
 }
 const signUp=document.getElementById('submitSignUp');
 signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    const firstName=document.getElementById('fName').value;
    const lastName=document.getElementById('lName').value;

    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email: email,
            firstName: firstName,
            lastName:lastName
        };
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='index.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);

        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already Exists!', 'signUpMessage');
        }
        else{
            showMessage('unable to create User', 'signUpMessage');
        }
    })
 });

const signIn=document.getElementById('submitSignIn');
signIn.addEventListener('click', (event)=>{
   event.preventDefault();
   const email=document.getElementById('email').value;
   const password=document.getElementById('password').value;
   const auth=getAuth();

   signInWithEmailAndPassword(auth, email,password)
   .then((userCredential)=>{
       showMessage('login is successful', 'signInMessage');
       const user=userCredential.user;
       localStorage.setItem('loggedInUserId', user.uid);
       window.location.href='home.html';
   })
   .catch((error)=>{
       const errorCode=error.code;
       if(errorCode==='auth/invalid-credential'){
           showMessage('Incorrect Email or Password', 'signInMessage');
       }
       else{
           showMessage('Account does not Exist', 'signInMessage');
       }
   })
});

const showResetLink = document.getElementById('showReset');
const backToSignInLink = document.getElementById('backToSignIn');
const resetContainer = document.getElementById('resetContainer');
const signInContainer = document.getElementById('signInContainer');

showResetLink.addEventListener('click', (event) => {
    event.preventDefault();
    signInContainer.style.display = 'none';
    resetContainer.style.display = 'block';
    // Clear previous messages and input
    document.getElementById('resetMessage').style.display = 'none';
    document.getElementById('resetEmail').value = '';
});

backToSignInLink.addEventListener('click', (event) => {
    event.preventDefault();
    resetContainer.style.display = 'none';
    signInContainer.style.display = 'block';
    // Clear previous messages and input
    document.getElementById('signInMessage').style.display = 'none';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
});

const submitReset = document.getElementById('submitReset');
submitReset.addEventListener('click', (event) => {
    event.preventDefault();
    const auth = getAuth();
    const email = document.getElementById('resetEmail').value;
    if (!email) {
        showMessage('Please enter your email address.', 'resetMessage');
        return;
    }
    sendPasswordResetEmail(auth, email)
    .then(() => {
        showMessage('Password reset email sent. Please check your inbox.', 'resetMessage');
    })
    .catch((error) => {
        showMessage('Error sending password reset email: ' + error.message, 'resetMessage');
    });
});

// Google login
const loginGoogleBtn = document.getElementById('loginGoogle');
loginGoogleBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;
        localStorage.setItem('loggedInUserId', user.uid);
        showMessage('Google login successful', 'signInMessage');
        window.location.href = 'create survey.html';
    })
    .catch((error) => {
        showMessage('Google login failed: ' + error.message, 'signInMessage');
    });
});

// Facebook login
const loginFacebookBtn = document.getElementById('loginFacebook');
loginFacebookBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const auth = getAuth();
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;
        localStorage.setItem('loggedInUserId', user.uid);
        showMessage('Facebook login successful', 'signInMessage');
        window.location.href = 'create survey.html';
    })
    .catch((error) => {
        showMessage('Facebook login failed: ' + error.message, 'signInMessage');
    });
});