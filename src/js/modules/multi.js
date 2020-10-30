import { getIcon, toCelFah } from "../utils/utils"
import { setForecastDetails, setCurrentWeather } from "./current";

const $wlist = document.querySelector('.wlist');

let forecastWeather;
let fullWeatherData;
let selectedItem = 0;
let unit = "us";

export const setForecastWeather = newWeather => {
    forecastWeather = newWeather.forecastData;
    fullWeatherData = newWeather;
    render();
}

export const setMultiUnit = selectedUnit => {
    unit = selectedUnit;
    render();
}

export const multiEventBinders = _ => {
    $wlist.addEventListener('click', e => {
        let elem = e.target;

        while (elem && !elem.matches('.wlist__item')) {
            elem = elem.parentElement;
        }

        const selectedIndex = [...elem.parentNode.children].indexOf(elem);
        selectedItem = selectedIndex;

        if (selectedIndex === 0) {
            setCurrentWeather(fullWeatherData);
        } else {
            setForecastDetails(forecastWeather[selectedIndex]);
        }

        render();
    })
}

const getDay = day => {
    const days = ['SUN', 'MONDAY', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const daysIndex = new Date(day * 1000).getDay();
    return days[daysIndex];
}

const render = _ => {
    let markup = '';
    
    for (let i = 0; i < 5; i++) {
        let maxTemp = forecastWeather[i].maxTempF; 
        let minTemp = forecastWeather[i].minTempF;

        markup += `
        <div class="wlist__item ${i === selectedItem ? 'wlist__item--selected' : '' }">
            <img class="wlist__icon" src="${getIcon(forecastWeather[i].icon)}">
            </img>
            <div class="wlist__range">
                ${toCelFah(maxTemp, unit)} / ${toCelFah(minTemp, unit)}
            </div>
            <div class="wlist__day">
                ${getDay(forecastWeather[i].timestamp)}
            </div>
        </div>
        `    
    }
    
    $wlist.innerHTML = markup;
}