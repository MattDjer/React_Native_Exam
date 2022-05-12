import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyAZUT85tuq5SVz4RM1sr3G_7cG4Qipyceg",
    authDomain: "react-exam-project.firebaseapp.com",
    databaseURL: "https://react-exam-project-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "react-exam-project",
    storageBucket: "react-exam-project.appspot.com",
    messagingSenderId: "906804188085",
    appId: "1:906804188085:web:aa9ef74aa1af4a254fbffc",
    measurementId: "G-2BK11Q7S2T"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebase