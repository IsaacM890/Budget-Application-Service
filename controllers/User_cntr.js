/** @format */

const User = require('../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { serverMsg } = require('../constants/messages');
const logger = require('../utils/logger');

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user || user.length == 0) {
      logger.error('User not found');
      return res
        .status(404)
        .json({ errors: [{ msg: serverMsg.error.noExists }] });
    }
    logger.info('User found');
    return res.status(200).json(user);
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ errors: { msg: serverMsg.error.serverError } });
  }
};

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    firstName,
    lastName,
    email,
    password,
    avatar,
    currentBalance,
    currentBalanceCurrency,
    creditCard,
  } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      logger.error('User already exists');
      return res
        .status(400)
        .json({ errors: [{ msg: serverMsg.error.exists }] });
    }

    user = new User({
      firstName,
      lastName,
      email,
      password,
      avatar,
      currentBalance,
      currentBalanceCurrency,
      creditCard,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    logger.info('User Registred');
    return res.json(user);
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ errors: { msg: serverMsg.error.serverError } });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({
      _id: req.params.id,
    });
    if (!user) {
      logger.error('Transaction not found');
      return res.status(400).json({
        errors: { msg: serverMsg.error.noFoundUser },
      });
    }
    logger.info('User Deleted');
    return res.json(serverMsg.success.delete);
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ errors: { msg: serverMsg.error.serverError } });
  }
};

const updateUser = async (req, res) => {
  try {
    const body = req.body;
    const user = await User.updateOne({ _id: req.params.id }, body);
    if (!user) {
      logger.error('There is not field to update');
      return res
        .status(400)
        .json({ errors: { msg: serverMsg.error.updateErr } });
    }
    logger.info('User Updated');
    return res.status(200).json({ msg: serverMsg.success.update });
  } catch (err) {
    logger.error(err.message);
    return res
      .status(500)
      .json({ errors: { msg: serverMsg.error.serverError } });
  }
};

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  getUserById,
};
