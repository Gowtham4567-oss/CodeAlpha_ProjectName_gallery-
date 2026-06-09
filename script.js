// Global Media Library mapping folders to verified high-res imagery paths
const enterpriseMediaLibrary = {
    food: [
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80", // Gourmet Pizza
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80", // Healthy Salad Bowl
        "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=800&q=80", // French Toast Berry breakfast
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80"  // Stacked Pancakes
    ],
    machine: [
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80", // Automation Robot Arm
        "https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?auto=format&fit=crop&w=800&q=80", // CNC Precision Milling Machining
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80", // Heavy Duty Gears Pipeline
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"  // Microchip Processor Machinery
    ],
    nature: [
        "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80", // Sunlit Forest Pathway
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80", // Misty Mountain Peaks
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80", // Green Valley Landscapes
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80"  // Giant Sequoia Woodlands
    ],
    company: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", // Corporate Headquarters Skyscraper
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80", // Modern Collaborative Office Boardroom
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80", // Tech Startup Team Meeting
        "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80"  // Executive Briefing Room
    ],
    medicine: [
        "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=800&q=80", // Medical Stethoscope Research
        "https://images.unsplash.com/photo-1584515901367-f1c23116b7c6?auto=format&fit=crop&w=800&q=80", // Pharmacy Prescriptions Bottles
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80", // Doctor Analyzing Diagnostics Screen
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"  // Laboratory Micro-sampling Testing
    ],
    actors: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80", // Expressions Headshot
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80", // Glamour Studio Portrait
        "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=800&q=80", // Film Set Style Dramatic Shot
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80"  // Theater Character Study Candid
    ]
};

// Application Global States Tracking
let activeCollection = [];
let currentImageIndex = 0;

// Gather UI Targets
const gridContainer = document.getElementById('imageGrid');
const sectionTitle = document.getElementById('current-folder-title');
const lightbox = document.getElementById('lightbox-engine');
const stageImg = document.getElementById('stage-img');

// Core Directory Management Engine
function loadFolder(folderKey, structuralTabElement) {
    // 1. Reset all folder nodes back to closed layouts
    document.querySelectorAll('.folder-card').forEach(card => {
        card.classList.remove('active');
        card.querySelector('.folder-icon i').className = "fas fa-folder";
    });
    
    // 2. Grant exclusive open styles to selected targeting tab 
    structuralTabElement.classList.add('active');
    structuralTabElement.querySelector('.folder-icon i').className = "fas fa-folder-open";

    // 3. Mount text tags and pointer data records to track updates
    sectionTitle.innerText = `Folder: ${folderKey.charAt(0).toUpperCase() + folderKey.slice(1)}`;
    activeCollection = enterpriseMediaLibrary[folderKey];

    // 4. Wipe display container space empty cleanly
    gridContainer.innerHTML = "";

    // 5. Construct fresh image cards iterating over dataset collections dynamically
    activeCollection.forEach((imagePath, arrayPosition) => {
        const itemWrapper = document.createElement('div');
        itemWrapper.className = "gallery-item";
        itemWrapper.innerHTML = `<img src="${imagePath}" alt="Industry Stream Pipeline Asset" loading="lazy">`;
        
        // Connect click tracker callbacks 
        itemWrapper.addEventListener('click', () => openLightbox(arrayPosition));
        gridContainer.appendChild(itemWrapper);
    });
}

// Fullscreen Viewer State Pipeline
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
    
    // Cyclical array wrapping control checks
    if (currentImageIndex >= activeCollection.length) currentImageIndex = 0;
    if (currentImageIndex < 0) currentImageIndex = activeCollection.length - 1;

    stageImg.src = activeCollection[currentImageIndex];
}

// Bind Global Hardware/Keyboard Control hooks for accessibility
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === "flex") {
        if (e.key === "ArrowRight") navigateLightbox(1);
        if (e.key === "ArrowLeft") navigateLightbox(-1);
        if (e.key === "Escape") closeLightbox();
    }
});

// Auto-Launch application parsing the default Food folder configuration on startup
window.onload = () => {
    const defaultTab = document.querySelector('.folder-card');
    loadFolder('food', defaultTab);
};
