// 8b05adff7a43d479faf0fb11bb35a2d8
// https://api.openweathermap.org/data/2.5/weather?q=London&APPID=8b05adff7a43d479faf0fb11bb35a2d8
// unit=imperial -- for Fahrenheit.
// img.src = `http://openweathermap.org/img/w/${icon}.png`


document.addEventListener('DOMContentLoaded', () => {

    function addto(where, info){
        if(where == 'icon'){
            const image = document.createElement('img')
            image.className = 'iconimg'
            image.alt = "Today's weather icon"
            image.src = `http://openweathermap.org/img/w/${info}.png`
            document.querySelector('.icon').append(image)
        } else {
            const p = document.createElement('p')
            p.className = `${where}Writting`
            p.textContent = info
            document.querySelector(`.${where}`).append(p)
        }
    }

    async function getWeather(city){
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=8b05adff7a43d479faf0fb11bb35a2d8&units=metric`)
        const data = await response.json()
        console.log(data)

        const clouds = data.clouds.all
        const feels = Math.round(data.main.feels_like)
        const humidity = data.main.humidity
        const windSpeed = data.wind.speed

        const temp = Math.round(data.main.temp)

        const sunriseData = new Date(data.sys.sunrise * 1000)
        const riseHours = sunriseData.getHours();
        var riseMinutes = "0" + sunriseData.getMinutes();
        var sunrise = `${riseHours}:${riseMinutes.substr(-2)}`

        const sunsetData = new Date(data.sys.sunset * 1000)
        const setHours = sunsetData.getHours();
        var setMinutes = "0" + sunsetData.getMinutes();
        var sunset = `${setHours}:${setMinutes.substr(-2)}`

        const description = data.weather[0].description
        const icon = data.weather[0].icon

        const location = data.name

        const degree = '\u00B0'
        
        listofinfo = [
            `Cloudiness: ${clouds}%`, `Feels like: ${feels}${degree}C`, `Humidity: ${humidity}%`, `Wind speed: ${windSpeed}`, `${temp}${degree}C`, `Sunrise: ${sunrise}`, `Sunset: ${sunset}`, `${description}`, icon, location
        ]

        listoflocations = [
            'clouds', 'feels', 'humidity', 'windSpeed', 'temp', 'sunrise', 'sunset', 'description', 'icon', 'city'
        ]

        for(item in listofinfo){
            addto(listoflocations[item], listofinfo[item])
        }

    }
    const form = document.querySelector('form')
    form.addEventListener('submit', function (event){
        // stop full submit
        event.preventDefault()
        const city = form.city.value
        getWeather(city)
        form.city.value = ""
    })


})