'use strict'

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    age: {
        type: Number
    },

    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }]
});

artistSchema.plugin(timestamps);

module.exports = mongoose.model('Artist', artistSchema);