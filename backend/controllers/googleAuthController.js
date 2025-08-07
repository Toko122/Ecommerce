const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

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