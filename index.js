var request = require('request');
var argv = require('yargs').argv;
var env = require('dotenv').config();
var apiKey = '3d7cdf1f4d0582673661289b7883bc7e'

var key = process.env.API_KEY;
var city = argv.c || 'round rock';
var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`


request(url, function(err, response, body) {
  if (err){
    console.log("Error: ", err);
  }
  var weather = JSON.parse(body);

  console.log(weather.name);
  console.log("Temperature:",weather.main.temp, "F");
  console.log("Humidity:", weather.main.humidity, "%");
  console.log("Wind Speed:", weather.wind.speed, 'MPH');
  console.log("Cloudiness:", weather.clouds.all, "%");
});
