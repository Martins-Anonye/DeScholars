// Import the Firebase App and Realtime Database modules from CDN
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase, ref, runTransaction } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(configuration());
const database = getDatabase(app);

// Example of a transaction
const postStarCountRef = ref(database, 'posts/post1/starCount');


function VoteCounter(amountToIncrease){
    runTransaction(postStarCountRef, (currentStarCount) => {
        if (currentStarCount === null) {
            return (1+amountToIncrease); // Initialize if no data exists
        }
        return currentStarCount + amountToIncrease; // Increment the star count
    }).then((result) => {
        if (result.committed) {
            console.log("Transaction committed successfully. New star count:", result.snapshot.val());
        } else {
            console.log("Transaction not committed (aborted or failed).");
        }
    }).catch((error) => {
        console.error("Transaction failed:", error);
    });
}


export{VoteCounter}