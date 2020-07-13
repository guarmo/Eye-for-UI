const submitBtn = document.querySelector(".submitBtn");
const errMsg = document.querySelector("#errorMsg");
const errMsgDesktop = document.querySelector("#errorMsgDesktop");
const inputField = document.querySelector(".inputField");

submitBtn.addEventListener("click", (e) => {
  if (window.innerWidth < 768) {
    if (!validateEmail(inputField.value)) {
      inputField.classList.add("err");
      errMsg.classList.add("displayMsg");
      errMsgDesktop.classList.remove("displayMsg");
    }
  } else if (window.innerWidth > 768) {
    if (!validateEmail(inputField.value)) {
      inputField.classList.add("err");
      errMsgDesktop.classList.add("displayMsg");
      errMsg.classList.remove("displayMsg");
    }
  }

  e.preventDefault();
});

function validateEmail(inputField) {
  var re = /\S+@\S+\.\S+/;
  if (re.test(inputField)) {
    return true;
  } else {
    return false;
  }
}
