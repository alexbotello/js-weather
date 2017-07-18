var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var apiKey = '3d7cdf1f4d0582673661289b7883bc7e'

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index', {weather: null, error: null});
});

app.post('/', function(req, res) {
  var city = req.body.city;
  var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  request(url, function(err, response, body) {
    if(err) {
      res.render('index', {weather: null, error: 'Error, please try again'});
    }
    else {
      var weather = JSON.parse(body);

      if(weather.main === undefined) {
        res.render('index', {weather: null, error: 'Error, please try again'});
      }
      else {
        var temp = weather.main.temp;
        var name = weather.name;
        var humidity = weather.main.humidity;
        var clouds = weather.clouds.all;
        var wind = weather.wind.speed;
        res.render('index', {weather: temp, city: name, humidity: humidity,
                             clouds: clouds, wind: wind, error: null});
      }
    }
  });
});

app.listen(3000, function() {
  console.log('JS-Weather is now running on port 3000');
});
