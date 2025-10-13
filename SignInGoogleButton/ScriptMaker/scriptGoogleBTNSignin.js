import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider, signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";





import {checkUserAccountAndSignINForGoogleBtn} from  "./checkUserAccountAndSignin.js";


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
    var googleSignIn = document.getElementById("googleSignIn");
    googleSignIn.addEventListener("click", e=>{
        callGoogleSignIn();
    })
    
}



function callGoogleSignIn(){




signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
      // This gives you a Google Access Token. You can use it to access the Google API.
      //var token = result.credential.accessToken;
      checkUserAccountAndSignINForGoogleBtn(user.email,token);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);

    alert("Process failed :"+errorMessage);
    // ...
  });
}
