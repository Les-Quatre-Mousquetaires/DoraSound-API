'use strict'

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var fs = require('fs');
var path = require('path');
var { staticPath } = require('../../config/index');
var Schema = mongoose.Schema;

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
    },

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

songSchema.plugin(timestamps);

songSchema.statics = {
    customUpdate(id, values) {
        return new Promise(async (resolve, reject) => {
            let preSong = await this.findById(id).lean();
            if (values.image && fs.existsSync(path.join(global.appRoot, staticPath.images, preSong.image))) {
                fs.unlink(path.join(global.appRoot, staticPath.images, preSong.image), () => { });
            }
            let song = this.findByIdAndUpdate({ _id: id }, { $set: values }, { new: true });
            if (!song) {
                return reject({ message: 'not found' });
            } else resolve(song);
        })
    }
}

module.exports = mongoose.model('Song', songSchema);