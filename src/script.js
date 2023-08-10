function displayDate() {
  let currentDate = new Date();
  let currentHour = currentDate.getHours();
  let currentMinute = currentDate.getMinutes();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  let currentDay = days[currentDate.getDay()];
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let currentMonth = months[currentDate.getMonth()];
  let currentDates = currentDate.getDate();
  let formattedDate = `${currentDay}, ${currentDates} ${currentMonth}
${currentHour}:${currentMinute}`;
  let dateAndTime = document.querySelector("#date");
  dateAndTime.innerHTML = formattedDate;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
          <div class="weather-forecast-date">
          ${formatDay(forecastDay.time)}
          </div>
          <div class="weather-icon"><img src="${
            forecastDay.condition.icon_url
          }" alt="" width=42 /></div>
          <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temperature.maximum
          )}° </span>
          <span class="weather-forecast-temperature-min">${Math.round(
            forecastDay.temperature.minimum
          )}°</span>
          </div>
        </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "b5a70e3dbaf3379o5576fffe161ca0t4";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let temperatureHeading = document.querySelector("#degree");
  let cityName = document.querySelector("#city-name");
  let humidity = document.querySelector("#humidity");
  let weatherDescription = document.querySelector("#weather-description");
  let windSpeed = document.querySelector("#wind-speed");
  let feelsLike = document.querySelector("#max-temp");
  celsiusTemperature = response.data.temperature.current;

  let iconElement = document.querySelector("#icon");
  temperatureHeading.innerHTML = Math.round(celsiusTemperature);
  cityName.innerHTML = response.data.city;
  humidity.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  weatherDescription.innerHTML = response.data.condition.description;
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}Km/h`;
  feelsLike.innerHTML = `${Math.round(response.data.temperature.feels_like)}°C`;

  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "b5a70e3dbaf3379o5576fffe161ca0t4";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search-bar");
  let displayCity = document.querySelector("#city-name");
  search(cityInput.value);
}

function showPosition(position) {
  let apiKey = "b5a70e3dbaf3379o5576fffe161ca0t4";
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function displayCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degree");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#degree");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", handleSubmit);

let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", displayCurrentPosition);

let fahrenheitLink = document.querySelector("#farenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

displayDate();
search("London");
