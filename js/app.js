const yourAPIKey = '50be6cdbb2eb453fb12135220223110';
const body = document.querySelector('body');

// show and hide search bar
const showSearchBar = document.getElementById('add-city');
const hideSearchBar = document.querySelector('.module__form .btn--close');
const searchingBar = document.querySelector('.module__form');
showSearchBar.addEventListener('click', () => {
    searchingBar.removeAttribute('hidden');
});
hideSearchBar.addEventListener('click', () => {
    searchingBar.hidden = true;
});

// get weather info about city
async function getWeather(city = 'auto:ip') {
    try {
        body.classList.remove('loading');
        let weather = await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + yourAPIKey + '&q=' + city + '&days=6');
        weather = await weather.json();
        // console.log(weather);

        let weatherWindow = document.querySelector('.module__weather');
        let section = document.querySelector('section');
        let cloneWindow = weatherWindow.cloneNode(true);
        section.appendChild(cloneWindow);
        let lastChild = section.lastElementChild;
        lastChild.removeAttribute('hidden');

        lastChild.querySelector('.city__name').innerText = weather.location.name;
        lastChild.querySelector('.temperature__value').innerText = weather.current.feelslike_c;
        lastChild.querySelector('.weather__icon img').src = weather.current.condition.icon;
        lastChild.querySelector('.pressure__value').innerText = `${weather.current.pressure_mb} hPa`;
        lastChild.querySelector('.humidity__value').innerText = `${weather.current.humidity}%`;
        lastChild.querySelector('.wind-speed__value').innerText = `${weather.current.wind_kph} km/h`;


        // forecast max_temp for 5 next days
        lastChild.querySelectorAll('.weather__forecast .temperature')[0].innerText =
            (`${weather.forecast.forecastday[1].day.maxtemp_c}°C`);
        lastChild.querySelectorAll('.weather__forecast .temperature')[1].innerText =
            (`${weather.forecast.forecastday[2].day.maxtemp_c}°C`);
        lastChild.querySelectorAll('.weather__forecast .temperature')[2].innerText =
            (`${weather.forecast.forecastday[3].day.maxtemp_c}°C`);
        lastChild.querySelectorAll('.weather__forecast .temperature')[3].innerText =
            (`${weather.forecast.forecastday[4].day.maxtemp_c}°C`);
        lastChild.querySelectorAll('.weather__forecast .temperature')[4].innerText =
            (`${weather.forecast.forecastday[5].day.maxtemp_c}°C`);


        // dates for next 5 days forecast
        lastChild.querySelectorAll('.weather__forecast .day')[0].innerText =
            (weather.forecast.forecastday[1].date);
        lastChild.querySelectorAll('.weather__forecast .day')[1].innerText =
            (weather.forecast.forecastday[2].date);
        lastChild.querySelectorAll('.weather__forecast .day')[2].innerText =
            (weather.forecast.forecastday[3].date);
        lastChild.querySelectorAll('.weather__forecast .day')[3].innerText =
            (weather.forecast.forecastday[4].date);
        lastChild.querySelectorAll('.weather__forecast .day')[4].innerText =
            (weather.forecast.forecastday[5].date);


        // images for next 5 days forecast
        lastChild.querySelectorAll('.weather__forecast img').forEach(elem => {
            elem.src = weather.forecast.forecastday[1].day.condition.icon;
        });
        lastChild.querySelector('button').addEventListener('click', () => {
            lastChild.hidden = true;
        });


    } catch (err) {
        console.log(err);
    }
}

setTimeout(getWeather, 1000);

// get city name
const searchBtn = document.querySelector('.find-city button');
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const city = document.getElementById('search');
        getWeather(city.value);
        searchingBar.hidden = true;
        searchingBar.querySelector('input').value = '';
    })

const hideWeatherInfo = document.querySelector('.module__weather button');
const weatherModule = document.querySelector('.module__weather');
    hideWeatherInfo.addEventListener('click', () => {
        weatherModule.hidden = true;
    })
