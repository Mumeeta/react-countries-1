// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore, deleteDoc, query, where, getDocs } from 'firebase/firestore';
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

const auth = getAuth(app);
const db = getFirestore(app);

const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

const addFavouriteToFirebase = async (uid, name) => {
  try {
    await addDoc(collection(db, `users/${uid}/favourites`), { name });
    console.log("Favourite added to Firebase database");
  } catch (err) {
    console.error("Error adding favourite to Firebase database: ", err);
  }
};

const removeFavouriteFromFirebase = async (uid, name) => {
  try {
    if (!name) {
      console.error("Error removing favourite from Firebase database: name parameter is undefined");
      return;
    }
    const q = query(collection(db, `users/${uid}/favourites`), where("name", "==", name));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
      console.log("Favourite removed from Firebase database");
    });
  } catch (err) {
    console.error("Error removing favourite from Firebase database: ", err);
  }
};

export {
  auth,
  db,
  loginWithEmailAndPassword,
  logout,
  registerWithEmailAndPassword,
  addFavouriteToFirebase,
  removeFavouriteFromFirebase
};