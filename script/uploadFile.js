
firebase.initializeApp(configuration());

            // Get a reference to the storage service
            const storage = firebase.storage();


  function uploader(fileInputId,progresscounter,seasonTitle){


    var Mypromise = new Promise((resolve,rejected)=>{



        const progresscounterRst = document.getElementById(progresscounter);


        const fileInput = document.getElementById(fileInputId);
                const file = fileInput.files[0];

                if (file) {
                    // Create a storage reference
                    const storageRef = storage.ref('TheScholarsNG/'+seasonTitle+"/"+file.name);

                    // Upload the file
                    const uploadTask = storageRef.put(file);

                    // Monitor upload progress
                    uploadTask.on('state_changed',
                        (snapshot) => {
                            // Observe state change events such as progress, pause, and resume
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            var upld ='Upload is ' + progress + '% done';
                            console.log(upld);
                            progresscounterRst.innerText= upld;
                        },
                        (error) => {
                            // Handle unsuccessful uploads
                            console.error("Upload failed:", error);
                            return rejected("Upload failed: "+error);
                        },
                        () => {
                            // Handle successful uploads on complete
                            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                               console.log('File available at', downloadURL);

                                return resolve(downloadURL);
                            });
                        }
                    );
                } else {
                    //console.log("No file selected.");

                 return rejected("No file selected ");

                }




    });
     

    return Mypromise;



}



