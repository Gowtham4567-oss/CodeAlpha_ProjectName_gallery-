// Array containing all image details for dynamic indexing
const images = [
    { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800", alt: "Foggy Mountain Landscape" },
    { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800", alt: "Modern Glass Skyscraper" },
    { src: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800", alt: "Red Fox Looking Around" },
    { src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800", alt: "Forest Footpath" },
    { src: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800", alt: "Suspension Bridge" },
    { src: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800", alt: "Majestic Lion Portrait" }
];

let currentIndex = 0;

// Open Lightbox
function openLightbox(index) {
    currentIndex = index;
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "flex";
    updateLightboxImage();
}

// Close Lightbox
function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

// Next / Previous Navigation Controls
function changeImage(direction) {
    currentIndex += direction;
    
    // Infinite loop cycling logic
    if (currentIndex >= images.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    
    updateLightboxImage();
}

// Update Lightbox Target Image Content
function updateLightboxImage() {
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.alt = images[currentIndex].alt;
    lightboxCaption.textContent = images[currentIndex].alt;
}

// Bonus Feature: Filter Image Items by Class Category
function filterImages(category) {
    const items = document.querySelectorAll('.gallery-item');
    const buttons = document.querySelectorAll('.filter-buttons .btn');
    
    // Update Active Button Style Status
    buttons.forEach(btn => {
        if(btn.textContent.toLowerCase().includes(category)) {
            btn.classList.add('active');
        } else if (category === 'all' && btn.textContent.toLowerCase().includes('all')) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Show/Hide Image Grids based on targeted categories
    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Close modal instantly if user clicks anywhere outside the main focus image
document.getElementById("lightbox").addEventListener("click", function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});
