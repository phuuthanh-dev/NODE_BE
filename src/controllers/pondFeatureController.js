var pondFeature = require("../services/pondFeatureService")

const createPondFeature = async (req, res) => {
    try {

        let { targetType, value, status, zodiac_element } = req.body;
        let data = await pondFeature.createPondFeature(targetType, value, status, zodiac_element);

        return res.status(200).json(data);
    } catch (error) {
        console.error("Error in createPondFeature:", error);
        return res.status(500).json(error);
    }
}
const getAllPondFeatures = async (req, res) => {
    try {
        let data = await pondFeature.getAllPondFeatures();
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error in getAllPondFeatures:", error);
        return res.status(500).json(error);
    }
}

const getPondFeatureById = async (req, res) => {
    try {
        let { id } = req.params;
        let data = await pondFeature.getPondFeatureById(id);
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error in getPondFeatureById:", error);
        return res.status(500).json(error);
    }
}

const updatePondFeature = async (req, res) => {
    try {
        let { id } = req.params;
        let { targetType, value, status, zodiac_element } = req.body;
        let data = await pondFeature.updatePondFeature(id, targetType, value, status, zodiac_element);
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error in updatePondFeature:", error);
        return res.status(500).json(error);
    }
}
const getPondFeatureByTargetType = async (req, res) => {
    try {
        let { targetType } = req.params;
        let data = await pondFeature.getPondFeatureByTargetType(targetType);
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error in getPondFeatureByTargetType:", error);
        return res.status(500).json(error);
    }
}

const getPondFeature = async (req, res) => {
    try {
        let { id } = req.params;
        let data = await pondFeature.getPondFeature(id);

        return res.status(200).json(data);
    } catch (error) {
        console.error("Error in getPondFeature:", error);
        return res.status(500).json(error);
    }
}

const changeStatusPondFeature = async (req, res) => {
    try {
        let { id } = req.params;
        let data = await pondFeature.changeStatus(id);
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error in changeStatusPondFeature:", error);
        return res.status(500).json(error);
    }
}
module.exports = {
    createPondFeature,
    getAllPondFeatures,
    updatePondFeature,
    getPondFeatureByTargetType,
    getPondFeature,
    getPondFeatureById,
    changeStatusPondFeature

}