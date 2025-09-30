

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

          var stateOfOrigin = userData.stateOfOrigin;

          var  stateOfResident = userData.stateOfResident;

          var residentAddress =userData.residentAddress;
          var mainTel = userData.mainTel;

          var altTel = userData.altTel;

          var TheScholarsQuestion = userData.TheScholarsQuestion;

          var educationQuelification = userData.educationQuelification;

          var courseOfStudy = userData.courseOfStudy;

          var passport = userData.passport;

          var photo1 =  "userData.photo1";
          var photo2 = "userData.photo2";
          var photo3 = "userData.photo3";
                      
                
             data += `
                  
                   <div  class="card">

                   <table style="width:300px">
            <div id="div1">
               <img src="" width="100%"; height="100%";>
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
            <td colspan="2">
              <h3> Manage Applicant </h3> <br>

             <button>Manage</button> &nbsp;&nbsp;
            <a href=" "  >  
              <button   id="inforBTN${indexCount}"
                ${moreInfor("inforBTN"+indexCount,passport, photo1, photo2, photo3)};
              >More Info</button>   
            </a> 


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






function moreInfor(idData,  image1, image2, image3, image4){

document.addEventListener(SpecialLoader, e=>{



        var btn =  document.getElementById(idData);

          btn.addEventListener("click", e=>{

            e.preventDefault();
            var gallaryShow =  document.getElementById("gallaryShow");

              var images = `<img src="${image1}" width="200px"  height="150px"  /> &nbsp &nbsp 
              <img src="${image2}" width="200px"  height="150px"   /> &nbsp &nbsp 
              

              <img src="${image3}" width="200px"  height="150px"  /> &nbsp &nbsp 
              <img src="${image4}" width="200px"  height="150px"   />
              `;
              
             
              gallaryShow.innerHTML  = images;

              gallaryShow.style.visibility ="visible";

          });

            

});
 
  return false;


}

