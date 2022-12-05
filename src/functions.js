/* eslint-disable import/prefer-default-export */
// clear out existing page
export function clear(input) {
    const where = document.querySelector(`.${input}`);
    while (where.firstChild) {
      where.removeChild(where.lastChild);
    }
  }

// add today's forecast to page
export function addto(where, info) {
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