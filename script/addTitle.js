
// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, query, orderByChild, get } from "firebase/database";


window.onload=()=>{


    var title  = document.getElementById("title");
        var aliasName  = document.getElementById("aliasName");
    var startDate  = document.getElementById("startDate");
    var endDate  = document.getElementById("endDate");
    var description  = document.getElementById("description");
    var ageLimite  = document.getElementById("ageLimite");
    var coverImage  = document.getElementById("coverImage");
    var submit  = document.getElementById("submit");
   


    
submit.addEventListener("click", e=>{


      var titleValue =  title.value; 
        var aliasNameValue  = aliasName.value;
    var startDateValue  = startDate.value;
    var endDateValue  =  endDate.value;
    var descriptionValue  = description.title;
    var ageLimiteValue  = ageLimite.value;
    var coverImageFile  =  coverImage.file[0];


   firebase.initializeApp(firebaseConfig());
   //initializeApp(firebaseConfig());
   const analytics = firebase.getAnalytics();
    var db =firebase.database();





     (async function(e){
       var timestamp = Date.now();
                try{
                            await db.ref("CompetitionTroophy/"+timestamp).set(
                                    {
                                        category:Category1,
                                        toilet:toilet1,
                                        room:room1,
                                    address:address1,
                                        area:area1,
                                    closet:closet1,
                                    anygood:any,
                                    water:water1,
                                    electric:electricity,
                                    prepaid:prep,
                                    meter:meter1,
                                    contribution:under,
                                    lawyer:law,
                                    lawyerfee:law1,
                        
                                    category:catSet
                        
                                    }
                                );

                             navigateToNext(timestamp)
            }
                
            catch(e){
                alert(e);
            }

      })();



   
});
    





}