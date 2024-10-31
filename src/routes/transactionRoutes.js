const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

const { verifyToken } = require('../middleware/auth');

router.get(
    '/my-transaction',
    verifyToken,
    transactionController.getMyTransaction
)

router.get(
    '/transaction/:code',
    verifyToken,
    transactionController.getTransactionByCode
)

router.get(
    '/transactions',
    verifyToken,
    transactionController.getAllTransactions
)

module.exports = router;