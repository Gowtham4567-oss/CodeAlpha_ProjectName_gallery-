const gallery=document.getElementById("gallery");

const categories=[
"food",
"nature",
"technology",
"medicine",
"business",
"people"
];

let currentImage="";

function addImages(){

for(let i=0;i<20;i++){

let category=
categories[Math.floor(Math.random()*categories.length)];

let img=document.createElement("img");

img.src=`https://source.unsplash.com/400x${300+i}/${category}?sig=${Math.random()}`;

img.loading="lazy";

img.onclick=()=>{
openLightbox(img.src);
};

gallery.appendChild(img);
}
}

window.addEventListener("load",()=>{

setTimeout(()=>{
document.getElementById("loader").style.display="none";
},1500);

addImages();

});

window.addEventListener("scroll",()=>{

if(window.innerHeight+window.scrollY>=document.body.offsetHeight-100){

addImages();

}

});

function openLightbox(src){

currentImage=src;

document.getElementById("lightbox").style.display="flex";

document.getElementById("lightboxImg").src=src;
}

document.getElementById("close").onclick=()=>{

document.getElementById("lightbox").style.display="none";

};

document.getElementById("downloadBtn").onclick=()=>{

const a=document.createElement("a");

a.href=currentImage;

a.download="image.jpg";

a.click();

};

document.getElementById("fullscreenBtn").onclick=()=>{

document.getElementById("lightboxImg").requestFullscreen();

};

document.getElementById("favoriteBtn").onclick=()=>{

let favorites=
JSON.parse(localStorage.getItem("favorites"))||[];

favorites.push(currentImage);

localStorage.setItem(
"favorites",
JSON.stringify(favorites)
);

alert("Added to Favorites");
};

document.getElementById("themeBtn").onclick=()=>{

document.body.classList.toggle("light");

};

document.getElementById("uploadBtn").onclick=()=>{

document.getElementById("fileInput").click();

};

document.getElementById("fileInput").addEventListener("change",(e)=>{

const file=e.target.files[0];

if(!file) return;

const reader=new FileReader();

reader.onload=function(ev){

let img=document.createElement("img");

img.src=ev.target.result;

img.onclick=()=>{

openLightbox(img.src);

};

gallery.prepend(img);

};

reader.readAsDataURL(file);

});
