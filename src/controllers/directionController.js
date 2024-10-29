const directionService = require("../services/directionService")

const getAllDirections = async (req, res) => {
    try {
        let data = await directionService.getAllDirections()
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
}
const createDirection = async (req, res) => {
    try {
        let { title, content, destiny } = req.body
        let data = await directionService.createDirections(title, content, destiny)
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
}
module.exports = {
    createDirection,
    getAllDirections
}