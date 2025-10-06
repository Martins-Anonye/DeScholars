// Set your Monify API keys
import {VoteCounter} from "../counter/increaseVoteCount.js"

const monify ={
  apiKey: 'MK_TEST_9HGL0E2H3W',
  contractCode: '5285502994'
};

// Get the pay button element
var email  = document.getElementById("email");

var submit = document.getElementById('submit');
var customName = document.getElementById("customName");
var emailConfirm = document.getElementById("emailConfirm");
var error =  document.getElementById("error");
submit.addEventListener('click', (e) => {
  e.preventDefault();
  
  // Create a payment request
  var emailValue = email.value;
var customNameValue  = customName.value;
var emailConfirmValue =  emailConfirm.value;
var params = new URLSearchParams(location.search);
  var title = params.get("title");
  var subtitle = params.get("subtitle");
  var price =  params.get("price")*1;

  var errror = "";
  
  if(emailValue != "" && emailValue != null  && customNameValue != "" && customNameValue != null){
   
    if(emailConfirmValue != null && emailConfirmValue != ""){


      if(emailValue.toLowerCase() == emailConfirmValue.toLowerCase() ){
        //payWithMonnifyNoPromise(price,customNameValue,emailValue,monify.apiKey,monify.contractCode,title+"/"+subtitle);


        var pushID = params.get("pushID");
        var quantity =  params.get("quantity");
        VoteCounter(quantity,pushID, null);


  
      }else{
        errror= "Errror: email not matched";
       
      }
    }else{
      errror= "Errror: email not confirmed";
       
    }
   
  }

  else if(emailValue == "" || emailValue == null ){
    errror= "Errror: Enter valid email";

  }

  else if(customNameValue == "" || customNameValue == null ){
    errror= "Errror: Enter valid Name";

  }
  else{

    errror= "Errror: Enter valid input";
  }

  error.innerText= errror;
 
});



function  payWithMonnify(amount,name,email,apiKey,contractCode) {
  var promise =  new Promise((resulve, reject)=>{




             MonnifySDK.initialize({
          amount: amount,
          currency: "NGN",
          reference: new String(new Date().getTime()),
          customerFullName: name,
          customerEmail: email,
          apiKey: apiKey,
          contractCode: contractCode,
          paymentDescription: "Testing Data here",
          metadata: {
            name: "Damilare",
            age: 45,
          },
          // incomeSplitConfig: [
          //   {
          //     subAccountCode: "MFY_SUB_342113621921",
          //     feePercentage: 50,
          //     splitAmount: 1900,
          //     feeBearer: true,
          //   },
          //   {
          //     subAccountCode: "MFY_SUB_342113621922",
          //     feePercentage: 50,
          //     splitAmount: 2100,
          //     feeBearer: true,
          //   },
          // ],
          onLoadStart: () => {
            console.log("loading has started")
          },
          onLoadComplete: () => {
            console.log("SDK is UP")
          },
          onComplete: function (response) {
            //Implement what happens when the transaction is completed.
            console.log(response)
            alert("Payment Completed Successfully, Check your email for receipt, Item will be deliverd to you successfuly. ");
          },
          onClose: function (data) {
            //Implement what should happen when the modal is closed here
            console.log(data)
          },
        });
  });




  return promise;
       
      }


      function  payWithMonnifyNoPromise(amount,name,email,apiKey,contractCode,paymentDescription) {




             MonnifySDK.initialize({
          amount: amount,
          currency: "NGN",
          reference: new String(new Date().getTime()),
          customerFullName: name,
          customerEmail: email,
          apiKey: apiKey,
          contractCode: contractCode,
          paymentDescription: paymentDescription,
          metadata: {
            name: "Damilare",
            age: 45,
          },
          // incomeSplitConfig: [
          //   {
          //     subAccountCode: "MFY_SUB_342113621921",
          //     feePercentage: 50,
          //     splitAmount: 1900,
          //     feeBearer: true,
          //   },
          //   {
          //     subAccountCode: "MFY_SUB_342113621922",
          //     feePercentage: 50,
          //     splitAmount: 2100,
          //     feeBearer: true,
          //   },
          // ],
          onLoadStart: () => {
            console.log("loading has started")
          },
          onLoadComplete: () => {
            console.log("SDK is UP")
          },
          onComplete: function (response) {
            //Implement what happens when the transaction is completed.
            console.log(response)
            alert("Payment Completed Successfully");
          },
          onClose: function (data) {
            //Implement what should happen when the modal is closed here
            console.log(data)
          },
        });
  





       
      }