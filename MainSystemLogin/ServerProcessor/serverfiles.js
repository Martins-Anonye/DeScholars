
var {webSubscribtionWebAgentInforGetter} = require("./GetMacAddressClientDevice.js");
//const path = require("path");

var {domainDataOfThisApp} = require("./systemDomainConfigure.js");


function serverPreccesor(app, ejs,FirebaseLoginSystem,path,public){
    
    webSubscribtionWebAgentInforGetter();

    app.get("/resetPassword",(req,res)=>{

        ejs.renderFile(FirebaseLoginSystem+'/signupAndLoginAccount/resetPassword.ejs', {data:"result"},(err, html) => {
            if (err) {
                console.error('Error rendering EJS:', err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send(html); // Send the rendered HTML to the client
            }
     
        }); 
 
    }); 
    
    app.get("/accountRecovery",(req,res)=>{

        ejs.renderFile(FirebaseLoginSystem+'/signupAndLoginAccount/accountRecoveryEmailLink.ejs', {data:"result"},(err, html) => {
            if (err) {
                console.error('Error rendering EJS:', err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send(html); // Send the rendered HTML to the client
            }
     
        }); 
 
    }); 
    
    
    app.get("/acctRecoverdAndVerifyTruEmailLink",(req,res)=>{

        // comming from recovery link
       var email = req.query.email;

       var verified = req.query.verified;

       console.log("This is email: "+email);
        var data ={
            email,
            verified
        }

        ejs.renderFile(FirebaseLoginSystem+'/signupAndLoginAccount/recoverd.ejs', data,(err, html) => {
            if (err) {
                console.error('Error rendering EJS:', err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send(html); // Send the rendered HTML to the client
            }
     
        }); 
 
    }); 
    
    app.get("/dashboard",async(req,res)=>{
            //   const path = resolve(process.env.STATIC_DIR + '/login.html');
            //   res.sendFile(path);
  
              res.status(200).sendFile(path.join(public,'/dashboard.html'));
    }); 
    

   app.get("/signupSystem",(req,res)=>{

    
    ejs.renderFile(FirebaseLoginSystem+'/signupAndLoginAccount/signupWithoutVerification.ejs', {data:"result"},(err, html) => {
        if (err) {
            console.error('Error rendering EJS:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(html); // Send the rendered HTML to the client
        }
 
    }); 
  });  

  ///Get Routing for viewing
  app.get("/signinSystem",(req,res)=>{

      ejs.renderFile(FirebaseLoginSystem+'/signupAndLoginAccount/login.ejs', {domain: domainDataOfThisApp},(err, html) => {
      if (err) {
          console.error('Error rendering EJS:', err);
          res.status(500).send('Internal Server Error');
      } else {
          res.send(html); // Send the rendered HTML to the client
      }
  });
});  


app.get("/signOut",(req,res)=>{

    ejs.renderFile(FirebaseLoginSystem+'/signupAndLoginAccount/signout.ejs', {domain: domainDataOfThisApp},(err, html) => {
    if (err) {
        console.error('Error rendering EJS:', err);
        res.status(500).send('Internal Server Error');
    } else {
        res.send(html); // Send the rendered HTML to the client
    }
});
});  

// /

  app.get("/signUpUsingGoogleButton",(req,res)=>{
    res.status(200).sendFile(path.join(public,"/SignInGoogleButton/SignUpWithGoogleAccount.html"));

   });  


   app.get("/signinUsingGoogleButton",(req,res)=>{
    res.status(200).sendFile(path.join(public,"/SignInGoogleButton/signInWithGoogleAccount.html"));

   });  
  

   app.get("/startSubscrption",(req,res)=>{
    res.status(200).sendFile(path.join(public,"../paysatckSubscription/client/login.html"));

   });  


   
   
// (
//     async(e)=>{
// const html =  await ejs.renderFile(path.join(__dirname, 'MainSystem/FirebaseLoginSystem/signupAndLoginAccount', 'login.ejs'),"data",);

//     }
// )();

  


  
}

module.exports={serverPreccesor}