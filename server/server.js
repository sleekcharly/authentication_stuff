const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();


mongoose.connect('mongodb://localhost:27017/AuthApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('useCreateIndex', true);

// Middleware
app.use(bodyParser.json());

// model
const { User } = require('./models/user');




const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Started at port ${port}`)
});