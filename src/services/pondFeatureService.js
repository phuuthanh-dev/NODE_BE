const PondFuture = require("../models/PondFeature")

const createPondFeature = async (targetType, value, zoldiacId) => {
    try {
        const newPondFuature = new PondFuture({ targetType, value, zodiac_element: zoldiacId, status: "Active" });
        await newPondFuature.save();
        return { errCode: 0, message: "Success" };
    } catch (error) {
        console.error("Error in createPondFeature:", error);
        return { errCode: 1, message: "Server error" };
    }
}

const getAllPondFeatures = async () => {
    try {
        const pondFeatures = await PondFuture.find().populate("zodiac_element");
        return { errCode: 0, message: "Success", pondFeatures };
    } catch (error) {
        console.error("Error in createPondFeature:", error);
        return { errCode: 1, message: "Server error" };
    }
}
const updatePondFeature = async (id, targetType, value, zoldiacId) => {
    try {
        await PondFuture.findByIdAndUpdate(id, { targetType, value, zodiac_element: zoldiacId });
        return { errCode: 0, message: "Success" };
    } catch (error) {
        console.error("Error in createPondFeature:", error);
        return { errCode: 1, message: "Server error" };
    }
}
const getPondFeatureByTargetType = async (targetType) => {
    try {
        const pond = await PondFuture.find({ targetType });
        return { errCode: 0, message: "Success", pond };
    } catch (error) {
        console.error("Error in createPondFeature:", error);
        return { errCode: 1, message: "Server error" };
    }
}

const getPondFeature = async (id) => {
    try {
        const pond = await PondFuture.findById(id).populate("zodiac_element");
        return { errCode: 0, message: "Success", pond };
    } catch (error) {
        console.error("Error in createPondFeature:", error);
        return { errCode: 1, message: "Server error" };
    }
}
module.exports = {
    getAllPondFeatures,
    createPondFeature,
    updatePondFeature,
    getPondFeatureByTargetType,
    getPondFeature
}