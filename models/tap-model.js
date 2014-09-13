var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var tapSchema= new Schema({
  name: {
    type: String,
    required: true
  },
  geolocation: [],
  description: {
    type: String,
    required: true
  },
  creationDate: {type: Date, 'default': Date.now},
});

tapSchema.index({ geolocation: '2d' });

module.exports = mongoose.model('Tap', tapSchema);