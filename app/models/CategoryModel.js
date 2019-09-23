'use strict'

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    image: {
        type: String
    },

    description: {
        type: String
    }
});

categorySchema.plugin(timestamps);

module.exports = mongoose.model('Category', categorySchema);