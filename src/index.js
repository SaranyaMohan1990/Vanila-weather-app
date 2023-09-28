setTimeout(function () {
  currentPosition();
}, 1000);
function currentTime(timestamp) {
  var options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  let now = new Date(timestamp);
  console.log(timestamp);
  console.log(now);
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
function getForcast(coordinates) {
  console.log(coordinates);
  apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
}
function showTemp(response) {
  temperature = Math.round(response.data.main.temp);
  let temp = document.getElementById("temp");
  temp.innerHTML = temperature;

  let location = document.getElementById("loca");
  location.innerHTML = response.data.name;
  console.log(response.data);
  let description = document.getElementById("description");
  description.innerHTML = response.data.weather[0].description;
  let feelslike = document.getElementById("feelslike");
  feelslike.innerHTML = Math.round(response.data.main.feels_like);
  let humidityElement = document.getElementById("humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.getElementById("windy");
  windElement.innerHTML = response.data.wind.speed;
  let iconElement = document.getElementById("icon");
  iconElement.setAttribute(
    "src",
    "http://openweathermap.org/img/wn/" +
      response.data.weather[0].icon +
      "@2x.png"
  );
  currentTime(response.data.dt * 1000);
  getForcast(response.data.coord);
}
let temperature = null;
let currentbutton = document.getElementById("currentButton");
currentbutton.addEventListener("click", currentPosition);
function changeTempC() {
  let tempholder = document.getElementById("temp");
  tempholder.innerHTML = temperature;
}
function changeTempF() {
  let tempholder = document.getElementById("temp");
  let f = (temperature * 9) / 5 + 32;
  tempholder.innerHTML = f;
}
function forecastDetails() {
  let forcastElement = document.querySelector("#wforcast");
  let forcastHtml = `<div class="row">`;
  let days = ["Wed", "Thu", "Fri"];
  days.forEach(function (days) {
    forcastHtml =
      forcastHtml +
      `
          
            <div class="col-2">
              <div class="forcast-date">${days}</div>
              <div class="forcast-icon">
                <i class="fa-solid fa-cloud-sun cloudysun"></i>
              </div>
              <div class="forecat--temp">
                <span class="forecast-max-temp"> <strong>20°</strong></span>
                <span class="forecast-min-temp">12°</span>
              </div>
            </div>
          
        `;
  });
  forcastHtml = forcastHtml + `</div>`;
  forcastElement.innerHTML = forcastHtml;
}
let cels = document.getElementById("celsius");
cels.addEventListener("click", changeTempC);
let farenH = document.getElementById("faren");
farenH.addEventListener("click", changeTempF);
forecastDetails();
