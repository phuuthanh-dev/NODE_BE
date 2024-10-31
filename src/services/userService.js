const User = require("../models/User");
const ZodiacElement = require("../models/Zodiac");
var bcrypt = require("bcryptjs");
require("dotenv").config();
const moment = require("moment");
const { calculateZodiac } = require("../helpers/calculateZodiac");
const paypal = require("paypal-rest-sdk");
const UserPackage = require("../models/UserPackage");
const AdPackage = require("../models/AdPackage");
const Transaction = require('../models/transaction');

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

const buyPackage = async (req) => {
    try {
        console.log(req.body);
        const { packageId, userId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return { errCode: 1, message: "User not found" };
        }

        const adPackage = await AdPackage.findById(packageId);
        if (!adPackage) {
            return { errCode: 2, message: "Package not found" };
        }

        if (user.balance < adPackage.price) {
            return { errCode: 3, message: "Insufficient balance" };
        }

        const activePackage = await UserPackage.findOne({ user_id: userId });
        const startDay = new Date();
        const endDay = moment(startDay).add(adPackage.duration, 'days').toDate();

        let userPackage;
        if (activePackage) {
            const newExpireDate = new Date(Math.max(endDay, activePackage.expireDate));
            userPackage = await UserPackage.findByIdAndUpdate(
                activePackage._id, {
                    expireDate: newExpireDate,
                    tokenPoint: activePackage.tokenPoint + adPackage.usesPerDur
                }, { new: true }
            );
        } else {
            userPackage = new UserPackage({
                user_id: userId,
                expireDate: endDay,
                tokenPoint: adPackage.usesPerDur
            });
            await userPackage.save();
        }

        user.balance -= adPackage.price;
        await user.save();

        const transactionCode = `PA${Date.now()}`;

        const transaction = new Transaction({
            user_id: userId,
            type: "Buy package money",
            code: transactionCode,
            amount: adPackage.price,
            content: `Buy package ${adPackage.name}`,
            status: "Success",
            paymentMethod: "Balance"
        });
        await transaction.save();

        console.log(userPackage);

        return { errCode: 0, message: "Success" };
    } catch (error) {
        console.error("Error in buyPackage:", error);
        return { errCode: 1, message: "Server error" };
    }
};

module.exports = {
    handleUserLogin,
    checkUserCredential,
    handleUserRegister,
    getMyZodiac,
    buyPackage
};
