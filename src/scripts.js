function showTime() {
    let days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];
    let date = new Date();
    let nDay = date.getDay();
    let hour = date.getHours();
    let minutes = date.getMinutes();

    let headerNumber2 = document.querySelector("h2");
    let day = days[nDay];
    headerNumber2.innerHTML = `${day}  `;

    let headerNumber4 = document.querySelector("#time");
    headerNumber4.innerHTML = `${hour}: ${minutes}`;
}
function formatDay(timezone){
  let date = new Date(timezone * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showPredictionWeather(response) {

    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");


    let forecastHtml = ` <div class="row">`;

    forecast.forEach(function (forecastDay, index) {
        if(index<5) {
            forecastHtml =
                forecastHtml + `
   <div class="col">
   <h3>${formatDay(forecastDay.dt)}</h3>
   <img src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                }@2x.png"" class="item-img" />
   <h4>${Math.round(
                    forecastDay.temp.day)}</h4>
   </div>`;
        }
    });

    forecastHtml = forecastHtml + `</div>`
    forecastElement.innerHTML = forecastHtml;

}


function getPrediction(coordinates) {
    let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
    let predictionUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(predictionUrl).then(showPredictionWeather);
}

function showRealData(response) {
    let header1 = document.querySelector("h1");
    header1.innerHTML = response.data.name;

    showTime();
    let icon = response.data.weather[0].icon;
    let weatherCondition = response.data.weather[0].description;
    let headerConditionsWeather = document.getElementById(
        "weather-condition-header"
    );

    headerConditionsWeather.innerHTML = weatherCondition;

    let temp = Math.round(response.data.main.temp);


    let temperatureHeader = document.getElementById("degree");
    temperatureHeader.innerHTML = temp;

    let iconElement = document.querySelector("#icon-main-city");
    iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${icon}@2x.png`
    )
    getPrediction(response.data.coord);
}

function getRequest(event) {

    event.preventDefault();
    let city = document.getElementById("city-name");
    let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
    axios.get(weatherUrl).then(showRealData);
}

function showMyLocationTemp(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?&appid=${apiKey}&units=metric&lat=${lat}&lon=${lon}`;
    axios.get(weatherUrl).then(showRealData);
}

function showMyCurrentLocationWeather() {
    navigator.geolocation.getCurrentPosition(showMyLocationTemp);
}


let searchEngine = document.querySelector(".d-flex");
searchEngine.addEventListener("submit", getRequest);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", showMyCurrentLocationWeather);

