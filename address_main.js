/*=============== declaration===================*/
let data;
let ip = document.getElementById("input");
let button = document.getElementById("btn");
let newUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=at_AHrDRbJAZkNbupmUCVakYg50sQqIn&ipAddress=`;
let userIp;
let x = 32.064336881404564;
let y = 34.7723066642747;

/*============== Getting the User IP from the API ===================*/
function getUserIp() {
  const response = fetch("https://api.ipify.org/?format=json")
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
  return response;
}
/*=============== Operate the infoRender with the user IP ===================*/

const userDetails = async () => {
  userIp = await getUserIp();
  let userUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=at_AHrDRbJAZkNbupmUCVakYg50sQqIn&ipAddress=${userIp.ip}`;
  infoRender(userUrl); // <- Operate the infoRender with the user IP
};
userDetails();
/*=============== Render a default map -> for user IP ===================*/

const renderMap = (x, y) => {
  map = L.map("map").setView([x, y], 15);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
  }).addTo(map);
  let myIcon = L.icon({
    iconUrl: "./images/icon-location.svg",
    iconSize: [39, 50],
    iconAnchor: [19, 51],
  });
  L.marker([x, y], { icon: myIcon }).addTo(map);
};
renderMap(x, y);
/*============== Getting the IP data from the API ===================*/

function getData(url) {
  const response = fetch(url)
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
  return response;
}
/*=============== infoRender function  ===================*/
/*=============== pushing the data from the API and insert it to the html elements  ===================*/

const infoRender = async (url) => {
  data = await getData(url);
  let lat = data.location.lat; // declare latitude according to the API Data
  let lng = data.location.lng; // declare longitude according to the API Data
  if (data.code === 422) {
    alert("IP address could not be found");
  } else {
    const adrress = document.getElementById("adrress");
    adrress.innerHTML = ip.value ? ip.value : `${userIp.ip} (Yours IP)`; // Render the user input IP if exist or his own IP.
    const location = document.getElementById("location");
    location.innerHTML = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
    const timeZone = document.getElementById("time-zone");
    timeZone.innerHTML = `UTC ${data.location.timezone}`;
    const isp = document.getElementById("isp");
    isp.innerHTML = data.isp;
  }
  document.getElementById("search-bar").reset(); // Clearing the input field
  openIpLocation(x, y); //Open map centered on the IP that the user enter
};
/*=============== Function for opening the map centered on the IP that the user enter ===================*/

const openIpLocation = async () => {
  data = await getData(newUrl);
  let lat = data.location.lat; // declare latitude according to the API Data
  let lng = data.location.lng; // declare longitude according to the API Data
  if (map) {
    map.remove();
    renderMap(lat, lng);
  } else {
    renderMap(lat, lng);
  }
};
/*=============== Event listener that update the Url for the current IP according to yhe user input  ===================*/

button.addEventListener("click", (e) => {
  e.preventDefault();
  newUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=at_AHrDRbJAZkNbupmUCVakYg50sQqIn&ipAddress=${ip.value}`;
  infoRender(newUrl);
  openIpLocation(x, y);
});
