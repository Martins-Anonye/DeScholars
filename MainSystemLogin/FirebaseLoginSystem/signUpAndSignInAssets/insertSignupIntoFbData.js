
// <script src="https://www.gstatic.com/firebasejs/x.x.x/firebase-app-compat.js"></script>

//     <!-- TODO: Add SDKs for Firebase products that you want to use -->
//     <!-- https://firebase.google.com/docs/web/setup#available-libraries -->
//     <script src="https://www.gstatic.com/firebasejs/x.x.x/firebase-database-compat.js"></script>



import{initializeApp} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js"; 
import {getDatabase, ref, onValue, set, get,child,update,remove,push} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";


//firebase.initializeApp(configuration());
//const db = firebase.database();


var app =  initializeApp(configuration());
const db = getDatabase(app);
function insertDataToFirebase(email,Password,emailVerified,photoURL,authSourceActCreated){


    var promise  = new Promise((resolve,reject)=>{


        
    var timestamp = Date.now();



const database = getDatabase(app);

// Reference to your database path
const dataRef = ref(database, 'UsersAccount/');
// Use push() to generate a new unique key and get a reference to that new location
const newPostRef = push(dataRef);

// Get the unique push ID (the key) from the new reference
const pushId = newPostRef.key;


set(newPostRef,
          {
            email: email,
            Password:Password,
            timestamp:timestamp,
            pushId:pushId,
            emailVerified:emailVerified,
            profilePhoto:photoURL,
            authSourceActCreated:authSourceActCreated

          }
      ) .then(() => {
        var info  = "Data written successfully!";
        console.log(info);

        return resolve(info);
    })
    .catch((error) => {

        var info  = "Error writing data: "+error;
        console.log(info);

        return reject(info);
    });


 

});


return promise;
}


// onValue(f1, (snapshot) => {
//     const data = snapshot.val();
//   });
export{insertDataToFirebase}