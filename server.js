/** @format */
const express = require('express');
const connectDB = require('./config/db');

const app = express();
// Connect DataBase
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

//
app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/transactions', require('./routes/api/transactions'));
app.use('/api/cards', require('./routes/api/cards'));
app.use('/api/charts', require('./routes/api/charts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
