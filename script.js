// =========================
// API KEY
// =========================

const apiKey = "56fc8b0b803d1fa24af405154610f1e2";

// =========================
// ELEMENTS
// =========================

const cityInput = document.getElementById("city");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");

const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

const weatherIcon = document.getElementById("weatherIcon");

// =========================
// SEARCH WEATHER
// =========================

async function getWeather(){

    const city = cityInput.value.trim();

    if(city === ""){

        alert("Please enter a city name");

        return;

    }

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try{

        const response = await fetch(url);

        const data = await response.json();

        if(data.cod != 200){

            alert("City not found");

            return;

        }

        updateWeather(data);

    }

    catch(error){

        alert("Unable to load weather data");

    }

}

// =========================
// ENTER KEY SEARCH
// =========================

cityInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){

        getWeather();

    }

});
// =========================
// UPDATE WEATHER UI
// =========================

function updateWeather(data){

    cityName.textContent =
    `${data.name}, ${data.sys.country}`;

    temperature.textContent =
    `${Math.round(data.main.temp)}°C`;

    description.textContent =
    data.weather[0].description;

    humidity.textContent =
    `${data.main.humidity}%`;

    wind.textContent =
    `${data.wind.speed} m/s`;

    weatherIcon.src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

}


// =========================
// CURRENT LOCATION
// =========================

function getCurrentLocation(){

    if(!navigator.geolocation){

        alert("Geolocation is not supported.");

        return;

    }

    navigator.geolocation.getCurrentPosition(

        async function(position){

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try{

                const url =
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

                const response = await fetch(url);

                const data = await response.json();

                updateWeather(data);

            }

            catch(error){

                alert("Unable to get weather.");

            }

        },

        function(){

            alert("Location permission denied.");

        }

    );

        }
// Register Service Worker

if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register("service-worker.js")
    .then(() => {
        console.log("Service Worker Registered");
    })
    .catch(error => {
        console.log("Service Worker Error:", error);
    });

}
// =========================
// INSTALL PWA
// =========================

let deferredPrompt;

const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {

    e.preventDefault();

    deferredPrompt = e;

    installBtn.style.display = "block";

});

installBtn.addEventListener("click", async () => {

    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
        console.log("App Installed");
    }

    deferredPrompt = null;

    installBtn.style.display = "none";

});
