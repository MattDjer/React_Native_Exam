// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlO9g-z87u34DcKesUQmUJ81HqYsUXRqY",
  authDomain: "react-native-firebase-27cc0.firebaseapp.com",
  databaseURL: "https://react-native-firebase-27cc0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-native-firebase-27cc0",
  storageBucket: "react-native-firebase-27cc0.appspot.com",
  messagingSenderId: "1070340936146",
  appId: "1:1070340936146:web:dac3d013a91f231b18b80b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;