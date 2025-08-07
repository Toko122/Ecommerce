const express = require('express')
const app = express()
const mongoDb = require('mongoose')

const passport = require('passport')
const session = require('express-session')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const cors = require('cors')



const dotenv = require('dotenv')
dotenv.config()

const userRouter = require('./routes/userRouter')
const cartRouter = require('./routes/cartRouter')
const emailRouter = require('./routes/emailRouter')


app.use(express.json())
app.use(cors({origin: 'https://ecommerce-nine-beige-73.vercel.app', credentials: true}))
app.use(session({secret: process.env.MYSECRET, resave: false, saveUninitialized: false}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(new GoogleStrategy(
     {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: 'https://ecommerce-kboc.onrender.com/auth/google/callback'
    },
     (accesToken, refreshToken, profile, done)=>{
       console.log('Google Profile: ', profile)
       return done(null, profile)
     }
))

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/login'}),
    (req, res) => {
      const { displayName, emails } = req.user
      const name = displayName
      const email = emails?.[0]?.value

      res.redirect(`https://ecommerce-nine-beige-73.vercel.app/oauth-success?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`)
    }
)

app.get('/logout', (req, res) => {
   req.logout()
   res.redirect('/')
}) 

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