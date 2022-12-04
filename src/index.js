/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
// 8b05adff7a43d479faf0fb11bb35a2d8
// https://api.openweathermap.org/data/2.5/weather?q=London&APPID=8b05adff7a43d479faf0fb11bb35a2d8
// unit=imperial -- for Fahrenheit.
// img.src = `http://openweathermap.org/img/w/${icon}.png`

import "./style.css";
import "typeface-roboto";
// import Icon from './icon.png';

document.addEventListener("DOMContentLoaded", () => {
  // clear out existing page
  function clear(input) {
    const where = document.querySelector(`.${input}`);
    while (where.firstChild) {
      where.removeChild(where.lastChild);
    }
  }
  // add today's forecast to page
  function addto(where, info) {
    clear(where);
    // check for image else just add to correct div
    if (where === "icon") {
      const image = document.createElement("img");
      image.className = "iconimg";
      image.alt = "Today's weather icon";
      image.src = `http://openweathermap.org/img/w/${info}.png`;
      document.querySelector(".icon").append(image);
    } else {
      const p = document.createElement("p");
      p.className = `${where}Writting`;
      p.textContent = info;
      document.querySelector(`.${where}`).append(p);
    }
  }

  // get today's weather async
  async function getWeatherToday(city) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=8b05adff7a43d479faf0fb11bb35a2d8&units=metric`
    );
    const data = await response.json();

    // get needed info
    const clouds = data.clouds.all;
    const feels = Math.round(data.main.feels_like);
    const { humidity } = data.main;
    const windSpeed = data.wind.speed;
    const temp = Math.round(data.main.temp);
    const sunriseData = new Date(data.sys.sunrise * 1000);
    const riseHours = sunriseData.getHours();
    const riseMinutes = `0${sunriseData.getMinutes()}`;
    const sunrise = `${riseHours}:${riseMinutes.substr(-2)}`;
    const sunsetData = new Date(data.sys.sunset * 1000);
    const setHours = sunsetData.getHours();
    const setMinutes = `0${sunsetData.getMinutes()}`;
    const sunset = `${setHours}:${setMinutes.substr(-2)}`;
    const description = data.weather[0].main;
    const { icon } = data.weather[0];
    const location = data.name;
    const degree = "\u00B0";

    // add to a lise
    const listofinfo = [
      `Cloudiness: ${clouds}%`,
      `Feels like: ${feels}${degree}C`,
      `Humidity: ${humidity}%`,
      `Wind speed: ${windSpeed}`,
      `${temp}${degree}C`,
      `Sunrise: ${sunrise}`,
      `Sunset: ${sunset}`,
      `${description}`,
      icon,
      location,
    ];

    // list of divs in HTML file
    const listoflocations = [
      "clouds",
      "feels",
      "humidity",
      "windSpeed",
      "temp",
      "sunrise",
      "sunset",
      "description",
      "icon",
      "city",
    ];

    // loop over and add to correct place
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const item in listofinfo) {
      addto(listoflocations[item], listofinfo[item]);
    }
  }

  // forecast weather
  async function getWeatherFourDays(city) {
    clear("forecast");
    const cityResponse = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=8b05adff7a43d479faf0fb11bb35a2d8`
    );
    const cityData = await cityResponse.json();
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${cityData[0].lat}&lon=${cityData[0].lon}&appid=8b05adff7a43d479faf0fb11bb35a2d8&units=metric`
    );
    const data = await response.json();

    // counter for boxid
    let counter = 0;

    const seperate = [];
    let next = [];
    let item = 0;

    for (item; item < data.list.length; item++) {
      const date = new Date(data.list[item].dt_txt);
      const today = new Date();

      if (today.toDateString() === date.toDateString()) {
        const first = [];
        if (
          today.toDateString() !==
          new Date(data.list[item + 1].dt_txt).toDateString()
        ) {
          first.push(data.list.slice(0, item + 1));
          seperate.push(first);
        }
      } else if (
        !(today.toDateString() === date.toDateString()) &&
        data.list.length > item + 8
      ) {
        next.push(data.list.slice([item], item + 8));
        item += 7;
        seperate.push(next);
        next = [];
      } else if (data.list.length < item + 8) {
        next.push(data.list.slice([item]));
        item = data.list.length;
        seperate.push(next);
      }
    }

    for (const day in seperate) {
      const d = day;
      const date = new Date(seperate[day][0][0].dt_txt);
      const today = new Date();
      // create day box
      const todayBox = document.createElement("div");
      todayBox.className = "todayBox";
      todayBox.setAttribute("id", `day${d}`);
      const p = document.createElement("p");
      p.textContent =
        today.toDateString() === date.toDateString()
          ? "Today"
          : date.toLocaleString("en-uk", { weekday: "long" });
      todayBox.append(p);
      document.querySelector(".forecast").append(todayBox);
      const thisDay = seperate[day][0];
      for (const hour in thisDay) {
        // get it's date and today's date
        // eslint-disable-next-line no-shadow
        const date = new Date(thisDay[hour].dt_txt);
        // data.list[day]
        // console.log()
        const degree = "\u00B0";

        // get info and set strings
        // eslint-disable-next-line max-len
        // const day = today.toDateString() === date.toDateString() ? 'Today' : date.toLocaleString('en-uk', {weekday:'long'})
        const hours =
          date.getHours().toString().length === 2
            ? `${date.getHours()}:00`
            : `0${date.getHours()}:00`;
        const { icon } = thisDay[hour].weather[0];
        const temp = `${Math.round(thisDay[hour].main.temp)}${degree}C`;
        const rain = `${Math.round(thisDay[hour].pop * 100)}%`;

        // add to a list
        const listofinfo = [hours, icon, temp, rain];

        // create a box, set ID and class
        const box = document.createElement("div");
        box.className = "forecastBox";
        box.setAttribute("id", `box${counter}`);
        document.getElementById(`day${d}`).append(box);

        // add each bit of info to list, checking for an image
        // eslint-disable-next-line no-restricted-syntax
        for (item in listofinfo) {
          const small = document.createElement("div");
          small.className = "smallDiv";
          if (item !== 1) {
            small.textContent = listofinfo[item];
          } else {
            const image = document.createElement("img");
            image.src = `http://openweathermap.org/img/w/${listofinfo[item]}.png`;
            small.append(image);
          }
          // add to page
          document.getElementById(`box${counter}`).append(small);
        }
        // increase counter for next box
        counter += 1;
      }
    }
  }
  // get form and add event listener
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    // stop full submit
    event.preventDefault();
    // pass through to get today's weather
    getWeatherToday(form.city.value).catch(() => {
      form.city.setCustomValidity("City not found");
      form.city.reportValidity();
    });
    getWeatherFourDays(form.city.value);
    // .catch(() => {
    //     form.city.setCustomValidity('City not found')
    //     form.city.reportValidity()
    // })
  });

  // allow user to change input to valid city,
  // after bad response.
  form.addEventListener("keyup", () => {
    form.city.setCustomValidity("");
    form.city.reportValidity();
  });
});
