
const advertisementSerive = require("../services/advertisementService");

const getAllAdvertisement = async (req, res) => {
    try {
        const advertisements = await advertisementSerive.handleGetAllAdvertisement();
        if (!advertisements) {
            return res.status(400).json({ errCode: 1, message: "Cannot get advertisement" });
        }
        return res.status(200).json({ errCode: 0, message: "Get advertisement success", advertisements: advertisements });
    } catch (error) {
        console.error("Error in handleGetAllAdvertisement:", error);
        return res.status(500).json({ errCode: 1, message: "Server error", error: error.message });
    }
}

const getAdvertisementById = async (req, res) => {
    try {
        const { id } = req.params;
        const advertisement = await advertisementSerive.handleGetAdvertisementById(id);
        if (!advertisement) {
            return res.status(400).json({ errCode: 1, message: "Cannot get advertisement" });
        }
        return res.status(200).json({ errCode: 0, message: "Get advertisement success", advertisement: advertisement });
    } catch (error) {
        console.error("Error in handleGetAdvertisementById:", error);
        return res.status(500).json({ errCode: 1, message: "Server error", error: error.message });
    }
}

const createAdvertisement = async (req, res) => {
    try {
        const { title, content, image } = req.body;
        const user = req.user;

        const advertisement = await advertisementSerive.handleCreateAdvertisement(title, content, image, user);
        if (!advertisement) {
            return res.status(400).json({ errCode: 1, message: "Cannot create advertisement" });
        }
        return res.status(200).json({ errCode: 0, message: "Create advertisement success", advertisement: advertisement });
    } catch (error) {
        console.error("Error in handleCreateAdvertisement:", error);
        return res.status(500).json({ errCode: 1, message: "Server error", error: error.message });
    }
}

module.exports = {
    getAllAdvertisement,
    getAdvertisementById,
    createAdvertisement
}