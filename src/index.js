setTimeout(function () {
  search();
}, 1000);
function currentTime(timestamp) {
  var options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  let now = new Date(timestamp * 1000);

  let current = now.toLocaleString("en-US", options);
  document.querySelector("#date").textContent = current;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function search() {
  let location = document.getElementsByName("search")[0].value;
  console.log("Location" + location);
  if (location === "") {
    console.log("Location" + location);
    location = "vancouver";
  }
  console.log("Location" + location);
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
  axios.get(apiUrl).then(forecastDetails);
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

function forecastDetails(response) {
  let forecastElement = document.querySelector("#wforecast");
  let forecastHtml = `<div class="row">`;
  let days = ["Wed", "Thu", "Fri"];
  let forcast = response.data.daily;

  forcast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `
            <div class="col-2">
              <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
              
                <img src=
    "http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"/>
            
              <div class="forecast-temp">
                <span class="forecast-max-temp"> <strong>${Math.round(
                  forecastDay.temp.max
                )}°</strong></span>
                <span class="forecast-min-temp">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </div>
            </div>
          
        `;
    }
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}
let cels = document.getElementById("celsius");
cels.addEventListener("click", changeTempC);
let farenH = document.getElementById("faren");
farenH.addEventListener("click", changeTempF);
forecastDetails();
