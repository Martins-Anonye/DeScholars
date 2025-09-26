
const databaseFirebaselink = require('./FirebaseConnectionUse.js');
//const { getDatabase, ref, getDownloadURL,onValue, onChildAdded, onChildChanged, onChildRemoved, set, child, get } = require("firebase/database");

const { getStorage, ref, uploadBytes,uploadBytesResumable,getDownloadURL, deleteObject} = require("firebase/storage");

const app = databaseFirebaselink.app;
//const database = getDatabase(app);
const storage = getStorage(app);



function uploadFile( file,filePurpose, fileName, myfileMeta, socket, trueMeansEmitforInsertOpperationFalseMeantEmitForUpdateOperation){
  const storageRef = ref(storage, filePurpose+"/"+fileName);

  //const storageRef = ref(storage, 'some-child');
//const reef = ref(database);



// Create file metadata including the content type
/** @type {any} */
const metadata = {
    //contentType: 'image/jpeg',
    contentType: myfileMeta,

  };

// 'file' comes from the Blob or File API
/* uploadBytes(storageRef, file,metadata).then((snapshot) => {
  console.log('Uploaded a blob or file!');
}) 
 */

/*  var uploadTask = uploadBytes(storageRef, file,metadata).then((snapshot) => {
  console.log('Uploaded a blob or file!');
  switch (snapshot.state) {
    case 'paused':
      console.log('Upload is paused');
      break;
    case 'running':
      console.log('Upload is running');
      break;
   
  }
}).catch(error=>{

   // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
}); */





return  new Promise(  (resolve, reject)=>{







//const uploadTask = uploadBytesResumable(storageRef, file);

      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      uploadTask.on('state_changed', (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

     console.log(progress+" Result Data");
      }, (error) => {
        console.log(error)
      }, async () => {
        const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
        console.log(imageUrl+" Image url");


          if(trueMeansEmitforInsertOpperationFalseMeantEmitForUpdateOperation == true){
                  socket.emit('fileUploadedSuccesssfully',
                  {
                      from: 'sever',
                      datamodel: imageUrl
                    //reportState:reportState
          
                  });
          

                  return resolve(imageUrl);
                  // Add to Firestore


          }else{
            
                // updated file link
                return resolve(imageUrl);
            
          }
       
      }); // on ends here


    });// promise ends here
 

}



function deleteFileFromFirebase(fileLink){

  return new Promise((resolve, reject)=>{

                // Create a reference to the file to delete
          const storageRef = ref(storage, fileLink);


          // Delete the file
          deleteObject(storageRef).then(function() {
            // File deleted successfully
            return resolve(true);
          }).catch(function(error) {
            return reject(false);
            // Uh-oh, an error occurred!
          });


  });
   

}



/* */

module.exports= {uploadFile, deleteFileFromFirebase};