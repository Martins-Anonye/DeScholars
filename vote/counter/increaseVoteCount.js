// Import the Firebase App and Realtime Database modules from CDN
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase, ref, runTransaction } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

// // Your Firebase configuration
// const firebaseConfig = {
//     apiKey: "YOUR_API_KEY",
//     authDomain: "YOUR_AUTH_DOMAIN",
//     projectId: "YOUR_PROJECT_ID",
//     storageBucket: "YOUR_STORAGE_BUCKET",
//     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//     appId: "YOUR_APP_ID"
// };

// Initialize Firebase
const app = initializeApp(configuration());
const database = getDatabase(app);

// Example of a transaction


function VoteCounter(amountToIncrease,pushId,guiCounterIDReporter){
    const postStarCountRef = ref(database, `NominationList/${pushId}/vote`);

    runTransaction(postStarCountRef, (currentStarCount) => {
        if (currentStarCount === null) {

            var num =  amountToIncrease*1;
            var tt =(1+num);
            return (tt); // Initialize if no data exists
        }
        currentStarCount = currentStarCount*1;
        var num =  amountToIncrease*1;

        var tt = currentStarCount+ num;
        return tt; // Increment the star count
    }).then((result) => {
        if (result.committed) {
            var rst = "Vote Transaction committed successfully. New star count: "+ result.snapshot.val();
            console.log(rst);
            var guiCounterIDReporterSpan = document.getElementById(guiCounterIDReporter);
            if(guiCounterIDReporterSpan != null){
                guiCounterIDReporterSpan.innerText=result.snapshot.val();
            }
            alert(rst);
        } else {
            var rst = "Vote Transaction committed successfully. New star count: "+ result.snapshot.val();
            console.log("Transaction not committed (aborted or failed).");
            alert(rst);
        }
    }).catch((error) => {
        var rst=  "Transaction failed: "+error;
        console.error();

        alert(rst);

    });
}


export{VoteCounter}