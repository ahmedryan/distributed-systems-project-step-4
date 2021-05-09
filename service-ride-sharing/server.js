
require('dotenv').config();

const express = require('express');
const make_pairs = require('./services/make-pair');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use('/api/riders', require('./routes/riders'));
app.use('/api/drivers', require('./routes/drivers'));

var riders = [];
var drivers = [];
var pairs = [];

let api_communication;
console.log(process.env.SERVER_LOCATION);
if (process.env.SERVER_LOCATION === 'dhaka') {
    api_communication = 'http://communication-dhaka:8080/api/communications/';
} else if (process.env.SERVER_LOCATION === 'chittagong') {
    api_communication = 'http://communication-ctg:8080/api/communications/';
}

setInterval(() => {
    make_pairs();

    if (pairs.length != 0) {
        axios.post(api_communication, {
            pairs: pairs
        }).then((res) => {
            console.log(res.data);
        }).catch((error) => {
            console.log(error);
        });

        pairs.splice(0, pairs.length);
    }
}, 5000);

const PORT = process.env.RIDE_SHARING_SERVER_PORT;
const server = app.listen(PORT, () => {
    console.log(`ride-sharing server started on port ${PORT}...`);
});

module.exports.riders = riders;
module.exports.drivers = drivers;
module.exports.pairs = pairs;
