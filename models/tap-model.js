var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var tapSchema= new Schema({
  name: {
    type: String,
    required: true
  },
  // geolocation: [],
  geolocation: {type: [Number], index: '2d'},
  description: {
    type: String,
    required: true
  },
  creationDate: {type: Date, 'default': Date.now},
});

// tapSchema.index({ geolocation: '2d' });
mongoose.set('debug', true);

module.exports = mongoose.model('Tap', tapSchema);