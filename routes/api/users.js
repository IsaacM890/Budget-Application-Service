/** @format */

const express = require('express');
const User_Cntr = require('../../controllers/User_cntr');
const router = express.Router();

// @route    POST api/users/register
// @desc     Register User
// @access   Public

router.post('/register', User_Cntr.validationChecks, User_Cntr.createUser);

// @route    DELETE api/transactions
// @desc     Delete User
// @access   public

router.delete('/', User_Cntr.deleteUser);

// @route    PUT api/transactions
// @desc     Update User
// @access   public

router.put('/', User_Cntr.validationChecks, User_Cntr.deleteUser);
module.exports = router;
