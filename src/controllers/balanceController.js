const balanceService = require('../services/balanceService');

const deposit = (async (req, res) => {
    try {
        let paymentUrl = await balanceService.deposit({
            ...req.body,
            ip: req.ip,
            userID: req.user.id,
        })
        return res.status(200).json(paymentUrl);
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = {
    deposit,
}