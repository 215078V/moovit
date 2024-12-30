const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');


const app = express();

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Express Backend!');
});

module.exports = app;
