document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = '49dd17d87a8ee9adee46849a7efa4755';
    const cities = ['Albuquerque', 'Atlanta', 'Billings', 'Boise', 'Boston', 'Buffalo', 'Charlotte', 'Chicago', 'Cincinnati', 'Dallas', 'Denver', 'Detroit', 'El Paso', 'Houston', 'Jacksonville', 'Kansas City', 'Las Vegas', 'Los Angeles', 'Lubbock', 'Memphis', 'Miami', 'Minneapolis', 'New Orleans', 'New York', 'Norfolk', 'Oklahoma City', 'Phoenix', 'Portland', 'Rapid City', 'Reno', 'Sacramento', 'Salt Lake City', 'San Antonio', 'San Diego', 'San Francisco', 'Seattle', 'Spokane', 'St. Louis', 'Tampa', 'Washington'];
    let currentCityIndex = 0;

    function updateWeather(data) {
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        const weatherHeader = document.querySelector('.weather-header');
        weatherHeader.innerHTML = `
            <h1 class="location">${data.name}</h1>
            <div class="current-weather">
                <img src="${iconUrl}" alt="Weather Icon" id="weatherIcon">
                <p class="temperature">${data.main.temp.toFixed(0)}°F</p>
                <p class="feels-like">Feels Like: ${data.main.feels_like.toFixed(0)}°</p>
                <p class="condition">${data.weather[0].main}</p>
            </div>
        `;
    }

    function fetchWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`;
        fetch(url)
            .then(response => response.json())
            .then(data => updateWeather(data))
            .catch(error => console.error('Fetching weather data failed:', error));
    }

    function rotateCities() {
        fetchWeather(cities[currentCityIndex]);
        currentCityIndex = (currentCityIndex + 1) % cities.length;
    }

    rotateCities();
    setInterval(rotateCities, 17000); // Adjusted to match your description
});
