const modals = require('./backend/routes/modals');
const cars = require('./backend/routes/cars');

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/carinventory', { useNewUrlParser: true })
    .then(() => console.log("Connected to mongodb database!"))
    .catch((err) => console.log("Failed to connect to mongodb databse", err));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});
app.use(express.json());
app.use('/api/modals', modals);
app.use('/api/cars', cars);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on http://localhost:${port}`));