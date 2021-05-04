
require('dotenv').config();

const io = require('socket.io-client');
const axios = require('axios');


const url_communication = process.env.URL_COMMUNICATION;
const socket = io.connect(url_communication);

const api_rating = process.env.API_RATING;
socket.on('transfer-pairs', (data) => {
    data.forEach(element => {
        axios.post(api_rating, {
            name: element.driver,
            rating: Math.floor((Math.random() * 5) + 1)
        }).then(res => {
            // console.log(`${element.driver.driver_name} paired with ${element.rider.rider_name} # fare is ${element.fare}`);
        }).catch(err => {
            console.log('error: ', err);
        });
    });

});

const driver_api = process.env.API_DRIVER;
const rider_api = process.env.API_RIDER; 

let count = 1;
setInterval(function() {
    let driver_coordinate_x = Math.floor((Math.random() * 100) + 1);
    let driver_coordinate_y = Math.floor((Math.random() * 100) + 1);
    let car_number = Math.floor((Math.random() * 10000) + 1000);
    let driver_name = 'driver-' + count;

    axios.post(driver_api, {
        driver_name: driver_name,
        driver_coordinate_x: driver_coordinate_x, 
        driver_coordinate_y: driver_coordinate_y,
        car_number: car_number
    }).then((res) => {
        // console.log(res.data);
    }).catch((error) => {
        console.log(error.errno);
    });

    let rider_coordinate_x = Math.floor((Math.random() * 100) + 1);
    let rider_coordinate_y = Math.floor((Math.random() * 100) + 1);
    let rider_destination_x = Math.floor((Math.random() * 100) + 1);
    let rider_destination_y = Math.floor((Math.random() * 100) + 1);
    let rider_name = 'rider-' + count;

    axios.post(rider_api, {
        rider_name: rider_name,
        rider_coordinate_x: rider_coordinate_x,
        rider_coordinate_y: rider_coordinate_y,
        rider_destination_x: rider_destination_x,
        rider_destination_y: rider_destination_y,
    }).then((res) => {
        // console.log(res.data);
    }).catch((error) => {
        console.log(error.errno);
    });

    count += 1;
}, 1000);

