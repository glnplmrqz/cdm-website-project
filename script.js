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
        const card = cards[0];
        const style = window.getComputedStyle(card);
        const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
        return card.offsetWidth + gap;
    }
    
    function getVisibleCards() {
        const containerWidth = track.parentElement.offsetWidth;
        const cardWidth = getCardWidth();
        return Math.floor(containerWidth / cardWidth);
    }
    
    function getMaxIndex() {
        const visibleCards = getVisibleCards();
        return Math.max(0, cards.length - visibleCards);
    }
    
    function updateSliderPosition() {
        const cardWidth = getCardWidth();
        const maxIndex = getMaxIndex();
        const visibleCards = getVisibleCards();
        
        // Calculate total width needed
        const totalWidth = cardWidth * cards.length;
        const containerWidth = track.parentElement.offsetWidth;
        
        // Calculate the actual translation
        let offset = currentIndex * cardWidth;
        
        // Adjust offset to prevent extra space at the end
        if (currentIndex >= maxIndex) {
            offset = totalWidth - containerWidth;
        }
        
        track.style.transform = `translateX(-${offset}px)`;
    }
    
    function handleGesture() {
        currentIndex = Math.max(0, Math.min(currentIndex, getMaxIndex()));
        updateSliderPosition();
        updateButtonStates();
    }
    
    function updateButtonStates() {
        const maxIndex = getMaxIndex();
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= maxIndex;
        prevButton.style.opacity = prevButton.disabled ? '0.5' : '1';
        nextButton.style.opacity = nextButton.disabled ? '0.5' : '1';
        prevButton.style.pointerEvents = prevButton.disabled ? 'none' : 'auto';
        nextButton.style.pointerEvents = nextButton.disabled ? 'none' : 'auto';
    }
    
    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
        track.style.transition = 'none';
    }
    
    function handleTouchMove(e) {
        if (!isDragging) return;
        
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        
        if (Math.abs(diff) > 5) {
            e.preventDefault();
        }
    }
    
    function handleTouchEnd(e) {
        if (!isDragging) return;
        
        const currentX = e.changedTouches[0].clientX;
        const diff = startX - currentX;
        const threshold = getCardWidth() / 3;
        
        track.style.transition = 'transform 0.3s ease';
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0 && currentIndex < getMaxIndex()) {
                currentIndex++;
            } else if (diff < 0 && currentIndex > 0) {
                currentIndex--;
            }
        }
        
        handleGesture();
        isDragging = false;
    }
    
    prevButton.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        handleGesture();
    });
    
    nextButton.addEventListener('click', () => {
        currentIndex = Math.min(currentIndex + 1, getMaxIndex());
        handleGesture();
    });
    
    track.addEventListener('touchstart', handleTouchStart, { passive: false });
    track.addEventListener('touchmove', handleTouchMove, { passive: false });
    track.addEventListener('touchend', handleTouchEnd);
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const maxIndex = getMaxIndex();
            currentIndex = Math.min(currentIndex, maxIndex);
            handleGesture();
        }, 250);
    });
    
    handleGesture();
});
