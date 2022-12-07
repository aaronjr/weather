import moveBottom from "./moveBottom"
import todayInfo from "./todayInfo";
import emptyTop from "./emptyTop";

// get today's weather async
export default async function getWeatherToday(city) {
  // clear info ready for new info and avoid duplications
  emptyTop()
  // two fetch, one for C and one for F
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=8b05adff7a43d479faf0fb11bb35a2d8&units=metric`,{
        mode: 'cors'
      }
    );
    const responseF = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=8b05adff7a43d479faf0fb11bb35a2d8&units=imperial`,{
        mode: 'cors'
      }
    );
    const data = await response.json();
    const dataF = await responseF.json();

    todayInfo(data, 'C')
    todayInfo(dataF, 'F')
    
    // load moving container
    moveBottom()
  }