import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD10KX2TvUFskvfuGBTfMVycUHR-IL9cLQ",
    authDomain: "vue-chuthulu-pagina.firebaseapp.com",
    projectId: "vue-chuthulu-pagina",
    storageBucket: "vue-chuthulu-pagina.appspot.com",
    messagingSenderId: "768333201882",
    appId: "1:768333201882:web:5686d1aaab0545fb1580e3",
    measurementId: "G-TDCBQ9QMNV"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const database = firebase.database();
  export const db = firebase.firestore();
  export const auth = firebase.auth();
  export const storage = firebase.storage();
