var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var apiKey = '3d7cdf1f4d0582673661289b7883bc7e'

require('./functions')(); // import 'functions.js'

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static')); // allow app to access our static folder
app.set('view engine', 'ejs'); // select 'ejs' as our template engine

// Render page view
app.get('/', function(req, res) {
  res.render('index', {weather: null, error: null});
});

// Post weather data to webpage
app.post('/', function(req, res) {
  var city = req.body.city;
  var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  // Make request to Open Weather API
  request(url, function(err, response, body) {
    if(err) {
      res.render('index', {weather: null, error: 'Error, please try again'});
    }
    else {
      var weather = JSON.parse(body); // Parse JSON if request is successful

      if(weather.main === undefined) {
        res.render('index', {weather: null, error: 'Error, please try again'});
      }

      else {
        var temp = weather.main.temp;
        var name = weather.name;
        var humidity = weather.main.humidity;
        var clouds = weather.clouds.all;
        var wind = weather.wind.speed;
        var description = weather.weather[0].description;

        // Get Latitude and Longitude of City
        findGeolocation(city, function(location) {
          var geolocation = location;

          determineDayOrNight(geolocation, function(status) {
            var image = selectImage(status, description);
            res.render('index', {weather: temp, city: name, humidity: humidity,
                                clouds: clouds, wind: wind, picture: image,
                                error: null});

          }); // end determineDayOrNight
        }); // end findGeolocation
      }
    }
  });// end request
}); // end app.post


app.listen(3000, function() {
  console.log('JS-Weather is now running on port 3000');
});
