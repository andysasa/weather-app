import { getAnimatedIcon, toCelFah } from "../utils/utils"

const $currentIcon = document.querySelector('.current__icon');
const $currentSummary = document.querySelector('.current__summary');
const $currentTemp = document.querySelector('.current__temp-num');
const $currentWind = document.querySelector('.current__wind span');
const $currentHumidity = document.querySelector('.current__humidity span');
const $currentPrecip = document.querySelector('.current__precipitation span');

let currentWeather;
let unit = "us";

const currentOrForecast = _ => {
    let maxTemp = currentWeather.maxTempF;
    let minTemp = currentWeather.minTempF;
    let currTemp = currentWeather.tempF;

    if (!currentWeather.tempF) {
        return `${toCelFah(maxTemp, unit)}&#176;/ ${toCelFah(minTemp, unit)}&#176;`;
    } else {
        return `${toCelFah(currTemp, unit)} &#176;`;
    }
}

export const setCurrentWeather = newWeather => {
    currentWeather = newWeather.currentData;
    render();
}

export const setCurrentUnit = selectedUnit => {
    unit = selectedUnit;
    render();
}

export const setForecastDetails = forecast => {
    currentWeather = forecast;
    render();
}

const render = _ => {
    $currentIcon.innerHTML = getAnimatedIcon(currentWeather.icon);
    $currentSummary.textContent = currentWeather.weather;
    $currentTemp.innerHTML = currentOrForecast();
    $currentWind.innerHTML = currentWeather.windSpeedMPH;
    $currentHumidity.innerHTML = currentWeather.humidity;
    $currentPrecip.innerHTML = currentWeather.precipMM;

}