const bcrypt = require('bcrypt');
const{MD5} = require('crypto-js');
const jwt = require('jsonwebtoken');



// '12345678'

// bcrypt.genSalt(10, function(err, salt){
//     if(err) return next(err);
//     bcrypt.hash('12345678', salt, function(err, hash){
//         console.log(hash);
//     })
// });

let id = '100';
const secret = "supersecret";

const token = jwt.sign(id, secret);
const decodedToken = jwt.verify(token, secret)

console.log(token);
console.log(decodedToken);