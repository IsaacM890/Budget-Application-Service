/** @format */
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const logger = require('./utils/logger');
const app = express();

// Connect DataBase

connectDB();

// Init Middleware
app.use(cors());

app.use(express.json({ extended: false }));
//
app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/transactions', require('./routes/api/transactions'));
app.get('/healthcheck', (req, res) => {
  return res.status(200).send('running....');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));
