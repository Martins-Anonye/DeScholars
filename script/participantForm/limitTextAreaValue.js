
 function autoResizeTextArea(textmsg, errorHolder,characterCounterr){

    textmsg.oninput= e=>{

        //(textmsg.style.height.replace("px","")*1)+
        if(textmsg.value != ""){
                errorHolder.innerText ="";
                errorHolder.style.visibility="hidden";
                if(textmsg.scrollHeight > 50){
                    textmsg.style.height =   (textmsg.scrollHeight-5)+"px";
                    //console.log(textmsg.style.height);
                }
        }else{
            textmsg.style.height =  "50px";

        }

        charracterCounter(textmsg,characterCounterr);
    }

    textmsg.onclick = e=>{
       
        charracterCounter(textmsg,characterCounterr);

    }
}


 function charracterCounter(target,characterCounterr){
   // const target = event.currentTarget;
  // var characterCounterr =   document.getElementById("characterCounter"+index)[0];

   
    const maxLength = target.getAttribute("maxlength");
    const currentLength = target.value.length;

    if (currentLength >= maxLength) {
        return console.log("You have reached the maximum number of characters.");
    }
    
    var remainingCharLeft = maxLength - currentLength-1;
    console.log(` ${remainingCharLeft} chars left`);
    characterCounterr.innerText = `${remainingCharLeft} chars left`;

    if(remainingCharLeft < 10){
        characterCounterr.style.color="red";
    }else{
        characterCounterr.style.color="lightblue";

    }
}


export{autoResizeTextArea}