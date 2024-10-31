const paymentService = require('../services/paymentService');

const verifyReturnUrl = (async (req, res) => {
    try {
        const result = await paymentService.verifyReturnUrl(req.query);
        return res.json(result);
    } catch (error) {
        return { errCode: 1, message: 'Payment failed' }
    }
});

const verifyIPN = (async (req, res) => {
    try {
        const result = await paymentService.verifyIPN(req.query);
        return res.json(result);
    } catch (error) {
        return { errCode: 1, message: 'Payment failed' }
    }
});

module.exports = {
    verifyReturnUrl,
    verifyIPN,
}