const User = require("../models/User");
const Role = require("../models/Role");
const ZodiacElement = require("../models/Zodiac");
var bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
require("dotenv").config();
const request = require("request");
const moment = require("moment");
const nodemailer = require("nodemailer");
const crypto = require("crypto");


const handleUserLogin = async (email, password) => {
    try {
        const existingAccount = await User.findOne({ email }).populate("zodiac");

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

let handleUserRegister = (email, password, gender, name, birth, zodiac) => {
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
            // const calculateZodiacResult = await calculateZodiac(birth);
            // const zodiacElement = new ZodiacElement({ name: calculateZodiacResult.zodiacElementName });
            // await zodiacElement.save();

            // if (!zodiacElement) {
            //     resolve({ errCode: 2, message: "Zodiac not found" });
            //     return;
            // }
            const role = await Role.findOne({ name: "user" });

            const user = new User({
                email: email,
                password: hashedPassword,
                gender: gender,
                name: name,
                birth: moment(birth, "DD/MM/YYYY").toDate(),
                zodiac_element: null,
                activationCode: activationCode,
                role_id: role._id,
            });
            await user.save();
            resolve({ errCode: 0, message: "Register success" });
        } catch (error) {
            console.error("Error in handleUserRegister:", error);
            resolve({ errCode: 1, message: "Server error", error: error.message });

        }
    });
};

const calculateZodiac = async (birth) => {
    try {
        const year = moment(birth, "DD/MM/YYYY").year();
        const chi = year % 12;
        const can = year % 10;
        const canlist = [{ name: "Canh", value: 0 },
        { name: "Tân", value: 1 },
        { name: "Nhâm", value: 2 },
        { name: "Quý", value: 3 },
        { name: "Giáp", value: 4 },
        { name: "Ất", value: 5 },
        { name: "Bính", value: 6 },
        { name: "Đinh", value: 7 },
        { name: "Mậu", value: 8 },
        { name: "Kỷ", value: 9 }];
        const chiList = [{ name: "Tý", value: 4 },
        { name: "Sửu", value: 5 },
        { name: "Dần", value: 6 },
        { name: "Mão", value: 7 },
        { name: "Thìn", value: 8 },
        { name: "Tỵ", value: 9 },
        { name: "Ngọ", value: 10 },
        { name: "Mùi", value: 11 },
        { name: "Thân", value: 0 },
        { name: "Dậu", value: 1 },
        { name: "Tuất", value: 2 },
        { name: "Hợi", value: 3 }];
        const upCan = [{
            name: ["Giáp", "Ất"], value: 1
        }, {
            name: ["Bính", "Đinh"], value: 2
        }, {
            name: ["Mậu", "Kỷ"], value: 3
        }, {
            name: ["Canh", "Tân"], value: 4
        }, {
            name: ["Nhâm", "Quý"], value: 5
        }
        ]
        const DiaChi = [{ name: ["Tý", "Sửu", "Ngọ", "Mùi"], value: 0 },
        { name: ["Dần", "Mão", "Thân", "Dậu"], value: 1 },
        { name: ["Thìn", "Tỵ", "Tuất", "Hợi"], value: 2 }
        ]
        const Element = [{ name: "Kim", value: 1 },
        { name: "Mộc", value: 5 },
        { name: "Thủy", value: 2 },
        { name: "Hỏa", value: 3 },
        { name: "Thổ", value: 4 }];
        const myCan = canlist.find((item) => item.value === can);
        const myChi = chiList.find((item) => item.value === chi);
        const myCanChi = myCan.name + " " + myChi.name;
        let zodiacElement = 0;
        upCan.forEach((item) => {
            if (item.name.includes(myCan.name)) {
                zodiacElement = item.value;
                return;
            }
        })
        DiaChi.forEach((item) => {
            if (item.name.includes(myChi.name)) {
                zodiacElement += item.value;
                return;
            }
        })
        if (zodiacElement > 5) {
            zodiacElement = zodiacElement - 5;
        }
        const zodiacElementName = Element.find((item) => item.value === zodiacElement).name;

        if (!zodiacElement) {
            return { errCode: 1, message: "Zodiac not found" };
        }
        return { errCode: 0, message: "Success", zodiacElement: zodiacElementName, canChi: myCanChi };
    } catch (error) {
        console.error("Error in calculateZodiac:", error);
        return { errCode: 1, message: "Server error" };
    }
}


module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserCredential: checkUserCredential,
    handleUserRegister: handleUserRegister,
    calculateZodiac: calculateZodiac
};
