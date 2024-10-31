const AdPackage = require('../models/adpackage');

const getAllAdpackages = async () => {
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
const getAdpackageById = async (id) => {
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
const createAdpackage = (name, price, duration, description, usesPerDur) => {
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
module.exports = {
    getAllAdpackages,
    getAdpackageById,
    createAdpackage
}