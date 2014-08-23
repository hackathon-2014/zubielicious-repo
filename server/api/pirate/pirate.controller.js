/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /pirate              ->  index
 * POST    /pirate              ->  create
 * GET     /pirate/:id          ->  show
 * PUT     /pirate/:id          ->  update
 * DELETE  /pirate/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Pirate = require('./Pirate.model');

// Get list of Pirates
exports.index = function(req, res) {
  Pirate.find(function (err, Pirates) {
    if(err) { return handleError(res, err); }
    return res.json(200, Pirates);
  });
};

// Get a single Pirate
exports.show = function(req, res) {
  Pirate.findById(req.params.id, function (err, Pirate) {
    if(err) { return handleError(res, err); }
    if(!Pirate) { return res.send(404); }
    return res.json(Pirate);
  });
};

// Creates a new Pirate in the DB.
exports.create = function(req, res) {
  Pirate.create(req.body, function(err, Pirate) {
    if(err) { return handleError(res, err); }
    return res.json(201, Pirate);
  });
};

// Updates an existing Pirate in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Pirate.findById(req.params.id, function (err, Pirate) {
    if (err) { return handleError(res, err); }
    if(!Pirate) { return res.send(404); }
    var updated = _.merge(Pirate, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, Pirate);
    });
  });
};

// Deletes a Pirate from the DB.
exports.destroy = function(req, res) {
  Pirate.findById(req.params.id, function (err, Pirate) {
    if(err) { return handleError(res, err); }
    if(!Pirate) { return res.send(404); }
    Pirate.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
