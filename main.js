// Elements
const weatherForm = document.querySelector(".weather-form");
const cityInput = document.getElementById("city-input");
const errorMessage = document.querySelector(".error-message");
const searchBox = document.querySelector(".search-box");
const searchBoxContainer = document.getElementById("search-box-container");
const resultContainer = document.getElementById("result-container");
const backButton = document.querySelector(".back-btn");
const weatherIcon = document.querySelector(".weather-icon");
const temperatureText = document.querySelector(".temperature-text");
const descriptionText = document.querySelector(".description-text");
const cityText = document.querySelector(".city-text");
const feelsLikeText = document.querySelector(".feels-like-text");
const humadityText = document.querySelector(".humadity-text");
const loactionButton = document.querySelector(".device-loc-btn");
// Api Data
const API_KEY = "b991b5715d6b9f34da5e3ace0734bc37";
const API_URL = `http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&q=`;

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (cityInput.value) {
    getWeather(API_URL + cityInput.value);
  }
});

// Get weather from API
const getWeather = (url) => {
  searchBox.classList.add("loading");
  errorMessage.style.display = "none";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // if city not found
      if (data.cod === "404") {
        displayError(data.message);
      } else {
        searchBoxContainer.style.display = "none";
        resultContainer.style.display = "block";
        backButton.style.display = "block";

        displayWeather(data);
      }
    })
    .catch((error) => {
      displayError("An error occurred while fetching the weather data.");
    })
    .finally(() => {
      searchBox.classList.remove("loading");
    });
};

// function to show weather info
const displayWeather = (data) => {
  const { feels_like, humidity, temp } = data.main;
  const { id, description } = data.weather[0];

  if (id == 800) {
    weatherIcon.src = "./assets/suny.png";
  } else if (id >= 801 && id <= 804) {
    weatherIcon.src = "./assets/cloudy.png";
  } else if (id >= 701 && id <= 781) {
    weatherIcon.src = "./assets/windy.png";
  } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
    weatherIcon.src = "./assets/rainy.png";
  } else if (id >= 600 && id <= 622) {
    weatherIcon.src = "./assets/snowy.png";
  } else if (id >= 200 && id <= 232) {
    weatherIcon.src = "./assets/thunder-stormy.png";
  }

  temperatureText.innerHTML = `${temp} °C`;
  descriptionText.innerHTML = description;
  cityText.innerHTML = `${data.name}, ${data.sys.country}`;
  feelsLikeText.innerHTML = `${feels_like} °C`;
  humadityText.innerHTML = `${humidity}%`;
};

// set input direction dynamicly
cityInput.addEventListener("input", () => {
  const inputDirection = isPersian(cityInput.value) ? "rtl" : "ltr";

  cityInput.style.direction = inputDirection;
});

// see if input content is persian or not
const isPersian = (text) => {
  const persianRegex = /[\u0600-\u06FF\u0750-\u077F]/;
  return persianRegex.test(text);
};

// function to back to previous section
backButton.addEventListener("click", () => {
  searchBoxContainer.style.display = "block";
  resultContainer.style.display = "none";
  backButton.style.display = "none";

  cityInput.value = "";
});
// Get lat & lan from use device
loactionButton.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser not support geolocation api ");
  }
});
// When geolocation works successfully
const onSuccess = (position) => {
  searchBox.classList.add("loading");
  const { latitude, longitude } = position.coord;
  getWeather(
    `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
  );
};
// When geolocation had error
const onError = (error) => {
  displayError(error.message);
};
// function to show error
const displayError = (error) => {
  errorMessage.style.display = "block";
  errorMessage.textContent = error;
  searchBox.classList.remove("loading");
};
