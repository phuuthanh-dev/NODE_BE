const Advertisement = require('../models/Advertisement');
const AdvertisementFengShuiTarget = require('../models/AdvertisementFengShuiTarget ');

const handleGetAllAdvertisement = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let advertisements = await Advertisement.find({});

            if (!advertisements) {
                resolve({ errCode: 1, message: "Cannot get advertisement" });
            }
            resolve(advertisements);
        } catch (error) {
            console.error("Error in handleGetAllAdvertisement:", error);
            resolve({ errCode: 1, message: "Server error", error: error.message });

        }
    });
}

const handleGetAdvertisementById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let advertisement = await Advertisement.findById(id);
            if (!advertisement) {
                resolve({ errCode: 1, message: "Cannot get advertisement" });
            }
            resolve(advertisement);
        } catch (error) {
            console.error("Error in handleGetAdvertisementById:", error);
            resolve({ errCode: 1, message: "Server error", error: error.message });
        }
    });
}

const handleCreateAdvertisement = (title, content, image, user) => {
    console.log("user", user);

    return new Promise(async (resolve, reject) => {
        try {

            let advertisement = new Advertisement({
                title: title,
                content: content,
                image: image,
                status: false,
                user_id: user.id
            });

            await advertisement.save();

            const advertisementCategory = new AdvertisementFengShuiTarget
            resolve(advertisement);
        } catch (error) {
            console.error("Error in handleCreateAdvertisement:", error);
            resolve({ errCode: 1, message: "Server error", error: error.message });
        }
    });
}

module.exports = {
    handleGetAllAdvertisement,
    handleGetAdvertisementById,
    handleCreateAdvertisement
}