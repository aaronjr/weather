/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { clear } from "./functions"
import addFourToPage from "./addFour"

// forecast weather
export default async function getWeatherFourDays(city) {

    // remove existing data if second search 
    document.querySelector('.buttonHolder').style.display = 'flex'
    clear("view");
    document.getElementById(`circle0`).style.backgroundColor = 'black'
    // get city long and lat details
    const cityResponse = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=8b05adff7a43d479faf0fb11bb35a2d8`
    );
    const cityData = await cityResponse.json();
    // pass long and lat into second API
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${cityData[0].lat}&lon=${cityData[0].lon}&appid=8b05adff7a43d479faf0fb11bb35a2d8&units=metric`
    );
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
        if (
          today.toDateString() !==
          new Date(data.list[item + 1].dt_txt).toDateString()
        ) {
          first.push(data.list.slice(0, item + 1));
          seperate.push(first);
        }
        // if not today and more than 8 items in the array left
      } else if (
        !(today.toDateString() === date.toDateString()) &&
        data.list.length > item + 8
      ) {
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
    addFourToPage(seperate)
  }