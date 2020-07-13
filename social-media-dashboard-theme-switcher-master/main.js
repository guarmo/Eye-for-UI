// Toggle
const circle = document.querySelector(".circle");
const toggle = document.querySelector(".toggle");
// Background
const body = document.querySelector("body");
const bg = document.querySelector(".bg");
const header = document.querySelector("header");
const headerContainer = document.querySelector(".header-container");
// HR
const hr = document.querySelector("hr");
// Headings
const headings = document.querySelectorAll(".h");
// Paragraphs
const paragraphs = document.querySelectorAll(".p");
// Card
const card = document.querySelectorAll(".card");

circle.addEventListener("click", switchMode);
function switchMode() {
  // circle (change position and bg color)
  circle.classList.toggle("circle-position");
  toggle.classList.toggle("toggle-bg");
  // Change bg color
  body.classList.toggle("bg-dark");
  bg.classList.toggle("bg-dark");
  headerContainer.classList.toggle("bg-dark");
  // Change hr color
  hr.classList.toggle("hr-color");
  // Change heading color
  for (i = 0; i < headings.length; ++i) {
    headings[i].classList.toggle("h-color");
  }
  // Change p color
  for (i = 0; i < paragraphs.length; ++i) {
    paragraphs[i].classList.toggle("p-color");
  }
  // Change card bg
  for (i = 0; i < card.length; ++i) {
    card[i].classList.toggle("card-bg");
  }
}
