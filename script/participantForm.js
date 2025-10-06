




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
var hearUsFrom  = document.getElementById("hearUsFrom");


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
          
            
                  

                    // uploader("passport","progresscounter", season).then(e=>{

                    //     //alert(e);
                    
                    //     var passporturl = e;

                    //     insertDataToFirebase(name,nickName,email,dateOfBirth,stateOfOrigin,
                    //     stateOfResident, residentAddress,mainTel,altTel,TheScholarsQuestion,educationQuelification,
                    //     courseOfStudy,passporturl).then(data=>{
                    //             alert("Data Save Succesffuly");
                    //     }).catch(e=>{
                    //             alert("Database : "+e);
                    //     });
                    
                    // }).catch(e=>{
                    //     alert("file Upload : "+e);

                    // }); // end of uploader
                    var year =  maintainanceSetting.year;
                    var season  = maintainanceSetting.season;

                    try{
                    var passporturl1 =  await uploader("passport","progresscounter",year, season,1);
                    var passporturl2 =  await uploader("passport2","progresscounter",year, season,2);
                    var passporturl3 =  await uploader("passport3","progresscounter",year, season,3);
                    var passporturl4 =  await uploader("passport4","progresscounter",year, season,4);
                    var passporturl5 =  await uploader("passport5","progresscounter",year, season,5);

                     insertDataToFirebase(name,nickName,email,dateOfBirth,stateOfOrigin,
                        stateOfResident, residentAddress,mainTel,altTel,TheScholarsQuestion,educationQuelification,
                        courseOfStudy,passporturl1,passporturl2,passporturl3,passporturl4,passporturl5).then(data=>{
                                alert("Data Save Succesffuly");
                        }).catch(e=>{
                                alert("Database : "+e);
                        });

                    }catch(e){
                    
                        alert("file Upload : "+e);

                    }

                   


                    
            }



})();// end of async

});// end of button click






//firebase.initializeApp(configuration());
//const db = firebase.database();


var app =  initializeApp(configuration());
const db = getDatabase(app);

function insertDataToFirebase(name,nickName,email,dateOfBirth,stateOfOrigin,
stateOfResident, residentAddress,mainTel,altTel,TheScholarsQuestion,educationQuelification,
courseOfStudy,passporturl1, passporturl2,passporturl3, passporturl4,passporturl5){


    var promise  = new Promise((resolve,reject)=>{


        
    var timestamp = Date.now();



const database = getDatabase(app);

// Reference to your database path
const dataRef = ref(database, 'UserParticipantForm');
// Use push() to generate a new unique key and get a reference to that new location
const newPostRef = push(dataRef);

// Get the unique push ID (the key) from the new reference
const pushId = newPostRef.key;


    var domainParticipantProfileURL = maintainanceSetting.domainLink+"?participantUrlLink=yes&pushId="+pushId+"&timestamp="+timestamp+"&email="+email;

    
set(newPostRef,
          {
            name: name.value,
            nickName:nickName.value,
            email:email.value,
            dateOfBirth:dateOfBirth.value,
            // stateOfOrigin: stateOfOrigin.value,
            stateOfResident: stateOfResident.value,
            residentAddress: residentAddress.value,
            hearUsFrom: hearUsFrom.value,
            mainTel : mainTel.value,
            altTel:altTel.value,
            TheScholarsQuestion:TheScholarsQuestion.value,
            educationQuelification:educationQuelification.value,
            courseOfStudy:courseOfStudy.value,
            passporturl1:passporturl1,
            passporturl2:passporturl2,
            passporturl3:passporturl3,
            passporturl4:passporturl4,
            passporturl5:passporturl5,
            likes:0,
            pushId:pushId,
            timestamp:timestamp,
            participantUrlLink:  domainParticipantProfileURL        
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



