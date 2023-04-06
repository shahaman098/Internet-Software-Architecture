const API_KEY = "17fdfa7b05896e8f4d5904b450a79e8b";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=Sevenoaks,uk&appid=${API_KEY}`;

fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        document.getElementById('temp').innerHTML = `${Math.round(data.main.temp - 273.15)}&deg;C`;
        document.getElementById('condition').innerHTML = data.weather[0].description;
        document.getElementById('wind').innerHTML = `${data.wind.speed} m/s`;
        document.getElementById('humidity').innerHTML = `${data.main.humidity}%`;
        document.getElementById('rain').innerHTML = `${data.rain ? data.rain['1h'] : '0'} mm`;
        document.getElementById('datetime').innerHTML = new Date().toLocaleString();
        
        // Update weather icon
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
        document.getElementById('icon').src = iconUrl;
    })
    .catch(error => {
        console.log(error);
    });

    document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault(); // prevent the form from submitting and refreshing the page
        const location = document.getElementById('location').value;
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                if (data.cod !== 200) { // check if the API response contains an error message
                    alert(`Error: ${data.message}`);
                } else {
                    const city = document.querySelector(".city");
                    city.innerHTML = "Weather in " + location;
    
                    document.getElementById('temp').innerHTML = `${Math.round(data.main.temp - 273.15)}&deg;C`;
                    document.getElementById('condition').innerHTML = data.weather[0].description;
                    document.getElementById('wind').innerHTML = `${data.wind.speed} m/s`;
                    document.getElementById('humidity').innerHTML = `${data.main.humidity}%`;
                    document.getElementById('rain').innerHTML = `${data.rain ? data.rain['1h'] : '0'} mm`;
                    document.getElementById('datetime').innerHTML = new Date().toLocaleString();
    
                    // Update weather icon
                    const iconCode = data.weather[0].icon;
                    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
                    document.getElementById('icon').src = iconUrl;
                }
            })
            .catch(error => {
                console.log(error);
            });
    });
    
