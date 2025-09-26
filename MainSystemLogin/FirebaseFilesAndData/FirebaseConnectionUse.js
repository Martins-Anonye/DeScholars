//var firebase = require('firebase');
// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, onValue, onChildAdded, onChildChanged, onChildRemoved, set, child, get } = require("firebase/database");

//import { getAnalytics } from "firebase/analytics";
//import { getAnalytics } from "firebase/analytics"
//const { getAnalytics } = require("firebase/analytics");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCaCJp94_nB55LwpyDuXBXk9pDuvTF0gxY",
  authDomain: "pendroai-jamb-manager.firebaseapp.com",
  projectId: "pendroai-jamb-manager",
  storageBucket: "pendroai-jamb-manager.firebasestorage.app",
  messagingSenderId: "21241584357",
  appId: "1:21241584357:web:67ba1fff17f836ef59d20c",
  measurementId: "G-KWEGG3J7CD"
};
const app = initializeApp(firebaseConfig);
// Get a reference to the database service


function checkFirebaseIsConnected() {
    const database = getDatabase(app);

    const reef = ref(database);
    const usersRef = child(reef, '.info/connected');

    onValue(usersRef, function (snap) {
        if (snap.val() === true) {
            con = true;
            console.log("firebase is connected");
        } else {
            con = false;
            console.log("firebase not connected");

        }
    });

    /* 
    
        const usersReff = child(reef, 'users/SupportedMedial');
        // Retrieve new posts as they are added to our database
        onValue(usersReff, (snapshot) => {
            console.log("Testing Firebase");
            //const newPost = snapshot.val();
            if (snapshot.exists()) {
    
                var objectOfDataAccessibleByKey = {}; //object
                snapshot.forEach(snapshot2 => {
    
                    objectOfDataAccessibleByKey[snapshot2.key] = snapshot2.val();
    
                    console.log("snapshot2 value : " + snapshot2.val());
                    console.log("snapshot2 Key : " + snapshot2.key);
    
    
                });
            }
        });
     */
}


module.exports = { app, initializeApp, firebaseConfig, checkFirebaseIsConnected };
