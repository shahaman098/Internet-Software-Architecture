const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const location = document.querySelector('#city').value;
    getWeather(location);
}

async function getWeather(location) {
    const apiKey = '17fdfa7b05896e8f4d5904b450a79e8b';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    const weather = {
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon
    };
    displayWeather(weather);
}

function displayWeather(weather) {
    const weatherDiv = document.querySelector('#weather');
    const iconUrl = `https://openweathermap.org/img/w/${weather.icon}.png`;
    weatherDiv.innerHTML = `
        <div class="weather-container">
            <h2>${weather.city}</h2>
            <img src="${iconUrl}" alt="${weather.description}" />
            <p>${weather.description}</p>
            <p>Temperature: ${weather.temperature}°C</p>
        </div>
    `;
}

displayWeather({ city: '', temperature: '', description: '', icon: '' });
function displayWeather(weather) {
    const weatherDiv = document.querySelector('#weather');
    const iconUrl = weather.description.includes('cloud') ? 'https://img.icons8.com/clouds/100/000000/cloud.png' : 'https://img.icons8.com/color/96/000000/sun.png';
    weatherDiv.innerHTML = `
        <div class="weather-container">
            <h2>${weather.city}</h2>
            <img src="${iconUrl}" alt="${weather.description}" />
            <p>${weather.description}</p>
            <p>Temperature: ${weather.temperature}°C</p>
        </div>
    `;
}
