// OpenWeather API Key
const apiKey = "56fc8b0b803d1fa24af405154610f1e2";

const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const cityInput = document.getElementById("cityInput");

const weatherBox = document.querySelector(".weather-box");
const errorBox = document.querySelector(".error");

const cityName = document.querySelector(".city");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const weatherIcon = document.querySelector(".weather-icon");


// Search Button
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city !== "") {
        getWeather(city);
    }
});


// Enter Key Search
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();

        if (city !== "") {
            getWeather(city);
        }
    }
});


// Get Weather By City
async function getWeather(city) {

    const url = 
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;


    try {

        const response = await fetch(url);
        const data = await response.json();


        if (data.cod !== 200) {
            showError("City not found!");
            return;
        }


        displayWeather(data);

    } catch (error) {

        showError("Something went wrong!");

    }
}



// Display Weather Data
function displayWeather(data) {

    errorBox.style.display = "none";
    weatherBox.style.display = "block";


    cityName.innerHTML = `${data.name}, ${data.sys.country}`;

    temperature.innerHTML = `${Math.round(data.main.temp)}°C`;

    description.innerHTML = data.weather[0].description;


    humidity.innerHTML = `${data.main.humidity}%`;

    wind.innerHTML = `${data.wind.speed} m/s`;


    const iconCode = data.weather[0].icon;

    weatherIcon.src =
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

}



// Show Error
function showError(message){

    errorBox.innerHTML = message;

    errorBox.style.display = "block";

    weatherBox.style.display = "none";

}



// Current Location Button
locationBtn.addEventListener("click", () => {


    if (navigator.geolocation) {


        navigator.geolocation.getCurrentPosition(
            
            (position)=>{

                const lat = position.coords.latitude;
                const lon = position.coords.longitude;


                getWeatherByLocation(lat, lon);

            },


            ()=>{
                showError("Location permission denied!");
            }

        );


    } else {

        showError("Geolocation not supported!");

    }

});



// Get Weather By Coordinates
async function getWeatherByLocation(lat, lon){


    const url =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;


    try{


        const response = await fetch(url);

        const data = await response.json();


        displayWeather(data);


    }catch(error){

        showError("Unable to get location weather!");

    }

}
