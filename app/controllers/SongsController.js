'use strict'

const SongModel = require('../models/SongModel');
const UserModel = require('../models/UserModel');
const { grantPermission } = require('../commons/grantPermisson');
const { customFilter } = require('../commons/objectEditor');

module.exports = {
    index: async (req, res, next) => {
        let { permission } = grantPermission('read:song', req.user, null);
        if (!permission.granted) next();
        else {
            let songs = await SongModel.find();
            if (songs) {
                let { resData } = customFilter(permission, songs);
                res.status(200).json(resData);
            } else next();
        }
    },
    new: async (req, res, next) => {
        let { permission } = grantPermission('create:song', req.user, null);
        if (!permission.granted) next();
        else {
            let storagedName = req.reqFile.filter(file => file.type === 'audio')[0].storagedName;
            let image = req.reqFile.filter(file => file.type === 'image')[0].storagedName;
            let user = await UserModel.findById(req.user._id);
            let song = new SongModel({
                ...req.body,
                src: storagedName,
                image: image,
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
        let { permission } = grantPermission('read:song', req.user, resourceId);
        if (!permission.granted) next();
        let song = await SongModel.findById(resourceId);
        if (song) {
            let { resData } = customFilter(permission, song);
            res.status(200).json(resData);
        } else next();
    },
    update: async (req, res, next) => {
        let { resourceId } = req.params;
        let { permission } = grantPermission('update:song', req.user, resourceId);
        if (!permission.granted) next();
        else {
            let image = req.reqFile.filter(file => file.type === 'image')[0].storagedName;
            let songContent = {
                ...req.body,
                image: image
            };

            let song = await SongModel.customUpdate(resourceId, songContent);
            if (song) {
                let { resData } = customFilter(permission, song);
                res.status(201).json(resData);
            } else next();
        }
    },
    delete: async (req, res, next) => {
        let { resourceId } = req.params;
        let { permission } = grantPermission('delete:song', req.user, resourceId);
        if (!permission.granted) next();
        else {
            let song = await SongModel.findOneAndDelete({ _id: resourceId }).catch(err => { res.status(500).json({ message: err.errmsg }) });
            if (song)
                res.status(202).json({ message: `Deleted song id: ${song._id}` });
            else next();
        }
    }
}