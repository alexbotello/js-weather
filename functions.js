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
      img = Weather[description];
    }
    else {
      img = 'img/cloudy.png';
    }
    return img;
  }

  this.determineDayOrNight = function(time, sunrise, sunset) {
    var status;

    if ((time < sunrise) && (time < sunset)) {
      status = 'Night';
    }
    else if ((time > sunrise) && (time < sunset)) {
      status = 'Day';
    }
    else if ((time > sunrise) && (time > sunset)) {
      status = 'Night';
    }
    return status;
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
