import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendEmailVerification,
    sendSignInLinkToEmail
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

import {insertDataToFirebase} from "./insertSignupIntoFbData.js";
import{customActionCodeForVerification} from "./myActionCodeEmailVerification.js"



// swal  and Swal is an object coming from sweet alert library. 
// swal is  use to close sweet alert
//Swal  is use  to declare sweet alert





window.onload= e=>{


const app = initializeApp(configuration());
const auth = getAuth(app);


  if(app == null || app == "undefined"){
alert("Poor Network Detected !! Reloading Page");
  }
    const email=document.getElementById('email');
    const password=document.getElementById('password'); 
    const signUpBtn=document.getElementById('signUpBtn');
    const confirmPassword=document.getElementById('confirmPassword'); 
    const confirmEmail=document.getElementById('confirmEmail'); 

   // const signOutBtn=document.getElementById('signOutBtn');
    //const login=document.getElementById('login');
   // const authPart=document.getElementById('authPart');
    const isEmailVerified=document.getElementById('isEmailVerified');
   
    var isUserNameAvailableGUI = document.getElementById("isUserNameAvailable");

    
    var profilePicture = document.getElementById("profilePicture");

 
    var userNameUpdateAlreadyExistGUI = document.getElementById("userNameUpdateAlreadyExist");
    signUpBtn.addEventListener("click",e=>{
          e.preventDefault();
        
          if( (email != null && email != "undefined") &&  (password != null && password != "undefined")){
             
             if(email.value != ""  &&  password.value != "" && confirmPassword.value != "" && confirmEmail.value != ""){
             // if(email.value != ""  &&  password.value != "" && confirmPassword.value != ""){


              if( password.value  == confirmPassword.value ){
                  if( confirmEmail.value  == email.value ){
                      var isValideEmail = checkEmailData( email.value);
                      if(isValideEmail == true){
                          var localEmailVerificantioHolder = new LocalEmailVerificantioHolder();
                          localEmailVerificantioHolder.setPassword(password.value);
                          localEmailVerificantioHolder.setEmail(email.value);
                          userSignUp();

                      }
                     

                  }
                  else{
                      SwalAlertErrorMessage("Email Mismatched");
                  }
              }
              else{
                  SwalAlertErrorMessage("Password Mismatched");
                  }

             }else{
              SwalAlertErrorMessage("Input is empty");
              }
          }else{
              SwalAlertErrorMessage("System Error");
          }

          return false;
    });
       
    



    
//hiding the top secret part initially 
      //authPart.style.display='none';


     


      //signup
      const userSignUp= async ()=>{
        const signUpEmail=email.value;
        const signUpPassword=password.value;
        createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
        .then( async (userCreditional) => {
            // Signed in 
           
            signUpBtn.disabled = true;
            var user = userCreditional.user;           

            var actionCodeSettings = customActionCodeForVerification(signUpEmail);
            //  sendSignInLinkToEmail   , this is customized link that will  
            //return user to the site after verification and values can be returned
           
           
           
            // sendSignInLinkToEmail(auth, signUpEmail, actionCodeSettings)
            //   .then(() => {
            //             insertDataToFirebase(email.value,password.value,false,"no-Photo","emailandPasswordAuthSignup").then((e)=>{
                                    
            //               SwalAlertCliticalStateReolve(user.email);

            //             }).catch(error=>{

            //             console.log(error)
            //           });

            //   })
            //   .catch((error) => {
            //       const errorCode = error.code;
            //       const errorMessage = error.message;
            //       console.error("Error sending sign-in email confirmation  link:", errorCode, errorMessage);
            //       // Handle different error codes (e.g., 'auth/user-not-found')
            //       SwalAlertErrorMessage("Error sending sign-in email confirmation link: "+ errorCode+" \n"+ errorMessage);
            
            //   });
   


              //  sendEmailVerification()   , this is default partern without returning any value
           
               sendEmailVerification(user).then(() => {
                var event =  new Event("autoStartVerification");
                signUpBtn.dispatchEvent(event);

                   runThisAfterSuccessfullVerification();
                    insertDataToFirebase(email.value,password.value,false,"no-Photo","emailandPasswordAuthSignup").then((e)=>{
                    
                      SwalAlertCliticalStateReolve(user.email);

                    }).catch(error=>{

                     console.log(error)
                   });

                    

               });
           

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            //console.log(errorCode,errorMessage);
           // alert(errorMessage);
            SwalAlertErrorMessage(errorMessage);

        });
    }

     //signin
     const userSignIn= ()=>{

      var promise =  new Promise((resolve,reject)=>{

        


        const signInEmail=email.value;
        const signInPassword=password.value;
        signInWithEmailAndPassword(auth, signInEmail, signInPassword)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            return resolve(user);
           // alert('user signed in successfully');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage);
           // alert(errorMessage);
           return reject(error);
        });

      });

      return promise;
      
  }
    
   //check auth state

   // This auto runs when User :
   //  refreshMent of page
   // or runs immediatlly user  SignUP(Create Account) // but this is waste, hence we use  manuallyCheckAuthListenerState() created by me
   const checkAuthState=async()=>{
   await userSignIn();
    var signUpEmail=email.value;
    var signUpPassword=password.value;
       onAuthStateChanged(auth,(user)=>{
           if(user){

            if (user.emailVerified) {
                console.log('Email is verified');
                console.log(user);
                swal.close();

              
                console.log('user is signed in');
               // localStorage.setItem("signUpEmail",email.value );
               getGoogleUserProfile1();
               runThisAfterSuccessfullVerification(user);
                if(swal != null  || swal != 'undefined'){
                 swal.close()

                }
                SwalAlertSuccessMessage2("Email Verified!");
    
              
            }                

           }else{
           // login.style.display='block';
           // authPart.style.display='none';
            console.log('user is signed out');
           }
       })
     }


    

     function checkEmailVerificationStatusManualy(){
      userSignIn();
      setInterval(function() {
        getAuth().currentUser.reload();
        if (getAuth().currentUser.emailVerified) {
            console.log("Email Verified!");

            if(swal != null  || swal != 'undefined'){
              swal.close()

            }
            SwalAlertSuccessMessage2("Email Verified!");
          }
      }, 3000);
     }


     signUpBtn.addEventListener("autoStartVerification",e=>{
      e.preventDefault();
      console.log("Data triggerd");
   //   checkEmailVerificationStatusManualy();
    //  checkAuthState();
      }); 
  
  

     function deleteFirebaseUserAndRecreateAccountToResendVerificationLink(){

      //const user = firebase.auth().currentUser;
      const user =  auth.currentUser;
      user.delete().then(function() {
        var localEmailVerificantioHolder = new LocalEmailVerificantioHolder();
        localEmailVerificantioHolder.setEmail(null);
        localEmailVerificantioHolder.setFirebaseUser(null);


        userSignUp();
      }).catch(function(error) {
        SwalAlertErrorMessage(error);
      });
     }

     function runThisAfterSuccessfullVerification(user){


      var localEmailVerificantioHolder = new LocalEmailVerificantioHolder();
      // localStorage.setItem("user",user );
      localEmailVerificantioHolder.setFirebaseUser(user);
      localEmailVerificantioHolder.setEmail(email.value);
     
     }

     function getGoogleUserProfile1() {
      //const user = firebase.auth().currentUser;
      const user =  auth.currentUser;
  
      if (user !== null) {
          user.providerData.forEach((profile) => {
            //  console.log("Sign-in provider: " + profile.providerId);
            //  console.log(" Provider-specific UID: " + profile.uid); // email
            //  console.log(" Name: " + profile.displayName);
            //  console.log(" Email: " + profile.email); // email
            //  console.log(" Photo URL: " + profile.photoURL);
              profilePicture.value= profile.photoURL;
          });
      }
  }


    //  if(email.value != "" && password.value != ""){
     
    // checkAuthState();


    //  }
   



    





    function  SwalAlertCliticalStateReolve(email){
       
      
      let msg = 'An email verification link has been sent to ' + email+".";
      //  messageDisplay.innerHTML=msg;

             var title = "Email Verification Link ";
           // var msgg = msg+" Please verify by clicking on the link sent. This link can be found inside inbox, important, spam or trash. ";
           var msgg = msg+" Please verify by clicking on the link sent. This link can be found inside gmail inbox/spam/trash.  After verification, click on verified to start login. "; // firebase uses gramary, so the msg will be inside inbox. do to correct english by google

        var styleThis = "border-radius: 3px; padding: 10px;margin:10px; color:white;";
            var htmlCustomLayoutTextMessage = `
            <h3> ${msgg}</h3>
            <hr>
            <div id="buttonCon" style="color:white">
           <button id="tryAnother"   style="background-color:blue;${styleThis}">Try another email</button>
           <button id="verified"   style="background-color:darkblue;${styleThis}">veirfied(continue)</button>

           <button id="resend"   style="background-color:blue;${styleThis}">Resend link</button>
           
           <button id="cancel"   style="background-color:darkgray;${styleThis}">cancel</button>

           </div>
            `;

           var htmlCustomLayoutFooterToUse = `
           <hr style="background-color:black;">
           <div style="width:100%; text-align:center">
                <a href="/"><button>  home  </button></a> 
               
               <a href="/login"><button>  login  </button></a> 
           </div>
           `;

           var htmlCustomLayoutFooter = `<h4 style="color:red">Instruction !!! : <br>(1) Do not close this screen.  <br> (2) Visite your gmail account and click on the link sent,  <br>(3) Come back to this screen and click verified</h4>`;

            function eventForCustomLayout(){
               

               //var localEmailVerificantioHolder = new LocalEmailVerificantioHolder();

             var tryAnother =  document.getElementById("tryAnother");
             tryAnother.addEventListener("mouseover",e=>{
               tryAnother.style.backgroundColor="black";
             });
              tryAnother.addEventListener("mouseleave",e=>{
               tryAnother.style.backgroundColor="blue";
             });
             tryAnother.addEventListener("click",e=>{
               swal.close();
               
               signOut(auth).then(() => {
                 
                   var localEmailVerificantioHolder = new LocalEmailVerificantioHolder();

                   localEmailVerificantioHolder.setEmail(null);
                   localEmailVerificantioHolder.setPassword(null);

                   swal.close();

                  isEmailVerified.value="no";
                // signUpFormEmailVerification.setAttribute("action","/changeEmailForVerification");
                // signUpFormEmailVerification.submit();
                window.location.href = window.location.href;

                 }).catch((error) => {
                   // An error happened.
                   const errorCode = error.code;
                   const errorMessage = error.message;
                  
                  isEmailVerified.value="no";
                  // signUpFormEmailVerification.setAttribute("action","/changeEmailForVerification");
                  // signUpFormEmailVerification.submit();
                  window.location.href = window.location.href;

                  
                 });
             });
             var verified =  document.getElementById("verified");
             verified.addEventListener("mouseover",e=>{
               verified.style.backgroundColor="black";
             });
              verified.addEventListener("mouseleave",e=>{
               verified.style.backgroundColor="darkblue";
             });
             verified.addEventListener("click",e=>{
               swal.close();
               
               window.location.href = "/signinSystem";
              
               
             });
             var resend =  document.getElementById("resend");
             resend.addEventListener("mouseover",e=>{
               resend.style.backgroundColor="black";
             });
              resend.addEventListener("mouseleave",e=>{
               resend.style.backgroundColor="blue";
             });
             resend.addEventListener("click",e=>{
               swal.close();

               deleteFirebaseUserAndRecreateAccountToResendVerificationLink();
             });

             var cancel =  document.getElementById("cancel");
             cancel.addEventListener("mouseover",e=>{
              cancel.style.backgroundColor="black";
            });
            cancel.addEventListener("mouseleave",e=>{
              cancel.style.backgroundColor="darkgray";
            });
            cancel.addEventListener("click",e=>{
               swal.close();
               signOut(auth).then(() => {
                // localStorage.setItem("signUpEmail",);
                var localEmailVerificantioHolder = new LocalEmailVerificantioHolder();

                 localEmailVerificantioHolder.setEmail(null);
                 localEmailVerificantioHolder.setPassword(null);

                // localStorage.setItem("signUpPassword",null);
               }).catch((error) => {
                 // An error happened.
                 const errorCode = error.code;
                 const errorMessage = error.message;
                 //console.log(errorCode,errorMessage);
                // SwalAlertErrorMessage(errorMessage);
     
                
               });
             });
             
                
            }

       Swal.fire({
           title:title,
           //text:msgg,
         //  type:"success / warning/ question",
           type:"warning",
           showCancelButton: false,
           showConfirmButton:false,
           animation:true,
          // confirmButtonText:"Verified",
          // confirmButtonColor:'darkblue',
          // cancelButtonText:"Resend link",
           allowOutsideClick:false,
           allowEscapeKey:false,
           html: htmlCustomLayoutTextMessage,
           onOpen:function(obj){
               eventForCustomLayout();
           },
         footer:htmlCustomLayoutFooter,
   
       }).then(confirm=>{
   
          // var localEmailVerificantioHolder = new LocalEmailVerificantioHolder();
           // localStorage.setItem("user",user );
          // localEmailVerificantioHolder.setFirebaseUser(user);

           if(confirm.isConfrimed){ // verified
               
           }else if(confirm.isDenied){ //Try another Email
               // cancel button clicked
              
           }else{
             //  cancled/ resend link 
            
           }
       });
   }
    
}

function checkEmailData(emailValue) {
  var isEmailIsChecked = false;
  // emailValue = document.getElementById('email-address').value;
  // var emailValue = email.value;
  var atIndex = emailValue.indexOf("@");
  var dotIndex = emailValue.lastIndexOf(".");
 // console.log(atIndex);
 // console.log(dotIndex);
  //@ cant start email meaning index is greater than 0, And Position of @ is less than . position
  //Meaning @ comes befor .
  if ((atIndex > 0) && (atIndex < dotIndex)) {
      var comExtractor = emailValue.slice(dotIndex, emailValue.length);
      console.log(comExtractor);
      var dotcomdataLower = comExtractor.toLowerCase();
      if (dotcomdataLower == ".com") {
          //document.getElementById("errordata").style.visibility = "hidden";
          isEmailIsChecked = true;
      } else {

          CustomAlertFrom_sweetalert2_API_Method1("Wrong Email ", "Email Not Valid, add .com", "error");
          isEmailIsChecked = false;
      }

  } else {
     CustomAlertFrom_sweetalert2_API_Method1("Wrong Email ", "Email Not Valid", "error");

      isEmailIsChecked = false;
  }

  return isEmailIsChecked;
}

function CustomAlertFrom_sweetalert2_API_Method1(title, msg, type){
  Swal.fire(
      title,
  
      `${msg}`,
  
      type
  );
}
function SwalAlertSuccessMessage(title, msg){

    Swal.fire(
        //'Hey!',
        title,

        // 'Welcome to GeeksForGeeks',
        msg,

        'success'

    );
}



function SwalAlertSuccessMessageWithConfirmationButtonFunction(title, msg){

 

    Swal.fire(
        title,
        msg,
        "success",
         true,
        "Start Login",
        'darkblue',
        "Retry Again",
          true,
        true,

    ).then(confirm=>{
        if(confirm){
                   // window.location.href= "/login";
                    const signUpForm=document.getElementById('signUpForm');

                    signUpForm.submit();

         }
    });

    // Swal.fire({
    //     title:title,
    //     text:msg,
    //     type:"success",
    //     showCancelButton: true,
    //     confirmButtonText:"Start Login",
    //     confirmButtonColor:'darkblue',
    //     cancelButtonText:"Retry Again",
    //     closeOnConfirm:true,
    //     closeOnCancel:true

    // }).then(confirm=>{
    //     if(confirm){
    //         window.location.href= "/login";
    //        }
        
    // });
}

function  SwalAlertErrorMessage(errorMessage){
    Swal.fire(
        "Operation Denied",
    
        `${errorMessage}`,
    
        "error"
    );
}


function  SwalAlertSuccessMessage2(msg){
  Swal.fire(
      "Important !!!",
  
      `${msg}`,
  
      "success"
  );
}
