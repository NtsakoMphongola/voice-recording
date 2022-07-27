import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat//firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyCmx3BWXhHfTC_zggeTR1vGobIz6q7jsEw",
    authDomain: "journal-voice.firebaseapp.com",
    projectId: "journal-voice",
    storageBucket: "journal-voice.appspot.com",
    messagingSenderId: "19502546613",
    appId: "1:19502546613:web:937f229b87b2bb7e8908fc"
}

if (!firebase.apps.length) {
         firebase.initializeApp(firebaseConfig);
}