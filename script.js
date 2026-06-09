const welcome = document.getElementById("welcome");
const galleryPage = document.getElementById("galleryPage");

document.getElementById("startBtn").addEventListener("click", () => {
    welcome.style.display = "none";
    galleryPage.style.display = "block";
});

const images = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const counter = document.getElementById("counter");

let currentIndex = 0;

images.forEach((img, index) => {

    img.addEventListener("click", () => {

        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
        currentIndex = index;

        updateCounter();
    });

});

function updateCounter() {
    counter.innerText = `${currentIndex + 1} / ${images.length}`;
}

document.querySelector(".close").addEventListener("click", () => {
    lightbox.style.display = "none";
});

document.getElementById("next").addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    lightboxImg.src = images[currentIndex].src;
    updateCounter();
});

document.getElementById("prev").addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    lightboxImg.src = images[currentIndex].src;
    updateCounter();
});

document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowRight") {
        document.getElementById("next").click();
    }

    if (e.key === "ArrowLeft") {
        document.getElementById("prev").click();
    }

    if (e.key === "Escape") {
        lightbox.style.display = "none";
    }

});

function filterImages(category) {

    const imgs = document.querySelectorAll(".gallery img");

    imgs.forEach(img => {

        if (category === "all" || img.classList.contains(category)) {
            img.style.display = "block";
        } else {
            img.style.display = "none";
        }

    });
}

document.getElementById("search").addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    document.querySelectorAll(".gallery img").forEach(img => {

        if (img.className.toLowerCase().includes(value)) {
            img.style.display = "block";
        } else {
            img.style.display = "none";
        }

    });

});
