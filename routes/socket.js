var express = require('express');
var router = express.Router();

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('new user connected');
        socket.on('clientSendDataObject', data => {
            console.log(data);
            switch (data.command) {
                case 'TRANSFER_COMMENTS':
                    io.emit('serverSendDataObject', data);
                    break;
                default:
                    break;
            }

        });
    })
    return router;
}