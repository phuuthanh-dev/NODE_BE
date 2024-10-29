const express = require('express');
const directionController = require('../controllers/directionController');

let router = express.Router();

router.get("/directions", directionController.getAllDirections);
router.post("/direction", directionController.createDirection);
router.get("/directionByDestiny/:destiny", directionController.getDirectionBydestiny);

module.exports = router;
