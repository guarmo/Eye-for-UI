const submitBtn = document.querySelector("#btn");
const errMsg = document.querySelector("#errorMsg");

submitBtn.addEventListener("click", (e) => {
  if (!validateEmail(email.value)) {
    console.log("invalid");
    email.classList.add("err");
    errMsg.classList.add("addErr");
  } else {
    console.log("valid");
    email.classList.remove("err");
    errMsg.classList.remove("addErr");
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
