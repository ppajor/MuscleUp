import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyCiJtqqYT1wGRLQqczAFlyLNyGx1iVEmkg",
  authDomain: "muscle-up-f3868.firebaseapp.com",
  databaseURL:
    "https://muscle-up-f3868-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "muscle-up-f3868",
  storageBucket: "muscle-up-f3868.appspot.com",
  messagingSenderId: "456515685029",
  appId: "1:456515685029:web:275ce8be33d9de17ab9b4c",
  measurementId: "G-048Y5204QL",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
