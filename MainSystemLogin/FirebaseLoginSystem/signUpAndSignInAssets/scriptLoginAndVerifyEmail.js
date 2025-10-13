import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

import {saveSessionAndLogin} from "./saveSessionAndLogin.js";


import {checkEmailUserAccountExist} from "../checkdatabaseForEmail/orderByEmailCheckup.js"



const app = initializeApp(configuration());
const auth = getAuth(app);



window.onload= e=>{

    const email=document.getElementById('email');
    const password=document.getElementById('password');
    const myLoginBtn=document.getElementById('myLoginBtn');
   // const signOutBtn=document.getElementById('signOutBtn');
    //const login=document.getElementById('login'); 
    const profilePicture=document.getElementById('profilePicture');

   const verifiedMesageData=document.getElementById('verifiedMesageData');
   verifiedMesageData.value="no";
    const loginForm=document.getElementById('loginForm');
    const messageDisplay=document.getElementById('messageDisplay');

    

    var error = document.getElementById("error");

    email.addEventListener('keyup', () => {
        //  clearTimeout(typingTimer);
          if (email.value) {
            error.style.display="none" ;   
              }
      });

      password.addEventListener('keyup', () => {
        //  clearTimeout(typingTimer);
          if (password.value) {
            error.style.display="none" ;   
          }
      });



      function checkEmailExistToSugestAlternativeLoginWhenEmailandPasswordIsWrong(errorMessage){


        (async()=>{
            try{
      
                    var doesEmailExist =   await checkEmailUserAccountExist(email.value);
                    
                    if(doesEmailExist == true){
                        SwalAlertErrorMessage(`Wrong Email and Password!: Try password reset option. 
                        : \n `+errorMessage);
                    }
                    else{
                        SwalAlertErrorMessage(`No Account found with this email and Password .\n 
                        Signup to create new account: \n `+errorMessage);
                    }
              }
              catch(e){
                SwalAlertErrorMessage("Error: "+ e);
      
              }
         
          })();
      }



    
    //signin
    const userSignIn= async ()=>{
        var signInEmail=email.value;
        var signInPassword=password.value;
        signInWithEmailAndPassword(auth, signInEmail, signInPassword)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            
            startLogin(user,true);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage);
           // alert(errorMessage);
          

           checkEmailExistToSugestAlternativeLoginWhenEmailandPasswordIsWrong(errorMessage)
          
      
           //startLogin(null,false);

        });
    }
   //check auth state
   const checkAuthState=()=>{
    //var signUpEmail=email.value;
    //var signUpPassword=password.value;
       onAuthStateChanged(auth,(user)=>{
           if(user){
     

           //startLogin(user,true);

           }
       })
     }
    checkAuthState();
    //signout
   




    myLoginBtn.addEventListener('click', 
                e=>{
                    e.preventDefault();

                if( (email != null && email != "undefined") &&  (password != null && password != "undefined")){
                    userSignIn();
                }else{
                    SwalAlertErrorMessage("Input is empty");
                }
                    
                    

                }
    );
    

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

    
function startLogin(user,checkVerification){

    var localEmailVerificantioHolder = new LocalEmailVerificantioHolder();

    //local storage features
           
    if( (email != null && email != "undefined") &&  (password != null && password != "undefined")){
                
                    

        if(email.value != "" && password.value != "" ){
            localEmailVerificantioHolder.setEmail(email.value);
            localEmailVerificantioHolder.setPassword(password.value);
            localEmailVerificantioHolder.setIsEmailVerified("no");
            localEmailVerificantioHolder.setLoginUser(user);

            
           
    
        }
        else{
            // we use local storage to login
            email.value = localEmailVerificantioHolder.getEmail();
            password.value = localEmailVerificantioHolder.getPassword();

        }
    }



        if(checkVerification == true){
            if (user != null && user.emailVerified) {
                //window.location.href="../index.html";
                // to controll auto Authentication

            if( (email != null && email != "undefined") &&  (password != null && password != "undefined")){
                        
                        if(email.value != "" && password.value != "" ){
                            verifiedMesageData.value="yes";
                            getGoogleUserProfile1();
                            localEmailVerificantioHolder.setIsEmailVerified("yes"); 
                            
                            
                            var emailValue = email.value;
                            var passwordVAlue = password.value;
                                
                                           
                          saveSessionAndLogin(emailValue,passwordVAlue)
             
                           
                        }
            
            }           
                    
            } else{
               // alert("Email not verified !!!, Use (account recovery and verification) to verify");
                         localEmailVerificantioHolder.setIsEmailVerified("no"); 
                            
                            
                            var emailValue = email.value;
                            var passwordVAlue = password.value;
                                
                                           
                          saveSessionAndLogin(emailValue,passwordVAlue)
            }
        }


        return false;
    //loginForm.submit();
}
   
}



function checkVerification(){
    const auth = getAuth();

    // (async(e)=>{
    //        await auth.currentUser?.reload();
    //        const user = getAuth().currentUser;
    //        if (user != null && user.emailVerified) {
    //         alert("user is verified")
    //                 // Email is now verified in the app
    //             }
    //             else{
    //               alert("email not verified");
    //             }

    // })();

     const user = getAuth().currentUser;
    if (user) {
        user.reload().then(() => {
            if (user.emailVerified) {
                console.log("Email is verified after reload!");
                getGoogleUserProfile1();
  
              runThisAfterSuccessfullVerification(auth.currentUser);

            } else {
              SwalAlertCliticalStateReolve(email.value);
             }
        }).catch((error) => {
          var errorr = "Error reloading user:"+ error;
          SwalAlertErrorMessage(errorr);
        });
    }



    //     // Then, re-fetch the current user to get the updated emailVerified status
    //      updatedUser = FirebaseAuth.instance.currentUser;
    //     if (updatedUser != null && updatedUser.emailVerified) {
    //         // Email is now verified in the app
    //     }

    
  }


  //checkVerification2();
  function checkVerification2(){
   
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (user.emailVerified) {
              getGoogleUserProfile1();
  
              runThisAfterSuccessfullVerification(auth.currentUser);

            } else {
                console.log("Email is not verified (via auth state change).");
                SwalAlertCliticalStateReolve(email.value)

            }
        } else {
          var errorr = "Error reloading user:"+ error;
          SwalAlertErrorMessage(errorr);        
        }
    });
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

    // Swal.fire(
    //     //'Hey!',
    //     title,

    //     // 'Welcome to GeeksForGeeks',
    //     msg,

    //     'success'

    // ).then(confirm=>{

    //     if(confirm){

    //     }
    // });


    Swal.fire({
        title:title,
        text:msg,
        type:"success",
        showCancelButton: true,
        confirmButtonText:"Start Login",
        confirmButtonColor:'darkblue',
        cancelButtonText:"Retry Again",
        closeOnConfirm:true,
        closeOnCancel:true,
        showConfirmButton:true,
        allowOutsideClick:false,
        allowEscapeKey:false

    }).then(confirm=>{

        if(confirm){
        // window.location.href= "/login";
        }
    });
}






function  SwalAlertErrorMessage(errorMessage){
    Swal.fire(
        "Operation Denied",
    
        `${errorMessage}`,
    
        "error"
    );
}

