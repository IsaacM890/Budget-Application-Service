/** @format */

const morgan = require('morgan');

module.exports = (req, res, next) => {
  morgan.info('Incoming request', { query: req.query });

  if (req.query.q === null) {
    const error = { error: 'No Query' };
    morgan.info('Request failed returning error ', error);
    return res.json(error);
  } else if (!req.query.q) {
    const error = { error: 'No Query' };
    morgan.info('Request failed returning error ', error);
    return res.json(error);
  }
  return next();
};
