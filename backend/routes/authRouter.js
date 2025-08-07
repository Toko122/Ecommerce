const express = require('express')
const passport = require('passport')
const router = express.Router()
const {googleLogin} = require('../controllers/googleAuthController')

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/login` }),
  (req, res) => {
    const { name, email } = req.user
    const redirectUrl = `${process.env.FRONTEND_URL}/oauth-success?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`
    res.redirect(redirectUrl)
  })

  router.post('/google-login', googleLogin)

module.exports = router
