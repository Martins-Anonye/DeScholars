

import{initializeApp} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js"; 
import {getDatabase, ref, onValue, set, get,child,update,remove,push,query, orderByChild,equalTo} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

import {checkEmailUserAccountData} from "./checkdatabaseForEmail/orderByEmailCheckupUserData.js"



var app =  initializeApp(configuration());
const db = getDatabase(app);

// import {saveSessionAndLogin} from "../../FirebaseLoginSystem/signUpAndSignInAssets/saveSessionAndLogin.js";

var SpecialLoader = "SpecialLoader";

getListOfApplicant().then(e=>{
  if(e == true){
      alert("Loaded Completly");
  } 
  else{
    alert("Does not exist");
  }

}).catch(e=>{
  alert(e);
});


function getListOfApplicant(){

    const myRef = ref(db, 'NominationList');

    var promise = new Promise((resplve, reject )=>{


   
    get(myRef).then((snapshot) => {
         var data="";
      if (snapshot.exists()) {
    
    snapshot.forEach(function(userDat, indexCount) {
      var userData = userDat.val();


 
                  //  voteLink: domainVoteURL     


          var email = userData.email;
          var currentLevel = userData.currentLevel;


          var timestamp = userData.timestamp;
          var date =  new Date(timestamp);
                var mdate = date.getFullYear()+"_"+date.getMonth()+"_"+date.getDay();

          var userAccountProfilePicsUrl = userData.userAccountProfilePicsUrl;

          var vote = userData.vote;
          var votelikes = userData.votelikes;

         var  candidatID = userData.candidateID;
                      
                
             data += `
                  
                   <div  class="card">

                   <table style="width:300px">
            <div id="div1">
               <img src="${userAccountProfilePicsUrl}" width="100%"; height="100%";>
            </div>
            <br>
            <tr>
              <td>
                  <label>
                    Email
                  </label>
              </td>
              <td>
                <span>${email} </span>
              </td>
            </tr>

            <tr style="color:blue">
              <td>
                  <label>
                  candidate ID
                  </label>
              </td>
              <td>
                <span>${candidatID} </span>
              </td>
            </tr>
            <tr style="color:blue">
            <td>
                <label>current Level</label>
            </td>

            <td>
               <span>${currentLevel}</span>
            </td>
            </tr>
            


              <tr>
            <td>
                <label>First Time Added</label>
            </td>

            <td>
               <span>${mdate}</span>
            </td>
            </tr>
            



               <tr style="color:blue">
            <td>
               <label>vote:</label>
            </td>

            <td>
             <span>${vote}</span>
            </td>
            </tr>
             
            <tr style="color:blue">
            <td>
               <label>Likes On Vote Level:</label>
            </td>

            <td>
             <span>${votelikes}</span>
            </td>
            </tr>
             

             <tr>
            <td colspan="2">
              <h3> Manage Applicant </h3> <br>

             <a href="participantApcantStatusAdmin.html?email=${email}"><button>Manage</button> </a> &nbsp;&nbsp;
              <button id="inforBTN${indexCount}" ${moreInfor("inforBTN"+indexCount,email)}>More Info</button>   
        


            </td>

            </tr>
             



             <tr>
            <td colspan="2">
            
               <hr/>
            </td>

            </tr>
        
            
          </table>
            
           </div>
         
                  `;
                  
                  
                  });
                  document.getElementById("cardcon").innerHTML = data;


                  var SpecialLoaderEvent = new Event(SpecialLoader);
                  document.dispatchEvent(SpecialLoaderEvent);
                   return true;

      } else {
        return false;
        }
    }).catch((error) => {
      console.error(error);
    });


});

return promise;



}






function moreInfor(idData, email){

document.addEventListener(SpecialLoader, e=>{



        var btn =  document.getElementById(idData);

          btn.addEventListener("click", e=>{


            e.preventDefault();


 var gallaryDisplayShow =  document.getElementById("gallaryDisplayShow");

            var gallaryShow =  document.getElementById("gallaryShow");
                       
            (async()=>{


  
            var userData =   await checkEmailUserAccountData("UserParticipantForm",email);
            
            if(userData == false){
              alert("Value not found !!!");
            }

              var style = "display:inline-block";

              var images = `<img src="${userData.passporturl1}" width="200px"  height="150px" ${style} /> &nbsp &nbsp 
              <img src="${userData.passporturl2}" width="200px"  height="150px"  ${style}   /> &nbsp &nbsp 
              

              <img src="${userData.passporturl3}" width="200px"  height="150px" ${style}  /> &nbsp &nbsp 
              <img src="${userData.passporturl4}" width="200px"  height="150px" ${style}   /> &nbsp &nbsp 
              <img src="${userData.passporturl5}" width="200px"  height="150px"  ${style}   />
              `;
              


              var     data = `
                  
            <div  class="card">

            <table style="width:300px;">
           
            <tr>
              <td>
                  <label>
                    Full Name:
                  </label>
              </td>
              <td>
                <span>${userData.name} </span>
              </td>
            </tr>

            <tr>
            <td>
                <label>Date of Birth:</label>
            </td>

            <td>
               <span>${userData.dateOfBirth}</span>
            </td>
            </tr>
            


              <tr>
            <td>
                <label>Tel:</label>
            </td>

            <td>
               <span>${userData.mainTel}</span>
            </td>
            </tr>
               <tr>
            <td>
               <label>Email:</label>
            </td>

            <td>
             <span>${userData.email}</span>
            </td>
            </tr>
             <tr>
            <td>
               <label>Likes:</label>
            </td>

            <td>
             <span>${userData.likes}</span>
            </td>
            </tr>   



             <tr>
            <td>
               <label>Course Of Study:</label>
            </td>

            <td>
             <span>${userData.courseOfStudy}</span>
            </td>
            </tr>   



            
             <tr>
            <td colspan="2"> 
               <label>The Scholars Question:</label>
            </td>
            </tr>   


             <tr>
            <td colspan="2">
             <span>${userData.TheScholarsQuestion}</span>
            </td>
            </tr>   
            
          </table>



          <table style="width:100%;">

          <tr  style="width:100%;">
              <td colspan="2"  style="width:100%;">
               <div style="width:100%;height:auto;display:flex;flex-direction:row;">
                ${images}
              </div>
              </td>
          </tr>
          </table>
            
          
           </div>
        

                  `   ;
             
              gallaryShow.innerHTML  = data;

              gallaryDisplayShow.style.visibility ="visible";

            })();

          }); // click event ends here

            

});
 
  return false;


}

