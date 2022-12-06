let counter = 0
const circles = document.querySelectorAll('.circle')

export default function move(d){

   if(d === 'right' && counter !== 5){
        // do something
        counter += 1
   } else if (d === 'left' && counter !== 0 ){
        // do something
        counter -= 1
   } else {
        // do nothing
   }

    circles.forEach((circle) => {
        // eslint-disable-next-line no-param-reassign
        circle.style.backgroundColor = 'white';
    })

    document.getElementById(`circle${counter}`).style.backgroundColor = 'var(--color-blue)'

    const boxes = document.querySelectorAll('.todayBox')
    boxes.forEach( (b) => {
         // eslint-disable-next-line no-param-reassign
        b.style.display = 'none'
    })

    const box = document.getElementById(`day${counter}`)
    box.style.display = "flex"
}