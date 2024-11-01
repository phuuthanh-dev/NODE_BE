const transactionService = require('../services/transactionService');

const getMyTransaction = async (req, res) => {
    try {
        return res.json(await transactionService.getMyTransaction(req.user.id));
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getTransactionByCode = async (req, res) => {
    try {
        const code = req.params.code;
      const transaction=  await transactionService.getTransactionByCode(code)
        if(!transaction){
            return res.status(404).json({message: "Transaction not found"})
        }
        return res.status(200).json(transaction)
    } catch (error) {
        console.log("Error at getTransactionByCode", error)
        return res.status(500).json({ message: error.message });       
    }
}

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await transactionService.getAllTransactions();
        return res.status(200).json(transactions)
    } catch (error) {
        console.log("Error at getAllTransactions", error)
        return res.status(500).json({ message: error.message });
        
    }
}

module.exports = {
    getMyTransaction,
    getTransactionByCode,
    getAllTransactions
}