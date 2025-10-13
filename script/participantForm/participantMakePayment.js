

var payTenK = document.getElementById("payTenK");
payTenK.addEventListener("click",e=>{



     var localEmailVerificantioHolder = new LocalEmailVerificantioHolder();

   var email =  localEmailVerificantioHolder.getEmail();

   if(email == null || email == "undefined"){

    alert("Sign in and try again   "+email);
   }
   else{

    window.location.href="/script/participantform/PaystackAtFrontEndIntegration/paystackInlinePayment.html";

   }
    // localEmailVerificantioHolder.setPassword(password.value);
    // localEmailVerificantioHolder.setIsEmailVerified("no");
    // localEmailVerificantioHolder.setLoginUser(user);

});