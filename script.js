const apiKey = "56fc8b0b803d1fa24af405154610f1e2";

function showWeather(data) {

    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    document.getElementById("result").innerHTML = `

        <h2>📍 ${data.name}, ${data.sys.country}</h2>

        <img class="weather-icon" src="${icon}" alt="Weather Icon">

        <div class="temp">${Math.round(data.main.temp)}°C</div>

        <h3>${data.weather[0].main}</h3>

        <div class="details">

            <div class="box">
                💧<br>
                Humidity<br>
                <strong>${data.main.humidity}%</strong>
            </div>

            <div class="box">
                🌬<br>
                Wind<br>
                <strong>${data.wind.speed} m/s</strong>
            </div>

            <div class="box">
                📈<br>
                Pressure<br>
                <strong>${data.main.pressure} hPa</strong>
            </div>

            <div class="box">
                👁<br>
                Visibility<br>
                <strong>${data.visibility / 1000} km</strong>
            </div>

        </div>

    `;

    // Change background according to weather
    const weather = data.weather[0].main.toLowerCase();

    if (weather.includes("clear")) {
        document.body.style.background =
            "linear-gradient(135deg,#FDB813,#FF7E5F)";
    }
    else if (weather.includes("cloud")) {
        document.body.style.background =
            "linear-gradient(135deg,#7F8FA6,#B8C6DB)";
    }
    else if (weather.includes("rain")) {
        document.body.style.background =
            "linear-gradient(135deg,#3A6073,#16222A)";
    }
    else if (weather.includes("snow")) {
        document.body.style.background =
            "linear-gradient(135deg,#E6DADA,#274046)";
    }
    else {
        document.body.style.background =
            "linear-gradient(135deg,#4facfe,#00f2fe)";
    }
}
