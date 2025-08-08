const express = require('express')
const app = express()
const mongoDb = require('mongoose')
const cors = require('cors')


const dotenv = require('dotenv')
dotenv.config()

const userRouter = require('./routes/userRouter')
const cartRouter = require('./routes/cartRouter')
const emailRouter = require('./routes/emailRouter')
const googleRouter = require('./routes/authRouter')

require('./controllers/googleAuthController')

app.use(express.json())
app.use(cors())


app.use('/api/users', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/email', emailRouter)
app.use('/api/google', googleRouter)



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