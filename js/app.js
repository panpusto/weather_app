const yourKey = '50be6cdbb2eb453fb12135220223110';
const url = 'http://api.weatherapi.com/v1/forecast.json?key=' + yourKey + '&q=auto:ip&days=6';

// get local weather after enter the site
async function getLocalWeather() {
    try {
        let weather = await fetch(url);
        weather = await weather.json();
        console.log(weather);

        let weatherWindow = document.querySelector('.module__weather');
        weatherWindow.removeAttribute('hidden');

        let cityName = document.querySelector('.city__name');
        cityName.innerText = weather.location.name;

        let temperature = document.querySelector('.temperature__value');
        temperature.innerText = weather.current.feelslike_c;

        let currentIcon = document.querySelector('.weather__icon img');
        currentIcon.src = weather.current.condition.icon;

        let pressure = document.querySelector('.pressure__value');
        pressure.innerText = `${weather.current.pressure_mb} hpa`;

        let humidity = document.querySelector('.humidity__value');
        humidity.innerText = `${weather.current.humidity}%`;

        let windKPH = document.querySelector('.wind-speed__value');
        windKPH.innerText = `${weather.current.wind_kph} km/h`;

        let temperatures5Days = document.querySelectorAll('.weather__forecast .temperature');
        for (let item of temperatures5Days) {
            for (let i = 1; i < 6; i++) {
                item.innerText = `${weather.forecast.forecastday[i].day.avgtemp_c}°C`;
            }
        }

        let images5Days = document.querySelectorAll('.weather__forecast img');
        for (let item of images5Days) {
            for (let i = 1; i < 6; i++) {
                item.src = weather.forecast.forecastday[i].day.condition.icon;
            }
        }

    } catch (err) {
        console.log(err);
    }
}

getLocalWeather();



// show searching bar
let addCityBtn = document.getElementById('add-city');
let searchingBar = document.querySelector('.module__form');
addCityBtn.addEventListener('click', () => {
    searchingBar.removeAttribute('hidden');
});

