/** @format */

const express = require('express');
const router = express.Router();

// @route    GET api/cards
// @desc     Test route
// @access   Public
router.get('/', (req, res) => res.send('Card route'));

module.exports = router;
