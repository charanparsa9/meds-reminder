// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/auth';
import Constants from 'expo-constants';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuESLs9a5nEiEU5dt5F9BDZkUeJ_WqIqA",
authDomain: "meds-alarm.firebaseapp.com",
projectId: "meds-alarm",
storageBucket: "meds-alarm.appspot.com",
databaseURL: "https://meds-alarm-default-rtdb.firebaseio.com/",
messagingSenderId: "712484480583",
appId: "1:712484480583:web:f2e1af3178beec82407362",
measurementId: "G-2QBE5TLBRP"

};


 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
