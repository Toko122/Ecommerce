const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    unreadCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Chat', ChatSchema);
