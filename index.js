#!/usr/bin/env /usr/local/bin/node
const bitbar = require('bitbar');
const request = require('superagent');
const moment = require('moment');

var busStop = 18610;
var busAPIKey = 'TEST';
var busAPI = `http://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/1_${busStop}.json?key=${busAPIKey}`;

var busInfo = {};

request
.get(busAPI)
.end(function(err, res) {
  var response = JSON.parse(res.text);
  console.log(response);

  var currentTime = response.currentTime;
  

  bitbar([
      {
          text: currentTime,
          color: bitbar.darkMode ? 'white' : 'red',
          dropdown: false
      },
      bitbar.sep,
      {
          text: 'Unicorns',
          color: '#ff79d7',
          submenu: [
              {
                  text: ':tv: Video',
                  href: 'https://www.youtube.com/watch?v=9auOCbH5Ns4'
              },
              {
                  text: ':book: Wiki',
                  href: 'https://en.wikipedia.org/wiki/Unicorn'
              }
          ]
      },
      bitbar.sep,
      'Ponies'
  ]);
});