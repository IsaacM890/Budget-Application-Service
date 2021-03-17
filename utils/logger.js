/** @format */

const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(format.timestamp(), format.simple()),
      
    }),
  ],
});
module.exports = logger;
