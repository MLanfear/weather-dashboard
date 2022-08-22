$(document).ready(function () {

    var cityName = "";

    //calls needed for first and 2nd API
    var lat = "";
    var lon = "";

    function getWeatherOneAPI(a,b) {
        var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + a + "&lon=" + b + "&exclude=minutely,hourly&appid=aec299195260a001b09706b5bfe740f7&units=imperial";

        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function(response){
            
            $(".card-deck").empty();

            var icon = response.current.weather[0].icon;
            var iconImg = $("<img>");
            iconImg.addClass("img-fluid");
            iconImg.attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png")
            $("#city").append(iconImg);

            var uvi = parseInt(response.current.uvi);
            if (uvi <= 2) {
                $(".color").css({ "background-color": "green", "color": "white" });
            } else if (uvi >= 3 && uvi <= 5) {
                $(".color").css({ "background-color": "yellow", "color": "black" });
            } else if (uvi >= 6 && uvi <= 7) {
                $(".color").css({ "background-color": "orange" });
            } else if (uvi >= 8 && uvi <= 10) {
                $(".color").css({ "background-color": "red", "color": "white" }); 
            } else if (uvi >=11) {
                $(".color").css({ "background-color": "violet", "color": "white" });
            }

            $("#temp").text("Temperature: " + response.current.temp + "° F");
            $("#humidity").text("Humidity: " + response.current.humidity + "%");
            $("#wind").text("Wind Speed: " + response.current.wind_speed + " MPH");
            $(".color").text(response.current.uvi);

            $("#current").css({"display":"block"});

            var daily = response.daily;

            for (i = 1; i < daily.length - 2; i++) {
                var dailyDate = moment.unix(daily[i].dt).format("dddd MM/DD/YYYY");
                var dailyTemp = daily[i].temp.day;
                var dailyHum = daily[i].humidity;
                var dailyIcon = daily[i].weather[0].icon;

                var dailyDiv = $("<div class='card text-white bg-primary p-2'>")
                var pTemp = $("<p>");
                var pHum = $("<p>");
                var imgIcon = $("<img>");
                var hDate = $("<h6>");

                hDate.text(dailyDate);
                imgIcon.attr("src", "https://openweathermap.org/img/wn/" + dailyIcon + "@2x.png")
                imgIcon.addClass("img-fluid");
                imgIcon.css({"width": "100%"});
                pTemp.text("Temp: " + dailyTemp + "° F");
                pHum.text("Humidity: " + dailyHum + "%");

                dailyDiv.append(hDate);
                dailyDiv.append(imgIcon);
                dailyDiv.append(pTemp);
                dailyDiv.append(pHum);
                $(".card-deck").append(dailyDiv);

                $("#five-day").css({"display":"block"});
            }
    
    
    })
}

function init (){
    cityName = localStorage.getItem("cityname");
    if (cityName !== null) {

        var cityList = $("<button>");
        cityList.addClass("list-group-item list-group-item-action");
        cityList.text(cityName);
        $("ul").prepend(cityList);
        getWeather()
        
    }
}
