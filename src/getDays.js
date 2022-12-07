export default function getDays(data){

   // empty arrays to later be filled
    const seperate = [];
    let next = [];
    let item = 0;

    const today = new Date();

    // splits the whole array into days
    for (item; item < data.list.length; item += 1) {
        
        // new date and todays
    const date = new Date(data.list[item].dt_txt);

    // check if today
    if (today.toDateString() === date.toDateString()) {
        // empty array
        const first = [];
        // check until the next day does not equal today
        // add it to the array and push to the seperate array
        if (
        today.toDateString() !==
        new Date(data.list[item + 1].dt_txt).toDateString()
        ) {
        first.push(data.list.slice(0, item + 1));
        seperate.push(first);
        }
        // if not today and more than 8 items in the array left
    } else if (
        !(today.toDateString() === date.toDateString()) &&
        data.list.length >= item + 8
    ) {
        // push the next 8 hour slots into next then add to seperate in it's own array
        next.push(data.list.slice([item], item + 8));
        item += 7;
        seperate.push(next);
        next = [];
        // if the last day add to next then to seperate
    } else if (data.list.length < item + 8) {
        next.push(data.list.slice([item]));
        item = data.list.length;
        seperate.push(next);
    }
    }

    // return new array
    return seperate
}