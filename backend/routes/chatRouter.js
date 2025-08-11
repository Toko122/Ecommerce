const express = require('express');
const { protect } = require('../middleware/protect');
const { getMyChat, getAllChats } = require('../controllers/chatController');
const { model, models } = require('mongoose');

const router = express.Router();

router.get('/myChat', protect, getMyChat)
router.get('/adminChat', protect, getAllChats)

module.exports = router