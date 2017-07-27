module.exports = function() {

  this.selectImage = function(status, description) {
    var img;

    if (description === 'clear sky') {
      img = `img/${status}.png`;
    }

    else if (description === 'few clouds') {
      img = `img/cloudy${status}.png`;
    }

    else if (description === 'scattered clouds') {
      img = `img/cloudy${status}.png`;
    }

    else if ((description === 'broken clouds') || (description === 'overcast clouds')) {
      img = 'img/cloudy.png';
    }

    else if (description.indexOf('rain') !== -1) {
      img = `img/rainy${status}.png`;
    }

    else if (description.indexOf('drizzle') !== -1) {
      img = `img/rainy${status}.png`;
    }

    else if (description.indexOf('thunderstorm') !== -1) {
      img = `img/thunder${status}.png`;
    }

    else if (description.indexOf('snow') !== -1) {
      img = 'img/snow.png';
    }

    return img;
  }

  this.determineDayOrNight = function(time, sunrise, sunset) {
    var status;

    if ((time < sunrise) && (time < sunset)) {
      status = 'night';
    }
    else if ((time > sunrise) && (time < sunset)) {
      status = 'day';
    }
    else if ((time > sunrise) && (time > sunset)) {
      status = 'night';
    }
    return status;
  }
};
