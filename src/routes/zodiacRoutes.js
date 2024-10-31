const express = require('express');
const userController = require('../controllers/userController');
const zodiacController = require('../controllers/zodiacController');
let router = express.Router();

router.get("/calculate-zodiac", userController.calculateZodiac);
router.get("/zodiac-elements", zodiacController.getAllZodiacs)
module.exports = router;
