

function saveSessionAndLogin(emailValue,passwordVAlue){

    ( async (e)=>{
       


        
       
   

    const url = `/storageUserSession?email=${encodeURIComponent(emailValue)}&password=${encodeURIComponent(passwordVAlue)}`;
    await fetch(url)
    .then(response => {
        console.log('Status:', response.status); // e.g., 200
        console.log('Status Text:', response.statusText); // e.g., "OK"
        console.log('Content-Type:', response.headers.get('Content-Type'));
        return response.text(); // Continue to parse the body
      })
    .then(data =>
        { 
           console.log("Data from backend : "+data);
           window.location.href="/dashboard";
        })
    .catch(error => {
        console.error('Error:', error);
    });

    
})();


}

export{saveSessionAndLogin}