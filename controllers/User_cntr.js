/** @format */

const User = require('../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { serverMsg } = require('../constants/messages');
const logger = require('../utils/logger');

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
        .json({ errors: [{ msg: serverMsg.error.exists }] });
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

    res.json({
      success: { msg: serverMsg.success.create, data: user },
    });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ errors: { msg: serverMsg.error.serverError } });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findOneAndRemove({ _id: req._id });
    res.json({ msg: serverMsg.success.delete });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ errors: { msg: serverMsg.error.serverError } });
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
      res.json(serverMsg.success.update);
    }
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ errors: { msg: serverMsg.error.serverError } });
  }
};

module.exports = {
  createUser,
  deleteUser,
  updateUser,
};
