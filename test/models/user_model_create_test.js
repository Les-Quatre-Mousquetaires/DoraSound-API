// gọi database trước khi test với models
require('../../db/database');
let User = require('../../app/models/UserModel');

let user = new User({
    name: 'Trần Phú Quý',
    username: 'tranphuquy19',
    email: 'asd4@gmail.com',
    password: 'root@123',
    admin: true
});
user.save().then(mess => {
    console.log(mess);
}).catch(err => {
    console.log(err);
});

//  MONGODB_HOSTNAME=cluster0-zyqpm.gcp.mongodb.net MONGODB_DATABASENAME=quy_test MONGODB_USERNAME=tranphuquy19 MONGODB_PASSWORD=root@123 node test/models/user_model_create_test.js
