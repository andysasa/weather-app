import { setCurrentWeather } from "./current"
import { setForecastWeather } from "./multi";
import { fahToKel } from "../utils/utils";

// cache DOM
const $searchCity = document.querySelector('.search__city');
const $searchForm = document.querySelector('.search__form');
const $searchInput = document.querySelector('.search__input');
const $spinnerWrapper = document.querySelector('.spinner-wrapper');
const $weather = document.querySelector('.weather');

let location = "Charleston, SC";
let GEO_CODE = "AIzaSyDSLVKk3O6sXhM5ZUMKhK-wbJP5P1ZGDTQ";

export const initializeSearch = _ => {
  updateWeather(location);
  setCity(location);
  eventBinders();
}

const eventBinders = _ => {
  $searchForm.addEventListener('submit', async e => {
    e.preventDefault();
    $searchInput.focus();
    $searchInput.classList.toggle('search__input--open');
    if ($searchInput.value === "") return;
    location = $searchInput.value;
    $searchInput.value = "";
    setCity(location);
    updateWeather(location);
  })
}

const setCity = city => {
  $searchCity.innerHTML = city;
}

const dayOrNight = time => {
  if (time.isDay) {
    $weather.classList.add('weather-day');
  } else {
    $weather.classList.add('weather-night');
  }
}

const updateWeather = async location => {
  const latLng = await getLatLng(location);
  const weatherData = await getWeatherData(latLng.lat, latLng.lng);
  dayOrNight(weatherData.currentData);

  weatherData.currentData.tempF = fahToKel(weatherData.currentData.tempF);
  setCurrentWeather(weatherData);

  weatherData.forecastData.map(elem => {
    elem.maxTempF = fahToKel(elem.maxTempF);
    elem.minTempF = fahToKel(elem.minTempF);
  })
  setForecastWeather(weatherData);
}

const dataLoadingPage = _ => {
  $spinnerWrapper.classList.toggle('spinner-wrapper--active');
}

const getWeatherData = async (lat, lng) => {
  const currentDataLink = `https://rapidapi.p.rapidapi.com/observations/${lat},${lng}`;
  const forecastDataLink = `https://rapidapi.p.rapidapi.com/forecasts/${lat},${lng}`;

  dataLoadingPage();
  const fetchCurrentData = await fetch(currentDataLink, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "aerisweather1.p.rapidapi.com",
      "x-rapidapi-key": "60dd10d605msh6cf86dacbf68d6bp1b3f29jsn37c90cd27d6d"
    }
  });
  const fetchForecastData = await fetch(forecastDataLink, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "aerisweather1.p.rapidapi.com",
      "x-rapidapi-key": "60dd10d605msh6cf86dacbf68d6bp1b3f29jsn37c90cd27d6d"
    }
  });
  dataLoadingPage()

  const parsedCurrentData = await fetchCurrentData.json();
  const parsedForecastData = await fetchForecastData.json();

  const currentData = await parsedCurrentData.response.ob;
  const forecastData = await parsedForecastData.response[0].periods;

  return { currentData, forecastData};
}

const getLatLng = async city => {
  const reqLink = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GEO_CODE}`;
  const fetchLatLng = await fetch(reqLink);
  const parsedLatLng = await fetchLatLng.json();
  const { lat, lng } = await {
    lat: parsedLatLng.results[0].geometry.location.lat,
    lng: parsedLatLng.results[0].geometry.location.lng
  }

  return { lat, lng };
}
