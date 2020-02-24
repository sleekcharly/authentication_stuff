const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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


// routes
app.post('/api/user', (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    user.save((err, doc) => {
        if(err) res.status(400).send(err);
        res.status(200).send(doc);
    });
});

app.post('/api/user/login', (req, res) => {
    User.findOne({'email': req.body.email}, (err, user) => {
        if(!user) return res.json({message: 'User not found'});

        user.comparePassword(req.body.password, function(err, isMatch){
            if(err) throw err;
            if(!isMatch) return res.status(400).json({
                message: 'Wrong password'
            })
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                res.cookie('Auth', user.token).send('ok');
            });
        })
    })
})



const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Started at port ${port}`)
});