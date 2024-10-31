const express = require('express');
const dashboardController = require('../controllers/dashboardController');

let router = express.Router();

router.get("/revenew", dashboardController.getRevenew);
router.get("/piechart", dashboardController.getPieChartData);
router.get("/barchart", dashboardController.getBarChartData);
router.get("/nearlyConsultation", dashboardController.getNearlyConsultation);


module.exports = router;
