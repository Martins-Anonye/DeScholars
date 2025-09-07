$(document).ready(() => {

    var slideIndex = 1;
    showSlides(slideIndex);
  
    $(".prev").click(function() {
      plusSlides(-1);
    });
  
    $(".next").click(function() {
      plusSlides(1);
    });


   
  
    function plusSlides(n) {
      showSlides(slideIndex += n);
    }
  
    function showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("myslides");
      if (n > slides.length) {
        slideIndex = 1
      }
      if (n < 1) {
        slideIndex = slides.length
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
  
      slides[slideIndex - 1].style.display = "block";
      
  
    }


//auto play
    var stopAutoPlay  = 0;

    var slideCount =  0;
    var next = document.getElementsByClassName("next")[0];
    var slides = document.getElementsByClassName("myslides");
    
    $(".play").click(function() {
      if(stopAutoPlay ==0){
        stopAutoPlay=1;

      }
      else if(stopAutoPlay ==1){
        stopAutoPlay=0;
        startAutoPlay();

      }
    });



    startAutoPlay();
    function startAutoPlay(){



      var autoPlayStoperKey =  setInterval(function() {

        if(stopAutoPlay == 1){
          clearInterval(autoPlayStoperKey);
        }
    
          $(".next").click(function() {
            plusSlides(slideCount);
          });
          if(next == slides.length){
            slideCount=1;
    
          }
          next.click();
    
    
         
    
        }, 3000);
    
    }
   



  });





