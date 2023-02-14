"use strict";
//Format timestamp into time and day for current time.

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
//Format timestamp into days for forecast.

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
//Show forecast data from API and loop through each day.
function showForecast(response) {
  let weatherForecast = response.data.daily;

  let forecast = document.querySelector("#forecast");

 
  let forecastHtml = `<div class="row"> `;

  weatherForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `<div class="col-2">
                <div class="forecast-date">${formatForecastDay(
                  forecastDay.time
                )}</div>
                <img
                  src="${forecastDay.condition.icon_url}"
                  alt="${forecastDay.condition.description}"
                  width="45"
                />
                <div class="forecast-temp">
                  <span class="forecast-temp-max"> ${Math.round(
                    forecastDay.temperature.maximum
                  )}° </span>
                  <span class="forecast-temp-min"> ${Math.round(
                    forecastDay.temperature.minimum
                  )}° </span>
                </div>
              
          </div> `;
    }
  });
  forecastHtml = forecastHtml + `</div>`;
  forecast.innerHTML = forecastHtml;
}

// Get temperature and related details of the searched city from API and display it.

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
  getForecast(response.data.city);
}
//API call by city name
function search(city) {
  let apiKey = "39e003bc66b7f35722e0c7a5dt3o9140";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
//API call for forecast by city name
function getForecast(city) {
  let apiKey = "39e003bc66b7f35722e0c7a5dt3o9140";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}
//City search function call 
function showSubmit(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search");
  search(citySearch.value);
}

let celsiusTemp = null;

// Get the search form element and add an event listener that listens for the "submit" event.
let form = document.querySelector("#search-form");
form.addEventListener("submit", showSubmit);

//Default city function call
  search("Istanbul");



