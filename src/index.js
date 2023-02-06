function showTemp(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.temperature.current);
}

let apiKey = "39e003bc66b7f35722e0c7a5dt3o9140";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Tehran&key=39e003bc66b7f35722e0c7a5dt3o9140&units=metric`;

axios.get(apiUrl).then(showTemp);
