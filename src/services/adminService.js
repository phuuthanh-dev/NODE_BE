const { genSalt } = require("bcryptjs");
const User = require("../models/User");

let handleGetAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await User.find({});

            if (!users) {
                resolve({ errCode: 1, message: "Cannot get user" });
            }
            resolve(users);
        } catch (error) {
            console.error("Error in handleUserRegister:", error);
            resolve({ errCode: 1, message: "Server error", error: error.message });

        }
    });
};

const handleGetUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findById(id);
            if (!user) {
                resolve({ errCode: 1, message: "Cannot get user" });
            }
            resolve(user);
        } catch (error) {
            console.error("Error in handleUserRegister:", error);
            resolve({ errCode: 1, message: "Server error", error: error.message });
        }
    }
    );
}

const handleUserUpdate = (id, email, password, gender, name, birth, zodiac) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.updateOne({ _id: id }, { email, password, gender, name, birth, zodiac });
            await user.save();
        } catch (error) {
            console.error("Error in handleUserRegister:", error);
            resolve({ errCode: 1, message: "Server error", error: error.message });
        }
    }
    );
}
const handleChangeUserStatus = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findById(id);
            if (!user) {
                resolve({ errCode: 1, message: "Cannot get user" });
            }
            user.status = user.status === "Active" ? "Inactive" : "Active";
            await user.save();
            resolve({ errCode: 0, message: "Change status success" });
        } catch (error) {
            console.error("Error in handleUserRegister:", error);
            resolve({ errCode: 1, message: "Server error", error: error.message });
        }
    }
    );
}

module.exports = {
    handleGetAllUser: handleGetAllUser,
    handleGetUserById: handleGetUserById,
    handleUserUpdate: handleUserUpdate,
    handleChangeUserStatus: handleChangeUserStatus
};