import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider, signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";


//import {insertDataToFirebase} from "../../FirebaseLoginSystem/signUpAndSignInAssets/insertSignupIntoFbData.js";

import {insertDataToFirebase} from "./insertSignupIntoFbData.js";

import {checkEmailUserAccountData} from "../../script/checkdatabaseForEmail/orderByEmailCheckupUserData.js";


const app = initializeApp(configuration());
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  //'login_hint': 'user@example.com'
   prompt: 'select_account'

   //prompt: 'select_account',
  //'login_hint': 'user@example.com'
});

window.onload= function(){

  var passwordSignupGoogle = document.getElementById("passwordSignupGoogle");
    var googleSignIn = document.getElementById("googleSignIn");
    googleSignIn.addEventListener("click", e=>{
      
      if(passwordSignupGoogle.value != null && passwordSignupGoogle.value != ""){
        callGoogleSignIn(passwordSignupGoogle.value);

      }
      else{
        alert("password is empty");
      }
    })
    
}



function callGoogleSignIn(passwordSignupGoogleValue){
//     var provider = new firebase.auth.GoogleAuthProvider();
//     firebase.auth().signInWithPopup(provider).then(function(result) {
//          // This gives you a Google Access Token. You can use it to access the Google API.
//           var token = result.credential.accessToken;
//          // The signed-in user info.
//          var user = result.user;
//          // ...
//    }).catch(function(error) {
//        // Handle Errors here.
//          var errorCode = error.code;
//          var errorMessage = error.message;
//          // The email of the user's account used.
//          var email = error.email;
//          // The firebase.auth.AuthCredential type that was used.
//          var credential = error.credential;
//       // ...
//    });



signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;

      // This gives you a Google Access Token. You can use it to access the Google API.
      //var token = result.credential.accessToken;
    
    // IdP data available using getAdditionalUserInfo(result)

          (async()=>{

                  var userData =   await checkEmailUserAccountData("UsersAccount",user.email);

                  if(userData == false){

                     insertDataToFirebase(user.email,passwordSignupGoogleValue,user.emailVerified,
                      user.photoURL, "GoogleEmailAuth").then(e=>{
                      window.location.href ="signInWithGoogleAccount.html";

                    }).catch(e=>{

                      var error =  document.getElementById("error");
                      error.innerText = "Error: "+e;
                      error.style.display = "inline";
                    });
                  }else{

                    alert("Email Already Exist,  !!  Start Login. \n or Use a different email to sign up.\n Or Check for account recovery for more solution")
                  }
            
                   


            })();
              
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}
