// variable to hold query
const weatherAPI = "2f68f31ec768946954517a3458d379b7";
let currentCity = "Orlando";
let submit = document.querySelector("#submit");
let searchBar = document.querySelector("#searchbar");
let searchedCitiesArr = JSON.parse(localStorage.getItem("searchedCity"))? JSON.parse(localStorage.getItem("searchedCity")):[]
let searchedCityEl = document.querySelector("#searchedCityDiv");

displayStored()
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
        // second fetch taking the longitude and latitude and getting a city
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
                    displayFive(data.daily)
                    searchedCities()
                })
                .catch((err) => {
                    console.error(err);
                });
        })
        .catch((err) => {
            console.error(err);
        });
}
//event listener so that the button executes the search
submit.addEventListener("click", function(event){
    event.preventDefault();
    currentCity = searchBar.value.toLowerCase();
    searchCity(currentCity);
    
})
// function to display the current weather and create elements for the corresponding data
function displayToday(data){
    let todayDate = document.createElement("h5")
    todayDate.textContent = moment().format(`MM/DD/YYYY`);
    let today = document.querySelector("#today")
    today.innerHTML = ""
    let cityNameEl = document.createElement("h2")
    cityNameEl.innerText = currentCity
    let tempEL = document.createElement("p")
    let tempF = (data.temp - 273.15) * 1.8 +32;
    tempEL.innerText = "Temp: "+ tempF.toFixed(0);
    let humidityEl = document.createElement("p")
    humidityEl.innerText = "Humidity: "+ data.humidity
    let icon = document.createElement("img")
    icon.setAttribute("src", "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png")
    let uvEL = document.createElement("p")
    uvEL.innerText = "UV Index: " + data.uvi
    let windEl = document.createElement("p")
    windEl.innerText = "Wind: " + data.wind_speed
    
    // setting up UVI levels
    if (data.uvi <= 2) {
        uvEL.classList = "uv-low"
    } 
    if (data.uvi >2 && data.uvi <=5){
        uvEL.classList = "uv-moderate"
    }
    if (data.uvi >5) {
        uvEL.classList = "uv-high"
    }
    
    
    // appending to page to display on the website
    today.append(cityNameEl,todayDate, icon, tempEL, humidityEl, uvEL, windEl,)
    
    


}
// the function for displaying the 5 day
function displayFive(weekly){
    let fiveDay = document.querySelector("#fiveDay")
    fiveDay.innerHTML = ""
    for(i=1; i<6; i++){
    let data = weekly[i];
    let unixDate = data.dt;
    let weekDate = document.createElement("h6")
    weekDate.textContent = moment.unix(unixDate).format(`MM/DD/YYYY`);
    let tempEL = document.createElement("p")
    let tempF = (data.temp.day - 273.15) * 1.8 +32;
    tempEL.innerText = "Temp: "+ tempF.toFixed(0);
    let humidityEl = document.createElement("p")
    humidityEl.innerText = "Humidity: "+ data.humidity
    let icon = document.createElement("img")
    icon.setAttribute("src", "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png")
    let uvEL = document.createElement("p")
    uvEL.innerText = "UV Index: " + data.uvi
    let windEl = document.createElement("p")
    windEl.innerText = "Wind: " + data.wind_speed
    
    let fiveDayCard = document.createElement("div")
    fiveDayCard.setAttribute("class","col");
    
    
    // displaying 5 day information on the page
    fiveDayCard.append(tempEL, humidityEl, weekDate, icon, uvEL, windEl,)
    fiveDay.append(fiveDayCard)
    }
}
// checks array to see if current city already exists
function searchedCities() {
if (searchedCitiesArr.indexOf(currentCity) === -1) {
    searchedCitiesArr.push(currentCity)
    localStorage.setItem("searchedCity", JSON.stringify(searchedCitiesArr))
    displayStored()
}

}

function displayStored() {
    searchedCityEl.innerHTML = ""
    for(i=0; i<searchedCitiesArr.length; i++) {
        let storedEL = document.createElement("button")
        storedEL.innerText = searchedCitiesArr[i]
        searchedCityEl.append(storedEL)
        storedEL.addEventListener("click", function(event) {
            event.preventDefault()
            currentCity = event.target.innerText
           searchCity(event.target.innerText)
        }) 
    }
}
