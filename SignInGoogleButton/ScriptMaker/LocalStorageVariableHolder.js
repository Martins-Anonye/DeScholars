


class LocalEmailVerificantioHolder{


    constructor(){

       
    }
    setEmail(email){

        localStorage.setItem("signUpEmail",email );
                  
    
    }

    getEmail(){

       return  localStorage.getItem("signUpEmail");
                  
    
    }


     setPaymentAccountPushID(paymentAccountPushID){

        localStorage.setItem("paymentAccountPushID",paymentAccountPushID );
                  
    
    }

    getPaymentAccountPushID(){

       return  localStorage.getItem("paymentAccountPushID");
                  
    
    }


    setFirebaseUser(user){
        localStorage.setItem("firebaseUser",user );

    }
    setLoginUser(user){
        localStorage.setItem("loginUser",user );

    }
    setPassword(password){
        localStorage.setItem("signUpPassword",password );
    }
    getPassword(){
        return localStorage.getItem("signUpPassword");
    }
    setIsEmailVerified(isEmailVerified){
        
        localStorage.setItem("isEmailVerified",isEmailVerified );

    }
    getEmailVerified(){
        
        return localStorage.getItem("isEmailVerified" );

    }

    
    
    setUserSN(userSN){
        localStorage.setItem("userSN",userSN );

    }

    setProfilePicture(profilePicture){
        localStorage.setItem("profilePicture",profilePicture );
    }

    setAllData(allDataFromAUser){
        localStorage.setItem("allDataFromAUser",allDataFromAUser );
   
    }
    getAllData(){
        return  localStorage.getItem("allDataFromAUser");
    }

    
    clearAllSet(){
        
        localStorage.setItem("allDataFromAUser",null );
        localStorage.setItem("profilePicture",null );
        localStorage.setItem("userSN",null );
        localStorage.setItem("isEmailVerified",null );
        localStorage.setItem("signUpPassword",null );
        localStorage.setItem("signUpEmail",null );
        localStorage.setItem("firebaseUser",null );
        localStorage.setItem("paymentAccountPushID",null );

        

    }
}