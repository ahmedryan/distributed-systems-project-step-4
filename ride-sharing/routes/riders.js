
const express = require('express');
const storage = require('../server');
const Rider = require('../models/rider');

const router = express.Router();

router.post('/', (req, res) => {
    const rider = new Rider(
        req.body.rider_name, 
        req.body.rider_coordinate_x, 
        req.body.rider_coordinate_y, 
        req.body.rider_destination_x,
        req.body.rider_destination_y
    );

    storage.riders.push(rider);
    res.status(200).send(storage.riders);
});

module.exports = router;