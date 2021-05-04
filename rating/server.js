
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use('/api/ratings', require('./routes/ratings'));

//starting server
const PORT = process.env.RATING_SERVER_PORT;
const server = app.listen(PORT, () => {
    console.log(`rating server started on port ${PORT}...`);
});

//connecting to database
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (e) => console.error(e));
db.once('open', () => console.log('Connected to Database...'));
