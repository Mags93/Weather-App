function formatDate() {
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  return `${day} ${hour}:${minutes}`;
}

let now = new Date();
let today = document.querySelector("#date");
today.innerHTML = formatDate(today);

let cityForm = document.querySelector("#cityform");
cityForm.addEventListener("submit", getCity);

function getCity(response) {
  event.preventDefault();
  let searchInput = document.querySelector("#cityinput");
  let location = document.querySelector("#location");
  location.innerHTML = `${searchInput.value}`;
  let apiKey = "f759e66ee3114cf7b0aaace2489c0531";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(getTemp);
}

function getTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#temp");
  h1.innerHTML = `${temperature}`;
  console.log(response);
  let max = Math.round(response.data.main.temp_max);
  let maxTemp = document.querySelector("#max");
  maxTemp.innerHTML = `${max}°C`;
  let min = Math.round(response.data.main.temp_min);
  let minTemp = document.querySelector("#min");
  minTemp.innerHTML = `${min}°C`;
  let feelsLike = Math.round(response.data.main.feels_like);
  let feelTemp = document.querySelector("#feelsLike");
  feelTemp.innerHTML = `Feels like ${feelsLike}°C`;
  let humidity = Math.round(response.data.main.humidity);
  let humidityThere = document.querySelector("#humidity");
  humidityThere.innerHTML = `Humidity ${humidity}`;
}

let button = document.querySelector("button");
button.addEventListener("click", nav);

function showWeather(response) {
  let location = document.querySelector("#location");
  let temperature = Math.round(response.data.main.temp);
  location.innerHTML = `${response.data.name}`;
  let temp = document.querySelector("#temp");
  temp.innerHTML = `${temperature}`;
  let currentMax = Math.round(response.data.main.temp_max);
  let maximum = document.querySelector("#max");
  maximum.innerHTML = `${currentMax}°C`;
  let currentMin = Math.round(response.data.main.temp_min);
  let minimum = document.querySelector("#min");
  minimum.innerHTML = `${currentMin}°C`;
  let currentFeelsLike = Math.round(response.data.main.feels_like);
  let currentFeels = document.querySelector("#feelsLike");
  currentFeels.innerHTML = `Feels like ${currentFeelsLike}°C`;
  let humiditynow = Math.round(response.data.main.humidity);
  let humidityHere = document.querySelector("#humidity");
  humidityHere.innerHTML = `Humidity ${humiditynow}`;
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function nav() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
