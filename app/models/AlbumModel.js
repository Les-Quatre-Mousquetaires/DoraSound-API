'use strict'

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var albumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    image: {
        type: String,
    },

    description: {
        type: String
    },

    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist'
    }
});

albumSchema.plugin(timestamps);

module.exports = mongoose.model('Album', albumSchema);