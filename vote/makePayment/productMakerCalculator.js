

function calculator(index){
var productPricing = document.getElementById("productPricing"+index);
var plus = document.getElementById("plus"+index);
var quantity = document.getElementById("quantity"+index);
var price =  document.getElementById("price"+index);
var minus = document.getElementById("minus"+index);
var Ordernowbtn  = document.getElementById("Ordernow"+index);

if(Ordernowbtn != null){


    Ordernowbtn.addEventListener("click", e=>{
        var price = Ordernowbtn.getAttribute("price");
        var title = Ordernowbtn.getAttribute("title");
        var subtitle = Ordernowbtn.getAttribute("subtitle");
        var quantity = Ordernowbtn.getAttribute("quantity");
        var pushID = Ordernowbtn.getAttribute("pushID");

        window.location.href =`makePayment/MakePayment.html?price=${price}&&title=${title}&&subtitle=${subtitle}&&quantity=${quantity}&&pushID=${pushID}`;
        
    
    });


var counter = 1;
plus.addEventListener("click",e=>{
 
    counter= counter+1;
    quantity.value = counter;
    calculatePrice(counter);
});

minus.addEventListener("click",e=>{
    if( counter >1 && counter !=1){
        counter= counter-1;
        quantity.value = counter;
        calculatePrice(counter);
    }
    
})

//  quantity.oninput= e=>{

//         //(textmsg.style.height.replace("px","")*1)+
       

        
//     }


quantity.addEventListener('keyup', function(event) {
  const pressedKey = event.key;


  
  // Check if the pressed key is a number (0-9)
  if (!isNaN(parseInt(pressedKey)) && pressedKey >= '0' && pressedKey <= '9') {
    console.log(`Number key pressed: ${pressedKey}`);
    // You can add your desired logic here, like updating an input field,
    // triggering a function, etc.

     if(quantity.value != ""){
                 counter= quantity.value*1;
                quantity.value = counter;
                calculatePrice(counter);
        }


    }


 

});










quantity.addEventListener('keyup', function(event) {
  const pressedKey = event.key;


 

   // Detect Backspace key
  if (pressedKey === 'Backspace') {
  counter= quantity.value*1;
    quantity.value = counter;
    calculatePrice(counter);
  }

  // Detect Delete key
  if (pressedKey === 'Delete') {
    counter= quantity.value*1;
    quantity.value = counter;
    calculatePrice(counter);
  }


 

});

}

function calculatePrice(counterQuantity){
    var mainPrice =price.getAttribute("data")*1;

   var result = mainPrice * counterQuantity;

   console.log(mainPrice)
    price.innerText = result;
    Ordernowbtn.setAttribute("price",result);
    
    Ordernowbtn.setAttribute("quantity",counterQuantity);

}



}