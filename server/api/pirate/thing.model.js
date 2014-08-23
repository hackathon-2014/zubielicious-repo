'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PirateSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Pirate', PirateSchema);
