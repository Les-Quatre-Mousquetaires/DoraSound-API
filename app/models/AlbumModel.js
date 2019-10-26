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
    },

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }]

});

albumSchema.plugin(timestamps);

module.exports = mongoose.model('Album', albumSchema);