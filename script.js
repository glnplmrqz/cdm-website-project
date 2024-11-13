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
    let startX;
    let isDragging = false;
    
    function getCardWidth() {
        return cards[0].offsetWidth + parseInt(window.getComputedStyle(cards[0]).marginRight);
    }
    
    function getVisibleCards() {
        return Math.floor(track.clientWidth / getCardWidth());
    }
    
    function getMaxIndex() {
        return Math.max(0, cards.length - getVisibleCards());
    }
    
    function updateSliderPosition() {
        const cardWidth = getCardWidth();
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
    
    function showFullCard(index) {
        cards.forEach((card, i) => {
            if (i === index) {
                card.style.transform = 'scale(1.05)';
                card.style.zIndex = '1';
            } else {
                card.style.transform = 'scale(1)';
                card.style.zIndex = '0';
            }
        });
    }
    
    function handleGesture() {
        currentIndex = Math.max(0, Math.min(currentIndex, getMaxIndex()));
        updateSliderPosition();
        showFullCard(currentIndex);
        updateButtonStates();
    }
    
    function updateButtonStates() {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === getMaxIndex();
        prevButton.style.opacity = prevButton.disabled ? '0.5' : '1';
        nextButton.style.opacity = nextButton.disabled ? '0.5' : '1';
    }
    
    prevButton.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        handleGesture();
    });
    
    nextButton.addEventListener('click', () => {
        currentIndex = Math.min(currentIndex + 1, getMaxIndex());
        handleGesture();
    });
    
    // Touch events for mobile swiping
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        const sensitivity = 50; // Adjust this value to change swipe sensitivity
        
        if (Math.abs(diff) > sensitivity) {
            if (diff > 0 && currentIndex < getMaxIndex()) {
                currentIndex++;
            } else if (diff < 0 && currentIndex > 0) {
                currentIndex--;
            }
            handleGesture();
            isDragging = false;
        }
    });
    
    track.addEventListener('touchend', () => {
        isDragging = false;
    });
    
    // Resize event to handle responsiveness
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            currentIndex = Math.min(currentIndex, getMaxIndex());
            handleGesture();
        }, 250);
    });
    
    // Initial setup
    handleGesture();
});
