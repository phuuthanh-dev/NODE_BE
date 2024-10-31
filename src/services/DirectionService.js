const Direction = require("../models/Direction")

const getAllDirections = async () => {
    try {
        const directions = await Direction.find();
        return { errCode: 0, message: "Success", directions: directions };
    } catch (error) {
        console.error("Error in getAllDestinies:", error);
        return { errCode: 1, message: "Server error" };
    }
}
const createDirections = async (title, content, destiny) => {
    try {
        const direction = new Direction({ title, content, destiny })
        direction.save();
        return { errCode: 0, message: "Success" };
    } catch (error) {
        console.error("Error in createDestinies:", error);
        return { errCode: 1, message: "Server error" };
    }
}

const getDirectionBydestiny = async (destiny) => {
    try {
        const directions = await Direction.find({ destiny });
        return { errCode: 0, message: "Success", directions: directions };
    } catch (error) {
        console.error("Error in getDirectionBydestiny:", error);
        return { errCode: 1, message: "Server error" };
    }
}

module.exports = {
    getAllDirections,
    createDirections,
    getDirectionBydestiny
}