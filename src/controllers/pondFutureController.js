var pondFuture = require("../services/pondFeatureService")

const createPondFuture = async (req, res) => {
    try {
        let { targetType, value, zoldiacId } = req.body;
        let data = await pondFuture.createPondFuture(targetType, value, zoldiacId);
        return res.status(200).json(data);
    } catch {
        return res.status(500).json(error);
    }
}
const getAllPondFuatures = async (req, res) => {
    try {
        let data = await pondFuture.getAllPondFuatures();
        return res.status(200).json(data);
    } catch {
        return res.status(500).json(error);
    }
}
const UpdatePondFuture = async (req, res) => {
    try {
        let { id } = req.params;
        let { targetType, value, zoldiacId } = req.body;
        let data = await pondFuture.UpdatePondFuture(id, targetType, value, zoldiacId);
        return res.status(200).json(data);
    } catch {
        return res.status(500).json(error);
    }
}
const getPondFuatueByTargetType = async (req, res) => {
    try {
        let { targetType } = req.params;
        console.log(targetType)
        let data = await pondFuture.getPondFuatueByTargetType(targetType);
        return res.status(200).json(data);
    } catch {
        return res.status(500).json(error);
    }
}
module.exports = {
    createPondFuture,
    getAllPondFuatures,
    UpdatePondFuture,
    getPondFuatueByTargetType
}