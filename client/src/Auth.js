import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { saveUser } from "./features/user/userSlice";




// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPuYr7BTxo8yhsyc-wr9g6Dg7nFLhewaA",
  authDomain: "myface-9eff8.firebaseapp.com",
  projectId: "myface-9eff8",
  storageBucket: "myface-9eff8.appspot.com",
  messagingSenderId: "536521398927",
  appId: "1:536521398927:web:5babb9682d70461f1faefa",
  measurementId: "G-42F463RH8T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });  


//Create User 
export const createUser = async (email, password) => {
  const auth = getAuth();
  await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    //Signed in
    const user_id = userCredential.user.uid;
    sessionStorage.setItem('uid', user_id)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("ErrorCode: ", errorCode)
    console.log("ErrorMessage: ", errorMessage)
    throw error;
  })
}

//Sign in existing User
export const signIn = async (email, password) => {
  try{
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;
    sessionStorage.setItem('uid', user.uid)
  } catch(err) {
    throw err;
    
  }
  
}
