var express = require('express');
var router = express.Router();
var Tap = require('../models/tap-model');

/* GET home page. */
router.get('/', function(req, res) {
  res.send({'version' : '0.0.1'});
  // res.render('index', { title: 'Express' });
});

router.get('/taps', function(req, res) {
  Tap.find(function(err, result) {
    res.send(result);
  });
});

router.get('/taps/:author', function(req, res) {
  Tap.findOne({'author': req.params.author}, function(err, result) {
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      res.send({result: result});
    }
  });
});

router.post('/taps', function(req, res) {
  new Tap({action: req.body.action, author: req.body.author}).save(function(err, tap) {
    res.send({'data' : tap});
  });
});

router.delete('/taps/:id', function(req, res) {
  return Tap.findById(req.params.id, function (err, tap) {
    return tap.remove(function (err) {
      if (!err) {
        // console.log("removed");
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
