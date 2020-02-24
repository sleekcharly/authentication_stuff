const bcrypt = require('bcrypt');
const {MD5} = require('crypto-js');
const jwt = require('jsonwebtoken');

// 'password123'


// bcrypt.genSalt(10,function(err,salt){
//     if(err) return next(err);
//     bcrypt.hash('password123',salt,function(err, hash){
//         console.log(hash);
//     })
// })

let id = '100';
const secret = "supersecret";

const token = jwt.sign(id,secret);
const decodedToken = jwt.verify(token,secret + 'ss' )

console.log(token)
console.log(decodedToken)