 export default function moveBottom(){
    // get container
    const bottom = document.querySelector('.bottom')

    // reset to 0
    bottom.scrollLeft = 0;

    // move by 1 pixel
    const moveBar = setInterval(() => {
      bottom.scrollLeft += 1;
    }, 10)

    // stop after moving bar after 8000
    setInterval(() => {
      clearInterval(moveBar)
    }, 8000)

    // ontouch stop movement
    document.getElementById('search').addEventListener('click', () => {
      clearInterval(moveBar)
    })

    // on new search stop event so it can restart
    bottom.addEventListener('mouseover', () => {
      clearInterval(moveBar)
    })
}