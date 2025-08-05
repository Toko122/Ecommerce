const express = require('express')
const app = express()
const mongoDb = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()

const userRouter = require('./routes/userRouter')
const cartRouter = require('./routes/cartRouter')
const emailRouter = require('./routes/emailRouter')

app.use(express.json())
app.use(cors())

app.use('/api/users', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/email', emailRouter)

mongoDb.connect(process.env.MONGODB, {
     useNewUrlParser: true,
     useUnifiedTopology: true
}).then(() => {
    console.log(`Backend Connected Well`)
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
        console.log(`Server Running On ${PORT} Port`);
    })
})