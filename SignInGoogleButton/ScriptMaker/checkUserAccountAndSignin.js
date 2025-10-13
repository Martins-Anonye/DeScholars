

import{initializeApp} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js"; 
import {getDatabase, ref, onValue, set, get,child,update,remove,push,query, orderByChild,equalTo} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";




var app =  initializeApp(configuration());
const db = getDatabase(app);

//import {saveSessionAndLogin} from "../../MainSystemLogin/FirebaseLoginSystem/signUpAndSignInAssets/saveSessionAndLogin.js";
//import {saveSessionAndLogin} from "../../FirebaseLoginSystem/signUpAndSignInAssets/saveSessionAndLogin.js";


function checkUserAccountAndSignINForGoogleBtn(email,password){

    const myRef = ref(db, 'UsersAccount');

    // Build the query
const q = query(myRef, orderByChild('email'), equalTo(email));

// Execute the query and get data
get(q).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());

    var localEmailVerificantioHolder = new LocalEmailVerificantioHolder();

    localEmailVerificantioHolder.setEmail(email);
    localEmailVerificantioHolder.setPassword(password);
    localEmailVerificantioHolder.setIsEmailVerified("yes");
    localEmailVerificantioHolder.setPaymentAccountPushID(snapshot.pushId);
    window.location.href="/participantAppForm.html";
    //localEmailVerificantioHolder.setLoginUser(user);

    //saveSessionAndLogin(email,password);

  } else {
alert("SignUp Please !!! before using this method")  }
}).catch((error) => {
  console.error(error);
});

}






export{checkUserAccountAndSignINForGoogleBtn}


