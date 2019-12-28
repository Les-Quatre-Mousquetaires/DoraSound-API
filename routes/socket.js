var express = require('express');
var router = express.Router();
var Song = require('../app/models/SongModel');
var moment = require('moment');
var _ = require('lodash');

module.exports = (io) => {
    io.on('connection', async (socket) => {
        let calculateVoting = async () => {
            let songs = await Song.find().lean();

            // let _songs = await Song.find().select('_id');
            // console.log('Song',_songs);
            // let resData = {
            //     voters: []
            // };
            // _songs.map(async song => {
            //     let tempSong = await Song.findByIdAndUpdate({_id: song._id},
            //         {$set: resData},
            //         {new: true});
            // });
            songs = songs.map(song => {
                let point = song.voters.length / Math.pow((moment().subtract(song.updatedAt).unix() / 3600000), 0.64);
                return {
                    ...song,
                    point: point
                }
            });
            let _songs = JSON.parse(JSON.stringify(songs));
            let _results = _.orderBy(_songs, ['point'], ['desc']);
            _results.splice(10, _results.length - 10);
            return _results;
        };

        console.log('new user connected');
        io.emit('TRANSFER_VOTING', await calculateVoting());
        socket.on('clientSendDataObject', async (data) => {
            console.log(data);
            switch (data.command) {
                case 'TRANSFER_COMMENTS':
                    io.emit('serverSendDataObject', data);
                    break;
                case 'TRANSFER_VOTING':
                    let voters = [];
                    let song = await Song.findById(data.payload.songId).select('voters updatedAt');
                    voters = [...song.voters];
                    if (data.payload.voteUp == true) {
                        voters = JSON.parse(JSON.stringify(voters));
                        if (!voters.includes(data.payload.userId)) {
                            voters.push(data.payload.userId);
                        }
                    } else {
                        if (!voters.includes(data.payload.userId)) {
                            voters.splice(data.payload.userId, 1);
                        }
                    }
                    let resData = {
                        voters: voters
                    };
                    await Song.findByIdAndUpdate({ _id: song._id },
                        { $set: resData },
                        { new: true });
                    io.emit('TRANSFER_VOTING', await calculateVoting());
                    break;
                default:
                    break;
            }

        });
    })
    return router;
}