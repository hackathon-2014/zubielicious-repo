'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// _id for owner key
var PirateSchema = new Schema({
  name: String,
  owner: String,
  hunger: Number,
  thirst: Number,
  health: Number,
  happiness: Number,
  energy: Number
});

module.exports = mongoose.model('Pirate', PirateSchema);
