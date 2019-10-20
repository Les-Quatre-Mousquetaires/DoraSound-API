'use strict'

const SongModel = require('../models/SongModel');
const UserModel = require('../models/UserModel');
const { grantPermission } = require('../commons/grantPermisson');

module.exports = {
    index: async (req, res, next) => {
        let { permission } = grantPermission('read:song', null, null);
        if (!permission.granted) next();
        else {
            let songs = await SongModel.find();
            if (songs) {
                res.status(200).json(songs);
            } else next();
        }
    },
    new: async (req, res, next) => {
        let { permission } = grantPermission('create:song', req.user, null);
        if (!permission.granted) next();
        else {
            let user = await UserModel.findById(req.user._id);
            let song = new SongModel({
                ...req.body,
                creator: user._id
            });
            user.songs = [...user.songs, song._id];
            user.save();
            song.save().then(result => {
                res.status(201).json(result);
            }).catch(err => {
                next();
            });
        }

    },
    view: async (req, res, next) => {
        let { resourceId } = req.params;
        let song = await SongModel.findById(resourceId);
        if (song) {
            res.status(200).json(song);
        } else next();
    },
    update: async (req, res, next) => {
        let { resourceId } = req.params;
        let { permission } = grantPermission('update:song', req.user, resourceId);
        if (!permission.granted) next();
        else {
            let songContent = req.body;
            let song = await SongModel.findByIdAndUpdate({ _id: resourceId }, { $set: songContent }, { new: true });
            if (song) {
                res.status(201).json(song);
            } else next();
        }
    },
    delete: async (req, res, next) => {
        let { resourceId } = req.params;
        let { permission } = grantPermission('update:song', req.user, resourceId);
        if (!permission.granted) next();
        else {
            let song = await SongModel.findOneAndDelete({ _id: resourceId }).catch(err => { res.status(500).json({ message: err.errmsg }) });
            if (song)
                res.status(202).json({ message: `Deleted song id: ${song._id}` });
            else next();
        }
    }
}