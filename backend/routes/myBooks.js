const express = require('express');
const router = express.Router();
const { bookReaded, newBookRead,  bookmark , delbookmark , upBook } = require('../controller/readbooks')
const auth = require('../config/jwttoken')
router.post('/',bookReaded);
router.post('/del',delbookmark)
router.post('/newRead', auth, newBookRead);
router.post('/bookmark', auth, bookmark);
router.post('/up', upBook)

module.exports = router