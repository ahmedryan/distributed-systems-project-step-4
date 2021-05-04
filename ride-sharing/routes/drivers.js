
const express = require('express');
const storage = require('../server');
const Driver = require('../models/driver');

const router = express.Router();

router.post('/', (req, res) => {
    const driver = new Driver(
        req.body.driver_name, 
        req.body.driver_coordinate_x, 
        req.body.driver_coordinate_y, 
        req.body.car_number);

    storage.drivers.push(driver);
    return res.status(200).send(storage.drivers);
});

module.exports = router;