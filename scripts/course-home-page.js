const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menuLinks")

hamburger.addEventListener("click", function () {
    menu.classList.toggle("active");
});