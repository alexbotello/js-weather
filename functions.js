var geocoder = require('geocoder');
var request = require('request');

module.exports = function() {

  this.selectImage = function(status, description) {
    var img;

    if ((status === 'Night') && (description === 'clear sky')) {
      img = Weather[description][1];
    }

    else if ((status === 'Day') && (description === 'clear sky')) {
      img = Weather[description][0];
    }

    else if ((status === 'Night') && (description === 'few clouds')) {
      img = Weather[description][1];
    }

    else if ((status === 'Day') && (description === 'few clouds')) {
      img = Weather[description][0];
    }

    else if (description in Weather) {
      img = Weather[description][0];
    }
    else {
      img = 'img/cloudy.png';
    }
    return img;
  }

  this.findGeolocation = function(address, cb) {
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

  this.determineDayOrNight = function(geo, cb) {
    var url = `https://api.sunrise-sunset.org/json?lat=${geo.lat}&lng=${geo.lng}&date=yesterday&formatted=0`

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

  this.Weather = {
    'clear sky': ['img/sun.png', 'img/moon.png'],
    'few clouds': ['img/cloudysun.png', 'img/cloudymoon.png'],
    'scattered clouds': 'img/cloudy.png',
    'rain': 'img/rain.png',
    'thunderstorm': 'img/thunderstorm.png',
    'snow': 'snow.png'
  }
};
