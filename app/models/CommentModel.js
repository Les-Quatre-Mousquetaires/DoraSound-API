'use strict'

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var commentSchema = new mongoose.Schema({
    
});

commentSchema.plugin(timestamps);

module.exports = mongoose.model('Comment', commentSchema);