/** @format */

const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const helpers = require('../constants/index');

const validationChecks = [
  check('first_name', helpers.getRequireText('First Name'))
    .not()
    .isEmpty()
    .isLength({ min: 2 }),
  ,
  check('last_name', helpers.getRequireText('Last Name'))
    .not()
    .isEmpty()
    .isLength({ min: 2 }),
  ,
  check('email', helpers.getValidText('Email')).isEmail(),
  check('password', helpers.getLengthText('password', '6')).isLength({
    min: 6,
  }),
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
  } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: helpers.serverMsg.failure.exists }] });
    }

    user = new User({
      first_name,
      last_name,
      email,
      password,
      avatar,
      current_balance,
      current_balance_currency,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.send(helpers.serverMsg.success.create);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(helpers.serverMsg.failure.serverError);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findOneAndRemove({ _id: req._id });
    res.json({ msg: helpers.serverMsg.success.delete });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(helpers.serverMsg.failure.serverError);
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
      res.send(helpers.serverMsg.success.update);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send(helpers.serverMsg.failure.serverError);
  }
};

module.exports = {
  validationChecks,
  createUser,
  deleteUser,
  updateUser,
};
