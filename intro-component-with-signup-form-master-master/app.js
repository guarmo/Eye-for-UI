const submitBtn = document.querySelector("#submitBtn");
const email = document.querySelector("#email");
const inputText = document.querySelectorAll(".inputText");
const errorMsg = document.querySelectorAll(".errorMsg");
const mailMsg = document.querySelector(".mailMsg");

submitBtn.addEventListener("click", (e) => {
  if (!validateEmail(email.value)) {
    email.classList.add("errorBorder");
    email.classList.add("errorIcon");
    email.classList.add("color");
    mailMsg.classList.add("displayMsg");
  } else {
    email.classList.remove("errorBorder");
    email.classList.remove("errorIcon");
    email.classList.remove("color");
    mailMsg.classList.remove("displayMsg");
  }
  e.preventDefault();
});

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  if (re.test(email)) {
    return true;
  } else {
    return false;
  }
}

submitBtn.addEventListener("click", validate);

function validate(e) {
  for (let i = 0; i < inputText.length; i++) {
    if (inputText[i].value === "") {
      console.log(inputText[i]);
      inputText[i].classList.add("errorBorder");
      inputText[i].classList.add("errorIcon");
      errorMsg[i].classList.add("displayMsg");
    } else {
      console.log(inputText[i]);
      inputText[i].classList.remove("errorBorder");
      inputText[i].classList.remove("errorIcon");
      errorMsg[i].classList.remove("displayMsg");
    }
  }
  e.preventDefault();
}
