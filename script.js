// variable to hold query
const weatherAPI = "2f68f31ec768946954517a3458d379b7";
let currentCity = "Orlando";
let submit = document.querySelector("#submit");
let searchBar = document.querySelector("#searchbar");

function searchCity(city) {
    // constructing the query that will be put inside the fetch
    let cordQuery =
        "http://api.openweathermap.org/geo/1.0/direct?q=" +
        city +
        "&limit=1&appid=" +
        weatherAPI;
    fetch(cordQuery)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            let lon = data[0].lon;
            let lat = data[0].lat;
            let weatherQuery =
                "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=" +
                weatherAPI;
            fetch(weatherQuery)
                .then(function (res) {
                    return res.json();
                })
                .then(function (data) {
                    displayToday(data.current)
                })
                .catch((err) => {
                    console.error(err);
                });
        })
        .catch((err) => {
            console.error(err);
        });
}
submit.addEventListener("click", function(event){
    event.preventDefault();
    currentCity = searchBar.value;
    searchCity(currentCity);
    
})

function displayToday(data){
    console.log(data)
    let today = document.querySelector("#today")
    today.innerHTML = ""
    let cityNameEl = document.createElement("h2")
    cityNameEl.innerText = currentCity
    let tempEL = document.createElement("p")
    tempEL.innerText = "Temp: "+ data.temp
    let humidityEl = document.createElement("p")
    humidityEl.innerText = "Humidity: "+ data.humidity
    let icon = document.createElement("img")
    icon.setAttribute("src", "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png")
    let uvEL = document.createElement("p")
    uvEL.innerText = "UV Index: " + data.uvi
    let windEl = document.createElement("p")
    windEl.innerText = "Wind: " + data.wind_speed
    
    
    
    
    today.append(cityNameEl, tempEL, humidityEl, icon, uvEL, windEl,)
    

}

