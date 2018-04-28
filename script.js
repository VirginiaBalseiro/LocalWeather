$(document).ready (function() {
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    getWeather(position.coords.latitude, position.coords.longitude);
});
 } else {
     alert("Your browser doesn't support geolocation");
 }

function getWeather(lat, long){

  var url = "https://fcc-weather-api.glitch.me/api/current?lat="+ lat + "&lon=" + long;
   fetch (url)
    .then(function(response) {
     return response.json();
  })
    .then(function(data) {
     var description = ("<h4>" + data.weather[0].description + "</h4>").toUpperCase();
      $("#weather").html("<h1>" + data.weather[0].main + "</h1>");
      $("#description").html(description);
      $("#icon").attr("src", data.weather[0].icon);
      $("#city").html("<h2><strong>" + data.name + "</strong></h2>");
      $("#temp").html("The temperature is " + "<strong>" + data.main.temp + "°C </strong>");
      $("#tempmin").html("Min temperature: " + "<strong>" + data.main.temp_min + "°C </strong>");
      $("#tempmax").html("Max temperature: " + "<strong>" + data.main.temp_max + "°C </strong>");
      $("#pressure").html("Pressure: " + "<strong>" + data.main.pressure + "mb </strong>");
      $("#humidity").html("Humidity: " + "<strong>" + data.main.humidity +"% </strong>");
      changeBg();

   $("#toggle").on("change", function() {
  celsiusToFahrenheit();
});
function celsiusToFahrenheit (){
   if (document.getElementById("toggle").checked == true){
       $("#temp").html("The temperature is " + "<strong>" + (data.main.temp*(9/5)+32).toFixed(1) + "°F </strong>");
       $("#tempmin").html("Min temperature: " + "<strong>" + (data.main.temp_min*(9/5)+32).toFixed(1) + "°F </strong>");
       $("#tempmax").html("Max temperature: " + "<strong>" + (data.main.temp_max*(9/5)+32).toFixed(1) + "°F </strong>");
  } else {
       $("#temp").html("The temperature is " + "<strong>" + data.main.temp + "°C </strong>");
       $("#tempmin").html("Min temperature: " + "<strong>" + data.main.temp_min + "°C </strong>");
       $("#tempmax").html("Max temperature: " + "<strong>" + data.main.temp_max + "°C </strong>");
  }
}

 function changeBg(){
   console.log(data.main.temp);
   if (data.main.temp <= 10){
     $(".wrapper").css({"background": "linear-gradient(to bottom right, lightblue, white)", "background-repeat":          "no-repeat", "background-size": "cover"});
   } else if (data.main.temp >= 10 && data.main.temp <=24){
     $(".wrapper").css({"background": "linear-gradient(to bottom right, orange, lightyellow)", "background-repeat": "no-repeat", "background-size": "cover"});
    }
     else if (data.main.temp >= 25){
     $(".wrapper").css({"background": "linear-gradient(to bottom right, darkred, orange)", "background-repeat": "no-repeat", "background-size": "cover"});
    }
 }

  });
}
})//end of document ready
