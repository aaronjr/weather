/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

import "./style.css";
import "typeface-roboto";
import getWeatherToday from "./todayWeather"
import getWeatherFourDays from "./fourWeather"
import move from "./move"

// import Icon from './icon.png';

document.addEventListener("DOMContentLoaded", () => {

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

  const control = document.querySelectorAll('.control')
  control.forEach( button => {
    // eslint-disable-next-line func-names
    button.addEventListener('click', function(){  
      // eslint-disable-next-line no-unused-expressions
      this.id === 'buttonRight' ? move('right') : move('left');
    })
  })
});
