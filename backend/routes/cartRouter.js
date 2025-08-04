const {protect} = require('../middleware/protect.js')

const express = require('express')
const router = express.Router()
const {getCartQuiantity, addToCart, deleteCart} = require('../controllers/cartController')



router.post('/addToCart', protect, addToCart)
router.get('/getCart', protect, getCartQuiantity)
router.delete('/deleteCart', protect, deleteCart)

module.exports = router