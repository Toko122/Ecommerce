const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    chat: {type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true},
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    text: {type: String, required: true},
    read: {type: Boolean, default: false}
})


module.exports = mongoose.model('Message', MessageSchema);