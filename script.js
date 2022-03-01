// variable to hold query
const weatherAPI = "2f68f31ec768946954517a3458d379b7";
let currentCity = "Orlando";

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
                    console.log(data);
                })
                .catch((err) => {
                    console.error(err);
                });
        })
        .catch((err) => {
            console.error(err);
        });
}
searchCity(currentCity);
searchCity("Denver");
