const bcrypt = require('bcrypt');
'12345678'

bcrypt.genSalt(10, function(err, salt){
    if(err) return next(err);
    bcrypt.hash('12345678', salt, function(err, hash){
        console.log(hash);
    })
});