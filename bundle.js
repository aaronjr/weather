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
  // pass long and lat into second API
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
let counter = 0;
const circles = document.querySelectorAll('.circle');
function move(d) {
  if (d === 'right' && counter !== 5) {
    // do something
    counter += 1;
  } else if (d === 'left' && counter !== 0) {
    // do something
    counter -= 1;
  } else {
    // do nothing
  }
  circles.forEach(circle => {
    // eslint-disable-next-line no-param-reassign
    circle.style.backgroundColor = 'white';
  });
  document.getElementById(`circle${counter}`).style.backgroundColor = 'black';
  const boxes = document.querySelectorAll('.todayBox');
  boxes.forEach(b => {
    // eslint-disable-next-line no-param-reassign
    b.style.display = 'none';
  });
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
  const bottom = document.querySelector('.bottom');

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
  document.getElementById('search').addEventListener('click', () => {
    clearInterval(moveBar);
  });

  // // on new search stop event so it can restart
  bottom.addEventListener('mouseover', () => {
    clearInterval(moveBar);
  });

  // on touch - phone, stop movebar
  bottom.addEventListener('touchstart', () => {
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
  degrees.forEach(element => {
    // eslint-disable-next-line prefer-arrow-callback
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

function todayInfo(data, symbol) {
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
// small.className = measure === 'C' ? "smallDiv degreeOfC" : "smallDiv degreeOfF";

async function getWeatherToday(city) {
  (0,_emptyTop__WEBPACK_IMPORTED_MODULE_2__["default"])();
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
  (0,_moveBottom__WEBPACK_IMPORTED_MODULE_0__["default"])();
  // switchUnit()
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
___CSS_LOADER_EXPORT___.push([module.id, ":root{\n  --color-grey: #918d8d;\n  --color-blue: #4893cc;\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  font-family: \"Roboto\", sans-serif;\n  user-select: none;\n}\n\nbody{\n  display: grid;\n  justify-content: center;\n  grid-template-columns: minmax(400px, 800px);\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-position: center;\n  background-repeat: no-repeat;\n  background-attachment: fixed;\n  background-size: cover;\n}\n\n.main{\n  overflow: auto;\n  display: grid;\n  justify-content: center;\n  grid-template-columns: 1fr;\n  grid-template-rows: 120px 100px 1fr;\n}\n\nh1 {\n  padding: 20px;\n  padding-left: 0px;\n  text-align: center;\n  font-size: 3rem;\n  color:var(--color-blue);\n}\n.content {\n  display: grid;\n  width: 100%;\n  min-height: 100%;\n  grid-template-columns: 1fr 1fr;\n  grid-template-rows: 150px 50px;\n}\n\n/* main */\n.left {\n  grid-column-start: 1;\n  grid-column-end: 2;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n.right {\n  grid-column-start: 2;\n  grid-column-end: 4;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n.left, \n.right{\n  color:white;\n}\n\n.bottom {\n  grid-column-start: 1;\n  grid-column-end: 4;\n  display: flex;\n  justify-content: flex-start;\n  gap: 20px;\n  margin: 5px 10px;\n  align-items: center;\n  overflow: auto;\n}\n\n.bottom p {\n  font-size: 1.5rem;\n  white-space: nowrap;\n  font-weight: 300;\n}\n\n/* form */\nform {\n  grid-column-start: 1;\n  grid-column-end: 4;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin-top: 15px;\n  gap: 5px;\n}\n\ninput {\n  width: 200px;\n  padding-left: 10px;\n  border: none;\n  border-radius: 0.5rem;\n  height: 40px;\n  font-size: 1.5rem;\n}\n\nbutton {\n  padding: 5px 10px;\n  border: none;\n  border-radius: 0.5rem;\n  background-color: white;\n  height: 40px;\n  cursor: pointer;\n}\n\n/* items from daily */\n\n.tempWritting {\n  font-size: 4rem;\n  height: min-content;\n}\n\n.cityWritting {\n  font-size: 2.5rem;\n  font-weight: 300;\n}\n.icon {\n  height: 60px;\n}\n.iconimg {\n  height: 75px;\n}\n/* box controls */\n.buttonHolder{\n  display: none;\n  justify-content: space-between;\n  align-items: center;\n  margin: 10px 40px;\n}\n.SVGHOLDER{\n  display: grid;\n  place-items: center;\n  background-color: transparent;\n}\n.circle{\n  height: 10px;\n  width: 10px;\n  background-color: white;\n  border-radius: 50%;\n}\n\n/* forecast box */\n.forecast{\n  display: grid;\n  grid-template-rows: auto 1fr;\n  overflow: auto;\n  grid-column-start: 1;\n  grid-column-end: 4;\n  min-height: 530px;\n}\n.view{\n  display: grid;\n  overflow: auto;\n  margin: 10px;\n  gap: 10px;\n  padding-bottom: 20px;\n}\n.forecastBox {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  align-items: center;\n  justify-content: center;\n}\n.forecastBox div {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.todayBox {\n  display: none;\n  flex-direction: column;\n  text-align: center;\n  border-radius: 0.5rem;\n  box-shadow: 5px 5px 10px 1px  var(--color-grey);\n  height: min-content;\n  padding: 5px;\n  margin: 10px 25px;\n}\n.todayBox:nth-child(1){\n  display: flex;\n}\n\n.todayBox > p {\n  margin: 10px;\n  font-size: 1.3rem;\n}\n\n.todayBox .forecastBox:nth-child(even) {\n  background-color: #ffffff40;\n}\n\n.icons{\n  height: 45px;\n}\n/* NAV */\nnav {\n  height: 100%;\n}\n\n.navcorner {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: white;\n  height: 100%;\n  width: 50%;\n  border-radius: 0% 5rem 5rem 0%;\n}\n\n.C, .F {\n  color: white;\n  border-radius: .5rem;\n  height: 40px;\n  aspect-ratio: 1/1;\n  font-size: 2rem;\n  text-align: center;\n  padding: 0px 2px;\n  cursor: pointer;\n}\n.C{\n  display: block;\n}\n.F{\n display: block;\n}\n\n.hide{\n  display: none;\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":[":root{\n  --color-grey: #918d8d;\n  --color-blue: #4893cc;\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  font-family: \"Roboto\", sans-serif;\n  user-select: none;\n}\n\nbody{\n  display: grid;\n  justify-content: center;\n  grid-template-columns: minmax(400px, 800px);\n  background: url(\"background.jpg\");\n  background-position: center;\n  background-repeat: no-repeat;\n  background-attachment: fixed;\n  background-size: cover;\n}\n\n.main{\n  overflow: auto;\n  display: grid;\n  justify-content: center;\n  grid-template-columns: 1fr;\n  grid-template-rows: 120px 100px 1fr;\n}\n\nh1 {\n  padding: 20px;\n  padding-left: 0px;\n  text-align: center;\n  font-size: 3rem;\n  color:var(--color-blue);\n}\n.content {\n  display: grid;\n  width: 100%;\n  min-height: 100%;\n  grid-template-columns: 1fr 1fr;\n  grid-template-rows: 150px 50px;\n}\n\n/* main */\n.left {\n  grid-column-start: 1;\n  grid-column-end: 2;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n.right {\n  grid-column-start: 2;\n  grid-column-end: 4;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n.left, \n.right{\n  color:white;\n}\n\n.bottom {\n  grid-column-start: 1;\n  grid-column-end: 4;\n  display: flex;\n  justify-content: flex-start;\n  gap: 20px;\n  margin: 5px 10px;\n  align-items: center;\n  overflow: auto;\n}\n\n.bottom p {\n  font-size: 1.5rem;\n  white-space: nowrap;\n  font-weight: 300;\n}\n\n/* form */\nform {\n  grid-column-start: 1;\n  grid-column-end: 4;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin-top: 15px;\n  gap: 5px;\n}\n\ninput {\n  width: 200px;\n  padding-left: 10px;\n  border: none;\n  border-radius: 0.5rem;\n  height: 40px;\n  font-size: 1.5rem;\n}\n\nbutton {\n  padding: 5px 10px;\n  border: none;\n  border-radius: 0.5rem;\n  background-color: white;\n  height: 40px;\n  cursor: pointer;\n}\n\n/* items from daily */\n\n.tempWritting {\n  font-size: 4rem;\n  height: min-content;\n}\n\n.cityWritting {\n  font-size: 2.5rem;\n  font-weight: 300;\n}\n.icon {\n  height: 60px;\n}\n.iconimg {\n  height: 75px;\n}\n/* box controls */\n.buttonHolder{\n  display: none;\n  justify-content: space-between;\n  align-items: center;\n  margin: 10px 40px;\n}\n.SVGHOLDER{\n  display: grid;\n  place-items: center;\n  background-color: transparent;\n}\n.circle{\n  height: 10px;\n  width: 10px;\n  background-color: white;\n  border-radius: 50%;\n}\n\n/* forecast box */\n.forecast{\n  display: grid;\n  grid-template-rows: auto 1fr;\n  overflow: auto;\n  grid-column-start: 1;\n  grid-column-end: 4;\n  min-height: 530px;\n}\n.view{\n  display: grid;\n  overflow: auto;\n  margin: 10px;\n  gap: 10px;\n  padding-bottom: 20px;\n}\n.forecastBox {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  align-items: center;\n  justify-content: center;\n}\n.forecastBox div {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.todayBox {\n  display: none;\n  flex-direction: column;\n  text-align: center;\n  border-radius: 0.5rem;\n  box-shadow: 5px 5px 10px 1px  var(--color-grey);\n  height: min-content;\n  padding: 5px;\n  margin: 10px 25px;\n}\n.todayBox:nth-child(1){\n  display: flex;\n}\n\n.todayBox > p {\n  margin: 10px;\n  font-size: 1.3rem;\n}\n\n.todayBox .forecastBox:nth-child(even) {\n  background-color: #ffffff40;\n}\n\n.icons{\n  height: 45px;\n}\n/* NAV */\nnav {\n  height: 100%;\n}\n\n.navcorner {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: white;\n  height: 100%;\n  width: 50%;\n  border-radius: 0% 5rem 5rem 0%;\n}\n\n.C, .F {\n  color: white;\n  border-radius: .5rem;\n  height: 40px;\n  aspect-ratio: 1/1;\n  font-size: 2rem;\n  text-align: center;\n  padding: 0px 2px;\n  cursor: pointer;\n}\n.C{\n  display: block;\n}\n.F{\n display: block;\n}\n\n.hide{\n  display: none;\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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T0FBTyxDQUFDeEYsT0FBTyxDQUFFeUYsTUFBTSxJQUFJO0lBQ3pCO0lBQ0FBLE1BQU0sQ0FBQzdDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFVO01BQ3pDO01BQ0EsSUFBSSxDQUFDOEMsRUFBRSxLQUFLLGFBQWEsR0FBR3hELGlEQUFJLENBQUMsT0FBTyxDQUFDLEdBQUdBLGlEQUFJLENBQUMsTUFBTSxDQUFDO0lBQzFELENBQUMsQ0FBQztFQUNKLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci8uL3NyYy9hZGRGb3VyLmpzIiwid2VicGFjazovL3dlYXRoZXIvLi9zcmMvZW1wdHlUb3AuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL3NyYy9mb3VyV2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vc3JjL2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vc3JjL2dldERheXMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL3NyYy9tb3ZlLmpzIiwid2VicGFjazovL3dlYXRoZXIvLi9zcmMvbW92ZUJvdHRvbS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vc3JjL3N3aXRjaFVuaXQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL3NyYy90b2RheUluZm8uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL3NyYy90b2RheVdlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL25vZGVfbW9kdWxlcy90eXBlZmFjZS1yb2JvdG8vaW5kZXguY3NzIiwid2VicGFjazovL3dlYXRoZXIvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3dlYXRoZXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3dlYXRoZXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL3dlYXRoZXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL3R5cGVmYWNlLXJvYm90by9pbmRleC5jc3M/MDEzZSIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3dlYXRoZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3dlYXRoZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3dlYXRoZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXIvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly93ZWF0aGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXIvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vd2VhdGhlci93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly93ZWF0aGVyL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGd1YXJkLWZvci1pbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cblxuLy8gRGVncmVlIHN5bWJvbFxuY29uc3QgZGVncmVlID0gXCJcXHUwMEIwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZEZvdXJUb1BhZ2Uoc2VwZXJhdGUsIG1lYXN1cmUpe1xuICAgIC8vIGNvdW50ZXIgZm9yIGJveGlkXG4gICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgIC8vIGxvb3Agb3ZlciBlYWNoIGRheVxuICAgIGZvciAoY29uc3QgZGF5IGluIHNlcGVyYXRlKSB7XG4gICAgICAgIC8vIHRvZGF5IGFuZCBuZXcgZGF0ZSBiYXNlZCBvbiB0aGUgaW5wdXRcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHNlcGVyYXRlW2RheV1bMF1bMF0uZHRfdHh0KTtcbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIC8vIGNyZWF0ZSBkYXkgYm94XG4gICAgICAgIGNvbnN0IHRvZGF5Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdG9kYXlCb3guY2xhc3NOYW1lID0gXCJ0b2RheUJveFwiO1xuICAgICAgICB0b2RheUJveC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgZGF5JHtkYXl9YCk7XG5cbiAgICAgICAgLy8gdGl0bGUgb2YgYm94XG4gICAgICAgIGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgcC50ZXh0Q29udGVudCA9XG4gICAgICAgICAgdG9kYXkudG9EYXRlU3RyaW5nKCkgPT09IGRhdGUudG9EYXRlU3RyaW5nKClcbiAgICAgICAgICAgID8gXCJUb2RheVwiXG4gICAgICAgICAgICA6IGRhdGUudG9Mb2NhbGVTdHJpbmcoXCJlbi11a1wiLCB7IHdlZWtkYXk6IFwibG9uZ1wiIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gYWRkIHRvIGJveFxuICAgICAgICB0b2RheUJveC5hcHBlbmQocCk7XG5cbiAgICAgICAgLy8gYWRkIGJveCB0byBwYWdlXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudmlld1wiKS5hcHBlbmQodG9kYXlCb3gpO1xuXG4gICAgICAgIC8vIGRhdGEgb2YgdGhpcyBkYXlcbiAgICAgICAgY29uc3QgdGhpc0RheSA9IHNlcGVyYXRlW2RheV1bMF07XG5cbiAgICAgICAgLy8gZm9yIGVhY2ggaG91ciBvZiB0aGlzIGRheVxuICAgICAgICBmb3IgKGNvbnN0IGhvdXIgaW4gdGhpc0RheSkge1xuXG4gICAgICAgICAgLy8gZ2V0IGl0J3MgZGF0ZSBhbmQgdG9kYXkncyBkYXRlXG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNoYWRvd1xuICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh0aGlzRGF5W2hvdXJdLmR0X3R4dCk7XG4gIFxuICAgICAgICAgIC8vIGdldCBpbmZvIGFuZCBzZXQgc3RyaW5nc1xuICAgICAgICAgIGNvbnN0IGhvdXJzID1cbiAgICAgICAgICAgIGRhdGUuZ2V0SG91cnMoKS50b1N0cmluZygpLmxlbmd0aCA9PT0gMlxuICAgICAgICAgICAgICA/IGAke2RhdGUuZ2V0SG91cnMoKX06MDBgXG4gICAgICAgICAgICAgIDogYDAke2RhdGUuZ2V0SG91cnMoKX06MDBgO1xuICAgICAgICAgIGNvbnN0IHsgaWNvbiB9ID0gdGhpc0RheVtob3VyXS53ZWF0aGVyWzBdO1xuICAgICAgICAgIGNvbnN0IHRlbXAgPSBtZWFzdXJlID09PSAnQycgPyBgJHtNYXRoLnJvdW5kKHRoaXNEYXlbaG91cl0ubWFpbi50ZW1wKX0ke2RlZ3JlZX1DYCA6XG4gICAgICAgICAgYCR7TWF0aC5yb3VuZCh0aGlzRGF5W2hvdXJdLm1haW4udGVtcCl9JHtkZWdyZWV9RmA7XG4gIFxuICAgICAgICAgIC8vIGFkZCB0byBhIGxpc3RcbiAgICAgICAgICBjb25zdCBsaXN0b2ZpbmZvID0gW2hvdXJzLCBpY29uLCB0ZW1wXTtcbiAgXG4gICAgICAgICAgLy8gY3JlYXRlIGEgYm94IGZvciBlYWNoIGhvdXIsIHNldCBJRCBhbmQgY2xhc3NcbiAgICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgIGJveC5jbGFzc05hbWUgPSBcImZvcmVjYXN0Qm94XCI7XG4gICAgICAgICAgYm94LnNldEF0dHJpYnV0ZShcImlkXCIsIGBib3gke2NvdW50ZXJ9YCk7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGRheSR7ZGF5fWApLmFwcGVuZChib3gpO1xuICBcbiAgICAgICAgICAvLyBhZGQgZWFjaCBiaXQgb2YgaW5mbyBmb3IgdGhlIGhvdXIsIGNoZWNraW5nIGZvciBhbiBpbWFnZVxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBpbiBsaXN0b2ZpbmZvKSB7XG4gICAgICAgICAgICBjb25zdCBzbWFsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBzbWFsbC5jbGFzc05hbWUgPSBtZWFzdXJlID09PSAnQycgPyBcInNtYWxsRGl2IGRlZ3JlZU9mQ1wiIDogXCJzbWFsbERpdiBkZWdyZWVPZkZcIjtcbiAgICAgICAgICAgIGlmIChpdGVtICE9PSAnMScpIHtcbiAgICAgICAgICAgICAgc21hbGwudGV4dENvbnRlbnQgPSBsaXN0b2ZpbmZvW2l0ZW1dO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICAgICAgICBpbWFnZS5zcmMgPSBgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7bGlzdG9maW5mb1tpdGVtXX1AMngucG5nYDtcbiAgICAgICAgICAgICAgaW1hZ2UuY2xhc3NOYW1lID0gJ2ljb25zJ1xuICAgICAgICAgICAgICBzbWFsbC5hcHBlbmQoaW1hZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc21hbGwuc3R5bGUuZGlzcGxheSA9IHNtYWxsLmNsYXNzTmFtZSA9PT0gXCJzbWFsbERpdiBkZWdyZWVPZkNcIiA/ICdibG9jaycgOiAnbm9uZSdcbiAgICAgICAgICAgIC8vIGFkZCB0byBwYWdlXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYm94JHtjb3VudGVyfWApLmFwcGVuZChzbWFsbCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGluY3JlYXNlIGNvdW50ZXIgZm9yIG5leHQgYm94XG4gICAgICAgICAgY291bnRlciArPSAxO1xuICAgICAgICB9XG4gICAgICB9XG5cbn0iLCJpbXBvcnQgeyBjbGVhciB9IGZyb20gXCIuL2Z1bmN0aW9uc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlbXB0eVRvcCgpe1xuICAgIC8vIGxpc3Qgb2YgZGl2cyBpbiBIVE1MIGZpbGVcbiAgICBjb25zdCBsaXN0b2Zsb2NhdGlvbnMgPSBbXG4gICAgICAgIFwiY2xvdWRzXCIsXG4gICAgICAgIFwiZmVlbHNcIixcbiAgICAgICAgXCJodW1pZGl0eVwiLFxuICAgICAgICBcIndpbmRTcGVlZFwiLFxuICAgICAgICBcInRlbXBcIixcbiAgICAgICAgXCJzdW5yaXNlXCIsXG4gICAgICAgIFwic3Vuc2V0XCIsXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIixcbiAgICAgICAgXCJpY29uXCIsXG4gICAgICAgIFwiY2l0eVwiLFxuICAgICAgXTtcbiAgICAgIFxuICAgICAgLy8gY2xlYXIgZWFjaCBlbnRyeSBvbiBuZXcgc2VhcmNoXG4gICAgICBsaXN0b2Zsb2NhdGlvbnMuZm9yRWFjaCggKGl0ZW0pID0+IHtcbiAgICAgICAgICBjbGVhcihpdGVtKVxuICAgICAgfSlcbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuLyogZXNsaW50LWRpc2FibGUgZ3VhcmQtZm9yLWluICovXG5pbXBvcnQgeyBjbGVhciB9IGZyb20gXCIuL2Z1bmN0aW9uc1wiXG5pbXBvcnQgYWRkRm91clRvUGFnZSBmcm9tIFwiLi9hZGRGb3VyXCJcbmltcG9ydCBnZXREYXlzIGZyb20gXCIuL2dldERheXNcIjtcbmltcG9ydCBzd2l0Y2hVbml0IGZyb20gXCIuL3N3aXRjaFVuaXRcIjtcblxuLy8gZm9yZWNhc3Qgd2VhdGhlclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlckZvdXJEYXlzKGNpdHkpIHtcblxuICAgIC8vIHJlbW92ZSBleGlzdGluZyBkYXRhIGlmIHNlY29uZCBzZWFyY2ggXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbkhvbGRlcicpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcbiAgICBjbGVhcihcInZpZXdcIik7XG4gICAgLy8gc2V0IGFsbCBjaXJjbGVzIHRvIGJlIHdoaXRlXG4gICAgY29uc3QgY2lyY2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaXJjbGUnKVxuICAgIGNpcmNsZXMuZm9yRWFjaChjaXJjbGUgPT4ge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBjaXJjbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJ1xuICAgIH0pXG4gICAgLy8gc2V0IGZpcnN0IGNpcmNsZSB0byBhY3RpdmVcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgY2lyY2xlMGApLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdibGFjaydcblxuXG4gICAgLy8gZ2V0IGNpdHkgbG9uZyBhbmQgbGF0IGRldGFpbHNcbiAgICBjb25zdCBjaXR5UmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZ2VvLzEuMC9kaXJlY3Q/cT0ke2NpdHl9JmxpbWl0PTEmYXBwaWQ9OGIwNWFkZmY3YTQzZDQ3OWZhZjBmYjExYmIzNWEyZDhgLHtcbiAgICAgICAgbW9kZTogJ2NvcnMnXG4gICAgICB9XG4gICAgKTtcbiAgICBjb25zdCBjaXR5RGF0YSA9IGF3YWl0IGNpdHlSZXNwb25zZS5qc29uKCk7XG4gICAgLy8gcGFzcyBsb25nIGFuZCBsYXQgaW50byBzZWNvbmQgQVBJXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/bGF0PSR7Y2l0eURhdGFbMF0ubGF0fSZsb249JHtjaXR5RGF0YVswXS5sb259JmFwcGlkPThiMDVhZGZmN2E0M2Q0NzlmYWYwZmIxMWJiMzVhMmQ4JnVuaXRzPW1ldHJpY2Ase1xuICAgICAgICBtb2RlOiAnY29ycydcbiAgICAgIH1cbiAgICApO1xuICAgIGNvbnN0IHJlc3BvbnNlVHdvID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P2xhdD0ke2NpdHlEYXRhWzBdLmxhdH0mbG9uPSR7Y2l0eURhdGFbMF0ubG9ufSZhcHBpZD04YjA1YWRmZjdhNDNkNDc5ZmFmMGZiMTFiYjM1YTJkOCZ1bml0cz1pbXBlcmlhbGAse1xuICAgICAgICBtb2RlOiAnY29ycydcbiAgICAgIH1cbiAgICApO1xuXG4gICAgLy8gY29udmVydCB0byBKU09OXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBjb25zdCBkYXRhVHdvID0gYXdhaXQgcmVzcG9uc2VUd28uanNvbigpO1xuICAgIFxuICAgIC8vIHNlcGVyYXRlIGludG8gZWFjaCBkYXlcbiAgICBjb25zdCBzZXBlcmF0ZSA9IGdldERheXMoZGF0YSlcbiAgICBjb25zdCBzZXBlcmF0ZVR3byA9IGdldERheXMoZGF0YVR3bylcblxuICAgIC8vIHBhc3Mgc2VwZXJhdGVkIGFycmF5IGludG8gdGhpcyBmdW5jdGlvblxuICAgIC8vIHRvIGJlIGFkZGVkIHRvIHBhZ2VcbiAgICBhZGRGb3VyVG9QYWdlKHNlcGVyYXRlLCAnQycpXG4gICAgYWRkRm91clRvUGFnZShzZXBlcmF0ZVR3bywgJ0YnKVxuICAgIFxuICAgIHN3aXRjaFVuaXQoKVxuICBcbiAgfSIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cbi8vIGNsZWFyIG91dCBleGlzdGluZyBwYWdlXG5leHBvcnQgZnVuY3Rpb24gY2xlYXIoaW5wdXQpIHtcbiAgICBjb25zdCB3aGVyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2lucHV0fWApO1xuICAgIHdoaWxlICh3aGVyZS5maXJzdENoaWxkKSB7XG4gICAgICB3aGVyZS5yZW1vdmVDaGlsZCh3aGVyZS5sYXN0Q2hpbGQpO1xuICAgIH1cbiAgfVxuXG4vLyBhZGQgdG9kYXkncyBmb3JlY2FzdCB0byBwYWdlXG5leHBvcnQgZnVuY3Rpb24gYWRkdG8od2hlcmUsIGluZm8sIGRlZ3JlZSkge1xuICAgIC8vIGNoZWNrIGZvciBpbWFnZSBlbHNlIGp1c3QgYWRkIHRvIGNvcnJlY3QgZGl2XG4gICAgaWYgKHdoZXJlID09PSBcImljb25cIikge1xuICAgICAgICBjb25zdCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgIGltYWdlLmNsYXNzTmFtZSA9IGBpY29uaW1nIGRlZ3JlZU9mJHtkZWdyZWV9YDtcbiAgICAgICAgaW1hZ2UuYWx0ID0gXCJUb2RheSdzIHdlYXRoZXIgaWNvblwiO1xuICAgICAgICBpbWFnZS5zcmMgPSBgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7aW5mb31AMngucG5nYDtcbiAgICAgICAgaW1hZ2Uuc3R5bGUuZGlzcGxheSA9IGRlZ3JlZSA9PT0gJ0MnID8gJ2Jsb2NrJyA6ICdub25lJ1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmljb25cIikuYXBwZW5kKGltYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIHAuY2xhc3NOYW1lID0gYCR7d2hlcmV9V3JpdHRpbmcgZGVncmVlT2Yke2RlZ3JlZX1gO1xuICAgICAgICBwLnRleHRDb250ZW50ID0gaW5mbztcbiAgICAgICAgcC5zdHlsZS5kaXNwbGF5ID0gZGVncmVlID09PSAnQycgPyAnYmxvY2snIDogJ25vbmUnXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3doZXJlfWApLmFwcGVuZChwKTtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0RGF5cyhkYXRhKXtcblxuICAgLy8gZW1wdHkgYXJyYXlzIHRvIGxhdGVyIGJlIGZpbGxlZFxuICAgIGNvbnN0IHNlcGVyYXRlID0gW107XG4gICAgbGV0IG5leHQgPSBbXTtcbiAgICBsZXQgaXRlbSA9IDA7XG5cbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG5cbiAgICAvLyBzcGxpdHMgdGhlIHdob2xlIGFycmF5IGludG8gZGF5c1xuICAgIGZvciAoaXRlbTsgaXRlbSA8IGRhdGEubGlzdC5sZW5ndGg7IGl0ZW0gKz0gMSkge1xuICAgICAgICBcbiAgICAgICAgLy8gbmV3IGRhdGUgYW5kIHRvZGF5c1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkYXRhLmxpc3RbaXRlbV0uZHRfdHh0KTtcblxuICAgIC8vIGNoZWNrIGlmIHRvZGF5XG4gICAgaWYgKHRvZGF5LnRvRGF0ZVN0cmluZygpID09PSBkYXRlLnRvRGF0ZVN0cmluZygpKSB7XG4gICAgICAgIC8vIGVtcHR5IGFycmF5XG4gICAgICAgIGNvbnN0IGZpcnN0ID0gW107XG4gICAgICAgIC8vIGNoZWNrIHVudGlsIHRoZSBuZXh0IGRheSBkb2VzIG5vdCBlcXVhbCB0b2RheVxuICAgICAgICAvLyBhZGQgaXQgdG8gdGhlIGFycmF5IGFuZCBwdXNoIHRvIHRoZSBzZXBlcmF0ZSBhcnJheVxuICAgICAgICBpZiAoXG4gICAgICAgIHRvZGF5LnRvRGF0ZVN0cmluZygpICE9PVxuICAgICAgICBuZXcgRGF0ZShkYXRhLmxpc3RbaXRlbSArIDFdLmR0X3R4dCkudG9EYXRlU3RyaW5nKClcbiAgICAgICAgKSB7XG4gICAgICAgIGZpcnN0LnB1c2goZGF0YS5saXN0LnNsaWNlKDAsIGl0ZW0gKyAxKSk7XG4gICAgICAgIHNlcGVyYXRlLnB1c2goZmlyc3QpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmIG5vdCB0b2RheSBhbmQgbW9yZSB0aGFuIDggaXRlbXMgaW4gdGhlIGFycmF5IGxlZnRcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgICAhKHRvZGF5LnRvRGF0ZVN0cmluZygpID09PSBkYXRlLnRvRGF0ZVN0cmluZygpKSAmJlxuICAgICAgICBkYXRhLmxpc3QubGVuZ3RoID49IGl0ZW0gKyA4XG4gICAgKSB7XG4gICAgICAgIC8vIHB1c2ggdGhlIG5leHQgOCBob3VyIHNsb3RzIGludG8gbmV4dCB0aGVuIGFkZCB0byBzZXBlcmF0ZSBpbiBpdCdzIG93biBhcnJheVxuICAgICAgICBuZXh0LnB1c2goZGF0YS5saXN0LnNsaWNlKFtpdGVtXSwgaXRlbSArIDgpKTtcbiAgICAgICAgaXRlbSArPSA3O1xuICAgICAgICBzZXBlcmF0ZS5wdXNoKG5leHQpO1xuICAgICAgICBuZXh0ID0gW107XG4gICAgICAgIC8vIGlmIHRoZSBsYXN0IGRheSBhZGQgdG8gbmV4dCB0aGVuIHRvIHNlcGVyYXRlXG4gICAgfSBlbHNlIGlmIChkYXRhLmxpc3QubGVuZ3RoIDwgaXRlbSArIDgpIHtcbiAgICAgICAgbmV4dC5wdXNoKGRhdGEubGlzdC5zbGljZShbaXRlbV0pKTtcbiAgICAgICAgaXRlbSA9IGRhdGEubGlzdC5sZW5ndGg7XG4gICAgICAgIHNlcGVyYXRlLnB1c2gobmV4dCk7XG4gICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzZXBlcmF0ZVxufSIsImxldCBjb3VudGVyID0gMFxuY29uc3QgY2lyY2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaXJjbGUnKVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtb3ZlKGQpe1xuXG4gICBpZihkID09PSAncmlnaHQnICYmIGNvdW50ZXIgIT09IDUpe1xuICAgICAgICAvLyBkbyBzb21ldGhpbmdcbiAgICAgICAgY291bnRlciArPSAxXG4gICB9IGVsc2UgaWYgKGQgPT09ICdsZWZ0JyAmJiBjb3VudGVyICE9PSAwICl7XG4gICAgICAgIC8vIGRvIHNvbWV0aGluZ1xuICAgICAgICBjb3VudGVyIC09IDFcbiAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgIH1cblxuICAgIGNpcmNsZXMuZm9yRWFjaCgoY2lyY2xlKSA9PiB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBjaXJjbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcbiAgICB9KVxuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGNpcmNsZSR7Y291bnRlcn1gKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnYmxhY2snXG5cbiAgICBjb25zdCBib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2RheUJveCcpXG4gICAgYm94ZXMuZm9yRWFjaCggKGIpID0+IHtcbiAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBiLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICB9KVxuXG4gICAgY29uc3QgYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGRheSR7Y291bnRlcn1gKVxuICAgIGJveC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCJcbn0iLCIgZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbW92ZUJvdHRvbSgpe1xuICAgIC8vIGdldCBjb250YWluZXJcbiAgICBjb25zdCBib3R0b20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm90dG9tJylcblxuICAgIC8vIHJlc2V0IHRvIDBcbiAgICBib3R0b20uc2Nyb2xsTGVmdCA9IDA7XG5cbiAgICAvLyBtb3ZlIGJ5IDEgcGl4ZWxcbiAgICBjb25zdCBtb3ZlQmFyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgYm90dG9tLnNjcm9sbExlZnQgKz0gMTtcbiAgICB9LCAxMClcblxuICAgIC8vIHN0b3AgYWZ0ZXIgbW92aW5nIGJhciBhZnRlciA4MDAwXG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgY2xlYXJJbnRlcnZhbChtb3ZlQmFyKVxuICAgIH0sIDE1MDAwKVxuICAgIFxuICAgIC8vIG9udG91Y2ggc3RvcCBtb3ZlbWVudFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChtb3ZlQmFyKVxuICAgIH0pXG5cbiAgICAvLyAvLyBvbiBuZXcgc2VhcmNoIHN0b3AgZXZlbnQgc28gaXQgY2FuIHJlc3RhcnRcbiAgICBib3R0b20uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICBjbGVhckludGVydmFsKG1vdmVCYXIpXG4gICAgfSlcblxuICAgIC8vIG9uIHRvdWNoIC0gcGhvbmUsIHN0b3AgbW92ZWJhclxuICAgIGJvdHRvbS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgKCkgPT4ge1xuICAgICAgICBjbGVhckludGVydmFsKG1vdmVCYXIpXG4gICAgfSlcbn0iLCIvLyBjaG9pY2Ugb2YgbWVhc3VybWVudCB0byBkaXNwbGF5XG5sZXQgY2hvaWNlID0gJydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3dpdGNoVW5pdCgpe1xuXG4gICAgLy8gRGVncmVlIHN5bWJvbFxuICAgIGNvbnN0IGRlZ3JlZSA9IFwiXFx1MDBCMFwiO1xuXG4gICAgLy8gZ2V0IGFsbCByZXF1aXJlZCBlbGVtZW50c1xuICAgIGNvbnN0IGRlZ3JlZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2hvaWNlJylcbiAgICBjb25zdCBhbGxDID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRlZ3JlZU9mQycpXG4gICAgY29uc3QgYWxsRiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZWdyZWVPZkYnKVxuXG4gICAgXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1hcnJvdy1jYWxsYmFja1xuICAgIGRlZ3JlZXMuZm9yRWFjaCggKGVsZW1lbnQpID0+IHtcbiAgICAgICAgXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItYXJyb3ctY2FsbGJhY2tcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4ge1xuICAgICAgICAgICAgLy8gZWl0aGVyIGhpZGUgb25lIGFuZCBzaG93IHRoZSBvdGhlclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkMnKS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJylcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5GJykuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpXG5cbiAgICAgICAgICAgIC8vIHNldCBwcmVmZXJlbmNlIG9mIEMgb3IgRlxuICAgICAgICAgICAgY2hvaWNlID0gZWxlbWVudC50ZXh0Q29udGVudCA9PT0gYCR7ZGVncmVlfUNgID8gJ0YnIDogJ0MnXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGNoZWNrIGZvciB0aGUgY2hvaWNlIGFuZCBzaG93IC8gaGlkZSBhcyBuZWNjZXNhcnlcbiAgICAgICAgICAgIGlmIChjaG9pY2UgPT09IGBDYCl7XG4gICAgICAgICAgICAgICAgYWxsRi5mb3JFYWNoKCBpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgYWxsQy5mb3JFYWNoKCBpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsbEYuZm9yRWFjaCggaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBhbGxDLmZvckVhY2goIGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxufSIsImltcG9ydCB7IGFkZHRvfSBmcm9tIFwiLi9mdW5jdGlvbnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9kYXlJbmZvICggZGF0YSwgc3ltYm9sICl7XG4gICAgLy8gZ2V0IG5lZWRlZCBpbmZvXG4gICAgY29uc3QgY2xvdWRzID0gZGF0YS5jbG91ZHMuYWxsO1xuICAgIGNvbnN0IGZlZWxzID0gTWF0aC5yb3VuZChkYXRhLm1haW4uZmVlbHNfbGlrZSk7XG4gICAgY29uc3QgeyBodW1pZGl0eSB9ID0gZGF0YS5tYWluO1xuICAgIGNvbnN0IHdpbmRTcGVlZCA9IGRhdGEud2luZC5zcGVlZDtcbiAgICBjb25zdCB0ZW1wID0gTWF0aC5yb3VuZChkYXRhLm1haW4udGVtcCk7XG4gICAgY29uc3Qgc3VucmlzZURhdGEgPSBuZXcgRGF0ZShkYXRhLnN5cy5zdW5yaXNlICogMTAwMCk7XG4gICAgY29uc3QgcmlzZUhvdXJzID0gc3VucmlzZURhdGEuZ2V0SG91cnMoKTtcbiAgICBjb25zdCByaXNlTWludXRlcyA9IGAwJHtzdW5yaXNlRGF0YS5nZXRNaW51dGVzKCl9YDtcbiAgICBjb25zdCBzdW5yaXNlID0gYCR7cmlzZUhvdXJzfToke3Jpc2VNaW51dGVzLnN1YnN0cigtMil9YDtcbiAgICBjb25zdCBzdW5zZXREYXRhID0gbmV3IERhdGUoZGF0YS5zeXMuc3Vuc2V0ICogMTAwMCk7XG4gICAgY29uc3Qgc2V0SG91cnMgPSBzdW5zZXREYXRhLmdldEhvdXJzKCk7XG4gICAgY29uc3Qgc2V0TWludXRlcyA9IGAwJHtzdW5zZXREYXRhLmdldE1pbnV0ZXMoKX1gO1xuICAgIGNvbnN0IHN1bnNldCA9IGAke3NldEhvdXJzfToke3NldE1pbnV0ZXMuc3Vic3RyKC0yKX1gO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZGF0YS53ZWF0aGVyWzBdLm1haW47XG4gICAgY29uc3QgeyBpY29uIH0gPSBkYXRhLndlYXRoZXJbMF07XG4gICAgY29uc3QgbG9jYXRpb24gPSBkYXRhLm5hbWU7XG4gICAgY29uc3QgZGVncmVlID0gXCJcXHUwMEIwXCI7XG5cbiAgICAvLyBjaGFuZ2UgZm9yIEYgb3IgQ1xuICAgIGNvbnN0IGRpc3BsYXlUZW1wID0gc3ltYm9sID09PSAnQycgPyBgJHt0ZW1wfSR7ZGVncmVlfUNgIDogYCR7dGVtcH0ke2RlZ3JlZX1GYDtcbiAgICBjb25zdCBkaXNwbGF5V2luZCA9IHN5bWJvbCA9PT0gJ0MnID8gYFdpbmQgc3BlZWQ6ICR7d2luZFNwZWVkfSBtZXRlci9zZWNgIDogYFdpbmQgc3BlZWQ6ICR7d2luZFNwZWVkfSBtaWxlcy9ob3VyYFxuXG4gICAgLy8gYWRkIHRvIGEgbGlzdFxuICAgIGNvbnN0IGxpc3RvZmluZm8gPSBbXG4gICAgICBgQ2xvdWRpbmVzczogJHtjbG91ZHN9JWAsXG4gICAgICBgRmVlbHMgbGlrZTogJHtmZWVsc30ke2RlZ3JlZX1DYCxcbiAgICAgIGBIdW1pZGl0eTogJHtodW1pZGl0eX0lYCxcbiAgICAgIGRpc3BsYXlXaW5kLFxuICAgICAgZGlzcGxheVRlbXAsXG4gICAgICBgU3VucmlzZTogJHtzdW5yaXNlfWAsXG4gICAgICBgU3Vuc2V0OiAke3N1bnNldH1gLFxuICAgICAgYCR7ZGVzY3JpcHRpb259YCxcbiAgICAgIGljb24sXG4gICAgICBsb2NhdGlvbixcbiAgICBdO1xuXG4gICAgLy8gbGlzdCBvZiBkaXZzIGluIEhUTUwgZmlsZVxuICAgIGNvbnN0IGxpc3RvZmxvY2F0aW9ucyA9IFtcbiAgICAgIFwiY2xvdWRzXCIsXG4gICAgICBcImZlZWxzXCIsXG4gICAgICBcImh1bWlkaXR5XCIsXG4gICAgICBcIndpbmRTcGVlZFwiLFxuICAgICAgXCJ0ZW1wXCIsXG4gICAgICBcInN1bnJpc2VcIixcbiAgICAgIFwic3Vuc2V0XCIsXG4gICAgICBcImRlc2NyaXB0aW9uXCIsXG4gICAgICBcImljb25cIixcbiAgICAgIFwiY2l0eVwiLFxuICAgIF07XG5cbiAgICAvLyBsb29wIG92ZXIgYW5kIGFkZCB0byBjb3JyZWN0IHBsYWNlXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4LCBndWFyZC1mb3ItaW5cbiAgICBmb3IgKGNvbnN0IGl0ZW0gaW4gbGlzdG9maW5mbykge1xuICAgICAgYWRkdG8obGlzdG9mbG9jYXRpb25zW2l0ZW1dLCBsaXN0b2ZpbmZvW2l0ZW1dLCBzeW1ib2wpO1xuICAgIH1cbn0iLCJpbXBvcnQgbW92ZUJvdHRvbSBmcm9tIFwiLi9tb3ZlQm90dG9tXCJcbmltcG9ydCB0b2RheUluZm8gZnJvbSBcIi4vdG9kYXlJbmZvXCI7XG5pbXBvcnQgZW1wdHlUb3AgZnJvbSBcIi4vZW1wdHlUb3BcIjtcblxuLy8gZ2V0IHRvZGF5J3Mgd2VhdGhlciBhc3luY1xuLy8gc21hbGwuY2xhc3NOYW1lID0gbWVhc3VyZSA9PT0gJ0MnID8gXCJzbWFsbERpdiBkZWdyZWVPZkNcIiA6IFwic21hbGxEaXYgZGVncmVlT2ZGXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJUb2RheShjaXR5KSB7XG4gIGVtcHR5VG9wKClcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtjaXR5fSZBUFBJRD04YjA1YWRmZjdhNDNkNDc5ZmFmMGZiMTFiYjM1YTJkOCZ1bml0cz1tZXRyaWNgLHtcbiAgICAgICAgbW9kZTogJ2NvcnMnXG4gICAgICB9XG4gICAgKTtcbiAgICBjb25zdCByZXNwb25zZUYgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eX0mQVBQSUQ9OGIwNWFkZmY3YTQzZDQ3OWZhZjBmYjExYmIzNWEyZDgmdW5pdHM9aW1wZXJpYWxgLHtcbiAgICAgICAgbW9kZTogJ2NvcnMnXG4gICAgICB9XG4gICAgKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGNvbnN0IGRhdGFGID0gYXdhaXQgcmVzcG9uc2VGLmpzb24oKTtcblxuICAgIHRvZGF5SW5mbyhkYXRhLCAnQycpXG4gICAgdG9kYXlJbmZvKGRhdGFGLCAnRicpXG4gICAgXG4gICAgbW92ZUJvdHRvbSgpXG4gICAgLy8gc3dpdGNoVW5pdCgpXG4gIH0iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tMTAwLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tMTAwLndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi0xMDBpdGFsaWMud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi0xMDBpdGFsaWMud29mZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF80X19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTMwMC53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF81X19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTMwMC53b2ZmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzZfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tMzAwaXRhbGljLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzdfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tMzAwaXRhbGljLndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfOF9fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi00MDAud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfOV9fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi00MDAud29mZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xMF9fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi00MDBpdGFsaWMud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTFfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tNDAwaXRhbGljLndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTJfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tNTAwLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzEzX19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTUwMC53b2ZmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzE0X19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTUwMGl0YWxpYy53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xNV9fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi01MDBpdGFsaWMud29mZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xNl9fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi03MDAud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTdfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tNzAwLndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMThfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tNzAwaXRhbGljLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzE5X19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTcwMGl0YWxpYy53b2ZmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzIwX19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTkwMC53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yMV9fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi05MDAud29mZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yMl9fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi05MDBpdGFsaWMud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMjNfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tOTAwaXRhbGljLndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzVfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF81X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF82X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNl9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfN19fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzdfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzhfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF84X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF85X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfOV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xMV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTJfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xMl9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTNfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xM19fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTRfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xNF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTVfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xNV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTZfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xNl9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTdfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xN19fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMThfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xOF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTlfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xOV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMjBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMjFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yMV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMjJfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yMl9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMjNfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yM19fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiByb2JvdG8tMTAwbm9ybWFsIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiAxMDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gVGhpbiAnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1UaGluJyksXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIikgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyArIFwiKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by0xMDBpdGFsaWMgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDEwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBUaGluIGl0YWxpYycpLFxcbiAgICBsb2NhbCgnUm9ib3RvLVRoaW5pdGFsaWMnKSxcXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyArIFwiKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19fICsgXCIpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTMwMG5vcm1hbCAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIExpZ2h0ICcpLFxcbiAgICBsb2NhbCgnUm9ib3RvLUxpZ2h0JyksXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzRfX18gKyBcIikgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNV9fXyArIFwiKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by0zMDBpdGFsaWMgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBMaWdodCBpdGFsaWMnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1MaWdodGl0YWxpYycpLFxcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF82X19fICsgXCIpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzdfX18gKyBcIikgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tNDAwbm9ybWFsIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gUmVndWxhciAnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1SZWd1bGFyJyksXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzhfX18gKyBcIikgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfOV9fXyArIFwiKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by00MDBpdGFsaWMgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBSZWd1bGFyIGl0YWxpYycpLFxcbiAgICBsb2NhbCgnUm9ib3RvLVJlZ3VsYXJpdGFsaWMnKSxcXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTBfX18gKyBcIikgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTFfX18gKyBcIikgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tNTAwbm9ybWFsIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gTWVkaXVtICcpLFxcbiAgICBsb2NhbCgnUm9ib3RvLU1lZGl1bScpLFxcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xMl9fXyArIFwiKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xM19fXyArIFwiKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by01MDBpdGFsaWMgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBNZWRpdW0gaXRhbGljJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tTWVkaXVtaXRhbGljJyksXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE0X19fICsgXCIpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE1X19fICsgXCIpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTcwMG5vcm1hbCAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIEJvbGQgJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tQm9sZCcpLFxcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xNl9fXyArIFwiKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xN19fXyArIFwiKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by03MDBpdGFsaWMgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBCb2xkIGl0YWxpYycpLFxcbiAgICBsb2NhbCgnUm9ib3RvLUJvbGRpdGFsaWMnKSxcXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMThfX18gKyBcIikgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTlfX18gKyBcIikgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tOTAwbm9ybWFsIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gQmxhY2sgJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tQmxhY2snKSxcXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMjBfX18gKyBcIikgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMjFfX18gKyBcIikgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tOTAwaXRhbGljIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gQmxhY2sgaXRhbGljJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tQmxhY2tpdGFsaWMnKSxcXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMjJfX18gKyBcIikgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMjNfX18gKyBcIikgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9ub2RlX21vZHVsZXMvdHlwZWZhY2Utcm9ib3RvL2luZGV4LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSw2QkFBNkI7QUFDN0I7RUFDRSxxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEI7Ozs7MERBSXFELEVBQUUsb0JBQW9CO0FBQzdFOztBQUVBLDZCQUE2QjtBQUM3QjtFQUNFLHFCQUFxQjtFQUNyQixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQjs7OzswREFJMkQsRUFBRSxvQkFBb0I7QUFDbkY7O0FBRUEsNkJBQTZCO0FBQzdCO0VBQ0UscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCOzs7OzBEQUlxRCxFQUFFLG9CQUFvQjtBQUM3RTs7QUFFQSw2QkFBNkI7QUFDN0I7RUFDRSxxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEI7Ozs7MERBSTJELEVBQUUsb0JBQW9CO0FBQ25GOztBQUVBLDZCQUE2QjtBQUM3QjtFQUNFLHFCQUFxQjtFQUNyQixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQjs7OzswREFJcUQsRUFBRSxvQkFBb0I7QUFDN0U7O0FBRUEsNkJBQTZCO0FBQzdCO0VBQ0UscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCOzs7OzJEQUkyRCxFQUFFLG9CQUFvQjtBQUNuRjs7QUFFQSw2QkFBNkI7QUFDN0I7RUFDRSxxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEI7Ozs7MkRBSXFELEVBQUUsb0JBQW9CO0FBQzdFOztBQUVBLDZCQUE2QjtBQUM3QjtFQUNFLHFCQUFxQjtFQUNyQixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQjs7OzsyREFJMkQsRUFBRSxvQkFBb0I7QUFDbkY7O0FBRUEsNkJBQTZCO0FBQzdCO0VBQ0UscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCOzs7OzJEQUlxRCxFQUFFLG9CQUFvQjtBQUM3RTs7QUFFQSw2QkFBNkI7QUFDN0I7RUFDRSxxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEI7Ozs7MkRBSTJELEVBQUUsb0JBQW9CO0FBQ25GOztBQUVBLDZCQUE2QjtBQUM3QjtFQUNFLHFCQUFxQjtFQUNyQixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQjs7OzsyREFJcUQsRUFBRSxvQkFBb0I7QUFDN0U7O0FBRUEsNkJBQTZCO0FBQzdCO0VBQ0UscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCOzs7OzJEQUkyRCxFQUFFLG9CQUFvQjtBQUNuRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiByb2JvdG8tMTAwbm9ybWFsIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiAxMDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gVGhpbiAnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1UaGluJyksXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tMTAwLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi0xMDAud29mZicpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTEwMGl0YWxpYyAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogMTAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIFRoaW4gaXRhbGljJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tVGhpbml0YWxpYycpLFxcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTEwMGl0YWxpYy53b2ZmMicpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tMTAwaXRhbGljLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by0zMDBub3JtYWwgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBMaWdodCAnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1MaWdodCcpLFxcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTMwMC53b2ZmMicpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tMzAwLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by0zMDBpdGFsaWMgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBMaWdodCBpdGFsaWMnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1MaWdodGl0YWxpYycpLFxcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTMwMGl0YWxpYy53b2ZmMicpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tMzAwaXRhbGljLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by00MDBub3JtYWwgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBSZWd1bGFyICcpLFxcbiAgICBsb2NhbCgnUm9ib3RvLVJlZ3VsYXInKSxcXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi00MDAud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTQwMC53b2ZmJykgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tNDAwaXRhbGljIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gUmVndWxhciBpdGFsaWMnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1SZWd1bGFyaXRhbGljJyksXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tNDAwaXRhbGljLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi00MDBpdGFsaWMud29mZicpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTUwMG5vcm1hbCAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIE1lZGl1bSAnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1NZWRpdW0nKSxcXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi01MDAud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTUwMC53b2ZmJykgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tNTAwaXRhbGljIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gTWVkaXVtIGl0YWxpYycpLFxcbiAgICBsb2NhbCgnUm9ib3RvLU1lZGl1bWl0YWxpYycpLFxcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTUwMGl0YWxpYy53b2ZmMicpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tNTAwaXRhbGljLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by03MDBub3JtYWwgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBCb2xkICcpLFxcbiAgICBsb2NhbCgnUm9ib3RvLUJvbGQnKSxcXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi03MDAud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTcwMC53b2ZmJykgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tNzAwaXRhbGljIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gQm9sZCBpdGFsaWMnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1Cb2xkaXRhbGljJyksXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tNzAwaXRhbGljLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi03MDBpdGFsaWMud29mZicpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTkwMG5vcm1hbCAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogOTAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIEJsYWNrICcpLFxcbiAgICBsb2NhbCgnUm9ib3RvLUJsYWNrJyksXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tOTAwLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi05MDAud29mZicpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTkwMGl0YWxpYyAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogOTAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIEJsYWNrIGl0YWxpYycpLFxcbiAgICBsb2NhbCgnUm9ib3RvLUJsYWNraXRhbGljJyksXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tOTAwaXRhbGljLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi05MDBpdGFsaWMud29mZicpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCJiYWNrZ3JvdW5kLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIjpyb290e1xcbiAgLS1jb2xvci1ncmV5OiAjOTE4ZDhkO1xcbiAgLS1jb2xvci1ibHVlOiAjNDg5M2NjO1xcbn1cXG5cXG4qIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90b1xcXCIsIHNhbnMtc2VyaWY7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuXFxuYm9keXtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KDQwMHB4LCA4MDBweCk7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpO1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJhY2tncm91bmQtYXR0YWNobWVudDogZml4ZWQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbn1cXG5cXG4ubWFpbntcXG4gIG92ZXJmbG93OiBhdXRvO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDEyMHB4IDEwMHB4IDFmcjtcXG59XFxuXFxuaDEge1xcbiAgcGFkZGluZzogMjBweDtcXG4gIHBhZGRpbmctbGVmdDogMHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiAzcmVtO1xcbiAgY29sb3I6dmFyKC0tY29sb3ItYmx1ZSk7XFxufVxcbi5jb250ZW50IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1pbi1oZWlnaHQ6IDEwMCU7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDE1MHB4IDUwcHg7XFxufVxcblxcbi8qIG1haW4gKi9cXG4ubGVmdCB7XFxuICBncmlkLWNvbHVtbi1zdGFydDogMTtcXG4gIGdyaWQtY29sdW1uLWVuZDogMjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG59XFxuXFxuLnJpZ2h0IHtcXG4gIGdyaWQtY29sdW1uLXN0YXJ0OiAyO1xcbiAgZ3JpZC1jb2x1bW4tZW5kOiA0O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG4ubGVmdCwgXFxuLnJpZ2h0e1xcbiAgY29sb3I6d2hpdGU7XFxufVxcblxcbi5ib3R0b20ge1xcbiAgZ3JpZC1jb2x1bW4tc3RhcnQ6IDE7XFxuICBncmlkLWNvbHVtbi1lbmQ6IDQ7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgZ2FwOiAyMHB4O1xcbiAgbWFyZ2luOiA1cHggMTBweDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBvdmVyZmxvdzogYXV0bztcXG59XFxuXFxuLmJvdHRvbSBwIHtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxufVxcblxcbi8qIGZvcm0gKi9cXG5mb3JtIHtcXG4gIGdyaWQtY29sdW1uLXN0YXJ0OiAxO1xcbiAgZ3JpZC1jb2x1bW4tZW5kOiA0O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1hcmdpbi10b3A6IDE1cHg7XFxuICBnYXA6IDVweDtcXG59XFxuXFxuaW5wdXQge1xcbiAgd2lkdGg6IDIwMHB4O1xcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xcbiAgaGVpZ2h0OiA0MHB4O1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxufVxcblxcbmJ1dHRvbiB7XFxuICBwYWRkaW5nOiA1cHggMTBweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgaGVpZ2h0OiA0MHB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4vKiBpdGVtcyBmcm9tIGRhaWx5ICovXFxuXFxuLnRlbXBXcml0dGluZyB7XFxuICBmb250LXNpemU6IDRyZW07XFxuICBoZWlnaHQ6IG1pbi1jb250ZW50O1xcbn1cXG5cXG4uY2l0eVdyaXR0aW5nIHtcXG4gIGZvbnQtc2l6ZTogMi41cmVtO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG59XFxuLmljb24ge1xcbiAgaGVpZ2h0OiA2MHB4O1xcbn1cXG4uaWNvbmltZyB7XFxuICBoZWlnaHQ6IDc1cHg7XFxufVxcbi8qIGJveCBjb250cm9scyAqL1xcbi5idXR0b25Ib2xkZXJ7XFxuICBkaXNwbGF5OiBub25lO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1hcmdpbjogMTBweCA0MHB4O1xcbn1cXG4uU1ZHSE9MREVSe1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuLmNpcmNsZXtcXG4gIGhlaWdodDogMTBweDtcXG4gIHdpZHRoOiAxMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxufVxcblxcbi8qIGZvcmVjYXN0IGJveCAqL1xcbi5mb3JlY2FzdHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBncmlkLWNvbHVtbi1zdGFydDogMTtcXG4gIGdyaWQtY29sdW1uLWVuZDogNDtcXG4gIG1pbi1oZWlnaHQ6IDUzMHB4O1xcbn1cXG4udmlld3tcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBvdmVyZmxvdzogYXV0bztcXG4gIG1hcmdpbjogMTBweDtcXG4gIGdhcDogMTBweDtcXG4gIHBhZGRpbmctYm90dG9tOiAyMHB4O1xcbn1cXG4uZm9yZWNhc3RCb3gge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcbi5mb3JlY2FzdEJveCBkaXYge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLnRvZGF5Qm94IHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xcbiAgYm94LXNoYWRvdzogNXB4IDVweCAxMHB4IDFweCAgdmFyKC0tY29sb3ItZ3JleSk7XFxuICBoZWlnaHQ6IG1pbi1jb250ZW50O1xcbiAgcGFkZGluZzogNXB4O1xcbiAgbWFyZ2luOiAxMHB4IDI1cHg7XFxufVxcbi50b2RheUJveDpudGgtY2hpbGQoMSl7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4udG9kYXlCb3ggPiBwIHtcXG4gIG1hcmdpbjogMTBweDtcXG4gIGZvbnQtc2l6ZTogMS4zcmVtO1xcbn1cXG5cXG4udG9kYXlCb3ggLmZvcmVjYXN0Qm94Om50aC1jaGlsZChldmVuKSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmNDA7XFxufVxcblxcbi5pY29uc3tcXG4gIGhlaWdodDogNDVweDtcXG59XFxuLyogTkFWICovXFxubmF2IHtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuXFxuLm5hdmNvcm5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogNTAlO1xcbiAgYm9yZGVyLXJhZGl1czogMCUgNXJlbSA1cmVtIDAlO1xcbn1cXG5cXG4uQywgLkYge1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgYm9yZGVyLXJhZGl1czogLjVyZW07XFxuICBoZWlnaHQ6IDQwcHg7XFxuICBhc3BlY3QtcmF0aW86IDEvMTtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDBweCAycHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5De1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcbi5Ge1xcbiBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLmhpZGV7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UscUJBQXFCO0VBQ3JCLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLFNBQVM7RUFDVCxVQUFVO0VBQ1YsaUNBQWlDO0VBQ2pDLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsMkNBQTJDO0VBQzNDLG1EQUFpQztFQUNqQywyQkFBMkI7RUFDM0IsNEJBQTRCO0VBQzVCLDRCQUE0QjtFQUM1QixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QiwwQkFBMEI7RUFDMUIsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLHVCQUF1QjtBQUN6QjtBQUNBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7RUFDWCxnQkFBZ0I7RUFDaEIsOEJBQThCO0VBQzlCLDhCQUE4QjtBQUNoQzs7QUFFQSxTQUFTO0FBQ1Q7RUFDRSxvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsMkJBQTJCO0FBQzdCOztBQUVBOztFQUVFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLDJCQUEyQjtFQUMzQixTQUFTO0VBQ1QsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixnQkFBZ0I7QUFDbEI7O0FBRUEsU0FBUztBQUNUO0VBQ0Usb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixnQkFBZ0I7RUFDaEIsUUFBUTtBQUNWOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1oscUJBQXFCO0VBQ3JCLFlBQVk7RUFDWixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsWUFBWTtFQUNaLHFCQUFxQjtFQUNyQix1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLGVBQWU7QUFDakI7O0FBRUEscUJBQXFCOztBQUVyQjtFQUNFLGVBQWU7RUFDZixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsZ0JBQWdCO0FBQ2xCO0FBQ0E7RUFDRSxZQUFZO0FBQ2Q7QUFDQTtFQUNFLFlBQVk7QUFDZDtBQUNBLGlCQUFpQjtBQUNqQjtFQUNFLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsbUJBQW1CO0VBQ25CLGlCQUFpQjtBQUNuQjtBQUNBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQiw2QkFBNkI7QUFDL0I7QUFDQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtBQUNwQjs7QUFFQSxpQkFBaUI7QUFDakI7RUFDRSxhQUFhO0VBQ2IsNEJBQTRCO0VBQzVCLGNBQWM7RUFDZCxvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLGlCQUFpQjtBQUNuQjtBQUNBO0VBQ0UsYUFBYTtFQUNiLGNBQWM7RUFDZCxZQUFZO0VBQ1osU0FBUztFQUNULG9CQUFvQjtBQUN0QjtBQUNBO0VBQ0UsYUFBYTtFQUNiLHFDQUFxQztFQUNyQyxtQkFBbUI7RUFDbkIsdUJBQXVCO0FBQ3pCO0FBQ0E7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQiwrQ0FBK0M7RUFDL0MsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWixpQkFBaUI7QUFDbkI7QUFDQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLFlBQVk7RUFDWixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7QUFDQSxRQUFRO0FBQ1I7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2Qix1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLFVBQVU7RUFDViw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSxZQUFZO0VBQ1osb0JBQW9CO0VBQ3BCLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsZUFBZTtBQUNqQjtBQUNBO0VBQ0UsY0FBYztBQUNoQjtBQUNBO0NBQ0MsY0FBYztBQUNmOztBQUVBO0VBQ0UsYUFBYTtBQUNmXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjpyb290e1xcbiAgLS1jb2xvci1ncmV5OiAjOTE4ZDhkO1xcbiAgLS1jb2xvci1ibHVlOiAjNDg5M2NjO1xcbn1cXG5cXG4qIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90b1xcXCIsIHNhbnMtc2VyaWY7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuXFxuYm9keXtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KDQwMHB4LCA4MDBweCk7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXFxcImJhY2tncm91bmQuanBnXFxcIik7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1hdHRhY2htZW50OiBmaXhlZDtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxufVxcblxcbi5tYWlue1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBkaXNwbGF5OiBncmlkO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMTIwcHggMTAwcHggMWZyO1xcbn1cXG5cXG5oMSB7XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgcGFkZGluZy1sZWZ0OiAwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDNyZW07XFxuICBjb2xvcjp2YXIoLS1jb2xvci1ibHVlKTtcXG59XFxuLmNvbnRlbnQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWluLWhlaWdodDogMTAwJTtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMTUwcHggNTBweDtcXG59XFxuXFxuLyogbWFpbiAqL1xcbi5sZWZ0IHtcXG4gIGdyaWQtY29sdW1uLXN0YXJ0OiAxO1xcbiAgZ3JpZC1jb2x1bW4tZW5kOiAyO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG4ucmlnaHQge1xcbiAgZ3JpZC1jb2x1bW4tc3RhcnQ6IDI7XFxuICBncmlkLWNvbHVtbi1lbmQ6IDQ7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxufVxcblxcbi5sZWZ0LCBcXG4ucmlnaHR7XFxuICBjb2xvcjp3aGl0ZTtcXG59XFxuXFxuLmJvdHRvbSB7XFxuICBncmlkLWNvbHVtbi1zdGFydDogMTtcXG4gIGdyaWQtY29sdW1uLWVuZDogNDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICBnYXA6IDIwcHg7XFxuICBtYXJnaW46IDVweCAxMHB4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbn1cXG5cXG4uYm90dG9tIHAge1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG59XFxuXFxuLyogZm9ybSAqL1xcbmZvcm0ge1xcbiAgZ3JpZC1jb2x1bW4tc3RhcnQ6IDE7XFxuICBncmlkLWNvbHVtbi1lbmQ6IDQ7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWFyZ2luLXRvcDogMTVweDtcXG4gIGdhcDogNXB4O1xcbn1cXG5cXG5pbnB1dCB7XFxuICB3aWR0aDogMjAwcHg7XFxuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XFxuICBoZWlnaHQ6IDQwcHg7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG59XFxuXFxuYnV0dG9uIHtcXG4gIHBhZGRpbmc6IDVweCAxMHB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBoZWlnaHQ6IDQwcHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi8qIGl0ZW1zIGZyb20gZGFpbHkgKi9cXG5cXG4udGVtcFdyaXR0aW5nIHtcXG4gIGZvbnQtc2l6ZTogNHJlbTtcXG4gIGhlaWdodDogbWluLWNvbnRlbnQ7XFxufVxcblxcbi5jaXR5V3JpdHRpbmcge1xcbiAgZm9udC1zaXplOiAyLjVyZW07XFxuICBmb250LXdlaWdodDogMzAwO1xcbn1cXG4uaWNvbiB7XFxuICBoZWlnaHQ6IDYwcHg7XFxufVxcbi5pY29uaW1nIHtcXG4gIGhlaWdodDogNzVweDtcXG59XFxuLyogYm94IGNvbnRyb2xzICovXFxuLmJ1dHRvbkhvbGRlcntcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWFyZ2luOiAxMHB4IDQwcHg7XFxufVxcbi5TVkdIT0xERVJ7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG4uY2lyY2xle1xcbiAgaGVpZ2h0OiAxMHB4O1xcbiAgd2lkdGg6IDEwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuXFxuLyogZm9yZWNhc3QgYm94ICovXFxuLmZvcmVjYXN0e1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnI7XFxuICBvdmVyZmxvdzogYXV0bztcXG4gIGdyaWQtY29sdW1uLXN0YXJ0OiAxO1xcbiAgZ3JpZC1jb2x1bW4tZW5kOiA0O1xcbiAgbWluLWhlaWdodDogNTMwcHg7XFxufVxcbi52aWV3e1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbiAgbWFyZ2luOiAxMHB4O1xcbiAgZ2FwOiAxMHB4O1xcbiAgcGFkZGluZy1ib3R0b206IDIwcHg7XFxufVxcbi5mb3JlY2FzdEJveCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuLmZvcmVjYXN0Qm94IGRpdiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4udG9kYXlCb3gge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XFxuICBib3gtc2hhZG93OiA1cHggNXB4IDEwcHggMXB4ICB2YXIoLS1jb2xvci1ncmV5KTtcXG4gIGhlaWdodDogbWluLWNvbnRlbnQ7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBtYXJnaW46IDEwcHggMjVweDtcXG59XFxuLnRvZGF5Qm94Om50aC1jaGlsZCgxKXtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi50b2RheUJveCA+IHAge1xcbiAgbWFyZ2luOiAxMHB4O1xcbiAgZm9udC1zaXplOiAxLjNyZW07XFxufVxcblxcbi50b2RheUJveCAuZm9yZWNhc3RCb3g6bnRoLWNoaWxkKGV2ZW4pIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY0MDtcXG59XFxuXFxuLmljb25ze1xcbiAgaGVpZ2h0OiA0NXB4O1xcbn1cXG4vKiBOQVYgKi9cXG5uYXYge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4ubmF2Y29ybmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiA1MCU7XFxuICBib3JkZXItcmFkaXVzOiAwJSA1cmVtIDVyZW0gMCU7XFxufVxcblxcbi5DLCAuRiB7XFxuICBjb2xvcjogd2hpdGU7XFxuICBib3JkZXItcmFkaXVzOiAuNXJlbTtcXG4gIGhlaWdodDogNDBweDtcXG4gIGFzcGVjdC1yYXRpbzogMS8xO1xcbiAgZm9udC1zaXplOiAycmVtO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgcGFkZGluZzogMHB4IDJweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLkN7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuLkZ7XFxuIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4uaGlkZXtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIi8qIGVzbGludC1kaXNhYmxlIGd1YXJkLWZvci1pbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cblxuaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcbmltcG9ydCBcInR5cGVmYWNlLXJvYm90b1wiO1xuaW1wb3J0IGdldFdlYXRoZXJUb2RheSBmcm9tIFwiLi90b2RheVdlYXRoZXJcIlxuaW1wb3J0IGdldFdlYXRoZXJGb3VyRGF5cyBmcm9tIFwiLi9mb3VyV2VhdGhlclwiXG5pbXBvcnQgbW92ZSBmcm9tIFwiLi9tb3ZlXCJcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXG5cbiAgLy8gZ2V0IGZvcm0gYW5kIGFkZCBldmVudCBsaXN0ZW5lclxuICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImZvcm1cIik7XG5cbiAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT4ge1xuICAgIC8vIHN0b3AgZnVsbCBzdWJtaXRcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgLy8gcGFzcyB0aHJvdWdoIHRvIGdldCB0b2RheSdzIHdlYXRoZXJcbiAgICBnZXRXZWF0aGVyVG9kYXkoZm9ybS5jaXR5LnZhbHVlKS5jYXRjaCgoKSA9PiB7XG4gICAgICBmb3JtLmNpdHkuc2V0Q3VzdG9tVmFsaWRpdHkoXCJDaXR5IG5vdCBmb3VuZFwiKTtcbiAgICAgIGZvcm0uY2l0eS5yZXBvcnRWYWxpZGl0eSgpO1xuICAgIH0pO1xuICAgIFxuICAgIGdldFdlYXRoZXJGb3VyRGF5cyhmb3JtLmNpdHkudmFsdWUpLmNhdGNoKCgpID0+IHtcbiAgICAgICAgZm9ybS5jaXR5LnNldEN1c3RvbVZhbGlkaXR5KCdDaXR5IG5vdCBmb3VuZCcpXG4gICAgICAgIGZvcm0uY2l0eS5yZXBvcnRWYWxpZGl0eSgpXG4gICAgfSkgICAgXG4gIH0pO1xuXG4gIC8vIGFsbG93IHVzZXIgdG8gY2hhbmdlIGlucHV0IHRvIHZhbGlkIGNpdHksXG4gIC8vIGFmdGVyIGJhZCByZXNwb25zZS5cbiAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKCkgPT4ge1xuICAgIGZvcm0uY2l0eS5zZXRDdXN0b21WYWxpZGl0eShcIlwiKTtcbiAgICBmb3JtLmNpdHkucmVwb3J0VmFsaWRpdHkoKTtcbiAgfSk7XG5cbiAgY29uc3QgY29udHJvbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb250cm9sJylcbiAgY29udHJvbC5mb3JFYWNoKCBidXR0b24gPT4ge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXsgIFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuICAgICAgdGhpcy5pZCA9PT0gJ2J1dHRvblJpZ2h0JyA/IG1vdmUoJ3JpZ2h0JykgOiBtb3ZlKCdsZWZ0Jyk7XG4gICAgfSlcbiAgfSlcbn0pOyJdLCJuYW1lcyI6WyJkZWdyZWUiLCJhZGRGb3VyVG9QYWdlIiwic2VwZXJhdGUiLCJtZWFzdXJlIiwiY291bnRlciIsImRheSIsImRhdGUiLCJEYXRlIiwiZHRfdHh0IiwidG9kYXkiLCJ0b2RheUJveCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsInNldEF0dHJpYnV0ZSIsInAiLCJ0ZXh0Q29udGVudCIsInRvRGF0ZVN0cmluZyIsInRvTG9jYWxlU3RyaW5nIiwid2Vla2RheSIsImFwcGVuZCIsInF1ZXJ5U2VsZWN0b3IiLCJ0aGlzRGF5IiwiaG91ciIsImhvdXJzIiwiZ2V0SG91cnMiLCJ0b1N0cmluZyIsImxlbmd0aCIsImljb24iLCJ3ZWF0aGVyIiwidGVtcCIsIk1hdGgiLCJyb3VuZCIsIm1haW4iLCJsaXN0b2ZpbmZvIiwiYm94IiwiZ2V0RWxlbWVudEJ5SWQiLCJpdGVtIiwic21hbGwiLCJpbWFnZSIsInNyYyIsInN0eWxlIiwiZGlzcGxheSIsImNsZWFyIiwiZW1wdHlUb3AiLCJsaXN0b2Zsb2NhdGlvbnMiLCJmb3JFYWNoIiwiZ2V0RGF5cyIsInN3aXRjaFVuaXQiLCJnZXRXZWF0aGVyRm91ckRheXMiLCJjaXR5IiwiY2lyY2xlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjaXJjbGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjaXR5UmVzcG9uc2UiLCJmZXRjaCIsIm1vZGUiLCJjaXR5RGF0YSIsImpzb24iLCJyZXNwb25zZSIsImxhdCIsImxvbiIsInJlc3BvbnNlVHdvIiwiZGF0YSIsImRhdGFUd28iLCJzZXBlcmF0ZVR3byIsImlucHV0Iiwid2hlcmUiLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJsYXN0Q2hpbGQiLCJhZGR0byIsImluZm8iLCJhbHQiLCJuZXh0IiwibGlzdCIsImZpcnN0IiwicHVzaCIsInNsaWNlIiwibW92ZSIsImQiLCJib3hlcyIsImIiLCJtb3ZlQm90dG9tIiwiYm90dG9tIiwic2Nyb2xsTGVmdCIsIm1vdmVCYXIiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJhZGRFdmVudExpc3RlbmVyIiwiY2hvaWNlIiwiZGVncmVlcyIsImFsbEMiLCJhbGxGIiwiZWxlbWVudCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInRvZGF5SW5mbyIsInN5bWJvbCIsImNsb3VkcyIsImFsbCIsImZlZWxzIiwiZmVlbHNfbGlrZSIsImh1bWlkaXR5Iiwid2luZFNwZWVkIiwid2luZCIsInNwZWVkIiwic3VucmlzZURhdGEiLCJzeXMiLCJzdW5yaXNlIiwicmlzZUhvdXJzIiwicmlzZU1pbnV0ZXMiLCJnZXRNaW51dGVzIiwic3Vic3RyIiwic3Vuc2V0RGF0YSIsInN1bnNldCIsInNldEhvdXJzIiwic2V0TWludXRlcyIsImRlc2NyaXB0aW9uIiwibG9jYXRpb24iLCJuYW1lIiwiZGlzcGxheVRlbXAiLCJkaXNwbGF5V2luZCIsImdldFdlYXRoZXJUb2RheSIsInJlc3BvbnNlRiIsImRhdGFGIiwiZm9ybSIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJ2YWx1ZSIsImNhdGNoIiwic2V0Q3VzdG9tVmFsaWRpdHkiLCJyZXBvcnRWYWxpZGl0eSIsImNvbnRyb2wiLCJidXR0b24iLCJpZCJdLCJzb3VyY2VSb290IjoiIn0=