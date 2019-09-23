'use strict'

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var commentSchema = new mongoose.Schema({
    content: {
        type: String
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

commentSchema.plugin(timestamps);

module.exports = mongoose.model('Comment', commentSchema);