const express = require('express')
const router = express.Router()
const {sendEmail, resetPassword} = require('../controllers/userController')

router.post('/sendEmail', sendEmail)
router.post('/resetPassword/:token', resetPassword)

module.exports = router