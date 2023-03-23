import { addto} from "./functions";

let counter = 0
export default function todayInfo(data, symbol) {
    console.log("todayinfo")
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

    // change for F or C
    const displayTemp = symbol === 'C' ? `${temp}${degree}C` : `${temp}${degree}F`;
    const displayWind = symbol === 'C' ? `Wind speed: ${windSpeed} meter/sec` : `Wind speed: ${windSpeed} miles/hour`

    // add to a list
    const listofinfo = [
      `Cloudiness: ${clouds}%`,
      `Feels like: ${feels}${degree}C`,
      `Humidity: ${humidity}%`,
      displayWind,
      displayTemp,
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
      addto(listoflocations[item], listofinfo[item], symbol);
    }
  
  if (counter === 0) {
      document.querySelector(".top-section").className += " borders";
      document.querySelector(".forecast").className += " borders";
    document.querySelector(".bottom").className += " bottomBorderTop";
    counter +=1 
    }
}