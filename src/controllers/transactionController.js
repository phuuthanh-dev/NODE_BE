const transactionService = require('../services/transactionService');

const getMyTransaction = async (req, res) => {
    try {
        return res.json(await transactionService.getMyTransaction(req.user.id));
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getTransactionByCode = async (req, res) => {
    return res.json(await transactionService.getTransactionByCode(req.params.code));
}

const getAllTransactions = async (req, res) => {
    return res.json(await transactionService.getAllTransactions());
}

module.exports = {
    getMyTransaction,
    getTransactionByCode,
    getAllTransactions
}