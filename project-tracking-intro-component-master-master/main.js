const hamburger = document.querySelector("#hamburger");
const dropdown = document.querySelector(".mobile-nav");

hamburger.addEventListener("click", mobileNav);

function mobileNav() {
  var icon = hamburger.src;
  if (icon.indexOf("images/icon-hamburger.svg") != -1) {
    hamburger.src = "images/icon-close.svg";
    // Add dropdown menu
    dropdown.classList.add("display");
    dropdown.classList.remove("hide");
  } else {
    hamburger.src = "images/icon-hamburger.svg";
    // Hide dropdown menu
    dropdown.classList.add("hide");
    dropdown.classList.remove("display");
  }
}

function reportWindowSize() {
  if (window.innerWidth > 650) {
    hamburger.src = "images/icon-hamburger.svg";
    dropdown.classList.add("hide");
  }
}

window.onresize = reportWindowSize;
