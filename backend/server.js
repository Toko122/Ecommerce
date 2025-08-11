const express = require('express')
const app = express()
const mongoDb = require('mongoose')
const cors = require('cors')
const http = require('http')
const {Server} = require('socket.io')

const jwt = require('jsonwebtoken')

const dotenv = require('dotenv')
dotenv.config()

const User = require('./models/user');
const Chat = require('./models/chat');
const Message = require('./models/message');

const userRouter = require('./routes/userRouter')
const cartRouter = require('./routes/cartRouter')
const emailRouter = require('./routes/emailRouter')
const authRouter = require('./routes/chatRouter')
const message = require('./models/message')


require('./controllers/googleAuthController')

app.use(express.json())
app.use(cors({
  origin: 'https://ecommerce-nine-beige-73.vercel.app',
  credentials: true
}))


app.use('/api/users', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/email', emailRouter)
app.use('/api', authRouter)

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'https://ecommerce-nine-beige-73.vercel.app',
    credentials: true 
  }
})

mongoDb.connect(process.env.MONGODB)
  .then(() => {
    console.log(`✅ Backend Connected to MongoDB`);
    const PORT = 5000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })

  const userSocketMap = new Map()

  io.use(async(socket, next) => {
      try{
       const token = socket.handshake.auth?.token
       if (!token) return next(new Error('No token'));

       const payload = jwt.verify(token, process.env.JWT)
       const user = await User.findById(payload.id)
       if (!user) return next(new Error('Invalid user'));

       socket.user = user
       next()

      }catch (err) {
        next(new Error('Auth error'));
    }
  })

  io.on('connection', (socket) => {
     const user = socket.user
     userSocketMap.set(String(user._id), socket.id)

     const room = `chat_${user._id}`
     socket.join(room)

     if(user.isAdmin){
         socket.join('admins')
         Chat.find().then(chats => chats.forEach(c => socket.join(`chat_${c.user}`)))
     }

     socket.on('user:message', async({text}) => {
         if(user.isAdmin) return;

         const chat = await Chat.findOne({user: user._id}) || await Chat.create({user: user._id})
         const msg = await Message.create({chat: chat._id, sender: user._id, text})

         chat.unreadCount += 1
         await chat.save()

         io.to('admins').emit('new:message', {chatId: chat._id, message: msg, user: {id: user._id, username: user.username}})
         socket.emit('message:sent', {message: msg})
     })

     socket.on('admin:message', async ({userId, text}) => {
          if(!user.isAdmin) return

          const chat = await Chat.findOne({user: userId})
          if (!chat) return;

          const msg = await Message.create({chat: chat._id, sender: user._id, text})
          io.to(`chat_${userId}`).emit('message:received', {message: msg})
          socket.emit('admin:sent', {message: msg})

     } )

        socket.on('disconnect', () => {
           userSocketMap.delete(String(user._id))
        })

  })