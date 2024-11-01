const express = require('express');
const consultationController = require('../controllers/consultationController');

let router = express.Router();

router.get('/consultations', consultationController.getAllConsultations);
router.patch('/consultations/:id/status', consultationController.changeConsultationStatus);
router.get('/consultations/:id', consultationController.getConsultationById);
router.post('/consultations/:id/property', consultationController.addPropertyToConsultation);
router.get('/consultations/user/:id', consultationController.getConsultationsByUserId);

module.exports = router;