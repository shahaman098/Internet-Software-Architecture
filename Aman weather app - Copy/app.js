document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); // prevent the form from submitting and refreshing the page

    // Get the user input location and make an API call to OpenWeatherMap
    const location = document.getElementById('location').value;
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) { // check for error code
                throw new Error(data.message);
            }
            // Update weather data
            document.getElementById('temp').innerHTML = `${Math.round(data.main.temp - 273.15)}&deg;C`;
            document.getElementById('condition').innerHTML = data.weather[0].description;
            document.getElementById('wind').innerHTML = `${data.wind.speed} m/s`;
            document.getElementById('humidity').innerHTML = `${data.main.humidity}%`;
            document.getElementById('rain').innerHTML = `${data.rain ? data.rain['1h'] : '0'} mm`;
            document.getElementById('datetime').innerHTML = new Date().toLocaleString();
            document.getElementById('day').innerHTML = new Date().toLocaleDateString('en-US', {weekday: 'long'});

            // Update weather icon
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
            document.getElementById('icon').src = iconUrl;
        })
        .catch(error => {
            console.log(error);
        });
});
