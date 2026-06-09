// Production Stock Media Library (Direct URLs using Unsplash source IDs)
const onlineMediaLibrary = {
    nature: [
        "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80", // Forest Path
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80", // Misty Mountains
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80", // Sunlit Trees
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80"  // Valley View
    ],
    architecture: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", // Modern Skyscraper
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80", // Interior Classic
        "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=800&q=80", // Golden Gate Bridge
        "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=800&q=80"  // Gothic Cathedral
    ],
    tech: [
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", // Circuit Board
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80", // Matrix / Cyber Security
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", // AI / Server Rack Glow
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80"  // Sleek Laptop Workspace
    ],
    people: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80", // Portrait Study
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80", // Studio Portrait
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80", // Collaborative Team
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80"  // Street Candid
    ]
};

// Application State Tracking Variables
let activeCollection = [];
let currentImageIndex = 0;

// Grab persistent UI references 
const gridContainer = document.getElementById('imageGrid');
const sectionTitle = document.getElementById('current-folder-title');
const lightbox = document.getElementById('lightbox-engine');
const stageImg = document.getElementById('stage-img');

// Core Folder Management Engine
function loadFolder(folderKey, structuralTabElement) {
    // 1. Update active styling across folder elements
    document.querySelectorAll('.folder-card').forEach(card => {
        card.classList.remove('active');
        card.querySelector('.folder-icon i').className = "fas fa-folder";
    });
    structuralTabElement.classList.add('active');
    structuralTabElement.querySelector('.folder-icon i').className = "fas fa-folder-open";

    // 2. Set runtime text and current category target list reference
    sectionTitle.innerText = `Folder: ${folderKey.charAt(0).toUpperCase() + folderKey.slice(1)}`;
    activeCollection = onlineMediaLibrary[folderKey];

    // 3. Clear display space layouts completely before injecting items
    gridContainer.innerHTML = "";

    // 4. Construct structural nodes for every entry inside the active group array
    activeCollection.forEach((imagePath, arrayPosition) => {
        const itemWrapper = document.createElement('div');
        itemWrapper.className = "gallery-item";
        itemWrapper.innerHTML = `<img src="${imagePath}" alt="Gallery Asset Pipeline" loading="lazy">`;
        
        // Connect runtime tracking triggers
        itemWrapper.addEventListener('click', () => openLightbox(arrayPosition));
        gridContainer.appendChild(itemWrapper);
    });
}

// Full-screen Viewer Logic Pipeline
function openLightbox(positionIndex) {
    currentImageIndex = positionIndex;
    stageImg.src = activeCollection[currentImageIndex];
    lightbox.style.display = "flex";
}

function closeLightbox() {
    lightbox.style.display = "none";
    stageImg.src = "";
}

function navigateLightbox(directionalShift) {
    currentImageIndex += directionalShift;
    
    // Cycle bounds loops handling calculations
    if (currentImageIndex >= activeCollection.length) currentImageIndex = 0;
    if (currentImageIndex < 0) currentImageIndex = activeCollection.length - 1;

    stageImg.src = activeCollection[currentImageIndex];
}

// Listen for keyboard arrow keys when looking at full views
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === "flex") {
        if (e.key === "ArrowRight") navigateLightbox(1);
        if (e.key === "ArrowLeft") navigateLightbox(-1);
        if (e.key === "Escape") closeLightbox();
    }
});

// Initialize application on startup, running Nature folder automatically
window.onload = () => {
    const initialTab = document.querySelector('.folder-card');
    loadFolder('nature', initialTab);
};
