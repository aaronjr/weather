/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

// Degree symbol
const degree = "\u00B0";

export default function addFourToPage(seperate, measure){
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
        p.textContent =
          today.toDateString() === date.toDateString()
            ? "Today"
            : date.toLocaleString("en-uk", { weekday: "long" });
        
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
          const hours =
            date.getHours().toString().length === 2
              ? `${date.getHours()}:00`
              : `0${date.getHours()}:00`;
          const { icon } = thisDay[hour].weather[0];
          const temp = measure === 'C' ? `${Math.round(thisDay[hour].main.temp)}${degree}C` :
          `${Math.round(thisDay[hour].main.temp)}${degree}F`;
  
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
              image.className = 'icons'
              small.append(image);
            }
            small.style.display = small.className === "smallDiv degreeOfC" ? 'block' : 'none'
            // add to page
            document.getElementById(`box${counter}`).append(small);
          }
          // increase counter for next box
          counter += 1;
        }
      }

}