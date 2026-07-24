const apiKey = "56fc8b0b803d1fa24af405154610f1e2";

// Search weather by city
async function getWeather() {
    const city = document.getElementById("city").value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod != 200) {
            document.getElementById("result").innerHTML =
                `<h3>${data.message}</h3>`;
            return;
        }

        showWeather(data);

    } catch (error) {
        document.getElementById("result").innerHTML =
            "<h3>Error fetching weather data.</h3>";
    }
}

// Get current location
function getCurrentLocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }

}

// GPS position
async function showPosition(position) {

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        showWeather(data);

    } catch (error) {

        document.getElementById("result").innerHTML =
            "<h3>Unable to fetch weather.</h3>";

    }

}

// Display weather
function showWeather(data) {

    document.getElementById("result").innerHTML = `
        <h2>📍 ${data.name}, ${data.sys.country}</h2>

        <h3>${data.weather[0].main}</h3>

        <p>🌡 Temperature: ${data.main.temp}°C</p>

        <p>🤗 Feels Like: ${data.main.feels_like}°C</p>

        <p>💧 Humidity: ${data.main.humidity}%</p>

        <p>🌬 Wind: ${data.wind.speed} m/s</p>

        <p>📈 Pressure: ${data.main.pressure} hPa</p>

        <p>👁 Visibility: ${data.visibility / 1000} km</p>

    `;

}

// GPS errors
function showError(error) {

    switch (error.code) {

        case error.PERMISSION_DENIED:
            alert("Location permission denied.");
            break;

        case error.POSITION_UNAVAILABLE:
            alert("Location unavailable.");
            break;

        case error.TIMEOUT:
            alert("Location request timed out.");
            break;

        default:
            alert("Unknown error.");
    }

}
