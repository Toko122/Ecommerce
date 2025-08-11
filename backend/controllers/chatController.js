const Chat = require('../models/chat')
const Message = require('../models/message')

exports.getMyChat = async (req, res) => {
     const chat = await Chat.findOne({user: req.user._id})
     if (!chat) return res.status(404).json({ message: 'No chat found' })

     const messages = await Message.findOne({chat: chat._id})
     .populate('sender', 'username isAdmin')

     res.json({ chat, messages });
}

exports.getAllChats = async (req, res) => {
     if(!req.user.isAdmin) return res.status(403).json({ message: 'Forbidden' });
     const chats = await Chat.find().populate('user', 'username email')
     res.json(chats)
}