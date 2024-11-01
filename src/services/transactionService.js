const Transaction = require('../models/transaction');
const User = require('../models/User');

const handleIPN = async (transaction) => {
    console.log(transaction);
    switch (transaction.type) {
        case 'Deposit money':
            await processDepositTransaction(transaction);
            break;
        default:
            return { errCode: 1, message: 'Invalid transaction type' };
    }
};

const processDepositTransaction = async (transaction) => {
    if (transaction.status !== 'Pending') return;
    console.log(transaction);
    
    await User.findOneAndUpdate(
        { _id: transaction.user_id },
        { $inc: { balance: transaction.amount } }
    );
    await Transaction.findOneAndUpdate(
        { code: transaction.code },
        {
          status: 'Completed',
          paymentMessage: 'Giao dịch thành công',
        }
      );
};

const getMyTransaction = async (userID) => {
    const transactions = await Transaction.find({ user_id: userID });
    if (!transactions) return { errCode: 1, message: 'Success', transactions: [] };
    return { errCode: 0, message: 'Success', transactions };
}

const getTransactionByCode = async (code) => {
    const transaction = await Transaction.findOne({ code });
    if (!transaction) return { errCode: 1, message: 'Transaction not found' };
    return { errCode: 0, message: 'Success', transaction };
}

const getAllTransactions = async () => {
    const transactions = await Transaction.find();
    if (!transactions) return { errCode: 1, message: 'Success', transactions: [] };
    return { errCode: 0, message: 'Success', transactions };
}

module.exports = {
    handleIPN,
    processDepositTransaction,
    getMyTransaction,
    getTransactionByCode,
    getAllTransactions
};