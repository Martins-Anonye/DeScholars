

import {autoResizeTextArea} from "./limitTextAreaValue.js"
var  questionsSubmit = document.getElementById("questionsSubmit");

var questions1 = document.getElementById("questions1");
var error1 = document.getElementById("error1");
var characterCounter1 = document.getElementById("characterCounter1");
autoResizeTextArea(questions1,error1,characterCounter1);






var error2 = document.getElementById("error2");
var characterCounter2 = document.getElementById("characterCounter2");
var questions2 = document.getElementById("questions2");
autoResizeTextArea(questions2,error2,characterCounter2);




var error3 = document.getElementById("error3");
var characterCounter3 = document.getElementById("characterCounter3");
var questions3 = document.getElementById("questions3");
autoResizeTextArea(questions3,error3,characterCounter3);



var error4 = document.getElementById("error4");
var characterCounter4 = document.getElementById("characterCounter4");
var questions4 = document.getElementById("questions4");
autoResizeTextArea(questions4,error4,characterCounter4);

var error5 = document.getElementById("error5");
var characterCounter5 = document.getElementById("characterCounter5");
var questions5 = document.getElementById("questions5");
autoResizeTextArea(questions5,error5,characterCounter5);




var error6 = document.getElementById("error6");
var characterCounter6 = document.getElementById("characterCounter6");
var questions6 = document.getElementById("questions6");
autoResizeTextArea(questions6,error6,characterCounter6);


var goToPersonalInfor = document.getElementById("goToPersonalInfor");

goToPersonalInfor.addEventListener("click",e=>{
    e.preventDefault();
  document.getElementById(`personalData`).click();

  window.location.href="#personalData";
  

});

       