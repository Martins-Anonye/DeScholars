



function customActionCodeForVerification(email){


    const actionCodeSettings = {

         // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
   
        url: 'http://localhost:5000/acctRecoverdAndVerifyTruEmailLink?email='+email+'&&verified=yes', // Your domain and optional query parameters
        handleCodeInApp: true, // Must be true for email link sign-in
           
        iOS: {
            bundleId: 'com.example.ios'
        },
        android: {
            packageName: 'com.example.android',
            installApp: true,
            minimumVersion: '12'
        },
        dynamicLinkDomain: 'http://localhost:5000/' // Your Firebase Dynamic Link domain
      };

      return  actionCodeSettings;
}


export{customActionCodeForVerification}