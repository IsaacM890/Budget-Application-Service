/** @format */

const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const validationChecks = [
  check('first_name', 'First name is required')
    .not()
    .isEmpty()
    .isLength({ min: 2 }),
  ,
  check('last_name', 'Last name is required')
    .not()
    .isEmpty()
    .isLength({ min: 2 }),
  ,
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
];

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    first_name,
    last_name,
    email,
    password,
    avatar,
    current_balance,
    current_balance_currency,
    credit_cards,
  } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User is already exists' }] });
    }

    user = new User({
      first_name,
      last_name,
      email,
      password,
      avatar,
      current_balance,
      current_balance_currency,
      credit_cards,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.send('User Registered');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findOneAndRemove({ _id: req._id });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    first_name,
    last_name,
    email,
    password,
    avatar,
    current_balance,
    current_balance_currency,
    credit_cards,
  } = req.body;

  const newUserDetails = {
    first_name,
    last_name,
    email,
    password,
    avatar,
    current_balance,
    current_balance_currency,
    credit_cards,
  };
  try {
    const user = await User.findOne({ email });
    if (user) {
      user = new User(newUserDetails);
      await user.save();
      res.send('User Updated');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  validationChecks,
  createUser,
  deleteUser,
  updateUser,
};
