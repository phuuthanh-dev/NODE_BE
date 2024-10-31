const destinyService = require('../services/destinyService');

const getAllDestinies = async (req, res) => {
    try {
        let data = await destinyService.getAllDestinies()
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
}
const createDestiny = async (req, res) => {
    try {
        console.log(req.body);
        const { name } = req.body;
        let data = await destinyService.createDestinie(name)
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
}
module.exports = {
    getAllDestinies,
    createDestiny
}