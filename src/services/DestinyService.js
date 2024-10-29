const Destiny = require("../models/destiny")

const getAllDestinies = async () => {
    try {
        const destinies = await Destiny.find();
        return { errCode: 0, message: "Success", destinies: destinies };
    } catch (error) {
        console.error("Error in getAllDestinies:", error);
        return { errCode: 1, message: "Server error" };
    }
}
const createDestinie = async (name) => {
    try {
        const destiny = new Destiny({ name })
        destiny.save();
        return { errCode: 0, message: "Success" };
    } catch (error) {
        console.error("Error in createDestinies:", error);
        return { errCode: 1, message: "Server error" };
    }
}
module.exports = {
    createDestinie,
    getAllDestinies
}

