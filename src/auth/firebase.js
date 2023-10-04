// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from 'firebase/firestore';
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMIXFw5mm9wHHXPqElMu4OiOqLwEJEPNU",
  authDomain: "react-countries-9673a.firebaseapp.com",
  projectId: "react-countries-9673a",
  storageBucket: "react-countries-9673a.appspot.com",
  messagingSenderId: "411310931584",
  appId: "1:411310931584:web:482e22368ada487c0af065",
  measurementId: "G-N9L65HGWQR"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app)
const db = getFirestore(app)


const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    console.log(err)
    alert(err.message)
  }
}

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    })
  } catch (err) {
    console.log(err)
    alert(err.message)
  }
}

const logout = () => {
  signOut(auth)
}

export { auth, db, loginWithEmailAndPassword, logout, registerWithEmailAndPassword };