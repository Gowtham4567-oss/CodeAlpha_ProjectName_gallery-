document.addEventListener("DOMContentLoaded", () => {
    const galleryItems = document.querySelectorAll(".gallery-item");
    const filterButtons = document.querySelectorAll(".filter-buttons .btn");
    
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeBtn = document.querySelector(".close-btn");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let currentIndex = 0;
    let visibleItems = [...galleryItems]; // Tracks currently active items after filtering

    /* ==========================================
       1. FILTER FEATURE (Bonus Requirement)
       ========================================== */
    filterButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            // Remove active style from previous button, add to current
            document.querySelector(".filter-buttons .active").classList.remove("active");
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            galleryItems.forEach(item => {
                if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                    item.classList.remove("hide");
                } else {
                    item.classList.add("hide");
                }
            });

            // Re-update the visible items list for proper Lightbox navigation loops
            visibleItems = [...galleryItems].filter(item => !item.classList.contains("hide"));
        });
    });

    /* ==========================================
       2. LIGHTBOX & NAVIGATION FEATURE
       ========================================== */
    // Open Lightbox
    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            // Find what index the clicked item is within the *currently visible* items
            currentIndex = visibleItems.indexOf(item);
            showLightbox(visibleItems[currentIndex]);
        });
    });

    function showLightbox(element) {
        const imgTarget = element.querySelector("img");
        const captionTarget = element.querySelector(".caption");

        lightboxImg.src = imgTarget.src;
        lightboxCaption.textContent = captionTarget.textContent;
        lightbox.classList.add("show");
    }

    // Close Lightbox
    closeBtn.addEventListener("click", () => {
        lightbox.classList.remove("show");
    });

    // Close Lightbox clicking outside the image container
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove("show");
        }
    });

    // Next Button Function
    nextBtn.addEventListener("click", () => {
        currentIndex++;
        if (currentIndex >= visibleItems.length) {
            currentIndex = 0; // Loop back to start
        }
        showLightbox(visibleItems[currentIndex]);
    });

    // Prev Button Function
    prevBtn.addEventListener("click", () => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = visibleItems.length - 1; // Loop to end
        }
        showLightbox(visibleItems[currentIndex]);
    });

    // Keyboard controls support (Left / Right / Escape keys)
    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("show")) return;
        
        if (e.key === "ArrowRight") {
            nextBtn.click();
        } else if (e.key === "ArrowLeft") {
            prevBtn.click();
        } else if (e.key === "Escape") {
            closeBtn.click();
        }
    });
});
