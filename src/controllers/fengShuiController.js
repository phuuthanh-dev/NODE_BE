const FengShuiService = require('../services/fengShuiService');

const calculateFengShui = async (req, res) => {
    try {
        const { dateOfBirth, gender } = req.body;
        const result = await FengShuiService.calculateFengShui(dateOfBirth, gender);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = { calculateFengShui }