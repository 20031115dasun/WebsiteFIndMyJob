// Slider functionality
const slider = document.querySelector('.slider');
const sliderWrapper = slider.querySelector('.slider-wrapper');
const sliderSlides = Array.from(sliderWrapper.children);
const sliderButtonNext = slider.querySelector('.slider-button-next');
const sliderButtonPrev = slider.querySelector('.slider-button-prev');
const sliderPagination = slider.querySelector('.slider-pagination');

let initialSlideIndex = Math.floor(sliderSlides.length / 2);
let currentSlideIndex = initialSlideIndex;
let initialLoad = true;

sliderButtonNext.addEventListener('click', () => {
    currentSlideIndex++;
    if (currentSlideIndex >= sliderSlides.length) currentSlideIndex = 0;
    updateSlider();
});

sliderButtonPrev.addEventListener('click', () => {
    currentSlideIndex--;
    if (currentSlideIndex < 0) currentSlideIndex = sliderSlides.length - 1;
    updateSlider();
});

function createPaginationDots() {
    for (let i = 0; i < sliderSlides.length/3; i++) {
        const paginationDot = document.createElement('div');
        paginationDot.className = 'slider-pagination-dot';
        if (i == initialSlideIndex) paginationDot.classList.add('active');
        sliderPagination.appendChild(paginationDot);
    }
}

sliderPagination.addEventListener('click', (e) => {
    if (e.target.classList.contains('slider-pagination-dot')) {
        currentSlideIndex = Array.prototype.indexOf.call(sliderPagination.children, e.target);
        updateSlider();
    }
});

function updateSlider() {
    const slideOffset = currentSlideIndex * 10;
    sliderWrapper.style.transform = `translateX(-${slideOffset}px)`;
    sliderSlides.forEach((slide, index) => {
        slide.classList.toggle('active', index == currentSlideIndex);
    });

    const paginationDots = sliderPagination.children;
    for (let i = 0; i < paginationDots.length; i++) {
        paginationDots[i].classList.toggle('active', i == currentSlideIndex);
    }

    if (initialLoad) initialLoad = false;
}

createPaginationDots();
updateSlider();

document.getElementById('bg-color').addEventListener('change', function () {
    document.body.style.backgroundColor = this.value;
});







