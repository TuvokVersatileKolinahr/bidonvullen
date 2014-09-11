var express = require('express');
var router = express.Router();
var Tap = require('../models/tap-model');

router.get('/', function(req, res) {
  res.send({'version' : '0.0.1'});
});

router.get('/taps', function(req, res) {
  Tap.find(function(err, result) {
    res.send(result);
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
  new Tap({description: req.body.description, name: req.body.name, geolocation: req.body.geolocation}).save(function(err, tap) {
    res.send({'data' : tap});
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
