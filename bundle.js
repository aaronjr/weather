/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/addFour.js":
/*!************************!*\
  !*** ./src/addFour.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addFourToPage)
/* harmony export */ });
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

// Degree symbol
const degree = "\u00B0";
function addFourToPage(seperate, measure) {
  // counter for boxid
  let counter = 0;
  // loop over each day
  for (const day in seperate) {
    // today and new date based on the input
    const date = new Date(seperate[day][0][0].dt_txt);
    const today = new Date();

    // create day box
    const todayBox = document.createElement("div");
    todayBox.className = "todayBox";
    todayBox.setAttribute("id", `day${day}`);

    // title of box
    const p = document.createElement("p");
    p.textContent = today.toDateString() === date.toDateString() ? "Today" : date.toLocaleString("en-uk", {
      weekday: "long"
    });

    // add to box
    todayBox.append(p);

    // add box to page
    document.querySelector(".view").append(todayBox);

    // data of this day
    const thisDay = seperate[day][0];

    // for each hour of this day
    for (const hour in thisDay) {
      // get it's date and today's date
      // eslint-disable-next-line no-shadow
      const date = new Date(thisDay[hour].dt_txt);

      // get info and set strings
      const hours = date.getHours().toString().length === 2 ? `${date.getHours()}:00` : `0${date.getHours()}:00`;
      const {
        icon
      } = thisDay[hour].weather[0];
      const temp = measure === 'C' ? `${Math.round(thisDay[hour].main.temp)}${degree}C` : `${Math.round(thisDay[hour].main.temp)}${degree}F`;

      // add to a list
      const listofinfo = [hours, icon, temp];

      // create a box for each hour, set ID and class
      const box = document.createElement("div");
      box.className = "forecastBox";
      box.setAttribute("id", `box${counter}`);
      document.getElementById(`day${day}`).append(box);

      // add each bit of info for the hour, checking for an image
      // eslint-disable-next-line no-restricted-syntax
      for (const item in listofinfo) {
        const small = document.createElement("div");
        small.className = measure === 'C' ? "smallDiv degreeOfC" : "smallDiv degreeOfF";
        if (item !== '1') {
          small.textContent = listofinfo[item];
        } else {
          const image = document.createElement("img");
          image.src = `https://openweathermap.org/img/wn/${listofinfo[item]}@2x.png`;
          image.className = 'icons';
          small.append(image);
        }
        small.style.display = small.className === "smallDiv degreeOfC" ? 'block' : 'none';
        // add to page
        document.getElementById(`box${counter}`).append(small);
      }
      // increase counter for next box
      counter += 1;
    }
  }
}

/***/ }),

/***/ "./src/emptyTop.js":
/*!*************************!*\
  !*** ./src/emptyTop.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ emptyTop)
/* harmony export */ });
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions */ "./src/functions.js");

function emptyTop() {
  // list of divs in HTML file
  const listoflocations = ["clouds", "feels", "humidity", "windSpeed", "temp", "sunrise", "sunset", "description", "icon", "city"];

  // clear each entry on new search
  listoflocations.forEach(item => {
    (0,_functions__WEBPACK_IMPORTED_MODULE_0__.clear)(item);
  });
}

/***/ }),

/***/ "./src/fourWeather.js":
/*!****************************!*\
  !*** ./src/fourWeather.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWeatherFourDays)
/* harmony export */ });
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions */ "./src/functions.js");
/* harmony import */ var _addFour__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addFour */ "./src/addFour.js");
/* harmony import */ var _getDays__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDays */ "./src/getDays.js");
/* harmony import */ var _switchUnit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./switchUnit */ "./src/switchUnit.js");
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */





// forecast weather
async function getWeatherFourDays(city) {
  // remove existing data if second search 
  document.querySelector('.buttonHolder').style.display = 'flex';

  // clear bottom section
  (0,_functions__WEBPACK_IMPORTED_MODULE_0__.clear)("view");

  // set all circles to be white
  const circles = document.querySelectorAll('.circle');
  circles.forEach(circle => {
    // eslint-disable-next-line no-param-reassign
    circle.style.backgroundColor = 'white';
  });

  // set first circle to active
  document.getElementById(`circle0`).style.backgroundColor = 'black';

  // get city long and lat details
  const cityResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=8b05adff7a43d479faf0fb11bb35a2d8`, {
    mode: 'cors'
  });
  const cityData = await cityResponse.json();

  // pass long and lat into second API, one for metric one for imperial
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityData[0].lat}&lon=${cityData[0].lon}&appid=8b05adff7a43d479faf0fb11bb35a2d8&units=metric`, {
    mode: 'cors'
  });
  const responseTwo = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityData[0].lat}&lon=${cityData[0].lon}&appid=8b05adff7a43d479faf0fb11bb35a2d8&units=imperial`, {
    mode: 'cors'
  });

  // convert to JSON
  const data = await response.json();
  const dataTwo = await responseTwo.json();

  // seperate into each day
  const seperate = (0,_getDays__WEBPACK_IMPORTED_MODULE_2__["default"])(data);
  const seperateTwo = (0,_getDays__WEBPACK_IMPORTED_MODULE_2__["default"])(dataTwo);

  // pass seperated array into this function
  // to be added to page
  (0,_addFour__WEBPACK_IMPORTED_MODULE_1__["default"])(seperate, 'C');
  (0,_addFour__WEBPACK_IMPORTED_MODULE_1__["default"])(seperateTwo, 'F');

  // allow switch of measurements
  (0,_switchUnit__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./src/functions.js":
/*!**************************!*\
  !*** ./src/functions.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addto": () => (/* binding */ addto),
/* harmony export */   "clear": () => (/* binding */ clear)
/* harmony export */ });
/* eslint-disable import/prefer-default-export */
// clear out existing page
function clear(input) {
  const where = document.querySelector(`.${input}`);
  while (where.firstChild) {
    where.removeChild(where.lastChild);
  }
}

// add today's forecast to page
function addto(where, info, degree) {
  // check for image else just add to correct div
  if (where === "icon") {
    const image = document.createElement("img");
    image.className = `iconimg degreeOf${degree}`;
    image.alt = "Today's weather icon";
    image.src = `https://openweathermap.org/img/wn/${info}@2x.png`;
    image.style.display = degree === 'C' ? 'block' : 'none';
    document.querySelector(".icon").append(image);
  } else {
    const p = document.createElement("p");
    p.className = `${where}Writting degreeOf${degree}`;
    p.textContent = info;
    p.style.display = degree === 'C' ? 'block' : 'none';
    document.querySelector(`.${where}`).append(p);
  }
}

/***/ }),

/***/ "./src/getDays.js":
/*!************************!*\
  !*** ./src/getDays.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDays)
/* harmony export */ });
function getDays(data) {
  // empty arrays to later be filled
  const seperate = [];
  let next = [];
  let item = 0;
  const today = new Date();

  // splits the whole array into days
  for (item; item < data.list.length; item += 1) {
    // new date and todays
    const date = new Date(data.list[item].dt_txt);

    // check if today
    if (today.toDateString() === date.toDateString()) {
      // empty array
      const first = [];
      // check until the next day does not equal today
      // add it to the array and push to the seperate array
      if (today.toDateString() !== new Date(data.list[item + 1].dt_txt).toDateString()) {
        first.push(data.list.slice(0, item + 1));
        seperate.push(first);
      }
      // if not today and more than 8 items in the array left
    } else if (!(today.toDateString() === date.toDateString()) && data.list.length >= item + 8) {
      // push the next 8 hour slots into next then add to seperate in it's own array
      next.push(data.list.slice([item], item + 8));
      item += 7;
      seperate.push(next);
      next = [];
      // if the last day add to next then to seperate
    } else if (data.list.length < item + 8) {
      next.push(data.list.slice([item]));
      item = data.list.length;
      seperate.push(next);
    }
  }

  // return new array
  return seperate;
}

/***/ }),

/***/ "./src/move.js":
/*!*********************!*\
  !*** ./src/move.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ move)
/* harmony export */ });
// count which slide user is on
let counter = 0;
const circles = document.querySelectorAll('.circle');
function move(d) {
  if (d === 'right' && counter !== 5) {
    // check fot not exceding and increase by one
    counter += 1;
  } else if (d === 'left' && counter !== 0) {
    // check fot not exceding and increase by one
    counter -= 1;
  } else {
    // do nothing
  }
  // set all circles to white
  circles.forEach(circle => {
    // eslint-disable-next-line no-param-reassign
    circle.style.backgroundColor = 'white';
  });

  // change the correct circle to black
  document.getElementById(`circle${counter}`).style.backgroundColor = 'black';

  // hide all boxes
  const boxes = document.querySelectorAll('.todayBox');
  boxes.forEach(b => {
    // eslint-disable-next-line no-param-reassign
    b.style.display = 'none';
  });

  // show correct box
  const box = document.getElementById(`day${counter}`);
  box.style.display = "flex";
}

/***/ }),

/***/ "./src/moveBottom.js":
/*!***************************!*\
  !*** ./src/moveBottom.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ moveBottom)
/* harmony export */ });
function moveBottom() {
  // get container
  const bottom = document.querySelector(".bottom");

  // reset to 0
  bottom.scrollLeft = 0;

  // move by 1 pixel
  const moveBar = setInterval(() => {
    bottom.scrollLeft += 1;
  }, 10);

  // stop after moving bar after 8000
  setInterval(() => {
    clearInterval(moveBar);
  }, 15000);

  // ontouch stop movement
  document.getElementById("search").addEventListener("click", () => {
    clearInterval(moveBar);
  });

  // // on new search stop event so it can restart
  bottom.addEventListener("mouseover", () => {
    clearInterval(moveBar);
  });

  // on touch - phone, stop movebar
  bottom.addEventListener("touchstart", () => {
    clearInterval(moveBar);
  });

  // on touch - phone, stop movebar
  bottom.addEventListener("touchmove", () => {
    clearInterval(moveBar);
  });
}

/***/ }),

/***/ "./src/switchUnit.js":
/*!***************************!*\
  !*** ./src/switchUnit.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ switchUnit)
/* harmony export */ });
// choice of measurment to display
let choice = '';
function switchUnit() {
  // Degree symbol
  const degree = "\u00B0";

  // get all required elements
  const degrees = document.querySelectorAll('.choice');
  const allC = document.querySelectorAll('.degreeOfC');
  const allF = document.querySelectorAll('.degreeOfF');

  // eslint-disable-next-line prefer-arrow-callback
  // loop through each choice
  degrees.forEach(element => {
    // eslint-disable-next-line prefer-arrow-callback
    // add event listener to each
    element.addEventListener('click', () => {
      // either hide one and show the other
      document.querySelector('.C').classList.toggle('hide');
      document.querySelector('.F').classList.toggle('hide');

      // set preference of C or F
      choice = element.textContent === `${degree}C` ? 'F' : 'C';

      // check for the choice and show / hide as neccesary
      if (choice === `C`) {
        allF.forEach(item => {
          // eslint-disable-next-line no-param-reassign
          item.style.display = 'none';
        });
        allC.forEach(item => {
          // eslint-disable-next-line no-param-reassign
          item.style.display = 'block';
        });
      } else {
        allF.forEach(item => {
          // eslint-disable-next-line no-param-reassign
          item.style.display = 'block';
        });
        allC.forEach(item => {
          // eslint-disable-next-line no-param-reassign
          item.style.display = 'none';
        });
      }
    });
  });
}

/***/ }),

/***/ "./src/todayInfo.js":
/*!**************************!*\
  !*** ./src/todayInfo.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ todayInfo)
/* harmony export */ });
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions */ "./src/functions.js");

let counter = 0;
function todayInfo(data, symbol) {
  console.log("todayinfo");
  // get needed info
  const clouds = data.clouds.all;
  const feels = Math.round(data.main.feels_like);
  const {
    humidity
  } = data.main;
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
  const {
    icon
  } = data.weather[0];
  const location = data.name;
  const degree = "\u00B0";

  // change for F or C
  const displayTemp = symbol === 'C' ? `${temp}${degree}C` : `${temp}${degree}F`;
  const displayWind = symbol === 'C' ? `Wind speed: ${windSpeed} meter/sec` : `Wind speed: ${windSpeed} miles/hour`;

  // add to a list
  const listofinfo = [`Cloudiness: ${clouds}%`, `Feels like: ${feels}${degree}C`, `Humidity: ${humidity}%`, displayWind, displayTemp, `Sunrise: ${sunrise}`, `Sunset: ${sunset}`, `${description}`, icon, location];

  // list of divs in HTML file
  const listoflocations = ["clouds", "feels", "humidity", "windSpeed", "temp", "sunrise", "sunset", "description", "icon", "city"];

  // loop over and add to correct place
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const item in listofinfo) {
    (0,_functions__WEBPACK_IMPORTED_MODULE_0__.addto)(listoflocations[item], listofinfo[item], symbol);
  }
  if (counter === 0) {
    document.querySelector(".top-section").className += " borders";
    document.querySelector(".forecast").className += " borders";
    document.querySelector(".bottom").className += " bottomBorderTop";
    counter += 1;
  }
}

/***/ }),

/***/ "./src/todayWeather.js":
/*!*****************************!*\
  !*** ./src/todayWeather.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWeatherToday)
/* harmony export */ });
/* harmony import */ var _moveBottom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moveBottom */ "./src/moveBottom.js");
/* harmony import */ var _todayInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todayInfo */ "./src/todayInfo.js");
/* harmony import */ var _emptyTop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./emptyTop */ "./src/emptyTop.js");




// get today's weather async
async function getWeatherToday(city) {
  // clear info ready for new info and avoid duplications
  (0,_emptyTop__WEBPACK_IMPORTED_MODULE_2__["default"])();
  // two fetch, one for C and one for F
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=8b05adff7a43d479faf0fb11bb35a2d8&units=metric`, {
    mode: 'cors'
  });
  const responseF = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=8b05adff7a43d479faf0fb11bb35a2d8&units=imperial`, {
    mode: 'cors'
  });
  const data = await response.json();
  const dataF = await responseF.json();
  (0,_todayInfo__WEBPACK_IMPORTED_MODULE_1__["default"])(data, 'C');
  (0,_todayInfo__WEBPACK_IMPORTED_MODULE_1__["default"])(dataF, 'F');

  // load moving container
  (0,_moveBottom__WEBPACK_IMPORTED_MODULE_0__["default"])();
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/typeface-roboto/index.css":
/*!**************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/typeface-roboto/index.css ***!
  \**************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-100.woff2 */ "./node_modules/typeface-roboto/files/roboto-latin-100.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-100.woff */ "./node_modules/typeface-roboto/files/roboto-latin-100.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-100italic.woff2 */ "./node_modules/typeface-roboto/files/roboto-latin-100italic.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-100italic.woff */ "./node_modules/typeface-roboto/files/roboto-latin-100italic.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-300.woff2 */ "./node_modules/typeface-roboto/files/roboto-latin-300.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-300.woff */ "./node_modules/typeface-roboto/files/roboto-latin-300.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_6___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-300italic.woff2 */ "./node_modules/typeface-roboto/files/roboto-latin-300italic.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_7___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-300italic.woff */ "./node_modules/typeface-roboto/files/roboto-latin-300italic.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_8___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-400.woff2 */ "./node_modules/typeface-roboto/files/roboto-latin-400.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_9___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-400.woff */ "./node_modules/typeface-roboto/files/roboto-latin-400.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_10___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-400italic.woff2 */ "./node_modules/typeface-roboto/files/roboto-latin-400italic.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_11___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-400italic.woff */ "./node_modules/typeface-roboto/files/roboto-latin-400italic.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_12___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-500.woff2 */ "./node_modules/typeface-roboto/files/roboto-latin-500.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_13___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-500.woff */ "./node_modules/typeface-roboto/files/roboto-latin-500.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_14___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-500italic.woff2 */ "./node_modules/typeface-roboto/files/roboto-latin-500italic.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_15___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-500italic.woff */ "./node_modules/typeface-roboto/files/roboto-latin-500italic.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_16___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-700.woff2 */ "./node_modules/typeface-roboto/files/roboto-latin-700.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_17___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-700.woff */ "./node_modules/typeface-roboto/files/roboto-latin-700.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_18___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-700italic.woff2 */ "./node_modules/typeface-roboto/files/roboto-latin-700italic.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_19___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-700italic.woff */ "./node_modules/typeface-roboto/files/roboto-latin-700italic.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_20___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-900.woff2 */ "./node_modules/typeface-roboto/files/roboto-latin-900.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_21___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-900.woff */ "./node_modules/typeface-roboto/files/roboto-latin-900.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_22___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-900italic.woff2 */ "./node_modules/typeface-roboto/files/roboto-latin-900italic.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_23___ = new URL(/* asset import */ __webpack_require__(/*! ./files/roboto-latin-900italic.woff */ "./node_modules/typeface-roboto/files/roboto-latin-900italic.woff"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_6___);
var ___CSS_LOADER_URL_REPLACEMENT_7___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_7___);
var ___CSS_LOADER_URL_REPLACEMENT_8___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_8___);
var ___CSS_LOADER_URL_REPLACEMENT_9___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_9___);
var ___CSS_LOADER_URL_REPLACEMENT_10___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_10___);
var ___CSS_LOADER_URL_REPLACEMENT_11___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_11___);
var ___CSS_LOADER_URL_REPLACEMENT_12___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_12___);
var ___CSS_LOADER_URL_REPLACEMENT_13___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_13___);
var ___CSS_LOADER_URL_REPLACEMENT_14___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_14___);
var ___CSS_LOADER_URL_REPLACEMENT_15___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_15___);
var ___CSS_LOADER_URL_REPLACEMENT_16___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_16___);
var ___CSS_LOADER_URL_REPLACEMENT_17___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_17___);
var ___CSS_LOADER_URL_REPLACEMENT_18___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_18___);
var ___CSS_LOADER_URL_REPLACEMENT_19___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_19___);
var ___CSS_LOADER_URL_REPLACEMENT_20___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_20___);
var ___CSS_LOADER_URL_REPLACEMENT_21___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_21___);
var ___CSS_LOADER_URL_REPLACEMENT_22___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_22___);
var ___CSS_LOADER_URL_REPLACEMENT_23___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_23___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* roboto-100normal - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 100;\n  src:\n    local('Roboto Thin '),\n    local('Roboto-Thin'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format('woff2'), /* Super Modern Browsers */\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format('woff'); /* Modern Browsers */\n}\n\n/* roboto-100italic - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: italic;\n  font-display: swap;\n  font-weight: 100;\n  src:\n    local('Roboto Thin italic'),\n    local('Roboto-Thinitalic'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format('woff2'), /* Super Modern Browsers */\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") format('woff'); /* Modern Browsers */\n}\n\n/* roboto-300normal - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 300;\n  src:\n    local('Roboto Light '),\n    local('Roboto-Light'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ") format('woff2'), /* Super Modern Browsers */\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ") format('woff'); /* Modern Browsers */\n}\n\n/* roboto-300italic - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: italic;\n  font-display: swap;\n  font-weight: 300;\n  src:\n    local('Roboto Light italic'),\n    local('Roboto-Lightitalic'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ") format('woff2'), /* Super Modern Browsers */\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + ") format('woff'); /* Modern Browsers */\n}\n\n/* roboto-400normal - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 400;\n  src:\n    local('Roboto Regular '),\n    local('Roboto-Regular'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + ") format('woff2'), /* Super Modern Browsers */\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_9___ + ") format('woff'); /* Modern Browsers */\n}\n\n/* roboto-400italic - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: italic;\n  font-display: swap;\n  font-weight: 400;\n  src:\n    local('Roboto Regular italic'),\n    local('Roboto-Regularitalic'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_10___ + ") format('woff2'), /* Super Modern Browsers */\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_11___ + ") format('woff'); /* Modern Browsers */\n}\n\n/* roboto-500normal - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 500;\n  src:\n    local('Roboto Medium '),\n    local('Roboto-Medium'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_12___ + ") format('woff2'), /* Super Modern Browsers */\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_13___ + ") format('woff'); /* Modern Browsers */\n}\n\n/* roboto-500italic - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: italic;\n  font-display: swap;\n  font-weight: 500;\n  src:\n    local('Roboto Medium italic'),\n    local('Roboto-Mediumitalic'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_14___ + ") format('woff2'), /* Super Modern Browsers */\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_15___ + ") format('woff'); /* Modern Browsers */\n}\n\n/* roboto-700normal - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 700;\n  src:\n    local('Roboto Bold '),\n    local('Roboto-Bold'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_16___ + ") format('woff2'), /* Super Modern Browsers */\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_17___ + ") format('woff'); /* Modern Browsers */\n}\n\n/* roboto-700italic - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: italic;\n  font-display: swap;\n  font-weight: 700;\n  src:\n    local('Roboto Bold italic'),\n    local('Roboto-Bolditalic'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_18___ + ") format('woff2'), /* Super Modern Browsers */\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_19___ + ") format('woff'); /* Modern Browsers */\n}\n\n/* roboto-900normal - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 900;\n  src:\n    local('Roboto Black '),\n    local('Roboto-Black'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_20___ + ") format('woff2'), /* Super Modern Browsers */\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_21___ + ") format('woff'); /* Modern Browsers */\n}\n\n/* roboto-900italic - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: italic;\n  font-display: swap;\n  font-weight: 900;\n  src:\n    local('Roboto Black italic'),\n    local('Roboto-Blackitalic'),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_22___ + ") format('woff2'), /* Super Modern Browsers */\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_23___ + ") format('woff'); /* Modern Browsers */\n}\n\n", "",{"version":3,"sources":["webpack://./node_modules/typeface-roboto/index.css"],"names":[],"mappings":"AAAA,6BAA6B;AAC7B;EACE,qBAAqB;EACrB,kBAAkB;EAClB,kBAAkB;EAClB,gBAAgB;EAChB;;;;0DAIqD,EAAE,oBAAoB;AAC7E;;AAEA,6BAA6B;AAC7B;EACE,qBAAqB;EACrB,kBAAkB;EAClB,kBAAkB;EAClB,gBAAgB;EAChB;;;;0DAI2D,EAAE,oBAAoB;AACnF;;AAEA,6BAA6B;AAC7B;EACE,qBAAqB;EACrB,kBAAkB;EAClB,kBAAkB;EAClB,gBAAgB;EAChB;;;;0DAIqD,EAAE,oBAAoB;AAC7E;;AAEA,6BAA6B;AAC7B;EACE,qBAAqB;EACrB,kBAAkB;EAClB,kBAAkB;EAClB,gBAAgB;EAChB;;;;0DAI2D,EAAE,oBAAoB;AACnF;;AAEA,6BAA6B;AAC7B;EACE,qBAAqB;EACrB,kBAAkB;EAClB,kBAAkB;EAClB,gBAAgB;EAChB;;;;0DAIqD,EAAE,oBAAoB;AAC7E;;AAEA,6BAA6B;AAC7B;EACE,qBAAqB;EACrB,kBAAkB;EAClB,kBAAkB;EAClB,gBAAgB;EAChB;;;;2DAI2D,EAAE,oBAAoB;AACnF;;AAEA,6BAA6B;AAC7B;EACE,qBAAqB;EACrB,kBAAkB;EAClB,kBAAkB;EAClB,gBAAgB;EAChB;;;;2DAIqD,EAAE,oBAAoB;AAC7E;;AAEA,6BAA6B;AAC7B;EACE,qBAAqB;EACrB,kBAAkB;EAClB,kBAAkB;EAClB,gBAAgB;EAChB;;;;2DAI2D,EAAE,oBAAoB;AACnF;;AAEA,6BAA6B;AAC7B;EACE,qBAAqB;EACrB,kBAAkB;EAClB,kBAAkB;EAClB,gBAAgB;EAChB;;;;2DAIqD,EAAE,oBAAoB;AAC7E;;AAEA,6BAA6B;AAC7B;EACE,qBAAqB;EACrB,kBAAkB;EAClB,kBAAkB;EAClB,gBAAgB;EAChB;;;;2DAI2D,EAAE,oBAAoB;AACnF;;AAEA,6BAA6B;AAC7B;EACE,qBAAqB;EACrB,kBAAkB;EAClB,kBAAkB;EAClB,gBAAgB;EAChB;;;;2DAIqD,EAAE,oBAAoB;AAC7E;;AAEA,6BAA6B;AAC7B;EACE,qBAAqB;EACrB,kBAAkB;EAClB,kBAAkB;EAClB,gBAAgB;EAChB;;;;2DAI2D,EAAE,oBAAoB;AACnF","sourcesContent":["/* roboto-100normal - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 100;\n  src:\n    local('Roboto Thin '),\n    local('Roboto-Thin'),\n    url('./files/roboto-latin-100.woff2') format('woff2'), /* Super Modern Browsers */\n    url('./files/roboto-latin-100.woff') format('woff'); /* Modern Browsers */\n}\n\n/* roboto-100italic - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: italic;\n  font-display: swap;\n  font-weight: 100;\n  src:\n    local('Roboto Thin italic'),\n    local('Roboto-Thinitalic'),\n    url('./files/roboto-latin-100italic.woff2') format('woff2'), /* Super Modern Browsers */\n    url('./files/roboto-latin-100italic.woff') format('woff'); /* Modern Browsers */\n}\n\n/* roboto-300normal - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 300;\n  src:\n    local('Roboto Light '),\n    local('Roboto-Light'),\n    url('./files/roboto-latin-300.woff2') format('woff2'), /* Super Modern Browsers */\n    url('./files/roboto-latin-300.woff') format('woff'); /* Modern Browsers */\n}\n\n/* roboto-300italic - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: italic;\n  font-display: swap;\n  font-weight: 300;\n  src:\n    local('Roboto Light italic'),\n    local('Roboto-Lightitalic'),\n    url('./files/roboto-latin-300italic.woff2') format('woff2'), /* Super Modern Browsers */\n    url('./files/roboto-latin-300italic.woff') format('woff'); /* Modern Browsers */\n}\n\n/* roboto-400normal - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 400;\n  src:\n    local('Roboto Regular '),\n    local('Roboto-Regular'),\n    url('./files/roboto-latin-400.woff2') format('woff2'), /* Super Modern Browsers */\n    url('./files/roboto-latin-400.woff') format('woff'); /* Modern Browsers */\n}\n\n/* roboto-400italic - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: italic;\n  font-display: swap;\n  font-weight: 400;\n  src:\n    local('Roboto Regular italic'),\n    local('Roboto-Regularitalic'),\n    url('./files/roboto-latin-400italic.woff2') format('woff2'), /* Super Modern Browsers */\n    url('./files/roboto-latin-400italic.woff') format('woff'); /* Modern Browsers */\n}\n\n/* roboto-500normal - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 500;\n  src:\n    local('Roboto Medium '),\n    local('Roboto-Medium'),\n    url('./files/roboto-latin-500.woff2') format('woff2'), /* Super Modern Browsers */\n    url('./files/roboto-latin-500.woff') format('woff'); /* Modern Browsers */\n}\n\n/* roboto-500italic - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: italic;\n  font-display: swap;\n  font-weight: 500;\n  src:\n    local('Roboto Medium italic'),\n    local('Roboto-Mediumitalic'),\n    url('./files/roboto-latin-500italic.woff2') format('woff2'), /* Super Modern Browsers */\n    url('./files/roboto-latin-500italic.woff') format('woff'); /* Modern Browsers */\n}\n\n/* roboto-700normal - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 700;\n  src:\n    local('Roboto Bold '),\n    local('Roboto-Bold'),\n    url('./files/roboto-latin-700.woff2') format('woff2'), /* Super Modern Browsers */\n    url('./files/roboto-latin-700.woff') format('woff'); /* Modern Browsers */\n}\n\n/* roboto-700italic - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: italic;\n  font-display: swap;\n  font-weight: 700;\n  src:\n    local('Roboto Bold italic'),\n    local('Roboto-Bolditalic'),\n    url('./files/roboto-latin-700italic.woff2') format('woff2'), /* Super Modern Browsers */\n    url('./files/roboto-latin-700italic.woff') format('woff'); /* Modern Browsers */\n}\n\n/* roboto-900normal - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 900;\n  src:\n    local('Roboto Black '),\n    local('Roboto-Black'),\n    url('./files/roboto-latin-900.woff2') format('woff2'), /* Super Modern Browsers */\n    url('./files/roboto-latin-900.woff') format('woff'); /* Modern Browsers */\n}\n\n/* roboto-900italic - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: italic;\n  font-display: swap;\n  font-weight: 900;\n  src:\n    local('Roboto Black italic'),\n    local('Roboto-Blackitalic'),\n    url('./files/roboto-latin-900italic.woff2') format('woff2'), /* Super Modern Browsers */\n    url('./files/roboto-latin-900italic.woff') format('woff'); /* Modern Browsers */\n}\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! background.jpg */ "./src/background.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root{\n  --color-grey: #918d8d;\n  --color-blue: #4893cc;\n  --dark-blue: #6aa1cbbd\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  font-family: \"Roboto\", sans-serif;\n  user-select: none;\n}\n\nbody{\n  display: grid;\n  justify-content: center;\n  grid-template-columns: minmax(400px, 800px);\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-position: center;\n  background-repeat: no-repeat;\n  background-attachment: fixed;\n  background-size: cover;\n}\n\n.main{\n  overflow: auto;\n  display: grid;\n  justify-content: center;\n  grid-template-columns: 1fr;\n  grid-template-rows: 120px 100px 1fr;\n}\n\nh1 {\n  padding: 20px;\n  padding-left: 0px;\n  text-align: center;\n  font-size: 3rem;\n  color:var(--color-blue);\n}\n.content {\n  display: grid;\n\n  grid-template-columns: 1fr;\n  width: 90%;\n   justify-self: center;\n}\n\n.top-section{\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  grid-template-rows: 130px 75px;\n}\n\n/* main */\n.left {\n  grid-column-start: 1;\n  grid-column-end: 2;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n.right {\n  grid-column-start: 2;\n  grid-column-end: 3;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\n.left, \n.right{\n  color:white;\n}\n\n.bottom {\n    grid-column-start: 1;\n    grid-column-end: 3;\n    display: flex;\n    justify-content: flex-start;\n    gap: 20px;\n    margin: 0px 10px;\n    align-items: center;\n    overflow: auto;\n    padding: 5px 4px;\n}\n\n.bottom p {\n  font-size: 1.5rem;\n  white-space: nowrap;\n  color: white;\n  font-weight: 400;\n}\n\n/* form */\nform {\n  grid-column-start: 1;\n  grid-column-end: 3;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin-top: 15px;\n  gap: 5px;\n}\n\ninput {\n  width: 200px;\n  padding-left: 10px;\n  border: none;\n  border-radius: 0.5rem;\n  height: 40px;\n  font-size: 1.5rem;\n}\n\nbutton {\n  padding: 5px 10px;\n  border: none;\n  border-radius: 0.5rem;\n  background-color: white;\n  height: 40px;\n  cursor: pointer;\n}\n\n/* items from daily */\n\n.tempWritting {\n  font-size: 4rem;\n  height: min-content;\n}\n\n.cityWritting {\n  font-size: 2.5rem;\n  font-weight: 300;\n}\n.icon {\n  height: 60px;\n}\n.iconimg {\n  height: 75px;\n}\n/* box controls */\n.buttonHolder{\n  display: none;\n  justify-content: space-between;\n  align-items: center;\n  margin: 10px 40px;\n}\n.SVGHOLDER{\n  display: grid;\n  place-items: center;\n  background-color: transparent;\n}\n.circle{\n  height: 10px;\n  width: 10px;\n  background-color: white;\n  border-radius: 50%;\n}\n\n/* forecast box */\n\n.forecast{\n    justify-self: center;\n    display: grid;\n    grid-template-rows: auto 1fr;\n    overflow: auto;\n    grid-column-start: 1;\n    grid-column-end: 3;\n        width: calc(100% - 45px);\n    margin-bottom: 20px !important;\n}\n\n.view{\n  display: grid;\n  overflow: auto;\n  gap: 10px;\n}\n\n.forecastBox {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  align-items: center;\n  justify-content: center;\n}\n.forecastBox div {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.todayBox {\n  display: none;\n  flex-direction: column;\n  text-align: center;\n  border-radius: 0.5rem;\n  height: min-content;\n}\n.todayBox:nth-child(1){\n  display: flex;\n}\n\n.todayBox > p {\n  margin: 10px;\n  font-size: 1.3rem;\n  margin-top: 0px;\n}\n\n.todayBox .forecastBox:nth-child(even) {\n  background-color: #ffffff40;\n}\n\n.icons{\n  height: 45px;\n}\n/* NAV */\nnav {\n  height: 100%;\n}\n\n.navcorner {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: white;\n  height: 100%;\n  width: 50%;\n  border-radius: 0% 5rem 5rem 0%;\n}\n\n.C, .F {\n  color: white;\n  border-radius: .5rem;\n  height: 40px;\n  aspect-ratio: 1/1;\n  font-size: 2rem;\n  text-align: center;\n  padding: 0px 2px;\n  cursor: pointer;\n}\n.C{\n  display: block;\n}\n.F{\n display: block;\n}\n\n.hide{\n  display: none;\n}\n\n.borders{\n  background-color: var(--dark-blue);\n  border: solid white 3px;\n  border-radius: 0.5rem;\n  padding: 10px;\n  margin: 10px;\n}\n\n.bottomBorderTop{\n  border-top: 3px solid white;\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":[":root{\n  --color-grey: #918d8d;\n  --color-blue: #4893cc;\n  --dark-blue: #6aa1cbbd\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  font-family: \"Roboto\", sans-serif;\n  user-select: none;\n}\n\nbody{\n  display: grid;\n  justify-content: center;\n  grid-template-columns: minmax(400px, 800px);\n  background: url(\"background.jpg\");\n  background-position: center;\n  background-repeat: no-repeat;\n  background-attachment: fixed;\n  background-size: cover;\n}\n\n.main{\n  overflow: auto;\n  display: grid;\n  justify-content: center;\n  grid-template-columns: 1fr;\n  grid-template-rows: 120px 100px 1fr;\n}\n\nh1 {\n  padding: 20px;\n  padding-left: 0px;\n  text-align: center;\n  font-size: 3rem;\n  color:var(--color-blue);\n}\n.content {\n  display: grid;\n\n  grid-template-columns: 1fr;\n  width: 90%;\n   justify-self: center;\n}\n\n.top-section{\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  grid-template-rows: 130px 75px;\n}\n\n/* main */\n.left {\n  grid-column-start: 1;\n  grid-column-end: 2;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n.right {\n  grid-column-start: 2;\n  grid-column-end: 3;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\n.left, \n.right{\n  color:white;\n}\n\n.bottom {\n    grid-column-start: 1;\n    grid-column-end: 3;\n    display: flex;\n    justify-content: flex-start;\n    gap: 20px;\n    margin: 0px 10px;\n    align-items: center;\n    overflow: auto;\n    padding: 5px 4px;\n}\n\n.bottom p {\n  font-size: 1.5rem;\n  white-space: nowrap;\n  color: white;\n  font-weight: 400;\n}\n\n/* form */\nform {\n  grid-column-start: 1;\n  grid-column-end: 3;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin-top: 15px;\n  gap: 5px;\n}\n\ninput {\n  width: 200px;\n  padding-left: 10px;\n  border: none;\n  border-radius: 0.5rem;\n  height: 40px;\n  font-size: 1.5rem;\n}\n\nbutton {\n  padding: 5px 10px;\n  border: none;\n  border-radius: 0.5rem;\n  background-color: white;\n  height: 40px;\n  cursor: pointer;\n}\n\n/* items from daily */\n\n.tempWritting {\n  font-size: 4rem;\n  height: min-content;\n}\n\n.cityWritting {\n  font-size: 2.5rem;\n  font-weight: 300;\n}\n.icon {\n  height: 60px;\n}\n.iconimg {\n  height: 75px;\n}\n/* box controls */\n.buttonHolder{\n  display: none;\n  justify-content: space-between;\n  align-items: center;\n  margin: 10px 40px;\n}\n.SVGHOLDER{\n  display: grid;\n  place-items: center;\n  background-color: transparent;\n}\n.circle{\n  height: 10px;\n  width: 10px;\n  background-color: white;\n  border-radius: 50%;\n}\n\n/* forecast box */\n\n.forecast{\n    justify-self: center;\n    display: grid;\n    grid-template-rows: auto 1fr;\n    overflow: auto;\n    grid-column-start: 1;\n    grid-column-end: 3;\n        width: calc(100% - 45px);\n    margin-bottom: 20px !important;\n}\n\n.view{\n  display: grid;\n  overflow: auto;\n  gap: 10px;\n}\n\n.forecastBox {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  align-items: center;\n  justify-content: center;\n}\n.forecastBox div {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.todayBox {\n  display: none;\n  flex-direction: column;\n  text-align: center;\n  border-radius: 0.5rem;\n  height: min-content;\n}\n.todayBox:nth-child(1){\n  display: flex;\n}\n\n.todayBox > p {\n  margin: 10px;\n  font-size: 1.3rem;\n  margin-top: 0px;\n}\n\n.todayBox .forecastBox:nth-child(even) {\n  background-color: #ffffff40;\n}\n\n.icons{\n  height: 45px;\n}\n/* NAV */\nnav {\n  height: 100%;\n}\n\n.navcorner {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: white;\n  height: 100%;\n  width: 50%;\n  border-radius: 0% 5rem 5rem 0%;\n}\n\n.C, .F {\n  color: white;\n  border-radius: .5rem;\n  height: 40px;\n  aspect-ratio: 1/1;\n  font-size: 2rem;\n  text-align: center;\n  padding: 0px 2px;\n  cursor: pointer;\n}\n.C{\n  display: block;\n}\n.F{\n display: block;\n}\n\n.hide{\n  display: none;\n}\n\n.borders{\n  background-color: var(--dark-blue);\n  border: solid white 3px;\n  border-radius: 0.5rem;\n  padding: 10px;\n  margin: 10px;\n}\n\n.bottomBorderTop{\n  border-top: 3px solid white;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/typeface-roboto/index.css":
/*!************************************************!*\
  !*** ./node_modules/typeface-roboto/index.css ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/typeface-roboto/index.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/typeface-roboto/files/roboto-latin-100.woff":
/*!******************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-100.woff ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a45108d3b34af91f9113.woff";

/***/ }),

/***/ "./node_modules/typeface-roboto/files/roboto-latin-100.woff2":
/*!*******************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-100.woff2 ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "c2aa4ab115bf9c6057cb.woff2";

/***/ }),

/***/ "./node_modules/typeface-roboto/files/roboto-latin-100italic.woff":
/*!************************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-100italic.woff ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "451d4e559d6f57cdf6a1.woff";

/***/ }),

/***/ "./node_modules/typeface-roboto/files/roboto-latin-100italic.woff2":
/*!*************************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-100italic.woff2 ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "7f839a8652da29745ce4.woff2";

/***/ }),

/***/ "./node_modules/typeface-roboto/files/roboto-latin-300.woff":
/*!******************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-300.woff ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "865f928cbabcc9f8f2b5.woff";

/***/ }),

/***/ "./node_modules/typeface-roboto/files/roboto-latin-300.woff2":
/*!*******************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-300.woff2 ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "37a7069dc30fc663c878.woff2";

/***/ }),

/***/ "./node_modules/typeface-roboto/files/roboto-latin-300italic.woff":
/*!************************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-300italic.woff ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "bd5b7a13f2c52b531a2a.woff";

/***/ }),

/***/ "./node_modules/typeface-roboto/files/roboto-latin-300italic.woff2":
/*!*************************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-300italic.woff2 ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "c64e7e354c88e613c77c.woff2";

/***/ }),

/***/ "./node_modules/typeface-roboto/files/roboto-latin-400.woff":
/*!******************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-400.woff ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "49ae34d4cc6b98c00c69.woff";

/***/ }),

/***/ "./node_modules/typeface-roboto/files/roboto-latin-400.woff2":
/*!*******************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-400.woff2 ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "176f8f5bd5f02b3abfcf.woff2";

/***/ }),

/***/ "./node_modules/typeface-roboto/files/roboto-latin-400italic.woff":
/*!************************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-400italic.woff ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "b1d9d9904bfca8802a63.woff";

/***/ }),

/***/ "./node_modules/typeface-roboto/files/roboto-latin-400italic.woff2":
/*!*************************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-400italic.woff2 ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "d022bc70dc1bf7b3425d.woff2";

/***/ }),

/***/ "./node_modules/typeface-roboto/files/roboto-latin-500.woff":
/*!******************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-500.woff ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "cea99d3e3e13a3a599a0.woff";

/***/ }),

/***/ "./node_modules/typeface-roboto/files/roboto-latin-500.woff2":
/*!*******************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-500.woff2 ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "f5b74d7ffcdf85b9dd60.woff2";

/***/ }),

/***/ "./node_modules/typeface-roboto/files/roboto-latin-500italic.woff":
/*!************************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-500italic.woff ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "18d00f739ff1e1c52db1.woff";

/***/ }),

/***/ "./node_modules/typeface-roboto/files/roboto-latin-500italic.woff2":
/*!*************************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-500italic.woff2 ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0d8bb5b3ee5f5dac9e44.woff2";

/***/ }),

/***/ "./node_modules/typeface-roboto/files/roboto-latin-700.woff":
/*!******************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-700.woff ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "2267169ee7270a22a963.woff";

/***/ }),

/***/ "./node_modules/typeface-roboto/files/roboto-latin-700.woff2":
/*!*******************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-700.woff2 ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "c18ee39fb002ad58b6dc.woff2";

/***/ }),

/***/ "./node_modules/typeface-roboto/files/roboto-latin-700italic.woff":
/*!************************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-700italic.woff ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "9360531f9bb817f917f0.woff";

/***/ }),

/***/ "./node_modules/typeface-roboto/files/roboto-latin-700italic.woff2":
/*!*************************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-700italic.woff2 ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "7d8125ff7f707231fd89.woff2";

/***/ }),

/***/ "./node_modules/typeface-roboto/files/roboto-latin-900.woff":
/*!******************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-900.woff ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "bac8362e7a6ea60b6983.woff";

/***/ }),

/***/ "./node_modules/typeface-roboto/files/roboto-latin-900.woff2":
/*!*******************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-900.woff2 ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "870c8c1486f76054301a.woff2";

/***/ }),

/***/ "./node_modules/typeface-roboto/files/roboto-latin-900italic.woff":
/*!************************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-900italic.woff ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "c20d916c1a1b094c1cec.woff";

/***/ }),

/***/ "./node_modules/typeface-roboto/files/roboto-latin-900italic.woff2":
/*!*************************************************************************!*\
  !*** ./node_modules/typeface-roboto/files/roboto-latin-900italic.woff2 ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "cb5ad999740e9d8a8bd1.woff2";

/***/ }),

/***/ "./src/background.jpg":
/*!****************************!*\
  !*** ./src/background.jpg ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "2e02e4d4e4b6d5f3d2e6.jpg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var typeface_roboto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeface-roboto */ "./node_modules/typeface-roboto/index.css");
/* harmony import */ var _todayWeather__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todayWeather */ "./src/todayWeather.js");
/* harmony import */ var _fourWeather__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fourWeather */ "./src/fourWeather.js");
/* harmony import */ var _move__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./move */ "./src/move.js");
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */






document.addEventListener("DOMContentLoaded", () => {
  // get form and add event listener
  const form = document.querySelector("form");
  form.addEventListener("submit", event => {
    // stop full submit
    event.preventDefault();
    // pass through to get today's weather
    (0,_todayWeather__WEBPACK_IMPORTED_MODULE_2__["default"])(form.city.value).catch(() => {
      form.city.setCustomValidity("City not found");
      form.city.reportValidity();
    });
    (0,_fourWeather__WEBPACK_IMPORTED_MODULE_3__["default"])(form.city.value).catch(() => {
      form.city.setCustomValidity('City not found');
      form.city.reportValidity();
    });
  });

  // allow user to change input to valid city,
  // after bad response.
  form.addEventListener("keyup", () => {
    form.city.setCustomValidity("");
    form.city.reportValidity();
  });
  const control = document.querySelectorAll('.control');
  control.forEach(button => {
    // eslint-disable-next-line func-names
    button.addEventListener('click', function () {
      // eslint-disable-next-line no-unused-expressions
      this.id === 'buttonRight' ? (0,_move__WEBPACK_IMPORTED_MODULE_4__["default"])('right') : (0,_move__WEBPACK_IMPORTED_MODULE_4__["default"])('left');
    });
  });
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLE1BQU0sS0FBSyxXQUFXLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLFVBQVUsS0FBSyxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsT0FBTyxNQUFNLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxXQUFXLFlBQVksV0FBVyxZQUFZLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsV0FBVyxZQUFZLE9BQU8sVUFBVSxLQUFLLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLFdBQVcsVUFBVSxPQUFPLGFBQWEsTUFBTSxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxNQUFNLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLFlBQVksTUFBTSxVQUFVLFlBQVksYUFBYSxhQUFhLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxNQUFNLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLGFBQWEsTUFBTSxZQUFZLFdBQVcsWUFBWSxXQUFXLFlBQVksYUFBYSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxPQUFPLEtB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RCxDQUFDLENBQUM7RUFDSixDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXIvLi9zcmMvYWRkRm91ci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vc3JjL2VtcHR5VG9wLmpzIiwid2VicGFjazovL3dlYXRoZXIvLi9zcmMvZm91cldlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL3NyYy9mdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL3NyYy9nZXREYXlzLmpzIiwid2VicGFjazovL3dlYXRoZXIvLi9zcmMvbW92ZS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vc3JjL21vdmVCb3R0b20uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL3NyYy9zd2l0Y2hVbml0LmpzIiwid2VicGFjazovL3dlYXRoZXIvLi9zcmMvdG9kYXlJbmZvLmpzIiwid2VicGFjazovL3dlYXRoZXIvLi9zcmMvdG9kYXlXZWF0aGVyLmpzIiwid2VicGFjazovL3dlYXRoZXIvLi9ub2RlX21vZHVsZXMvdHlwZWZhY2Utcm9ib3RvL2luZGV4LmNzcyIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL25vZGVfbW9kdWxlcy90eXBlZmFjZS1yb2JvdG8vaW5kZXguY3NzPzAxM2UiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3dlYXRoZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3dlYXRoZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3dlYXRoZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly93ZWF0aGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vd2VhdGhlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3dlYXRoZXIvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vd2VhdGhlci93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBndWFyZC1mb3ItaW4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtc3ludGF4ICovXG5cbi8vIERlZ3JlZSBzeW1ib2xcbmNvbnN0IGRlZ3JlZSA9IFwiXFx1MDBCMFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGRGb3VyVG9QYWdlKHNlcGVyYXRlLCBtZWFzdXJlKXtcbiAgICAvLyBjb3VudGVyIGZvciBib3hpZFxuICAgIGxldCBjb3VudGVyID0gMDtcbiAgICAvLyBsb29wIG92ZXIgZWFjaCBkYXlcbiAgICBmb3IgKGNvbnN0IGRheSBpbiBzZXBlcmF0ZSkge1xuICAgICAgICAvLyB0b2RheSBhbmQgbmV3IGRhdGUgYmFzZWQgb24gdGhlIGlucHV0XG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShzZXBlcmF0ZVtkYXldWzBdWzBdLmR0X3R4dCk7XG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcblxuICAgICAgICAvLyBjcmVhdGUgZGF5IGJveFxuICAgICAgICBjb25zdCB0b2RheUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRvZGF5Qm94LmNsYXNzTmFtZSA9IFwidG9kYXlCb3hcIjtcbiAgICAgICAgdG9kYXlCb3guc2V0QXR0cmlidXRlKFwiaWRcIiwgYGRheSR7ZGF5fWApO1xuXG4gICAgICAgIC8vIHRpdGxlIG9mIGJveFxuICAgICAgICBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIHAudGV4dENvbnRlbnQgPVxuICAgICAgICAgIHRvZGF5LnRvRGF0ZVN0cmluZygpID09PSBkYXRlLnRvRGF0ZVN0cmluZygpXG4gICAgICAgICAgICA/IFwiVG9kYXlcIlxuICAgICAgICAgICAgOiBkYXRlLnRvTG9jYWxlU3RyaW5nKFwiZW4tdWtcIiwgeyB3ZWVrZGF5OiBcImxvbmdcIiB9KTtcbiAgICAgICAgXG4gICAgICAgIC8vIGFkZCB0byBib3hcbiAgICAgICAgdG9kYXlCb3guYXBwZW5kKHApO1xuXG4gICAgICAgIC8vIGFkZCBib3ggdG8gcGFnZVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnZpZXdcIikuYXBwZW5kKHRvZGF5Qm94KTtcblxuICAgICAgICAvLyBkYXRhIG9mIHRoaXMgZGF5XG4gICAgICAgIGNvbnN0IHRoaXNEYXkgPSBzZXBlcmF0ZVtkYXldWzBdO1xuXG4gICAgICAgIC8vIGZvciBlYWNoIGhvdXIgb2YgdGhpcyBkYXlcbiAgICAgICAgZm9yIChjb25zdCBob3VyIGluIHRoaXNEYXkpIHtcblxuICAgICAgICAgIC8vIGdldCBpdCdzIGRhdGUgYW5kIHRvZGF5J3MgZGF0ZVxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zaGFkb3dcbiAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodGhpc0RheVtob3VyXS5kdF90eHQpO1xuICBcbiAgICAgICAgICAvLyBnZXQgaW5mbyBhbmQgc2V0IHN0cmluZ3NcbiAgICAgICAgICBjb25zdCBob3VycyA9XG4gICAgICAgICAgICBkYXRlLmdldEhvdXJzKCkudG9TdHJpbmcoKS5sZW5ndGggPT09IDJcbiAgICAgICAgICAgICAgPyBgJHtkYXRlLmdldEhvdXJzKCl9OjAwYFxuICAgICAgICAgICAgICA6IGAwJHtkYXRlLmdldEhvdXJzKCl9OjAwYDtcbiAgICAgICAgICBjb25zdCB7IGljb24gfSA9IHRoaXNEYXlbaG91cl0ud2VhdGhlclswXTtcbiAgICAgICAgICBjb25zdCB0ZW1wID0gbWVhc3VyZSA9PT0gJ0MnID8gYCR7TWF0aC5yb3VuZCh0aGlzRGF5W2hvdXJdLm1haW4udGVtcCl9JHtkZWdyZWV9Q2AgOlxuICAgICAgICAgIGAke01hdGgucm91bmQodGhpc0RheVtob3VyXS5tYWluLnRlbXApfSR7ZGVncmVlfUZgO1xuICBcbiAgICAgICAgICAvLyBhZGQgdG8gYSBsaXN0XG4gICAgICAgICAgY29uc3QgbGlzdG9maW5mbyA9IFtob3VycywgaWNvbiwgdGVtcF07XG4gIFxuICAgICAgICAgIC8vIGNyZWF0ZSBhIGJveCBmb3IgZWFjaCBob3VyLCBzZXQgSUQgYW5kIGNsYXNzXG4gICAgICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBib3guY2xhc3NOYW1lID0gXCJmb3JlY2FzdEJveFwiO1xuICAgICAgICAgIGJveC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgYm94JHtjb3VudGVyfWApO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBkYXkke2RheX1gKS5hcHBlbmQoYm94KTtcbiAgXG4gICAgICAgICAgLy8gYWRkIGVhY2ggYml0IG9mIGluZm8gZm9yIHRoZSBob3VyLCBjaGVja2luZyBmb3IgYW4gaW1hZ2VcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gaW4gbGlzdG9maW5mbykge1xuICAgICAgICAgICAgY29uc3Qgc21hbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgc21hbGwuY2xhc3NOYW1lID0gbWVhc3VyZSA9PT0gJ0MnID8gXCJzbWFsbERpdiBkZWdyZWVPZkNcIiA6IFwic21hbGxEaXYgZGVncmVlT2ZGXCI7XG4gICAgICAgICAgICBpZiAoaXRlbSAhPT0gJzEnKSB7XG4gICAgICAgICAgICAgIHNtYWxsLnRleHRDb250ZW50ID0gbGlzdG9maW5mb1tpdGVtXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnN0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgICAgICAgaW1hZ2Uuc3JjID0gYGh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke2xpc3RvZmluZm9baXRlbV19QDJ4LnBuZ2A7XG4gICAgICAgICAgICAgIGltYWdlLmNsYXNzTmFtZSA9ICdpY29ucydcbiAgICAgICAgICAgICAgc21hbGwuYXBwZW5kKGltYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNtYWxsLnN0eWxlLmRpc3BsYXkgPSBzbWFsbC5jbGFzc05hbWUgPT09IFwic21hbGxEaXYgZGVncmVlT2ZDXCIgPyAnYmxvY2snIDogJ25vbmUnXG4gICAgICAgICAgICAvLyBhZGQgdG8gcGFnZVxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGJveCR7Y291bnRlcn1gKS5hcHBlbmQoc21hbGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBpbmNyZWFzZSBjb3VudGVyIGZvciBuZXh0IGJveFxuICAgICAgICAgIGNvdW50ZXIgKz0gMTtcbiAgICAgICAgfVxuICAgICAgfVxufSIsImltcG9ydCB7IGNsZWFyIH0gZnJvbSBcIi4vZnVuY3Rpb25zXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVtcHR5VG9wKCl7XG4gICAgLy8gbGlzdCBvZiBkaXZzIGluIEhUTUwgZmlsZVxuICAgIGNvbnN0IGxpc3RvZmxvY2F0aW9ucyA9IFtcbiAgICAgICAgXCJjbG91ZHNcIixcbiAgICAgICAgXCJmZWVsc1wiLFxuICAgICAgICBcImh1bWlkaXR5XCIsXG4gICAgICAgIFwid2luZFNwZWVkXCIsXG4gICAgICAgIFwidGVtcFwiLFxuICAgICAgICBcInN1bnJpc2VcIixcbiAgICAgICAgXCJzdW5zZXRcIixcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiLFxuICAgICAgICBcImljb25cIixcbiAgICAgICAgXCJjaXR5XCIsXG4gICAgICBdO1xuICAgICAgXG4gICAgICAvLyBjbGVhciBlYWNoIGVudHJ5IG9uIG5ldyBzZWFyY2hcbiAgICAgIGxpc3RvZmxvY2F0aW9ucy5mb3JFYWNoKCAoaXRlbSkgPT4ge1xuICAgICAgICAgIGNsZWFyKGl0ZW0pXG4gICAgICB9KVxufSIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtc3ludGF4ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBndWFyZC1mb3ItaW4gKi9cbmltcG9ydCB7IGNsZWFyIH0gZnJvbSBcIi4vZnVuY3Rpb25zXCJcbmltcG9ydCBhZGRGb3VyVG9QYWdlIGZyb20gXCIuL2FkZEZvdXJcIlxuaW1wb3J0IGdldERheXMgZnJvbSBcIi4vZ2V0RGF5c1wiO1xuaW1wb3J0IHN3aXRjaFVuaXQgZnJvbSBcIi4vc3dpdGNoVW5pdFwiO1xuXG4vLyBmb3JlY2FzdCB3ZWF0aGVyXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyRm91ckRheXMoY2l0eSkge1xuXG4gICAgLy8gcmVtb3ZlIGV4aXN0aW5nIGRhdGEgaWYgc2Vjb25kIHNlYXJjaCBcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uSG9sZGVyJykuc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xuXG4gICAgLy8gY2xlYXIgYm90dG9tIHNlY3Rpb25cbiAgICBjbGVhcihcInZpZXdcIik7XG5cbiAgICAvLyBzZXQgYWxsIGNpcmNsZXMgdG8gYmUgd2hpdGVcbiAgICBjb25zdCBjaXJjbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNpcmNsZScpXG4gICAgY2lyY2xlcy5mb3JFYWNoKGNpcmNsZSA9PiB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIGNpcmNsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnXG4gICAgfSlcblxuICAgIC8vIHNldCBmaXJzdCBjaXJjbGUgdG8gYWN0aXZlXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGNpcmNsZTBgKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnYmxhY2snXG5cbiAgICAvLyBnZXQgY2l0eSBsb25nIGFuZCBsYXQgZGV0YWlsc1xuICAgIGNvbnN0IGNpdHlSZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9nZW8vMS4wL2RpcmVjdD9xPSR7Y2l0eX0mbGltaXQ9MSZhcHBpZD04YjA1YWRmZjdhNDNkNDc5ZmFmMGZiMTFiYjM1YTJkOGAse1xuICAgICAgICBtb2RlOiAnY29ycydcbiAgICAgIH1cbiAgICApO1xuICAgIGNvbnN0IGNpdHlEYXRhID0gYXdhaXQgY2l0eVJlc3BvbnNlLmpzb24oKTtcblxuICAgIC8vIHBhc3MgbG9uZyBhbmQgbGF0IGludG8gc2Vjb25kIEFQSSwgb25lIGZvciBtZXRyaWMgb25lIGZvciBpbXBlcmlhbFxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P2xhdD0ke2NpdHlEYXRhWzBdLmxhdH0mbG9uPSR7Y2l0eURhdGFbMF0ubG9ufSZhcHBpZD04YjA1YWRmZjdhNDNkNDc5ZmFmMGZiMTFiYjM1YTJkOCZ1bml0cz1tZXRyaWNgLHtcbiAgICAgICAgbW9kZTogJ2NvcnMnXG4gICAgICB9XG4gICAgKTtcbiAgICBjb25zdCByZXNwb25zZVR3byA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9sYXQ9JHtjaXR5RGF0YVswXS5sYXR9Jmxvbj0ke2NpdHlEYXRhWzBdLmxvbn0mYXBwaWQ9OGIwNWFkZmY3YTQzZDQ3OWZhZjBmYjExYmIzNWEyZDgmdW5pdHM9aW1wZXJpYWxgLHtcbiAgICAgICAgbW9kZTogJ2NvcnMnXG4gICAgICB9XG4gICAgKTtcblxuICAgIC8vIGNvbnZlcnQgdG8gSlNPTlxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgY29uc3QgZGF0YVR3byA9IGF3YWl0IHJlc3BvbnNlVHdvLmpzb24oKTtcbiAgICBcbiAgICAvLyBzZXBlcmF0ZSBpbnRvIGVhY2ggZGF5XG4gICAgY29uc3Qgc2VwZXJhdGUgPSBnZXREYXlzKGRhdGEpXG4gICAgY29uc3Qgc2VwZXJhdGVUd28gPSBnZXREYXlzKGRhdGFUd28pXG5cbiAgICAvLyBwYXNzIHNlcGVyYXRlZCBhcnJheSBpbnRvIHRoaXMgZnVuY3Rpb25cbiAgICAvLyB0byBiZSBhZGRlZCB0byBwYWdlXG4gICAgYWRkRm91clRvUGFnZShzZXBlcmF0ZSwgJ0MnKVxuICAgIGFkZEZvdXJUb1BhZ2Uoc2VwZXJhdGVUd28sICdGJylcbiAgICBcbiAgICAvLyBhbGxvdyBzd2l0Y2ggb2YgbWVhc3VyZW1lbnRzXG4gICAgc3dpdGNoVW5pdCgpXG4gIH0iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG4vLyBjbGVhciBvdXQgZXhpc3RpbmcgcGFnZVxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyKGlucHV0KSB7XG4gICAgY29uc3Qgd2hlcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtpbnB1dH1gKTtcbiAgICB3aGlsZSAod2hlcmUuZmlyc3RDaGlsZCkge1xuICAgICAgd2hlcmUucmVtb3ZlQ2hpbGQod2hlcmUubGFzdENoaWxkKTtcbiAgICB9XG4gIH1cblxuLy8gYWRkIHRvZGF5J3MgZm9yZWNhc3QgdG8gcGFnZVxuZXhwb3J0IGZ1bmN0aW9uIGFkZHRvKHdoZXJlLCBpbmZvLCBkZWdyZWUpIHtcbiAgICAvLyBjaGVjayBmb3IgaW1hZ2UgZWxzZSBqdXN0IGFkZCB0byBjb3JyZWN0IGRpdlxuICAgIGlmICh3aGVyZSA9PT0gXCJpY29uXCIpIHtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICBpbWFnZS5jbGFzc05hbWUgPSBgaWNvbmltZyBkZWdyZWVPZiR7ZGVncmVlfWA7XG4gICAgICAgIGltYWdlLmFsdCA9IFwiVG9kYXkncyB3ZWF0aGVyIGljb25cIjtcbiAgICAgICAgaW1hZ2Uuc3JjID0gYGh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke2luZm99QDJ4LnBuZ2A7XG4gICAgICAgIGltYWdlLnN0eWxlLmRpc3BsYXkgPSBkZWdyZWUgPT09ICdDJyA/ICdibG9jaycgOiAnbm9uZSdcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pY29uXCIpLmFwcGVuZChpbWFnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICBwLmNsYXNzTmFtZSA9IGAke3doZXJlfVdyaXR0aW5nIGRlZ3JlZU9mJHtkZWdyZWV9YDtcbiAgICAgICAgcC50ZXh0Q29udGVudCA9IGluZm87XG4gICAgICAgIHAuc3R5bGUuZGlzcGxheSA9IGRlZ3JlZSA9PT0gJ0MnID8gJ2Jsb2NrJyA6ICdub25lJ1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt3aGVyZX1gKS5hcHBlbmQocCk7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldERheXMoZGF0YSl7XG5cbiAgIC8vIGVtcHR5IGFycmF5cyB0byBsYXRlciBiZSBmaWxsZWRcbiAgICBjb25zdCBzZXBlcmF0ZSA9IFtdO1xuICAgIGxldCBuZXh0ID0gW107XG4gICAgbGV0IGl0ZW0gPSAwO1xuXG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuXG4gICAgLy8gc3BsaXRzIHRoZSB3aG9sZSBhcnJheSBpbnRvIGRheXNcbiAgICBmb3IgKGl0ZW07IGl0ZW0gPCBkYXRhLmxpc3QubGVuZ3RoOyBpdGVtICs9IDEpIHtcbiAgICAgICAgXG4gICAgICAgIC8vIG5ldyBkYXRlIGFuZCB0b2RheXNcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoZGF0YS5saXN0W2l0ZW1dLmR0X3R4dCk7XG5cbiAgICAvLyBjaGVjayBpZiB0b2RheVxuICAgIGlmICh0b2RheS50b0RhdGVTdHJpbmcoKSA9PT0gZGF0ZS50b0RhdGVTdHJpbmcoKSkge1xuICAgICAgICAvLyBlbXB0eSBhcnJheVxuICAgICAgICBjb25zdCBmaXJzdCA9IFtdO1xuICAgICAgICAvLyBjaGVjayB1bnRpbCB0aGUgbmV4dCBkYXkgZG9lcyBub3QgZXF1YWwgdG9kYXlcbiAgICAgICAgLy8gYWRkIGl0IHRvIHRoZSBhcnJheSBhbmQgcHVzaCB0byB0aGUgc2VwZXJhdGUgYXJyYXlcbiAgICAgICAgaWYgKFxuICAgICAgICB0b2RheS50b0RhdGVTdHJpbmcoKSAhPT1cbiAgICAgICAgbmV3IERhdGUoZGF0YS5saXN0W2l0ZW0gKyAxXS5kdF90eHQpLnRvRGF0ZVN0cmluZygpXG4gICAgICAgICkge1xuICAgICAgICBmaXJzdC5wdXNoKGRhdGEubGlzdC5zbGljZSgwLCBpdGVtICsgMSkpO1xuICAgICAgICBzZXBlcmF0ZS5wdXNoKGZpcnN0KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiBub3QgdG9kYXkgYW5kIG1vcmUgdGhhbiA4IGl0ZW1zIGluIHRoZSBhcnJheSBsZWZ0XG4gICAgfSBlbHNlIGlmIChcbiAgICAgICAgISh0b2RheS50b0RhdGVTdHJpbmcoKSA9PT0gZGF0ZS50b0RhdGVTdHJpbmcoKSkgJiZcbiAgICAgICAgZGF0YS5saXN0Lmxlbmd0aCA+PSBpdGVtICsgOFxuICAgICkge1xuICAgICAgICAvLyBwdXNoIHRoZSBuZXh0IDggaG91ciBzbG90cyBpbnRvIG5leHQgdGhlbiBhZGQgdG8gc2VwZXJhdGUgaW4gaXQncyBvd24gYXJyYXlcbiAgICAgICAgbmV4dC5wdXNoKGRhdGEubGlzdC5zbGljZShbaXRlbV0sIGl0ZW0gKyA4KSk7XG4gICAgICAgIGl0ZW0gKz0gNztcbiAgICAgICAgc2VwZXJhdGUucHVzaChuZXh0KTtcbiAgICAgICAgbmV4dCA9IFtdO1xuICAgICAgICAvLyBpZiB0aGUgbGFzdCBkYXkgYWRkIHRvIG5leHQgdGhlbiB0byBzZXBlcmF0ZVxuICAgIH0gZWxzZSBpZiAoZGF0YS5saXN0Lmxlbmd0aCA8IGl0ZW0gKyA4KSB7XG4gICAgICAgIG5leHQucHVzaChkYXRhLmxpc3Quc2xpY2UoW2l0ZW1dKSk7XG4gICAgICAgIGl0ZW0gPSBkYXRhLmxpc3QubGVuZ3RoO1xuICAgICAgICBzZXBlcmF0ZS5wdXNoKG5leHQpO1xuICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXR1cm4gbmV3IGFycmF5XG4gICAgcmV0dXJuIHNlcGVyYXRlXG59IiwiLy8gY291bnQgd2hpY2ggc2xpZGUgdXNlciBpcyBvblxubGV0IGNvdW50ZXIgPSAwXG5jb25zdCBjaXJjbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNpcmNsZScpXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1vdmUoZCl7XG5cbiAgIGlmKGQgPT09ICdyaWdodCcgJiYgY291bnRlciAhPT0gNSl7XG4gICAgICAvLyBjaGVjayBmb3Qgbm90IGV4Y2VkaW5nIGFuZCBpbmNyZWFzZSBieSBvbmVcbiAgICAgICAgY291bnRlciArPSAxXG4gICB9IGVsc2UgaWYgKGQgPT09ICdsZWZ0JyAmJiBjb3VudGVyICE9PSAwICl7XG4gICAgICAvLyBjaGVjayBmb3Qgbm90IGV4Y2VkaW5nIGFuZCBpbmNyZWFzZSBieSBvbmVcbiAgICAgICAgY291bnRlciAtPSAxXG4gICB9IGVsc2Uge1xuICAgICAgICAvLyBkbyBub3RoaW5nXG4gICB9XG4gICAvLyBzZXQgYWxsIGNpcmNsZXMgdG8gd2hpdGVcbiAgICBjaXJjbGVzLmZvckVhY2goKGNpcmNsZSkgPT4ge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgY2lyY2xlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSc7XG4gICAgfSlcblxuICAgIC8vIGNoYW5nZSB0aGUgY29ycmVjdCBjaXJjbGUgdG8gYmxhY2tcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgY2lyY2xlJHtjb3VudGVyfWApLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdibGFjaydcblxuICAgIC8vIGhpZGUgYWxsIGJveGVzXG4gICAgY29uc3QgYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kYXlCb3gnKVxuICAgIGJveGVzLmZvckVhY2goIChiKSA9PiB7XG4gICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgYi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgfSlcblxuICAgIC8vIHNob3cgY29ycmVjdCBib3hcbiAgICBjb25zdCBib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgZGF5JHtjb3VudGVyfWApXG4gICAgYm94LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIlxufSIsIiBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtb3ZlQm90dG9tKCl7XG4gICAvLyBnZXQgY29udGFpbmVyXG4gICBjb25zdCBib3R0b20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvdHRvbVwiKTtcblxuICAgLy8gcmVzZXQgdG8gMFxuICAgYm90dG9tLnNjcm9sbExlZnQgPSAwO1xuXG4gICAvLyBtb3ZlIGJ5IDEgcGl4ZWxcbiAgIGNvbnN0IG1vdmVCYXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgIGJvdHRvbS5zY3JvbGxMZWZ0ICs9IDE7XG4gICB9LCAxMCk7XG5cbiAgIC8vIHN0b3AgYWZ0ZXIgbW92aW5nIGJhciBhZnRlciA4MDAwXG4gICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgIGNsZWFySW50ZXJ2YWwobW92ZUJhcik7XG4gICB9LCAxNTAwMCk7XG5cbiAgIC8vIG9udG91Y2ggc3RvcCBtb3ZlbWVudFxuICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgY2xlYXJJbnRlcnZhbChtb3ZlQmFyKTtcbiAgIH0pO1xuXG4gICAvLyAvLyBvbiBuZXcgc2VhcmNoIHN0b3AgZXZlbnQgc28gaXQgY2FuIHJlc3RhcnRcbiAgIGJvdHRvbS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsICgpID0+IHtcbiAgICAgY2xlYXJJbnRlcnZhbChtb3ZlQmFyKTtcbiAgIH0pO1xuXG4gICAvLyBvbiB0b3VjaCAtIHBob25lLCBzdG9wIG1vdmViYXJcbiAgIGJvdHRvbS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCAoKSA9PiB7XG4gICAgIGNsZWFySW50ZXJ2YWwobW92ZUJhcik7XG4gICB9KTtcblxuICAgLy8gb24gdG91Y2ggLSBwaG9uZSwgc3RvcCBtb3ZlYmFyXG4gICBib3R0b20uYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCAoKSA9PiB7XG4gICAgIGNsZWFySW50ZXJ2YWwobW92ZUJhcik7XG4gICB9KTtcbiB9IiwiLy8gY2hvaWNlIG9mIG1lYXN1cm1lbnQgdG8gZGlzcGxheVxubGV0IGNob2ljZSA9ICcnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN3aXRjaFVuaXQoKXtcblxuICAgIC8vIERlZ3JlZSBzeW1ib2xcbiAgICBjb25zdCBkZWdyZWUgPSBcIlxcdTAwQjBcIjtcblxuICAgIC8vIGdldCBhbGwgcmVxdWlyZWQgZWxlbWVudHNcbiAgICBjb25zdCBkZWdyZWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNob2ljZScpXG4gICAgY29uc3QgYWxsQyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZWdyZWVPZkMnKVxuICAgIGNvbnN0IGFsbEYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGVncmVlT2ZGJylcblxuICAgIFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItYXJyb3ctY2FsbGJhY2tcbiAgICAvLyBsb29wIHRocm91Z2ggZWFjaCBjaG9pY2VcbiAgICBkZWdyZWVzLmZvckVhY2goIChlbGVtZW50KSA9PiB7XG4gICAgICAgIFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWFycm93LWNhbGxiYWNrXG4gICAgICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lciB0byBlYWNoXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcbiAgICAgICAgICAgIC8vIGVpdGhlciBoaWRlIG9uZSBhbmQgc2hvdyB0aGUgb3RoZXJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5DJykuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuRicpLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnKVxuXG4gICAgICAgICAgICAvLyBzZXQgcHJlZmVyZW5jZSBvZiBDIG9yIEZcbiAgICAgICAgICAgIGNob2ljZSA9IGVsZW1lbnQudGV4dENvbnRlbnQgPT09IGAke2RlZ3JlZX1DYCA/ICdGJyA6ICdDJ1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBjaGVjayBmb3IgdGhlIGNob2ljZSBhbmQgc2hvdyAvIGhpZGUgYXMgbmVjY2VzYXJ5XG4gICAgICAgICAgICBpZiAoY2hvaWNlID09PSBgQ2Ape1xuICAgICAgICAgICAgICAgIGFsbEYuZm9yRWFjaCggaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGFsbEMuZm9yRWFjaCggaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGxGLmZvckVhY2goIGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgYWxsQy5mb3JFYWNoKCBpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcbn0iLCJpbXBvcnQgeyBhZGR0b30gZnJvbSBcIi4vZnVuY3Rpb25zXCI7XG5cbmxldCBjb3VudGVyID0gMFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9kYXlJbmZvKGRhdGEsIHN5bWJvbCkge1xuICAgIGNvbnNvbGUubG9nKFwidG9kYXlpbmZvXCIpXG4gICAgLy8gZ2V0IG5lZWRlZCBpbmZvXG4gICAgY29uc3QgY2xvdWRzID0gZGF0YS5jbG91ZHMuYWxsO1xuICAgIGNvbnN0IGZlZWxzID0gTWF0aC5yb3VuZChkYXRhLm1haW4uZmVlbHNfbGlrZSk7XG4gICAgY29uc3QgeyBodW1pZGl0eSB9ID0gZGF0YS5tYWluO1xuICAgIGNvbnN0IHdpbmRTcGVlZCA9IGRhdGEud2luZC5zcGVlZDtcbiAgICBjb25zdCB0ZW1wID0gTWF0aC5yb3VuZChkYXRhLm1haW4udGVtcCk7XG4gICAgY29uc3Qgc3VucmlzZURhdGEgPSBuZXcgRGF0ZShkYXRhLnN5cy5zdW5yaXNlICogMTAwMCk7XG4gICAgY29uc3QgcmlzZUhvdXJzID0gc3VucmlzZURhdGEuZ2V0SG91cnMoKTtcbiAgICBjb25zdCByaXNlTWludXRlcyA9IGAwJHtzdW5yaXNlRGF0YS5nZXRNaW51dGVzKCl9YDtcbiAgICBjb25zdCBzdW5yaXNlID0gYCR7cmlzZUhvdXJzfToke3Jpc2VNaW51dGVzLnN1YnN0cigtMil9YDtcbiAgICBjb25zdCBzdW5zZXREYXRhID0gbmV3IERhdGUoZGF0YS5zeXMuc3Vuc2V0ICogMTAwMCk7XG4gICAgY29uc3Qgc2V0SG91cnMgPSBzdW5zZXREYXRhLmdldEhvdXJzKCk7XG4gICAgY29uc3Qgc2V0TWludXRlcyA9IGAwJHtzdW5zZXREYXRhLmdldE1pbnV0ZXMoKX1gO1xuICAgIGNvbnN0IHN1bnNldCA9IGAke3NldEhvdXJzfToke3NldE1pbnV0ZXMuc3Vic3RyKC0yKX1gO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZGF0YS53ZWF0aGVyWzBdLm1haW47XG4gICAgY29uc3QgeyBpY29uIH0gPSBkYXRhLndlYXRoZXJbMF07XG4gICAgY29uc3QgbG9jYXRpb24gPSBkYXRhLm5hbWU7XG4gICAgY29uc3QgZGVncmVlID0gXCJcXHUwMEIwXCI7XG5cbiAgICAvLyBjaGFuZ2UgZm9yIEYgb3IgQ1xuICAgIGNvbnN0IGRpc3BsYXlUZW1wID0gc3ltYm9sID09PSAnQycgPyBgJHt0ZW1wfSR7ZGVncmVlfUNgIDogYCR7dGVtcH0ke2RlZ3JlZX1GYDtcbiAgICBjb25zdCBkaXNwbGF5V2luZCA9IHN5bWJvbCA9PT0gJ0MnID8gYFdpbmQgc3BlZWQ6ICR7d2luZFNwZWVkfSBtZXRlci9zZWNgIDogYFdpbmQgc3BlZWQ6ICR7d2luZFNwZWVkfSBtaWxlcy9ob3VyYFxuXG4gICAgLy8gYWRkIHRvIGEgbGlzdFxuICAgIGNvbnN0IGxpc3RvZmluZm8gPSBbXG4gICAgICBgQ2xvdWRpbmVzczogJHtjbG91ZHN9JWAsXG4gICAgICBgRmVlbHMgbGlrZTogJHtmZWVsc30ke2RlZ3JlZX1DYCxcbiAgICAgIGBIdW1pZGl0eTogJHtodW1pZGl0eX0lYCxcbiAgICAgIGRpc3BsYXlXaW5kLFxuICAgICAgZGlzcGxheVRlbXAsXG4gICAgICBgU3VucmlzZTogJHtzdW5yaXNlfWAsXG4gICAgICBgU3Vuc2V0OiAke3N1bnNldH1gLFxuICAgICAgYCR7ZGVzY3JpcHRpb259YCxcbiAgICAgIGljb24sXG4gICAgICBsb2NhdGlvbixcbiAgICBdO1xuXG4gICAgLy8gbGlzdCBvZiBkaXZzIGluIEhUTUwgZmlsZVxuICAgIGNvbnN0IGxpc3RvZmxvY2F0aW9ucyA9IFtcbiAgICAgIFwiY2xvdWRzXCIsXG4gICAgICBcImZlZWxzXCIsXG4gICAgICBcImh1bWlkaXR5XCIsXG4gICAgICBcIndpbmRTcGVlZFwiLFxuICAgICAgXCJ0ZW1wXCIsXG4gICAgICBcInN1bnJpc2VcIixcbiAgICAgIFwic3Vuc2V0XCIsXG4gICAgICBcImRlc2NyaXB0aW9uXCIsXG4gICAgICBcImljb25cIixcbiAgICAgIFwiY2l0eVwiLFxuICAgIF07XG5cbiAgICAvLyBsb29wIG92ZXIgYW5kIGFkZCB0byBjb3JyZWN0IHBsYWNlXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4LCBndWFyZC1mb3ItaW5cbiAgICBmb3IgKGNvbnN0IGl0ZW0gaW4gbGlzdG9maW5mbykge1xuICAgICAgYWRkdG8obGlzdG9mbG9jYXRpb25zW2l0ZW1dLCBsaXN0b2ZpbmZvW2l0ZW1dLCBzeW1ib2wpO1xuICAgIH1cbiAgXG4gIGlmIChjb3VudGVyID09PSAwKSB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvcC1zZWN0aW9uXCIpLmNsYXNzTmFtZSArPSBcIiBib3JkZXJzXCI7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcmVjYXN0XCIpLmNsYXNzTmFtZSArPSBcIiBib3JkZXJzXCI7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib3R0b21cIikuY2xhc3NOYW1lICs9IFwiIGJvdHRvbUJvcmRlclRvcFwiO1xuICAgIGNvdW50ZXIgKz0xIFxuICAgIH1cbn0iLCJpbXBvcnQgbW92ZUJvdHRvbSBmcm9tIFwiLi9tb3ZlQm90dG9tXCJcbmltcG9ydCB0b2RheUluZm8gZnJvbSBcIi4vdG9kYXlJbmZvXCI7XG5pbXBvcnQgZW1wdHlUb3AgZnJvbSBcIi4vZW1wdHlUb3BcIjtcblxuLy8gZ2V0IHRvZGF5J3Mgd2VhdGhlciBhc3luY1xuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlclRvZGF5KGNpdHkpIHtcbiAgLy8gY2xlYXIgaW5mbyByZWFkeSBmb3IgbmV3IGluZm8gYW5kIGF2b2lkIGR1cGxpY2F0aW9uc1xuICBlbXB0eVRvcCgpXG4gIC8vIHR3byBmZXRjaCwgb25lIGZvciBDIGFuZCBvbmUgZm9yIEZcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtjaXR5fSZBUFBJRD04YjA1YWRmZjdhNDNkNDc5ZmFmMGZiMTFiYjM1YTJkOCZ1bml0cz1tZXRyaWNgLHtcbiAgICAgICAgbW9kZTogJ2NvcnMnXG4gICAgICB9XG4gICAgKTtcbiAgICBjb25zdCByZXNwb25zZUYgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eX0mQVBQSUQ9OGIwNWFkZmY3YTQzZDQ3OWZhZjBmYjExYmIzNWEyZDgmdW5pdHM9aW1wZXJpYWxgLHtcbiAgICAgICAgbW9kZTogJ2NvcnMnXG4gICAgICB9XG4gICAgKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGNvbnN0IGRhdGFGID0gYXdhaXQgcmVzcG9uc2VGLmpzb24oKTtcbiAgICBcbiAgICB0b2RheUluZm8oZGF0YSwgJ0MnKVxuICAgIHRvZGF5SW5mbyhkYXRhRiwgJ0YnKVxuICAgIFxuICAgIC8vIGxvYWQgbW92aW5nIGNvbnRhaW5lclxuICAgIG1vdmVCb3R0b20oKVxuICB9IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTEwMC53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTEwMC53b2ZmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tMTAwaXRhbGljLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tMTAwaXRhbGljLndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi0zMDAud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNV9fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi0zMDAud29mZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF82X19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTMwMGl0YWxpYy53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF83X19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTMwMGl0YWxpYy53b2ZmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzhfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tNDAwLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzlfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tNDAwLndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTBfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tNDAwaXRhbGljLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzExX19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTQwMGl0YWxpYy53b2ZmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzEyX19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTUwMC53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xM19fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi01MDAud29mZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xNF9fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi01MDBpdGFsaWMud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTVfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tNTAwaXRhbGljLndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTZfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tNzAwLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzE3X19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTcwMC53b2ZmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzE4X19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTcwMGl0YWxpYy53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xOV9fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi03MDBpdGFsaWMud29mZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yMF9fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi05MDAud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMjFfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tOTAwLndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMjJfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tOTAwaXRhbGljLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzIzX19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTkwMGl0YWxpYy53b2ZmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzRfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF80X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF81X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzZfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzdfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF83X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF84X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfOF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfOV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzlfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzEwX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzExX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzEyX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTJfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzEzX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTNfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE0X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE1X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTVfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE2X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTZfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE3X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTdfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE4X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMThfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE5X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTlfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzIwX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMjBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzIxX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMjFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzIyX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMjJfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzIzX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMjNfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogcm9ib3RvLTEwMG5vcm1hbCAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogMTAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIFRoaW4gJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tVGhpbicpLFxcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gKyBcIikgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tMTAwaXRhbGljIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiAxMDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gVGhpbiBpdGFsaWMnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1UaGluaXRhbGljJyksXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gKyBcIikgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyArIFwiKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by0zMDBub3JtYWwgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBMaWdodCAnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1MaWdodCcpLFxcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF80X19fICsgXCIpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzVfX18gKyBcIikgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tMzAwaXRhbGljIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gTGlnaHQgaXRhbGljJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tTGlnaHRpdGFsaWMnKSxcXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNl9fXyArIFwiKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF83X19fICsgXCIpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTQwMG5vcm1hbCAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIFJlZ3VsYXIgJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tUmVndWxhcicpLFxcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF84X19fICsgXCIpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzlfX18gKyBcIikgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tNDAwaXRhbGljIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gUmVndWxhciBpdGFsaWMnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1SZWd1bGFyaXRhbGljJyksXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzEwX19fICsgXCIpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzExX19fICsgXCIpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTUwMG5vcm1hbCAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIE1lZGl1bSAnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1NZWRpdW0nKSxcXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTJfX18gKyBcIikgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTNfX18gKyBcIikgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tNTAwaXRhbGljIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gTWVkaXVtIGl0YWxpYycpLFxcbiAgICBsb2NhbCgnUm9ib3RvLU1lZGl1bWl0YWxpYycpLFxcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xNF9fXyArIFwiKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xNV9fXyArIFwiKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by03MDBub3JtYWwgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBCb2xkICcpLFxcbiAgICBsb2NhbCgnUm9ib3RvLUJvbGQnKSxcXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTZfX18gKyBcIikgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTdfX18gKyBcIikgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tNzAwaXRhbGljIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gQm9sZCBpdGFsaWMnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1Cb2xkaXRhbGljJyksXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE4X19fICsgXCIpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE5X19fICsgXCIpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTkwMG5vcm1hbCAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogOTAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIEJsYWNrICcpLFxcbiAgICBsb2NhbCgnUm9ib3RvLUJsYWNrJyksXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzIwX19fICsgXCIpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzIxX19fICsgXCIpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTkwMGl0YWxpYyAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogOTAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIEJsYWNrIGl0YWxpYycpLFxcbiAgICBsb2NhbCgnUm9ib3RvLUJsYWNraXRhbGljJyksXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzIyX19fICsgXCIpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzIzX19fICsgXCIpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vbm9kZV9tb2R1bGVzL3R5cGVmYWNlLXJvYm90by9pbmRleC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsNkJBQTZCO0FBQzdCO0VBQ0UscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCOzs7OzBEQUlxRCxFQUFFLG9CQUFvQjtBQUM3RTs7QUFFQSw2QkFBNkI7QUFDN0I7RUFDRSxxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEI7Ozs7MERBSTJELEVBQUUsb0JBQW9CO0FBQ25GOztBQUVBLDZCQUE2QjtBQUM3QjtFQUNFLHFCQUFxQjtFQUNyQixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQjs7OzswREFJcUQsRUFBRSxvQkFBb0I7QUFDN0U7O0FBRUEsNkJBQTZCO0FBQzdCO0VBQ0UscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCOzs7OzBEQUkyRCxFQUFFLG9CQUFvQjtBQUNuRjs7QUFFQSw2QkFBNkI7QUFDN0I7RUFDRSxxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEI7Ozs7MERBSXFELEVBQUUsb0JBQW9CO0FBQzdFOztBQUVBLDZCQUE2QjtBQUM3QjtFQUNFLHFCQUFxQjtFQUNyQixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQjs7OzsyREFJMkQsRUFBRSxvQkFBb0I7QUFDbkY7O0FBRUEsNkJBQTZCO0FBQzdCO0VBQ0UscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCOzs7OzJEQUlxRCxFQUFFLG9CQUFvQjtBQUM3RTs7QUFFQSw2QkFBNkI7QUFDN0I7RUFDRSxxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEI7Ozs7MkRBSTJELEVBQUUsb0JBQW9CO0FBQ25GOztBQUVBLDZCQUE2QjtBQUM3QjtFQUNFLHFCQUFxQjtFQUNyQixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQjs7OzsyREFJcUQsRUFBRSxvQkFBb0I7QUFDN0U7O0FBRUEsNkJBQTZCO0FBQzdCO0VBQ0UscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCOzs7OzJEQUkyRCxFQUFFLG9CQUFvQjtBQUNuRjs7QUFFQSw2QkFBNkI7QUFDN0I7RUFDRSxxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEI7Ozs7MkRBSXFELEVBQUUsb0JBQW9CO0FBQzdFOztBQUVBLDZCQUE2QjtBQUM3QjtFQUNFLHFCQUFxQjtFQUNyQixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQjs7OzsyREFJMkQsRUFBRSxvQkFBb0I7QUFDbkZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogcm9ib3RvLTEwMG5vcm1hbCAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogMTAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIFRoaW4gJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tVGhpbicpLFxcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTEwMC53b2ZmMicpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tMTAwLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by0xMDBpdGFsaWMgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDEwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBUaGluIGl0YWxpYycpLFxcbiAgICBsb2NhbCgnUm9ib3RvLVRoaW5pdGFsaWMnKSxcXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi0xMDBpdGFsaWMud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTEwMGl0YWxpYy53b2ZmJykgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tMzAwbm9ybWFsIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gTGlnaHQgJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tTGlnaHQnKSxcXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi0zMDAud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTMwMC53b2ZmJykgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tMzAwaXRhbGljIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gTGlnaHQgaXRhbGljJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tTGlnaHRpdGFsaWMnKSxcXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi0zMDBpdGFsaWMud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTMwMGl0YWxpYy53b2ZmJykgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tNDAwbm9ybWFsIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gUmVndWxhciAnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1SZWd1bGFyJyksXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tNDAwLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi00MDAud29mZicpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTQwMGl0YWxpYyAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIFJlZ3VsYXIgaXRhbGljJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tUmVndWxhcml0YWxpYycpLFxcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTQwMGl0YWxpYy53b2ZmMicpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tNDAwaXRhbGljLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by01MDBub3JtYWwgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBNZWRpdW0gJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tTWVkaXVtJyksXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tNTAwLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi01MDAud29mZicpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTUwMGl0YWxpYyAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIE1lZGl1bSBpdGFsaWMnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1NZWRpdW1pdGFsaWMnKSxcXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi01MDBpdGFsaWMud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTUwMGl0YWxpYy53b2ZmJykgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tNzAwbm9ybWFsIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gQm9sZCAnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1Cb2xkJyksXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tNzAwLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi03MDAud29mZicpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTcwMGl0YWxpYyAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIEJvbGQgaXRhbGljJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tQm9sZGl0YWxpYycpLFxcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTcwMGl0YWxpYy53b2ZmMicpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tNzAwaXRhbGljLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by05MDBub3JtYWwgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBCbGFjayAnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1CbGFjaycpLFxcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTkwMC53b2ZmMicpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tOTAwLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by05MDBpdGFsaWMgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBCbGFjayBpdGFsaWMnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1CbGFja2l0YWxpYycpLFxcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTkwMGl0YWxpYy53b2ZmMicpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tOTAwaXRhbGljLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiYmFja2dyb3VuZC5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCI6cm9vdHtcXG4gIC0tY29sb3ItZ3JleTogIzkxOGQ4ZDtcXG4gIC0tY29sb3ItYmx1ZTogIzQ4OTNjYztcXG4gIC0tZGFyay1ibHVlOiAjNmFhMWNiYmRcXG59XFxuXFxuKiB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG9cXFwiLCBzYW5zLXNlcmlmO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcblxcbmJvZHl7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbm1heCg0MDBweCwgODAwcHgpO1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKTtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLWF0dGFjaG1lbnQ6IGZpeGVkO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG59XFxuXFxuLm1haW57XFxuICBvdmVyZmxvdzogYXV0bztcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxMjBweCAxMDBweCAxZnI7XFxufVxcblxcbmgxIHtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBwYWRkaW5nLWxlZnQ6IDBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogM3JlbTtcXG4gIGNvbG9yOnZhcigtLWNvbG9yLWJsdWUpO1xcbn1cXG4uY29udGVudCB7XFxuICBkaXNwbGF5OiBncmlkO1xcblxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XFxuICB3aWR0aDogOTAlO1xcbiAgIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbn1cXG5cXG4udG9wLXNlY3Rpb257XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxMzBweCA3NXB4O1xcbn1cXG5cXG4vKiBtYWluICovXFxuLmxlZnQge1xcbiAgZ3JpZC1jb2x1bW4tc3RhcnQ6IDE7XFxuICBncmlkLWNvbHVtbi1lbmQ6IDI7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxufVxcblxcbi5yaWdodCB7XFxuICBncmlkLWNvbHVtbi1zdGFydDogMjtcXG4gIGdyaWQtY29sdW1uLWVuZDogMztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4ubGVmdCwgXFxuLnJpZ2h0e1xcbiAgY29sb3I6d2hpdGU7XFxufVxcblxcbi5ib3R0b20ge1xcbiAgICBncmlkLWNvbHVtbi1zdGFydDogMTtcXG4gICAgZ3JpZC1jb2x1bW4tZW5kOiAzO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICAgIGdhcDogMjBweDtcXG4gICAgbWFyZ2luOiAwcHggMTBweDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgb3ZlcmZsb3c6IGF1dG87XFxuICAgIHBhZGRpbmc6IDVweCA0cHg7XFxufVxcblxcbi5ib3R0b20gcCB7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICBjb2xvcjogd2hpdGU7XFxuICBmb250LXdlaWdodDogNDAwO1xcbn1cXG5cXG4vKiBmb3JtICovXFxuZm9ybSB7XFxuICBncmlkLWNvbHVtbi1zdGFydDogMTtcXG4gIGdyaWQtY29sdW1uLWVuZDogMztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBtYXJnaW4tdG9wOiAxNXB4O1xcbiAgZ2FwOiA1cHg7XFxufVxcblxcbmlucHV0IHtcXG4gIHdpZHRoOiAyMDBweDtcXG4gIHBhZGRpbmctbGVmdDogMTBweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcXG4gIGhlaWdodDogNDBweDtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbn1cXG5cXG5idXR0b24ge1xcbiAgcGFkZGluZzogNXB4IDEwcHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIGhlaWdodDogNDBweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLyogaXRlbXMgZnJvbSBkYWlseSAqL1xcblxcbi50ZW1wV3JpdHRpbmcge1xcbiAgZm9udC1zaXplOiA0cmVtO1xcbiAgaGVpZ2h0OiBtaW4tY29udGVudDtcXG59XFxuXFxuLmNpdHlXcml0dGluZyB7XFxuICBmb250LXNpemU6IDIuNXJlbTtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxufVxcbi5pY29uIHtcXG4gIGhlaWdodDogNjBweDtcXG59XFxuLmljb25pbWcge1xcbiAgaGVpZ2h0OiA3NXB4O1xcbn1cXG4vKiBib3ggY29udHJvbHMgKi9cXG4uYnV0dG9uSG9sZGVye1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBtYXJnaW46IDEwcHggNDBweDtcXG59XFxuLlNWR0hPTERFUntcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBwbGFjZS1pdGVtczogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcbi5jaXJjbGV7XFxuICBoZWlnaHQ6IDEwcHg7XFxuICB3aWR0aDogMTBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbn1cXG5cXG4vKiBmb3JlY2FzdCBib3ggKi9cXG5cXG4uZm9yZWNhc3R7XFxuICAgIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xcbiAgICBvdmVyZmxvdzogYXV0bztcXG4gICAgZ3JpZC1jb2x1bW4tc3RhcnQ6IDE7XFxuICAgIGdyaWQtY29sdW1uLWVuZDogMztcXG4gICAgICAgIHdpZHRoOiBjYWxjKDEwMCUgLSA0NXB4KTtcXG4gICAgbWFyZ2luLWJvdHRvbTogMjBweCAhaW1wb3J0YW50O1xcbn1cXG5cXG4udmlld3tcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBvdmVyZmxvdzogYXV0bztcXG4gIGdhcDogMTBweDtcXG59XFxuXFxuLmZvcmVjYXN0Qm94IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG4uZm9yZWNhc3RCb3ggZGl2IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi50b2RheUJveCB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcXG4gIGhlaWdodDogbWluLWNvbnRlbnQ7XFxufVxcbi50b2RheUJveDpudGgtY2hpbGQoMSl7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4udG9kYXlCb3ggPiBwIHtcXG4gIG1hcmdpbjogMTBweDtcXG4gIGZvbnQtc2l6ZTogMS4zcmVtO1xcbiAgbWFyZ2luLXRvcDogMHB4O1xcbn1cXG5cXG4udG9kYXlCb3ggLmZvcmVjYXN0Qm94Om50aC1jaGlsZChldmVuKSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmNDA7XFxufVxcblxcbi5pY29uc3tcXG4gIGhlaWdodDogNDVweDtcXG59XFxuLyogTkFWICovXFxubmF2IHtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuXFxuLm5hdmNvcm5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogNTAlO1xcbiAgYm9yZGVyLXJhZGl1czogMCUgNXJlbSA1cmVtIDAlO1xcbn1cXG5cXG4uQywgLkYge1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgYm9yZGVyLXJhZGl1czogLjVyZW07XFxuICBoZWlnaHQ6IDQwcHg7XFxuICBhc3BlY3QtcmF0aW86IDEvMTtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDBweCAycHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5De1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcbi5Ge1xcbiBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLmhpZGV7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uYm9yZGVyc3tcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstYmx1ZSk7XFxuICBib3JkZXI6IHNvbGlkIHdoaXRlIDNweDtcXG4gIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBtYXJnaW46IDEwcHg7XFxufVxcblxcbi5ib3R0b21Cb3JkZXJUb3B7XFxuICBib3JkZXItdG9wOiAzcHggc29saWQgd2hpdGU7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxxQkFBcUI7RUFDckIscUJBQXFCO0VBQ3JCO0FBQ0Y7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsVUFBVTtFQUNWLGlDQUFpQztFQUNqQyxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLDJDQUEyQztFQUMzQyxtREFBaUM7RUFDakMsMkJBQTJCO0VBQzNCLDRCQUE0QjtFQUM1Qiw0QkFBNEI7RUFDNUIsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsY0FBYztFQUNkLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsMEJBQTBCO0VBQzFCLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLGFBQWE7RUFDYixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZix1QkFBdUI7QUFDekI7QUFDQTtFQUNFLGFBQWE7O0VBRWIsMEJBQTBCO0VBQzFCLFVBQVU7R0FDVCxvQkFBb0I7QUFDdkI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLDhCQUE4QjtBQUNoQzs7QUFFQSxTQUFTO0FBQ1Q7RUFDRSxvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsdUJBQXVCO0FBQ3pCOztBQUVBOztFQUVFLFdBQVc7QUFDYjs7QUFFQTtJQUNJLG9CQUFvQjtJQUNwQixrQkFBa0I7SUFDbEIsYUFBYTtJQUNiLDJCQUEyQjtJQUMzQixTQUFTO0lBQ1QsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixjQUFjO0lBQ2QsZ0JBQWdCO0FBQ3BCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1osZ0JBQWdCO0FBQ2xCOztBQUVBLFNBQVM7QUFDVDtFQUNFLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLFFBQVE7QUFDVjs7QUFFQTtFQUNFLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsWUFBWTtFQUNaLHFCQUFxQjtFQUNyQixZQUFZO0VBQ1osaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLFlBQVk7RUFDWixxQkFBcUI7RUFDckIsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixlQUFlO0FBQ2pCOztBQUVBLHFCQUFxQjs7QUFFckI7RUFDRSxlQUFlO0VBQ2YsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGdCQUFnQjtBQUNsQjtBQUNBO0VBQ0UsWUFBWTtBQUNkO0FBQ0E7RUFDRSxZQUFZO0FBQ2Q7QUFDQSxpQkFBaUI7QUFDakI7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLG1CQUFtQjtFQUNuQixpQkFBaUI7QUFDbkI7QUFDQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsNkJBQTZCO0FBQy9CO0FBQ0E7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLHVCQUF1QjtFQUN2QixrQkFBa0I7QUFDcEI7O0FBRUEsaUJBQWlCOztBQUVqQjtJQUNJLG9CQUFvQjtJQUNwQixhQUFhO0lBQ2IsNEJBQTRCO0lBQzVCLGNBQWM7SUFDZCxvQkFBb0I7SUFDcEIsa0JBQWtCO1FBQ2Qsd0JBQXdCO0lBQzVCLDhCQUE4QjtBQUNsQzs7QUFFQTtFQUNFLGFBQWE7RUFDYixjQUFjO0VBQ2QsU0FBUztBQUNYOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHFDQUFxQztFQUNyQyxtQkFBbUI7RUFDbkIsdUJBQXVCO0FBQ3pCO0FBQ0E7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQixtQkFBbUI7QUFDckI7QUFDQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLFlBQVk7QUFDZDtBQUNBLFFBQVE7QUFDUjtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osVUFBVTtFQUNWLDhCQUE4QjtBQUNoQzs7QUFFQTtFQUNFLFlBQVk7RUFDWixvQkFBb0I7RUFDcEIsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixlQUFlO0FBQ2pCO0FBQ0E7RUFDRSxjQUFjO0FBQ2hCO0FBQ0E7Q0FDQyxjQUFjO0FBQ2Y7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxrQ0FBa0M7RUFDbEMsdUJBQXVCO0VBQ3ZCLHFCQUFxQjtFQUNyQixhQUFhO0VBQ2IsWUFBWTtBQUNkOztBQUVBO0VBQ0UsMkJBQTJCO0FBQzdCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjpyb290e1xcbiAgLS1jb2xvci1ncmV5OiAjOTE4ZDhkO1xcbiAgLS1jb2xvci1ibHVlOiAjNDg5M2NjO1xcbiAgLS1kYXJrLWJsdWU6ICM2YWExY2JiZFxcbn1cXG5cXG4qIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90b1xcXCIsIHNhbnMtc2VyaWY7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuXFxuYm9keXtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KDQwMHB4LCA4MDBweCk7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXFxcImJhY2tncm91bmQuanBnXFxcIik7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1hdHRhY2htZW50OiBmaXhlZDtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxufVxcblxcbi5tYWlue1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBkaXNwbGF5OiBncmlkO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMTIwcHggMTAwcHggMWZyO1xcbn1cXG5cXG5oMSB7XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgcGFkZGluZy1sZWZ0OiAwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDNyZW07XFxuICBjb2xvcjp2YXIoLS1jb2xvci1ibHVlKTtcXG59XFxuLmNvbnRlbnQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG5cXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xcbiAgd2lkdGg6IDkwJTtcXG4gICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG59XFxuXFxuLnRvcC1zZWN0aW9ue1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMTMwcHggNzVweDtcXG59XFxuXFxuLyogbWFpbiAqL1xcbi5sZWZ0IHtcXG4gIGdyaWQtY29sdW1uLXN0YXJ0OiAxO1xcbiAgZ3JpZC1jb2x1bW4tZW5kOiAyO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG4ucmlnaHQge1xcbiAgZ3JpZC1jb2x1bW4tc3RhcnQ6IDI7XFxuICBncmlkLWNvbHVtbi1lbmQ6IDM7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLmxlZnQsIFxcbi5yaWdodHtcXG4gIGNvbG9yOndoaXRlO1xcbn1cXG5cXG4uYm90dG9tIHtcXG4gICAgZ3JpZC1jb2x1bW4tc3RhcnQ6IDE7XFxuICAgIGdyaWQtY29sdW1uLWVuZDogMztcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgICBnYXA6IDIwcHg7XFxuICAgIG1hcmdpbjogMHB4IDEwcHg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIG92ZXJmbG93OiBhdXRvO1xcbiAgICBwYWRkaW5nOiA1cHggNHB4O1xcbn1cXG5cXG4uYm90dG9tIHAge1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG59XFxuXFxuLyogZm9ybSAqL1xcbmZvcm0ge1xcbiAgZ3JpZC1jb2x1bW4tc3RhcnQ6IDE7XFxuICBncmlkLWNvbHVtbi1lbmQ6IDM7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWFyZ2luLXRvcDogMTVweDtcXG4gIGdhcDogNXB4O1xcbn1cXG5cXG5pbnB1dCB7XFxuICB3aWR0aDogMjAwcHg7XFxuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XFxuICBoZWlnaHQ6IDQwcHg7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG59XFxuXFxuYnV0dG9uIHtcXG4gIHBhZGRpbmc6IDVweCAxMHB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBoZWlnaHQ6IDQwcHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi8qIGl0ZW1zIGZyb20gZGFpbHkgKi9cXG5cXG4udGVtcFdyaXR0aW5nIHtcXG4gIGZvbnQtc2l6ZTogNHJlbTtcXG4gIGhlaWdodDogbWluLWNvbnRlbnQ7XFxufVxcblxcbi5jaXR5V3JpdHRpbmcge1xcbiAgZm9udC1zaXplOiAyLjVyZW07XFxuICBmb250LXdlaWdodDogMzAwO1xcbn1cXG4uaWNvbiB7XFxuICBoZWlnaHQ6IDYwcHg7XFxufVxcbi5pY29uaW1nIHtcXG4gIGhlaWdodDogNzVweDtcXG59XFxuLyogYm94IGNvbnRyb2xzICovXFxuLmJ1dHRvbkhvbGRlcntcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWFyZ2luOiAxMHB4IDQwcHg7XFxufVxcbi5TVkdIT0xERVJ7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG4uY2lyY2xle1xcbiAgaGVpZ2h0OiAxMHB4O1xcbiAgd2lkdGg6IDEwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuXFxuLyogZm9yZWNhc3QgYm94ICovXFxuXFxuLmZvcmVjYXN0e1xcbiAgICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmcjtcXG4gICAgb3ZlcmZsb3c6IGF1dG87XFxuICAgIGdyaWQtY29sdW1uLXN0YXJ0OiAxO1xcbiAgICBncmlkLWNvbHVtbi1lbmQ6IDM7XFxuICAgICAgICB3aWR0aDogY2FsYygxMDAlIC0gNDVweCk7XFxuICAgIG1hcmdpbi1ib3R0b206IDIwcHggIWltcG9ydGFudDtcXG59XFxuXFxuLnZpZXd7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBnYXA6IDEwcHg7XFxufVxcblxcbi5mb3JlY2FzdEJveCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuLmZvcmVjYXN0Qm94IGRpdiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4udG9kYXlCb3gge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XFxuICBoZWlnaHQ6IG1pbi1jb250ZW50O1xcbn1cXG4udG9kYXlCb3g6bnRoLWNoaWxkKDEpe1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLnRvZGF5Qm94ID4gcCB7XFxuICBtYXJnaW46IDEwcHg7XFxuICBmb250LXNpemU6IDEuM3JlbTtcXG4gIG1hcmdpbi10b3A6IDBweDtcXG59XFxuXFxuLnRvZGF5Qm94IC5mb3JlY2FzdEJveDpudGgtY2hpbGQoZXZlbikge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjQwO1xcbn1cXG5cXG4uaWNvbnN7XFxuICBoZWlnaHQ6IDQ1cHg7XFxufVxcbi8qIE5BViAqL1xcbm5hdiB7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbi5uYXZjb3JuZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDUwJTtcXG4gIGJvcmRlci1yYWRpdXM6IDAlIDVyZW0gNXJlbSAwJTtcXG59XFxuXFxuLkMsIC5GIHtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGJvcmRlci1yYWRpdXM6IC41cmVtO1xcbiAgaGVpZ2h0OiA0MHB4O1xcbiAgYXNwZWN0LXJhdGlvOiAxLzE7XFxuICBmb250LXNpemU6IDJyZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBwYWRkaW5nOiAwcHggMnB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4uQ3tcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG4uRntcXG4gZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi5oaWRle1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLmJvcmRlcnN7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLWJsdWUpO1xcbiAgYm9yZGVyOiBzb2xpZCB3aGl0ZSAzcHg7XFxuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgbWFyZ2luOiAxMHB4O1xcbn1cXG5cXG4uYm90dG9tQm9yZGVyVG9we1xcbiAgYm9yZGVyLXRvcDogM3B4IHNvbGlkIHdoaXRlO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIvKiBlc2xpbnQtZGlzYWJsZSBndWFyZC1mb3ItaW4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtc3ludGF4ICovXG5cbmltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5pbXBvcnQgXCJ0eXBlZmFjZS1yb2JvdG9cIjtcbmltcG9ydCBnZXRXZWF0aGVyVG9kYXkgZnJvbSBcIi4vdG9kYXlXZWF0aGVyXCJcbmltcG9ydCBnZXRXZWF0aGVyRm91ckRheXMgZnJvbSBcIi4vZm91cldlYXRoZXJcIlxuaW1wb3J0IG1vdmUgZnJvbSBcIi4vbW92ZVwiXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcblxuICAvLyBnZXQgZm9ybSBhbmQgYWRkIGV2ZW50IGxpc3RlbmVyXG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKTtcblxuICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2ZW50KSA9PiB7XG4gICAgLy8gc3RvcCBmdWxsIHN1Ym1pdFxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gcGFzcyB0aHJvdWdoIHRvIGdldCB0b2RheSdzIHdlYXRoZXJcbiAgICBnZXRXZWF0aGVyVG9kYXkoZm9ybS5jaXR5LnZhbHVlKS5jYXRjaCgoKSA9PiB7XG4gICAgICBmb3JtLmNpdHkuc2V0Q3VzdG9tVmFsaWRpdHkoXCJDaXR5IG5vdCBmb3VuZFwiKTtcbiAgICAgIGZvcm0uY2l0eS5yZXBvcnRWYWxpZGl0eSgpO1xuICAgIH0pO1xuICAgIFxuICAgIGdldFdlYXRoZXJGb3VyRGF5cyhmb3JtLmNpdHkudmFsdWUpLmNhdGNoKCgpID0+IHtcbiAgICAgICAgZm9ybS5jaXR5LnNldEN1c3RvbVZhbGlkaXR5KCdDaXR5IG5vdCBmb3VuZCcpXG4gICAgICAgIGZvcm0uY2l0eS5yZXBvcnRWYWxpZGl0eSgpXG4gICAgfSkgICAgXG4gIH0pO1xuXG4gIC8vIGFsbG93IHVzZXIgdG8gY2hhbmdlIGlucHV0IHRvIHZhbGlkIGNpdHksXG4gIC8vIGFmdGVyIGJhZCByZXNwb25zZS5cbiAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKCkgPT4ge1xuICAgIGZvcm0uY2l0eS5zZXRDdXN0b21WYWxpZGl0eShcIlwiKTtcbiAgICBmb3JtLmNpdHkucmVwb3J0VmFsaWRpdHkoKTtcbiAgfSk7XG5cbiAgY29uc3QgY29udHJvbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb250cm9sJylcbiAgY29udHJvbC5mb3JFYWNoKCBidXR0b24gPT4ge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXsgIFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuICAgICAgdGhpcy5pZCA9PT0gJ2J1dHRvblJpZ2h0JyA/IG1vdmUoJ3JpZ2h0JykgOiBtb3ZlKCdsZWZ0Jyk7XG4gICAgfSlcbiAgfSlcbn0pOyJdLCJuYW1lcyI6WyJkZWdyZWUiLCJhZGRGb3VyVG9QYWdlIiwic2VwZXJhdGUiLCJtZWFzdXJlIiwiY291bnRlciIsImRheSIsImRhdGUiLCJEYXRlIiwiZHRfdHh0IiwidG9kYXkiLCJ0b2RheUJveCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsInNldEF0dHJpYnV0ZSIsInAiLCJ0ZXh0Q29udGVudCIsInRvRGF0ZVN0cmluZyIsInRvTG9jYWxlU3RyaW5nIiwid2Vla2RheSIsImFwcGVuZCIsInF1ZXJ5U2VsZWN0b3IiLCJ0aGlzRGF5IiwiaG91ciIsImhvdXJzIiwiZ2V0SG91cnMiLCJ0b1N0cmluZyIsImxlbmd0aCIsImljb24iLCJ3ZWF0aGVyIiwidGVtcCIsIk1hdGgiLCJyb3VuZCIsIm1haW4iLCJsaXN0b2ZpbmZvIiwiYm94IiwiZ2V0RWxlbWVudEJ5SWQiLCJpdGVtIiwic21hbGwiLCJpbWFnZSIsInNyYyIsInN0eWxlIiwiZGlzcGxheSIsImNsZWFyIiwiZW1wdHlUb3AiLCJsaXN0b2Zsb2NhdGlvbnMiLCJmb3JFYWNoIiwiZ2V0RGF5cyIsInN3aXRjaFVuaXQiLCJnZXRXZWF0aGVyRm91ckRheXMiLCJjaXR5IiwiY2lyY2xlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjaXJjbGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjaXR5UmVzcG9uc2UiLCJmZXRjaCIsIm1vZGUiLCJjaXR5RGF0YSIsImpzb24iLCJyZXNwb25zZSIsImxhdCIsImxvbiIsInJlc3BvbnNlVHdvIiwiZGF0YSIsImRhdGFUd28iLCJzZXBlcmF0ZVR3byIsImlucHV0Iiwid2hlcmUiLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJsYXN0Q2hpbGQiLCJhZGR0byIsImluZm8iLCJhbHQiLCJuZXh0IiwibGlzdCIsImZpcnN0IiwicHVzaCIsInNsaWNlIiwibW92ZSIsImQiLCJib3hlcyIsImIiLCJtb3ZlQm90dG9tIiwiYm90dG9tIiwic2Nyb2xsTGVmdCIsIm1vdmVCYXIiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJhZGRFdmVudExpc3RlbmVyIiwiY2hvaWNlIiwiZGVncmVlcyIsImFsbEMiLCJhbGxGIiwiZWxlbWVudCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInRvZGF5SW5mbyIsInN5bWJvbCIsImNvbnNvbGUiLCJsb2ciLCJjbG91ZHMiLCJhbGwiLCJmZWVscyIsImZlZWxzX2xpa2UiLCJodW1pZGl0eSIsIndpbmRTcGVlZCIsIndpbmQiLCJzcGVlZCIsInN1bnJpc2VEYXRhIiwic3lzIiwic3VucmlzZSIsInJpc2VIb3VycyIsInJpc2VNaW51dGVzIiwiZ2V0TWludXRlcyIsInN1YnN0ciIsInN1bnNldERhdGEiLCJzdW5zZXQiLCJzZXRIb3VycyIsInNldE1pbnV0ZXMiLCJkZXNjcmlwdGlvbiIsImxvY2F0aW9uIiwibmFtZSIsImRpc3BsYXlUZW1wIiwiZGlzcGxheVdpbmQiLCJnZXRXZWF0aGVyVG9kYXkiLCJyZXNwb25zZUYiLCJkYXRhRiIsImZvcm0iLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwidmFsdWUiLCJjYXRjaCIsInNldEN1c3RvbVZhbGlkaXR5IiwicmVwb3J0VmFsaWRpdHkiLCJjb250cm9sIiwiYnV0dG9uIiwiaWQiXSwic291cmNlUm9vdCI6IiJ9