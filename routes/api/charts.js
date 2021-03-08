/** @format */

const express = require('express');
const router = express.Router();

// @route    GET api/charts
// @desc     Test route
// @access   Public
router.get('/', (req, res) => res.send('Chart route'));

module.exports = router;
