const {
  IpnSuccess,
  IpnFailChecksum,
  IpnUnknownError,
  VNPay,
  ProductCode,
  VnpLocale,
  IpnInvalidAmount,
  InpOrderAlreadyConfirmed,
  IpnOrderNotFound,
  dateFormat,
} = require('vnpay');
const { generateRandomCode } = require('../helpers/generateRandomCode');
const Transaction = require('../models/transaction');
const vnpay = new VNPay({
  tmnCode: process.env.VNPAY_TMN_CODE,
  secureSecret: process.env.VNPAY_SECURE_SECRET,
  vnpayHost: 'https://sandbox.vnpayment.vn',
  testMode: true,
});
const transactionService = require('./transactionService');
class PaymentService {
  successResCode = '00';
  failResCode = '02';

  createPaymentUrl = async ({
    amount,
    returnUrl,
    ip,
    transactionType,
    description,
    userID,
  }) => {
    if (amount <= 0) {
      return { errCode: 1, message: 'Amount must be greater than 0' };
    }

    const transactionCode = generateRandomCode(8);

    const expDate = new Date();
    expDate.setMinutes(expDate.getMinutes() + 5);
    const paymentUrl = vnpay.buildPaymentUrl({
      vnp_Amount: amount,
      vnp_IpAddr: ip,
      vnp_TxnRef: transactionCode,
      vnp_OrderInfo: description,
      vnp_OrderType: ProductCode.Other,
      vnp_ReturnUrl: returnUrl,
      vnp_Locale: VnpLocale.VN,
      vnp_BankCode: 'VNBANK',
      vnp_ExpireDate: dateFormat(expDate),
    });

    const transaction = new Transaction({
      amount,
      code: transactionCode,
      type: transactionType,
      user_id: userID,
      paymentMethod: 'VNPAY',
      paymentUrl,
    });
    await transaction.save();

    return { paymentUrl, transaction };
  };

  verifyIPN = async (query) => {
    try {
      const verify = vnpay.verifyIpnCall(query);
      if (!verify.isVerified) {
        return IpnFailChecksum;
      }
      const transaction = await Transaction.findOne({
        code: verify.vnp_TxnRef,
      });
      if (!transaction || verify.vnp_TxnRef !== transaction.code) {
        return IpnOrderNotFound;
      }

      if (verify.vnp_TransactionStatus === this.failResCode) {
        if (transaction.status !== 'Failed') {
          transaction.status = 'Failed';
          transaction.paymentMessage = verify.message;
          await transaction.save();
        }

        return InpOrderAlreadyConfirmed;
      }

      if (verify.vnp_Amount !== transaction.amount) {
        return IpnInvalidAmount;
      }

      if (transaction.status !== 'Pending') {
        return InpOrderAlreadyConfirmed;
      }

      if (verify.vnp_ResponseCode === this.successResCode) {
        await transactionService.handleIPN(transaction);
      }

      return IpnSuccess;
    } catch (error) {
      logger.error(error);
      return IpnUnknownError;
    }
  };

  verifyReturnUrl = async (query) => {
    try {
      const verify = vnpay.verifyReturnUrl(query);
      if (!verify.isVerified) {
        return {
          message: verify?.message ?? 'Payment failed!',
          status: verify.isSuccess,
        };
      }

      return {
        message: verify?.message ?? 'Payment successful!',
        status: verify.isSuccess,
      };
    } catch (error) {
      return { errCode: 1, message: 'Payment failed' }
    }
  };
}

module.exports = new PaymentService();
