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



