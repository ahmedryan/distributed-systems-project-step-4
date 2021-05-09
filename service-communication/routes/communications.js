
const express = require('express');
const storage = require('../server');
const router = express.Router();

router.post('/', async (req, res) => {
    storage.pairs.push(...req.body.pairs);
    return res.status(200).end();
});

module.exports = router;