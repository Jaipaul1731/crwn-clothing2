import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQwGp-OUOTkLYeQGBVF9WFbejvaQetqjE",
  authDomain: "crwn-clothing-db-6c5c6.firebaseapp.com",
  projectId: "crwn-clothing-db-6c5c6",
  storageBucket: "crwn-clothing-db-6c5c6.firebasestorage.app",
  messagingSenderId: "470338961752",
  appId: "1:470338961752:web:47bb6981584c52d194e52d",
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "user", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  //   if user snap shot data doesnot exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const creatAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, creatAt });
    } catch (error) {
      console.log("error crete at user", error.message);
    }
  }
  return userDocRef;
};
