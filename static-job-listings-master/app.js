// UI vars
const filtersSection = document.querySelector(".active-filters");
const grid = document.querySelector("#main-grid");
let itemsKey = [];
let activeFilters = new Set();

// Display fetched jobs on load
window.addEventListener("load", () => {
  fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((el) => {
        let itemFilters = [];
        // Dynamically creating element
        const item = document.createElement("div");
        item.classList.add("item");
        item.classList.add(`item${el.id}`);
        itemFilters.push(el.id);

        const logo = document.createElement("img");
        logo.setAttribute("src", el.logo);
        logo.setAttribute("alt", "");
        logo.classList.add("logo");

        const itemLeft = document.createElement("div");
        itemLeft.classList.add("item-left");
        itemLeft.appendChild(logo);
        item.appendChild(itemLeft);

        const itemInfo = document.createElement("div");
        itemInfo.classList.add("item-info");
        itemLeft.appendChild(itemInfo);

        const itemHead = document.createElement("div");
        itemHead.classList.add("item-head");
        itemHead.innerHTML = `
        <h4>${el.company}</h4>
        `;

        // New btn
        if (el.new === true) {
          const btnNew = document.createElement("div");
          btnNew.textContent = "New!";
          btnNew.classList.add("btn");
          btnNew.classList.add("btn-new");
          itemHead.appendChild(btnNew);
        }

        // Featured btn
        if (el.featured === true) {
          const btnFeatured = document.createElement("div");
          btnFeatured.textContent = "Featured";
          btnFeatured.classList.add("btn");
          btnFeatured.classList.add("btn-featured");
          itemHead.appendChild(btnFeatured);
          item.classList.add("border-left");
        }
        itemInfo.appendChild(itemHead);
        const itemPosition = document.createElement("div");
        itemPosition.classList.add("item-position");
        itemPosition.innerHTML = `
        <h3>${el.position}</h3>
        `;
        itemInfo.appendChild(itemPosition);

        const itemDetails = document.createElement("div");
        itemDetails.classList.add("item-details");
        itemDetails.innerHTML = `
        <div class="ago">${el.postedAt}</div>
        <div class="circle"></div>
        <div class="type">${el.contract}</div>
        <div class="circle"></div>
        <div class="where">${el.location}</div>
        `;
        itemInfo.appendChild(itemDetails);

        const itemRight = document.createElement("div");
        itemRight.classList.add("item-right");
        itemRight.innerHTML = `
        <div class="filter">${el.role}</div>
        <div class="filter">${el.level}</div>
        `;
        itemFilters.push(el.role);
        itemFilters.push(el.level);
        el.languages.forEach((lang) => {
          itemRight.innerHTML += `
        <div class="filter">${lang}</div>
        `;
          itemFilters.push(lang);
        });
        el.tools.forEach((tool) => {
          itemRight.innerHTML += `
        <div class="filter">${tool}</div>
        `;
          itemFilters.push(...el.tools);
        });
        item.appendChild(itemRight);
        grid.appendChild(item);
        itemsKey.push(itemFilters);
      });
    });
});

// Click event on filters
grid.addEventListener("click", (e) => {
  if (e.target.classList.contains("filter")) {
    // Display upper section
    filtersSection.classList.add("display-flex");
    // Display filters in upper section
    activeFilters.add(e.target.textContent);
    let activeFiltersArr = Array.from(activeFilters);
    let output = "";
    activeFilters.forEach((el) => {
      output += `
      <div class="filter">
        ${el} <i class="fas fa-times close-icon"></i>
      </div>`;
      document.querySelector(".left").innerHTML = output;
    });

    // Display only items with selected filters
    activeFiltersArr = Array.from(activeFilters);
    itemsKey.forEach((el) => {
      if (!activeFiltersArr.every((v) => el.includes(v))) {
        document
          .querySelectorAll(`.item${el[0]}`)
          .forEach((el) => (el.style.display = "none"));
      }
    });
  }
});

// Close icon
filtersSection.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-icon")) {
    // Hide filters from upper section
    e.target.parentElement.remove();

    // Update active filters
    const el = e.target.parentElement.textContent.trim();
    activeFilters.delete(el);

    // Remove filter section if no active filters
    if (activeFilters.size === 0) {
      filtersSection.classList.remove("display-flex");
    }

    // Display only items with selected filters
    activeFiltersArr = Array.from(activeFilters);
    itemsKey.forEach((el) => {
      if (!activeFiltersArr.every((v) => el.includes(v))) {
        document
          .querySelectorAll(`.item${el[0]}`)
          .forEach((el) => (el.style.display = "none"));
      } else {
        document
          .querySelectorAll(`.item${el[0]}`)
          .forEach((el) => (el.style.display = "flex"));
      }
    });
  }
});

// Clear filters
document.querySelector("#clear").addEventListener("click", () => {
  activeFilters = new Set();
  document.querySelector(".left").innerHTML = "";
  document
    .querySelectorAll(".item")
    .forEach((el) => (el.style.display = "flex"));

  filtersSection.classList.remove("display-flex");
});
