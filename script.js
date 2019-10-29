//global variables
var pastSearches = [];
var storageSpot = ["One", "Two", "Three", "Four", "Five"];
var manualIterator = 0;
var manualIterator2 = 0;
var cityID = "";
var queryUrl = "";
var apiKey = "f1d3e368452da1cefaeccae21f2b42e2";

//a click event that ties to the submit button and launches several functions 
$("#submit").on("click", function(event) {
event.preventDefault();
$("#cityName").text("City Name: " + "");
$("#cityName").append($(".form-control").val());
if (pastSearches.indexOf($(".form-control").val()) === -1 ) {
    pastSearches.push($(".form-control").val());
    var newBtn = $("<button>");
    newBtn.text(pastSearches[manualIterator2]);
    newBtn.attr("class", "btn-success");
    manualIterator2++;
    $("#pastLocations").append(newBtn);
}
queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + $(".form-control").val() + "&appid="+apiKey;
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
    cityID = response.id;
    uvUrl = "https://api.openweathermap.org/data/2.5/uvi?appid="+apiKey +"&lat=" + lat+ "&lon="+lon;
    }).then(function() {
$.ajax({
    url:uvUrl,
    method:"GET"
}).then(function(response){
    var actualUv = response.value;
    $("#uv").text("UV Index: " + "");
    $("#uv").append(actualUv);
    var thirdUrl = "https://api.openweathermap.org/data/2.5/forecast?appid=" +apiKey +"&id=" + cityID +"&units=imperial";
        $.ajax({
            url: thirdUrl,
            method: "GET"
        }).then(function(response){
            $("#textOne").html("Date: " + moment().add(1, 'd').format("MMM Do YYYY") + "<br/>  Temp at noon: " + response.list['5'].main.temp + "<br/> Humidity at noon: "+ response.list['5'].main.humidity);
            if (response.list['5'].weather['0'].main == "Clouds") {
                $("#imageOne").attr("src", "https://3yecy51kdipx3blyi37oute1-wpengine.netdna-ssl.com/wp-content/uploads/2019/01/bg-clouds.jpg")
            } else if (response.list['5'].weather['0'].main == "Clear") {
                $("#imageOne").attr("src","https://anarkeden.com/wp-content/uploads/2018/10/blue-clear-sky-hd-static-video-nature-background_bteol5rrj_thumbnail-full01.png") 
            } else if (response.list['5'].weather['0'].main == "Snow") {
                $("#imageOne").attr("src","https://wordpress.accuweather.com/wp-content/uploads/2019/02/snow-in-pinehurst-seattle-washington-2-9-19.31.5620AM.png")
            } else if (response.list['5'].weather['0'].main == "Rain") {
                $("#imageOne").attr("src", "https://i.ytimg.com/vi/J5OSRpRyl6g/maxresdefault.jpg") 
            }

            $("#textTwo").html("Date: " + moment().add(2, 'd').format("MMM Do YYYY") + "<br/>  Temp at noon: " + response.list['13'].main.temp + "<br/> Humidity at noon: "+ response.list['13'].main.humidity);
            if (response.list['13'].weather['0'].main == "Clouds") {
                $("#imageTwo").attr("src", "https://3yecy51kdipx3blyi37oute1-wpengine.netdna-ssl.com/wp-content/uploads/2019/01/bg-clouds.jpg")
            } else if (response.list['13'].weather['0'].main == "Clear") {
                $("#imageTwo").attr("src","https://anarkeden.com/wp-content/uploads/2018/10/blue-clear-sky-hd-static-video-nature-background_bteol5rrj_thumbnail-full01.png") 
            } else if (response.list['13'].weather['0'].main == "Snow") {
                $("#imageTwo").attr("src","https://wordpress.accuweather.com/wp-content/uploads/2019/02/snow-in-pinehurst-seattle-washington-2-9-19.31.5620AM.png")
            } else if (response.list['13'].weather['0'].main == "Rain") {
                $("#imageTwo").attr("src", "https://i.ytimg.com/vi/J5OSRpRyl6g/maxresdefault.jpg") 
            }

            $("#textThree").html("Date: " + moment().add(3, 'd').format("MMM Do YYYY")+ "<br/>  Temp at noon: " + response.list['21'].main.temp + "<br/> Humidity at noon: "+ response.list['21'].main.humidity);
            if (response.list['21'].weather['0'].main == "Clouds") {
                $("#imageThree").attr("src", "https://3yecy51kdipx3blyi37oute1-wpengine.netdna-ssl.com/wp-content/uploads/2019/01/bg-clouds.jpg")
            } else if (response.list['21'].weather['0'].main == "Clear") {
                $("#imageThree").attr("src","https://anarkeden.com/wp-content/uploads/2018/10/blue-clear-sky-hd-static-video-nature-background_bteol5rrj_thumbnail-full01.png") 
            } else if (response.list['21'].weather['0'].main == "Snow") {
                $("#imageThree").attr("src","https://wordpress.accuweather.com/wp-content/uploads/2019/02/snow-in-pinehurst-seattle-washington-2-9-19.31.5620AM.png")
            } else if (response.list['21'].weather['0'].main == "Rain") {
                $("#imageThree").attr("src", "https://i.ytimg.com/vi/J5OSRpRyl6g/maxresdefault.jpg") 
            }

            $("#textFour").html("Date: " + moment().add(4, 'd').format("MMM Do YYYY")+ "<br/>  Temp at noon: " + response.list['29'].main.temp + "<br/> Humidity at noon: "+ response.list['29'].main.humidity);
            if (response.list['29'].weather['0'].main == "Clouds") {
                $("#imageFour").attr("src", "https://3yecy51kdipx3blyi37oute1-wpengine.netdna-ssl.com/wp-content/uploads/2019/01/bg-clouds.jpg")
            } else if (response.list['29'].weather['0'].main == "Clear") {
                $("#imageFour").attr("src","https://anarkeden.com/wp-content/uploads/2018/10/blue-clear-sky-hd-static-video-nature-background_bteol5rrj_thumbnail-full01.png") 
            } else if (response.list['29'].weather['0'].main == "Snow") {
                $("#imageFour").attr("src","https://wordpress.accuweather.com/wp-content/uploads/2019/02/snow-in-pinehurst-seattle-washington-2-9-19.31.5620AM.png")
            } else if (response.list['29'].weather['0'].main == "Rain") {
                $("#imageFour").attr("src", "https://i.ytimg.com/vi/J5OSRpRyl6g/maxresdefault.jpg") 
            }

            $("#textFive").html("Date: " + moment().add(5, 'd').format("MMM Do YYYY")+ "<br/>  Temp at noon: " + response.list['37'].main.temp + "<br/> Humidity at noon: "+ response.list['37'].main.humidity);
            if (response.list['37'].weather['0'].main == "Clouds") {
                $("#imageFive").attr("src", "https://3yecy51kdipx3blyi37oute1-wpengine.netdna-ssl.com/wp-content/uploads/2019/01/bg-clouds.jpg")
            } else if (response.list['37'].weather['0'].main == "Clear") {
                $("#imageFive").attr("src","https://anarkeden.com/wp-content/uploads/2018/10/blue-clear-sky-hd-static-video-nature-background_bteol5rrj_thumbnail-full01.png") 
            } else if (response.list['37'].weather['0'].main == "Snow") {
                $("#imageFive").attr("src","https://wordpress.accuweather.com/wp-content/uploads/2019/02/snow-in-pinehurst-seattle-washington-2-9-19.31.5620AM.png")
            } else if (response.list['37'].weather['0'].main == "Rain") {
                $("#imageFive").attr("src", "https://i.ytimg.com/vi/J5OSRpRyl6g/maxresdefault.jpg") 
            }
        })
    })
})
}

//an event listener on the newbuttons area that triggers a new weather search
$("#pastLocations").on("click", function() {
    $("#cityName").text("City Name: " + "")
    $("#cityName").append(event.target.innerText);
    queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + event.target.innerText + "&appid="+apiKey;
    send();
})

//a for loop that loops through local storage cells on page load and appends buttons form those searches. Must also update pastSearches array.
var launch = function() {
    for (var i=0; i<localStorage.length; i++){
        if (pastSearches.indexOf(localStorage.getItem(localStorage.key(i))) === -1 ) {
        pastSearches.push(localStorage.getItem(localStorage.key(i)))
        }
    }

    for (var j = 0; j<pastSearches.length; j++){
        var pastBtn = $("<button>");
        pastBtn.text(pastSearches[j]);
        pastBtn.attr("class", "btn-success");
        $("#pastLocations").append(pastBtn);
        manualIterator2 = pastSearches.length;
    }
}

//calling the launch function on page load to display past searches
launch()
//localStorage.clear();