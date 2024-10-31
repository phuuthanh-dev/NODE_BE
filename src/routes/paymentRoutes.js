const express = require('express');
const router = express.Router();
const paymnentController = require('../controllers/paymnentController');

router.get('/vnpay-return', paymnentController.verifyReturnUrl);
router.get('/vnpay-ipn', paymnentController.verifyIPN);

module.exports = router;