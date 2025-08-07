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
const User = require('./models/user')
const jwt = require('jsonwebtoken')


app.use(express.json())
app.use(cors({
  origin: [
    'https://ecommerce-nine-beige-73.vercel.app',
    'https://ecommerce-kboc.onrender.com'
  ], 
  credentials: true
}))
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
     async (accessToken, refreshToken, profile, done) => {
       try {
         console.log('Google Profile: ', profile)
         
         // Check if user exists by email or googleId
         let user = await User.findOne({ 
           $or: [
             { email: profile.emails[0].value },
             { googleId: profile.id }
           ]
         })
         
         if (!user) {
           // Create new user
           user = await User.create({
             email: profile.emails[0].value,
             username: profile.displayName,
             password: 'google-oauth-' + Date.now(), // Unique password for Google users
             googleId: profile.id
           })
         } else if (!user.googleId) {
           // Update existing user with googleId
           user.googleId = profile.id
           await user.save()
         }
         
         return done(null, user)
       } catch (error) {
         console.error('Google OAuth error:', error)
         return done(error, null)
       }
     }
))

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/login'}),
    (req, res) => {
      try {
        const user = req.user
        const token = jwt.sign({id: user.id}, process.env.JWT, {expiresIn: "2d"})
        
        res.redirect(`https://ecommerce-nine-beige-73.vercel.app/oauth-success?token=${encodeURIComponent(token)}&name=${encodeURIComponent(user.username)}&email=${encodeURIComponent(user.email)}`)
      } catch (error) {
        console.error('OAuth callback error:', error)
        res.redirect('https://ecommerce-nine-beige-73.vercel.app/login?error=oauth_failed')
      }
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