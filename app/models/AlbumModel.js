'use strict'

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var albumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: 'image-album-defaut.jpg'
    },

    description: {
        type: String
    },

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }],

    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        required: true
    }]

});

albumSchema.plugin(timestamps);

module.exports = mongoose.model('Album', albumSchema);