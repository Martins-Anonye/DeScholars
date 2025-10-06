

import{initializeApp} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js"; 
import {getDatabase, ref, onValue, set, get,child,update,remove,push,query, orderByChild,equalTo} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";




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

    const myRef = ref(db, 'UserParticipantForm');

    var promise = new Promise((resplve, reject )=>{


   
    get(myRef).then((snapshot) => {
         var data="";
      if (snapshot.exists()) {
    
    snapshot.forEach(function(userDat, indexCount) {
      var userData = userDat.val();

          var name = userData.name;
          var nickName = userData.nickName;

          var email = userData.email;

          var dateOfBirth = userData.dateOfBirth;

       //   var stateOfOrigin = userData.stateOfOrigin;

          var  stateOfResident = userData.stateOfResident;

          var residentAddress =userData.residentAddress;
          var mainTel = userData.mainTel;

          var altTel = userData.altTel;
          var likes = userData.likes+"";

          var TheScholarsQuestion = userData.TheScholarsQuestion;

          var educationQuelification = userData.educationQuelification;

          var courseOfStudy = userData.courseOfStudy;
          var other = `<h3">
                    <span style="color:blue;"> Nick Name: </span> <span>${nickName} </span><br>

          <span style="color:blue;"> Address: </span> <span>${residentAddress} </span><br>
          <span style="color:blue;"> Alt Tel: </span> <span>${altTel} </span><br>
          <span style="color:blue;"> Education Level: </span> <span>${educationQuelification} </span><br>
          <span style="color:blue;"> Course  of Study: </span> <span>${courseOfStudy} </span><br>
          <span style="color:blue;"> The Scholars Answer: </span> <span>${TheScholarsQuestion} </span><br>

          </h3>`

          var passporturl1 = userData.passporturl1;
          var passporturl2 = userData.passporturl2;
          var passporturl3 = userData.passporturl3;
          var passporturl4 = userData.passporturl4;
          var passporturl5 = userData.passporturl5;

         
                
             data += `
                  
                   <div  class="card">

                   <table style="width:300px;">
            <div id="div1">
               <img src="${passporturl1}" width="100%"; height="100%";>
            </div>
            <br>
            <tr>
              <td>
                  <label>
                    Full Name:
                  </label>
              </td>
              <td>
                <span>${name} </span>
              </td>
            </tr>

            <tr>
            <td>
                <label>Date of Birth:</label>
            </td>

            <td>
               <span>${dateOfBirth}</span>
            </td>
            </tr>
            


              <tr>
            <td>
                <label>Tel:</label>
            </td>

            <td>
               <span>${mainTel}</span>
            </td>
            </tr>
            



               <tr>
            <td>
               <label>Email:</label>
            </td>

            <td>
             <span>${email}</span>
            </td>
            </tr>
             <tr>
            <td>
               <label>Likes:</label>
            </td>

            <td>
             <span>${likes}</span>
            </td>
            </tr>
             

             <tr>
            <td colspan="2">
              <h3> Manage Applicant </h3> <br>

             <a href="participantApcantStatusAdmin.html?email=${email}"><button>Manage</button> </a> &nbsp;&nbsp;
           
              <button   id="inforBTN${indexCount}"
                ${moreInfor("inforBTN"+indexCount,passporturl2, passporturl3, passporturl4, passporturl5,other)};
              >More Info</button>   
            


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






function moreInfor(idData,  image1, image2, image3, image4,other){

document.addEventListener(SpecialLoader, e=>{



        var btn =  document.getElementById(idData);

          btn.addEventListener("click", e=>{

            e.preventDefault();
            
            var gallaryDisplayShow =  document.getElementById("gallaryDisplayShow");

            var gallaryShow =  document.getElementById("gallaryShow");

              var images = `${other} <br><img src="${image1}" width="200px"  height="150px"  /> &nbsp &nbsp 
              <img src="${image2}" width="200px"  height="150px"   /> &nbsp &nbsp 
              

              <img src="${image3}" width="200px"  height="150px"  /> &nbsp &nbsp 
              <img src="${image4}" width="200px"  height="150px"   />
              `;
              
             
              gallaryShow.innerHTML  = images;

              gallaryDisplayShow.style.visibility ="visible";

          });

            

});
 
  return false;


}

