const express = require('express');
const userController = require('../controllers/userController');

let router = express.Router();

router.get("/calculate-zodiac", userController.calculateZodiac);

module.exports = router;
