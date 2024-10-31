var pondFeature = require("../services/pondFeatureService")

const createPondFeature = async (req, res) => {
    try {
        let { targetType, value, zoldiacId } = req.body;
        let data = await pondFeature.createPondFeature(targetType, value, zoldiacId);
        return res.status(200).json(data);
    } catch {
        return res.status(500).json(error);
    }
}
const getAllPondFeatures = async (req, res) => {
    try {
        let data = await pondFeature.getAllPondFeatures();
        return res.status(200).json(data);
    } catch {
        return res.status(500).json(error);
    }
}
const updatePondFeature = async (req, res) => {
    try {
        let { id } = req.params;
        let { targetType, value, zoldiacId } = req.body;
        let data = await pondFeature.updatePondFeature(id, targetType, value, zoldiacId);
        return res.status(200).json(data);
    } catch {
        return res.status(500).json(error);
    }
}
const getPondFeatureByTargetType = async (req, res) => {
    try {
        let { targetType } = req.params;
        console.log(targetType)
        let data = await pondFeature.getPondFeatureByTargetType(targetType);
        return res.status(200).json(data);
    } catch {
        return res.status(500).json(error);
    }
}

const getPondFeature = async (req, res) => {
    try {
        let { id } = req.params;
        let data = await pondFeature.getPondFeature(id);
        return res.status(200).json(data);
    } catch {
        return res.status(500).json(error);
    }
}
module.exports = {
    createPondFeature,
    getAllPondFeatures,
    updatePondFeature,
    getPondFeatureByTargetType,
    getPondFeature
}