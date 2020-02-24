const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_I = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    token:{
        type:String,
        required: true
    }
});


userSchema.pre('save', function(next){
    var user = this;

    if( user.isModified('password')){
        bcrypt.genSalt(SALT_I,function(err, salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password,salt,function(err, hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(candidatePassword, cb){
    var user = this;
    bcrypt.compare(candidatePassword,user.password,function(err, isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    });
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    let token = jwt.sign(user._id.toHexString(),'supersecret');

    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
}

userSchema.statics.findByToken = function(token,cb){
    var user = this;
    jwt.verify(token,'supersecret',(err,decode)=>{
        if(err) return cb(err);
        user.findOne({'_id': decode,'token':token},(err,user)=>{
            if(err) return cb(err);
            cb(null, user)
        })
    })
}

userSchema.methods.deleteToken = function(token,cb){
    var user = this;

    user.updateOne({$unset: { token: 1 }},(err,user)=>{
        if(err) return cb(err);
        cb(null,user);
    })
}


const User = mongoose.model('User',userSchema);
module.exports = { User };