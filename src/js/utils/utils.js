import cloudy from "./../../images/cloudy.png";
import rainy from "./../../images/rainy.png";
import sunny from "./../../images/sunny.png";
import stormy from "./../../images/stormy.png";
import windy from "./../../images/windy.png";

export const fahToKel = temp => {
  return (temp + 459.67) * (5 / 9);
};

export const kelToCelcius = temp => {
  return temp - 273.15;
};

export const kelToFahrenheit = temp => {
  return temp * (9 / 5) - 459.67;
};

export const toCelFah = (temp, unit) => {
  if (unit === "us") {
    return Math.round(kelToFahrenheit(temp));
  }
  return Math.round(kelToCelcius(temp));
};

export const getIcon = description => {
  switch (description) {
    case "clear.png":
    case "clear-night":
    case "sunny.png":
    case "fair.png":
      return sunny;

    case "rain.png":
    case "rainn.png":
    case "showers.png":
    case "showersn.png":
    case "drizzle.png":
      return rainy;

    case "snow.png":
    case "snown.png":
    case "snoww.png":
    case "snowwn.png":
    case "blizzard.png":
      return rainy;

    case "wind.png":
      return windy;

    case "cloudy.png":
    case "mcloudy.png":
    case "mcloudyr.png":
    case "pcloudy.png":
    case "pcloudyr.png":
      return cloudy;

    case "tstorm.png":
    case "tstorms.png":
    case "hail":
    case "tornado":
    case "rainandsnow.png":
    case "pcloudyt.png":
      return stormy;
    default:
      return sunny;
  }
};

export const getAnimatedIcon = description => {
  switch (description) {
    case "clear.png":
    case "clear-night":
    case "sunny.png":
      return `
        <div class="icon sunny">
          <div class="sun">
            <div class="rays"></div>
          </div>
        </div>
      `;

    case "rain.png":
    case "rainn.png":
    case "showers.png":
    case "showersn.png":
    case "drizzle.png":
      return `
        <div class="icon rainy">
          <div class="cloud"></div>
          <div class="rain"></div>
        </div>
      `;

    case "snow.png":
    case "snown.png":
    case "snoww.png":
    case "snowwn.png":
    case "blizzard.png":
      return `
        <div class="icon flurries">
          <div class="cloud"></div>
          <div class="snow">
            <div class="flake"></div>
            <div class="flake"></div>
          </div>
        </div>
      `;

    case "wind.png":
    case "cloudy.png":
    case "mcloudy.png":
    case "mcloudyr.png":
    case "pcloudy.png":
    case "pcloudyr.png":
    case "pcloudyt.png":
      return `
        <div class="icon cloudy">
          <div class="cloud"></div>
          <div class="cloud"></div>
        </div>
      `;

    case "tstorm.png":
    case "tstorms.png":
    case "hail":
    case "tornado":
      return `
        <div class="icon thunder-storm">
          <div class="cloud"></div>
          <div class="lightning">
            <div class="bolt"></div>
            <div class="bolt"></div>
          </div>
        </div>
      `;
    default:
      return `
        <div class="icon sunny">
          <div class="sun">
            <div class="rays"></div>
          </div>
        </div>
      `;
  }
};
