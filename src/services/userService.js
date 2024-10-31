const User = require("../models/User");
const ZodiacElement = require("../models/Zodiac");
var bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
require("dotenv").config();
const request = require("request");
const moment = require("moment");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { calculateZodiac } = require("../helpers/calculateZodiac");


const handleUserLogin = async (email, password) => {
    try {
        const existingAccount = await User.findOne({ email }).populate("zodiac_element");

        if (!existingAccount) {
            return { errCode: 2, errMessage: "User not found" };
        }

        if (existingAccount.status !== "Active") {
            return { errCode: 4, errMessage: "Account has been locked" };
        }

        const isPasswordValid = await bcrypt.compare(password, existingAccount.password);
        if (!isPasswordValid) {
            return { errCode: 1, errMessage: "Username or password is incorrect" };
        }

        const { password: _, status, activationCode, __v, ...userWithoutPassword } = existingAccount.toObject();

        if (userWithoutPassword.zodiac) {
            const { _id: zodiacId, __v: zodiacVersion, ...zodiacWithoutId } = userWithoutPassword.zodiac;
            userWithoutPassword.zodiac = zodiacWithoutId;
        }

        return { errCode: 0, message: "Login success", user: userWithoutPassword };

    } catch (error) {
        console.error("Error in handleUserLogin:", error);
        return { errCode: 1, message: "Server error" };
    }
};




let checkUserCredential = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existingAccount = await User.findOne({ email: email });
            if (existingAccount) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            console.error("Error in checkUserCredential:", error);
            resolve({ errCode: 1, message: "Server error", error });
        }
    });
};

let handleUserRegister = (email, password, gender, name, birth) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isExist = await checkUserCredential(email);
            if (isExist) {
                resolve({
                    errCode: 1,
                    message: " Email exists, please try another username or email!",
                });
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 10);


            const activationCode = Math.floor(100000 + Math.random() * 900000).toString();

            const myZodiac = await calculateZodiac(birth);
            console.log(myZodiac);
            const zodiacElement = await ZodiacElement.findOne({ name: myZodiac.zodiacElementName });
            if (!zodiacElement) {
                resolve({ errCode: 2, message: "Zodiac not found" });
                return;
            }

            const user = new User({
                email: email,
                password: hashedPassword,
                gender: gender,
                name: name,
                birth: moment(birth, "YYYY-MM-DD").toDate(),
                zodiac_element: zodiacElement._id,
                activationCode: activationCode
            });
            await user.save();
            resolve({ errCode: 0, message: "Register success" });
        } catch (error) {
            console.error("Error in handleUserRegister:", error);
            resolve({ errCode: 1, message: "Server error", error: error.message });

        }
    });
};

const getMyZodiac = async (birth) => {
    try {
        const myZodiac = await calculateZodiac(birth);

        if (!myZodiac) {
            return { errCode: 1, message: "Zodiac not found" };
        }
        return { errCode: 0, message: "Success", zodiacElement: myZodiac.zodiacElementName, canChi: myZodiac.myCanChi };
    } catch (error) {
        console.error("Error in calculateZodiac:", error);
        return { errCode: 1, message: "Server error" };
    }
}


module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserCredential: checkUserCredential,
    handleUserRegister: handleUserRegister,
    getMyZodiac: getMyZodiac
};
