function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showTemp(response) {
  let city = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  let currentCondition = document.querySelector("#current-condition");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let date = document.querySelector("#date");
  let icon = document.querySelector("#icon");

  celsiusTemp = response.data.temperature.current;
  city.innerHTML = response.data.city;
  temperature.innerHTML = Math.round(celsiusTemp);
  currentCondition.innerHTML = response.data.condition.description;
  humidity.innerHTML = response.data.temperature.humidity;
  wind.innerHTML = response.data.wind.speed;
  date.innerHTML = formatDate(response.data.time * 1000);
  icon.setAttribute("src", response.data.condition.icon_url);
  icon.setAttribute("alt", response.data.condition.description);
}

function search(city) {
  let apiKey = "39e003bc66b7f35722e0c7a5dt3o9140";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showSubmit(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search");
  search(citySearch.value);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitFormula = celsiusTemp * 1.8 + 32;

  temperature.innerHTML = Math.round(fahrenheitFormula);
}
function showCelsiusTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  temperature.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", showSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);


let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

search("Berlin");

