const express = require('express');
const adminController = require('../controllers/adminController');

let router = express.Router();

router.get("/services", adminController.getAllServices);
router.get("/service/:id", adminController.getServiceById);
router.post("/service", adminController.createService);
router.patch("/service/:id", adminController.updateService);
router.delete("/service/:id", adminController.deleteService);

module.exports = router;
