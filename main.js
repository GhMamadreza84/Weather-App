// Elements
const cityInput = document.getElementById("city-input");
const weatherForm = document.querySelector(".weather-form");
const errorMessage = document.querySelector(".error-message");
const searchBox = document.querySelector(".search-box");
const searchBoxContainer = document.getElementById("search-box-container");
const resultContainer = document.getElementById("result-container");
const backButton = document.querySelector(".back-btn");
// Api Data
const API_KEY = "b991b5715d6b9f34da5e3ace0734bc37";
const API_URL = `http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&q=`;

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (cityInput) {
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
      // If city not found
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
      displayError("An error occurred while fetching the weather data");
    })
    .finally(() => {
      searchBox.classList.remove("loading");
    });
};
// Function to back to previous section
backButton.addEventListener("click", () => {
  searchBoxContainer.style.display = "block";
  resultContainer.style.display = "none";
  backButton.style.display = "none";
  cityInput.value = "";
});
// Function to show weather info
const displayWeather = () => {};
// Function to show error
const displayError = (error) => {
  errorMessage.style.display = "block";
  errorMessage.textContent = error;
};
