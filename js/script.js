// carousel script

const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const nextBtn = document.querySelector(".carousel-btn--right");
const previousBtn = document.querySelector(".carousel-btn--left");
const dotsNav = document.querySelector(".carousel-nav");
const dots = Array.from(dotsNav.children);
const indicator = document.querySelector(".carousel-nav");

const slideWidth = slides[0].getBoundingClientRect().width;
// console.log(slideWidth);

// arrange the slide next to one another

// slides[0].style.left = 0;
// slides[1].style.left = slideWidth + 200 + "px";
// slides[2].style.left = slideWidth * 2 + 200 + "px";

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

const hideShowArrow = (slides, previousBtn, nextBtn, targetIndex) => {
  if (targetIndex === 0) {
    previousBtn.classList.add("is-hidden");
    nextBtn.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    previousBtn.classList.remove("is-hidden");
    nextBtn.classList.add("is-hidden");
  } else {
    previousBtn.classList.remove("is-hidden");
    nextBtn.classList.remove("is-hidden");
  }
};

// when I click right, move slide to right

nextBtn.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);
  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrow(slides, previousBtn, nextBtn, nextIndex);
});

// when clicked left, move slide to left

previousBtn.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);
  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrow(slides, previousBtn, nextBtn, prevIndex);
});

// when clicked on carousel indicator move to that slide

dotsNav.addEventListener("click", (e) => {
  // which indicator was clicked on
  const targetDot = e.target.closest("button");

  if (!targetDot) return;
  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrow(slides, previousBtn, nextBtn, targetIndex);
});
