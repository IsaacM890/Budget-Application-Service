/** @format */

const mongoose = require('mongoose');
const logger = require('../utils/logger');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    logger.info('MongoDB Connected...!');
  } catch (err) {
    logger.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
