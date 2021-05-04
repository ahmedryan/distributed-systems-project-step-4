
const mongoose = require('mongoose');

const rating_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
}); 

const rating_model = mongoose.model('ratings', rating_schema);

module.exports = rating_model;