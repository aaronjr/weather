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
    document.querySelector(".forecast").append(todayBox);

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
      const rain = `${Math.round(thisDay[hour].pop * 100)}%`;

      // add to a list
      const listofinfo = [hours, icon, temp, rain];

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
  (0,_functions__WEBPACK_IMPORTED_MODULE_0__.clear)("forecast");
  // get city long and lat details
  const cityResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=8b05adff7a43d479faf0fb11bb35a2d8`);
  const cityData = await cityResponse.json();
  // pass long and lat into second API
  const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${cityData[0].lat}&lon=${cityData[0].lon}&appid=8b05adff7a43d479faf0fb11bb35a2d8&units=metric`);
  // convert to JSON
  const data = await response.json();

  // empty arrays to later be filled
  const seperate = [];
  let next = [];
  let item = 0;

  // splits the whole array into days
  for (item; item < data.list.length; item += 1) {
    // new date and todays
    const date = new Date(data.list[item].dt_txt);
    const today = new Date();

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
    } else if (!(today.toDateString() === date.toDateString()) && data.list.length > item + 8) {
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
    image.src = `http://openweathermap.org/img/w/${info}.png`;
    document.querySelector(".icon").append(image);
  } else {
    const p = document.createElement("p");
    p.className = `${where}Writting`;
    p.textContent = info;
    document.querySelector(`.${where}`).append(p);
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
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions */ "./src/functions.js");


// get today's weather async

async function getWeatherToday(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=8b05adff7a43d479faf0fb11bb35a2d8&units=metric`);
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  margin: 0;\n  padding: 0;\n  font-family: \"Roboto\", sans-serif;\n}\n\nbody {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-position: center;\n  background-repeat: no-repeat;\n  background-attachment: fixed;\n  background-size: cover;\n  overflow: auto;\n  display: grid;\n  grid-template-rows: 77.5px 50px 1fr;\n}\n\nh1 {\n  padding: 20px;\n  padding-left: 0px;\n  text-align: center;\n  font-size: 2rem;\n  color: #918d8d;\n}\n.content {\n  display: grid;\n  width: 100vw;\n  min-height: 100%;\n  grid-template-columns: 1fr 1fr;\n  grid-template-rows: 150px 80px;\n}\n\n/* main */\n.left {\n  grid-column-start: 1;\n  grid-column-end: 2;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\n.right {\n  grid-column-start: 2;\n  grid-column-end: 4;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\n.bottom {\n  grid-column-start: 1;\n  grid-column-end: 4;\n  display: flex;\n  justify-content: flex-start;\n  gap: 20px;\n  margin: 10px;\n  align-items: center;\n  overflow: auto;\n}\n\n.bottom p {\n  font-size: 1.5rem;\n  white-space: nowrap;\n  font-weight: 200;\n}\n\n/* form */\nform {\n  grid-column-start: 1;\n  grid-column-end: 4;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin-top: 15px;\n  gap: 5px;\n}\n\ninput {\n  width: 200px;\n  padding-left: 10px;\n  border: none;\n  border-radius: 0.5rem;\n  height: 25.5px;\n}\n\nbutton {\n  padding: 5px 10px;\n  border: none;\n  border-radius: 0.5rem;\n  background-color: white;\n}\n\n/* items from daily */\n\n.tempWritting {\n  font-size: 3rem;\n  height: 70px;\n}\n\n.cityWritting {\n  font-size: 2rem;\n  font-weight: 200;\n}\n.icon {\n  height: 60px;\n}\n.iconimg {\n  height: 75px;\n}\n\n/* forecast box */\n\n.forecast {\n  display: grid;\n  grid-template-columns: repeat(6, 350px);\n  overflow: auto;\n  margin: 10px;\n  grid-column-start: 1;\n  grid-column-end: 4;\n  gap: 10px;\n  padding-bottom: 20px;\n}\n.forecastBox {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  align-items: center;\n  justify-content: center;\n}\n.forecastBox div {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.todayBox {\n  text-align: center;\n  border: solid white 3px;\n  border-radius: 0.5rem;\n  box-shadow: 5px 5px 5px grey;\n  height: min-content;\n  padding: 5px;\n}\n.todayBox > p {\n  margin: 10px;\n  font-size: 1.3rem;\n}\n\n.todayBox .forecastBox:nth-child(odd) {\n  background-color: #ffffff40;\n}\n\n/* NAV */\nnav {\n  height: min-content;\n}\n\n.navcorner {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: white;\n  height: min-content;\n  width: 50%;\n  border-radius: 0% 5rem 5rem 0%;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,SAAS;EACT,UAAU;EACV,iCAAiC;AACnC;;AAEA;EACE,mDAAiC;EACjC,2BAA2B;EAC3B,4BAA4B;EAC5B,4BAA4B;EAC5B,sBAAsB;EACtB,cAAc;EACd,aAAa;EACb,mCAAmC;AACrC;;AAEA;EACE,aAAa;EACb,iBAAiB;EACjB,kBAAkB;EAClB,eAAe;EACf,cAAc;AAChB;AACA;EACE,aAAa;EACb,YAAY;EACZ,gBAAgB;EAChB,8BAA8B;EAC9B,8BAA8B;AAChC;;AAEA,SAAS;AACT;EACE,oBAAoB;EACpB,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,oBAAoB;EACpB,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,oBAAoB;EACpB,kBAAkB;EAClB,aAAa;EACb,2BAA2B;EAC3B,SAAS;EACT,YAAY;EACZ,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,iBAAiB;EACjB,mBAAmB;EACnB,gBAAgB;AAClB;;AAEA,SAAS;AACT;EACE,oBAAoB;EACpB,kBAAkB;EAClB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,gBAAgB;EAChB,QAAQ;AACV;;AAEA;EACE,YAAY;EACZ,kBAAkB;EAClB,YAAY;EACZ,qBAAqB;EACrB,cAAc;AAChB;;AAEA;EACE,iBAAiB;EACjB,YAAY;EACZ,qBAAqB;EACrB,uBAAuB;AACzB;;AAEA,qBAAqB;;AAErB;EACE,eAAe;EACf,YAAY;AACd;;AAEA;EACE,eAAe;EACf,gBAAgB;AAClB;AACA;EACE,YAAY;AACd;AACA;EACE,YAAY;AACd;;AAEA,iBAAiB;;AAEjB;EACE,aAAa;EACb,uCAAuC;EACvC,cAAc;EACd,YAAY;EACZ,oBAAoB;EACpB,kBAAkB;EAClB,SAAS;EACT,oBAAoB;AACtB;AACA;EACE,aAAa;EACb,qCAAqC;EACrC,mBAAmB;EACnB,uBAAuB;AACzB;AACA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,kBAAkB;EAClB,uBAAuB;EACvB,qBAAqB;EACrB,4BAA4B;EAC5B,mBAAmB;EACnB,YAAY;AACd;AACA;EACE,YAAY;EACZ,iBAAiB;AACnB;;AAEA;EACE,2BAA2B;AAC7B;;AAEA,QAAQ;AACR;EACE,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,uBAAuB;EACvB,mBAAmB;EACnB,UAAU;EACV,8BAA8B;AAChC","sourcesContent":["* {\n  margin: 0;\n  padding: 0;\n  font-family: \"Roboto\", sans-serif;\n}\n\nbody {\n  background: url(\"background.jpg\");\n  background-position: center;\n  background-repeat: no-repeat;\n  background-attachment: fixed;\n  background-size: cover;\n  overflow: auto;\n  display: grid;\n  grid-template-rows: 77.5px 50px 1fr;\n}\n\nh1 {\n  padding: 20px;\n  padding-left: 0px;\n  text-align: center;\n  font-size: 2rem;\n  color: #918d8d;\n}\n.content {\n  display: grid;\n  width: 100vw;\n  min-height: 100%;\n  grid-template-columns: 1fr 1fr;\n  grid-template-rows: 150px 80px;\n}\n\n/* main */\n.left {\n  grid-column-start: 1;\n  grid-column-end: 2;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\n.right {\n  grid-column-start: 2;\n  grid-column-end: 4;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\n.bottom {\n  grid-column-start: 1;\n  grid-column-end: 4;\n  display: flex;\n  justify-content: flex-start;\n  gap: 20px;\n  margin: 10px;\n  align-items: center;\n  overflow: auto;\n}\n\n.bottom p {\n  font-size: 1.5rem;\n  white-space: nowrap;\n  font-weight: 200;\n}\n\n/* form */\nform {\n  grid-column-start: 1;\n  grid-column-end: 4;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin-top: 15px;\n  gap: 5px;\n}\n\ninput {\n  width: 200px;\n  padding-left: 10px;\n  border: none;\n  border-radius: 0.5rem;\n  height: 25.5px;\n}\n\nbutton {\n  padding: 5px 10px;\n  border: none;\n  border-radius: 0.5rem;\n  background-color: white;\n}\n\n/* items from daily */\n\n.tempWritting {\n  font-size: 3rem;\n  height: 70px;\n}\n\n.cityWritting {\n  font-size: 2rem;\n  font-weight: 200;\n}\n.icon {\n  height: 60px;\n}\n.iconimg {\n  height: 75px;\n}\n\n/* forecast box */\n\n.forecast {\n  display: grid;\n  grid-template-columns: repeat(6, 350px);\n  overflow: auto;\n  margin: 10px;\n  grid-column-start: 1;\n  grid-column-end: 4;\n  gap: 10px;\n  padding-bottom: 20px;\n}\n.forecastBox {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  align-items: center;\n  justify-content: center;\n}\n.forecastBox div {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.todayBox {\n  text-align: center;\n  border: solid white 3px;\n  border-radius: 0.5rem;\n  box-shadow: 5px 5px 5px grey;\n  height: min-content;\n  padding: 5px;\n}\n.todayBox > p {\n  margin: 10px;\n  font-size: 1.3rem;\n}\n\n.todayBox .forecastBox:nth-child(odd) {\n  background-color: #ffffff40;\n}\n\n/* NAV */\nnav {\n  height: min-content;\n}\n\n.navcorner {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: white;\n  height: min-content;\n  width: 50%;\n  border-radius: 0% 5rem 5rem 0%;\n}\n"],"sourceRoot":""}]);
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

module.exports = __webpack_require__.p + "5b25dec1abc5712728c3.jpg";

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
    (0,_fourWeather__WEBPACK_IMPORTED_MODULE_3__["default"])(form.city.value);
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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQztNQUM3Q0wsSUFBSSxDQUFDL0MsSUFBSSxDQUFDcUQsY0FBYyxFQUFFO0lBQzVCLENBQUMsQ0FBQztJQUVGdEQsd0RBQWtCLENBQUNnRCxJQUFJLENBQUMvQyxJQUFJLENBQUNrRCxLQUFLLENBQUM7SUFDbkM7SUFDQTtJQUNBO0lBQ0E7RUFDRixDQUFDLENBQUM7O0VBRUY7RUFDQTtFQUNBSCxJQUFJLENBQUNELGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO0lBQ25DQyxJQUFJLENBQUMvQyxJQUFJLENBQUNvRCxpQkFBaUIsQ0FBQyxFQUFFLENBQUM7SUFDL0JMLElBQUksQ0FBQy9DLElBQUksQ0FBQ3FELGNBQWMsRUFBRTtFQUM1QixDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXIvLi9zcmMvYWRkRm91ci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vc3JjL2ZvdXJXZWF0aGVyLmpzIiwid2VicGFjazovL3dlYXRoZXIvLi9zcmMvZnVuY3Rpb25zLmpzIiwid2VicGFjazovL3dlYXRoZXIvLi9zcmMvdG9kYXlXZWF0aGVyLmpzIiwid2VicGFjazovL3dlYXRoZXIvLi9ub2RlX21vZHVsZXMvdHlwZWZhY2Utcm9ib3RvL2luZGV4LmNzcyIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL25vZGVfbW9kdWxlcy90eXBlZmFjZS1yb2JvdG8vaW5kZXguY3NzPzAxM2UiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3dlYXRoZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3dlYXRoZXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3dlYXRoZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly93ZWF0aGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vd2VhdGhlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3dlYXRoZXIvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vd2VhdGhlci93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vd2VhdGhlci8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBndWFyZC1mb3ItaW4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtc3ludGF4ICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGRGb3VyVG9QYWdlKHNlcGVyYXRlKXtcblxuICAgIC8vIGNvdW50ZXIgZm9yIGJveGlkXG4gICAgbGV0IGNvdW50ZXIgPSAwO1xuXG4gICAgLy8gbG9vcCBvdmVyIGVhY2ggZGF5XG4gICAgZm9yIChjb25zdCBkYXkgaW4gc2VwZXJhdGUpIHtcbiAgICAgICAgLy8gdG9kYXkgYW5kIG5ldyBkYXRlIGJhc2VkIG9uIHRoZSBpbnB1dFxuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoc2VwZXJhdGVbZGF5XVswXVswXS5kdF90eHQpO1xuICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgLy8gY3JlYXRlIGRheSBib3hcbiAgICAgICAgY29uc3QgdG9kYXlCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0b2RheUJveC5jbGFzc05hbWUgPSBcInRvZGF5Qm94XCI7XG4gICAgICAgIHRvZGF5Qm94LnNldEF0dHJpYnV0ZShcImlkXCIsIGBkYXkke2RheX1gKTtcblxuICAgICAgICAvLyB0aXRsZSBvZiBib3hcbiAgICAgICAgY29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICBwLnRleHRDb250ZW50ID1cbiAgICAgICAgICB0b2RheS50b0RhdGVTdHJpbmcoKSA9PT0gZGF0ZS50b0RhdGVTdHJpbmcoKVxuICAgICAgICAgICAgPyBcIlRvZGF5XCJcbiAgICAgICAgICAgIDogZGF0ZS50b0xvY2FsZVN0cmluZyhcImVuLXVrXCIsIHsgd2Vla2RheTogXCJsb25nXCIgfSk7XG4gICAgICAgIFxuICAgICAgICAvLyBhZGQgdG8gYm94XG4gICAgICAgIHRvZGF5Qm94LmFwcGVuZChwKTtcblxuICAgICAgICAvLyBhZGQgYm94IHRvIHBhZ2VcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JlY2FzdFwiKS5hcHBlbmQodG9kYXlCb3gpO1xuXG4gICAgICAgIC8vIGRhdGEgb2YgdGhpcyBkYXlcbiAgICAgICAgY29uc3QgdGhpc0RheSA9IHNlcGVyYXRlW2RheV1bMF07XG5cbiAgICAgICAgLy8gZm9yIGVhY2ggaG91ciBvZiB0aGlzIGRheVxuICAgICAgICBmb3IgKGNvbnN0IGhvdXIgaW4gdGhpc0RheSkge1xuXG4gICAgICAgICAgLy8gZ2V0IGl0J3MgZGF0ZSBhbmQgdG9kYXkncyBkYXRlXG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNoYWRvd1xuICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh0aGlzRGF5W2hvdXJdLmR0X3R4dCk7XG4gICAgICAgICAgLy8gRGVncmVlIHN5bWJvbFxuICAgICAgICAgIGNvbnN0IGRlZ3JlZSA9IFwiXFx1MDBCMFwiO1xuICBcbiAgICAgICAgICAvLyBnZXQgaW5mbyBhbmQgc2V0IHN0cmluZ3NcbiAgICAgICAgICBjb25zdCBob3VycyA9XG4gICAgICAgICAgICBkYXRlLmdldEhvdXJzKCkudG9TdHJpbmcoKS5sZW5ndGggPT09IDJcbiAgICAgICAgICAgICAgPyBgJHtkYXRlLmdldEhvdXJzKCl9OjAwYFxuICAgICAgICAgICAgICA6IGAwJHtkYXRlLmdldEhvdXJzKCl9OjAwYDtcbiAgICAgICAgICBjb25zdCB7IGljb24gfSA9IHRoaXNEYXlbaG91cl0ud2VhdGhlclswXTtcbiAgICAgICAgICBjb25zdCB0ZW1wID0gYCR7TWF0aC5yb3VuZCh0aGlzRGF5W2hvdXJdLm1haW4udGVtcCl9JHtkZWdyZWV9Q2A7XG4gICAgICAgICAgY29uc3QgcmFpbiA9IGAke01hdGgucm91bmQodGhpc0RheVtob3VyXS5wb3AgKiAxMDApfSVgO1xuICBcbiAgICAgICAgICAvLyBhZGQgdG8gYSBsaXN0XG4gICAgICAgICAgY29uc3QgbGlzdG9maW5mbyA9IFtob3VycywgaWNvbiwgdGVtcCwgcmFpbl07XG4gIFxuICAgICAgICAgIC8vIGNyZWF0ZSBhIGJveCBmb3IgZWFjaCBob3VyLCBzZXQgSUQgYW5kIGNsYXNzXG4gICAgICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBib3guY2xhc3NOYW1lID0gXCJmb3JlY2FzdEJveFwiO1xuICAgICAgICAgIGJveC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgYm94JHtjb3VudGVyfWApO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBkYXkke2RheX1gKS5hcHBlbmQoYm94KTtcbiAgXG4gICAgICAgICAgLy8gYWRkIGVhY2ggYml0IG9mIGluZm8gZm9yIHRoZSBob3VyLCBjaGVja2luZyBmb3IgYW4gaW1hZ2VcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gaW4gbGlzdG9maW5mbykge1xuICAgICAgICAgICAgY29uc3Qgc21hbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgc21hbGwuY2xhc3NOYW1lID0gXCJzbWFsbERpdlwiO1xuICAgICAgICAgICAgaWYgKGl0ZW0gIT09ICcxJykge1xuICAgICAgICAgICAgICBzbWFsbC50ZXh0Q29udGVudCA9IGxpc3RvZmluZm9baXRlbV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zdCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgICAgICAgIGltYWdlLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93LyR7bGlzdG9maW5mb1tpdGVtXX0ucG5nYDtcbiAgICAgICAgICAgICAgc21hbGwuYXBwZW5kKGltYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGFkZCB0byBwYWdlXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYm94JHtjb3VudGVyfWApLmFwcGVuZChzbWFsbCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGluY3JlYXNlIGNvdW50ZXIgZm9yIG5leHQgYm94XG4gICAgICAgICAgY291bnRlciArPSAxO1xuICAgICAgICB9XG4gICAgICB9XG59IiwiLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cbi8qIGVzbGludC1kaXNhYmxlIGd1YXJkLWZvci1pbiAqL1xuaW1wb3J0IHsgY2xlYXIgfSBmcm9tIFwiLi9mdW5jdGlvbnNcIlxuaW1wb3J0IGFkZEZvdXJUb1BhZ2UgZnJvbSBcIi4vYWRkRm91clwiXG5cbi8vIGZvcmVjYXN0IHdlYXRoZXJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJGb3VyRGF5cyhjaXR5KSB7XG4gICAgLy8gcmVtb3ZlIGV4aXN0aW5nIGRhdGEgaWYgc2Vjb25kIHNlYXJjaCBcbiAgICBjbGVhcihcImZvcmVjYXN0XCIpO1xuICAgIC8vIGdldCBjaXR5IGxvbmcgYW5kIGxhdCBkZXRhaWxzXG4gICAgY29uc3QgY2l0eVJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZ2VvLzEuMC9kaXJlY3Q/cT0ke2NpdHl9JmxpbWl0PTEmYXBwaWQ9OGIwNWFkZmY3YTQzZDQ3OWZhZjBmYjExYmIzNWEyZDhgXG4gICAgKTtcbiAgICBjb25zdCBjaXR5RGF0YSA9IGF3YWl0IGNpdHlSZXNwb25zZS5qc29uKCk7XG4gICAgLy8gcGFzcyBsb25nIGFuZCBsYXQgaW50byBzZWNvbmQgQVBJXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9sYXQ9JHtjaXR5RGF0YVswXS5sYXR9Jmxvbj0ke2NpdHlEYXRhWzBdLmxvbn0mYXBwaWQ9OGIwNWFkZmY3YTQzZDQ3OWZhZjBmYjExYmIzNWEyZDgmdW5pdHM9bWV0cmljYFxuICAgICk7XG4gICAgLy8gY29udmVydCB0byBKU09OXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgIC8vIGVtcHR5IGFycmF5cyB0byBsYXRlciBiZSBmaWxsZWRcbiAgICBjb25zdCBzZXBlcmF0ZSA9IFtdO1xuICAgIGxldCBuZXh0ID0gW107XG4gICAgbGV0IGl0ZW0gPSAwO1xuXG4gICAgLy8gc3BsaXRzIHRoZSB3aG9sZSBhcnJheSBpbnRvIGRheXNcbiAgICBmb3IgKGl0ZW07IGl0ZW0gPCBkYXRhLmxpc3QubGVuZ3RoOyBpdGVtICs9IDEpIHtcbiAgICAgICAgXG4gICAgICAgIC8vIG5ldyBkYXRlIGFuZCB0b2RheXNcbiAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkYXRhLmxpc3RbaXRlbV0uZHRfdHh0KTtcbiAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgXG4gICAgICAvLyBjaGVjayBpZiB0b2RheVxuICAgICAgaWYgKHRvZGF5LnRvRGF0ZVN0cmluZygpID09PSBkYXRlLnRvRGF0ZVN0cmluZygpKSB7XG4gICAgICAgIC8vIGVtcHR5IGFycmF5XG4gICAgICAgIGNvbnN0IGZpcnN0ID0gW107XG4gICAgICAgIC8vIGNoZWNrIHVudGlsIHRoZSBuZXh0IGRheSBkb2VzIG5vdCBlcXVhbCB0b2RheVxuICAgICAgICAvLyBhZGQgaXQgdG8gdGhlIGFycmF5IGFuZCBwdXNoIHRvIHRoZSBzZXBlcmF0ZSBhcnJheVxuICAgICAgICBpZiAoXG4gICAgICAgICAgdG9kYXkudG9EYXRlU3RyaW5nKCkgIT09XG4gICAgICAgICAgbmV3IERhdGUoZGF0YS5saXN0W2l0ZW0gKyAxXS5kdF90eHQpLnRvRGF0ZVN0cmluZygpXG4gICAgICAgICkge1xuICAgICAgICAgIGZpcnN0LnB1c2goZGF0YS5saXN0LnNsaWNlKDAsIGl0ZW0gKyAxKSk7XG4gICAgICAgICAgc2VwZXJhdGUucHVzaChmaXJzdCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgbm90IHRvZGF5IGFuZCBtb3JlIHRoYW4gOCBpdGVtcyBpbiB0aGUgYXJyYXkgbGVmdFxuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgISh0b2RheS50b0RhdGVTdHJpbmcoKSA9PT0gZGF0ZS50b0RhdGVTdHJpbmcoKSkgJiZcbiAgICAgICAgZGF0YS5saXN0Lmxlbmd0aCA+IGl0ZW0gKyA4XG4gICAgICApIHtcbiAgICAgICAgLy8gcHVzaCB0aGUgbmV4dCA4IGhvdXIgc2xvdHMgaW50byBuZXh0IHRoZW4gYWRkIHRvIHNlcGVyYXRlIGluIGl0J3Mgb3duIGFycmF5XG4gICAgICAgIG5leHQucHVzaChkYXRhLmxpc3Quc2xpY2UoW2l0ZW1dLCBpdGVtICsgOCkpO1xuICAgICAgICBpdGVtICs9IDc7XG4gICAgICAgIHNlcGVyYXRlLnB1c2gobmV4dCk7XG4gICAgICAgIG5leHQgPSBbXTtcbiAgICAgICAgLy8gaWYgdGhlIGxhc3QgZGF5IGFkZCB0byBuZXh0IHRoZW4gdG8gc2VwZXJhdGVcbiAgICAgIH0gZWxzZSBpZiAoZGF0YS5saXN0Lmxlbmd0aCA8IGl0ZW0gKyA4KSB7XG4gICAgICAgIG5leHQucHVzaChkYXRhLmxpc3Quc2xpY2UoW2l0ZW1dKSk7XG4gICAgICAgIGl0ZW0gPSBkYXRhLmxpc3QubGVuZ3RoO1xuICAgICAgICBzZXBlcmF0ZS5wdXNoKG5leHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHBhc3MgbmV3IGFycmF5IGludG8gdGhpcyBmdW5jdGlvblxuICAgIC8vIHRvIGJlIGFkZGVkIHRvIHBhZ2VcbiAgICBhZGRGb3VyVG9QYWdlKHNlcGVyYXRlKVxuICB9IiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuLy8gY2xlYXIgb3V0IGV4aXN0aW5nIHBhZ2VcbmV4cG9ydCBmdW5jdGlvbiBjbGVhcihpbnB1dCkge1xuICAgIGNvbnN0IHdoZXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7aW5wdXR9YCk7XG4gICAgd2hpbGUgKHdoZXJlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHdoZXJlLnJlbW92ZUNoaWxkKHdoZXJlLmxhc3RDaGlsZCk7XG4gICAgfVxuICB9XG5cbi8vIGFkZCB0b2RheSdzIGZvcmVjYXN0IHRvIHBhZ2VcbmV4cG9ydCBmdW5jdGlvbiBhZGR0byh3aGVyZSwgaW5mbykge1xuICAgIGNsZWFyKHdoZXJlKTtcbiAgICAvLyBjaGVjayBmb3IgaW1hZ2UgZWxzZSBqdXN0IGFkZCB0byBjb3JyZWN0IGRpdlxuICAgIGlmICh3aGVyZSA9PT0gXCJpY29uXCIpIHtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICBpbWFnZS5jbGFzc05hbWUgPSBcImljb25pbWdcIjtcbiAgICAgICAgaW1hZ2UuYWx0ID0gXCJUb2RheSdzIHdlYXRoZXIgaWNvblwiO1xuICAgICAgICBpbWFnZS5zcmMgPSBgaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvdy8ke2luZm99LnBuZ2A7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaWNvblwiKS5hcHBlbmQoaW1hZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgcC5jbGFzc05hbWUgPSBgJHt3aGVyZX1Xcml0dGluZ2A7XG4gICAgICAgIHAudGV4dENvbnRlbnQgPSBpbmZvO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt3aGVyZX1gKS5hcHBlbmQocCk7XG4gICAgfVxufSIsImltcG9ydCB7IGFkZHRvfSBmcm9tIFwiLi9mdW5jdGlvbnNcIlxuXG4vLyBnZXQgdG9kYXkncyB3ZWF0aGVyIGFzeW5jXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJUb2RheShjaXR5KSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eX0mQVBQSUQ9OGIwNWFkZmY3YTQzZDQ3OWZhZjBmYjExYmIzNWEyZDgmdW5pdHM9bWV0cmljYFxuICAgICk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgIC8vIGdldCBuZWVkZWQgaW5mb1xuICAgIGNvbnN0IGNsb3VkcyA9IGRhdGEuY2xvdWRzLmFsbDtcbiAgICBjb25zdCBmZWVscyA9IE1hdGgucm91bmQoZGF0YS5tYWluLmZlZWxzX2xpa2UpO1xuICAgIGNvbnN0IHsgaHVtaWRpdHkgfSA9IGRhdGEubWFpbjtcbiAgICBjb25zdCB3aW5kU3BlZWQgPSBkYXRhLndpbmQuc3BlZWQ7XG4gICAgY29uc3QgdGVtcCA9IE1hdGgucm91bmQoZGF0YS5tYWluLnRlbXApO1xuICAgIGNvbnN0IHN1bnJpc2VEYXRhID0gbmV3IERhdGUoZGF0YS5zeXMuc3VucmlzZSAqIDEwMDApO1xuICAgIGNvbnN0IHJpc2VIb3VycyA9IHN1bnJpc2VEYXRhLmdldEhvdXJzKCk7XG4gICAgY29uc3QgcmlzZU1pbnV0ZXMgPSBgMCR7c3VucmlzZURhdGEuZ2V0TWludXRlcygpfWA7XG4gICAgY29uc3Qgc3VucmlzZSA9IGAke3Jpc2VIb3Vyc306JHtyaXNlTWludXRlcy5zdWJzdHIoLTIpfWA7XG4gICAgY29uc3Qgc3Vuc2V0RGF0YSA9IG5ldyBEYXRlKGRhdGEuc3lzLnN1bnNldCAqIDEwMDApO1xuICAgIGNvbnN0IHNldEhvdXJzID0gc3Vuc2V0RGF0YS5nZXRIb3VycygpO1xuICAgIGNvbnN0IHNldE1pbnV0ZXMgPSBgMCR7c3Vuc2V0RGF0YS5nZXRNaW51dGVzKCl9YDtcbiAgICBjb25zdCBzdW5zZXQgPSBgJHtzZXRIb3Vyc306JHtzZXRNaW51dGVzLnN1YnN0cigtMil9YDtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRhdGEud2VhdGhlclswXS5tYWluO1xuICAgIGNvbnN0IHsgaWNvbiB9ID0gZGF0YS53ZWF0aGVyWzBdO1xuICAgIGNvbnN0IGxvY2F0aW9uID0gZGF0YS5uYW1lO1xuICAgIGNvbnN0IGRlZ3JlZSA9IFwiXFx1MDBCMFwiO1xuXG4gICAgLy8gYWRkIHRvIGEgbGlzdFxuICAgIGNvbnN0IGxpc3RvZmluZm8gPSBbXG4gICAgICBgQ2xvdWRpbmVzczogJHtjbG91ZHN9JWAsXG4gICAgICBgRmVlbHMgbGlrZTogJHtmZWVsc30ke2RlZ3JlZX1DYCxcbiAgICAgIGBIdW1pZGl0eTogJHtodW1pZGl0eX0lYCxcbiAgICAgIGBXaW5kIHNwZWVkOiAke3dpbmRTcGVlZH1gLFxuICAgICAgYCR7dGVtcH0ke2RlZ3JlZX1DYCxcbiAgICAgIGBTdW5yaXNlOiAke3N1bnJpc2V9YCxcbiAgICAgIGBTdW5zZXQ6ICR7c3Vuc2V0fWAsXG4gICAgICBgJHtkZXNjcmlwdGlvbn1gLFxuICAgICAgaWNvbixcbiAgICAgIGxvY2F0aW9uLFxuICAgIF07XG5cbiAgICAvLyBsaXN0IG9mIGRpdnMgaW4gSFRNTCBmaWxlXG4gICAgY29uc3QgbGlzdG9mbG9jYXRpb25zID0gW1xuICAgICAgXCJjbG91ZHNcIixcbiAgICAgIFwiZmVlbHNcIixcbiAgICAgIFwiaHVtaWRpdHlcIixcbiAgICAgIFwid2luZFNwZWVkXCIsXG4gICAgICBcInRlbXBcIixcbiAgICAgIFwic3VucmlzZVwiLFxuICAgICAgXCJzdW5zZXRcIixcbiAgICAgIFwiZGVzY3JpcHRpb25cIixcbiAgICAgIFwiaWNvblwiLFxuICAgICAgXCJjaXR5XCIsXG4gICAgXTtcblxuICAgIC8vIGxvb3Agb3ZlciBhbmQgYWRkIHRvIGNvcnJlY3QgcGxhY2VcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXgsIGd1YXJkLWZvci1pblxuICAgIGZvciAoY29uc3QgaXRlbSBpbiBsaXN0b2ZpbmZvKSB7XG4gICAgICBhZGR0byhsaXN0b2Zsb2NhdGlvbnNbaXRlbV0sIGxpc3RvZmluZm9baXRlbV0pO1xuICAgIH1cbiAgfSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi0xMDAud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi0xMDAud29mZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTEwMGl0YWxpYy53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTEwMGl0YWxpYy53b2ZmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzRfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tMzAwLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzVfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tMzAwLndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNl9fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi0zMDBpdGFsaWMud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfN19fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi0zMDBpdGFsaWMud29mZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF84X19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTQwMC53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF85X19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTQwMC53b2ZmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzEwX19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTQwMGl0YWxpYy53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xMV9fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi00MDBpdGFsaWMud29mZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xMl9fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi01MDAud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTNfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tNTAwLndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTRfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tNTAwaXRhbGljLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzE1X19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTUwMGl0YWxpYy53b2ZmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzE2X19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTcwMC53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xN19fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi03MDAud29mZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xOF9fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi03MDBpdGFsaWMud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMTlfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tNzAwaXRhbGljLndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMjBfX18gPSBuZXcgVVJMKFwiLi9maWxlcy9yb2JvdG8tbGF0aW4tOTAwLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzIxX19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTkwMC53b2ZmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzIyX19fID0gbmV3IFVSTChcIi4vZmlsZXMvcm9ib3RvLWxhdGluLTkwMGl0YWxpYy53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yM19fXyA9IG5ldyBVUkwoXCIuL2ZpbGVzL3JvYm90by1sYXRpbi05MDBpdGFsaWMud29mZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF80X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzVfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzZfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF82X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF83X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfN19fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfOF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzhfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzlfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF85X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzEwX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzExX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xMl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzEyX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xM19fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzEzX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xNF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzE0X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xNV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzE1X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xNl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzE2X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xN19fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzE3X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xOF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzE4X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xOV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzE5X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzIwX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzIxX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yMl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzIyX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yM19fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzIzX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIHJvYm90by0xMDBub3JtYWwgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDEwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBUaGluICcpLFxcbiAgICBsb2NhbCgnUm9ib3RvLVRoaW4nKSxcXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fICsgXCIpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTEwMGl0YWxpYyAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogMTAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIFRoaW4gaXRhbGljJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tVGhpbml0YWxpYycpLFxcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fICsgXCIpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gKyBcIikgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tMzAwbm9ybWFsIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gTGlnaHQgJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tTGlnaHQnKSxcXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNF9fXyArIFwiKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF81X19fICsgXCIpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTMwMGl0YWxpYyAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIExpZ2h0IGl0YWxpYycpLFxcbiAgICBsb2NhbCgnUm9ib3RvLUxpZ2h0aXRhbGljJyksXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzZfX18gKyBcIikgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfN19fXyArIFwiKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by00MDBub3JtYWwgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBSZWd1bGFyICcpLFxcbiAgICBsb2NhbCgnUm9ib3RvLVJlZ3VsYXInKSxcXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfOF9fXyArIFwiKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF85X19fICsgXCIpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTQwMGl0YWxpYyAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIFJlZ3VsYXIgaXRhbGljJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tUmVndWxhcml0YWxpYycpLFxcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xMF9fXyArIFwiKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xMV9fXyArIFwiKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by01MDBub3JtYWwgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBNZWRpdW0gJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tTWVkaXVtJyksXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzEyX19fICsgXCIpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzEzX19fICsgXCIpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTUwMGl0YWxpYyAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIE1lZGl1bSBpdGFsaWMnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1NZWRpdW1pdGFsaWMnKSxcXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTRfX18gKyBcIikgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMTVfX18gKyBcIikgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tNzAwbm9ybWFsIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gQm9sZCAnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1Cb2xkJyksXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE2X19fICsgXCIpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzE3X19fICsgXCIpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTcwMGl0YWxpYyAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIEJvbGQgaXRhbGljJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tQm9sZGl0YWxpYycpLFxcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xOF9fXyArIFwiKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xOV9fXyArIFwiKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by05MDBub3JtYWwgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBCbGFjayAnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1CbGFjaycpLFxcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yMF9fXyArIFwiKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yMV9fXyArIFwiKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by05MDBpdGFsaWMgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBCbGFjayBpdGFsaWMnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1CbGFja2l0YWxpYycpLFxcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yMl9fXyArIFwiKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yM19fXyArIFwiKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL25vZGVfbW9kdWxlcy90eXBlZmFjZS1yb2JvdG8vaW5kZXguY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLDZCQUE2QjtBQUM3QjtFQUNFLHFCQUFxQjtFQUNyQixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQjs7OzswREFJcUQsRUFBRSxvQkFBb0I7QUFDN0U7O0FBRUEsNkJBQTZCO0FBQzdCO0VBQ0UscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCOzs7OzBEQUkyRCxFQUFFLG9CQUFvQjtBQUNuRjs7QUFFQSw2QkFBNkI7QUFDN0I7RUFDRSxxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEI7Ozs7MERBSXFELEVBQUUsb0JBQW9CO0FBQzdFOztBQUVBLDZCQUE2QjtBQUM3QjtFQUNFLHFCQUFxQjtFQUNyQixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQjs7OzswREFJMkQsRUFBRSxvQkFBb0I7QUFDbkY7O0FBRUEsNkJBQTZCO0FBQzdCO0VBQ0UscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCOzs7OzBEQUlxRCxFQUFFLG9CQUFvQjtBQUM3RTs7QUFFQSw2QkFBNkI7QUFDN0I7RUFDRSxxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEI7Ozs7MkRBSTJELEVBQUUsb0JBQW9CO0FBQ25GOztBQUVBLDZCQUE2QjtBQUM3QjtFQUNFLHFCQUFxQjtFQUNyQixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQjs7OzsyREFJcUQsRUFBRSxvQkFBb0I7QUFDN0U7O0FBRUEsNkJBQTZCO0FBQzdCO0VBQ0UscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCOzs7OzJEQUkyRCxFQUFFLG9CQUFvQjtBQUNuRjs7QUFFQSw2QkFBNkI7QUFDN0I7RUFDRSxxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEI7Ozs7MkRBSXFELEVBQUUsb0JBQW9CO0FBQzdFOztBQUVBLDZCQUE2QjtBQUM3QjtFQUNFLHFCQUFxQjtFQUNyQixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQjs7OzsyREFJMkQsRUFBRSxvQkFBb0I7QUFDbkY7O0FBRUEsNkJBQTZCO0FBQzdCO0VBQ0UscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCOzs7OzJEQUlxRCxFQUFFLG9CQUFvQjtBQUM3RTs7QUFFQSw2QkFBNkI7QUFDN0I7RUFDRSxxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEI7Ozs7MkRBSTJELEVBQUUsb0JBQW9CO0FBQ25GXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIHJvYm90by0xMDBub3JtYWwgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDEwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBUaGluICcpLFxcbiAgICBsb2NhbCgnUm9ib3RvLVRoaW4nKSxcXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi0xMDAud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTEwMC53b2ZmJykgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tMTAwaXRhbGljIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiAxMDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gVGhpbiBpdGFsaWMnKSxcXG4gICAgbG9jYWwoJ1JvYm90by1UaGluaXRhbGljJyksXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tMTAwaXRhbGljLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi0xMDBpdGFsaWMud29mZicpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTMwMG5vcm1hbCAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIExpZ2h0ICcpLFxcbiAgICBsb2NhbCgnUm9ib3RvLUxpZ2h0JyksXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tMzAwLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi0zMDAud29mZicpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTMwMGl0YWxpYyAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIExpZ2h0IGl0YWxpYycpLFxcbiAgICBsb2NhbCgnUm9ib3RvLUxpZ2h0aXRhbGljJyksXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tMzAwaXRhbGljLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi0zMDBpdGFsaWMud29mZicpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTQwMG5vcm1hbCAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIFJlZ3VsYXIgJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tUmVndWxhcicpLFxcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTQwMC53b2ZmMicpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tNDAwLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by00MDBpdGFsaWMgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBSZWd1bGFyIGl0YWxpYycpLFxcbiAgICBsb2NhbCgnUm9ib3RvLVJlZ3VsYXJpdGFsaWMnKSxcXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi00MDBpdGFsaWMud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTQwMGl0YWxpYy53b2ZmJykgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tNTAwbm9ybWFsIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gTWVkaXVtICcpLFxcbiAgICBsb2NhbCgnUm9ib3RvLU1lZGl1bScpLFxcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTUwMC53b2ZmMicpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tNTAwLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by01MDBpdGFsaWMgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBNZWRpdW0gaXRhbGljJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tTWVkaXVtaXRhbGljJyksXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tNTAwaXRhbGljLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLCAvKiBTdXBlciBNb2Rlcm4gQnJvd3NlcnMgKi9cXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi01MDBpdGFsaWMud29mZicpIGZvcm1hdCgnd29mZicpOyAvKiBNb2Rlcm4gQnJvd3NlcnMgKi9cXG59XFxuXFxuLyogcm9ib3RvLTcwMG5vcm1hbCAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgc3JjOlxcbiAgICBsb2NhbCgnUm9ib3RvIEJvbGQgJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tQm9sZCcpLFxcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTcwMC53b2ZmMicpIGZvcm1hdCgnd29mZjInKSwgLyogU3VwZXIgTW9kZXJuIEJyb3dzZXJzICovXFxuICAgIHVybCgnLi9maWxlcy9yb2JvdG8tbGF0aW4tNzAwLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTsgLyogTW9kZXJuIEJyb3dzZXJzICovXFxufVxcblxcbi8qIHJvYm90by03MDBpdGFsaWMgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIHNyYzpcXG4gICAgbG9jYWwoJ1JvYm90byBCb2xkIGl0YWxpYycpLFxcbiAgICBsb2NhbCgnUm9ib3RvLUJvbGRpdGFsaWMnKSxcXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi03MDBpdGFsaWMud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTcwMGl0YWxpYy53b2ZmJykgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tOTAwbm9ybWFsIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gQmxhY2sgJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tQmxhY2snKSxcXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi05MDAud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTkwMC53b2ZmJykgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG4vKiByb2JvdG8tOTAwaXRhbGljIC0gbGF0aW4gKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XFxuICBzcmM6XFxuICAgIGxvY2FsKCdSb2JvdG8gQmxhY2sgaXRhbGljJyksXFxuICAgIGxvY2FsKCdSb2JvdG8tQmxhY2tpdGFsaWMnKSxcXG4gICAgdXJsKCcuL2ZpbGVzL3JvYm90by1sYXRpbi05MDBpdGFsaWMud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksIC8qIFN1cGVyIE1vZGVybiBCcm93c2VycyAqL1xcbiAgICB1cmwoJy4vZmlsZXMvcm9ib3RvLWxhdGluLTkwMGl0YWxpYy53b2ZmJykgZm9ybWF0KCd3b2ZmJyk7IC8qIE1vZGVybiBCcm93c2VycyAqL1xcbn1cXG5cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcImJhY2tncm91bmQuanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKiB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG9cXFwiLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQ6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIik7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1hdHRhY2htZW50OiBmaXhlZDtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICBvdmVyZmxvdzogYXV0bztcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDc3LjVweCA1MHB4IDFmcjtcXG59XFxuXFxuaDEge1xcbiAgcGFkZGluZzogMjBweDtcXG4gIHBhZGRpbmctbGVmdDogMHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiAycmVtO1xcbiAgY29sb3I6ICM5MThkOGQ7XFxufVxcbi5jb250ZW50IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICB3aWR0aDogMTAwdnc7XFxuICBtaW4taGVpZ2h0OiAxMDAlO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxNTBweCA4MHB4O1xcbn1cXG5cXG4vKiBtYWluICovXFxuLmxlZnQge1xcbiAgZ3JpZC1jb2x1bW4tc3RhcnQ6IDE7XFxuICBncmlkLWNvbHVtbi1lbmQ6IDI7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLnJpZ2h0IHtcXG4gIGdyaWQtY29sdW1uLXN0YXJ0OiAyO1xcbiAgZ3JpZC1jb2x1bW4tZW5kOiA0O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5ib3R0b20ge1xcbiAgZ3JpZC1jb2x1bW4tc3RhcnQ6IDE7XFxuICBncmlkLWNvbHVtbi1lbmQ6IDQ7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgZ2FwOiAyMHB4O1xcbiAgbWFyZ2luOiAxMHB4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbn1cXG5cXG4uYm90dG9tIHAge1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgZm9udC13ZWlnaHQ6IDIwMDtcXG59XFxuXFxuLyogZm9ybSAqL1xcbmZvcm0ge1xcbiAgZ3JpZC1jb2x1bW4tc3RhcnQ6IDE7XFxuICBncmlkLWNvbHVtbi1lbmQ6IDQ7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWFyZ2luLXRvcDogMTVweDtcXG4gIGdhcDogNXB4O1xcbn1cXG5cXG5pbnB1dCB7XFxuICB3aWR0aDogMjAwcHg7XFxuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XFxuICBoZWlnaHQ6IDI1LjVweDtcXG59XFxuXFxuYnV0dG9uIHtcXG4gIHBhZGRpbmc6IDVweCAxMHB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxufVxcblxcbi8qIGl0ZW1zIGZyb20gZGFpbHkgKi9cXG5cXG4udGVtcFdyaXR0aW5nIHtcXG4gIGZvbnQtc2l6ZTogM3JlbTtcXG4gIGhlaWdodDogNzBweDtcXG59XFxuXFxuLmNpdHlXcml0dGluZyB7XFxuICBmb250LXNpemU6IDJyZW07XFxuICBmb250LXdlaWdodDogMjAwO1xcbn1cXG4uaWNvbiB7XFxuICBoZWlnaHQ6IDYwcHg7XFxufVxcbi5pY29uaW1nIHtcXG4gIGhlaWdodDogNzVweDtcXG59XFxuXFxuLyogZm9yZWNhc3QgYm94ICovXFxuXFxuLmZvcmVjYXN0IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg2LCAzNTBweCk7XFxuICBvdmVyZmxvdzogYXV0bztcXG4gIG1hcmdpbjogMTBweDtcXG4gIGdyaWQtY29sdW1uLXN0YXJ0OiAxO1xcbiAgZ3JpZC1jb2x1bW4tZW5kOiA0O1xcbiAgZ2FwOiAxMHB4O1xcbiAgcGFkZGluZy1ib3R0b206IDIwcHg7XFxufVxcbi5mb3JlY2FzdEJveCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNCwgMWZyKTtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuLmZvcmVjYXN0Qm94IGRpdiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4udG9kYXlCb3gge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgYm9yZGVyOiBzb2xpZCB3aGl0ZSAzcHg7XFxuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XFxuICBib3gtc2hhZG93OiA1cHggNXB4IDVweCBncmV5O1xcbiAgaGVpZ2h0OiBtaW4tY29udGVudDtcXG4gIHBhZGRpbmc6IDVweDtcXG59XFxuLnRvZGF5Qm94ID4gcCB7XFxuICBtYXJnaW46IDEwcHg7XFxuICBmb250LXNpemU6IDEuM3JlbTtcXG59XFxuXFxuLnRvZGF5Qm94IC5mb3JlY2FzdEJveDpudGgtY2hpbGQob2RkKSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmNDA7XFxufVxcblxcbi8qIE5BViAqL1xcbm5hdiB7XFxuICBoZWlnaHQ6IG1pbi1jb250ZW50O1xcbn1cXG5cXG4ubmF2Y29ybmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIGhlaWdodDogbWluLWNvbnRlbnQ7XFxuICB3aWR0aDogNTAlO1xcbiAgYm9yZGVyLXJhZGl1czogMCUgNXJlbSA1cmVtIDAlO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsU0FBUztFQUNULFVBQVU7RUFDVixpQ0FBaUM7QUFDbkM7O0FBRUE7RUFDRSxtREFBaUM7RUFDakMsMkJBQTJCO0VBQzNCLDRCQUE0QjtFQUM1Qiw0QkFBNEI7RUFDNUIsc0JBQXNCO0VBQ3RCLGNBQWM7RUFDZCxhQUFhO0VBQ2IsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLGNBQWM7QUFDaEI7QUFDQTtFQUNFLGFBQWE7RUFDYixZQUFZO0VBQ1osZ0JBQWdCO0VBQ2hCLDhCQUE4QjtFQUM5Qiw4QkFBOEI7QUFDaEM7O0FBRUEsU0FBUztBQUNUO0VBQ0Usb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLDJCQUEyQjtFQUMzQixTQUFTO0VBQ1QsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixnQkFBZ0I7QUFDbEI7O0FBRUEsU0FBUztBQUNUO0VBQ0Usb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixnQkFBZ0I7RUFDaEIsUUFBUTtBQUNWOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1oscUJBQXFCO0VBQ3JCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsWUFBWTtFQUNaLHFCQUFxQjtFQUNyQix1QkFBdUI7QUFDekI7O0FBRUEscUJBQXFCOztBQUVyQjtFQUNFLGVBQWU7RUFDZixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsZ0JBQWdCO0FBQ2xCO0FBQ0E7RUFDRSxZQUFZO0FBQ2Q7QUFDQTtFQUNFLFlBQVk7QUFDZDs7QUFFQSxpQkFBaUI7O0FBRWpCO0VBQ0UsYUFBYTtFQUNiLHVDQUF1QztFQUN2QyxjQUFjO0VBQ2QsWUFBWTtFQUNaLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsU0FBUztFQUNULG9CQUFvQjtBQUN0QjtBQUNBO0VBQ0UsYUFBYTtFQUNiLHFDQUFxQztFQUNyQyxtQkFBbUI7RUFDbkIsdUJBQXVCO0FBQ3pCO0FBQ0E7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQix1QkFBdUI7RUFDdkIscUJBQXFCO0VBQ3JCLDRCQUE0QjtFQUM1QixtQkFBbUI7RUFDbkIsWUFBWTtBQUNkO0FBQ0E7RUFDRSxZQUFZO0VBQ1osaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsMkJBQTJCO0FBQzdCOztBQUVBLFFBQVE7QUFDUjtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsVUFBVTtFQUNWLDhCQUE4QjtBQUNoQ1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90b1xcXCIsIHNhbnMtc2VyaWY7XFxufVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZDogdXJsKFxcXCJiYWNrZ3JvdW5kLmpwZ1xcXCIpO1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJhY2tncm91bmQtYXR0YWNobWVudDogZml4ZWQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiA3Ny41cHggNTBweCAxZnI7XFxufVxcblxcbmgxIHtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBwYWRkaW5nLWxlZnQ6IDBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG4gIGNvbG9yOiAjOTE4ZDhkO1xcbn1cXG4uY29udGVudCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgbWluLWhlaWdodDogMTAwJTtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMTUwcHggODBweDtcXG59XFxuXFxuLyogbWFpbiAqL1xcbi5sZWZ0IHtcXG4gIGdyaWQtY29sdW1uLXN0YXJ0OiAxO1xcbiAgZ3JpZC1jb2x1bW4tZW5kOiAyO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5yaWdodCB7XFxuICBncmlkLWNvbHVtbi1zdGFydDogMjtcXG4gIGdyaWQtY29sdW1uLWVuZDogNDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uYm90dG9tIHtcXG4gIGdyaWQtY29sdW1uLXN0YXJ0OiAxO1xcbiAgZ3JpZC1jb2x1bW4tZW5kOiA0O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIGdhcDogMjBweDtcXG4gIG1hcmdpbjogMTBweDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBvdmVyZmxvdzogYXV0bztcXG59XFxuXFxuLmJvdHRvbSBwIHtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIGZvbnQtd2VpZ2h0OiAyMDA7XFxufVxcblxcbi8qIGZvcm0gKi9cXG5mb3JtIHtcXG4gIGdyaWQtY29sdW1uLXN0YXJ0OiAxO1xcbiAgZ3JpZC1jb2x1bW4tZW5kOiA0O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1hcmdpbi10b3A6IDE1cHg7XFxuICBnYXA6IDVweDtcXG59XFxuXFxuaW5wdXQge1xcbiAgd2lkdGg6IDIwMHB4O1xcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xcbiAgaGVpZ2h0OiAyNS41cHg7XFxufVxcblxcbmJ1dHRvbiB7XFxuICBwYWRkaW5nOiA1cHggMTBweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbn1cXG5cXG4vKiBpdGVtcyBmcm9tIGRhaWx5ICovXFxuXFxuLnRlbXBXcml0dGluZyB7XFxuICBmb250LXNpemU6IDNyZW07XFxuICBoZWlnaHQ6IDcwcHg7XFxufVxcblxcbi5jaXR5V3JpdHRpbmcge1xcbiAgZm9udC1zaXplOiAycmVtO1xcbiAgZm9udC13ZWlnaHQ6IDIwMDtcXG59XFxuLmljb24ge1xcbiAgaGVpZ2h0OiA2MHB4O1xcbn1cXG4uaWNvbmltZyB7XFxuICBoZWlnaHQ6IDc1cHg7XFxufVxcblxcbi8qIGZvcmVjYXN0IGJveCAqL1xcblxcbi5mb3JlY2FzdCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNiwgMzUwcHgpO1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBtYXJnaW46IDEwcHg7XFxuICBncmlkLWNvbHVtbi1zdGFydDogMTtcXG4gIGdyaWQtY29sdW1uLWVuZDogNDtcXG4gIGdhcDogMTBweDtcXG4gIHBhZGRpbmctYm90dG9tOiAyMHB4O1xcbn1cXG4uZm9yZWNhc3RCb3gge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDQsIDFmcik7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcbi5mb3JlY2FzdEJveCBkaXYge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLnRvZGF5Qm94IHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGJvcmRlcjogc29saWQgd2hpdGUgM3B4O1xcbiAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xcbiAgYm94LXNoYWRvdzogNXB4IDVweCA1cHggZ3JleTtcXG4gIGhlaWdodDogbWluLWNvbnRlbnQ7XFxuICBwYWRkaW5nOiA1cHg7XFxufVxcbi50b2RheUJveCA+IHAge1xcbiAgbWFyZ2luOiAxMHB4O1xcbiAgZm9udC1zaXplOiAxLjNyZW07XFxufVxcblxcbi50b2RheUJveCAuZm9yZWNhc3RCb3g6bnRoLWNoaWxkKG9kZCkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjQwO1xcbn1cXG5cXG4vKiBOQVYgKi9cXG5uYXYge1xcbiAgaGVpZ2h0OiBtaW4tY29udGVudDtcXG59XFxuXFxuLm5hdmNvcm5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBoZWlnaHQ6IG1pbi1jb250ZW50O1xcbiAgd2lkdGg6IDUwJTtcXG4gIGJvcmRlci1yYWRpdXM6IDAlIDVyZW0gNXJlbSAwJTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiLyogZXNsaW50LWRpc2FibGUgZ3VhcmQtZm9yLWluICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuXG5pbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuaW1wb3J0IFwidHlwZWZhY2Utcm9ib3RvXCI7XG5pbXBvcnQgZ2V0V2VhdGhlclRvZGF5IGZyb20gXCIuL3RvZGF5V2VhdGhlclwiXG5pbXBvcnQgZ2V0V2VhdGhlckZvdXJEYXlzIGZyb20gXCIuL2ZvdXJXZWF0aGVyXCJcblxuLy8gaW1wb3J0IEljb24gZnJvbSAnLi9pY29uLnBuZyc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcblxuICAvLyBnZXQgZm9ybSBhbmQgYWRkIGV2ZW50IGxpc3RlbmVyXG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKTtcblxuICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2ZW50KSA9PiB7XG4gICAgLy8gc3RvcCBmdWxsIHN1Ym1pdFxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAvLyBwYXNzIHRocm91Z2ggdG8gZ2V0IHRvZGF5J3Mgd2VhdGhlclxuICAgIGdldFdlYXRoZXJUb2RheShmb3JtLmNpdHkudmFsdWUpLmNhdGNoKCgpID0+IHtcbiAgICAgIGZvcm0uY2l0eS5zZXRDdXN0b21WYWxpZGl0eShcIkNpdHkgbm90IGZvdW5kXCIpO1xuICAgICAgZm9ybS5jaXR5LnJlcG9ydFZhbGlkaXR5KCk7XG4gICAgfSk7XG4gICAgXG4gICAgZ2V0V2VhdGhlckZvdXJEYXlzKGZvcm0uY2l0eS52YWx1ZSk7XG4gICAgLy8gLmNhdGNoKCgpID0+IHtcbiAgICAvLyAgICAgZm9ybS5jaXR5LnNldEN1c3RvbVZhbGlkaXR5KCdDaXR5IG5vdCBmb3VuZCcpXG4gICAgLy8gICAgIGZvcm0uY2l0eS5yZXBvcnRWYWxpZGl0eSgpXG4gICAgLy8gfSlcbiAgfSk7XG5cbiAgLy8gYWxsb3cgdXNlciB0byBjaGFuZ2UgaW5wdXQgdG8gdmFsaWQgY2l0eSxcbiAgLy8gYWZ0ZXIgYmFkIHJlc3BvbnNlLlxuICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoKSA9PiB7XG4gICAgZm9ybS5jaXR5LnNldEN1c3RvbVZhbGlkaXR5KFwiXCIpO1xuICAgIGZvcm0uY2l0eS5yZXBvcnRWYWxpZGl0eSgpO1xuICB9KTtcbn0pO1xuIl0sIm5hbWVzIjpbImFkZEZvdXJUb1BhZ2UiLCJzZXBlcmF0ZSIsImNvdW50ZXIiLCJkYXkiLCJkYXRlIiwiRGF0ZSIsImR0X3R4dCIsInRvZGF5IiwidG9kYXlCb3giLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJzZXRBdHRyaWJ1dGUiLCJwIiwidGV4dENvbnRlbnQiLCJ0b0RhdGVTdHJpbmciLCJ0b0xvY2FsZVN0cmluZyIsIndlZWtkYXkiLCJhcHBlbmQiLCJxdWVyeVNlbGVjdG9yIiwidGhpc0RheSIsImhvdXIiLCJkZWdyZWUiLCJob3VycyIsImdldEhvdXJzIiwidG9TdHJpbmciLCJsZW5ndGgiLCJpY29uIiwid2VhdGhlciIsInRlbXAiLCJNYXRoIiwicm91bmQiLCJtYWluIiwicmFpbiIsInBvcCIsImxpc3RvZmluZm8iLCJib3giLCJnZXRFbGVtZW50QnlJZCIsIml0ZW0iLCJzbWFsbCIsImltYWdlIiwic3JjIiwiY2xlYXIiLCJnZXRXZWF0aGVyRm91ckRheXMiLCJjaXR5IiwiY2l0eVJlc3BvbnNlIiwiZmV0Y2giLCJjaXR5RGF0YSIsImpzb24iLCJyZXNwb25zZSIsImxhdCIsImxvbiIsImRhdGEiLCJuZXh0IiwibGlzdCIsImZpcnN0IiwicHVzaCIsInNsaWNlIiwiaW5wdXQiLCJ3aGVyZSIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImxhc3RDaGlsZCIsImFkZHRvIiwiaW5mbyIsImFsdCIsImdldFdlYXRoZXJUb2RheSIsImNsb3VkcyIsImFsbCIsImZlZWxzIiwiZmVlbHNfbGlrZSIsImh1bWlkaXR5Iiwid2luZFNwZWVkIiwid2luZCIsInNwZWVkIiwic3VucmlzZURhdGEiLCJzeXMiLCJzdW5yaXNlIiwicmlzZUhvdXJzIiwicmlzZU1pbnV0ZXMiLCJnZXRNaW51dGVzIiwic3Vic3RyIiwic3Vuc2V0RGF0YSIsInN1bnNldCIsInNldEhvdXJzIiwic2V0TWludXRlcyIsImRlc2NyaXB0aW9uIiwibG9jYXRpb24iLCJuYW1lIiwibGlzdG9mbG9jYXRpb25zIiwiYWRkRXZlbnRMaXN0ZW5lciIsImZvcm0iLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwidmFsdWUiLCJjYXRjaCIsInNldEN1c3RvbVZhbGlkaXR5IiwicmVwb3J0VmFsaWRpdHkiXSwic291cmNlUm9vdCI6IiJ9