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

    setInterval(rotateCities, 12000);

   // New code for playing music
   const playlist = ['/audio/song1.mp3', '/audio/song2.mp3', '/audio/song3.mp3','/audio/song4.mp3', '/audio/song5.mp3', '/audio/song6.mp3','/audio/song7.mp3', '/audio/song8.mp3', '/audio/song9.mp3','/audio/song10.mp3', '/audio/song11.mp3', '/audio/song12.mp3','/audio/song13.mp3', '/audio/song14.mp3']; // Add your MP3 files here
   let currentTrackIndex = 0;
   const musicPlayer = document.getElementById('backgroundMusic');
   const playMusicButton = document.getElementById('playMusicButton');

   function playTrack(trackIndex) {
       musicPlayer.src = playlist[trackIndex];
       musicPlayer.play();
   }

   playMusicButton.addEventListener('click', function() {
       playTrack(currentTrackIndex);
       this.style.display = 'none'; // Optionally hide the button after playing.
   });

   musicPlayer.addEventListener('ended', function() {
       currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
       playTrack(currentTrackIndex);
   });
});
