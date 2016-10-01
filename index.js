#!/usr/bin/env /usr/local/bin/node

// <bitbar.title>BitBus</bitbar.title>
// <bitbar.version>v1.0</bitbar.version>
// <bitbar.author>Robert Benjamin</bitbar.author>
// <bitbar.author.github>robertbenjamin</bitbar.author.github>
// <bitbar.desc>A BitBar menubar app for seeing when the next bus arrives at my work.</bitbar.desc>
// <bitbar.image>http://i.imgur.com/zjuQRQF.png</bitbar.image>
// <bitbar.dependencies>node,superagent,momentjs</bitbar.dependencies>
// <bitbar.abouturl>https://github.com/robertbenjamin/bit-bus</bitbar.abouturl>

const bitbar = require('bitbar');
const request = require('superagent');
const moment = require('moment');
const busAPIKey = require('./src/API_KEY.js') || 'TEST';

var busStop = 18610;
var busAPI = `http://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/1_${busStop}.json?key=${busAPIKey}&minutesAfter=70`;
var menuColor = bitbar.darkMode ? 'white' : 'black';
var notRealTimeColor = '#ff4136';

request
.get(busAPI)
.end(function(err, res) {
  if (err || !res.ok) {
    bitbar([{
      text: ':bus: no internet :(',
      color: menuColor
    }]);
    return;
  }
  
  var response = JSON.parse(res.text);

  var trips = response.data.entry.arrivalsAndDepartures
    .filter(function(trip) {
      return trip.routeShortName == '32';
    })
    .map(function(trip) {
      var newTrip = {};

      newTrip.scheduledArrival = moment(trip.scheduledArrivalTime).fromNow();
      if (trip.predictedArrivalTime) {
        newTrip.predictedArrival = moment(trip.predictedArrivalTime).fromNow();
      }

      return newTrip;
    });

  var menu = [];
  menu.push({
    text: ':bus: ' + (trips[0].predictedArrival || trips[0].scheduledArrival),
    color: trips[0].predictedArrival ? menuColor : notRealTimeColor
  });

  menu.push(bitbar.sep);

  trips.slice(1).forEach(function(trip) {
    menu.push({
      text: ':point_right: ' + (trip.predictedArrival || trip.scheduledArrival),
      color: trip.predictedArrival ? menuColor : notRealTimeColor
    })
  });

  bitbar(menu);

});