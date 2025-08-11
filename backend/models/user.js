const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, unique: true},
    password: {type: String},
    googleId: {type: String, unique: true, sparse: true},
    resetToken: {type: String},
    resetTokenExpire: {type: Date},
    isAdmin: {type: Boolean, default: false}
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)