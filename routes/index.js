var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send({'version' : '0.0.1'});
});

module.exports = router;
