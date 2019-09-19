'use strict'

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var songSchema = new mongoose.Schema({

});

songSchema.plugin(timestamps);

module.exports = mongoose.model('Song', songSchema);