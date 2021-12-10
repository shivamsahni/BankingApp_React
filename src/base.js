import { initializeApp } from "firebase/app";
import {getDatabase, ref} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnoQvEVKWI2_26DfDAWJwLmv9eOL_9vKE",
  authDomain: "bankingapp-17f81.firebaseapp.com",
  databaseURL:"https://bankingapp-17f81-default-rtdb.firebaseio.com/",
  projectId: "bankingapp-17f81",
  storageBucket: "bankingapp-17f81.appspot.com",
  messagingSenderId: "585053833963",
  appId: "1:585053833963:web:8e3d7fbedb5fe031b6ccae",
  measurementId: "G-Q6NTRMX7HG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const dbRef = ref(db);
export default app;
