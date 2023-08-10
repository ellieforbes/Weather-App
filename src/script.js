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

function showWeather(response) {
  console.log(response.data);
  let temperatureHeading = document.querySelector("#degree");
  let temperature = Math.round(response.data.temperature.current);
  let cityName = document.querySelector("#city-name");
  let humidity = document.querySelector("#humidity");
  let weatherDescription = document.querySelector("#weather-description");
  let windSpeed = document.querySelector("#wind-speed");
  let feelsLike = document.querySelector("#max-temp");

  let iconElement = document.querySelector("#icon");
  temperatureHeading.innerHTML = `${temperature}`;
  cityName.innerHTML = response.data.city;
  humidity.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  weatherDescription.innerHTML = response.data.condition.description;
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}Km/h`;
  feelsLike.innerHTML = `${Math.round(response.data.temperature.feels_like)}°C`;

  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.description);
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search-bar");
  let displayCity = document.querySelector("#city-name");
  displayCity.innerHTML = cityInput.value;
  let apiKey = "b5a70e3dbaf3379o5576fffe161ca0t4";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput.value}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
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

displayDate();

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", searchCity);

let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", displayCurrentPosition);
