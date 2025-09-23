

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


    if(titleValue ==  null || titleValue== "undefined"){

        alert("Title is empty");
    }
    
    if(titleValue ==  null || titleValue== "undefined"){

        alert("Title is empty");
    }
   
   
});
    





}