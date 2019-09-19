'use strict'

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var artistSchema = new mongoose.Schema({
    
});

artistSchema.plugin(timestamps);

module.exports = mongoose.model('Artist', artistSchema);