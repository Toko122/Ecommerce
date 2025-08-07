const express = require('express')
const router = express.Router()
const { LoginUser, RegisterUser } = require('../controllers/userController')
const {googleLogin} = require('../controllers/googleAuthController')

router.post('/login', LoginUser)
router.post('/register', RegisterUser)
router.post('/google-login', googleLogin)
module.exports = router