'use strict'

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var categorySchema = new mongoose.Schema({
    
});

categorySchema.plugin(timestamps);

module.exports = mongoose.model('Category', categorySchema);