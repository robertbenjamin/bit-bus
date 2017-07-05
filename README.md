# bit-bus

![Bitbus, in all it's glory.](http://i.imgur.com/s5GbKRq.png)

A BitBar menubar app for seeing when the next :bus: arrives at my work.

The latest bus is displayed on the menubar, with subsequent arrivals available on click. If the time is red, it means it's based on the bus schedule rather than the API's real-time prediction.

## Installation

This applet relies on the OneBusAway API and thus only works in cities where the API is supported. That being said, it's a very simple app and it would be fairly easy to swap out the API for whatever real-time transit API you'd like!

**To install:**

- Clone this repo to a directory of your choice.
- [Use this map](http://onebusaway.org/where/standard/) to find the #ID of the bus stop you'd like to track.
- In index.js, change the value of the `busStop` variable to the #ID.
- In the root directory, run:
```
npm i
```

- Install BitBar, [following these directions](https://github.com/matryer/bitbar#get-started).
- In your terminal, navigate to the plugin directory you created when you installed Bitbar and run:
```
ln -s /path/to/cloned_bitbus/index.js bitbus.10s.js
chmod +x bitbus.10s.js
```

The `10s` above is the refresh interval and can be customized to your liking (e.g. 30s, 2m, 1h).

Enjoy! :facepunch: :zap:
