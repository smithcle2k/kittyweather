document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = '49dd17d87a8ee9adee46849a7efa4755';
    const cities = ['Albuquerque', 'Atlanta', 'Billings', 'Boise', 'Boston', 'Buffalo', 'Charlotte', 'Chicago', 'Cincinnati', 'Dallas', 'Denver', 'Detroit', 'El Paso', 'Houston', 'Jacksonville', 'Kansas City', 'Las Vegas', 'Los Angeles', 'Lubbock', 'Memphis', 'Miami', 'Minneapolis', 'New Orleans', 'New York', 'Norfolk', 'Oklahoma City', 'Phoenix', 'Portland', 'Rapid City', 'Reno', 'Sacramento', 'Salt Lake City', 'San Antonio', 'San Diego', 'San Francisco', 'Seattle', 'Spokane', 'St. Louis', 'Tampa', 'Washington'];
    let currentCityIndex = 0;
    const weatherHeader = document.querySelector('.weather-header');

    // Function to update the weather information on the page
    function updateWeather(data) {
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

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

    // Function to fetch weather data from the API
    function fetchWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`;
        
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => updateWeather(data))
            .catch(error => {
                console.error('Fetching weather data failed:', error);
            });
    }

    // Function to rotate through cities and update the weather every 17 seconds
    function rotateCities() {
        fetchWeather(cities[currentCityIndex]);
        currentCityIndex = (currentCityIndex + 1) % cities.length;
    }

    // Initial call to start the rotation
    rotateCities();
    // Set the interval for city rotation and weather update
    setInterval(rotateCities, 12000);
});
