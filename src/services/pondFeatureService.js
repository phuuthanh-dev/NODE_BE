const PondFuture = require("../models/PondFeature")

const createPondFeature = async (targetType, value, status, zoldiacId) => {
    try {
        const newPondFuature = new PondFuture({ targetType, value, zodiac_element: zoldiacId, status: status });
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
        console.error("Error in getAllPondFeatures:", error);
        return { errCode: 1, message: "Server error" };
    }
}

const getPondFeatureById = async (id) => {
    try {
        const pondFeature = await PondFuture.findById(id).populate("zodiac_element");
        return { errCode: 0, message: "Success", pondFeature };
    } catch (error) {
        console.error("Error in getPondFeatureById:", error);
        return { errCode: 1, message: "Server error" };
    }
}
const updatePondFeature = async (id, targetType, value, status, zodiac_element) => {
    try {
        await PondFuture.findByIdAndUpdate(id, { targetType, value, zodiac_element, status });
        return { errCode: 0, message: "Success" };
    } catch (error) {
        console.error("Error in updatePondFeature:", error);
        return { errCode: 1, message: "Server error" };
    }
}

const changeStatus = async (id) => {
    try {
        const pondFeature = await PondFuture.findById(id); 
        pondFeature.status = pondFeature.status === "Active" ? "Inactive" : "Active";
        await pondFeature.save();
        return { errCode: 0, message: "Success" };
    }
    catch (error) {
        console.error("Error in changeStatus:", error);
        return { errCode: 1, message: "Server error" };
    }
}
const getPondFeatureByTargetType = async (targetType) => {
    try {
        const pond = await PondFuture.find({ targetType });
        return { errCode: 0, message: "Success", pond };
    } catch (error) {
        console.error("Error in getPondFeatureByTargetType:", error);
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
    getPondFeatureById,
    createPondFeature,
    updatePondFeature,
    getPondFeatureByTargetType,
    getPondFeature,
    changeStatus
}