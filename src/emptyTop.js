import { clear } from "./functions";

export default function emptyTop(){
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
      
      // clear each entry on new search
      listoflocations.forEach( (item) => {
          clear(item)
      })
}