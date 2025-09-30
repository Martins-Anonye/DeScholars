
import {checkEmailUserAccountData} from "./checkdatabaseForEmail/orderByEmailCheckupUserData.js"



var checkStatus = document.getElementById("checkStatus");
checkStatus.addEventListener("click",e=>{

    var searchEmail = document.getElementById("searchEmail");

    if(searchEmail.value != null){



    }



 

        
(async()=>{



         var userData =   await checkEmailUserAccountData("UserParticipantForm",searchEmail.value);
                


 
           if(userData != false){

    //    Object.entries(userDataa).forEach(key=>{

        //  var userData =  userDataa[userDataa];
         //   console.log(key)

   

       
   
var name = userData.name;
 document.getElementById("name").value =name;
var nickName = userData.nickName;
 document.getElementById("nickName").value =nickName;

var email = userData.email;
 document.getElementById("email").value =email;

var dateOfBirth = userData.stateOfOrigin;
 document.getElementById("dateOfBirth").value =dateOfBirth;

var stateOfOrigin = userData.stateOfOrigin;
 document.getElementById("stateOfOrigin").value =stateOfOrigin;

var  stateOfResident = userData.stateOfResident;
 document.getElementById("stateOfResident").value =stateOfResident;

var residentAddress =userData.residentAddress;
 document.getElementById("email").value =residentAddress;
var mainTel = userData.mainTel;
 document.getElementById("mainTel").value =mainTel;

var altTel = userData.altTel;
 document.getElementById("altTel").value =altTel;

var TheScholarsQuestion = userData.TheScholarsQuestion;
 document.getElementById("TheScholarsQuestion").value =TheScholarsQuestion;

var educationQuelification = userData.educationQuelification;
 document.getElementById("educationQuelification").value =educationQuelification;

var courseOfStudy = userData.courseOfStudy;
 document.getElementById("courseOfStudy").value =courseOfStudy;

 var passport = userData.passport;
  document.getElementById("passport1").src =passport;

       


   
  
getUserLevelStatus();

     }//end of if

})();




});// end of event listener




async function getUserLevelStatus(){

        try {
           
          var nominationList =   await checkEmailUserAccountData("NominationList",searchEmail.value);
          if(nominationList != false){
            var currentlevel  = nominationList.currentLevel;
            var nominationlist = nominationList.vote;
            document.getElementById("userCurentStatus").innerText =currentlevel;
            document.getElementById("numberOfVote").innerText = nominationlist;
          }
          
        
        }
        catch(e){
          alert(e);
        }
              


           

}