const express = require('express')
const app = express()
const mongoDb = require('mongoose')
const cors = require('cors')

const session = require('express-session')
const passport = require('passport')

const dotenv = require('dotenv')
dotenv.config()

const userRouter = require('./routes/userRouter')
const cartRouter = require('./routes/cartRouter')
const emailRouter = require('./routes/emailRouter')

require('./controllers/googleAuthController')

app.use(express.json())
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,}))

  app.use(session({
    secret: process.env.MYSECRET,
    resave: false,
    saveUninitialized: false
  }))
  
  app.use(passport.initialize())
  app.use(passport.session())

  const authRouter = require('./routes/authRouter')
  app.use('/auth', authRouter)


app.use('/api/users', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/email', emailRouter)

mongoDb.connect(process.env.MONGODB)
  .then(() => {
    console.log(`✅ Backend Connected to MongoDB`);
    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });