var express = require('express');
var router = express.Router();
var Tap = require('../models/tap-model');

router.get('/taps', function(req, res) {
  Tap.find(function(err, result) {
    res.send(result);
  });
});

router.get('/taps/prox/:location', function(req, res) {
  loc = { received: JSON.parse(req.params.location) };

  locar = [ loc.received.lat, loc.received.lng ];
  // You need to divide the maxdistance value by 111.12 (one degree is approximately 111.12 kilometers)
  // to convert the degree redius to km distance.
  // 0.1 / 111.12 = 0.00089928057 = 100 m
  // 0.5 / 111.12 = 0.00449964002 = 500 m
  // 5.5 / 111.12 = 0.04949604031 = 5,5 km
  // find( { geolocation: { "$near": [51.8349786, 5.8863487999999995], "$maxDistance": 0.00089928057 } } )
  Tap.find({geolocation: { "$near": locar, "$maxDistance": 0.04949604031 }}, function(err, result) {
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      // console.log("res", res);
      res.send({result: result});
    }
  });
});

router.get('/taps/:name', function(req, res) {
  Tap.findOne({'name': req.params.name}, function(err, result) {
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      res.send({result: result});
    }
  });
});

router.post('/taps', function(req, res) {
  var coord = req.body['geolocation'];//.split(',');

  new Tap({description: req.body.description, name: req.body.name, geolocation: coord}).save(function(err, tap) {
    if (!err) {
      res.send({'data' : tap});
    } else {
      res.status(500);
      res.send(err);
      console.log(err);
    }
  });
});

router.delete('/taps/:id', function(req, res) {
  return Tap.findById(req.params.id, function (err, tap) {
    return tap.remove(function (err) {
      if (!err) {
        res.send('');
      } else {
        res.status(500);
        res.send(err);
        console.log(err);
      }
    });
  });
});

module.exports = router;
