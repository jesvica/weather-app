let weather = {
    "apikey": "2592afda45e619aa14eba1750cf7f275",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + city
        + "&units=metric&appid="
        + this.apikey)

        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, temp_min, temp_max, humidity } = data.main;
        const { speed } = data.wind;
        const weatherIcon = document.querySelector(".weather-icon");

        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temperature").innerText = Math.round(temp) + "°C";
        document.querySelector(".min-temp").innerText = "L: " + Math.round(temp_min) + "°C";
        document.querySelector(".max-temp").innerText = "H: " + Math.round(temp_max) + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity +"%";
        document.querySelector(".wind").innerText = "Wind: " + speed + "mph";
        document.querySelector(".weather").classList.remove("loading");

        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "weather-images/cloud.svg";
        } else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "weather-images/clear.svg";
        } if(data.weather[0].main == "Haze"){
            weatherIcon.src = "weather-images/haze.svg";
        } else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "weather-images/rain.svg";
        } else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "weather-images/snow.svg";
        } else if(data.weather[0].main == "Thunderstorm"){
            weatherIcon.src = "weather-images/storm.svg";
        }

    },
    search: function() {
        this.fetchWeather(document.querySelector('.searchbar').value);
    }
    
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector('.searchbar').addEventListener("keyup", function (event) {
    if (event.key == 'Enter') {
        weather.search();
    }
});

