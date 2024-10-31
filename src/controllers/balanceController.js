const balanceService = require('../services/balanceService');

const deposit = (async (req, res) => {
    try {
        let data = await balanceService.deposit({
            ...req.body,
            ip: req.ip,
            userID: req.user.id,
        })
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = {
    deposit,
}