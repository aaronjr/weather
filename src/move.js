// count which slide user is on
let counter = 0
const circles = document.querySelectorAll('.circle')

export default function move(d){

   if(d === 'right' && counter !== 5){
      // check fot not exceding and increase by one
        counter += 1
   } else if (d === 'left' && counter !== 0 ){
      // check fot not exceding and increase by one
        counter -= 1
   } else {
        // do nothing
   }
   // set all circles to white
    circles.forEach((circle) => {
        // eslint-disable-next-line no-param-reassign
        circle.style.backgroundColor = 'white';
    })

    // change the correct circle to black
    document.getElementById(`circle${counter}`).style.backgroundColor = 'black'

    // hide all boxes
    const boxes = document.querySelectorAll('.todayBox')
    boxes.forEach( (b) => {
         // eslint-disable-next-line no-param-reassign
        b.style.display = 'none'
    })

    // show correct box
    const box = document.getElementById(`day${counter}`)
    box.style.display = "flex"
}