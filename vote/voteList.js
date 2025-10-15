

import{initializeApp} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js"; 
import {getDatabase, ref, onValue, set, get,child,update,remove,push,query, orderByChild,equalTo} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

import {checkEmailUserAccountData,checkCandidateNominationAccountData} from "../script/checkdatabaseForEmail/orderByEmailCheckupUserData.js"

import {executeLikeForVOTE} from "./counter/likeIncreaseForProfileNvote.js";

var app =  initializeApp(configuration());
const db = getDatabase(app);

// import {saveSessionAndLogin} from "../../FirebaseLoginSystem/signUpAndSignInAssets/saveSessionAndLogin.js";

var SpecialLoader = "SpecialLoader";





var viewAll = document.getElementById("viewAll");
viewAll.addEventListener("click", e=>{
  //document.getElementById("cardConMain").innerHTML = "";

  loadAllCandidateData();
  var SpecialLoaderEvent = new Event(SpecialLoader);
  document.dispatchEvent(SpecialLoaderEvent);

})


loadAllCandidateData();

function loadAllCandidateData(){

  getListOfApplicant().then(e=>{
    if(e == false){
        alert("Loaded Completly and data does not exist");
    } 
  
  }).catch(e=>{
    alert(e);
  });
  
}


function getListOfApplicant(){

    const myRef = ref(db, 'NominationList');

    var promise = new Promise((resolve, reject )=>{

      
   
    get(myRef).then((snapshot) => {
         var data="";
      if (snapshot.exists()) {
             var counter = 1;
            snapshot.forEach(function(userDat, indexCount) {
                  var userData = userDat.val();
                  
                  data += layoutFactoriaMaker(userData, indexCount,data,counter);
              counter++;
            });
                  document.getElementById("cardConMain").innerHTML = data;


                  var SpecialLoaderEvent = new Event(SpecialLoader);
                  document.dispatchEvent(SpecialLoaderEvent);
                   return resolve(true);

      } else {
        return resolve(false);
        }
    }).catch((error) => {
      console.error(error);
      return reject(error);
    });





  //   onValue(myRef, (snapshot) => {
  //     //const data = snapshot.val(); // Get the data from the snapshot
  //     var data="";

  //     if (snapshot.exists()) {
  //             snapshot.forEach(function(userDat, indexCount) {
  //               var userData = userDat.val();
  //               data += layoutFactoriaMaker(userData, indexCount,data);
  //         });
  //               document.getElementById("cardConMain").innerHTML = data;


  //               var SpecialLoaderEvent = new Event(SpecialLoader);
  //               document.dispatchEvent(SpecialLoaderEvent);
  //               return resolve(true);
  //     } else {
  //       return resolve(false);
  //     }
  //   },//end of snapshot
    


  //   (error) => {
  //     // This is the error callback
  //     console.error("Firebase Realtime Database error:", error);
  //    return reject(error);
  //  }
    
    
  //   );



});

return promise;



}



var searchContestantBTN  =  document.getElementById("searchContestantBTN");


searchContestantBTN.addEventListener("click", e=>{
  
  var searchContestantBy  = document.getElementById("searchContestantBy");
    
  var searchByType = 1;

  if(searchContestantBy.value == "2"){
    searchByType = 2;
  }
 



                
      var searchContestantEmailID = document.getElementById("searchContestantEmailID");
      if(searchContestantEmailID.value == null || searchContestantEmailID.value == 'undefined' || searchContestantEmailID.value == '' ){

        

        if(searchByType == 1){
          alert("Error: Candidate input is empty, Provide Candidate ID");

        }
        else{
          alert("Error: Candidate input is empty, Provide Candidate Email");

        }      
        return false;
      }

      callBySearchSupport(searchByType,searchContestantEmailID.value);

});

function callBySearchSupport(searchByType, valueToSearchFor){

  (async()=>{
    var errorUnit = document.getElementById("errorUnit")
    errorUnit.innerText = "";
    var doesEmailExistInNorminationList =  ''; 
        if(searchByType == 1){
        doesEmailExistInNorminationList =  await checkCandidateNominationAccountData("NominationList",valueToSearchFor);
        }
        else{
          doesEmailExistInNorminationList =  await checkEmailUserAccountData("NominationList",valueToSearchFor);

        }

    if(doesEmailExistInNorminationList != false){
        var pushId =  doesEmailExistInNorminationList.pushId;
          
        var data="";
       var counter = 1;
        data += layoutFactoriaMaker(doesEmailExistInNorminationList,1,data,counter);
        counter++

        document.getElementById("cardConMain").innerHTML = data;


        var SpecialLoaderEvent = new Event(SpecialLoader);
        document.dispatchEvent(SpecialLoaderEvent);

    }else{

        errorUnit.innerText=`User account does not exist in the nomination list.\n or has being removed.`;

    }

  })();
  
}




function layoutFactoriaMaker(userData, indexCount, data, counter){


  
 
                  //  voteLink: domainVoteURL     


                  var email = userData.email;
                  var currentLevel = userData.currentLevel;
        
        
                  var timestamp = userData.timestamp;
                  var date =  new Date(timestamp);
                        var mdate = date.getFullYear()+"_"+date.getMonth()+"_"+date.getDay();
        
                  var userAccountProfilePicsUrl = userData.userAccountProfilePicsUrl;
        
                  var vote = userData.vote;
                  var votelikes =  userData.votelikes;
                  // var NameAndNickName =  doesUserDataExist.name+"/"+ doesUserDataExist.nickName;
        
                  var voteLink  = userData.voteLink;
                   var pushId = userData.pushId;
                  //     var domainParticipantProfileURL = maintainanceSetting.domainLink+"?participantUrlLink=yes&pushId="+pushId+"&timestamp="+timestamp+"&email="+email;

                  var participantUrlLink = userData.participantUrlLinkForVoteCopy;
                  
                 var  nameAndNickName = userData.nameAndNickName;
                 
                 nameAndNickName = nameAndNickName.split("/");
        
                 var name = nameAndNickName[0];
                 var  nickName = nameAndNickName[1];
                 var canID =  userData.candidateID;
                 var pricePerVote = maintainanceSetting.pricePerVote;

                               
                   
                     data += `
        
        
              
                     <div class="candidate-card">
                     
                         <div class="topdivFloatInCard">
                              <img src="../images/specialIcon/inforicon.png"  class="infor" id="inforBTN${indexCount}"/>
                        
                              <div class="likeResultdiv">
                                <img src="../images/specialIcon/thumb-up-alt-filled-emoticon@3x.png"  class="like" id="likeBTN${indexCount}"/> 
                                <span style="color:darkblue;" id="likeReport${indexCount}">${votelikes}</span>
                              </div>

                              <img src="../images/specialIcon/comment-filled@3x.png" class="comment">

                              <div class="voteResultdiv">
                                  <img src="../images/specialIcon/how-to-vote-filled@3x.png"  class="voteResult"/>
                                  <span style="color:darkblue;">${vote}</span>
                              </div>
                    
                         </div>
        
                        <img src="${userAccountProfilePicsUrl}" alt="Candidate B">
                        <h2>Candidate ${canID}
                            <br>
                            <span style="font-size: 12px;">${name}</span>
                        </h2>
                       
                    
                         <span>Share / copy</span>
                          <select id="copyTypeSelect${indexCount}">
                               <option value="1">For Vote</option>
                               <option value="2">For Like</option>
                          </select> 
                        <img src="../images/specialIcon/content-copy@3x.png"  class="share"    id="copy${indexCount}" > 
                 <br>
                 
                    <button    id="startAndHideBTN${indexCount}"><span id="startAndHide${indexCount}"  canID="${canID}">Start</span> Vote for ${canID} </button>
                    
                    <div id="voteBoard${indexCount}" style="display:none;">
                    <h4>
                            No of Vote to Cast: <br><input type="number" id="quantity${indexCount}" value="1" style="width:5em; text-align:center;">  
                            <span class="mathsigns noselectForSpanAsButton" id="plus${indexCount}">+</span> &nbsp; &nbsp;
                            <span class="mathsigns noselectForSpanAsButton" id="minus${indexCount}">-</span>
                     </h4>
            
                    <h4>
                            <span style="color:blue; font-size: 18px;" >Price: #<span id="price${indexCount}" data="${pricePerVote}">${pricePerVote}</span> </span>  
                    </h4>
            
            
    
                   <button id="Ordernow${indexCount}" style="color:white; background-color: blue;" price="${pricePerVote}" title="${canID}" subtitle="${name}" quantity="${1}"  pushID="${pushId}">
                    Vote Now
                   </button>
                   </div>
             
    
                   <br>
            
            
              count: <span>${counter} </span>
          



                     
                 
                   </div>
                 
                          `;

                          
                          moreInfor(indexCount,"inforBTN"+indexCount,email, "copyTypeSelect"+indexCount, "copy"+indexCount,voteLink, participantUrlLink,pushId );
             
                          return data;

}






function moreInfor(indexCount,idData, email, copyTypeSelect,copy,voteLink,participantUrlLink,pushId ){



document.addEventListener(SpecialLoader, e=>{


  // const urlParams = new URLSearchParams(window.location.search);
  //   const candidateID = urlParams.get('candidateID');
 calculator(indexCount);

 var likeBTN = document.getElementById("likeBTN"+indexCount);

 likeBTN.addEventListener("click",e=>{
  e.preventDefault();
  executeLikeForVOTE(pushId,"likeReport"+indexCount);

 })
  var  copyTypeSelectTag  = document.getElementById(copyTypeSelect);
  var  copyTag  = document.getElementById(copy);
 
 
  copyTag.addEventListener("click",e=>{

    if(copyTypeSelectTag.value == "1"){
      copyTextToClipboardLegacy(voteLink);
    }else{
      copyTextToClipboardLegacy(participantUrlLink);
    }

  });
  




    var startAndHideBTN =  document.getElementById("startAndHideBTN"+indexCount);

    startAndHideBTN.addEventListener("click",e=>{

      var voteBoard = document.getElementById("voteBoard"+indexCount);

      var startAndHide =  document.getElementById("startAndHide"+indexCount);
      if(voteBoard.style.display == "none"){

        voteBoard.style.display = "block";
        startAndHide.innerText= "Hide";

      }else{
        voteBoard.style.display = "none";
        startAndHide.innerText= "Start";

      }


    });
    






    
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
              
              
              var date =  new Date(userData.timestamp);
                  var mdate  = date.getFullYear+"/"+date.getMonth()+"/"+date.getDay()+":"+date.getTime();
               


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
                  <label>
                    Email
                  </label>
              </td>
              <td>
                <span>${userData.email} </span>
              </td>
            </tr>

            <tr style="color:blue">
            <td>
                <label>current Level</label>
            </td>

            <td>
               <span>${userData.currentLevel}</span>
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
               <label> Profile Likes:</label>
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




function copyTextToClipboardLegacy(text) {
  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = text;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand('copy');
  document.body.removeChild(tempTextArea);
  console.log('Text copied to clipboard using legacy method.');
}
