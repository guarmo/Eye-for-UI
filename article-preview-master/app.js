const shareIcon = document.querySelector(".right-side");
const shareRightSide = document.querySelector("#share-right-side");
const shareUI = document.querySelector(".share");
const textFooter = document.querySelector(".text-footer");
var x = window.matchMedia("(max-width:760px");

shareIcon.addEventListener("click", shareFunc);
shareRightSide.addEventListener("click", shareRight);

function shareRight() {
  if (x.matches) {
    textFooter.classList.remove("displayNone");
    shareUI.classList.remove("displayShare");
  }
}

// On resize
function hideOnResize() {
  if (window.innerWidth <= 760) {
    shareRightSide.classList.remove("displayNone");
    if (shareUI.classList.contains("displayShare")) {
      textFooter.classList.add("displayNone");
    }
  } else if (window.innerWidth > 760) {
    shareRightSide.classList.add("displayNone");
    textFooter.classList.remove("displayNone");
  }
}
window.onresize = hideOnResize;

function shareFunc() {
  // Smaller than 760px
  if (x.matches) {
    if (shareUI.classList.contains("displayShare")) {
      shareUI.classList.remove("displayShare");
    } else if (!shareUI.classList.contains("displayShare")) {
      shareUI.classList.add("displayShare");
      textFooter.classList.add("displayNone");
    }
    // Higher than 760px
  } else if (!x.matches) {
    if (shareUI.classList.contains("displayShare")) {
      shareUI.classList.remove("displayShare");
    } else if (!shareUI.classList.contains("displayShare")) {
      shareUI.classList.add("displayShare");
      shareRightSide.classList.add("displayNone");
    }
  }
}
