const ZodiacElement = require("../models/Zodiac");

const getAllZodiacs = async () => {
    try {

        const zodiacs = await ZodiacElement.find();
        return { errCode: 0, message: "Success", zodiacs };
    } catch (error) {
        console.error("Error in getAllZodiacs:", error);
        return { errCode: 1, message: "Server error" };
    }
    
};
module.exports = {
    getAllZodiacs,
};