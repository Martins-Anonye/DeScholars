

import{initializeApp} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js"; 
import {getDatabase, ref, onValue, set, get,child,update,remove,push} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";


var app =  initializeApp(configuration());
const db = getDatabase(app);


  

var adminSettingsBtn =  document.getElementById("adminSettingsBtn");
var approadEntery12345 =  document.getElementById("approadEntery12345");
adminSettingsBtn.addEventListener("click",e=>{


    
if(approadEntery12345.value == maintainanceSetting.adminLevelSettingPassword && maintainanceSetting.enableAdminLevelSettings == true ){
   insertSettingsToFirebase().then(e=>{
alert(e)
}).catch(e=>{
alert(e)

}); 

}
else if(maintainanceSetting.enableAdminLevelSettings == false){
    alert("Contact Developer to enebale this instruction \n base on Instruction from Super Admin (Owner)");
}
else if(approadEntery12345.value != maintainanceSetting.adminLevelSettingPassword){
    alert("password Insert is wrong");
}else{
    alert("check entry and try again");
 
}

});


    

var  myPreviousLevel  = document.getElementById("spreviousLevel");
var  myCurrentLevel  = document.getElementById("scurrentLevel");

var  myNextLevel  = document.getElementById("snextLevel");

var myNextLevelIslastLevel =  document.getElementById("snextLevelIslastLevel");
var mytimestamp =  document.getElementById("timestamp");

function insertSettingsToFirebase(){




    var promise  = new Promise((resolve,reject)=>{


        
    var timestamp = Date.now();



const database = getDatabase(app);

// Reference to your database path
const dataRef = ref(database, 'AdminLevelSettings');
// Use push() to generate a new unique key and get a reference to that new location
//const newPostRef = push(dataRef);

// Get the unique push ID (the key) from the new reference
//const pushId = newPostRef.key;

var  previousLevel = myPreviousLevel.value;
var currentLevel= myCurrentLevel.value;
var nextLevel = myNextLevel.value;
var nextLevelIslastLevel = myNextLevelIslastLevel.value;





set(dataRef,
          {
             previousLevel:previousLevel,   
              currentLevel :currentLevel,
              nextLevel: nextLevel,
              nextLevelIslastLevel:nextLevelIslastLevel,
              timestamp:timestamp             
          }
         
      ) .then(() => {
        var info  = "Data written successfully!";
       // console.log(info);
        // alert(info);
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




getExistingSettingsValueForOptions();
function getExistingSettingsValueForOptions(){
    
    const database = getDatabase(app);
    
        
    
    const messagesRef = ref(database, 'AdminLevelSettings'); // Reference to the 'messages' path
    
    
get(messagesRef).then((snapshot) => {
  if (snapshot.exists()) {
   
   console.log("Current ExistingSettingsValueForOptions:", snapshot.val());
  const data = snapshot.val(); // Get the data as a JavaScript object


 myPreviousLevel.value = data.previousLevel;
 myCurrentLevel.value= data.currentLevel;
myNextLevel.value = data.nextLevel;
myNextLevelIslastLevel.value= data.nextLevelIslastLevel;

const date = new Date(data.timestamp);
const formattedDate = date.toISOString().split('T')[0];
//console.log(formattedDate); // Outputs: yyyy-mm-dd

mytimestamp.value =formattedDate ;



} else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

}


