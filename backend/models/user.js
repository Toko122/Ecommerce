const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    googleId: {type: String, unique: true, sparse: true},
    resetToken: {type: String},
    resetTokenExpire: {type: Date}
})

module.exports = mongoose.model('User', UserSchema)