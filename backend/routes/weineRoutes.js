const express = require('express');
const router = express.Router();
const { getWeine } = require('../controllers/weineController');

router.get('/weine', getWeine);

module.exports = router;
