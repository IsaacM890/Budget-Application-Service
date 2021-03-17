/** @format */

const express = require('express');
const user_Cntr = require('../../controllers/User_cntr');
const router = express.Router();

// @route    POST api/users/register
// @desc     Create User
// @access   Public
router.post('/register',  user_Cntr.createUser);

// @route    DELETE api/transactions
// @desc     Delete User
// @access   public

router.delete('/', user_Cntr.deleteUser);

// @route    PUT api/transactions
// @desc     Update User
// @access   public

router.put('/', user_Cntr.updateUser);

module.exports = router;
