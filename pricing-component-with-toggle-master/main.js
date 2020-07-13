let input = document.querySelector("#myCheck");

let basic = document.querySelector("#basic-cost");
let pro = document.querySelector("#pro-cost");
let master = document.querySelector("#master-cost");

input.addEventListener("change", function () {
  if (this.checked) {
    basic.innerHTML = "199.99";
    pro.innerHTML = "249.99";
    master.innerHTML = "399.99";
  } else {
    basic.innerHTML = "19.99";
    pro.innerHTML = "24.99";
    master.innerHTML = "39.99";
  }
});
