// UI vars
const body = document.querySelector("body");
const grid = document.querySelector(".main-grid");
const moon = document.querySelector(".fa-moon");
const headerFlex = document.querySelector(".header-flex");
const mainFlex = document.querySelector(".main-flex");
const mainGrid = document.querySelector(".main-grid");
const cards = document.querySelectorAll(".card");
const search = document.querySelector("#search");
const filterBtn = document.querySelector("#filterBtn");
const dropdownMenu = document.querySelector(".dropdown-menu");
const dropdown = document.querySelector(".dropdown");
const dropdownItems = document.querySelectorAll(".dropdown-item");
const infoPage = document.querySelector(".info-page");

// Create country element
function createElement(el) {
  return `<div class="card" id="${el.name}">  
          <img
          class="flag"
          src="${el.flag}"
          alt="Flag"
          />
          <div class="container">
            <h4 class="country"><b>${el.name}</b></h4>
            <div class="population">
              <h6 class="label">Population:</h6>
              <span>${el.population}</span>
            </div>
            <div class="region">
              <h6 class="label">Region:</h6>
              <span>${el.region}</span>
            </div>
            <div class="capital">
              <h6 class="label">Capital:</h6>
              <span>${el.capital}</span>
            </div>
          </div>
        </div> `;
}

// Create detail page
function createElementPage(el) {
  const backBtn = document.createElement("button");
  backBtn.classList.add("back-btn");
  backBtn.innerHTML = `<i class="fas fa-long-arrow-alt-left"></i> Back`;

  const countryInfo = document.createElement("div");
  countryInfo.classList.add("country-info");

  const flag = document.createElement("img");
  flag.classList = "flag";
  flag.setAttribute("src", `${el.flag}`);
  flag.setAttribute("alt", "");

  countryInfo.appendChild(flag);

  const desc = document.createElement("div");
  desc.classList.add("desc");

  countryInfo.appendChild(desc);

  const h4 = document.createElement("h4");
  h4.classList = "country";
  h4.textContent = `${el.name}`;

  desc.appendChild(h4);

  const descInfo = document.createElement("div");
  descInfo.classList.add("desc-info");

  descInfo.innerHTML = `<div class="left">
                <div class="native-name">
                   <h6 class="label">Native Name:</h6>
                   <span>${el.nativeName}</span>
                 </div>

                 <div class="population">
                   <h6 class="label">Population:</h6>
                   <span>${el.population}</span>
                 </div>

                 <div class="region">
                   <h6 class="label">Region:</h6>
                   <span>${el.region}</span>
                 </div>

                 <div class="sub-region">
                   <h6 class="label">Sub Region:</h6>
                   <span>${el.subregion}</span>
                 </div>

                 <div class="capital">
                   <h6 class="label">Capital:</h6>
                   <span>${el.capital}</span>
                 </div>
               </div>`;

  desc.appendChild(descInfo);

  const right = document.createElement("div");
  right.classList.add("right");
  right.innerHTML += `<div class="top-level-domain">
                   <h6 class="label">Top Level Domain:</h6>
                   <span>${el.topLevelDomain}</span>`;

  const currencies = el.currencies;
  currencies.forEach((currency) => {
    right.innerHTML += `<div class="currency">
                   <h6 class="label">Currency:</h6>
                   <span>${currency.name}</span>
                 </div>`;
  });

  const languages = document.createElement("div");
  languages.classList.add("languages");
  languages.innerHTML = `<h6 class="label">Languages:</h6>`;

  const languagesArr = el.languages;
  languagesArr.forEach((lang) => {
    languages.innerHTML += `<span>${lang.name}</span>`;

    right.appendChild(languages);
  });

  descInfo.appendChild(right);

  const borderCountries = document.createElement("div");
  borderCountries.classList.add("border-countries");
  borderCountries.innerHTML += `<h6>Border Countries:</h6>`;

  const borderList = el.borders;
  console.log(el);
  console.log(borderList);
  borderList.forEach((border) => {
    borderCountries.innerHTML += `<div class="border-country">
                 ${border}
               </div>`;
  });

  desc.appendChild(borderCountries);

  infoPage.innerHTML = "";
  infoPage.appendChild(backBtn);
  infoPage.appendChild(countryInfo);
}

// Country detail page
grid.addEventListener("click", (e) => {
  if (e.target.parentElement.classList.contains("card")) {
    grid.style.display = "none";
    mainFlex.style.display = "none";
    infoPage.style.display = "block";
    fetch(`https://restcountries.eu/rest/v2/name/${e.target.parentElement.id}`)
      .then((res) => res.json())
      .then((data) =>
        data.forEach((el) => {
          createElementPage(el);
        })
      );
  }
});

// Back button event
document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("back-btn")) {
    grid.style.display = "grid";
    mainFlex.style.display = "flex";
    infoPage.style.display = "none";
  }
});

// Border detail page
document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("border-country")) {
    fetch(`
    https://restcountries.eu/rest/v2/alpha/${e.target.textContent.trim()}`)
      .then((res) => res.json())
      .then((data) => createElementPage(data));
  }
});

// Display countries on load
window.addEventListener("load", loadAllCountries);
function loadAllCountries() {
  fetch("https://restcountries.eu/rest/v2/all")
    .then((res) => res.json())
    .then((data) =>
      data.forEach((el) => {
        grid.innerHTML += createElement(el);
      })
    );
}

// Search country by name
document.querySelector("#search").addEventListener("keyup", (e) => {
  const text = e.target.value.toLowerCase();
  const countries = document.querySelectorAll(".country");
  countries.forEach((country) => {
    const item = country.textContent.trim();
    if (item.toLowerCase().indexOf(text) !== -1) {
      country.parentElement.parentElement.style.display = "block";
    } else {
      country.parentElement.parentElement.style.display = "none";
    }
  });
});

// Filter by region
document.querySelectorAll(".dropdown-item").forEach((region) => {
  region.addEventListener("click", () => {
    document.querySelector("#filterBtn").textContent = region.textContent;
    grid.innerHTML = "";
    fetch(`https://restcountries.eu/rest/v2/region/${region.textContent}`)
      .then((res) => res.json())
      .then((data) => {
        data.forEach((el) => {
          grid.innerHTML += createElement(el);
        });
      });
  });
});

// Switch modes
document.querySelector(".mode").addEventListener("click", () => {
  if (moon.classList.contains("far")) {
    // Dark mode
    body.classList.add("veryDark-bg");
    moon.className = "fas fa-moon";
    headerFlex.classList.add("dark-bg");
    mainFlex.classList.add("veryDark-bg");
    search.classList.add("dark-bg");
    search.classList.add("placeholderColor");
    filterBtn.classList.add("dark-bg");
    dropdownMenu.classList.add("dark-bg");
    dropdownItems.forEach((item) => item.classList.add("dark-bg"));
    mainGrid.classList.add("veryDark-bg");
    infoPage.classList.add("veryDark-bg");
    document.styleSheets[0].insertRule(
      ".border-country { background-color: var(--darkBlue) !important}",
      0
    );
    document.styleSheets[0].insertRule(
      ".back-btn { background-color: var(--darkBlue) !important;}",
      0
    );
    document.styleSheets[0].insertRule(
      ".back-btn { color: var(--white) !important;}",
      0
    );
    document.styleSheets[0].insertRule(
      ".main-grid .card { background-color: var(--darkBlue) !important }",
      0
    );
  } else {
    // Light mode
    moon.className = "far fa-moon";
    body.classList.remove("veryDark-bg");
    headerFlex.classList.remove("dark-bg");
    mainFlex.classList.remove("veryDark-bg");
    search.classList.remove("dark-bg");
    search.classList.remove("placeholderColor");
    filterBtn.classList.remove("dark-bg");
    dropdownMenu.classList.remove("dark-bg");
    dropdownItems.forEach((item) => item.classList.remove("dark-bg"));
    mainGrid.classList.remove("veryDark-bg");
    infoPage.classList.remove("veryDark-bg");
    document.styleSheets[0].deleteRule(0);
    document.styleSheets[0].deleteRule(0);
    document.styleSheets[0].deleteRule(0);
    document.styleSheets[0].deleteRule(0);
  }
});
