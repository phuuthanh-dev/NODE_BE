const express = require('express');
const advertisementController = require('../controllers/advertisementController');
const {verifyToken} = require('../middleware/auth');
let router = express.Router();

router.get('/blogs', advertisementController.getAllAdvertisement);
router.get('/blog/:id', advertisementController.getAdvertisementById);
router.post('/blog', verifyToken, advertisementController.createAdvertisement); 

module.exports = router;
