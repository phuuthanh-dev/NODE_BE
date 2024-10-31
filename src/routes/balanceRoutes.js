const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balanceController');

const { verifyToken } = require('../middleware/auth');

router.post(
  '/deposit',
  verifyToken,
  balanceController.deposit
);

module.exports = router;
