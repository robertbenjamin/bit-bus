# bit-bus

![Bitbus, in all it's glory.](http://i.imgur.com/EwTNlLr.png)

A BitBar menubar app for seeing when the next bus arrives at my work.

## Installation

This applet relies on the OneBusAway API and thus only works in cities where the API is supported. That being said, it's a very simple app and it would be fairly easy to swap out the API for whatever real-time transit API you'd like!

**To install:**

Install BitBar, [following these directions](https://github.com/matryer/bitbar#get-started).

Clone this repo to the plugin directory you set above.

[Use this map](http://onebusaway.org/where/standard/) to find the #ID of the bus stop you'd like to track.

In index.js, change the value of the `busStop` variable to the #ID.

In the root directory, run:
```
npm i
```

