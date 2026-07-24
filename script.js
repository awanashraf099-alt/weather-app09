alert("JS is working");
const apiKey = "56fc8b0b803d1fa24af405154610f1e2";


async function getWeather() {

    const city = document.getElementById("city").value;

    if(city === ""){
        document.getElementById("result").innerHTML =
        "<h2>Please enter city name</h2>";
        return;
    }


    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;


    try {

        const response = await fetch(url);
        const data = await response.json();


        if(data.cod !== 200){
            document.getElementById("result").innerHTML =
            "<h2>City not found</h2>";
            return;
        }


        document.getElementById("result").innerHTML = `

        <h2>${data.name}, ${data.sys.country}</h2>

        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">

        <h1>${Math.round(data.main.temp)}°C</h1>

        <p>${data.weather[0].description}</p>

        <p>💧 Humidity: ${data.main.humidity}%</p>

        <p>🌬 Wind: ${data.wind.speed} m/s</p>

        `;


    } catch(error){

        document.getElementById("result").innerHTML =
        "<h2>Error loading weather</h2>";

    }

}




function getCurrentLocation(){

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(
        
        async function(position){

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;


            const url =
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;


            const response = await fetch(url);

            const data = await response.json();


            document.getElementById("result").innerHTML = `

            <h2>${data.name}, ${data.sys.country}</h2>

            <h1>${Math.round(data.main.temp)}°C</h1>

            <p>${data.weather[0].description}</p>

            <p>💧 Humidity: ${data.main.humidity}%</p>

            <p>🌬 Wind: ${data.wind.speed} m/s</p>

            `;


        },

        function(){

            alert("Location permission denied");

        });

    }

}
