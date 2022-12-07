/* eslint-disable import/prefer-default-export */
// clear out existing page
export function clear(input) {
    const where = document.querySelector(`.${input}`);
    while (where.firstChild) {
      where.removeChild(where.lastChild);
    }
  }

// add today's forecast to page
export function addto(where, info, degree) {
    // check for image else just add to correct div
    if (where === "icon") {
        const image = document.createElement("img");
        image.className = `iconimg degreeOf${degree}`;
        image.alt = "Today's weather icon";
        image.src = `https://openweathermap.org/img/wn/${info}@2x.png`;
        image.style.display = degree === 'C' ? 'block' : 'none'
        document.querySelector(".icon").append(image);
    } else {
        const p = document.createElement("p");
        p.className = `${where}Writting degreeOf${degree}`;
        p.textContent = info;
        p.style.display = degree === 'C' ? 'block' : 'none'
        document.querySelector(`.${where}`).append(p);
    }
}