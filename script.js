const apiKey = "56fc8b0b803d1fa24af405154610f1e2";


function getWeather(){

    const city = document.getElementById("city").value;


    if(city === ""){
        document.getElementById("result").innerHTML =
        "<h2>Please enter city name</h2>";
        return;
    }


    fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )

    .then(response => response.json())

    .then(data => {


        if(data.cod !== 200){

            document.getElementById("result").innerHTML =
            "<h2>City not found</h2>";

            return;

        }



        document.getElementById("result").innerHTML = `

        <h2>
        📍 ${data.name}, ${data.sys.country}
        </h2>


        <img 
        src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
        width="100">


        <h1>
        ${Math.round(data.main.temp)}°C
        </h1>


        <p>
        ${data.weather[0].description}
        </p>


        <p>
        💧 Humidity: ${data.main.humidity}%
        </p>


        <p>
        🌬 Wind: ${data.wind.speed} m/s
        </p>

        `;



    })

    .catch(()=>{

        document.getElementById("result").innerHTML =
        "<h2>Error loading weather</h2>";

    });

}





function getCurrentLocation(){


    if(navigator.geolocation){


        navigator.geolocation.getCurrentPosition(
        
        position => {


            let lat = position.coords.latitude;

            let lon = position.coords.longitude;



            fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
            )

            .then(response=>response.json())

            .then(data=>{


                document.getElementById("result").innerHTML = `

                <h2>
                📍 ${data.name}, ${data.sys.country}
                </h2>


                <img 
                src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
                width="100">


                <h1>
                ${Math.round(data.main.temp)}°C
                </h1>


                <p>
                ${data.weather[0].description}
                </p>


                <p>
                💧 Humidity: ${data.main.humidity}%
                </p>


                <p>
                🌬 Wind: ${data.wind.speed} m/s
                </p>

                `;


            });


        },

        ()=>{

            alert("Location permission denied");

        });


    }

}



