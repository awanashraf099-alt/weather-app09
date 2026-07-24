const apiKey="56fc8b0b803d1fa24af405154610f1e2";

// Search weather by city
async function getWeather() {
    let city = document.getElementById("city").value;

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        let response = await fetch(url);
        let data = await response.json();

        if (data.cod != 200) {
            document.getElementById("result").innerHTML =
                `<p>${data.message}</p>`;
            return;
        }

        showWeather(data);

    } catch (error) {
        document.getElementById("result").innerHTML =
            "<p>Error fetching weather data.</p>";
    }
}

// Get weather using current GPS location
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported.");
    }
}

async function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        let response = await fetch(url);
        let data = await response.json();

        showWeather(data);

    } catch (error) {
        document.getElementById("result").innerHTML =
            "<p>Error fetching weather data.</p>";
    }
}

// Display weather
function showWeather(data) {
    document.getElementById("result").innerHTML = `
        <h3>${data.name}</h3>
        <p>🌡 Temperature: ${data.main.temp}°C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬 Wind: ${data.wind.speed} m/s</p>
        <p>☁ Weather: ${data.weather[0].main}</p>
    `;
}

// GPS error messages
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
