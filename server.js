var express = require('express');
var bodyParser = require('body-parser');
var geocoder = require('geocoder');
var request = require('request');
var apiKey = '3d7cdf1f4d0582673661289b7883bc7e'

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

        // Get Latitude and Longitude of City
        findGeolocation(city, function(location) {
          var geolocation = location;

          determineDayOrNight(geolocation, function(status) {
            var image = selectImage(status, clouds);
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



/* FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS */
function selectImage(status, cloudData) {
  var img;
  if (status === 'Night') {
    if (cloudData >= 65) {
      img = "img/cloudymoon.png";
    }
    else if ((cloudData >= 30) && (cloudData <= 65)) {
      img = "img/kindacloudymoon.png";
    }
    else {
      img= 'img/moon.png';
    }
  }

  else {
    if (cloudData >= 65) {
      img = "img/cloudy.png";
    }
    else if ((cloudData >= 30) && (cloudData <= 65)) {
      img = "img/kindacloudy.png";
    }
    else {
      img= "img/sun.png";
    }
  }
  return img;
}


function findGeolocation(address, cb) {
  geocoder.geocode(address, function(err, data) {
    if(err) {
      console.log('An Error Occured Finding Geolocation..');
    }
    else {
      var location = data.results[0].geometry.location;
      cb(location);
    }
  });
}


function determineDayOrNight(geo, cb) {
  var url = `https://api.sunrise-sunset.org/json?lat=${geo.lat}&lng=${geo.lng}&date=today&formatted=0`

  request(url, function(err, response, body) {
    if(err) {
      console.log('An Error Occured While Accessing Sunrise-Sunset API');
    }
    else {
      var status;
      var data = JSON.parse(body);

      var sunriseTime = data.results.sunrise;
      var currentTime = new Date().toISOString();
      var sunsetTime = data.results.sunset;

      if((currentTime > sunriseTime) && (currentTime < sunsetTime)) {
        status = "Day";
      }
      else {
        status = "Night";
      }
      cb(status);
    }
  });
}
