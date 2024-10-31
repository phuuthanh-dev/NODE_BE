const Direction = require("../models/Direction");
const Destiny = require("../models/destiny");
const calculateDirectionDestiny = require("../helpers/calculateDirectionDestiny");

const calculateFengShui = async (year, gender) => {
    try {
        const destinyResult = await calculateDirectionDestiny.calculateDirectionDestiny(year, gender);
        const findDestiny = await Destiny.findOne({ name: destinyResult.destiny.destiny });
        const findDirection = await Direction.find({ destiny: findDestiny._id });
        if (gender === "male") {
            gender = "Nam";
        } else {
            gender = "Nữ";
        }
        return { errCode: 0, message: "Success", destiny: findDestiny, direction: findDirection, lunarDate: destinyResult.lunarDate, year: year, gender: gender };
    } catch (error) {
        console.error("Error in calculateFengShui:", error);
        return { errCode: 1, message: "Server error" };
    }
};


module.exports = { calculateFengShui };
