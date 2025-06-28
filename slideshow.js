const slideshowInner = document.querySelector(".slideshow-container .inner");
const slides = document.querySelectorAll(".slide");
const control = document.querySelector(".controls");
let isAnimating = false;
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.classList.add("isClone");
lastClone.classList.add("isClone");

slideshowInner.appendChild(firstClone);
slideshowInner.insertBefore(lastClone, slides[0]);
let currentIndex = 1;
updatePosition(true);
control.onclick = function (event) {
    const crlBtn = event.target.closest(".btn");
    if (!crlBtn || isAnimating) return;

    isAnimating = true; // Khi chuyen slide ngan hanh dong khac xay ra tren slideshow
    if (crlBtn.classList.contains("prev")) {
        currentIndex--;
    }
    if (crlBtn.classList.contains("next")) {
        currentIndex++;
    }
    updatePosition();
};

function updatePosition(instant = false) {
    const offset = `-${currentIndex * 100}%`;
    slideshowInner.style.transition = instant ? "none" : "0.5s ease";
    slideshowInner.style.translate = offset;
}
const dots = document.querySelectorAll(".dot");
slideshowInner.ontransitionend = function () {
    const slides = document.querySelectorAll(".slide");
    if (slides[currentIndex].classList.contains("isClone")) {
        slideshowInner.style.transition = "none";
        if (currentIndex === slides.length - 1) {
            currentIndex = 1;
        } else if (currentIndex === 0) {
            currentIndex = slides.length - 2;
        }
        requestAnimationFrame(() => updatePosition(true));
    }

    const dotIndex = (currentIndex - 1 + dots.length) % dots.length;
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[dotIndex].classList.add("active");

    isAnimating = false;
};

// hover vào thì dừng auto slide
const slideshow = document.querySelector(".slideshow-container");
let autoSlideInterval = setInterval(() => {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex++;
    updatePosition();
}, 4000);
slideshow.addEventListener("mouseenter", () => {
    clearInterval(autoSlideInterval);
});

slideshow.addEventListener("mouseleave", () => {
    // Gán vào để lần sau có thể clear được
    autoSlideInterval = setInterval(() => {
        if (isAnimating) return;
        isAnimating = true;
        currentIndex++;
        updatePosition();
    }, 4000);
});
