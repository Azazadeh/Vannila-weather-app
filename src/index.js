function showTemp(response) {
  let city = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  let currentCondition = document.querySelector("#current-condition");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");

  city.innerHTML = response.data.city;
  temperature.innerHTML = Math.round(response.data.temperature.current);
  currentCondition.innerHTML = response.data.condition.description;
  humidity.innerHTML = response.data.temperature.humidity;
  wind.innerHTML = response.data.wind.speed;

  console.log(response.data);
}
let apiKey = "39e003bc66b7f35722e0c7a5dt3o9140";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Tehran&key=39e003bc66b7f35722e0c7a5dt3o9140&units=metric`;

axios.get(apiUrl).then(showTemp);
