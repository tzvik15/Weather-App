//global variables
var pastSearches = [];
var storageSpot = ["One", "Two", "Three", "Four", "Five"];
var manualIterator = 0;

//possibly (bonus, if time) a function that retrieves the user's location and displays weather for it
var bonus = function () {}

//a click event that ties to the submit button and launches several functions 
$("#submit").on("click", function(event) {
event.preventDefault();
$("#cityName").text("City Name: " + "");
$("#cityName").append($(".form-control").val());
if (pastSearches.indexOf($(".form-control").val()) === -1 ) {
    pastSearches.push($(".form-control").val());
}
store();
send();
})
//a function that stores the inputes city name as a localStorage item, up to 5 items. If more than 5 searches are used, will start replacing them in order
var store = function() {
   if (manualIterator<5) {
       localStorage['place' +storageSpot[manualIterator]] = $(".form-control").val();
       manualIterator++;
   } else {
       manualIterator = 0;
       localStorage['place' +storageSpot[manualIterator]] = $(".form-control").val();
       manualIterator++;
   }
}

//a function that sends an AJAX request to the weatherApi, with the stored data variable as the location (the variables for this search will be defined in the click event)
var send = function() {
    var apiKey = "f1d3e368452da1cefaeccae21f2b42e2";
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + $(".form-control").val() + "&appid="+apiKey;
    var lat ="";
    var lon = "";
    var uvUrl=";"
$.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response){
      var fard = (response.main.temp - 273.15) * 1.80 + 32;
      $("#currentTemp").text("Current Temp: " + "");
    $("#currentTemp").append(fard.toFixed(0));
    var humid = response.main.humidity;
    $("#humid").text("Humidity: " + "");
    $("#humid").append(humid);
    var wind = response.wind.speed;
    $("#wind").text("Wind Speed: " + "");
    $("#wind").append(wind);
    var date = moment().format("MMM Do YYYY");
    $("#todayDate").text("Date: " + "");
    $("#todayDate").append(date);
     lat = response.coord.lat;
     lon = response.coord.lon;
    uvUrl = "http://api.openweathermap.org/data/2.5/uvi?appid="+apiKey +"&lat=" + lat+ "&lon="+lon;
     }).then(function() {
$.ajax({
    url:uvUrl,
    method:"GET"
}).then(function(response){
    var actualUv = response.value;
    $("#uv").text("UV Index: " + "");
    $("#uv").append(actualUv);
})
    })}


//a promise function (.then) that parses through the object received from the API (possibly storing it as a variable first), and dynamically adds the resaults to the page, specifically the name, date, temperature, humidity, UV index, wind speed, and an image depicting current weather
var diplayInfo = function() {}

//a function that retrieves the location names stored in localStorage and appends them to the display. This will include adding an "on click" event listener to any new buttons appended this way
var pastSearch = function() {}

//a function that collects future forcast information from the retrieved object (this possibly will also need to by a promisory function, TBD), and dynamically displays a weather image with the following information: date, temperature, humidity
var future = function() {}