/*{ <script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-storage.js"></script> }
<script>

*/
   //paste here your copied configuration code
   const firebaseConfig = {
      apiKey: "***",
      authDomain: "**",
      projectId: "**",
      storageBucket: "**",
      messagingSenderId: "**",
      appId: "**",
      measurementId: "**"
   };

   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
   console.log(firebase);
   function uploadImage() {
      const ref = firebase.storage().ref();
      const file = document.querySelector("#photo").files[0];
      const name = +new Date() + "-" + file.name;
      const metadata = {
         contentType: file.type
      };
      const task = ref.child(name).put(file, metadata);task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
      console.log(url);
      alert('image uploaded successfully');
      document.querySelector("#image").src = url;
   })
   .catch(console.error);
   }
   const errorMsgElement = document.querySelector('span#errorMsg');
/* </script> */