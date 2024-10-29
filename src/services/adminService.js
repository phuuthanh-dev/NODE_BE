const { genSalt } = require("bcryptjs");
const User = require("../models/User");
const AdPackage = require("../models/AdPackage");
const ZodiacElement = require("../models/Zodiac");
const { calculateZodiac } = require("../helpers/calculateZodiac");

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

const handleUserUpdate = (id, email, password, gender, name, birth) => {
    return new Promise(async (resolve, reject) => {
        try {
            const myZodiac = await calculateZodiac(birth);
            const zodiacElement = await ZodiacElement.findOne({ name: myZodiac.zodiacElementName });

            if (!zodiacElement) {
                resolve({ errCode: 2, message: "Zodiac not found" });
                return;
            }

            await User.updateOne({ _id: id }, { email, password, gender, name, birth, zodiac_element: zodiacElement._id });
            resolve({ errCode: 0, message: "Update user success" });
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

const handleGetAllServices = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let services = await AdPackage.find({});
            if (!services) {
                resolve({ errCode: 1, message: "Cannot get services" });
            }
            resolve(services);
        } catch (error) {
            console.error("Error in handleUserRegister:", error);
            resolve({ errCode: 1, message: "Server error", error: error.message });
        }
    }
    );
}

const handleGetServiceById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let service = await AdPackage.findById(id);
            if (!service) {
                resolve({ errCode: 1, message: "Cannot get service" });
            }
            resolve(service);
        } catch (error) {
            console.error("Error in handleUserRegister:", error);
            resolve({ errCode: 1, message: "Server error", error: error.message });
        }
    }
    );
}

const handleCreateService = (name, price, duration, description, usesPerDur) => {
    return new Promise(async (resolve, reject) => {
        try {
            let service = new AdPackage({ name, price, duration, description, usesPerDur });
            await service.save();
            resolve({ errCode: 0, message: "Create service success" });
        } catch (error) {
            console.error("Error in handleUserRegister:", error);
            resolve({ errCode: 1, message: "Server error", error: error.message });
        }
    }
    );
}

const handleUpdateService = (id, name, price, duration, description, usesPerDur) => {
    return new Promise(async (resolve, reject) => {
        try {
            let service = await AdPackage.updateOne({ _id: id }, { name, price, duration, description, usesPerDur });
            resolve({ errCode: 0, message: "Update service success" });
        } catch (error) {
            console.error("Error in handleUserRegister:", error);
            resolve({ errCode: 1, message: "Server error", error: error.message });
        }
    }
    );
}

const handleDeleteService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let service = await AdPackage.findById(id);
            if (!service) {
                resolve({ errCode: 1, message: "Cannot get service" });
            }
            await service.remove();
            resolve({ errCode: 0, message: "Delete service success" });
        } catch (error) {
            console.error("Error in handleUserRegister:", error);
            resolve({ errCode: 1, message: "Server error", error: error.message });
        }
    }
    );
}

module.exports = {
    handleGetAllUser,
    handleGetUserById,
    handleUserUpdate,
    handleChangeUserStatus,
    handleGetAllServices,
    handleGetServiceById,
    handleCreateService,
    handleUpdateService,
    handleDeleteService
};