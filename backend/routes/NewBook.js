const express = require('express');
const router = express.Router();
const { GetAllBooks, GetBook, AddNewBook, DeleteBook , views } = require('../controller/books')
const auth = require('../config/jwttoken');
router.get('/', GetAllBooks);
router.post('/', GetBook);
router.post('/view', views);
router.post('/add', auth, AddNewBook);
router.delete('/id', auth, DeleteBook);

module.exports = router