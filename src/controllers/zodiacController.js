const zodiacService = require('../services/zodiacService');
const getAllZodiacs = async (req, res) => {
    try {
        const zodiacs = await zodiacService.getAllZodiacs();
        res.status(200).json(zodiacs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    getAllZodiacs,
};