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

function addFourToPage(seperate) {
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
      // Degree symbol
      const degree = "\u00B0";

      // get info and set strings
      const hours = date.getHours().toString().length === 2 ? `${date.getHours()}:00` : `0${date.getHours()}:00`;
      const {
        icon
      } = thisDay[hour].weather[0];
      const temp = `${Math.round(thisDay[hour].main.temp)}${degree}C`;

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
        small.className = "smallDiv";
        if (item !== '1') {
          small.textContent = listofinfo[item];
        } else {
          const image = document.createElement("img");
          image.src = `https://openweathermap.org/img/wn/${listofinfo[item]}@2x.png`;
          image.className = 'icons';
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
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */



// forecast weather
async function getWeatherFourDays(city) {
  // remove existing data if second search 
  document.querySelector('.buttonHolder').style.display = 'flex';
  (0,_functions__WEBPACK_IMPORTED_MODULE_0__.clear)("view");
  document.getElementById(`circle0`).style.backgroundColor = 'var(--color-blue)3';
  // get city long and lat details
  const cityResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=8b05adff7a43d479faf0fb11bb35a2d8`, {
    mode: 'cors'
  });
  const cityData = await cityResponse.json();
  // pass long and lat into second API
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityData[0].lat}&lon=${cityData[0].lon}&appid=8b05adff7a43d479faf0fb11bb35a2d8&units=metric`, {
    mode: 'cors'
  });
  // convert to JSON
  const data = await response.json();
  // empty arrays to later be filled
  const seperate = [];
  let next = [];
  let item = 0;
  const today = new Date();
  // const firstDate = new Date(data.list[0].dt_txt)

  // if( !(today.toDateString() === firstDate.toDateString())){
  //   const firstEmpty = [];
  //   seperate.push(firstEmpty);
  // }

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
  // pass new array into this function
  // to be added to page
  (0,_addFour__WEBPACK_IMPORTED_MODULE_1__["default"])(seperate);
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
function addto(where, info) {
  clear(where);
  // check for image else just add to correct div
  if (where === "icon") {
    const image = document.createElement("img");
    image.className = "iconimg";
    image.alt = "Today's weather icon";
    image.src = `https://openweathermap.org/img/wn/${info}@2x.png`;
    ;
    document.querySelector(".icon").append(image);
  } else {
    const p = document.createElement("p");
    p.className = `${where}Writting`;
    p.textContent = info;
    document.querySelector(`.${where}`).append(p);
  }
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
  document.getElementById(`circle${counter}`).style.backgroundColor = 'var(--color-blue)';
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
  }, 8000);

  // ontouch stop movement
  document.getElementById('search').addEventListener('click', () => {
    clearInterval(moveBar);
  });

  // on new search stop event so it can restart
  bottom.addEventListener('mouseover', () => {
    clearInterval(moveBar);
  });
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
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions */ "./src/functions.js");
/* harmony import */ var _moveBottom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./moveBottom */ "./src/moveBottom.js");



// get today's weather async

async function getWeatherToday(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=8b05adff7a43d479faf0fb11bb35a2d8&units=metric`, {
    mode: 'cors'
  });
  const data = await response.json();

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

  // add to a list
  const listofinfo = [`Cloudiness: ${clouds}%`, `Feels like: ${feels}${degree}C`, `Humidity: ${humidity}%`, `Wind speed: ${windSpeed}`, `${temp}${degree}C`, `Sunrise: ${sunrise}`, `Sunset: ${sunset}`, `${description}`, icon, location];

  // list of divs in HTML file
  const listoflocations = ["clouds", "feels", "humidity", "windSpeed", "temp", "sunrise", "sunset", "description", "icon", "city"];

  // loop over and add to correct place
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const item in listofinfo) {
    (0,_functions__WEBPACK_IMPORTED_MODULE_0__.addto)(listoflocations[item], listofinfo[item]);
  }
  (0,_moveBottom__WEBPACK_IMPORTED_MODULE_1__["default"])();
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
___CSS_LOADER_EXPORT___.push([module.id, ":root{\n  --color-grey: #918d8d;\n  --color-blue: #4893cc;\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  font-family: \"Roboto\", sans-serif;\n}\n\nbody {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-position: center;\n  background-repeat: no-repeat;\n  background-attachment: fixed;\n  background-size: cover;\n  overflow: auto;\n  display: grid;\n  grid-template-rows: 120px 100px 1fr;\n}\n\nh1 {\n  padding: 20px;\n  padding-left: 0px;\n  text-align: center;\n  font-size: 3rem;\n  color:var(--color-blue);\n}\n.content {\n  display: grid;\n  width: 100vw;\n  min-height: 100%;\n  grid-template-columns: 1fr 1fr;\n  grid-template-rows: 150px 80px;\n}\n\n/* main */\n.left {\n  grid-column-start: 1;\n  grid-column-end: 2;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n.right {\n  grid-column-start: 2;\n  grid-column-end: 4;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n.left, \n.right{\n  color:white;\n}\n\n.bottom {\n  grid-column-start: 1;\n  grid-column-end: 4;\n  display: flex;\n  justify-content: flex-start;\n  gap: 20px;\n  margin: 10px;\n  align-items: center;\n  overflow: auto;\n}\n\n.bottom p {\n  font-size: 1.5rem;\n  white-space: nowrap;\n  font-weight: 300;\n}\n\n/* form */\nform {\n  grid-column-start: 1;\n  grid-column-end: 4;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin-top: 15px;\n  gap: 5px;\n}\n\ninput {\n  width: 200px;\n  padding-left: 10px;\n  border: none;\n  border-radius: 0.5rem;\n  height: 40px;\n  font-size: 1.5rem;\n}\n\nbutton {\n  padding: 5px 10px;\n  border: none;\n  border-radius: 0.5rem;\n  background-color: white;\n  height: 40px;\n}\n\n/* items from daily */\n\n.tempWritting {\n  font-size: 4rem;\n  height: min-content;\n}\n\n.cityWritting {\n  font-size: 2.5rem;\n  font-weight: 300;\n}\n.icon {\n  height: 60px;\n}\n.iconimg {\n  height: 75px;\n}\n/* box controls */\n.buttonHolder{\n  display: none;\n  justify-content: space-between;\n  align-items: center;\n  margin: 10px 40px;\n}\n.SVGHOLDER{\n  display: grid;\n  place-items: center;\n  background-color: transparent;\n}\n.circle{\n  height: 10px;\n  width: 10px;\n  background-color: white;\n  border-radius: 50%;\n}\n\n/* forecast box */\n.forecast{\n  display: grid;\n  grid-template-rows: auto 1fr;\n  overflow: auto;\n  grid-column-start: 1;\n  grid-column-end: 4;\n  min-height: 530px;\n}\n.view{\n  display: grid;\n  overflow: auto;\n  margin: 10px;\n  gap: 10px;\n  padding-bottom: 20px;\n}\n.forecastBox {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  align-items: center;\n  justify-content: center;\n}\n.forecastBox div {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.todayBox {\n  display: none;\n  flex-direction: column;\n  text-align: center;\n  border-radius: 0.5rem;\n  box-shadow: 5px 5px 10px 1px  var(--color-grey);\n  height: min-content;\n  padding: 5px;\n  margin: 10px 25px;\n}\n.todayBox:nth-child(1){\n  display: flex;\n}\n\n.todayBox > p {\n  margin: 10px;\n  font-size: 1.3rem;\n}\n\n.todayBox .forecastBox:nth-child(even) {\n  background-color: #ffffff40;\n}\n\n.icons{\n  height: 45px;\n}\n/* NAV */\nnav {\n  background-color: var(--color-blue);\n  height: 100%;\n}\n\n.navcorner {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: white;\n  height: 100%;\n  width: 50%;\n  border-radius: 0% 5rem 5rem 0%;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,qBAAqB;EACrB,qBAAqB;AACvB;;AAEA;EACE,SAAS;EACT,UAAU;EACV,iCAAiC;AACnC;;AAEA;EACE,mDAAiC;EACjC,2BAA2B;EAC3B,4BAA4B;EAC5B,4BAA4B;EAC5B,sBAAsB;EACtB,cAAc;EACd,aAAa;EACb,mCAAmC;AACrC;;AAEA;EACE,aAAa;EACb,iBAAiB;EACjB,kBAAkB;EAClB,eAAe;EACf,uBAAuB;AACzB;AACA;EACE,aAAa;EACb,YAAY;EACZ,gBAAgB;EAChB,8BAA8B;EAC9B,8BAA8B;AAChC;;AAEA,SAAS;AACT;EACE,oBAAoB;EACpB,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,2BAA2B;AAC7B;;AAEA;EACE,oBAAoB;EACpB,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,2BAA2B;AAC7B;;AAEA;;EAEE,WAAW;AACb;;AAEA;EACE,oBAAoB;EACpB,kBAAkB;EAClB,aAAa;EACb,2BAA2B;EAC3B,SAAS;EACT,YAAY;EACZ,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,iBAAiB;EACjB,mBAAmB;EACnB,gBAAgB;AAClB;;AAEA,SAAS;AACT;EACE,oBAAoB;EACpB,kBAAkB;EAClB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,gBAAgB;EAChB,QAAQ;AACV;;AAEA;EACE,YAAY;EACZ,kBAAkB;EAClB,YAAY;EACZ,qBAAqB;EACrB,YAAY;EACZ,iBAAiB;AACnB;;AAEA;EACE,iBAAiB;EACjB,YAAY;EACZ,qBAAqB;EACrB,uBAAuB;EACvB,YAAY;AACd;;AAEA,qBAAqB;;AAErB;EACE,eAAe;EACf,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,gBAAgB;AAClB;AACA;EACE,YAAY;AACd;AACA;EACE,YAAY;AACd;AACA,iBAAiB;AACjB;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,iBAAiB;AACnB;AACA;EACE,aAAa;EACb,mBAAmB;EACnB,6BAA6B;AAC/B;AACA;EACE,YAAY;EACZ,WAAW;EACX,uBAAuB;EACvB,kBAAkB;AACpB;;AAEA,iBAAiB;AACjB;EACE,aAAa;EACb,4BAA4B;EAC5B,cAAc;EACd,oBAAoB;EACpB,kBAAkB;EAClB,iBAAiB;AACnB;AACA;EACE,aAAa;EACb,cAAc;EACd,YAAY;EACZ,SAAS;EACT,oBAAoB;AACtB;AACA;EACE,aAAa;EACb,qCAAqC;EACrC,mBAAmB;EACnB,uBAAuB;AACzB;AACA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,kBAAkB;EAClB,qBAAqB;EACrB,+CAA+C;EAC/C,mBAAmB;EACnB,YAAY;EACZ,iBAAiB;AACnB;AACA;EACE,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,iBAAiB;AACnB;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,YAAY;AACd;AACA,QAAQ;AACR;EACE,mCAAmC;EACnC,YAAY;AACd;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,uBAAuB;EACvB,YAAY;EACZ,UAAU;EACV,8BAA8B;AAChC","sourcesContent":[":root{\n  --color-grey: #918d8d;\n  --color-blue: #4893cc;\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  font-family: \"Roboto\", sans-serif;\n}\n\nbody {\n  background: url(\"background.jpg\");\n  background-position: center;\n  background-repeat: no-repeat;\n  background-attachment: fixed;\n  background-size: cover;\n  overflow: auto;\n  display: grid;\n  grid-template-rows: 120px 100px 1fr;\n}\n\nh1 {\n  padding: 20px;\n  padding-left: 0px;\n  text-align: center;\n  font-size: 3rem;\n  color:var(--color-blue);\n}\n.content {\n  display: grid;\n  width: 100vw;\n  min-height: 100%;\n  grid-template-columns: 1fr 1fr;\n  grid-template-rows: 150px 80px;\n}\n\n/* main */\n.left {\n  grid-column-start: 1;\n  grid-column-end: 2;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n.right {\n  grid-column-start: 2;\n  grid-column-end: 4;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n.left, \n.right{\n  color:white;\n}\n\n.bottom {\n  grid-column-start: 1;\n  grid-column-end: 4;\n  display: flex;\n  justify-content: flex-start;\n  gap: 20px;\n  margin: 10px;\n  align-items: center;\n  overflow: auto;\n}\n\n.bottom p {\n  font-size: 1.5rem;\n  white-space: nowrap;\n  font-weight: 300;\n}\n\n/* form */\nform {\n  grid-column-start: 1;\n  grid-column-end: 4;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin-top: 15px;\n  gap: 5px;\n}\n\ninput {\n  width: 200px;\n  padding-left: 10px;\n  border: none;\n  border-radius: 0.5rem;\n  height: 40px;\n  font-size: 1.5rem;\n}\n\nbutton {\n  padding: 5px 10px;\n  border: none;\n  border-radius: 0.5rem;\n  background-color: white;\n  height: 40px;\n}\n\n/* items from daily */\n\n.tempWritting {\n  font-size: 4rem;\n  height: min-content;\n}\n\n.cityWritting {\n  font-size: 2.5rem;\n  font-weight: 300;\n}\n.icon {\n  height: 60px;\n}\n.iconimg {\n  height: 75px;\n}\n/* box controls */\n.buttonHolder{\n  display: none;\n  justify-content: space-between;\n  align-items: center;\n  margin: 10px 40px;\n}\n.SVGHOLDER{\n  display: grid;\n  place-items: center;\n  background-color: transparent;\n}\n.circle{\n  height: 10px;\n  width: 10px;\n  background-color: white;\n  border-radius: 50%;\n}\n\n/* forecast box */\n.forecast{\n  display: grid;\n  grid-template-rows: auto 1fr;\n  overflow: auto;\n  grid-column-start: 1;\n  grid-column-end: 4;\n  min-height: 530px;\n}\n.view{\n  display: grid;\n  overflow: auto;\n  margin: 10px;\n  gap: 10px;\n  padding-bottom: 20px;\n}\n.forecastBox {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  align-items: center;\n  justify-content: center;\n}\n.forecastBox div {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.todayBox {\n  display: none;\n  flex-direction: column;\n  text-align: center;\n  border-radius: 0.5rem;\n  box-shadow: 5px 5px 10px 1px  var(--color-grey);\n  height: min-content;\n  padding: 5px;\n  margin: 10px 25px;\n}\n.todayBox:nth-child(1){\n  display: flex;\n}\n\n.todayBox > p {\n  margin: 10px;\n  font-size: 1.3rem;\n}\n\n.todayBox .forecastBox:nth-child(even) {\n  background-color: #ffffff40;\n}\n\n.icons{\n  height: 45px;\n}\n/* NAV */\nnav {\n  background-color: var(--color-blue);\n  height: 100%;\n}\n\n.navcorner {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: white;\n  height: 100%;\n  width: 50%;\n  border-radius: 0% 5rem 5rem 0%;\n}\n"],"sourceRoot":""}]);
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







// import Icon from './icon.png';

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
    (0,_fourWeather__WEBPACK_IMPORTED_MODULE_3__["default"])(form.city.value).catch(e => {
      console.log(e);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDc0UsaUJBQWlCLENBQUMsRUFBRSxDQUFDO0lBQy9CTCxJQUFJLENBQUNqRSxJQUFJLENBQUN1RSxjQUFjLEVBQUU7RUFDNUIsQ0FBQyxDQUFDO0VBRUYsTUFBTUksT0FBTyxHQUFHNUcsUUFBUSxDQUFDNEQsZ0JBQWdCLENBQUMsVUFBVSxDQUFDO0VBQ3JEZ0QsT0FBTyxDQUFDN0MsT0FBTyxDQUFFOEMsTUFBTSxJQUFJO0lBQ3pCO0lBQ0FBLE1BQU0sQ0FBQ3BDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFVO01BQ3pDO01BQ0EsSUFBSSxDQUFDcUMsRUFBRSxLQUFLLGFBQWEsR0FBR2pELGlEQUFJLENBQUMsT0FBTyxDQUFDLEdBQUdBLGlEQUFJLENBQUMsTUFBTSxDQUFDO0lBQzFELENBQUMsQ0FBQztFQUNKLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci8uL3NyYy9hZGRGb3VyLmpzIiwid2VicGFjazovL3dlYXRoZXIvLi9zcmMvZm91cldlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL3NyYy9mdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL3NyYy9tb3ZlLmpzIiwid2VicGFjazovL3dlYXRoZXIvLi9zcmMvbW92ZUJvdHRvbS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vc3JjL3RvZGF5V2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL3R5cGVmYWNlLXJvYm90by9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3dlYXRoZXIvLi9ub2RlX21vZHVsZXMvdHlwZWZhY2Utcm9ib3RvL2luZGV4LmNzcz8wMTNlIiwid2VicGFjazovL3dlYXRoZXIvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3dlYXRoZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3dlYXRoZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXIvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vd2VhdGhlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3dlYXRoZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly93ZWF0aGVyL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3dlYXRoZXIvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3dlYXRoZXIvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgZ3VhcmQtZm9yLWluICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGRGb3VyVG9QYWdlKHNlcGVyYXRlKXtcbiAgICAvLyBjb3VudGVyIGZvciBib3hpZFxuICAgIGxldCBjb3VudGVyID0gMDtcblxuICAgIC8vIGxvb3Agb3ZlciBlYWNoIGRheVxuICAgIGZvciAoY29uc3QgZGF5IGluIHNlcGVyYXRlKSB7XG4gICAgICAgIC8vIHRvZGF5IGFuZCBuZXcgZGF0ZSBiYXNlZCBvbiB0aGUgaW5wdXRcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHNlcGVyYXRlW2RheV1bMF1bMF0uZHRfdHh0KTtcbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIC8vIGNyZWF0ZSBkYXkgYm94XG4gICAgICAgIGNvbnN0IHRvZGF5Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdG9kYXlCb3guY2xhc3NOYW1lID0gXCJ0b2RheUJveFwiO1xuICAgICAgICB0b2RheUJveC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgZGF5JHtkYXl9YCk7XG5cbiAgICAgICAgLy8gdGl0bGUgb2YgYm94XG4gICAgICAgIGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgcC50ZXh0Q29udGVudCA9XG4gICAgICAgICAgdG9kYXkudG9EYXRlU3RyaW5nKCkgPT09IGRhdGUudG9EYXRlU3RyaW5nKClcbiAgICAgICAgICAgID8gXCJUb2RheVwiXG4gICAgICAgICAgICA6IGRhdGUudG9Mb2NhbGVTdHJpbmcoXCJlbi11a1wiLCB7IHdlZWtkYXk6IFwibG9uZ1wiIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gYWRkIHRvIGJveFxuICAgICAgICB0b2RheUJveC5hcHBlbmQocCk7XG5cbiAgICAgICAgLy8gYWRkIGJveCB0byBwYWdlXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudmlld1wiKS5hcHBlbmQodG9kYXlCb3gpO1xuXG4gICAgICAgIC8vIGRhdGEgb2YgdGhpcyBkYXlcbiAgICAgICAgY29uc3QgdGhpc0RheSA9IHNlcGVyYXRlW2RheV1bMF07XG5cbiAgICAgICAgLy8gZm9yIGVhY2ggaG91ciBvZiB0aGlzIGRheVxuICAgICAgICBmb3IgKGNvbnN0IGhvdXIgaW4gdGhpc0RheSkge1xuXG4gICAgICAgICAgLy8gZ2V0IGl0J3MgZGF0ZSBhbmQgdG9kYXkncyBkYXRlXG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNoYWRvd1xuICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh0aGlzRGF5W2hvdXJdLmR0X3R4dCk7XG4gICAgICAgICAgLy8gRGVncmVlIHN5bWJvbFxuICAgICAgICAgIGNvbnN0IGRlZ3JlZSA9IFwiXFx1MDBCMFwiO1xuICBcbiAgICAgICAgICAvLyBnZXQgaW5mbyBhbmQgc2V0IHN0cmluZ3NcbiAgICAgICAgICBjb25zdCBob3VycyA9XG4gICAgICAgICAgICBkYXRlLmdldEhvdXJzKCkudG9TdHJpbmcoKS5sZW5ndGggPT09IDJcbiAgICAgICAgICAgICAgPyBgJHtkYXRlLmdldEhvdXJzKCl9OjAwYFxuICAgICAgICAgICAgICA6IGAwJHtkYXRlLmdldEhvdXJzKCl9OjAwYDtcbiAgICAgICAgICBjb25zdCB7IGljb24gfSA9IHRoaXNEYXlbaG91cl0ud2VhdGhlclswXTtcbiAgICAgICAgICBjb25zdCB0ZW1wID0gYCR7TWF0aC5yb3VuZCh0aGlzRGF5W2hvdXJdLm1haW4udGVtcCl9JHtkZWdyZWV9Q2A7XG4gIFxuICAgICAgICAgIC8vIGFkZCB0byBhIGxpc3RcbiAgICAgICAgICBjb25zdCBsaXN0b2ZpbmZvID0gW2hvdXJzLCBpY29uLCB0ZW1wXTtcbiAgXG4gICAgICAgICAgLy8gY3JlYXRlIGEgYm94IGZvciBlYWNoIGhvdXIsIHNldCBJRCBhbmQgY2xhc3NcbiAgICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgIGJveC5jbGFzc05hbWUgPSBcImZvcmVjYXN0Qm94XCI7XG4gICAgICAgICAgYm94LnNldEF0dHJpYnV0ZShcImlkXCIsIGBib3gke2NvdW50ZXJ9YCk7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGRheSR7ZGF5fWApLmFwcGVuZChib3gpO1xuICBcbiAgICAgICAgICAvLyBhZGQgZWFjaCBiaXQgb2YgaW5mbyBmb3IgdGhlIGhvdXIsIGNoZWNraW5nIGZvciBhbiBpbWFnZVxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBpbiBsaXN0b2ZpbmZvKSB7XG4gICAgICAgICAgICBjb25zdCBzbWFsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBzbWFsbC5jbGFzc05hbWUgPSBcInNtYWxsRGl2XCI7XG4gICAgICAgICAgICBpZiAoaXRlbSAhPT0gJzEnKSB7XG4gICAgICAgICAgICAgIHNtYWxsLnRleHRDb250ZW50ID0gbGlzdG9maW5mb1tpdGVtXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnN0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgICAgICAgaW1hZ2Uuc3JjID0gYGh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke2xpc3RvZmluZm9baXRlbV19QDJ4LnBuZ2A7XG4gICAgICAgICAgICAgIGltYWdlLmNsYXNzTmFtZSA9ICdpY29ucydcbiAgICAgICAgICAgICAgc21hbGwuYXBwZW5kKGltYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGFkZCB0byBwYWdlXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYm94JHtjb3VudGVyfWApLmFwcGVuZChzbWFsbCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGluY3JlYXNlIGNvdW50ZXIgZm9yIG5leHQgYm94XG4gICAgICAgICAgY291bnRlciArPSAxO1xuICAgICAgICB9XG4gICAgICB9XG59IiwiLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cbi8qIGVzbGludC1kaXNhYmxlIGd1YXJkLWZvci1pbiAqL1xuaW1wb3J0IHsgY2xlYXIgfSBmcm9tIFwiLi9mdW5jdGlvbnNcIlxuaW1wb3J0IGFkZEZvdXJUb1BhZ2UgZnJvbSBcIi4vYWRkRm91clwiXG5cbi8vIGZvcmVjYXN0IHdlYXRoZXJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJGb3VyRGF5cyhjaXR5KSB7XG5cbiAgICAvLyByZW1vdmUgZXhpc3RpbmcgZGF0YSBpZiBzZWNvbmQgc2VhcmNoIFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b25Ib2xkZXInKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXG4gICAgY2xlYXIoXCJ2aWV3XCIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjaXJjbGUwYCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3ZhcigtLWNvbG9yLWJsdWUpMydcbiAgICAvLyBnZXQgY2l0eSBsb25nIGFuZCBsYXQgZGV0YWlsc1xuICAgIGNvbnN0IGNpdHlSZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9nZW8vMS4wL2RpcmVjdD9xPSR7Y2l0eX0mbGltaXQ9MSZhcHBpZD04YjA1YWRmZjdhNDNkNDc5ZmFmMGZiMTFiYjM1YTJkOGAse1xuICAgICAgICBtb2RlOiAnY29ycydcbiAgICAgIH1cbiAgICApO1xuICAgIGNvbnN0IGNpdHlEYXRhID0gYXdhaXQgY2l0eVJlc3BvbnNlLmpzb24oKTtcbiAgICAvLyBwYXNzIGxvbmcgYW5kIGxhdCBpbnRvIHNlY29uZCBBUElcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9sYXQ9JHtjaXR5RGF0YVswXS5sYXR9Jmxvbj0ke2NpdHlEYXRhWzBdLmxvbn0mYXBwaWQ9OGIwNWFkZmY3YTQzZDQ3OWZhZjBmYjExYmIzNWEyZDgmdW5pdHM9bWV0cmljYCx7XG4gICAgICAgIG1vZGU6ICdjb3JzJ1xuICAgICAgfVxuICAgICk7XG4gICAgLy8gY29udmVydCB0byBKU09OXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAvLyBlbXB0eSBhcnJheXMgdG8gbGF0ZXIgYmUgZmlsbGVkXG4gICAgY29uc3Qgc2VwZXJhdGUgPSBbXTtcbiAgICBsZXQgbmV4dCA9IFtdO1xuICAgIGxldCBpdGVtID0gMDtcbiAgICBcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgLy8gY29uc3QgZmlyc3REYXRlID0gbmV3IERhdGUoZGF0YS5saXN0WzBdLmR0X3R4dClcblxuICAgIC8vIGlmKCAhKHRvZGF5LnRvRGF0ZVN0cmluZygpID09PSBmaXJzdERhdGUudG9EYXRlU3RyaW5nKCkpKXtcbiAgICAvLyAgIGNvbnN0IGZpcnN0RW1wdHkgPSBbXTtcbiAgICAvLyAgIHNlcGVyYXRlLnB1c2goZmlyc3RFbXB0eSk7XG4gICAgLy8gfVxuXG4gICAgLy8gc3BsaXRzIHRoZSB3aG9sZSBhcnJheSBpbnRvIGRheXNcbiAgICBmb3IgKGl0ZW07IGl0ZW0gPCBkYXRhLmxpc3QubGVuZ3RoOyBpdGVtICs9IDEpIHtcbiAgICAgICAgXG4gICAgICAgIC8vIG5ldyBkYXRlIGFuZCB0b2RheXNcbiAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkYXRhLmxpc3RbaXRlbV0uZHRfdHh0KTtcblxuICAgICAgLy8gY2hlY2sgaWYgdG9kYXlcbiAgICAgIGlmICh0b2RheS50b0RhdGVTdHJpbmcoKSA9PT0gZGF0ZS50b0RhdGVTdHJpbmcoKSkge1xuICAgICAgICAvLyBlbXB0eSBhcnJheVxuICAgICAgICBjb25zdCBmaXJzdCA9IFtdO1xuICAgICAgICAvLyBjaGVjayB1bnRpbCB0aGUgbmV4dCBkYXkgZG9lcyBub3QgZXF1YWwgdG9kYXlcbiAgICAgICAgLy8gYWRkIGl0IHRvIHRoZSBhcnJheSBhbmQgcHVzaCB0byB0aGUgc2VwZXJhdGUgYXJyYXlcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRvZGF5LnRvRGF0ZVN0cmluZygpICE9PVxuICAgICAgICAgIG5ldyBEYXRlKGRhdGEubGlzdFtpdGVtICsgMV0uZHRfdHh0KS50b0RhdGVTdHJpbmcoKVxuICAgICAgICApIHtcbiAgICAgICAgICBmaXJzdC5wdXNoKGRhdGEubGlzdC5zbGljZSgwLCBpdGVtICsgMSkpO1xuICAgICAgICAgIHNlcGVyYXRlLnB1c2goZmlyc3QpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmIG5vdCB0b2RheSBhbmQgbW9yZSB0aGFuIDggaXRlbXMgaW4gdGhlIGFycmF5IGxlZnRcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICEodG9kYXkudG9EYXRlU3RyaW5nKCkgPT09IGRhdGUudG9EYXRlU3RyaW5nKCkpICYmXG4gICAgICAgIGRhdGEubGlzdC5sZW5ndGggPj0gaXRlbSArIDhcbiAgICAgICkge1xuICAgICAgICAvLyBwdXNoIHRoZSBuZXh0IDggaG91ciBzbG90cyBpbnRvIG5leHQgdGhlbiBhZGQgdG8gc2VwZXJhdGUgaW4gaXQncyBvd24gYXJyYXlcbiAgICAgICAgbmV4dC5wdXNoKGRhdGEubGlzdC5zbGljZShbaXRlbV0sIGl0ZW0gKyA4KSk7XG4gICAgICAgIGl0ZW0gKz0gNztcbiAgICAgICAgc2VwZXJhdGUucHVzaChuZXh0KTtcbiAgICAgICAgbmV4dCA9IFtdO1xuICAgICAgICAvLyBpZiB0aGUgbGFzdCBkYXkgYWRkIHRvIG5leHQgdGhlbiB0byBzZXBlcmF0ZVxuICAgICAgfSBlbHNlIGlmIChkYXRhLmxpc3QubGVuZ3RoIDwgaXRlbSArIDgpIHtcbiAgICAgICAgbmV4dC5wdXNoKGRhdGEubGlzdC5zbGljZShbaXRlbV0pKTtcbiAgICAgICAgaXRlbSA9IGRhdGEubGlzdC5sZW5ndGg7XG4gICAgICAgIHNlcGVyYXRlLnB1c2gobmV4dCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHBhc3MgbmV3IGFycmF5IGludG8gdGhpcyBmdW5jdGlvblxuICAgIC8vIHRvIGJlIGFkZGVkIHRvIHBhZ2VcbiAgICBhZGRGb3VyVG9QYWdlKHNlcGVyYXRlKVxuICB9IiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuLy8gY2xlYXIgb3V0IGV4aXN0aW5nIHBhZ2VcbmV4cG9ydCBmdW5jdGlvbiBjbGVhcihpbnB1dCkge1xuICAgIGNvbnN0IHdoZXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7aW5wdXR9YCk7XG4gICAgd2hpbGUgKHdoZXJlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHdoZXJlLnJlbW92ZUNoaWxkKHdoZXJlLmxhc3RDaGlsZCk7XG4gICAgfVxuICB9XG5cbi8vIGFkZCB0b2RheSdzIGZvcmVjYXN0IHRvIHBhZ2VcbmV4cG9ydCBmdW5jdGlvbiBhZGR0byh3aGVyZSwgaW5mbykge1xuICAgIGNsZWFyKHdoZXJlKTtcbiAgICAvLyBjaGVjayBmb3IgaW1hZ2UgZWxzZSBqdXN0IGFkZCB0byBjb3JyZWN0IGRpdlxuICAgIGlmICh3aGVyZSA9PT0gXCJpY29uXCIpIHtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICBpbWFnZS5jbGFzc05hbWUgPSBcImljb25pbWdcIjtcbiAgICAgICAgaW1hZ2UuYWx0ID0gXCJUb2RheSdzIHdlYXRoZXIgaWNvblwiO1xuICAgICAgICBpbWFnZS5zcmMgPSBgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7aW5mb31AMngucG5nYDs7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaWNvblwiKS5hcHBlbmQoaW1hZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgcC5jbGFzc05hbWUgPSBgJHt3aGVyZX1Xcml0dGluZ2A7XG4gICAgICAgIHAudGV4dENvbnRlbnQgPSBpbmZvO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt3aGVyZX1gKS5hcHBlbmQocCk7XG4gICAgfVxufSIsImxldCBjb3VudGVyID0gMFxuY29uc3QgY2lyY2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaXJjbGUnKVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtb3ZlKGQpe1xuXG4gICBpZihkID09PSAncmlnaHQnICYmIGNvdW50ZXIgIT09IDUpe1xuICAgICAgICAvLyBkbyBzb21ldGhpbmdcbiAgICAgICAgY291bnRlciArPSAxXG4gICB9IGVsc2UgaWYgKGQgPT09ICdsZWZ0JyAmJiBjb3VudGVyICE9PSAwICl7XG4gICAgICAgIC8vIGRvIHNvbWV0aGluZ1xuICAgICAgICBjb3VudGVyIC09IDFcbiAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgIH1cblxuICAgIGNpcmNsZXMuZm9yRWFjaCgoY2lyY2xlKSA9PiB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBjaXJjbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcbiAgICB9KVxuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGNpcmNsZSR7Y291bnRlcn1gKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAndmFyKC0tY29sb3ItYmx1ZSknXG5cbiAgICBjb25zdCBib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2RheUJveCcpXG4gICAgYm94ZXMuZm9yRWFjaCggKGIpID0+IHtcbiAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBiLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICB9KVxuXG4gICAgY29uc3QgYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGRheSR7Y291bnRlcn1gKVxuICAgIGJveC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCJcbn0iLCIgZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbW92ZUJvdHRvbSgpe1xuICAgIC8vIGdldCBjb250YWluZXJcbiAgICBjb25zdCBib3R0b20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm90dG9tJylcblxuICAgIC8vIHJlc2V0IHRvIDBcbiAgICBib3R0b20uc2Nyb2xsTGVmdCA9IDA7XG5cbiAgICAvLyBtb3ZlIGJ5IDEgcGl4ZWxcbiAgICBjb25zdCBtb3ZlQmFyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgYm90dG9tLnNjcm9sbExlZnQgKz0gMTtcbiAgICB9LCAxMClcblxuICAgIC8vIHN0b3AgYWZ0ZXIgbW92aW5nIGJhciBhZnRlciA4MDAwXG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgY2xlYXJJbnRlcnZhbChtb3ZlQmFyKVxuICAgIH0sIDgwMDApXG5cbiAgICAvLyBvbnRvdWNoIHN0b3AgbW92ZW1lbnRcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjbGVhckludGVydmFsKG1vdmVCYXIpXG4gICAgfSlcblxuICAgIC8vIG9uIG5ldyBzZWFyY2ggc3RvcCBldmVudCBzbyBpdCBjYW4gcmVzdGFydFxuICAgIGJvdHRvbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICBjbGVhckludGVydmFsKG1vdmVCYXIpXG4gICAgfSlcbn0iLCJpbXBvcnQgeyBhZGR0b30gZnJvbSBcIi4vZnVuY3Rpb25zXCJcbmltcG9ydCBtb3ZlQm90dG9tIGZyb20gXCIuL21vdmVCb3R0b21cIlxuXG4vLyBnZXQgdG9kYXkncyB3ZWF0aGVyIGFzeW5jXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJUb2RheShjaXR5KSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eX0mQVBQSUQ9OGIwNWFkZmY3YTQzZDQ3OWZhZjBmYjExYmIzNWEyZDgmdW5pdHM9bWV0cmljYCx7XG4gICAgICAgIG1vZGU6ICdjb3JzJ1xuICAgICAgfVxuICAgICk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgIC8vIGdldCBuZWVkZWQgaW5mb1xuICAgIGNvbnN0IGNsb3VkcyA9IGRhdGEuY2xvdWRzLmFsbDtcbiAgICBjb25zdCBmZWVscyA9IE1hdGgucm91bmQoZGF0YS5tYWluLmZlZWxzX2xpa2UpO1xuICAgIGNvbnN0IHsgaHVtaWRpdHkgfSA9IGRhdGEubWFpbjtcbiAgICBjb25zdCB3aW5kU3BlZWQgPSBkYXRhLndpbmQuc3BlZWQ7XG4gICAgY29uc3QgdGVtcCA9IE1hdGgucm91bmQoZGF0YS5tYWluLnRlbXApO1xuICAgIGNvbnN0IHN1bnJpc2VEYXRhID0gbmV3IERhdGUoZGF0YS5zeXMuc3VucmlzZSAqIDEwMDApO1xuICAgIGNvbnN0IHJpc2VIb3VycyA9IHN1bnJpc2VEYXRhLmdldEhvdXJzKCk7XG4gICAgY29uc3QgcmlzZU1pbnV0ZXMgPSBgMCR7c3VucmlzZURhdGEuZ2V0TWludXRlcygpfWA7XG4gICAgY29uc3Qgc3VucmlzZSA9IGAke3Jpc2VIb3Vyc306JHtyaXNlTWludXRlcy5zdWJzdHIoLTIpfWA7XG4gICAgY29uc3Qgc3Vuc2V0RGF0YSA9IG5ldyBEYXRlKGRhdGEuc3lzLnN1bnNldCAqIDEwMDApO1xuICAgIGNvbnN0IHNldEhvdXJzID0gc3Vuc2V0RGF0YS5nZXRIb3VycygpO1xuICAgIGNvbnN0IHNldE1pbnV0ZXMgPSBgMCR7c3Vuc2V0RGF0YS5nZXRNaW51dGVzKCl9YDtcbiAgICBjb25zdCBzdW5zZXQgPSBgJHtzZXRIb3Vyc306JHtzZXRNaW51dGVzLnN1YnN0cigtMil9YDtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRhdGEud2VhdGhlclswXS5tYWluO1xuICAgIGNvbnN0IHsgaWNvbiB9ID0gZGF0YS53ZWF0aGVyWzBdO1xuICAgIGNvbnN0IGxvY2F0aW9uID0gZGF0YS5uYW1lO1xuICAgIGNvbnN0IGRlZ3JlZSA9IFwiXFx1MDBCMFwiO1xuXG4gICAgLy8gYWRkIHRvIGEgbGlzdFxuICAgIGNvbnN0IGxpc3RvZmluZm8gPSBbXG4gICAgICBgQ2xvdWRpbmVzczogJHtjbG91ZHN9JWAsXG4gICAgICBgRmVlbHMgbGlrZTogJHtmZWVsc30ke2RlZ3JlZX1DYCxcbiAgICAgIGBIdW1pZGl0eTogJHtodW1pZGl0eX0lYCxcbiAgICAgIGBXaW5kIHNwZWVkOiAke3dpbmRTcGVlZH1gLFxuICAgICAgYCR7dGVtcH0ke2RlZ3JlZX1DYCxcbiAgICAgIGBTdW5yaXNlOiAke3N1bnJpc2V9YCxcbiAgICAgIGBTdW5zZXQ6ICR7c3Vuc2V0fWAsXG4gICAgICBgJHtkZXNjcmlwdGlvbn1gLFxuICAgICAgaWNvbixcbiAgICAgIGxvY2F0aW9uLFxuICAgIF07XG5cbiAgICAvLyBsaXN0IG9mIGRpdnMgaW4gSFRNTCBmaWxlXG4gICAgY29uc3QgbGlzdG9mbG9jYXRpb25zID0gW1xuICAgICAgXCJjbG91ZHNcIixcbiAgICAgIFwiZmVlbHNcIixcbiAgICAgIFwiaHVtaWRpdHlcIixcbiAgICAgIFwid2luZFNwZWVkXCIsXG4gICAgICBcInRlbXBcIixcbiAgICAgIFwic3VucmlzZVwiLFxuICAgICAgXCJzdW5zZXRcIixcbiAgICAgIFwiZGVzY3JpcHRpb25cIixcbiAgICAgIFwiaWNvblwiLFxuICAgICAgXCJjaXR5XCIsXG4gICAgXTtcblxuICAgIC8vIGxvb3Agb3ZlciBhbmQgYWRkIHRvIGNvcnJlY3QgcGxhY2VcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXgsIGd1YXJkLWZvci1pblxuICAgIGZvciAoY29uc3QgaXRlbSBpbiBsaXN0b2ZpbmZvKSB7XG4gICAgICBhZGR0byhsaXN0b2Zsb2NhdGlvbnNbaXRlbV0sIGxpc3RvZmluZm9baXRlbV0pO1xuICAgIH1cblxuICAgIG1vdmVCb3R0b20oKVxuICB9IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTEwMC53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTEwMC53b2ZmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tMTAwaXRhbGljLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tMTAwaXRhbGljLndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi0zMDAud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNV9fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi0zMDAud29mZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF82X19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTMwMGl0YWxpYy53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF83X19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTMwMGl0YWxpYy53b2ZmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzhfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tNDAwLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzlfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tNDAwLndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTBfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tNDAwaXRhbGljLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzExX19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTQwMGl0YWxpYy53b2ZmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzEyX19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTUwMC53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xM19fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi01MDAud29mZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xNF9fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi01MDBpdGFsaWMud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTVfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tNTAwaXRhbGljLndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTZfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tNzAwLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzE3X19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTcwMC53b2ZmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzE4X19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTcwMGl0YWxpYy53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xOV9fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi03MDBpdGFsaWMud29mZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yMF9fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi05MDAud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMjFfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tOTAwLndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMjJfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tOTAwaXRhbGljLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzIzX19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTkwMGl0YWxpYy53b2ZmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzRfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF80X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF81X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzZfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzdfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF83X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF84X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfOF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfOV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzlfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzEwX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzExX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzEyX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTJfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzEzX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTNfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE0X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE1X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTVfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE2X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTZfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE3X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTdfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE4X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMThfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE5X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTlfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzIwX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMjBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzIxX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMjFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzIyX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMjJfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzIzX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMjNfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogcm9ib3RvLTEwMG5vcm1hbCAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogMTAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIFRoaW4gJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tVGhpbicpLFxcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gKyBcIikgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tMTAwaXRhbGljIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiAxMDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gVGhpbiBpdGFsaWMnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1UaGluaXRhbGljJyksXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gKyBcIikgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyArIFwiKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by0zMDBub3JtYWwgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBMaWdodCAnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1MaWdodCcpLFxcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF80X19fICsgXCIpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzVfX18gKyBcIikgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tMzAwaXRhbGljIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gTGlnaHQgaXRhbGljJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tTGlnaHRpdGFsaWMnKSxcXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNl9fXyArIFwiKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF83X19fICsgXCIpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTQwMG5vcm1hbCAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIFJlZ3VsYXIgJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tUmVndWxhcicpLFxcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF84X19fICsgXCIpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzlfX18gKyBcIikgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tNDAwaXRhbGljIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gUmVndWxhciBpdGFsaWMnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1SZWd1bGFyaXRhbGljJyksXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzEwX19fICsgXCIpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzExX19fICsgXCIpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTUwMG5vcm1hbCAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIE1lZGl1bSAnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1NZWRpdW0nKSxcXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTJfX18gKyBcIikgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTNfX18gKyBcIikgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tNTAwaXRhbGljIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gTWVkaXVtIGl0YWxpYycpLFxcbiAgICBsb2NhbCgnUm9ib3RvLU1lZGl1bWl0YWxpYycpLFxcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xNF9fXyArIFwiKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xNV9fXyArIFwiKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by03MDBub3JtYWwgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBCb2xkICcpLFxcbiAgICBsb2NhbCgnUm9ib3RvLUJvbGQnKSxcXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTZfX18gKyBcIikgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTdfX18gKyBcIikgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tNzAwaXRhbGljIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gQm9sZCBpdGFsaWMnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1Cb2xkaXRhbGljJyksXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE4X19fICsgXCIpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE5X19fICsgXCIpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTkwMG5vcm1hbCAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogOTAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIEJsYWNrICcpLFxcbiAgICBsb2NhbCgnUm9ib3RvLUJsYWNrJyksXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzIwX19fICsgXCIpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzIxX19fICsgXCIpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTkwMGl0YWxpYyAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogOTAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIEJsYWNrIGl0YWxpYycpLFxcbiAgICBsb2NhbCgnUm9ib3RvLUJsYWNraXRhbGljJyksXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzIyX19fICsgXCIpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzIzX19fICsgXCIpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vbm9kZV9tb2R1bGVzL3R5cGVmYWNlLXJvYm90by9pbmRleC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsNkJBQTZCO0FBQzdCO0VBQ0UscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCOzs7OzBEQUlxRCxFQUFFLG9CQUFvQjtBQUM3RTs7QUFFQSw2QkFBNkI7QUFDN0I7RUFDRSxxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEI7Ozs7MERBSTJELEVBQUUsb0JBQW9CO0FBQ25GOztBQUVBLDZCQUE2QjtBQUM3QjtFQUNFLHFCQUFxQjtFQUNyQixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQjs7OzswREFJcUQsRUFBRSxvQkFBb0I7QUFDN0U7O0FBRUEsNkJBQTZCO0FBQzdCO0VBQ0UscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCOzs7OzBEQUkyRCxFQUFFLG9CQUFvQjtBQUNuRjs7QUFFQSw2QkFBNkI7QUFDN0I7RUFDRSxxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEI7Ozs7MERBSXFELEVBQUUsb0JBQW9CO0FBQzdFOztBQUVBLDZCQUE2QjtBQUM3QjtFQUNFLHFCQUFxQjtFQUNyQixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQjs7OzsyREFJMkQsRUFBRSxvQkFBb0I7QUFDbkY7O0FBRUEsNkJBQTZCO0FBQzdCO0VBQ0UscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCOzs7OzJEQUlxRCxFQUFFLG9CQUFvQjtBQUM3RTs7QUFFQSw2QkFBNkI7QUFDN0I7RUFDRSxxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEI7Ozs7MkRBSTJELEVBQUUsb0JBQW9CO0FBQ25GOztBQUVBLDZCQUE2QjtBQUM3QjtFQUNFLHFCQUFxQjtFQUNyQixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQjs7OzsyREFJcUQsRUFBRSxvQkFBb0I7QUFDN0U7O0FBRUEsNkJBQTZCO0FBQzdCO0VBQ0UscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCOzs7OzJEQUkyRCxFQUFFLG9CQUFvQjtBQUNuRjs7QUFFQSw2QkFBNkI7QUFDN0I7RUFDRSxxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEI7Ozs7MkRBSXFELEVBQUUsb0JBQW9CO0FBQzdFOztBQUVBLDZCQUE2QjtBQUM3QjtFQUNFLHFCQUFxQjtFQUNyQixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQjs7OzsyREFJMkQsRUFBRSxvQkFBb0I7QUFDbkZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogcm9ib3RvLTEwMG5vcm1hbCAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogMTAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIFRoaW4gJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tVGhpbicpLFxcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTEwMC53b2ZmMicpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tMTAwLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by0xMDBpdGFsaWMgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDEwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBUaGluIGl0YWxpYycpLFxcbiAgICBsb2NhbCgnUm9ib3RvLVRoaW5pdGFsaWMnKSxcXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi0xMDBpdGFsaWMud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTEwMGl0YWxpYy53b2ZmJykgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tMzAwbm9ybWFsIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gTGlnaHQgJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tTGlnaHQnKSxcXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi0zMDAud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTMwMC53b2ZmJykgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tMzAwaXRhbGljIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gTGlnaHQgaXRhbGljJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tTGlnaHRpdGFsaWMnKSxcXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi0zMDBpdGFsaWMud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTMwMGl0YWxpYy53b2ZmJykgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tNDAwbm9ybWFsIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gUmVndWxhciAnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1SZWd1bGFyJyksXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tNDAwLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi00MDAud29mZicpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTQwMGl0YWxpYyAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIFJlZ3VsYXIgaXRhbGljJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tUmVndWxhcml0YWxpYycpLFxcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTQwMGl0YWxpYy53b2ZmMicpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tNDAwaXRhbGljLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by01MDBub3JtYWwgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBNZWRpdW0gJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tTWVkaXVtJyksXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tNTAwLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi01MDAud29mZicpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTUwMGl0YWxpYyAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIE1lZGl1bSBpdGFsaWMnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1NZWRpdW1pdGFsaWMnKSxcXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi01MDBpdGFsaWMud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTUwMGl0YWxpYy53b2ZmJykgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tNzAwbm9ybWFsIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gQm9sZCAnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1Cb2xkJyksXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tNzAwLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi03MDAud29mZicpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTcwMGl0YWxpYyAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIEJvbGQgaXRhbGljJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tQm9sZGl0YWxpYycpLFxcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTcwMGl0YWxpYy53b2ZmMicpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tNzAwaXRhbGljLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by05MDBub3JtYWwgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBCbGFjayAnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1CbGFjaycpLFxcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTkwMC53b2ZmMicpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tOTAwLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by05MDBpdGFsaWMgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBCbGFjayBpdGFsaWMnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1CbGFja2l0YWxpYycpLFxcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTkwMGl0YWxpYy53b2ZmMicpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tOTAwaXRhbGljLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiYmFja2dyb3VuZC5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCI6cm9vdHtcXG4gIC0tY29sb3ItZ3JleTogIzkxOGQ4ZDtcXG4gIC0tY29sb3ItYmx1ZTogIzQ4OTNjYztcXG59XFxuXFxuKiB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG9cXFwiLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQ6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIik7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1hdHRhY2htZW50OiBmaXhlZDtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICBvdmVyZmxvdzogYXV0bztcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDEyMHB4IDEwMHB4IDFmcjtcXG59XFxuXFxuaDEge1xcbiAgcGFkZGluZzogMjBweDtcXG4gIHBhZGRpbmctbGVmdDogMHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiAzcmVtO1xcbiAgY29sb3I6dmFyKC0tY29sb3ItYmx1ZSk7XFxufVxcbi5jb250ZW50IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICB3aWR0aDogMTAwdnc7XFxuICBtaW4taGVpZ2h0OiAxMDAlO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxNTBweCA4MHB4O1xcbn1cXG5cXG4vKiBtYWluICovXFxuLmxlZnQge1xcbiAgZ3JpZC1jb2x1bW4tc3RhcnQ6IDE7XFxuICBncmlkLWNvbHVtbi1lbmQ6IDI7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxufVxcblxcbi5yaWdodCB7XFxuICBncmlkLWNvbHVtbi1zdGFydDogMjtcXG4gIGdyaWQtY29sdW1uLWVuZDogNDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG59XFxuXFxuLmxlZnQsIFxcbi5yaWdodHtcXG4gIGNvbG9yOndoaXRlO1xcbn1cXG5cXG4uYm90dG9tIHtcXG4gIGdyaWQtY29sdW1uLXN0YXJ0OiAxO1xcbiAgZ3JpZC1jb2x1bW4tZW5kOiA0O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIGdhcDogMjBweDtcXG4gIG1hcmdpbjogMTBweDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBvdmVyZmxvdzogYXV0bztcXG59XFxuXFxuLmJvdHRvbSBwIHtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxufVxcblxcbi8qIGZvcm0gKi9cXG5mb3JtIHtcXG4gIGdyaWQtY29sdW1uLXN0YXJ0OiAxO1xcbiAgZ3JpZC1jb2x1bW4tZW5kOiA0O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1hcmdpbi10b3A6IDE1cHg7XFxuICBnYXA6IDVweDtcXG59XFxuXFxuaW5wdXQge1xcbiAgd2lkdGg6IDIwMHB4O1xcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xcbiAgaGVpZ2h0OiA0MHB4O1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxufVxcblxcbmJ1dHRvbiB7XFxuICBwYWRkaW5nOiA1cHggMTBweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgaGVpZ2h0OiA0MHB4O1xcbn1cXG5cXG4vKiBpdGVtcyBmcm9tIGRhaWx5ICovXFxuXFxuLnRlbXBXcml0dGluZyB7XFxuICBmb250LXNpemU6IDRyZW07XFxuICBoZWlnaHQ6IG1pbi1jb250ZW50O1xcbn1cXG5cXG4uY2l0eVdyaXR0aW5nIHtcXG4gIGZvbnQtc2l6ZTogMi41cmVtO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG59XFxuLmljb24ge1xcbiAgaGVpZ2h0OiA2MHB4O1xcbn1cXG4uaWNvbmltZyB7XFxuICBoZWlnaHQ6IDc1cHg7XFxufVxcbi8qIGJveCBjb250cm9scyAqL1xcbi5idXR0b25Ib2xkZXJ7XFxuICBkaXNwbGF5OiBub25lO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1hcmdpbjogMTBweCA0MHB4O1xcbn1cXG4uU1ZHSE9MREVSe1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuLmNpcmNsZXtcXG4gIGhlaWdodDogMTBweDtcXG4gIHdpZHRoOiAxMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxufVxcblxcbi8qIGZvcmVjYXN0IGJveCAqL1xcbi5mb3JlY2FzdHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBncmlkLWNvbHVtbi1zdGFydDogMTtcXG4gIGdyaWQtY29sdW1uLWVuZDogNDtcXG4gIG1pbi1oZWlnaHQ6IDUzMHB4O1xcbn1cXG4udmlld3tcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBvdmVyZmxvdzogYXV0bztcXG4gIG1hcmdpbjogMTBweDtcXG4gIGdhcDogMTBweDtcXG4gIHBhZGRpbmctYm90dG9tOiAyMHB4O1xcbn1cXG4uZm9yZWNhc3RCb3gge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcbi5mb3JlY2FzdEJveCBkaXYge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLnRvZGF5Qm94IHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xcbiAgYm94LXNoYWRvdzogNXB4IDVweCAxMHB4IDFweCAgdmFyKC0tY29sb3ItZ3JleSk7XFxuICBoZWlnaHQ6IG1pbi1jb250ZW50O1xcbiAgcGFkZGluZzogNXB4O1xcbiAgbWFyZ2luOiAxMHB4IDI1cHg7XFxufVxcbi50b2RheUJveDpudGgtY2hpbGQoMSl7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4udG9kYXlCb3ggPiBwIHtcXG4gIG1hcmdpbjogMTBweDtcXG4gIGZvbnQtc2l6ZTogMS4zcmVtO1xcbn1cXG5cXG4udG9kYXlCb3ggLmZvcmVjYXN0Qm94Om50aC1jaGlsZChldmVuKSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmNDA7XFxufVxcblxcbi5pY29uc3tcXG4gIGhlaWdodDogNDVweDtcXG59XFxuLyogTkFWICovXFxubmF2IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJsdWUpO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4ubmF2Y29ybmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiA1MCU7XFxuICBib3JkZXItcmFkaXVzOiAwJSA1cmVtIDVyZW0gMCU7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxxQkFBcUI7RUFDckIscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsU0FBUztFQUNULFVBQVU7RUFDVixpQ0FBaUM7QUFDbkM7O0FBRUE7RUFDRSxtREFBaUM7RUFDakMsMkJBQTJCO0VBQzNCLDRCQUE0QjtFQUM1Qiw0QkFBNEI7RUFDNUIsc0JBQXNCO0VBQ3RCLGNBQWM7RUFDZCxhQUFhO0VBQ2IsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLHVCQUF1QjtBQUN6QjtBQUNBO0VBQ0UsYUFBYTtFQUNiLFlBQVk7RUFDWixnQkFBZ0I7RUFDaEIsOEJBQThCO0VBQzlCLDhCQUE4QjtBQUNoQzs7QUFFQSxTQUFTO0FBQ1Q7RUFDRSxvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsMkJBQTJCO0FBQzdCOztBQUVBOztFQUVFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLDJCQUEyQjtFQUMzQixTQUFTO0VBQ1QsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixnQkFBZ0I7QUFDbEI7O0FBRUEsU0FBUztBQUNUO0VBQ0Usb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixnQkFBZ0I7RUFDaEIsUUFBUTtBQUNWOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1oscUJBQXFCO0VBQ3JCLFlBQVk7RUFDWixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsWUFBWTtFQUNaLHFCQUFxQjtFQUNyQix1QkFBdUI7RUFDdkIsWUFBWTtBQUNkOztBQUVBLHFCQUFxQjs7QUFFckI7RUFDRSxlQUFlO0VBQ2YsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGdCQUFnQjtBQUNsQjtBQUNBO0VBQ0UsWUFBWTtBQUNkO0FBQ0E7RUFDRSxZQUFZO0FBQ2Q7QUFDQSxpQkFBaUI7QUFDakI7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLG1CQUFtQjtFQUNuQixpQkFBaUI7QUFDbkI7QUFDQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsNkJBQTZCO0FBQy9CO0FBQ0E7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLHVCQUF1QjtFQUN2QixrQkFBa0I7QUFDcEI7O0FBRUEsaUJBQWlCO0FBQ2pCO0VBQ0UsYUFBYTtFQUNiLDRCQUE0QjtFQUM1QixjQUFjO0VBQ2Qsb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQixpQkFBaUI7QUFDbkI7QUFDQTtFQUNFLGFBQWE7RUFDYixjQUFjO0VBQ2QsWUFBWTtFQUNaLFNBQVM7RUFDVCxvQkFBb0I7QUFDdEI7QUFDQTtFQUNFLGFBQWE7RUFDYixxQ0FBcUM7RUFDckMsbUJBQW1CO0VBQ25CLHVCQUF1QjtBQUN6QjtBQUNBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixxQkFBcUI7RUFDckIsK0NBQStDO0VBQy9DLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1osaUJBQWlCO0FBQ25CO0FBQ0E7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxZQUFZO0VBQ1osaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UsWUFBWTtBQUNkO0FBQ0EsUUFBUTtBQUNSO0VBQ0UsbUNBQW1DO0VBQ25DLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osVUFBVTtFQUNWLDhCQUE4QjtBQUNoQ1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCI6cm9vdHtcXG4gIC0tY29sb3ItZ3JleTogIzkxOGQ4ZDtcXG4gIC0tY29sb3ItYmx1ZTogIzQ4OTNjYztcXG59XFxuXFxuKiB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG9cXFwiLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQ6IHVybChcXFwiYmFja2dyb3VuZC5qcGdcXFwiKTtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLWF0dGFjaG1lbnQ6IGZpeGVkO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMTIwcHggMTAwcHggMWZyO1xcbn1cXG5cXG5oMSB7XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgcGFkZGluZy1sZWZ0OiAwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDNyZW07XFxuICBjb2xvcjp2YXIoLS1jb2xvci1ibHVlKTtcXG59XFxuLmNvbnRlbnQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIG1pbi1oZWlnaHQ6IDEwMCU7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDE1MHB4IDgwcHg7XFxufVxcblxcbi8qIG1haW4gKi9cXG4ubGVmdCB7XFxuICBncmlkLWNvbHVtbi1zdGFydDogMTtcXG4gIGdyaWQtY29sdW1uLWVuZDogMjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG59XFxuXFxuLnJpZ2h0IHtcXG4gIGdyaWQtY29sdW1uLXN0YXJ0OiAyO1xcbiAgZ3JpZC1jb2x1bW4tZW5kOiA0O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG4ubGVmdCwgXFxuLnJpZ2h0e1xcbiAgY29sb3I6d2hpdGU7XFxufVxcblxcbi5ib3R0b20ge1xcbiAgZ3JpZC1jb2x1bW4tc3RhcnQ6IDE7XFxuICBncmlkLWNvbHVtbi1lbmQ6IDQ7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgZ2FwOiAyMHB4O1xcbiAgbWFyZ2luOiAxMHB4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbn1cXG5cXG4uYm90dG9tIHAge1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG59XFxuXFxuLyogZm9ybSAqL1xcbmZvcm0ge1xcbiAgZ3JpZC1jb2x1bW4tc3RhcnQ6IDE7XFxuICBncmlkLWNvbHVtbi1lbmQ6IDQ7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWFyZ2luLXRvcDogMTVweDtcXG4gIGdhcDogNXB4O1xcbn1cXG5cXG5pbnB1dCB7XFxuICB3aWR0aDogMjAwcHg7XFxuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XFxuICBoZWlnaHQ6IDQwcHg7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG59XFxuXFxuYnV0dG9uIHtcXG4gIHBhZGRpbmc6IDVweCAxMHB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBoZWlnaHQ6IDQwcHg7XFxufVxcblxcbi8qIGl0ZW1zIGZyb20gZGFpbHkgKi9cXG5cXG4udGVtcFdyaXR0aW5nIHtcXG4gIGZvbnQtc2l6ZTogNHJlbTtcXG4gIGhlaWdodDogbWluLWNvbnRlbnQ7XFxufVxcblxcbi5jaXR5V3JpdHRpbmcge1xcbiAgZm9udC1zaXplOiAyLjVyZW07XFxuICBmb250LXdlaWdodDogMzAwO1xcbn1cXG4uaWNvbiB7XFxuICBoZWlnaHQ6IDYwcHg7XFxufVxcbi5pY29uaW1nIHtcXG4gIGhlaWdodDogNzVweDtcXG59XFxuLyogYm94IGNvbnRyb2xzICovXFxuLmJ1dHRvbkhvbGRlcntcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWFyZ2luOiAxMHB4IDQwcHg7XFxufVxcbi5TVkdIT0xERVJ7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG4uY2lyY2xle1xcbiAgaGVpZ2h0OiAxMHB4O1xcbiAgd2lkdGg6IDEwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuXFxuLyogZm9yZWNhc3QgYm94ICovXFxuLmZvcmVjYXN0e1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnI7XFxuICBvdmVyZmxvdzogYXV0bztcXG4gIGdyaWQtY29sdW1uLXN0YXJ0OiAxO1xcbiAgZ3JpZC1jb2x1bW4tZW5kOiA0O1xcbiAgbWluLWhlaWdodDogNTMwcHg7XFxufVxcbi52aWV3e1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbiAgbWFyZ2luOiAxMHB4O1xcbiAgZ2FwOiAxMHB4O1xcbiAgcGFkZGluZy1ib3R0b206IDIwcHg7XFxufVxcbi5mb3JlY2FzdEJveCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuLmZvcmVjYXN0Qm94IGRpdiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4udG9kYXlCb3gge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XFxuICBib3gtc2hhZG93OiA1cHggNXB4IDEwcHggMXB4ICB2YXIoLS1jb2xvci1ncmV5KTtcXG4gIGhlaWdodDogbWluLWNvbnRlbnQ7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBtYXJnaW46IDEwcHggMjVweDtcXG59XFxuLnRvZGF5Qm94Om50aC1jaGlsZCgxKXtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi50b2RheUJveCA+IHAge1xcbiAgbWFyZ2luOiAxMHB4O1xcbiAgZm9udC1zaXplOiAxLjNyZW07XFxufVxcblxcbi50b2RheUJveCAuZm9yZWNhc3RCb3g6bnRoLWNoaWxkKGV2ZW4pIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY0MDtcXG59XFxuXFxuLmljb25ze1xcbiAgaGVpZ2h0OiA0NXB4O1xcbn1cXG4vKiBOQVYgKi9cXG5uYXYge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmx1ZSk7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbi5uYXZjb3JuZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDUwJTtcXG4gIGJvcmRlci1yYWRpdXM6IDAlIDVyZW0gNXJlbSAwJTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiLyogZXNsaW50LWRpc2FibGUgZ3VhcmQtZm9yLWluICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuXG5pbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuaW1wb3J0IFwidHlwZWZhY2Utcm9ib3RvXCI7XG5pbXBvcnQgZ2V0V2VhdGhlclRvZGF5IGZyb20gXCIuL3RvZGF5V2VhdGhlclwiXG5pbXBvcnQgZ2V0V2VhdGhlckZvdXJEYXlzIGZyb20gXCIuL2ZvdXJXZWF0aGVyXCJcbmltcG9ydCBtb3ZlIGZyb20gXCIuL21vdmVcIlxuXG4vLyBpbXBvcnQgSWNvbiBmcm9tICcuL2ljb24ucG5nJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXG4gIC8vIGdldCBmb3JtIGFuZCBhZGQgZXZlbnQgbGlzdGVuZXJcbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpO1xuXG4gIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcbiAgICAvLyBzdG9wIGZ1bGwgc3VibWl0XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIC8vIHBhc3MgdGhyb3VnaCB0byBnZXQgdG9kYXkncyB3ZWF0aGVyXG4gICAgZ2V0V2VhdGhlclRvZGF5KGZvcm0uY2l0eS52YWx1ZSkuY2F0Y2goKCkgPT4ge1xuICAgICAgZm9ybS5jaXR5LnNldEN1c3RvbVZhbGlkaXR5KFwiQ2l0eSBub3QgZm91bmRcIik7XG4gICAgICBmb3JtLmNpdHkucmVwb3J0VmFsaWRpdHkoKTtcbiAgICB9KTtcbiAgICBcbiAgICBnZXRXZWF0aGVyRm91ckRheXMoZm9ybS5jaXR5LnZhbHVlKS5jYXRjaCgoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgICBmb3JtLmNpdHkuc2V0Q3VzdG9tVmFsaWRpdHkoJ0NpdHkgbm90IGZvdW5kJylcbiAgICAgICAgZm9ybS5jaXR5LnJlcG9ydFZhbGlkaXR5KClcbiAgICB9KVxuICB9KTtcblxuICAvLyBhbGxvdyB1c2VyIHRvIGNoYW5nZSBpbnB1dCB0byB2YWxpZCBjaXR5LFxuICAvLyBhZnRlciBiYWQgcmVzcG9uc2UuXG4gIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsICgpID0+IHtcbiAgICBmb3JtLmNpdHkuc2V0Q3VzdG9tVmFsaWRpdHkoXCJcIik7XG4gICAgZm9ybS5jaXR5LnJlcG9ydFZhbGlkaXR5KCk7XG4gIH0pO1xuXG4gIGNvbnN0IGNvbnRyb2wgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29udHJvbCcpXG4gIGNvbnRyb2wuZm9yRWFjaCggYnV0dG9uID0+IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7ICBcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnNcbiAgICAgIHRoaXMuaWQgPT09ICdidXR0b25SaWdodCcgPyBtb3ZlKCdyaWdodCcpIDogbW92ZSgnbGVmdCcpO1xuICAgIH0pXG4gIH0pXG59KTtcbiJdLCJuYW1lcyI6WyJhZGRGb3VyVG9QYWdlIiwic2VwZXJhdGUiLCJjb3VudGVyIiwiZGF5IiwiZGF0ZSIsIkRhdGUiLCJkdF90eHQiLCJ0b2RheSIsInRvZGF5Qm94IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwic2V0QXR0cmlidXRlIiwicCIsInRleHRDb250ZW50IiwidG9EYXRlU3RyaW5nIiwidG9Mb2NhbGVTdHJpbmciLCJ3ZWVrZGF5IiwiYXBwZW5kIiwicXVlcnlTZWxlY3RvciIsInRoaXNEYXkiLCJob3VyIiwiZGVncmVlIiwiaG91cnMiLCJnZXRIb3VycyIsInRvU3RyaW5nIiwibGVuZ3RoIiwiaWNvbiIsIndlYXRoZXIiLCJ0ZW1wIiwiTWF0aCIsInJvdW5kIiwibWFpbiIsImxpc3RvZmluZm8iLCJib3giLCJnZXRFbGVtZW50QnlJZCIsIml0ZW0iLCJzbWFsbCIsImltYWdlIiwic3JjIiwiY2xlYXIiLCJnZXRXZWF0aGVyRm91ckRheXMiLCJjaXR5Iiwic3R5bGUiLCJkaXNwbGF5IiwiYmFja2dyb3VuZENvbG9yIiwiY2l0eVJlc3BvbnNlIiwiZmV0Y2giLCJtb2RlIiwiY2l0eURhdGEiLCJqc29uIiwicmVzcG9uc2UiLCJsYXQiLCJsb24iLCJkYXRhIiwibmV4dCIsImxpc3QiLCJmaXJzdCIsInB1c2giLCJzbGljZSIsImlucHV0Iiwid2hlcmUiLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJsYXN0Q2hpbGQiLCJhZGR0byIsImluZm8iLCJhbHQiLCJjaXJjbGVzIiwicXVlcnlTZWxlY3RvckFsbCIsIm1vdmUiLCJkIiwiZm9yRWFjaCIsImNpcmNsZSIsImJveGVzIiwiYiIsIm1vdmVCb3R0b20iLCJib3R0b20iLCJzY3JvbGxMZWZ0IiwibW92ZUJhciIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJnZXRXZWF0aGVyVG9kYXkiLCJjbG91ZHMiLCJhbGwiLCJmZWVscyIsImZlZWxzX2xpa2UiLCJodW1pZGl0eSIsIndpbmRTcGVlZCIsIndpbmQiLCJzcGVlZCIsInN1bnJpc2VEYXRhIiwic3lzIiwic3VucmlzZSIsInJpc2VIb3VycyIsInJpc2VNaW51dGVzIiwiZ2V0TWludXRlcyIsInN1YnN0ciIsInN1bnNldERhdGEiLCJzdW5zZXQiLCJzZXRIb3VycyIsInNldE1pbnV0ZXMiLCJkZXNjcmlwdGlvbiIsImxvY2F0aW9uIiwibmFtZSIsImxpc3RvZmxvY2F0aW9ucyIsImZvcm0iLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwidmFsdWUiLCJjYXRjaCIsInNldEN1c3RvbVZhbGlkaXR5IiwicmVwb3J0VmFsaWRpdHkiLCJlIiwiY29uc29sZSIsImxvZyIsImNvbnRyb2wiLCJidXR0b24iLCJpZCJdLCJzb3VyY2VSb290IjoiIn0=