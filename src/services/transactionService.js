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
    return await Transaction.find({ user_id: userID });
}

const getTransactionByCode = async (code) => {
    return await Transaction.findOne({ code });
}

const getAllTransactions = async () => {
    return await Transaction.find();
}

module.exports = {
    handleIPN,
    processDepositTransaction,
    getMyTransaction,
    getTransactionByCode,
    getAllTransactions
};