const express = require('express');
const router = express.Router();
const weineController = require('../controllers/weineController');

// Routen für Weine
router.get('/weine', weineController.getWeine);

module.exports = router;
