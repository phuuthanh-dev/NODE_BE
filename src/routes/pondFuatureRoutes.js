const express = require('express');
const pondFuatureController = require('../controllers/pondFutureController')

let router = express.Router();

router.get("/pond-features", pondFuatureController.getAllPondFuatures)
router.post("/pond-feature", pondFuatureController.createPondFuture)
router.patch("/update-pond-feature/:id", pondFuatureController.UpdatePondFuture)
router.get("/get-pond-feature-by-target-type/:targetType", pondFuatureController.getPondFuatueByTargetType)

module.exports = router;