// choice of measurment to display
let choice = ''

export default function switchUnit(){

    // Degree symbol
    const degree = "\u00B0";

    // get all required elements
    const degrees = document.querySelectorAll('.choice')
    const allC = document.querySelectorAll('.degreeOfC')
    const allF = document.querySelectorAll('.degreeOfF')

    
    // eslint-disable-next-line prefer-arrow-callback
    // loop through each choice
    degrees.forEach( (element) => {
        
        // eslint-disable-next-line prefer-arrow-callback
        // add event listener to each
        element.addEventListener('click',() => {
            // either hide one and show the other
            document.querySelector('.C').classList.toggle('hide')
            document.querySelector('.F').classList.toggle('hide')

            // set preference of C or F
            choice = element.textContent === `${degree}C` ? 'F' : 'C'
            
            // check for the choice and show / hide as neccesary
            if (choice === `C`){
                allF.forEach( item => {
                // eslint-disable-next-line no-param-reassign
                    item.style.display = 'none';
                })
                allC.forEach( item => {
                // eslint-disable-next-line no-param-reassign
                    item.style.display = 'block';
                })
            
            } else {
                allF.forEach( item => {
                // eslint-disable-next-line no-param-reassign
                    item.style.display = 'block';
                })
                allC.forEach( item => {
                // eslint-disable-next-line no-param-reassign
                    item.style.display = 'none';
                })
            }
        })
    })
}