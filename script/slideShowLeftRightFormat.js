


const track = document.getElementById("slideshow-track");
const slides = document.querySelectorAll(".slide");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

let currentIndex = 0;

function updateSlidePosition() {
  const slideWidth = slides[0].clientWidth;
  const newPosition = -currentIndex * slideWidth;
  track.style.transform = `translateX(${newPosition}px)`;
}

nextBtn.addEventListener("click", () => {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
  } else {
    // Optional: Loop back to the first slide
    currentIndex = 0;
  }
  updateSlidePosition();
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    // Optional: Loop back to the last slide
    currentIndex = slides.length - 1;
  }
  updateSlidePosition();
});

// Initialize the position on page load
updateSlidePosition();







// Automatically advance the slides every 3 seconds
setInterval(() => {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0; // Loop back to the beginning
  }
  updateSlidePosition();
}, 3000); // 3000 milliseconds = 3 seconds
