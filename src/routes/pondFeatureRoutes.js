const express = require('express');
const pondFeatureController = require('../controllers/pondFeatureController')

let router = express.Router();

router.get("/pond-features", pondFeatureController.getAllPondFeatures)
router.post("/pond-feature", pondFeatureController.createPondFeature)
router.patch("/update-pond-feature/:id", pondFeatureController.updatePondFeature)
router.get("/get-pond-feature-by-target-type/:targetType", pondFeatureController.getPondFeatureByTargetType)

module.exports = router;