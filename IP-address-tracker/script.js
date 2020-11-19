// UI vars
const currentIp = document.querySelector("#currentIp");
const currentLocation = document.querySelector("#currentLocation");
const currentTimezone = document.querySelector("#currentTimezone");
const currentIsp = document.querySelector("#currentIsp");
const ipSearch = document.querySelector(".searchInput");
const arrIcon = document.querySelector(".arrIcon");

// Event listeners
window.addEventListener("load", () => {
  getData();
});
window.addEventListener("click", () => {
  ipSearch.value = "";
});
arrIcon.addEventListener("click", () => {
  if (ipSearch.value) getData(ipSearch.value);
});

// Fetch data
function getData(domain) {
  if (domain) {
    let url = `https://geo.ipify.org/api/v1?apiKey=at_etAabp8X3a3FOI2hVKiF8sCeZb7h9&ipAddress=${domain}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  } else {
    let url =
      "https://geo.ipify.org/api/v1?apiKey=at_etAabp8X3a3FOI2hVKiF8sCeZb7h9&ipAddress";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }
}

// Set data
function setData(data) {
  currentIp.textContent = data.ip;
  currentLocation.innerHTML = `${data.location.city}, ${data.location.region} <br> ${data.location.postalCode}`;
  currentTimezone.textContent = data.location.timezone;
  currentIsp.textContent = data.isp;

  const lat = data.location.lat;
  const long = data.location.lng;

  setMap(lat, long);
}

// Set map
const locationIcon = L.icon({
  iconUrl: "images/icon-location.svg",
  iconSize: [40, 50],
  iconAnchor: [20, 50],
});

const mymap = L.map("mapid");
function setMap(lat, long) {
  mymap.setView([lat, long], 5);

  L.marker([lat, long], { icon: locationIcon }).addTo(mymap);
}

L.tileLayer(
  "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=dfjP0Jze7yuQCGeXrV7D",
  {
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  }
).addTo(mymap);
