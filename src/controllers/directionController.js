const DirectionService = require("../services/DirectionService")

const getAllDirections = async (req, res) => {
    try {
        let data = await DirectionService.getAllDirections()
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
}
const createDirection = async (req, res) => {
    try {
        let { title, content, destiny } = req.body
        let data = await DirectionService.createDirections(title, content, destiny)
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
}
module.exports = {
    createDirection,
    getAllDirections
}