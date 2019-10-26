'use strict'

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var User = require('./UserModel');
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

    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album'
    },

    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
        });
    },
    customDelete(id) {
        return new Promise(async (resolve, reject) => {
            let preSong = await this.findByIdAndDelete(id).lean();
            if (preSong) {
                let user = await User.findById(preSong.creator);
                user.songs = user.songs.filter(ids => ids != id);
                user.save();
                resolve(preSong);
            } else {
                reject({ message: 'Not found' });
            }

        });
    }
}

module.exports = mongoose.model('Song', songSchema);