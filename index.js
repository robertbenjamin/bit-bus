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

let busStop = 18620;
let busAPI = `http://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/1_${busStop}.json?key=${busAPIKey}&minutesAfter=70`;
let menuColor = bitbar.darkMode ? 'white' : 'black';
let warningColor = '#ff4136';

request
.get(busAPI)
.end((err, res) => {
  if (err || !res.ok) bitbar([{ text: ':bus: no internet :(', color: warningColor }]);

  let response = JSON.parse(res.text);
  let trips = response.data.entry.arrivalsAndDepartures;

  if (trips.length === 0) {
    bitbar([{ text: ':bus: no more trips', color: warningColor }]);
  } else {
    let myTrips = trips
      .filter(trip => trip.routeShortName === '32')
      .map(trip => {
        let newTrip = {};

        newTrip.scheduledArrival = moment(trip.scheduledArrivalTime).fromNow();
        if (trip.predictedArrivalTime) newTrip.predictedArrival = moment(trip.predictedArrivalTime).fromNow();

        return newTrip;
      });

    let menu = [];

    menu.push({
      text: `:bus: ${myTrips[0].predictedArrival || myTrips[0].scheduledArrival}`,
      color: myTrips[0].predictedArrival ? menuColor : warningColor
    });

    menu.push(bitbar.sep);

    myTrips.slice(1).forEach(trip => {
      menu.push({
        text: `:point_right: ${trip.predictedArrival || trip.scheduledArrival}`,
        color: trip.predictedArrival ? menuColor : warningColor
      })
    });

    bitbar(menu);
  }
});
