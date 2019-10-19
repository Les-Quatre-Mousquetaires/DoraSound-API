'use strict'

const SongModel = require('../models/SongModel');
const UserModel = require('../models/UserModel');

module.exports = {
    index: async (req, res, next) => {
        let songs = await SongModel.find();
        if (songs) {
            res.status(200).json(songs);
        } else next();
    },
    new: async (req, res, next) => {
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
        })
    },
    view: async (req, res, next) => {
        let { resourceId } = req.params;
        let song = await SongModel.findById(resourceId);
        if (song) {
            res.status(200).json(song)
        } else next();
    },
    update: async(req, res, next) => {
        let {resourceId} = req.params;
        let songContent = req.body;
        let song = await SongModel.findByIdAndUpdate({_id: resourceId}, {$set: songContent}, {new: true});
        if(song){
            res.status(202).json(song);
        }else next();
    },
    delete: (req, res, next) => {

    }
}