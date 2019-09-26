'use strict'

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var songSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    src: {
        type: String
    },

    image: {
        type: String
    },

    artist: [{
        type: Schema.Types.ObjectId,
        ref: 'Artist'
    }],

    lyric: {
        type: String
    }
});

songSchema.plugin(timestamps);

module.exports = mongoose.model('Song', songSchema);