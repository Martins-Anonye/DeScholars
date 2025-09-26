import{initializeApp} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js"; 
import {getDatabase, ref, onValue, set, get,child,update,remove,push} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";


var app =  initializeApp(configuration());

var fpreviousLevel = document.getElementById("fpreviousLevel");
var fcurrentLevel =  document.getElementById("fcurrentLevel");
var fnextLevel = document.getElementById("fnextLevel");
var fnextLevelIsLast = document.getElementById("fnextLevelIsLast");
  
var mytimestamp =  document.getElementById("timestamp");





getResultMaker();

function getResultMaker(){
const database = getDatabase(app);

    

const messagesRef = ref(database, 'AdminLevelSettings'); // Reference to the 'messages' path





(async()=>{

await onValue(messagesRef, (snapshot) => {
  const messagesData = snapshot.val(); // Get the data as a JavaScript object
  console.log("Current messages:", messagesData);

 fpreviousLevel.innerText = messagesData.previousLevel;
  fcurrentLevel.innerText = messagesData.currentLevel;
  fnextLevel.innerText = messagesData.nextLevel;
  fnextLevelIsLast.innerText = messagesData.nextLevelIslastLevel;
  
const date = new Date(messagesData.timestamp);
const formattedDate = date.toISOString().split('T')[0];
//console.log(formattedDate); // Outputs: yyyy-mm-dd

mytimestamp.value =formattedDate ;
 
   // You can then process and display this data in your application
});




})();








// To stop listening for updates, you can store the unsubscribe function returned by onValue:
// const unsubscribe = onValue(messagesRef, (snapshot) => { /* ... */ });
// unsubscribe(); // Call this when you no longer need real-time updates


}