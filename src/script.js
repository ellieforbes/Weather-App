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
  let temperatureHeading = document.querySelector("#degree");
  let temperature = Math.round(response.data.main.temp);
  let cityName = document.querySelector("#city-name");
  let humidity = document.querySelector("#humidity");
  let weatherDescription = document.querySelector("#weather-description");
  let windSpeed = document.querySelector("#wind-speed");
  let maxTemp = document.querySelector("#max-temp");
  let minTemp = document.querySelector("#min-temp");
  temperatureHeading.innerHTML = `${temperature}`;
  cityName.innerHTML = response.data.name;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  weatherDescription.innerHTML = response.data.weather[0].description;
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}Km/h`;
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search-bar");
  let displayCity = document.querySelector("#city-name");
  displayCity.innerHTML = cityInput.value;
  let apiKey = "01c7ffeab6acd0da58d3f7be5f5cd432";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function showPosition(position) {
  let apiKey = "01c7ffeab6acd0da58d3f7be5f5cd432";
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
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
