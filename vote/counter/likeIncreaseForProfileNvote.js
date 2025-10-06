


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

function executeLikeForVOTE(pushId, guiCounterIDReporter){

    const postStarCountRef = ref(database, `NominationList/${pushId}/votelikes`);

runTransaction(postStarCountRef, (currentStarCount) => {
    if (currentStarCount === null) {
        return 1; // Initialize if no data exists
    }
    return (currentStarCount + 1); // Increment the star count
}).then((result) => {
    if (result.committed) {
        console.log("VOTE LIKE, Transaction committed successfully. New star count:", result.snapshot.val());
        var guiCounterIDReporterSpan = document.getElementById(guiCounterIDReporter);
        if(guiCounterIDReporterSpan != null){
            guiCounterIDReporterSpan.innerText=result.snapshot.val();
        }
    } else {
        console.log("VOTE LIKE, Transaction not committed (aborted or failed).");
    }
}).catch((error) => {
    console.error("VOTE LIKE, Transaction failed:", error);
});
}




function executeLikeForProfile(pushId){

    const postStarCountRef = ref(database, `NominationList/${pushId}/votelikes`);

runTransaction(postStarCountRef, (currentStarCount) => {
    if (currentStarCount === null) {
        return 1; // Initialize if no data exists
    }
    return currentStarCount + 1; // Increment the star count
}).then((result) => {
    if (result.committed) {
        var rst = "Profile LIKE, Transaction committed successfully. New star count:"+result.snapshot.val();
        console.log(rst);
        alert(rst);
    } else {

        var rst = "Profile LIKE, Transaction not committed (aborted or failed).";
        console.log(rst);
        alert(rst);
    }
}).catch((error) => {
    var rst  = "Profile LIKE, Transaction failed:"+error;
    console.error(rst);
    alert(rst);
});
}





export{executeLikeForVOTE, executeLikeForProfile};