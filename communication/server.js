
require('dotenv').config();

const express = require('express');
const socket = require('socket.io');
const app = express();

var pairs = [];

app.use(express.json());
app.use('/api/communications', require('./routes/communications'));

//starting server
const PORT = process.env.COMMUNICATION_SERVER_PORT;
const server = app.listen(PORT, () => {
    console.log(`communication server started on port ${PORT}...`);
});

//establishing connection
const io = socket(server);
io.on('connection', (socket) => {
    console.log('socket connected...', socket.id);

    setInterval(function() {
        if(pairs.length != 0) {
            socket.emit('transfer-pairs', pairs);
            pairs.splice(0, pairs.length);
        }
    }, 1000);
    
});

module.exports.pairs = pairs;