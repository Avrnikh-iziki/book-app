const express = require('express');
const router = express.Router();
const { allNot, delNot, readNot } = require('../controller/notification')
router.post('/', allNot);
router.post('/del', delNot);
router.post('/read', readNot);

module.exports = router


