/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { clear } from "./functions"
import addFourToPage from "./addFour"
import getDays from "./getDays";
import switchUnit from "./switchUnit";

// forecast weather
export default async function getWeatherFourDays(city) {

    // remove existing data if second search 
    document.querySelector('.buttonHolder').style.display = 'flex'

    // clear bottom section
    clear("view");

    // set all circles to be white
    const circles = document.querySelectorAll('.circle')
    circles.forEach(circle => {
      // eslint-disable-next-line no-param-reassign
      circle.style.backgroundColor = 'white'
    })

    // set first circle to active
    document.getElementById(`circle0`).style.backgroundColor = 'black'

    // get city long and lat details
    const cityResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=8b05adff7a43d479faf0fb11bb35a2d8`,{
        mode: 'cors'
      }
    );
    const cityData = await cityResponse.json();

    // pass long and lat into second API, one for metric one for imperial
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${cityData[0].lat}&lon=${cityData[0].lon}&appid=8b05adff7a43d479faf0fb11bb35a2d8&units=metric`,{
        mode: 'cors'
      }
    );
    const responseTwo = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${cityData[0].lat}&lon=${cityData[0].lon}&appid=8b05adff7a43d479faf0fb11bb35a2d8&units=imperial`,{
        mode: 'cors'
      }
    );

    // convert to JSON
    const data = await response.json();
    const dataTwo = await responseTwo.json();
    
    // seperate into each day
    const seperate = getDays(data)
    const seperateTwo = getDays(dataTwo)

    // pass seperated array into this function
    // to be added to page
    addFourToPage(seperate, 'C')
    addFourToPage(seperateTwo, 'F')
    
    // allow switch of measurements
    switchUnit()
  }