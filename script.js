// For Hamburger Menu

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navTags = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const isOpen = navLinks.classList.contains('active');
    hamburger.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

navTags.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});


// For Profile Slider
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.profiles-track');
    const cards = document.querySelectorAll('.profile-card');
    const prevButton = document.querySelector('.slider-button.prev');
    const nextButton = document.querySelector('.slider-button.next');
    
    let currentIndex = 0;
    const cardWidth = 275.3; // card width + gap
    const visibleCards = Math.floor(track.clientWidth / cardWidth);
    const maxIndex = cards.length - visibleCards;
    
    function updateSliderPosition() {
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
    
    prevButton.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateSliderPosition();
    });
    
    nextButton.addEventListener('click', () => {
        currentIndex = Math.min(currentIndex + 1, maxIndex);
        updateSliderPosition();
    });
    
    // Pause auto-slide on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
});
