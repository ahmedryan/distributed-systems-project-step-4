
const storage = require('../server');
const Pair = require('../models/pair');

function make_pair() {
    for(var i=storage.riders.length-1; i>=0; i--) {
        
        var _distance = [];
        for(var j=storage.drivers.length-1; j>=0; j--) {
            _distance.push(distance(
                storage.riders[i].rider_coordinate_x, storage.riders[i].rider_coordinate_y,
                storage.drivers[j].driver_coordinate_x, storage.drivers[j].driver_coordinate_y
            ));
        };

        var paired_rider_index = i;
        var paired_driver_index = _distance.indexOf(Math.min(..._distance));
        var paired_rider = storage.riders[paired_rider_index];
        var paired_driver = storage.drivers[paired_driver_index];
        var pair_fare = fare(paired_rider, paired_driver);
        
        var _pair = new Pair(paired_driver.driver_name, paired_rider.rider_name, pair_fare);

        storage.pairs.push(_pair);   
        storage.riders.splice(paired_rider_index, 1);
        storage.drivers.splice(paired_driver_index, 1); 
    }
};

function distance(rider_coordinate_x, rider_coordinate_y, driver_coordinate_x, 
    driver_coordinate_y) {

    return Math.sqrt(Math.pow(rider_coordinate_x-driver_coordinate_x, 2) + 
        Math.pow(rider_coordinate_y-driver_coordinate_y, 2));
};

function fare(rider, driver) {
    var _distance = distance(
        rider.rider_coordinate_x, rider.rider_coordinate_y,
        driver.driver_coordinate_x, driver.driver_coordinate_y
    );
    var _fare = _distance*2;

    return Math.round(_fare);
};

module.exports = make_pair;
