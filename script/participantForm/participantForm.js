




import{initializeApp} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js"; 
import {getDatabase, ref, onValue, set, get,child,update,remove,push} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

import {checkEmailUserAccountExist} from "../checkdatabaseForEmail/orderByEmailCheckup.js"
import {checkEmailUserAccountData} from "../checkdatabaseForEmail/orderByEmailCheckupUserData.js"



var name = document.getElementById("name");
var nickName = document.getElementById("nickName");
var email = document.getElementById("email");
var dateOfBirth = document.getElementById("dateOfBirth");
var stateOfOrigin = document.getElementById("stateOfOrigin");
var stateOfResident = document.getElementById("stateOfResident");
var residentAddress = document.getElementById("residentAddress");
var mainTel = document.getElementById("mainTel");
var altTel = document.getElementById("altTel");
var questions6 = document.getElementById("questions6");
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

         var usersAccountForParmentRecord =   await checkEmailUserAccountData("UsersAccount",email.value);

                 var localEmailVerificantioHolder = new LocalEmailVerificantioHolder();

                            var emailLogin =  localEmailVerificantioHolder.getEmail();

                           
 
         var questions1 = document.getElementById("questions1").value;
            var questions2 = document.getElementById("questions2").value;
            var questions3 = document.getElementById("questions3").value;
            var questions4 = document.getElementById("questions4").value;
            var questions5 = document.getElementById("questions5").value;
            // question 6 is on required state

             if(emailLogin == null || emailLogin == "undefined"){
               alert("Login and try again") ;
              }
               else if(usersAccountForParmentRecord == false ){
               alert("Login, Make Payment and Try again") ;

              }

              else if(usersAccountForParmentRecord == null || usersAccountForParmentRecord == "undefined"){
               alert("Payment Server Error !! Check network and Try again, or contact admin ") ;

              }
              else if(usersAccountForParmentRecord != null && usersAccountForParmentRecord.hasPaid == false){
                alert("Make Registration Payment and try again.") ;
              }
           else if(questions1 == "" || questions1 == "undefined" || questions1== null){
               alert("Answer to First question is not valid");
            }
             else if(questions2 == "" || questions2 == "undefined" || questions2== null){
               alert("Answer to Second question is not valid");
            }

             else if(questions3 == "" || questions3 == "undefined" || questions3== null){
               alert("Answer to Third question is not valid");
            }


             else if(questions4 == "" || questions4 == "undefined" || questions4== null){
               alert("Answer to Forth question is not valid");
            }

             else if(questions5 == "" || questions5 == "undefined" || questions5 == null){
               alert("Answer to Fifth question is not valid");
            }


          else if(doesEmailExist == true){
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
                        stateOfResident, residentAddress,mainTel,altTel,
                        questions1,questions2,questions3,questions4,questions5,
                        questions6,educationQuelification,
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
stateOfResident, residentAddress,mainTel,altTel,
  questions1,questions2,questions3,questions4,questions5,
questions6,educationQuelification,
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
             questions1:questions1.value,
            questions1:questions1.value,
            questions2:questions2.value,
            questions3:questions3.value,
            questions4:questions4.value,
            questions5:questions5.value,
            questions6:questions6.value,
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



