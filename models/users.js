var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
});

module.exports = mongoose.model('users',userSchema);