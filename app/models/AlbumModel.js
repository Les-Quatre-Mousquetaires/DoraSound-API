'use strict'

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var albumSchema = new mongoose.Schema({

});

albumSchema.plugin(timestamps);

module.exports = mongoose.model('Album', albumSchema);