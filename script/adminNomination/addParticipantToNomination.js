


import{initializeApp} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js"; 
import {getDatabase, ref, onValue, set, get,child,update,remove,push} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

import {checkEmailUserAccountData} from "../checkdatabaseForEmail/orderByEmailCheckupUserData.js"



var app =  initializeApp(configuration());
const db = getDatabase(app);




var searchEmail = document.getElementById("searchEmail");
var LevelSelection = document.getElementById("LevelSelection");
var errorUnit =  document.getElementById("errorUnit");

var checkStatus = document.getElementById("checkStatus");

var movenow = document.getElementById("movenow");

movenow.addEventListener("click",e=>{
errorUnit.innerText="";
    (async()=>{

           //  var doesEmailExist =  await checkEmailUserAccountExist("UserParticipantForm",searchEmail.value);
  
           var doesUserDataExist =  await checkEmailUserAccountData("UserParticipantForm",searchEmail.value);

            if(doesUserDataExist != false){
            

                 if(LevelSelection.value =="0" ){

                       var doesEmailExistInNorminationList =  await checkEmailUserAccountData("NominationList",searchEmail.value);

                            if(doesEmailExistInNorminationList != false){
                                var pushId =  doesEmailExistInNorminationList.pushId;
                                   deleteUserFromNominatedList(pushId).then(e=>{
                                     checkStatus.click();// we recheck for update
                                        alert(e);
                                   }).catch(e=>{
                                        alert(e);
                                    });
                            }else{

                                errorUnit.innerText=`User account does not exist in the nomination list.`;
        
                            }
                    }
                else if(LevelSelection.value=="1"){

                     var doesEmailExistInNorminationList =  await checkEmailUserAccountData("NominationList",searchEmail.value);

                     var passport = doesUserDataExist.passporturl1;
                     var NameAndNickName =  doesUserDataExist.name+"/"+ doesUserDataExist.nickName;
                     var participantUrlLinkForVoteCopy =  doesUserDataExist.participantUrlLink;
                     var votelikes = doesUserDataExist.likes;
                     if(doesEmailExistInNorminationList == false){
                          addParticipantToNominationlistFirebase(passport,NameAndNickName,votelikes,participantUrlLinkForVoteCopy).then(e=>{
                             checkStatus.click();// we recheck for update
                            alert(e);
                            }).catch(e=>{
                            alert(e)

                            });
                     }else{

                    errorUnit.innerText=`User already Exist in Nomination List in the server.`;


                     }
                         
                      

                    }
                    else if(LevelSelection.value !="0" || LevelSelection.value !="1"){ // that is not  to reg and not to next
                          
                    var doesEmailExistInNorminationList =  await checkEmailUserAccountData("NominationList",searchEmail.value);


                            if(doesEmailExistInNorminationList != false){

                                    var pushId =  doesEmailExistInNorminationList.pushId;

                                // alert(pushId);
                                    updateParticipantToNominationlistFirebase(LevelSelection.value,pushId).then(e=>{
                                     checkStatus.click();// we recheck for update
                                        alert(e);
                                    }).catch(e=>{
                                    alert(e);

                                    });
                            }else{

                                errorUnit.innerText=`User account does not exist in the nomination list.`;
        
                            }
                        

                    }
                   
            }
            else{
            
              errorUnit.innerText=`User Does not Exist in the server.`;

            }

                   

    })();



   



});






function addParticipantToNominationlistFirebase(profileUrlPics,NameAndNickName,votelikes,participantUrlLinkForVoteCopy){

//var fpreviousLevel = document.getElementById("fpreviousLevel");
// var fcurrentLevel =  document.getElementById("fcurrentLevel");
// var fnextLevel = document.getElementById("fnextLevel");
// var fnextLevelIsLast = document.getElementById("fnextLevelIsLast");
  



    var promise  = new Promise((resolve,reject)=>{


        



const database = getDatabase(app);

// Reference to your database path
const dataRef = ref(database, 'NominationList');
// Use push() to generate a new unique key and get a reference to that new location
//const newPostRef = push(dataRef);

// Get the unique push ID (the key) from the new reference
//const pushId = newPostRef.key;

//var  previousLevel = fpreviousLevel.innerText;
//var currentLevel= fcurrentLevel.innerText;


//var nextLevel = fnextLevel.innerText;
//var nextLevelIslastLevel = fnextLevelIsLast.innerText;
var email = searchEmail.value;


// Use push() to generate a new unique key and get a reference to that new location
const newPostRef = push(dataRef);

// Get the unique push ID (the key) from the new reference
const pushId = newPostRef.key;
  
// candidate id formation
     var timestamp = Date.now();
    var date =  new Date(timestamp);
        var candidateID  = maintainanceSetting.year+maintainanceSetting.season+date.getMonth()+date.getDay()+date.getSeconds();
          


    var domainVoteURL = maintainanceSetting.domainLink+"?voteLink=yes&pushId="+pushId+"&candidateID="+candidateID;

        set(newPostRef,
                {
                    nameAndNickName:NameAndNickName,
                    email:email,
                    currentLevel :1,
                    pushId:pushId, 
                    candidateID:candidateID,
                    userAccountProfilePicsUrl:profileUrlPics,
                    vote:0,
                    participantUrlLinkForVoteCopy:participantUrlLinkForVoteCopy,
                    votelikes:votelikes,
                    voteLink: domainVoteURL     
                }
                
            ) .then(() => {
                var info  = "Data written successfully!";
            // console.log(info);
                // alert(info);
                return resolve(info);
            }).catch((error) => {

                var info  = "Error writing data: "+error;
                console.log(info);

                return reject(info);
            });





    });


    return promise;

}














function updateParticipantToNominationlistFirebase(levelSelector, pushID){

//var fpreviousLevel = document.getElementById("fpreviousLevel");
var fcurrentLevel =  document.getElementById("fcurrentLevel");
var fnextLevel = document.getElementById("fnextLevel");
var fnextLevelIsLast = document.getElementById("fnextLevelIsLast");
  




    var promise  = new Promise((resolve,reject)=>{


        
    var timestamp = Date.now();



const database = getDatabase(app);



// Get the unique push ID (the key) from the new reference
//const pushId = newPostRef.key;

//var  previousLevel = fpreviousLevel.innerText;
var currentLevel= fcurrentLevel.innerText;

if(levelSelector == "2"){
   currentLevel = fnextLevel.innerText;

}
else if(levelSelector == "3"){
        currentLevel = fcurrentLevel.innerText;



}
else if(levelSelector == "4"){
    currentLevel = fpreviousLevel.innerText;


}



// Reference to your database path
const dataRef = ref(database, 'NominationList/'+pushID+"/currentLevel");
// Use push() to generate a new unique key and get a reference to that new location
//const newPostRef = push(dataRef);


//var nextLevel = fnextLevel.innerText;
//var nextLevelIslastLevel = fnextLevelIsLast.innerText;
var email = searchEmail.value;


// Get the unique push ID (the key) from the new reference
    var timestamp = Date.now();


set(dataRef, currentLevel) .then(() => {
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


function deleteUserFromNominatedList(pushID){

    

    var promise  = new Promise((resolve,reject)=>{


   
    
const database = getDatabase(app);
const dataRef = ref(database, 'NominationList/'+pushID);

set(dataRef, null) .then(() => {
        var info  = "Data Deleted successfully!";
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




