const User = require('../models/User');
const paymentService = require('./paymentService');

const deposit = async ({ amount, userID, ip, returnUrl }) => {
  const user = await User.findById(userID);

  if (!user) {
    return { errCode: 1, message: 'User not found' };
  }

  if (amount <= 0) {
    return { errCode: 1, message: 'Amount must be greater than 0' };
  }

  const { paymentUrl } = await paymentService.createPaymentUrl({
    ip,
    amount,
    userID,
    description: 'Deposit money',
    returnUrl,
    transactionType: 'Deposit money',
  });
  
  return { paymentUrl };
};

module.exports = {
  deposit
}
