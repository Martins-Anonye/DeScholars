




import{initializeApp} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js"; 
import {getDatabase, ref, onValue, set, get,child,update,remove,push} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

import {checkEmailUserAccountExist} from "./checkdatabaseForEmail/orderByEmailCheckup.js"


var name = document.getElementById("name");
var nickName = document.getElementById("nickName");
var email = document.getElementById("email");
var dateOfBirth = document.getElementById("dateOfBirth");
var stateOfOrigin = document.getElementById("stateOfOrigin");
var stateOfResident = document.getElementById("stateOfResident");
var residentAddress = document.getElementById("residentAddress");
var mainTel = document.getElementById("mainTel");
var altTel = document.getElementById("altTel");
var TheScholarsQuestion = document.getElementById("TheScholarsQuestion");
var educationQuelification = document.getElementById("educationQuelification");
var courseOfStudy = document.getElementById("courseOfStudy");
var passport = document.getElementById("passport");
var submit = document.getElementById("submit");



var errorUnit = document.getElementById("errorUnit");
submit.addEventListener("click", e=>{


    
// name
// nickName
// email
// dateOfBirth
// stateOfOrigin
// stateOfResident
// residentAddress
// submit
// mainTel
// altTel
// TheScholarsQuestion
// educationQuelification
// courseOfStudy
// passport
(async()=>{



         var doesEmailExist =   await checkEmailUserAccountExist("UserParticipantForm",email.value);
                
 
          if(doesEmailExist == true){
            errorUnit.innerText=`User detail already Exist in the server.`;
            }
            else{
          
            
                  

                    uploader("passport","progresscounter", season).then(e=>{

                        //alert(e);
                    
                        var passporturl = e;

                        insertDataToFirebase(name,nickName,email,dateOfBirth,stateOfOrigin,
                        stateOfResident, residentAddress,mainTel,altTel,TheScholarsQuestion,educationQuelification,
                        courseOfStudy,passporturl).then(data=>{
                                alert("Data Save Succesffuly");
                        }).catch(e=>{
                                alert("Database : "+e);
                        });
                    
                    }).catch(e=>{
                        alert("file Upload : "+e);

                    }); // end of uploader
                    
            }



})();// end of async

});// end of button click






//firebase.initializeApp(configuration());
//const db = firebase.database();


var app =  initializeApp(configuration());
const db = getDatabase(app);

function insertDataToFirebase(name,nickName,email,dateOfBirth,stateOfOrigin,
stateOfResident, residentAddress,mainTel,altTel,TheScholarsQuestion,educationQuelification,
courseOfStudy,passporturl){


    var promise  = new Promise((resolve,reject)=>{


        
    var timestamp = Date.now();



const database = getDatabase(app);

// Reference to your database path
const dataRef = ref(database, 'UserParticipantForm');
// Use push() to generate a new unique key and get a reference to that new location
const newPostRef = push(dataRef);

// Get the unique push ID (the key) from the new reference
const pushId = newPostRef.key;


set(newPostRef,
          {
            name: name.value,
            nickName:nickName.value,
            email:email.value,
            dateOfBirth:dateOfBirth.value,
            stateOfOrigin: stateOfOrigin.value,
            stateOfResident: stateOfResident.value,
            residentAddress: residentAddress.value,
            mainTel : mainTel.value,
            altTel:altTel.value,
            TheScholarsQuestion:TheScholarsQuestion.value,
            educationQuelification:educationQuelification.value,
            courseOfStudy:courseOfStudy.value,
            passport:passport.value,
            photo1:1,
            photo2:2,
            photo3:3,
            likes:0,
            pushId:pushId,
            passporturl:passporturl,
            timestamp:timestamp           
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



