var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var tapSchema= new Schema({
  name: {
    type: String,
    required: true
  },
  geolocation: {
    lat: Number,
    lng: Number
  },
  description: {
    type: String,
    required: true
  },
  creationDate: {type: Date, 'default': Date.now},
});

module.exports = mongoose.model('Tap', tapSchema);