var express = require('express');
var router = express.Router();

module.exports = (io) => {
    io.on('connection', (socket)=> {
        console.log('new user connected');
        socket.on('BN9ziWLi4nIzkuRK', data => {
            io.emit('BN9ziWLi4nIzkuRK', data);
        });
    })
    return router;
}