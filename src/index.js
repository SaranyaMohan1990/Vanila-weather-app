currentTime();
setTimeout(function () {
  currentPosition();
}, 1000);
function currentTime() {
  var options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  let now = new Date();
  let current = now.toLocaleString("en-US", options);
  document.querySelector("#date").textContent = current;
}
function search() {
  let location = document.getElementsByName("search")[0].value;
  document.getElementById("loca").innerHTML = location;
  let apiKey = "85aeae13423cb3b91b9b5468d6b9af73";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    location +
    "&units=metric&appid=" +
    apiKey;
  axios.get(apiUrl).then(showTemp);
}

let searchButton = document.getElementById("locationForm");
searchButton.addEventListener("submit", search);

function showPosition(position) {
  let lati = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "85aeae13423cb3b91b9b5468d6b9af73";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lati +
    "&lon=" +
    long +
    "&units=metric&appid=" +
    apiKey;
  axios.get(apiUrl).then(showTemp);
}
function currentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let temp = document.getElementById("temp");
  temp.innerHTML = temperature;
  console.log(response.data.main.temp);
  let location = document.getElementById("loca");
  location.innerHTML = response.data.name;
}
let currentbutton = document.getElementById("currentButton");
currentbutton.addEventListener("click", currentPosition);
