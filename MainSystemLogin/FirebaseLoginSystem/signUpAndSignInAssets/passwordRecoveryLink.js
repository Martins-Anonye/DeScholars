


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";



import {checkEmailUserAccountExist} from "../checkdatabaseForEmail/orderByEmailCheckup.js"



const app = initializeApp(configuration());
const auth = getAuth(app);



/*
import { getAuth, sendPasswordResetEmail } from "firebase/auth";



const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://www.pendroAI/finishSignUp?cartId=1234',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    // The domain must be configured in Firebase Hosting and owned by the project.
    linkDomain: 'custom-domain.com'
  };



  const auth = getAuth();
sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });



  import { getAuth, sendPasswordResetEmail } from "firebase/auth";

// ... (your Firebase app initialization)

const auth = getAuth();
*/
function resetUserPassword(email) {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent successfully!
      console.log("Password reset email sent!");
      SwalAlertSuccessrMessage();
      // You might want to display a success message to the user
    })
    .catch((error) => {
      // An error occurred
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error sending password reset email:", errorCode, errorMessage);
      // Handle different error codes (e.g., 'auth/user-not-found')
      SwalAlertErrorMessage("Error sending password reset email:"+ errorCode+" \n"+ errorMessage);
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
                resetUserPassword(email.value);

              }
              else{
                SwalAlertErrorMessage("Email does not exist !!! Please Register");

              }
        }
        catch(e){
          SwalAlertErrorMessage("Error: "+ e);

        }
   
    })();

    return false;

  });



}



function  SwalAlertSuccessrMessage(){
  Swal.fire(
      "Successful",
  
      `password reset link sent to your email successfuly: Check inbox/spam/trash for link`,
  
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
