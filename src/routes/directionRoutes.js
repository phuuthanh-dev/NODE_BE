const express = require('express');
const directionController = require('../controllers/directionController');

let router = express.Router();

router.get("/directions", directionController.getAllDirections);
router.post("/direction", directionController.createDirection);

module.exports = router;
