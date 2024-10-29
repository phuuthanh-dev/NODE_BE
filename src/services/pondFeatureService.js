const PondFuture = require("../models/PondFeature")

const createPondFuture = async (targetType, value, zoldiacId) => {
    try {
        const newPondFuature = new PondFuture({ targetType, value, zodiac_element: zoldiacId });
        await newPondFuature.save();
        return { errCode: 0, message: "Success" };
    } catch (error) {
        console.error("Error in createPondFuture:", error);
        return { errCode: 1, message: "Server error" };
    }
}

const getAllPondFuatures = async () => {
    try {
        const PondFuatures = await PondFuture.find();
        return { errCode: 0, message: "Success", PondFuatures };
    } catch (error) {
        console.error("Error in createPondFuture:", error);
        return { errCode: 1, message: "Server error" };
    }
}
const UpdatePondFuture = async (id, targetType, value, zoldiacId) => {
    try {
        await PondFuture.findByIdAndUpdate(id, { targetType, value, zodiac_element: zoldiacId });
        return { errCode: 0, message: "Success" };
    } catch (error) {
        console.error("Error in createPondFuture:", error);
        return { errCode: 1, message: "Server error" };
    }
}
const getPondFuatueByTargetType = async (targetType) => {
    try {
        const pond = await PondFuture.find({ targetType });
        return { errCode: 0, message: "Success", pond };
    } catch (error) {
        console.error("Error in createPondFuture:", error);
        return { errCode: 1, message: "Server error" };
    }
}
module.exports = {
    getAllPondFuatures,
    createPondFuture,
    UpdatePondFuture,
    getPondFuatueByTargetType
}