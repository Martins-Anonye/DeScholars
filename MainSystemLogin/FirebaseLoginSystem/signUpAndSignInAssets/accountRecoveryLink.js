


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail,
    sendSignInLinkToEmail
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

import {saveSessionAndLogin} from "./saveSessionAndLogin.js";

import{customActionCodeForVerification} from "./myActionCodeEmailVerification.js"


import {checkEmailUserAccountExist} from "../checkdatabaseForEmail/orderByEmailCheckup.js"

const app = initializeApp(configuration());
const auth = getAuth(app);




function resetUserSignInLinkToEmail(email) {
 



 var actionCodeSettings = customActionCodeForVerification(email);
sendSignInLinkToEmail(auth, email, actionCodeSettings)
  .then(() => {
      // The link was successfully sent.
      // Inform the user.
      // You can also save the email locally for later use,
      // for example, in localStorage.
      window.localStorage.setItem('emailForSignIn', email);
      console.log("Sign-in email confirmation link sent successfully!");
      SwalAlertSuccessrMessage();
      // You might want to display a success message to the user
  })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error sending sign-in email confirmation  link:", errorCode, errorMessage);
      // Handle different error codes (e.g., 'auth/user-not-found')
      SwalAlertErrorMessage("Error sending sign-in email confirmation link: "+ errorCode+" \n"+ errorMessage);

  });
  
}

// Example usage:
// Call this function when the user clicks a "Forgot Password" button
// and provides their email address.
// resetUserPassword("user@example.com");





window.onload = e=>{
  var resetPassword = document.getElementById("resetPassword");
  
  var email= document.getElementById("email");
  resetPassword.addEventListener("click", (e)=>{

    e.preventDefault();

    (async()=>{
      try{

              var doesEmailExist =   await checkEmailUserAccountExist(email.value);
              
              if(doesEmailExist == true){
                 resetUserSignInLinkToEmail(email.value);

              }
              else{
                SwalAlertErrorMessage("Email does not exist !!!");

              }
        }
        catch(e){
          SwalAlertErrorMessage("Error: "+ e);

        }
   
    })();

    return false;
  })
}



function  SwalAlertSuccessrMessage(){
  Swal.fire(
      "Successful",
  
      `email confirmation link sent to your email successfuly: Check inbox/spam/trash for link`,
  
      "success"
  );
}



function  SwalAlertErrorMessage(errorMessage){
  Swal.fire(
      "Operation Denied",
  
      `${errorMessage}`,
  
      "error"
  );
}
