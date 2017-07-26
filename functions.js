var geocoder = require('geocoder');
var request = require('request');

module.exports = function() {
  this.selectImage = function(status, cloudData) {
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
};
