/** @format */

const express = require('express');
const router = express.Router();
const user_Cntr = require('../../controllers/User_cntr');
const check = require('../../middleware/validations');

// @route    GET api/users/:id
// @desc     Get User by ID
// @access   Public

router.get('/:id', user_Cntr.getUserById);

// @route    POST api/users/register
// @desc     Create User
// @access   Public
//@@@TODO - FIX VALIDATION MIDDLEWARE ===>>> check.userChecks,

router.post('/register', user_Cntr.createUser);

// @route    DELETE api/transactions
// @desc     Delete User by ID
// @access   public

router.delete('/:id', user_Cntr.deleteUser);

// @route    PUT api/users
// @desc     Update User by ID
// @access   public

router.put('/:id', user_Cntr.updateUser);

module.exports = router;
