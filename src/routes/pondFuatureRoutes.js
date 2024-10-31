const express = require('express');
const pondFuatureController = require('../controllers/pondFutureController')

let router = express.Router();

router.get("/pond-features", pondFuatureController.getAllPondFeatures)
router.post("/pond-feature", pondFuatureController.createPondFeature)
router.patch("/update-pond-feature/:id", pondFuatureController.updatePondFeature)
router.get("/get-pond-feature-by-target-type/:targetType", pondFuatureController.getPondFeatureByTargetType)

module.exports = router;