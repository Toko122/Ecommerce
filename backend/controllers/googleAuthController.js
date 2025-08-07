const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/user')
const jwt = require('jsonwebtoken')

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
},
(accessToken, refreshToken, profile, done) => {
  const userData = {
    name: profile.displayName,
    email: profile.emails[0].value,
  }
  done(null, userData)
}))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

exports.googleLogin = async(req, res) => {
     const {email, name} = req.body
     try{
        let user = await User.findOne({email})

        if (!user) {
            user = await User.create({ name, email })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: '2d' })
        res.json({ token })

     }catch(err){
        console.error(err)
        res.status(500).json({ message: 'Google login failed' })
     }
}