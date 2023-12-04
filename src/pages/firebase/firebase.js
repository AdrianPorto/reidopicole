import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAu1ZbPmisttQlpNC726BCCSXBsL2GXs7o",
  authDomain: "reidopicole-6a645.firebaseapp.com",
  projectId: "reidopicole-6a645",
  storageBucket: "reidopicole-6a645.appspot.com",
  messagingSenderId: "378414271993",
  appId: "1:378414271993:web:cafbc3be8505085570c128",
  measurementId: "G-H5WEGX5T9S",
};

const monitorAuthState = async () => {
  onAuthStateChanged(auth, (user) => {});
};
monitorAuthState;

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
