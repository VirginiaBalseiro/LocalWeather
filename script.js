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
     var tempCelsius = data.main.temp + "°C";
     var tempMaxCelsius = data.main.temp_min + "°C";
     var tempMinCelsius = data.main.temp_max + "°C";
     var description = ("<h4>" + data.weather[0].description + "</h4>").toUpperCase();
      $("#weather").html("<h1>" + data.weather[0].main + "</h1>");
      $("#description").html(description);
      $("#icon").attr("src", data.weather[0].icon);
      $("#city").html("<h2>" + data.name + "</h2>");
      $("#temp").html(tempCelsius);
      $("#tempmin").html(tempMaxCelsius);
      $("#tempmax").html(tempMinCelsius);
      $("#pressure").html(data.main.pressure + "mb");
      $("#humidity").html(data.main.humidity +"%");
      changeBg();
    
   $("#toggle").on("change", function() {
  celsiusToFahrenheit();
});
function celsiusToFahrenheit (){
   if (document.getElementById("toggle").checked == true){
       $("#temp").html((data.main.temp*(9/5)+32).toFixed(1) + "°F");
       $("#tempmin").html((data.main.temp_min*(9/5)+32).toFixed(1) + "°F");
       $("#tempmax").html((data.main.temp_max*(9/5)+32).toFixed(1) + "°F");
  } else {
       $("#temp").html(tempCelsius);
       $("#tempmin").html(tempMinCelsius);
       $("#tempmax").html(tempMaxCelsius);
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
     $("#social-button").on("click", function() { 
    $("#social").toggle();
    $("#ellipsis").toggle(); 
 })
})//end of document ready
