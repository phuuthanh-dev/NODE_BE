const express = require('express');
const FengShuiController = require('../controllers/fengShuiController');

let router = express.Router();

router.post("/calculation-feng-shui", FengShuiController.calculateFengShui);

module.exports = router;
