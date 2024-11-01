const express = require('express');
const advertisementController = require('../controllers/advertisementController');
const {verifyToken} = require('../middleware/auth');
let router = express.Router();

router.get('/blogs', advertisementController.getAllAdvertisement);
router.get('/blog/:id', advertisementController.getAdvertisementById);
router.patch('/blog/:id', verifyToken, advertisementController.updateAdvertisement);
router.post('/blog', verifyToken, advertisementController.createAdvertisement); 
router.get('/my-blogs', verifyToken, advertisementController.getMyAdvertisement);
router.post('/create-blog-by-user', verifyToken, advertisementController.createAdvertisementByUser);

module.exports = router;
