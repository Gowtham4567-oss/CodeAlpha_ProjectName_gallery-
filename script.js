// Grab key elements
const grid = document.getElementById('mainGrid');
const galleryItems = Array.from(grid.querySelectorAll('.gallery-item')); // Array for indexing
const lightbox = document.getElementById('lightbox-modal');
const expandedImg = document.getElementById('expanded-img');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentIndex = -1; // State for navigation tracking

// Initialize: Set up click events on all items
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openLightbox(index);
    });
});

// Update the specific contents and dynamic visibility transitions
function updateContent(index) {
    currentIndex = index;
    const targetItem = galleryItems[currentIndex];
    const newSrc = targetItem.querySelector('img').src;
    
    // Smoothly update the popup image source reference
    expandedImg.style.opacity = 0; // Trigger fade out
    setTimeout(() => {
        expandedImg.src = newSrc; // Swap image reference
        expandedImg.style.opacity = 1; // Trigger fade in
    }, 150); // Small duration delay
}

function openLightbox(index) {
    updateContent(index); // Set initial content
    lightbox.style.display = 'flex'; // Make visible (display trigger)
    // Small timeout ensures the 'flex' render happens before transition executes
    setTimeout(() => {
        lightbox.classList.add('show'); // Apply transition effects (opacity and scaling)
    }, 10);
}

function closeLightbox() {
    lightbox.classList.remove('show'); // Apply hide transitions
    // Wait for hide transitions to finalize before fully removing element visibility
    setTimeout(() => {
        lightbox.style.display = 'none'; // Re-hide from DOM visibility structure
        expandedImg.src = ''; // Clear image memory leak reference
    }, 300); // Matches CSS transitions duration balance
}

// NAVIGATION ARROW LOGIC FUNCTIONS
function navigateNext() {
    let nextIdx = (currentIndex + 1) % galleryItems.length; // Modulo handles wrap-around loops
    updateContent(nextIdx);
}

function navigatePrev() {
    let prevIdx = (currentIndex - 1 + galleryItems.length) % galleryItems.length; // Modulo handles wrap-around loops
    updateContent(prevIdx);
}

// EVENT LISTENER BINDING
closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', navigateNext);
prevBtn.addEventListener('click', navigatePrev);

// Close popup if background itself gets directly selected (clicked)
lightbox.addEventListener('click', (event) => {
    // Only execute if direct target is the black background overlay panel itself
    if (event.target === lightbox || event.target.className === 'lb-content-wrapper') {
        closeLightbox();
    }
});

// Advanced Keyboard Controls for Accessibility
document.addEventListener('keydown', (event) => {
    if (lightbox.classList.contains('show')) {
        if (event.key === 'Escape') closeLightbox();
        if (event.key === 'ArrowRight') navigateNext();
        if (event.key === 'ArrowLeft') navigatePrev();
    }
});
