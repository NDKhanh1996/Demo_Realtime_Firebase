import firebase from "firebase/compat/app";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCnAh8lLCLeDINiT0fmRAXGWXyiwgzjuA0",
    authDomain: "fir-realtime-9a7c9.firebaseapp.com",
    projectId: "fir-realtime-9a7c9",
    storageBucket: "fir-realtime-9a7c9.appspot.com",
    messagingSenderId: "939214572634",
    appId: "1:939214572634:web:4d4a555c2944ca146a5c63",
    databaseURL: "https://fir-realtime-9a7c9-default-rtdb.asia-southeast1.firebasedatabase.app"
};

if (firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
}

export const db = getDatabase();